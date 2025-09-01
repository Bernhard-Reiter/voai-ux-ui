const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployClean() {
  console.log('🚀 Startet sauberes Deployment ohne Git-Check...\n');
  
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
        repoId: '1047879985'
      },
      projectSettings: {
        rootDirectory: 'voai-next',
        buildCommand: 'pnpm build',
        installCommand: 'pnpm install',
        outputDirectory: '.next',
        framework: 'nextjs',
        commandForIgnoringBuildStep: ''  // Leerer String statt git diff
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
  
  console.log('✅ NEUES DEPLOYMENT GESTARTET!\n');
  console.log('📊 Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('Status:', deployment.readyState);
  console.log('Build startet:', deployment.buildingAt ? 'JA' : 'Wartet...');
  console.log('\n🔗 Überwachen:', deployment.inspectorUrl);
}

deployClean().catch(console.error);