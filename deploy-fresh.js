const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployFresh() {
  console.log('🧹 SAUBERES DEPLOYMENT mit pnpm...\n');
  console.log('Package Manager Fix:');
  console.log('✅ package-lock.json entfernt');
  console.log('✅ packageManager: pnpm@8.15.5');
  console.log('✅ Neuer Git Commit gepusht\n');
  
  // Zuerst das Projekt updaten für pnpm
  console.log('📝 Update Projekt-Einstellungen...');
  const updateRes = await fetch('https://api.vercel.com/v9/projects/voai-website-new?teamId=team_TQs0xL2xyN4vpEmOOErruKNA', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      buildCommand: 'pnpm build',
      installCommand: 'pnpm install',
      framework: 'nextjs',
      outputDirectory: '.next',
      rootDirectory: 'voai-next'
    })
  });
  
  if (updateRes.ok) {
    console.log('✅ Projekt-Einstellungen aktualisiert\n');
  }
  
  // Deployment mit neuem Commit
  console.log('🚀 Starte Deployment...');
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
        commandForIgnoringBuildStep: ''
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
  
  console.log('✅ DEPLOYMENT LÄUFT!\n');
  console.log('📊 Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('Commit:', deployment.gitSource?.sha?.substring(0, 7));
  console.log('\n🔗 Live-Monitor:', deployment.inspectorUrl);
  console.log('\n💡 Tipp: Der Build-Cache wurde automatisch invalidiert');
  console.log('durch den neuen Commit ohne package-lock.json!');
}

deployFresh().catch(console.error);