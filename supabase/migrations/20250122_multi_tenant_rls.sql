-- Multi-Tenant RLS Setup for VOAI
-- This migration sets up Row Level Security (RLS) for multi-tenant isolation

-- Enable RLS on all tables
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.api_keys ENABLE ROW LEVEL SECURITY;

-- Create tenant context function
CREATE OR REPLACE FUNCTION auth.tenant_id()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN COALESCE(
    current_setting('app.tenant_id', true)::uuid,
    (auth.jwt() ->> 'tenant_id')::uuid,
    auth.uid()
  );
END;
$$;

-- Create organization membership check
CREATE OR REPLACE FUNCTION auth.is_organization_member(org_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = org_id
    AND user_id = auth.uid()
    AND status = 'active'
  );
END;
$$;

-- RLS Policies for organizations table
CREATE POLICY "Users can view their own organizations"
  ON public.organizations FOR SELECT
  USING (auth.is_organization_member(id));

CREATE POLICY "Organization admins can update"
  ON public.organizations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_id = organizations.id
      AND user_id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- RLS Policies for projects table
CREATE POLICY "Users can view projects in their organizations"
  ON public.projects FOR SELECT
  USING (auth.is_organization_member(organization_id));

CREATE POLICY "Organization members can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.is_organization_member(organization_id));

CREATE POLICY "Project owners can update"
  ON public.projects FOR UPDATE
  USING (
    auth.is_organization_member(organization_id)
    AND (
      owner_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE organization_id = projects.organization_id
        AND user_id = auth.uid()
        AND role IN ('owner', 'admin')
      )
    )
  );

-- RLS Policies for deployments table
CREATE POLICY "Users can view deployments for their projects"
  ON public.deployments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = deployments.project_id
      AND auth.is_organization_member(projects.organization_id)
    )
  );

CREATE POLICY "Project members can create deployments"
  ON public.deployments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_id
      AND auth.is_organization_member(projects.organization_id)
    )
  );

-- RLS Policies for API keys
CREATE POLICY "Users can only view their own API keys"
  ON public.api_keys FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can only manage their own API keys"
  ON public.api_keys FOR ALL
  USING (user_id = auth.uid());

-- Create audit log table for tenant activities
CREATE TABLE IF NOT EXISTS public.tenant_audit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  metadata jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.tenant_audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit log policies
CREATE POLICY "Users can view audit logs for their tenant"
  ON public.tenant_audit_logs FOR SELECT
  USING (tenant_id = auth.tenant_id());

-- Function to log tenant activities
CREATE OR REPLACE FUNCTION log_tenant_activity(
  p_action text,
  p_resource_type text,
  p_resource_id uuid DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.tenant_audit_logs (
    tenant_id,
    user_id,
    action,
    resource_type,
    resource_id,
    metadata,
    ip_address,
    user_agent
  ) VALUES (
    auth.tenant_id(),
    auth.uid(),
    p_action,
    p_resource_type,
    p_resource_id,
    p_metadata,
    inet(current_setting('request.headers', true)::json->>'cf-connecting-ip'),
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_organization_members_user_id ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_organization_members_org_id ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_projects_organization_id ON public.projects(organization_id);
CREATE INDEX IF NOT EXISTS idx_deployments_project_id ON public.deployments(project_id);
CREATE INDEX IF NOT EXISTS idx_tenant_audit_logs_tenant_id ON public.tenant_audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_audit_logs_created_at ON public.tenant_audit_logs(created_at DESC);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects, public.deployments TO authenticated;
GRANT INSERT ON public.tenant_audit_logs TO authenticated;