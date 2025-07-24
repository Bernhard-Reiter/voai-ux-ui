-- Create workflow_status table
CREATE TABLE IF NOT EXISTS public.workflow_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'success', 'failed')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  message TEXT,
  result JSONB,
  error JSONB,
  input_data JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_workflow_status_user_id ON public.workflow_status(user_id);
CREATE INDEX idx_workflow_status_status ON public.workflow_status(status);
CREATE INDEX idx_workflow_status_created_at ON public.workflow_status(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.workflow_status ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own workflow status" ON public.workflow_status
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workflow status" ON public.workflow_status
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update any workflow status" ON public.workflow_status
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'service_role');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.workflow_status
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.workflow_status;