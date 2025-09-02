#!/usr/bin/env node

/**
 * Consolidate environment variables to use same values across all environments
 * This is suitable when you only have one Supabase instance
 */

const https = require('https');
const VERCEL_TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

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

async function consolidateEnvVars() {
  console.log('🔧 Consolidating environment variables...\n');

  // Get project
  const projects = await makeVercelRequest('GET', '/v9/projects');
  const project = projects.data.projects.find(p => p.name === 'voai-website-new');
  
  if (!project) {
    console.log('❌ Project not found');
    return;
  }

  // Get all env vars
  const response = await makeVercelRequest('GET', `/v10/projects/${project.id}/env`);
  const envVars = response.data.envs || [];

  // Variables to consolidate
  const varsToConsolidate = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_CORE_API_BASE'
  ];

  for (const varName of varsToConsolidate) {
    const entries = envVars.filter(env => env.key === varName);
    
    if (entries.length > 1) {
      console.log(`\n📋 Processing ${varName}:`);
      console.log(`   Found ${entries.length} separate entries`);
      
      // Find the production value (or any existing value)
      const prodEntry = entries.find(e => e.target.includes('production')) || entries[0];
      
      // Delete all existing entries
      console.log('   🗑️  Deleting separate entries...');
      for (const entry of entries) {
        await makeVercelRequest('DELETE', `/v10/projects/${project.id}/env/${entry.id}`);
      }
      
      // Create single entry for all environments
      console.log('   ✅ Creating consolidated entry for all environments...');
      const newEntry = {
        key: varName,
        value: prodEntry.value || `YOUR_${varName}_HERE`,
        type: prodEntry.type || 'encrypted',
        target: ['production', 'preview', 'development']
      };
      
      await makeVercelRequest('POST', `/v10/projects/${project.id}/env`, newEntry);
      console.log(`   ✅ ${varName} consolidated!`);
    } else if (entries.length === 1) {
      // Update existing entry to target all environments
      const entry = entries[0];
      if (entry.target.length < 3) {
        console.log(`\n📋 Updating ${varName} to target all environments...`);
        
        // Delete old entry
        await makeVercelRequest('DELETE', `/v10/projects/${project.id}/env/${entry.id}`);
        
        // Create new entry for all environments
        const newEntry = {
          key: varName,
          value: entry.value,
          type: entry.type,
          target: ['production', 'preview', 'development']
        };
        
        await makeVercelRequest('POST', `/v10/projects/${project.id}/env`, newEntry);
        console.log(`   ✅ ${varName} now targets all environments!`);
      }
    }
  }

  console.log('\n✅ Consolidation complete!\n');
  console.log('📝 Summary:');
  console.log('- All Supabase variables now use the same value across all environments');
  console.log('- This is perfect for small projects with a single Supabase instance');
  console.log('- You can always separate them later if needed');
  console.log('\n💡 Next steps:');
  console.log('1. Go to Vercel dashboard and set your Supabase credentials');
  console.log('2. The same values will be used for production, preview, and development');
}

consolidateEnvVars().catch(console.error);