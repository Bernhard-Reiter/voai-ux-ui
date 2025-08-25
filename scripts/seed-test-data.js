const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seedTestData() {
  console.log('🌱 Seeding test data...')

  try {
    // Create test merchant
    const { data: merchant, error: merchantError } = await supabase
      .from('merchants')
      .insert({
        tenant_id: 'test-tenant',
        name: 'Test Gebäudereinigung GmbH',
        email: 'test@reinigung.de',
        phone: '+49 30 12345678',
        business_hours: {
          mon: { start: '09:00', end: '17:00' },
          tue: { start: '09:00', end: '17:00' },
          wed: { start: '09:00', end: '17:00' },
          thu: { start: '09:00', end: '17:00' },
          fri: { start: '09:00', end: '16:00' }
        },
        timezone: 'Europe/Berlin'
      })
      .select()
      .single()

    if (merchantError) {
      console.error('Error creating merchant:', merchantError)
    } else {
      console.log('✅ Created test merchant:', merchant.id)
    }

    // Create test customer
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert({
        tenant_id: 'test-tenant',
        name: 'Test Kunde',
        email: 'kunde@test.de',
        phone: '+49 170 1234567',
        preferences: {
          preferred_contact: 'phone',
          call_times: ['morning', 'afternoon']
        }
      })
      .select()
      .single()

    if (customerError) {
      console.error('Error creating customer:', customerError)
    } else {
      console.log('✅ Created test customer:', customer.id)
    }

    // Create test job (completed analysis)
    const { data: job, error: jobError } = await supabase
      .from('workflow_jobs')
      .insert({
        tenant_id: 'test-tenant',
        user_id: '00000000-0000-0000-0000-000000000000',
        type: 'negotiation',
        status: 'analysis_completed',
        file_name: 'test-angebot.pdf',
        file_size: 1024000,
        result: {
          summary: 'Gebäudereinigung Angebot mit Optimierungspotenzial',
          savingsCents: 50000,
          confidence: 0.85,
          recommendedActions: [
            'Neuverhandlung der Stundensätze',
            'Optimierung der Reinigungsintervalle',
            'Bündelung mit anderen Standorten'
          ],
          keyPoints: [
            'Aktueller Preis: 2500€/Monat',
            'Marktüblicher Preis: 2000€/Monat',
            'Einsparpotenzial: 500€/Monat'
          ],
          negotiationStrategy: 'Verweisen Sie auf Marktpreise und langfristige Partnerschaft'
        },
        metadata: {
          test_data: true,
          created_for: 'development'
        }
      })
      .select()
      .single()

    if (jobError) {
      console.error('Error creating job:', jobError)
    } else {
      console.log('✅ Created test job:', job.id)

      // Add status entries
      const statuses = [
        { status: 'queued', message: 'Upload erfolgreich', progress: 0 },
        { status: 'ingest_running', message: 'Dokument wird verarbeitet', progress: 20 },
        { status: 'ingest_completed', message: 'OCR und Embeddings erstellt', progress: 50 },
        { status: 'analysis_running', message: 'Analyse läuft', progress: 70 },
        { status: 'analysis_completed', message: 'Analyse abgeschlossen', progress: 100 }
      ]

      for (const status of statuses) {
        await supabase.from('workflow_status').insert({
          job_id: job.id,
          ...status
        })
      }

      console.log('✅ Created status entries')
    }

    console.log('\n✅ Test data seeding complete!')
    console.log(`\n📝 Test Job URL: http://localhost:3000/status?jobId=${job?.id}`)

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seedTestData()