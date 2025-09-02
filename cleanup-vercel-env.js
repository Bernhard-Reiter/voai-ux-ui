#!/usr/bin/env node

/**
 * Vercel Environment Variables Cleanup Script
 * 
 * This script removes unused environment variables from Vercel
 * Token: dt0tf16jSilxTukDdpTd6m4Q
 */

const https = require('https');

const VERCEL_TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

// Environment variables that are ACTUALLY USED in the code
const USED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',      // Used in lib/auth/supabase-server.ts
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', // Used in lib/auth/supabase-server.ts
  'NEXT_PUBLIC_CORE_API_BASE',     // Used in lib/api/client.ts
  'NEXT_PUBLIC_SITE_URL',          // Used in lib/modules/core.ts
  'CORE_MODE',                     // Used in lib/modules/core.ts
  'VERCEL_ENV'                     // Used in lib/flags.ts (auto-set by Vercel)
];

// Environment variables to DELETE (not used in current codebase)
const UNUSED_ENV_VARS = [
  'SUPABASE_SERVICE_ROLE_KEY',    // NOT USED - no server-side auth
  'STRIPE_SECRET_KEY',             // NOT USED - no Stripe integration
  'STRIPE_WEBHOOK_SECRET',         // NOT USED - no Stripe webhooks
  'SENTRY_DSN'                     // NOT USED - no Sentry integration
];

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

async function getProjects() {
  console.log('🔍 Fetching Vercel projects...');
  const response = await makeVercelRequest('GET', '/v9/projects');
  return response.data.projects || [];
}

async function findProject(projectName) {
  const projects = await getProjects();
  return projects.find(p => 
    p.name === projectName || 
    p.name === 'voai-website-new' ||
    p.git?.repo === 'voai-website-NEW'
  );
}

async function listEnvVariables(projectId) {
  const response = await makeVercelRequest('GET', `/v10/projects/${projectId}/env`);
  return response.data.envs || [];
}

async function deleteEnvVariable(projectId, envId) {
  const response = await makeVercelRequest('DELETE', `/v10/projects/${projectId}/env/${envId}`);
  return response;
}

async function main() {
  console.log('🧹 Vercel Environment Variables Cleanup\n');

  // Find the project
  const project = await findProject('voai-website-NEW');
  
  if (!project) {
    console.log('❌ Project not found');
    return;
  }

  console.log(`✅ Found project: ${project.name} (ID: ${project.id})\n`);

  // List all env variables
  const envVars = await listEnvVariables(project.id);
  console.log(`📋 Found ${envVars.length} environment variables\n`);

  // Analysis
  console.log('📊 Analysis Results:\n');
  console.log('✅ USED Variables (will be kept):');
  USED_ENV_VARS.forEach(varName => {
    const exists = envVars.find(v => v.key === varName);
    console.log(`   - ${varName} ${exists ? '✓' : '(not set)'}`);
  });

  console.log('\n❌ UNUSED Variables (will be deleted):');
  const toDelete = [];
  UNUSED_ENV_VARS.forEach(varName => {
    const envVar = envVars.find(v => v.key === varName);
    if (envVar) {
      toDelete.push(envVar);
      console.log(`   - ${varName} (ID: ${envVar.id})`);
    } else {
      console.log(`   - ${varName} (not found)`);
    }
  });

  // Delete unused variables
  if (toDelete.length > 0) {
    console.log(`\n🗑️  Deleting ${toDelete.length} unused variables...\n`);
    
    for (const envVar of toDelete) {
      const response = await deleteEnvVariable(project.id, envVar.id);
      if (response.status === 200 || response.status === 204) {
        console.log(`✅ Deleted ${envVar.key}`);
      } else {
        console.log(`❌ Failed to delete ${envVar.key}: ${JSON.stringify(response.data)}`);
      }
    }
  } else {
    console.log('\n✨ No unused variables to delete!');
  }

  console.log('\n📝 Summary:\n');
  console.log('The following environment variables are ACTUALLY NEEDED:');
  console.log('');
  console.log('1. NEXT_PUBLIC_SUPABASE_URL      - Your Supabase project URL');
  console.log('2. NEXT_PUBLIC_SUPABASE_ANON_KEY - Your Supabase anon/public key');
  console.log('3. NEXT_PUBLIC_CORE_API_BASE     - Already set to: https://core.voai.me');
  console.log('4. NEXT_PUBLIC_SITE_URL          - Already set to: https://voai-website-new.vercel.app');
  console.log('5. CORE_MODE                     - Already set to: http');
  console.log('');
  console.log('❗ You only need to add values for #1 and #2 (Supabase credentials)');
  console.log('');
  console.log('Note: VERCEL_ENV is automatically set by Vercel');
}

// Run the script
main().catch(console.error);