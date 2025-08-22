#!/usr/bin/env tsx
// Tenant Isolation Validation Script
// Usage: pnpm tsx scripts/validate-tenant-isolation.ts

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function validateTenantIsolation() {
  console.log('🔐 Validating Tenant Isolation...\n')

  const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  try {
    // 1. Create test tenants
    console.log('1️⃣ Creating test tenants...')
    const { data: tenant1 } = await serviceClient
      .from('organizations')
      .insert({ name: 'Test Tenant 1' })
      .select()
      .single()

    const { data: tenant2 } = await serviceClient
      .from('organizations')
      .insert({ name: 'Test Tenant 2' })
      .select()
      .single()

    console.log('✅ Created tenants:', tenant1.id, tenant2.id)

    // 2. Create test users
    console.log('\n2️⃣ Creating test users...')
    const { data: { user: user1 } } = await serviceClient.auth.admin.createUser({
      email: 'user1@test.com',
      password: 'testpass123',
      email_confirm: true,
    })

    const { data: { user: user2 } } = await serviceClient.auth.admin.createUser({
      email: 'user2@test.com',
      password: 'testpass123',
      email_confirm: true,
    })

    console.log('✅ Created users:', user1.id, user2.id)

    // 3. Assign users to different tenants
    console.log('\n3️⃣ Assigning users to tenants...')
    await serviceClient.from('organization_members').insert([
      {
        organization_id: tenant1.id,
        user_id: user1.id,
        role: 'owner',
        status: 'active',
      },
      {
        organization_id: tenant2.id,
        user_id: user2.id,
        role: 'owner',
        status: 'active',
      },
    ])

    console.log('✅ User 1 → Tenant 1')
    console.log('✅ User 2 → Tenant 2')

    // 4. Create test data for each tenant
    console.log('\n4️⃣ Creating tenant-specific data...')
    
    // Set tenant context for tenant 1
    await serviceClient.rpc('set_config', {
      setting: 'app.tenant_id',
      value: tenant1.id,
    })

    const { data: resource1 } = await serviceClient
      .from('resources')
      .insert({
        name: 'Secret Resource Tenant 1',
        tenant_id: tenant1.id,
      })
      .select()
      .single()

    // Set tenant context for tenant 2
    await serviceClient.rpc('set_config', {
      setting: 'app.tenant_id',
      value: tenant2.id,
    })

    const { data: resource2 } = await serviceClient
      .from('resources')
      .insert({
        name: 'Secret Resource Tenant 2',
        tenant_id: tenant2.id,
      })
      .select()
      .single()

    console.log('✅ Created resources for both tenants')

    // 5. Test isolation - User 1 tries to access Tenant 2's data
    console.log('\n5️⃣ Testing cross-tenant access (should fail)...')
    
    // Login as user 1
    const { data: { session: session1 } } = await serviceClient.auth.signInWithPassword({
      email: 'user1@test.com',
      password: 'testpass123',
    })

    const user1Client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${session1!.access_token}`,
        },
      },
    })

    // Try to access tenant 2's resource
    const { data: leaked, error } = await user1Client
      .from('resources')
      .select()
      .eq('id', resource2.id)
      .single()

    if (leaked) {
      console.error('❌ SECURITY BREACH: User 1 can access Tenant 2 data!')
      throw new Error('Tenant isolation failed')
    }

    console.log('✅ Access denied as expected')

    // 6. Test proper access - User 1 accesses own data
    console.log('\n6️⃣ Testing same-tenant access (should succeed)...')
    
    const { data: ownData } = await user1Client
      .from('resources')
      .select()
      .eq('tenant_id', tenant1.id)

    if (ownData && ownData.length > 0) {
      console.log('✅ User can access own tenant data')
    } else {
      console.error('❌ User cannot access own data')
      throw new Error('Tenant access failed')
    }

    // 7. Cleanup
    console.log('\n7️⃣ Cleaning up test data...')
    
    // Delete in reverse order
    await serviceClient.from('resources').delete().in('id', [resource1.id, resource2.id])
    await serviceClient.from('organization_members').delete().in('user_id', [user1.id, user2.id])
    await serviceClient.auth.admin.deleteUser(user1.id)
    await serviceClient.auth.admin.deleteUser(user2.id)
    await serviceClient.from('organizations').delete().in('id', [tenant1.id, tenant2.id])

    console.log('✅ Test data cleaned up')

    console.log('\n🎉 All tenant isolation tests passed!')

  } catch (error) {
    console.error('\n❌ Validation failed:', error)
    process.exit(1)
  }
}

// Run validation
validateTenantIsolation().catch(console.error)