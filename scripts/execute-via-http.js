const https = require('https')
const fs = require('fs')
const path = require('path')

// Configuration
const SUPABASE_PROJECT_ID = 'aqvnasuputatphvqrqam'
const SUPABASE_SERVICE_KEY = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

async function makeSupabaseRequest(endpoint, method = 'GET', body = null) {
  const url = new URL(`https://${SUPABASE_PROJECT_ID}.supabase.co${endpoint}`)

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: 'return=representation',
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, options)
    const data = await response.text()

    return {
      status: response.status,
      data: data ? (data.startsWith('{') || data.startsWith('[') ? JSON.parse(data) : data) : null,
      headers: response.headers,
    }
  } catch (error) {
    return {
      status: 500,
      error: error.message,
    }
  }
}

async function executeSQLCommands() {
  console.log('🚀 Attempting to execute SQL via Supabase Admin API...\n')

  // Test 1: Check if we can access the database
  console.log('1️⃣ Testing database access...')
  const healthCheck = await makeSupabaseRequest('/rest/v1/', 'GET')
  console.log(`Health check status: ${healthCheck.status}`)

  // Test 2: Try Supabase Management API
  console.log('\n2️⃣ Attempting via Supabase Management API...')

  const managementUrl = `https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_ID}/database/query`

  const sqlQueries = [
    // Create workflow_status table
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
    );`,

    // Create files table
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
    );`,

    // Enable RLS
    `ALTER TABLE public.workflow_status ENABLE ROW LEVEL SECURITY;`,
    `ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;`,

    // Fix permissions
    `GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;`,
    `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;`,
  ]

  for (let i = 0; i < sqlQueries.length; i++) {
    console.log(`\nExecuting query ${i + 1}/${sqlQueries.length}...`)

    try {
      const response = await fetch(managementUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
        body: JSON.stringify({
          query: sqlQueries[i],
        }),
      })

      if (response.ok) {
        console.log(`✅ Query ${i + 1} executed successfully`)
      } else {
        console.log(`❌ Query ${i + 1} failed:`, response.status, await response.text())
      }
    } catch (error) {
      console.log(`❌ Query ${i + 1} error:`, error.message)
    }
  }

  // Test 3: Alternative - Try using Postgres REST API pattern
  console.log('\n3️⃣ Testing alternative approach...')

  // Try to verify table existence
  const tablesCheck = await makeSupabaseRequest('/rest/v1/workflow_status?limit=0', 'GET')
  console.log(`\nworkflow_status table check: ${tablesCheck.status}`)

  const filesCheck = await makeSupabaseRequest('/rest/v1/files?limit=0', 'GET')
  console.log(`files table check: ${filesCheck.status}`)

  console.log('\n✨ Process complete!')

  if (tablesCheck.status !== 200 || filesCheck.status !== 200) {
    console.log('\n⚠️  Tables still need to be created manually in Supabase Dashboard')
    console.log('Please visit: https://supabase.com/dashboard/project/aqvnasuputatphvqrqam/sql/new')
  }
}

executeSQLCommands().catch(console.error)
