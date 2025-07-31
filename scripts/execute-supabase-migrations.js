#!/usr/bin/env node

// Execute Supabase migrations via REST API
const https = require('https')

const SUPABASE_URL = 'https://aqvnasuputatphvqrqam.supabase.co'
const SUPABASE_SERVICE_KEY = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

// SQL statements to execute
const migrations = [
  {
    name: 'Create workflow_status table',
    sql: `CREATE TABLE IF NOT EXISTS public.workflow_status (
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
  },
  {
    name: 'Create files table',
    sql: `CREATE TABLE IF NOT EXISTS public.files (
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
  },
  {
    name: 'Enable RLS on tables',
    sql: `ALTER TABLE public.workflow_status ENABLE ROW LEVEL SECURITY;
          ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: 'Create RLS policies for workflow_status',
    sql: `CREATE POLICY IF NOT EXISTS "Users can view their own workflow status" ON public.workflow_status
            FOR SELECT USING (auth.uid() = user_id);
          CREATE POLICY IF NOT EXISTS "Users can insert their own workflow status" ON public.workflow_status
            FOR INSERT WITH CHECK (auth.uid() = user_id);
          CREATE POLICY IF NOT EXISTS "Users can update their own workflow status" ON public.workflow_status
            FOR UPDATE USING (auth.uid() = user_id);`,
  },
  {
    name: 'Create RLS policies for files',
    sql: `CREATE POLICY IF NOT EXISTS "Users can view their own files" ON public.files
            FOR SELECT USING (auth.uid() = user_id);
          CREATE POLICY IF NOT EXISTS "Users can insert their own files" ON public.files
            FOR INSERT WITH CHECK (auth.uid() = user_id);
          CREATE POLICY IF NOT EXISTS "Users can update their own files" ON public.files
            FOR UPDATE USING (auth.uid() = user_id);
          CREATE POLICY IF NOT EXISTS "Users can delete their own files" ON public.files
            FOR DELETE USING (auth.uid() = user_id);`,
  },
  {
    name: 'Create indexes',
    sql: `CREATE INDEX IF NOT EXISTS idx_workflow_status_user_id ON public.workflow_status(user_id);
          CREATE INDEX IF NOT EXISTS idx_workflow_status_status ON public.workflow_status(status);
          CREATE INDEX IF NOT EXISTS idx_files_user_id ON public.files(user_id);
          CREATE INDEX IF NOT EXISTS idx_files_status ON public.files(status);`,
  },
  {
    name: 'Create updated_at trigger function',
    sql: `CREATE OR REPLACE FUNCTION update_updated_at_column()
          RETURNS TRIGGER AS $$
          BEGIN
              NEW.updated_at = NOW();
              RETURN NEW;
          END;
          $$ language 'plpgsql';`,
  },
  {
    name: 'Create triggers',
    sql: `CREATE TRIGGER update_workflow_status_updated_at BEFORE UPDATE ON public.workflow_status
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
          CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON public.files
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`,
  },
]

async function executeMigration(migration) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: migration.sql })

    const options = {
      hostname: 'aqvnasuputatphvqrqam.supabase.co',
      port: 443,
      path: '/rest/v1/rpc/sql',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        apikey: SUPABASE_SERVICE_KEY,
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }

    const req = https.request(options, (res) => {
      let responseData = ''

      res.on('data', (chunk) => {
        responseData += chunk
      })

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 204) {
          console.log(`✅ ${migration.name}`)
          resolve()
        } else {
          console.log(`❌ ${migration.name}: ${res.statusCode} - ${responseData}`)
          // Continue with next migration even if this one fails
          resolve()
        }
      })
    })

    req.on('error', (error) => {
      console.error(`❌ ${migration.name}: ${error.message}`)
      resolve() // Continue with next migration
    })

    req.write(data)
    req.end()
  })
}

async function runMigrations() {
  console.log('🚀 Executing Supabase migrations...\n')

  for (const migration of migrations) {
    await executeMigration(migration)
  }

  console.log('\n✨ Migration process complete!')
  console.log('\n📋 Next steps:')
  console.log('1. Create Storage Buckets in Supabase Dashboard')
  console.log(
    '2. Verify tables were created: https://aqvnasuputatphvqrqam.supabase.co/project/aqvnasuputatphvqrqam/editor'
  )
}

// Note: The REST API approach might not work for DDL statements
// Alternative: Use Supabase CLI or Dashboard
console.log('⚠️  Note: Direct SQL execution via REST API might be limited.')
console.log('📌 Alternative approach: Use Supabase Dashboard SQL Editor')
console.log('   URL: https://aqvnasuputatphvqrqam.supabase.co/project/aqvnasuputatphvqrqam/sql\n')
console.log('Copy and paste the SQL from: scripts/supabase-pr12-setup.sql\n')

// Try to run migrations anyway
runMigrations().catch(console.error)
