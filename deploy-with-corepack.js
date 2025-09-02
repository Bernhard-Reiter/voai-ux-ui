const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployWithCorepack() {
  console.log('🚀 Deployment mit Corepack für pnpm 8.15.5...\n');
  
  // Setze Environment Variable für Corepack
  console.log('📝 Setze ENABLE_EXPERIMENTAL_COREPACK=1...');
  const envRes = await fetch('https://api.vercel.com/v10/projects/voai-website-new/env?teamId=team_TQs0xL2xyN4vpEmOOErruKNA', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: 'ENABLE_EXPERIMENTAL_COREPACK',
      value: '1',
      type: 'encrypted',
      target: ['production', 'preview', 'development']
    })
  });
  
  if (envRes.ok) {
    console.log('✅ Corepack aktiviert!\n');
  } else {
    const error = await envRes.text();
    console.log('⚠️  Env Variable konnte nicht gesetzt werden:', error);
  }
  
  // Deployment
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
        installCommand: 'corepack enable && pnpm install',
        outputDirectory: '.next',
        framework: 'nextjs',
        commandForIgnoringBuildStep: ''
      },
      target: 'production',
      env: {
        ENABLE_EXPERIMENTAL_COREPACK: '1'
      }
    })
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error('❌ Error:', error);
    return;
  }
  
  const deployment = await res.json();
  
  console.log('✅ DEPLOYMENT MIT COREPACK LÄUFT!\n');
  console.log('📊 Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('\n🔗 Monitor:', deployment.inspectorUrl);
  console.log('\n💡 Info: Corepack installiert automatisch pnpm 8.15.5');
}

deployWithCorepack().catch(console.error);