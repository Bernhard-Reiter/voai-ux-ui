#!/usr/bin/env node

/**
 * Check duplicate environment variables in Vercel
 */

const https = require('https');
const VERCEL_TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function makeVercelRequest(method, path) {
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
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 Checking for duplicate environment variables...\n');

  // Get project
  const projects = await makeVercelRequest('GET', '/v9/projects');
  const project = projects.projects.find(p => p.name === 'voai-website-new');
  
  if (!project) {
    console.log('❌ Project not found');
    return;
  }

  // Get all env vars
  const response = await makeVercelRequest('GET', `/v10/projects/${project.id}/env`);
  const envVars = response.envs || [];

  // Group by key
  const grouped = {};
  envVars.forEach(env => {
    if (!grouped[env.key]) {
      grouped[env.key] = [];
    }
    grouped[env.key].push({
      id: env.id,
      target: env.target,
      type: env.type,
      createdAt: env.createdAt,
      value: env.value?.substring(0, 20) + '...' // Show first 20 chars
    });
  });

  // Show duplicates
  console.log('📊 Environment Variables Analysis:\n');
  
  Object.entries(grouped).forEach(([key, values]) => {
    if (values.length > 1) {
      console.log(`⚠️  DUPLICATE: ${key} (${values.length} entries)`);
      values.forEach(v => {
        console.log(`   - ID: ${v.id}`);
        console.log(`     Target: ${JSON.stringify(v.target)}`);
        console.log(`     Type: ${v.type}`);
        console.log(`     Created: ${new Date(v.createdAt).toLocaleString()}`);
        console.log(`     Value: ${v.value}`);
        console.log('');
      });
    } else {
      console.log(`✅ ${key} (1 entry)`);
      console.log(`   Target: ${JSON.stringify(values[0].target)}`);
      console.log('');
    }
  });

  // Check for issues
  const duplicateKeys = Object.entries(grouped).filter(([_, values]) => values.length > 1);
  
  if (duplicateKeys.length > 0) {
    console.log('\n⚠️  WARNING: Found duplicate environment variables!');
    console.log('This can cause unpredictable behavior.');
    console.log('\nRecommendation: Keep only one entry per variable with target: ["production", "preview", "development"]');
  } else {
    console.log('\n✅ No duplicates found!');
  }
}

main().catch(console.error);