const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function forceNoCacheDeploy() {
  console.log('🔥 FORCE DEPLOYMENT OHNE CACHE!\n');
  
  // Lösche ALLE Environment Variables die mit Cache zu tun haben könnten
  console.log('🧹 Lösche alle Cache-bezogenen Environment Variables...');
  
  const envVarsToDelete = [
    'ENABLE_EXPERIMENTAL_COREPACK',
    'CACHE_BUSTER',
    'VERCEL_FORCE_NO_BUILD_CACHE'
  ];
  
  for (const varName of envVarsToDelete) {
    try {
      await fetch(`https://api.vercel.com/v10/projects/voai-website-new/env/${varName}?teamId=team_TQs0xL2xyN4vpEmOOErruKNA`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${TOKEN}` }
      });
      console.log(`  ✅ ${varName} gelöscht`);
    } catch (e) {
      // Ignoriere Fehler wenn Variable nicht existiert
    }
  }
  
  // Setze neue Environment Variables die Cache verhindern
  console.log('\n📝 Setze neue Anti-Cache Variables...');
  
  const antiCacheVars = [
    { key: 'VERCEL_FORCE_NO_BUILD_CACHE', value: '1' },
    { key: 'FORCE_BUILDER_TAG', value: `v${Date.now()}` },
    { key: 'SKIP_BUILD_CACHE', value: 'true' }
  ];
  
  for (const { key, value } of antiCacheVars) {
    const res = await fetch('https://api.vercel.com/v10/projects/voai-website-new/env?teamId=team_TQs0xL2xyN4vpEmOOErruKNA', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key,
        value,
        type: 'plain',
        target: ['production', 'preview', 'development']
      })
    });
    
    if (res.ok) {
      console.log(`  ✅ ${key} = ${value}`);
    }
  }
  
  // Deployment mit maximalen Cache-Bypass Optionen
  console.log('\n🚀 Starte Deployment mit allen Cache-Bypass Optionen...\n');
  
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
        buildCommand: 'rm -rf node_modules .next .vercel && pnpm install && pnpm build',
        installCommand: 'rm -rf node_modules pnpm-lock.yaml && npm cache clean --force && pnpm store prune && pnpm install --force',
        outputDirectory: '.next',
        framework: 'nextjs'
      },
      target: 'production',
      env: {
        VERCEL_FORCE_NO_BUILD_CACHE: '1',
        FORCE_BUILDER_TAG: `v${Date.now()}`,
        SKIP_BUILD_CACHE: 'true'
      }
    })
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error('❌ Error:', error);
    return;
  }
  
  const deployment = await res.json();
  
  console.log('✅ ANTI-CACHE DEPLOYMENT GESTARTET!\n');
  console.log('📊 Details:');
  console.log('ID:', deployment.id);
  console.log('URL:', deployment.url);
  console.log('\n🔗 Monitor:', deployment.inspectorUrl);
  console.log('\n⚡ Cache-Bypass Mechanismen:');
  console.log('- VERCEL_FORCE_NO_BUILD_CACHE=1');
  console.log('- Explizites rm -rf node_modules vor Installation');
  console.log('- npm cache clean --force');
  console.log('- pnpm store prune');
  console.log('- Unique FORCE_BUILDER_TAG');
}

forceNoCacheDeploy().catch(console.error);