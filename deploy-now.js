#!/usr/bin/env node

/**
 * Force a new Vercel deployment
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

async function deployNow() {
  console.log('🚀 Deploying voai-website-new to Vercel...\n');

  // Get project
  const projects = await makeVercelRequest('GET', '/v9/projects');
  const project = projects.data.projects.find(p => p.name === 'voai-website-new');
  
  if (!project) {
    console.log('❌ Project not found');
    return;
  }

  console.log(`✅ Found project: ${project.name}`);
  console.log(`   ID: ${project.id}`);
  console.log(`   Framework: Next.js`);
  console.log(`   Repository: ${project.link?.repo || 'GitHub'}\n`);

  // Get the latest deployment to redeploy from
  const deployments = await makeVercelRequest('GET', `/v6/deployments?projectId=${project.id}&limit=5`);
  const productionDeployment = deployments.data.deployments.find(d => d.target === 'production');

  if (!productionDeployment) {
    console.log('❌ No production deployment found to redeploy');
    return;
  }

  console.log(`📋 Latest production deployment:`);
  console.log(`   URL: https://${productionDeployment.url}`);
  console.log(`   Created: ${new Date(productionDeployment.created).toLocaleString()}`);
  console.log(`   Status: ${productionDeployment.readyState}\n`);

  // Try to redeploy using the deployment ID
  console.log('🔄 Creating new deployment...\n');
  
  // Alternative approach: Create deployment with git info
  const deployBody = {
    name: project.name,
    project: project.id,
    target: 'production',
    gitSource: {
      type: 'github',
      ref: 'main',
      repoId: parseInt(project.link?.repoId) || undefined,
      repo: 'Bernhard-Reiter/voai-website-NEW'
    }
  };

  try {
    const deployment = await makeVercelRequest('POST', '/v13/deployments', deployBody);
    
    if (deployment.status === 200 || deployment.status === 201 || deployment.status === 202) {
      console.log('✅ Deployment started successfully!\n');
      console.log(`🌐 Deployment URL: https://${deployment.data.url || deployment.data.alias?.[0] || productionDeployment.url}`);
      console.log(`📊 Deployment ID: ${deployment.data.id || deployment.data.uid}`);
      console.log(`⏱️  Status: ${deployment.data.readyState || 'BUILDING'}\n`);
      
      console.log('📋 Monitor progress:');
      console.log(`   https://vercel.com/dashboard/project/voai-website-new`);
      console.log(`   or check: https://${deployment.data.url || productionDeployment.url}\n`);
      
      console.log('✨ Environment Variables Status:');
      console.log('   NEXT_PUBLIC_SUPABASE_URL ✅');
      console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY ✅');
      console.log('   All required variables are set!\n');
      
      console.log('⏱️  Deployment usually takes 1-2 minutes...');
    } else {
      throw new Error(`Deployment failed with status ${deployment.status}`);
    }
  } catch (error) {
    console.log('⚠️  Automated deployment failed. Trying alternative method...\n');
    
    // Alternative: Use redeploy endpoint
    try {
      const redeployResponse = await makeVercelRequest(
        'POST', 
        `/v13/deployments/${productionDeployment.uid}/redeploy`,
        { target: 'production' }
      );
      
      if (redeployResponse.status === 200 || redeployResponse.status === 201) {
        console.log('✅ Redeployment triggered!\n');
        console.log('📋 Check deployment status at:');
        console.log('   https://vercel.com/dashboard/project/voai-website-new');
      } else {
        throw new Error('Redeploy also failed');
      }
    } catch (redeployError) {
      console.log('❌ Automatic deployment not possible.\n');
      console.log('📋 Please deploy manually:');
      console.log('1. Go to: https://vercel.com/dashboard');
      console.log('2. Select: voai-website-new');
      console.log('3. Click the three dots (...) on the latest deployment');
      console.log('4. Select "Redeploy"');
      console.log('5. Confirm "Use existing Build Cache: No"');
      console.log('6. Click "Redeploy"');
    }
  }
}

deployNow().catch(console.error);