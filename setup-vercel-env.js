#!/usr/bin/env node

/**
 * Vercel Environment Variables Setup Script
 * 
 * This script prepares the environment variables for the voai-website-NEW project
 * Token: dt0tf16jSilxTukDdpTd6m4Q
 */

const https = require('https');

const VERCEL_TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

// Environment variables to be created
const ENV_VARS = [
  {
    key: 'NEXT_PUBLIC_SUPABASE_URL',
    value: 'YOUR_SUPABASE_PROJECT_URL',
    type: 'plain',
    target: ['production', 'preview', 'development'],
    comment: 'Supabase project URL (e.g., https://xxxx.supabase.co)'
  },
  {
    key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    value: 'YOUR_SUPABASE_ANON_KEY',
    type: 'plain',
    target: ['production', 'preview', 'development'],
    comment: 'Supabase anonymous/public key'
  },
  {
    key: 'SUPABASE_SERVICE_ROLE_KEY',
    value: 'YOUR_SUPABASE_SERVICE_ROLE_KEY',
    type: 'encrypted',
    target: ['production', 'preview'],
    comment: 'Supabase service role key (secret)'
  },
  {
    key: 'NEXT_PUBLIC_CORE_API_BASE',
    value: 'https://core.voai.me',
    type: 'plain',
    target: ['production', 'preview', 'development'],
    comment: 'Core API base URL'
  },
  {
    key: 'STRIPE_SECRET_KEY',
    value: 'YOUR_STRIPE_SECRET_KEY',
    type: 'encrypted',
    target: ['production', 'preview'],
    comment: 'Stripe secret key for billing'
  },
  {
    key: 'STRIPE_WEBHOOK_SECRET',
    value: 'YOUR_STRIPE_WEBHOOK_SECRET',
    type: 'encrypted',
    target: ['production', 'preview'],
    comment: 'Stripe webhook endpoint secret'
  },
  {
    key: 'NEXT_PUBLIC_SITE_URL',
    value: 'https://voai-website-new.vercel.app',
    type: 'plain',
    target: ['production', 'preview', 'development'],
    comment: 'Public site URL'
  },
  {
    key: 'SENTRY_DSN',
    value: 'YOUR_SENTRY_DSN_OPTIONAL',
    type: 'plain',
    target: ['production'],
    comment: 'Sentry error tracking DSN (optional)'
  },
  {
    key: 'CORE_MODE',
    value: 'http',
    type: 'plain',
    target: ['production', 'preview', 'development'],
    comment: 'Core API connection mode'
  }
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
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
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
  return response.projects || [];
}

async function findProject(projectName) {
  const projects = await getProjects();
  return projects.find(p => 
    p.name === projectName || 
    p.name === 'voai-website-new' ||
    p.git?.repo === 'voai-website-NEW'
  );
}

async function updateProjectSettings(projectId) {
  console.log('\n⚙️  Updating project settings...');
  
  const settings = {
    buildCommand: 'npm run build',
    devCommand: 'npm run dev',
    installCommand: 'npm install',
    outputDirectory: '.next',
    framework: 'nextjs',
    nodeVersion: '20.x',
    rootDirectory: null // This ensures it uses the repository root
  };

  const response = await makeVercelRequest('PATCH', `/v9/projects/${projectId}`, settings);
  console.log('✅ Project settings updated');
  return response;
}

async function createEnvVariable(projectId, envVar) {
  const body = {
    key: envVar.key,
    value: envVar.value,
    type: envVar.type,
    target: envVar.target
  };

  try {
    const response = await makeVercelRequest('POST', `/v10/projects/${projectId}/env`, body);
    if (response.error) {
      if (response.error.code === 'ENV_ALREADY_EXISTS') {
        console.log(`⚠️  ${envVar.key} already exists, skipping...`);
      } else {
        console.log(`❌ Error creating ${envVar.key}: ${response.error.message}`);
      }
    } else {
      console.log(`✅ Created ${envVar.key}`);
    }
  } catch (error) {
    console.log(`❌ Error creating ${envVar.key}: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Vercel Environment Setup for voai-website-NEW\n');

  // Find the project
  const project = await findProject('voai-website-NEW');
  
  if (!project) {
    console.log('❌ Project not found. Please ensure:');
    console.log('   1. The project exists in Vercel');
    console.log('   2. The token has access to the project');
    console.log('   3. The project is named "voai-website-new" or linked to "voai-website-NEW" repo');
    return;
  }

  console.log(`✅ Found project: ${project.name} (ID: ${project.id})\n`);

  // Update project settings
  await updateProjectSettings(project.id);

  // Create environment variables
  console.log('\n📝 Creating environment variables...\n');
  
  for (const envVar of ENV_VARS) {
    await createEnvVariable(project.id, envVar);
  }

  console.log('\n✨ Setup complete!\n');
  console.log('📋 Next steps:');
  console.log('1. Go to https://vercel.com/dashboard');
  console.log('2. Navigate to your project settings');
  console.log('3. Update the placeholder values with your actual secrets:');
  console.log('   - Supabase credentials from https://supabase.com/dashboard');
  console.log('   - Stripe keys from https://dashboard.stripe.com/apikeys');
  console.log('4. Trigger a new deployment');
  
  // Generate .env.local template
  console.log('\n📄 .env.local template for local development:\n');
  console.log('```');
  ENV_VARS.forEach(env => {
    if (!env.key.includes('STRIPE_WEBHOOK')) { // Skip webhook secret for local dev
      console.log(`${env.key}=${env.value}`);
    }
  });
  console.log('```');
}

// Run the script
main().catch(console.error);