import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

test.describe('E2E: Upload to Analysis Flow', () => {
  test('should complete full workflow from upload to analysis result', async ({ page, request }) => {
    // 1. Navigate to upload page
    await page.goto('/upload')
    
    // 2. Fill consent
    await page.check('#consent-checkbox')
    
    // 3. Upload test file
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles('./tests/fixtures/test-offer.pdf')
    
    // 4. Submit upload
    const uploadButton = page.locator('button:has-text("Upload")')
    await uploadButton.click()
    
    // 5. Wait for redirect to status page
    await page.waitForURL(/\/status\?jobId=/)
    
    // 6. Extract jobId from URL
    const url = new URL(page.url())
    const jobId = url.searchParams.get('jobId')
    expect(jobId).toBeTruthy()
    
    // 7. Wait for analysis to complete (max 2 minutes)
    let jobStatus = 'queued'
    const startTime = Date.now()
    
    while (jobStatus !== 'analysis_completed' && Date.now() - startTime < 120000) {
      const { data: job } = await supabase
        .from('workflow_jobs')
        .select('status')
        .eq('id', jobId)
        .single()
      
      jobStatus = job?.status || jobStatus
      
      if (jobStatus === 'failed') {
        throw new Error('Job failed')
      }
      
      await page.waitForTimeout(2000) // Wait 2 seconds between checks
    }
    
    // 8. Verify analysis completed
    expect(jobStatus).toBe('analysis_completed')
    
    // 9. Check for result on page
    await expect(page.locator('text=Einsparpotenzial')).toBeVisible()
    
    // 10. Verify result in database
    const { data: finalJob } = await supabase
      .from('workflow_jobs')
      .select('result')
      .eq('id', jobId)
      .single()
    
    expect(finalJob?.result).toBeTruthy()
    expect(finalJob.result.summary).toBeTruthy()
    expect(finalJob.result.confidence).toBeGreaterThan(0)
  })

  test('should handle upload with virus correctly', async ({ page }) => {
    await page.goto('/upload')
    await page.check('#consent-checkbox')
    
    // Upload EICAR test file
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles('./tests/fixtures/eicar.txt')
    
    await page.locator('button:has-text("Upload")').click()
    
    // Should show error message
    await expect(page.locator('text=Security threat detected')).toBeVisible()
  })

  test('should schedule appointment outside business hours', async ({ request }) => {
    // Mock current time to be evening
    const mockDate = new Date()
    mockDate.setHours(20, 0, 0, 0) // 8 PM
    
    // Create test job
    const { data: job } = await supabase
      .from('workflow_jobs')
      .insert({
        tenant_id: 'test',
        user_id: '00000000-0000-0000-0000-000000000000',
        status: 'analysis_completed',
        result: {
          savingsCents: 5000,
          confidence: 0.9
        }
      })
      .select()
      .single()
    
    // Trigger analysis completion
    await supabase.from('negotiation_events').insert({
      job_id: job.id,
      type: 'negotiation_completed',
      data: { savingsCents: 5000 }
    })
    
    // Wait for appointment to be created
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    // Check appointment was scheduled
    const { data: appointment } = await supabase
      .from('negotiation_appointments')
      .select('*')
      .eq('job_id', job.id)
      .single()
    
    expect(appointment).toBeTruthy()
    expect(appointment.status).toBe('scheduled')
    
    // Verify appointment is during business hours
    const appointmentDate = new Date(appointment.starts_at)
    const hour = appointmentDate.getHours()
    expect(hour).toBeGreaterThanOrEqual(9)
    expect(hour).toBeLessThan(17)
  })
})