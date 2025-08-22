import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-tenant-id',
}

interface TenantContext {
  tenantId: string
  userId: string
  organizationId?: string
  permissions: string[]
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Get auth header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create client with user's JWT
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    })

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      throw new Error('Invalid authentication')
    }

    // Get tenant ID from header or user metadata
    let tenantId = req.headers.get('x-tenant-id')
    
    if (!tenantId) {
      // Try to get from user's primary organization
      const { data: membership } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()
      
      if (membership) {
        tenantId = membership.organization_id
      } else {
        tenantId = user.id // Fall back to user ID as tenant ID
      }
    }

    // Validate user has access to this tenant
    const { data: hasAccess } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', tenantId)
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (!hasAccess && tenantId !== user.id) {
      throw new Error('Access denied to this tenant')
    }

    // Get user permissions for this tenant
    const permissions: string[] = []
    if (hasAccess) {
      switch (hasAccess.role) {
        case 'owner':
          permissions.push('manage_organization', 'manage_members', 'manage_billing', 'view_all', 'edit_all', 'delete_all')
          break
        case 'admin':
          permissions.push('manage_members', 'view_all', 'edit_all', 'delete_all')
          break
        case 'member':
          permissions.push('view_all', 'edit_own', 'delete_own')
          break
        case 'viewer':
          permissions.push('view_all')
          break
      }
    }

    // Create service client to set tenant context
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

    // Set tenant context for this session
    await serviceClient.rpc('set_config', {
      setting: 'app.tenant_id',
      value: tenantId,
    })

    // Log activity
    await serviceClient.from('tenant_audit_logs').insert({
      tenant_id: tenantId,
      user_id: user.id,
      action: 'context_established',
      resource_type: 'tenant',
      resource_id: tenantId,
      metadata: {
        permissions,
        ip_address: req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
      },
    })

    const context: TenantContext = {
      tenantId,
      userId: user.id,
      organizationId: hasAccess ? tenantId : undefined,
      permissions,
    }

    return new Response(
      JSON.stringify({ success: true, context }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})