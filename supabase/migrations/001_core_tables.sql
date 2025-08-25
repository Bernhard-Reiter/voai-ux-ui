-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- Core workflow tables
CREATE TABLE workflow_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  type TEXT NOT NULL DEFAULT 'negotiation',
  status TEXT NOT NULL DEFAULT 'queued',
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  result JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  billing_status TEXT DEFAULT 'pending',
  
  CHECK (status IN ('queued', 'ingest_running', 'ingest_completed', 'analysis_running', 'analysis_completed', 'calling', 'scheduled', 'completed', 'failed', 'paid'))
);

CREATE TABLE workflow_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES workflow_jobs(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  message TEXT,
  progress INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (progress >= 0 AND progress <= 100)
);

CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  business_hours JSONB DEFAULT '{"mon": {"start": "09:00", "end": "17:00"}, "tue": {"start": "09:00", "end": "17:00"}, "wed": {"start": "09:00", "end": "17:00"}, "thu": {"start": "09:00", "end": "17:00"}, "fri": {"start": "09:00", "end": "17:00"}}',
  timezone TEXT DEFAULT 'Europe/Berlin',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  stripe_customer_id TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE negotiation_appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES workflow_jobs(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES merchants(id),
  customer_id UUID REFERENCES customers(id),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Europe/Berlin',
  status TEXT DEFAULT 'scheduled',
  reminder_sent BOOLEAN DEFAULT FALSE,
  ics_uid TEXT UNIQUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (status IN ('scheduled', 'reminded', 'started', 'completed', 'cancelled', 'no_show'))
);

CREATE TABLE negotiation_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES workflow_jobs(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES negotiation_appointments(id),
  type TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (type IN ('scheduled', 'reminder_sent', 'call_started', 'call_completed', 'call_failed', 'negotiation_completed', 'invoice_created', 'invoice_paid'))
);

CREATE TABLE voice_calls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES workflow_jobs(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES negotiation_appointments(id),
  provider TEXT DEFAULT 'vapi',
  provider_call_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'initiated',
  direction TEXT DEFAULT 'outbound',
  from_number TEXT,
  to_number TEXT,
  duration_seconds INTEGER,
  transcript TEXT,
  metadata JSONB DEFAULT '{}',
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (status IN ('initiated', 'ringing', 'answered', 'completed', 'failed', 'busy', 'no-answer', 'voicemail'))
);

-- Consent tracking
CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  job_id UUID REFERENCES workflow_jobs(id),
  type TEXT NOT NULL,
  purpose TEXT NOT NULL,
  granted BOOLEAN NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (type IN ('data_processing', 'voice_call', 'marketing'))
);

-- Vector storage for RAG
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES workflow_jobs(id) ON DELETE CASCADE,
  tenant_id TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(job_id, chunk_index)
);

-- Billing tables
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id TEXT NOT NULL,
  job_id UUID NOT NULL REFERENCES workflow_jobs(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  stripe_invoice_id TEXT UNIQUE,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'draft',
  due_date DATE,
  paid_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK (status IN ('draft', 'sent', 'paid', 'void', 'uncollectible'))
);

CREATE TABLE stripe_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workflow_jobs_tenant_status ON workflow_jobs(tenant_id, status);
CREATE INDEX idx_workflow_jobs_created_at ON workflow_jobs(created_at DESC);
CREATE INDEX idx_workflow_status_job_id ON workflow_status(job_id);
CREATE INDEX idx_workflow_status_created_at ON workflow_status(created_at DESC);
CREATE INDEX idx_negotiation_appointments_starts_at ON negotiation_appointments(starts_at);
CREATE INDEX idx_negotiation_appointments_status ON negotiation_appointments(status);
CREATE INDEX idx_negotiation_events_job_id ON negotiation_events(job_id);
CREATE INDEX idx_voice_calls_job_id ON voice_calls(job_id);
CREATE INDEX idx_voice_calls_provider_call_id ON voice_calls(provider_call_id);
CREATE INDEX idx_document_embeddings_job_id ON document_embeddings(job_id);
CREATE INDEX idx_invoices_tenant_id ON invoices(tenant_id);
CREATE INDEX idx_invoices_stripe_invoice_id ON invoices(stripe_invoice_id);

-- RLS Policies
ALTER TABLE workflow_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE negotiation_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE negotiation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (tenant isolation)
CREATE POLICY "Tenant isolation" ON workflow_jobs
  FOR ALL USING (tenant_id = current_setting('app.tenant_id', true));

CREATE POLICY "Tenant isolation" ON workflow_status
  FOR ALL USING (EXISTS (
    SELECT 1 FROM workflow_jobs WHERE id = workflow_status.job_id 
    AND tenant_id = current_setting('app.tenant_id', true)
  ));

CREATE POLICY "Tenant isolation" ON merchants
  FOR ALL USING (tenant_id = current_setting('app.tenant_id', true));

CREATE POLICY "Tenant isolation" ON customers
  FOR ALL USING (tenant_id = current_setting('app.tenant_id', true));

CREATE POLICY "Tenant isolation" ON consents
  FOR ALL USING (tenant_id = current_setting('app.tenant_id', true));

CREATE POLICY "Tenant isolation" ON document_embeddings
  FOR ALL USING (tenant_id = current_setting('app.tenant_id', true));

CREATE POLICY "Tenant isolation" ON invoices
  FOR ALL USING (tenant_id = current_setting('app.tenant_id', true));

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_workflow_jobs_updated_at BEFORE UPDATE ON workflow_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_merchants_updated_at BEFORE UPDATE ON merchants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_negotiation_appointments_updated_at BEFORE UPDATE ON negotiation_appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();