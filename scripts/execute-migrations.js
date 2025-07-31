const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.production.local' })

const supabaseUrl = 'https://aqvnasuputatphvqrqam.supabase.co'
const supabaseServiceKey = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function executeMigrations() {
  console.log('🚀 Starting Supabase migrations...\n')

  // Read SQL file
  const sqlPath = path.join(__dirname, 'supabase-pr12-setup.sql')
  const sqlContent = fs.readFileSync(sqlPath, 'utf8')

  // Split SQL content into individual statements
  const statements = sqlContent
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('--'))

  console.log(`Found ${statements.length} SQL statements to execute\n`)

  // Unfortunately, Supabase client doesn't support raw SQL execution
  // We need to use the REST API or connect directly to the database

  console.log('❌ Direct SQL execution not supported via Supabase JS client')
  console.log('\n📝 Please execute the following steps manually:\n')
  console.log('1. Open Supabase SQL Editor:')
  console.log('   https://aqvnasuputatphvqrqam.supabase.co/project/aqvnasuputatphvqrqam/sql\n')
  console.log('2. Copy and paste the SQL from:')
  console.log(`   ${sqlPath}\n`)
  console.log('3. Execute all SQL statements\n')

  // Let's at least verify the tables don't exist yet
  try {
    console.log('🔍 Checking existing tables...\n')

    const { data: workflowStatus, error: wsError } = await supabase
      .from('workflow_status')
      .select('id')
      .limit(1)

    if (wsError && wsError.code === '42P01') {
      console.log('✅ Table "workflow_status" does not exist (good - needs to be created)')
    } else if (!wsError) {
      console.log('⚠️  Table "workflow_status" already exists')
    }

    const { data: files, error: filesError } = await supabase.from('files').select('id').limit(1)

    if (filesError && filesError.code === '42P01') {
      console.log('✅ Table "files" does not exist (good - needs to be created)')
    } else if (!filesError) {
      console.log('⚠️  Table "files" already exists')
    }
  } catch (error) {
    console.error('Error checking tables:', error)
  }
}

executeMigrations().catch(console.error)
