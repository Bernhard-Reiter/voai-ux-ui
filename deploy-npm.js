const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployWithNpm() {
  console.log('🚀 Deployment mit npm statt pnpm...\n');
  console.log('✅ vercel.json: npm run build & npm install');
  console.log('✅ package.json: packageManager und preinstall entfernt');
  console.log('✅ CACHE_BUSTER Environment Variable\n');
  
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
        repo: 'Bernhard-Reiter/voai-website-NEW',
        repoId: 1047879985,
        ref: 'main'
      },
      target: 'production',
      regions: ['fra1']
    })
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error('❌ Fehler:', error);
    return;
  }
  
  const deployment = await res.json();
  console.log('✅ DEPLOYMENT GESTARTET!\n');
  console.log('📊 Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('Commit:', deployment.gitSource?.sha || 'N/A');
  console.log('\n🔗 Monitor: https://vercel.com/vi4/voai-website-new/' + deployment.id);
  console.log('\n🎯 Mit npm sollte es definitiv funktionieren!');
}

deployWithNpm();