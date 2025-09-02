#!/usr/bin/env node

/**
 * Setup Supabase Environment Variables in Vercel
 * Using the provided Supabase credentials
 */

const https = require('https');

const VERCEL_TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

// Supabase credentials provided by user
const SUPABASE_URL = 'https://aqvnasuputatphvqrqam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1ODA3MjUsImV4cCI6MjA2NTE1NjcyNX0.8uHezlmnL4okIZPH4vSh-MEANyF-_UkILE65hFV_60w';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdm5hc3VwdXRhdHBodnFycWFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTU4MDcyNSwiZXhwIjoyMDY1MTU2NzI1fQ.o0EzGNGZ1G1R9pjKWkRAAA4KjJVi5naJMNaOj0AEGTQ';

async function makeVercelRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    
    req.end();
  });
}

async function updateSupabaseEnvVars() {
  console.log('🚀 Setting up Supabase environment variables in Vercel...\n');

  // Get project
  const projects = await makeVercelRequest('GET', '/v9/projects');
  const project = projects.data.projects.find(p => p.name === 'voai-website-new');
  
  if (!project) {
    console.log('❌ Project not found');
    return;
  }

  console.log(`✅ Found project: ${project.name} (ID: ${project.id})\n`);

  // Get existing env vars to check what needs updating
  const envResponse = await makeVercelRequest('GET', `/v10/projects/${project.id}/env`);
  const existingEnvs = envResponse.data.envs || [];

  // Environment variables to update
  const envVarsToUpdate = [
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      value: SUPABASE_URL,
      type: 'plain',
      target: ['production', 'preview', 'development']
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      value: SUPABASE_ANON_KEY,
      type: 'encrypted',
      target: ['production', 'preview', 'development']
    }
  ];

  // Update each variable
  for (const envVar of envVarsToUpdate) {
    console.log(`\n📝 Processing ${envVar.key}...`);
    
    // Find existing entry
    const existing = existingEnvs.find(e => e.key === envVar.key);
    
    if (existing) {
      // Delete existing entry
      console.log('   🗑️  Removing old value...');
      await makeVercelRequest('DELETE', `/v10/projects/${project.id}/env/${existing.id}`);
    }
    
    // Create new entry with actual values
    console.log('   ✅ Setting new value...');
    const response = await makeVercelRequest('POST', `/v10/projects/${project.id}/env`, envVar);
    
    if (response.status === 200 || response.status === 201) {
      console.log(`   ✅ ${envVar.key} successfully updated!`);
    } else {
      console.log(`   ❌ Failed to update ${envVar.key}: ${JSON.stringify(response.data)}`);
    }
  }

  console.log('\n✨ Supabase environment variables have been set!\n');
  console.log('📋 Summary:');
  console.log(`   - URL: ${SUPABASE_URL}`);
  console.log(`   - Project ID: aqvnasuputatphvqrqam`);
  console.log(`   - Anon Key: ${SUPABASE_ANON_KEY.substring(0, 40)}...`);
  console.log('\n🚀 Next steps:');
  console.log('   1. Go to Vercel dashboard');
  console.log('   2. Trigger a new deployment (Redeploy or push a commit)');
  console.log('   3. Your website should now connect to Supabase successfully!');
  
  console.log('\n⚠️  Security Note:');
  console.log('   - The anon key is public and safe to expose');
  console.log('   - The service role key was NOT added (not needed for landing page)');
  console.log('   - For production apps, consider using separate Supabase projects for staging/prod');
}

updateSupabaseEnvVars().catch(console.error);