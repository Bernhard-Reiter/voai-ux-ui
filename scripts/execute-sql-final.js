const { createClient } = require('@supabase/supabase-js')
const https = require('https')

// Supabase credentials
const SUPABASE_URL = 'https://aqvnasuputatphvqrqam.supabase.co'
const SERVICE_KEY = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// SQL statements to execute
const sqlStatements = [
  // 1. Create workflow_status table
  `CREATE TABLE IF NOT EXISTS public.workflow_status (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    file_id UUID,
    workflow_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    result JSONB,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,

  // 2. Create files table
  `CREATE TABLE IF NOT EXISTS public.files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    original_name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
]

// Function to execute SQL via Management API
async function executeSQLViaManagementAPI(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query: sql,
    })

    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: `/v1/projects/${SUPABASE_URL.split('.')[0].split('//')[1]}/database/query`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Length': data.length,
      },
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => (body += chunk))
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body))
        } else {
          reject(new Error(`API Error: ${res.statusCode} - ${body}`))
        }
      })
    })

    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

// Alternative: Try using RPC function
async function createTablesViaRPC() {
  try {
    // Try to create a function that executes our SQL
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: sqlStatements[0],
    })

    if (error) throw error
    return data
  } catch (error) {
    throw new Error(`RPC failed: ${error.message}`)
  }
}

// Main execution
async function executeMigrations() {
  console.log('🚀 Attempting to execute SQL migrations...\n')

  // Method 1: Check if tables already exist
  console.log('📊 Checking existing tables...')

  try {
    const { data: workflowData, error: workflowError } = await supabase
      .from('workflow_status')
      .select('count')
      .limit(1)

    if (!workflowError) {
      console.log('✅ Table "workflow_status" already exists')
    } else {
      console.log('❌ Table "workflow_status" does not exist')
    }
  } catch (e) {
    console.log('❌ Table "workflow_status" does not exist')
  }

  try {
    const { data: filesData, error: filesError } = await supabase
      .from('files')
      .select('count')
      .limit(1)

    if (!filesError) {
      console.log('✅ Table "files" already exists')
    } else {
      console.log('❌ Table "files" does not exist')
    }
  } catch (e) {
    console.log('❌ Table "files" does not exist')
  }

  console.log('\n📝 Attempting different execution methods...\n')

  // Method 2: Try Management API
  console.log('1️⃣ Trying Supabase Management API...')
  try {
    const result = await executeSQLViaManagementAPI(sqlStatements[0])
    console.log('✅ Success via Management API!')
    console.log(result)
  } catch (error) {
    console.log('❌ Management API failed:', error.message)
  }

  // Method 3: Try RPC
  console.log('\n2️⃣ Trying RPC function...')
  try {
    const result = await createTablesViaRPC()
    console.log('✅ Success via RPC!')
    console.log(result)
  } catch (error) {
    console.log('❌ RPC failed:', error.message)
  }

  // Method 4: Direct HTTP request to Supabase
  console.log('\n3️⃣ Trying direct HTTP request...')
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sqlStatements[0] }),
    })

    if (response.ok) {
      console.log('✅ Success via direct HTTP!')
      console.log(await response.json())
    } else {
      console.log('❌ Direct HTTP failed:', response.status, await response.text())
    }
  } catch (error) {
    console.log('❌ Direct HTTP failed:', error.message)
  }

  console.log('\n' + '='.repeat(70))
  console.log('⚠️  AUTOMATIC EXECUTION NOT POSSIBLE')
  console.log('='.repeat(70))
  console.log('\nSupabase does not allow SQL execution via API for security reasons.')
  console.log('You must execute the SQL manually in the Supabase Dashboard.\n')
  console.log('Please use one of these URLs to access the SQL Editor:')
  console.log('🔗 https://supabase.com/dashboard/project/aqvnasuputatphvqrqam/sql/new')
  console.log('🔗 https://app.supabase.com/project/aqvnasuputatphvqrqam/sql/new\n')
  console.log('Then copy and paste the SQL from:')
  console.log('📄 /Users/bernhard/voai-website/scripts/supabase-pr12-setup.sql')
}

executeMigrations().catch(console.error)
