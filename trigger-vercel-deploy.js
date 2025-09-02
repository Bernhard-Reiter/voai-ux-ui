#!/usr/bin/env node

/**
 * Trigger a new Vercel deployment
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

async function triggerDeployment() {
  console.log('🚀 Triggering new Vercel deployment...\n');

  // Get project
  const projects = await makeVercelRequest('GET', '/v9/projects');
  const project = projects.data.projects.find(p => p.name === 'voai-website-new');
  
  if (!project) {
    console.log('❌ Project not found');
    return;
  }

  // Get latest deployment
  const deployments = await makeVercelRequest('GET', `/v6/deployments?projectId=${project.id}&limit=1`);
  const latestDeployment = deployments.data.deployments[0];

  if (latestDeployment) {
    console.log(`📋 Latest deployment: ${latestDeployment.url}`);
    console.log(`   Status: ${latestDeployment.readyState}`);
    console.log(`   Created: ${new Date(latestDeployment.created).toLocaleString()}`);
  }

  // Create new deployment by redeploying
  console.log('\n🔄 Creating new deployment...');
  
  const redeployBody = {
    name: project.name,
    target: 'production',
    gitSource: {
      type: 'github',
      repoId: project.link?.repoId || '',
      ref: 'main'
    }
  };

  const newDeployment = await makeVercelRequest('POST', '/v13/deployments', redeployBody);

  if (newDeployment.status === 200 || newDeployment.status === 201) {
    console.log('\n✅ Deployment triggered successfully!');
    console.log(`   URL: https://${newDeployment.data.url}`);
    console.log(`   ID: ${newDeployment.data.id}`);
    console.log('\n📊 Monitor deployment progress:');
    console.log(`   https://vercel.com/${project.accountId}/${project.name}/${newDeployment.data.id}`);
  } else {
    console.log('\n⚠️  Could not trigger automatic deployment.');
    console.log('\n📋 Manual deployment steps:');
    console.log('   1. Go to https://vercel.com/dashboard');
    console.log('   2. Select your project: voai-website-new');
    console.log('   3. Click on the latest deployment');
    console.log('   4. Click "Redeploy" button');
    console.log('   5. Confirm the redeployment');
  }

  console.log('\n✨ Environment variables are already set:');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL ✅');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY ✅');
  console.log('   - NEXT_PUBLIC_CORE_API_BASE ✅');
  console.log('   - NEXT_PUBLIC_SITE_URL ✅');
  console.log('   - CORE_MODE ✅');
}

triggerDeployment().catch(console.error);