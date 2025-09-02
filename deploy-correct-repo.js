const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployCorrectRepo() {
  console.log('🚀 Starting deployment with CORRECT repository...\n');
  
  // Create deployment with correct GitHub repo
  const res = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'voai-website-new',
      gitSource: {
        type: 'github',
        ref: 'main',
        repo: 'Bernhard-Reiter/voai-website-NEW'  // CORRECT REPO!
      },
      projectSettings: {
        rootDirectory: 'voai-next',
        buildCommand: 'pnpm build',
        installCommand: 'pnpm install',
        outputDirectory: '.next',
        framework: 'nextjs'
      },
      target: 'production'  // Deploy to production
    })
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error('❌ Deployment failed:', error);
    return;
  }
  
  const deployment = await res.json();
  
  console.log('✅ Deployment created successfully!\n');
  console.log('📊 Deployment Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('Status:', deployment.readyState);
  console.log('Repository:', deployment.gitSource?.repo || 'N/A');
  console.log('Root Directory:', deployment.projectSettings?.rootDirectory || 'N/A');
  console.log('\n🔗 Monitor progress at:', deployment.inspectorUrl);
}

deployCorrectRepo().catch(console.error);