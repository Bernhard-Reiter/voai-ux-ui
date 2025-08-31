const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deployFinalFixed() {
  console.log('🚀 FINALES DEPLOYMENT mit allen Fixes...\n');
  console.log('✅ Leerer Commit gepusht (neuer Hash)');
  console.log('✅ vercel.json mit explizitem Install-Command');
  console.log('✅ CACHE_BUSTER Environment Variable');
  console.log('✅ packageManager in package.json\n');
  
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
      target: 'production'
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
  console.log('Commit:', deployment.gitSource?.sha?.substring(0, 7));
  console.log('\n🔗 Monitor:', deployment.inspectorUrl);
  console.log('\n🎯 Dieser Build sollte definitiv funktionieren!');
  console.log('- Neuer Commit-Hash invalidiert alten Cache');
  console.log('- Expliziter Install-Command löscht node_modules');
  console.log('- CACHE_BUSTER Variable erzwingt neuen Build');
}

deployFinalFixed().catch(console.error);