import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { config } from '@/lib/config'
import { FileUploadError, RateLimitError, handleApiError } from '@/lib/errors'

// Rate Limiting Store (In-Memory für Entwicklung, Redis für Produktion empfohlen)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate Limiting Middleware
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitStore.get(ip)

  if (!limit || now > limit.resetTime) {
    // Neues Zeitfenster
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + config.rateLimit.windowMs,
    })
    return true
  }

  if (limit.count >= config.rateLimit.maxRequests) {
    return false
  }

  limit.count++
  return true
}

// Sanitize Filename
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .substring(0, 255)
}

// Virus Scan Simulation (In Produktion: ClamAV oder ähnliches verwenden)
async function scanForVirus(buffer: Buffer): Promise<boolean> {
  // Simulierte Virus-Signatur-Prüfung
  const virusSignatures = [
    Buffer.from('X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*'),
  ]

  for (const signature of virusSignatures) {
    if (buffer.includes(signature)) {
      return false
    }
  }

  return true
}

export async function POST(request: NextRequest) {
  try {
    // IP-Adresse für Rate Limiting
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Rate Limiting prüfen
    if (!checkRateLimit(ip)) {
      throw new RateLimitError('Zu viele Anfragen. Bitte versuchen Sie es später erneut.')
    }

    // Formdata parsen
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      throw new FileUploadError('Keine Datei hochgeladen')
    }

    // Dateityp validieren
    const fileType = file.type as keyof typeof config.upload.allowedTypes
    if (!config.upload.allowedTypes[fileType]) {
      throw new FileUploadError(
        'Nicht unterstützter Dateityp. Erlaubt sind: PDF, DOC, DOCX, JPG, PNG'
      )
    }

    // Dateigröße validieren
    if (file.size > config.upload.maxFileSize) {
      throw new FileUploadError(
        `Datei ist zu groß. Maximale Größe: ${config.upload.maxFileSize / (1024 * 1024)}MB`
      )
    }

    // Datei in Buffer konvertieren
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Virus-Scan
    const isClean = await scanForVirus(buffer)
    if (!isClean) {
      throw new FileUploadError('Die Datei enthält möglicherweise schädlichen Inhalt')
    }

    // Sicherer Dateiname generieren
    const fileExtension = config.upload.allowedTypes[fileType]
    const uniqueId = crypto.randomBytes(16).toString('hex')
    const sanitizedName = sanitizeFilename(file.name.replace(/\.[^/.]+$/, ''))
    const fileName = `${uniqueId}_${sanitizedName}${fileExtension}`

    // Upload-Verzeichnis erstellen (in Produktion: Cloud Storage verwenden)
    const uploadDir = path.join(process.cwd(), config.upload.uploadDir)
    const filePath = path.join(uploadDir, fileName)

    // Datei speichern
    await writeFile(filePath, buffer)

    // Metadaten in Datenbank speichern (hier simuliert)
    const fileMetadata = {
      id: uniqueId,
      originalName: file.name,
      fileName: fileName,
      size: file.size,
      type: fileType,
      uploadedAt: new Date().toISOString(),
      ip: ip,
      status: 'pending',
    }

    // Erfolgreiche Antwort
    return NextResponse.json(
      {
        success: true,
        fileId: uniqueId,
        message: 'Datei erfolgreich hochgeladen',
        metadata: fileMetadata,
      },
      { status: 200 }
    )
  } catch (error) {
    return handleApiError(error)
  }
}

// OPTIONS für CORS
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
