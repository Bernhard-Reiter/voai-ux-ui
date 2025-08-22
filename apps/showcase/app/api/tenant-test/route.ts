import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withTenantContext } from '@voai/auth/tenant-context'

export async function GET(req: NextRequest) {
  return withTenantContext(req, async (req, context) => {
    // This handler now has access to the tenant context
    return NextResponse.json({
      success: true,
      context,
      message: `You are accessing tenant ${context.tenantId} with permissions: ${context.permissions.join(', ')}`,
    })
  })
}

export async function POST(req: NextRequest) {
  return withTenantContext(req, async (req, context) => {
    // Check if user has permission to create resources
    if (!context.permissions.includes('edit_all') && !context.permissions.includes('edit_own')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const data = await req.json()
    
    // Example: Create a resource with tenant isolation
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { data: resource, error } = await supabase
      .from('resources')
      .insert({
        ...data,
        tenant_id: context.tenantId,
        created_by: context.userId,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, resource })
  })
}