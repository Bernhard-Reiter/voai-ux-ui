const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployFinal() {
  console.log('🚀 Deploying from CORRECT repository...\n');
  console.log('Repository: Bernhard-Reiter/voai-website-NEW');
  console.log('Repository ID: 1047879985');
  console.log('Root Directory: voai-next\n');
  
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
        repo: 'Bernhard-Reiter/voai-website-NEW',
        repoId: '1047879985'  // CORRECT REPO ID!
      },
      projectSettings: {
        rootDirectory: 'voai-next',
        buildCommand: 'pnpm build',
        installCommand: 'pnpm install',
        outputDirectory: '.next',
        framework: 'nextjs'
      },
      target: 'production'
    })
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error('❌ Error:', error);
    return;
  }
  
  const deployment = await res.json();
  
  console.log('✅ DEPLOYMENT ERFOLGREICH GESTARTET!\n');
  console.log('📊 Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('Status:', deployment.readyState);
  console.log('Repository:', deployment.gitSource?.repo);
  console.log('Root:', deployment.projectSettings?.rootDirectory);
  console.log('\n🔗 Überwachen Sie hier:', deployment.inspectorUrl);
}

deployFinal().catch(console.error);