import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import PgBoss from 'pg-boss'
import { ClamScan } from 'clamscan'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

let boss: PgBoss | null = null

async function getBoss() {
  if (!boss) {
    boss = new PgBoss(process.env.DATABASE_URL!)
    await boss.start()
  }
  return boss
}

const clamscan = new ClamScan({
  removeInfected: true,
  quarantineInfected: false,
  scanLog: null,
  debugMode: false,
  fileList: null,
  scanRecursively: true,
  clamscan: {
    path: '/usr/bin/clamscan',
    db: null,
    scanArchives: true,
    active: true
  },
  clamdscan: {
    socket: '/var/run/clamav/clamd.ctl',
    host: false,
    port: false,
    timeout: 60000,
    localFallback: true,
    path: '/usr/bin/clamdscan',
    configFile: null,
    multiscan: true,
    reloadDb: false,
    active: true,
    bypassTest: false
  },
  preference: 'clamdscan'
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get tenant from auth (simplified for this example)
    const tenantId = request.headers.get('x-tenant-id') || 'default'
    const userId = request.headers.get('x-user-id') || uuidv4()

    // Check consent
    const consent = request.headers.get('x-consent')
    if (consent !== 'true') {
      return NextResponse.json({ error: 'Consent required' }, { status: 400 })
    }

    // Parse multipart form data
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size
    const maxSizeMB = parseInt(process.env.FILE_MAX_SIZE_MB || '10')
    if (file.size > maxSizeMB * 1024 * 1024) {
      return NextResponse.json({ error: `File too large. Max size: ${maxSizeMB}MB` }, { status: 400 })
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF and images allowed.' }, { status: 400 })
    }

    // Convert file to buffer for scanning
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Scan with ClamAV
    try {
      await clamscan.init()
      const { isInfected, viruses } = await clamscan.scanBuffer(buffer, file.name)
      
      if (isInfected) {
        return NextResponse.json({ 
          error: 'File rejected: Security threat detected',
          viruses 
        }, { status: 400 })
      }
    } catch (scanError) {
      console.error('ClamAV scan error:', scanError)
      // In development, continue without scan
      if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Security scan failed' }, { status: 500 })
      }
    }

    // Generate unique file path
    const fileId = uuidv4()
    const fileExt = file.name.split('.').pop()
    const filePath = `${tenantId}/${fileId}.${fileExt}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('offers')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      return NextResponse.json({ error: 'Upload failed', details: uploadError }, { status: 500 })
    }

    // Create job record
    const jobId = uuidv4()
    const { error: jobError } = await supabase
      .from('workflow_jobs')
      .insert({
        id: jobId,
        tenant_id: tenantId,
        user_id: userId,
        type: 'negotiation',
        status: 'queued',
        file_url: filePath,
        file_name: file.name,
        file_size: file.size,
        metadata: {
          upload_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          user_agent: request.headers.get('user-agent'),
          mime_type: file.type
        }
      })

    if (jobError) {
      // Cleanup uploaded file
      await supabase.storage.from('offers').remove([filePath])
      return NextResponse.json({ error: 'Failed to create job', details: jobError }, { status: 500 })
    }

    // Record consent
    await supabase.from('consents').insert({
      tenant_id: tenantId,
      user_id: userId,
      job_id: jobId,
      type: 'data_processing',
      purpose: 'Angebotsanalyse und Verhandlung',
      granted: true,
      granted_at: new Date().toISOString(),
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent')
    })

    // Queue ingest job
    const pgBoss = await getBoss()
    await pgBoss.publish('ingest', {
      jobId,
      tenantId,
      userId
    })

    // Create initial status
    await supabase.from('workflow_status').insert({
      job_id: jobId,
      status: 'queued',
      message: 'Upload erfolgreich, Verarbeitung gestartet',
      progress: 0
    })

    return NextResponse.json({
      success: true,
      jobId,
      statusUrl: `/status?jobId=${jobId}`,
      message: 'File uploaded successfully. Processing started.'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 })
  }
}