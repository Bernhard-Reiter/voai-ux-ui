# Multi-Tenant Setup Guide

## Overview

This guide provides detailed instructions for setting up and managing the multi-tenant architecture in VOAI.

## Architecture Components

### 1. Database Layer (Supabase)

#### Row Level Security (RLS)
Every table in the database has RLS enabled to ensure complete tenant isolation:

```sql
-- Enable RLS on a table
ALTER TABLE public.your_table ENABLE ROW LEVEL SECURITY;

-- Create tenant isolation policy
CREATE POLICY "tenant_isolation"
  ON public.your_table
  FOR ALL
  USING (tenant_id = auth.tenant_id());
```

#### Tenant Context Function
The `auth.tenant_id()` function determines the current tenant:

```sql
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
```

### 2. Edge Functions Layer

#### Tenant Context Establishment
The `tenant-context` Edge Function validates and establishes tenant context:

```typescript
// supabase/functions/tenant-context/index.ts
const { data: { user } } = await supabase.auth.getUser()
const tenantId = req.headers.get('x-tenant-id') || user.default_tenant_id

// Validate access
const hasAccess = await validateTenantAccess(user.id, tenantId)
if (!hasAccess) {
  throw new Error('Access denied')
}

// Return context with permissions
return { tenantId, userId: user.id, permissions }
```

### 3. Application Layer

#### Tenant Context Manager
Singleton service for managing tenant context:

```typescript
import { TenantContextManager } from '@voai/auth/tenant-context'

// Establish context
const manager = TenantContextManager.getInstance()
const context = await manager.establishContext(supabase, tenantId)

// Check permissions
if (manager.hasPermission('manage_organization')) {
  // Allow admin actions
}
```

#### React Integration
Use the provided hooks in React components:

```tsx
import { useTenantContext } from '@voai/auth/tenant-context'

export function TenantDashboard() {
  const { context, loading, error } = useTenantContext()
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage />
  
  return (
    <div>
      <h1>Tenant: {context.tenantId}</h1>
      <p>Permissions: {context.permissions.join(', ')}</p>
    </div>
  )
}
```

## Implementation Steps

### Step 1: Database Setup

1. **Run the migration**
   ```bash
   supabase migration up 20250122_multi_tenant_rls
   ```

2. **Verify RLS is enabled**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public';
   ```

### Step 2: Deploy Edge Functions

1. **Deploy tenant-context function**
   ```bash
   supabase functions deploy tenant-context
   ```

2. **Set environment variables**
   ```bash
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-key
   ```

### Step 3: Configure Application

1. **Install dependencies**
   ```bash
   pnpm add @voai/auth
   ```

2. **Wrap API routes**
   ```typescript
   // app/api/protected/route.ts
   import { withTenantContext } from '@voai/auth/tenant-context'
   
   export async function GET(req) {
     return withTenantContext(req, async (req, context) => {
       // Your tenant-aware logic here
     })
   }
   ```

3. **Initialize in layout**
   ```tsx
   // app/layout.tsx
   export default async function RootLayout({ children }) {
     const supabase = createServerClient()
     const manager = TenantContextManager.getInstance()
     
     try {
       await manager.establishContext(supabase)
     } catch (error) {
       // Handle error
     }
     
     return <html>{children}</html>
   }
   ```

## Tenant Management

### Creating a New Tenant

```typescript
async function createTenant(name: string, ownerId: string) {
  // 1. Create organization
  const { data: org } = await supabase
    .from('organizations')
    .insert({ name, created_by: ownerId })
    .select()
    .single()
  
  // 2. Add owner as member
  await supabase
    .from('organization_members')
    .insert({
      organization_id: org.id,
      user_id: ownerId,
      role: 'owner',
      status: 'active'
    })
  
  // 3. Initialize tenant settings
  await supabase
    .from('tenant_settings')
    .insert({
      tenant_id: org.id,
      settings: { 
        plan: 'free',
        limits: { users: 5, projects: 3 }
      }
    })
  
  return org
}
```

### Switching Tenants

```typescript
async function switchTenant(tenantId: string) {
  const manager = TenantContextManager.getInstance()
  
  try {
    // Clear existing context
    manager.clearContext()
    
    // Establish new context
    const context = await manager.establishContext(supabase, tenantId)
    
    // Reload application data
    window.location.reload()
  } catch (error) {
    console.error('Failed to switch tenant:', error)
  }
}
```

### Managing Permissions

```typescript
// Define permission sets
const PERMISSION_SETS = {
  owner: ['manage_organization', 'manage_members', 'manage_billing', 'view_all', 'edit_all', 'delete_all'],
  admin: ['manage_members', 'view_all', 'edit_all', 'delete_all'],
  member: ['view_all', 'edit_own', 'delete_own'],
  viewer: ['view_all']
}

// Update user role
async function updateUserRole(userId: string, newRole: string) {
  const { context } = useTenantContext()
  
  if (!context.permissions.includes('manage_members')) {
    throw new Error('Insufficient permissions')
  }
  
  await supabase
    .from('organization_members')
    .update({ role: newRole })
    .eq('user_id', userId)
    .eq('organization_id', context.tenantId)
}
```

## Security Considerations

### 1. Always Validate Tenant Access

```typescript
// ❌ Bad: Direct access without validation
const data = await supabase.from('resources').select()

// ✅ Good: Tenant-filtered access
const data = await supabase
  .from('resources')
  .select()
  .eq('tenant_id', context.tenantId)
```

### 2. Use Service Role Keys Carefully

```typescript
// Only use service role for admin operations
const adminClient = createClient(url, serviceRoleKey)

// Always filter by tenant even with service role
const data = await adminClient
  .from('sensitive_data')
  .select()
  .eq('tenant_id', validatedTenantId)
```

### 3. Audit All Tenant Operations

```typescript
async function auditAction(action: string, resourceType: string, resourceId?: string) {
  await supabase.from('tenant_audit_logs').insert({
    tenant_id: context.tenantId,
    user_id: context.userId,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    metadata: { timestamp: new Date().toISOString() }
  })
}
```

## Testing Multi-Tenancy

### Unit Tests

```typescript
describe('Tenant Context', () => {
  it('should isolate data between tenants', async () => {
    // Create test tenants
    const tenant1 = await createTestTenant()
    const tenant2 = await createTestTenant()
    
    // Create data for tenant 1
    await supabase.rpc('set_config', { 
      setting: 'app.tenant_id', 
      value: tenant1.id 
    })
    await supabase.from('resources').insert({ name: 'Resource 1' })
    
    // Switch to tenant 2 and verify isolation
    await supabase.rpc('set_config', { 
      setting: 'app.tenant_id', 
      value: tenant2.id 
    })
    const { data } = await supabase.from('resources').select()
    
    expect(data).toHaveLength(0)
  })
})
```

### Integration Tests

```typescript
describe('Tenant API', () => {
  it('should enforce tenant boundaries', async () => {
    const tenant1Token = await getAuthToken(tenant1User)
    const tenant2Token = await getAuthToken(tenant2User)
    
    // Create resource as tenant 1
    const res1 = await fetch('/api/resources', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tenant1Token}`,
        'x-tenant-id': tenant1.id 
      },
      body: JSON.stringify({ name: 'Private Resource' })
    })
    const { id } = await res1.json()
    
    // Try to access as tenant 2
    const res2 = await fetch(`/api/resources/${id}`, {
      headers: { 
        'Authorization': `Bearer ${tenant2Token}`,
        'x-tenant-id': tenant2.id 
      }
    })
    
    expect(res2.status).toBe(404)
  })
})
```

## Monitoring & Debugging

### Enable Debug Logging

```typescript
// Enable in development
if (process.env.NODE_ENV === 'development') {
  TenantContextManager.enableDebugLogging()
}
```

### Query Tenant Logs

```sql
-- View recent tenant activities
SELECT * FROM tenant_audit_logs
WHERE tenant_id = 'your-tenant-id'
ORDER BY created_at DESC
LIMIT 100;

-- Find permission errors
SELECT * FROM tenant_audit_logs
WHERE action = 'permission_denied'
AND created_at > NOW() - INTERVAL '1 day';
```

### Performance Monitoring

```typescript
// Track tenant query performance
const start = performance.now()
const data = await fetchTenantData()
const duration = performance.now() - start

await logMetric('tenant_query_duration', duration, {
  tenant_id: context.tenantId,
  query_type: 'fetch_resources'
})
```

## Best Practices

1. **Always use tenant context** - Never bypass tenant isolation
2. **Validate permissions** - Check before allowing actions
3. **Audit everything** - Log all tenant operations
4. **Test isolation** - Verify data boundaries
5. **Monitor performance** - Track per-tenant metrics
6. **Handle errors gracefully** - Provide clear error messages
7. **Document tenant features** - Keep docs updated

## Troubleshooting

### Common Issues

1. **"No tenant context established"**
   - Ensure `TenantContextManager.establishContext()` is called
   - Check authentication is valid
   - Verify tenant ID is provided

2. **"Access denied to this tenant"**
   - User is not a member of the requested tenant
   - Check `organization_members` table
   - Verify membership status is 'active'

3. **Data leaking between tenants**
   - Verify RLS is enabled on all tables
   - Check policies use `auth.tenant_id()`
   - Audit direct database queries

### Debug Commands

```bash
# Check RLS status
supabase inspect db --include-schemas public

# View active policies
psql -c "SELECT * FROM pg_policies WHERE schemaname = 'public';"

# Test tenant function
psql -c "SELECT auth.tenant_id();"
```

---

For more information, see the [main deployment documentation](./README.md).