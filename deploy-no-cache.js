const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployWithoutCache() {
  console.log('🚀 Deployment OHNE Build-Cache starten...\n');
  console.log('Wichtige Änderungen:');
  console.log('✅ package-lock.json gelöscht');
  console.log('✅ packageManager: "pnpm@8.15.5" in package.json');
  console.log('✅ Kein Build-Cache verwendet\n');
  
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
      target: 'production',
      // WICHTIG: Force rebuild ohne Cache
      buildCache: false,
      forceBuild: true
    })
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error('❌ Error:', error);
    return;
  }
  
  const deployment = await res.json();
  
  console.log('✅ DEPLOYMENT GESTARTET!\n');
  console.log('📊 Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('Status:', deployment.readyState);
  console.log('\n🔗 Monitor:', deployment.inspectorUrl);
  console.log('\n⚠️  WICHTIG: Dies ist ein Clean Build ohne Cache!');
  console.log('Der Build sollte jetzt mit pnpm funktionieren.');
}

deployWithoutCache().catch(console.error);