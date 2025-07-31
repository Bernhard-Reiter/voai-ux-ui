const { createClient } = require('@supabase/supabase-js')

// Supabase credentials
const SUPABASE_URL = 'https://aqvnasuputatphvqrqam.supabase.co'
const SERVICE_KEY = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

async function testTables() {
  console.log('🧪 Detailed table testing...\n')

  // Test 1: Direct query
  console.log('1️⃣ Testing direct queries...')

  try {
    const { data: wsData, error: wsError } = await supabase.from('workflow_status').select('*')

    console.log('workflow_status query result:')
    console.log('- Data:', wsData)
    console.log('- Error:', wsError)
    console.log('- Success:', !wsError)
  } catch (e) {
    console.log('workflow_status exception:', e.message)
  }

  console.log('\n')

  try {
    const { data: fData, error: fError } = await supabase.from('files').select('*')

    console.log('files query result:')
    console.log('- Data:', fData)
    console.log('- Error:', fError)
    console.log('- Success:', !fError)
  } catch (e) {
    console.log('files exception:', e.message)
  }

  // Test 2: Check table existence via system tables
  console.log('\n2️⃣ Checking via information_schema...')

  try {
    const { data, error } = await supabase.rpc('get_tables', {
      schema_name: 'public',
    })

    if (error) {
      console.log('RPC not available, trying raw query...')

      // Try to get table list another way
      const tables = ['workflow_status', 'files']
      for (const table of tables) {
        const { error: tableError } = await supabase.from(table).select('id').limit(0)

        if (!tableError) {
          console.log(`✅ Table "${table}" exists`)
        } else if (tableError.code === '42P01') {
          console.log(`❌ Table "${table}" does not exist`)
        } else {
          console.log(`⚠️  Table "${table}" status unclear:`, tableError.code)
        }
      }
    } else {
      console.log('Tables in public schema:', data)
    }
  } catch (e) {
    console.log('System check error:', e.message)
  }

  // Test 3: Try to insert test data
  console.log('\n3️⃣ Testing insert operations...')

  // First create a test user ID
  const testUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

  try {
    const { data, error } = await supabase
      .from('workflow_status')
      .insert({
        user_id: testUserId,
        workflow_type: 'test',
        status: 'pending',
      })
      .select()

    if (!error) {
      console.log('✅ Successfully inserted into workflow_status')
      console.log('Inserted data:', data)

      // Clean up
      await supabase.from('workflow_status').delete().eq('id', data[0].id)
    } else {
      console.log('❌ Insert failed:', error.message, error.code)
    }
  } catch (e) {
    console.log('❌ Insert exception:', e.message)
  }

  console.log('\n✨ Detailed test complete!')
}

testTables().catch(console.error)
