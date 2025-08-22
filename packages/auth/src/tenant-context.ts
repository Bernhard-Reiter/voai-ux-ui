import { createClient } from '@supabase/supabase-js'

export interface TenantContext {
  tenantId: string
  userId: string
  organizationId?: string
  permissions: string[]
}

export class TenantContextManager {
  private static instance: TenantContextManager
  private context: TenantContext | null = null

  private constructor() {}

  static getInstance(): TenantContextManager {
    if (!TenantContextManager.instance) {
      TenantContextManager.instance = new TenantContextManager()
    }
    return TenantContextManager.instance
  }

  async establishContext(supabase: any, tenantId?: string): Promise<TenantContext> {
    try {
      const { data, error } = await supabase.functions.invoke('tenant-context', {
        headers: tenantId ? { 'x-tenant-id': tenantId } : {},
      })

      if (error) throw error
      if (!data.success) throw new Error(data.error)

      this.context = data.context
      return this.context
    } catch (error) {
      console.error('Failed to establish tenant context:', error)
      throw error
    }
  }

  getContext(): TenantContext | null {
    return this.context
  }

  getTenantId(): string | null {
    return this.context?.tenantId || null
  }

  hasPermission(permission: string): boolean {
    return this.context?.permissions.includes(permission) || false
  }

  clearContext(): void {
    this.context = null
  }
}

// React Hook for tenant context
export function useTenantContext() {
  const [context, setContext] = useState<TenantContext | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const manager = TenantContextManager.getInstance()
    const currentContext = manager.getContext()
    
    if (currentContext) {
      setContext(currentContext)
      setLoading(false)
    } else {
      // Context needs to be established
      setError(new Error('Tenant context not established'))
      setLoading(false)
    }
  }, [])

  return { context, loading, error }
}

// Middleware for API routes
export async function withTenantContext(
  req: Request,
  handler: (req: Request, context: TenantContext) => Promise<Response>
): Promise<Response> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response('Unauthorized', { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    })

    const manager = TenantContextManager.getInstance()
    const tenantId = req.headers.get('x-tenant-id') || undefined
    const context = await manager.establishContext(supabase, tenantId)

    return handler(req, context)
  } catch (error) {
    console.error('Tenant context middleware error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// Helper to add tenant filtering to Supabase queries
export function withTenantFilter<T extends { from: (table: string) => any }>(
  query: T,
  tenantIdField = 'tenant_id'
): T {
  const manager = TenantContextManager.getInstance()
  const tenantId = manager.getTenantId()
  
  if (!tenantId) {
    throw new Error('No tenant context established')
  }

  // Add tenant filter to the query
  return query.eq(tenantIdField, tenantId) as T
}