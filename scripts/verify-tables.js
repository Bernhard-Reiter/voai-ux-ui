const { createClient } = require('@supabase/supabase-js')

// Supabase credentials
const SUPABASE_URL = 'https://aqvnasuputatphvqrqam.supabase.co'
const SERVICE_KEY = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

async function verifyTables() {
  console.log('🔍 Verifying Supabase tables...\n')

  // Check workflow_status table
  try {
    const { data, error, count } = await supabase
      .from('workflow_status')
      .select('*', { count: 'exact', head: true })

    if (!error) {
      console.log('✅ Table "workflow_status" exists')
      console.log(`   - Row count: ${count || 0}`)
    } else {
      console.log('❌ Table "workflow_status" error:', error.message || error)
    }
  } catch (e) {
    console.log('❌ Error checking workflow_status:', e.message)
  }

  // Check files table
  try {
    const { data, error, count } = await supabase
      .from('files')
      .select('*', { count: 'exact', head: true })

    if (!error) {
      console.log('✅ Table "files" exists')
      console.log(`   - Row count: ${count || 0}`)
    } else {
      console.log('❌ Table "files" error:', error.message || error)
    }
  } catch (e) {
    console.log('❌ Error checking files:', e.message)
  }

  // Check RLS policies
  console.log('\n🔒 Checking RLS policies...')

  try {
    // Test with anon key to verify RLS
    const anonClient = createClient(SUPABASE_URL, 'sb_publishable_ba4oSPMoIr1EI1Wh_WyDsg_SdD2Z5ua')

    const { data: workflowTest, error: workflowError } = await anonClient
      .from('workflow_status')
      .select('*')
      .limit(1)

    if (workflowError && workflowError.message.includes('JWT')) {
      console.log('✅ RLS is active on workflow_status table')
    } else {
      console.log('⚠️  Check RLS on workflow_status table')
    }

    const { data: filesTest, error: filesError } = await anonClient
      .from('files')
      .select('*')
      .limit(1)

    if (filesError && filesError.message.includes('JWT')) {
      console.log('✅ RLS is active on files table')
    } else {
      console.log('⚠️  Check RLS on files table')
    }
  } catch (e) {
    console.log('⚠️  Could not verify RLS policies')
  }

  // Check storage buckets
  console.log('\n📦 Checking storage buckets...')

  try {
    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (!error && buckets) {
      console.log(`✅ Found ${buckets.length} storage buckets:`)
      buckets.forEach((bucket) => {
        console.log(`   - ${bucket.name} (${bucket.public ? 'public' : 'private'})`)
      })
    }
  } catch (e) {
    console.log('❌ Error checking buckets:', e.message)
  }

  console.log('\n✨ Verification complete!')
}

verifyTables().catch(console.error)
