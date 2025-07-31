const { Client } = require('pg')

const sql = `
-- Create workflow_status table
CREATE TABLE IF NOT EXISTS public.workflow_status (
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
);

-- Create files table  
CREATE TABLE IF NOT EXISTS public.files (
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
);

-- Enable RLS
ALTER TABLE public.workflow_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for workflow_status
CREATE POLICY IF NOT EXISTS "Users can view their own workflow status" ON public.workflow_status
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own workflow status" ON public.workflow_status
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own workflow status" ON public.workflow_status
    FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for files
CREATE POLICY IF NOT EXISTS "Users can view their own files" ON public.files
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own files" ON public.files
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own files" ON public.files
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own files" ON public.files
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_workflow_status_user_id ON public.workflow_status(user_id);
CREATE INDEX IF NOT EXISTS idx_workflow_status_status ON public.workflow_status(status);
CREATE INDEX IF NOT EXISTS idx_files_user_id ON public.files(user_id);
CREATE INDEX IF NOT EXISTS idx_files_status ON public.files(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_workflow_status_updated_at ON public.workflow_status;
CREATE TRIGGER update_workflow_status_updated_at BEFORE UPDATE ON public.workflow_status
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_files_updated_at ON public.files;
CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON public.files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`

async function executeMigrations() {
  const client = new Client({
    host: 'db.aqvnasuputatphvqrqam.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '20Vi425!?',
    ssl: { rejectUnauthorized: false },
  })

  try {
    console.log('🔗 Connecting to Supabase database...')
    await client.connect()
    console.log('✅ Connected successfully')

    console.log('📝 Executing SQL migrations...')
    await client.query(sql)
    console.log('✅ Migrations executed successfully')

    // Check if tables were created
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('workflow_status', 'files')
    `)

    console.log('\n📊 Created tables:')
    tablesResult.rows.forEach((row) => {
      console.log(`   ✅ ${row.table_name}`)
    })
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.detail) {
      console.error('   Detail:', error.detail)
    }
  } finally {
    await client.end()
    console.log('\n🔒 Database connection closed')
  }
}

// Run the migrations
executeMigrations()
