const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function setCacheBuster() {
  console.log('🔨 Setze CACHE_BUSTER Environment Variable...\n');
  
  const res = await fetch('https://api.vercel.com/v10/projects/voai-website-new/env?teamId=team_TQs0xL2xyN4vpEmOOErruKNA', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: 'CACHE_BUSTER',
      value: Date.now().toString(),
      type: 'plain',
      target: ['production', 'preview', 'development']
    })
  });
  
  if (res.ok) {
    console.log('✅ CACHE_BUSTER gesetzt!');
    console.log('Dies zwingt Vercel einen komplett neuen Build durchzuführen.\n');
    
    // Lösche ENABLE_EXPERIMENTAL_COREPACK da es nicht mehr nötig ist
    await fetch('https://api.vercel.com/v10/projects/voai-website-new/env/ENABLE_EXPERIMENTAL_COREPACK?teamId=team_TQs0xL2xyN4vpEmOOErruKNA', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    
    console.log('🧹 Alte Environment Variables aufgeräumt.');
    console.log('\n💡 Der nächste Build wird automatisch starten und sollte funktionieren!');
  } else {
    const error = await res.text();
    console.error('❌ Fehler:', error);
  }
}

setCacheBuster().catch(console.error);