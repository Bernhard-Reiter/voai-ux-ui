const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';
const DEPLOYMENT_ID = 'dpl_4d4NsDDWhPcu2T11KeRLRDgD9LbY';

async function checkNpmDeployment() {
  try {
    const res = await fetch(`https://api.vercel.com/v13/deployments/${DEPLOYMENT_ID}`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    const deployment = await res.json();
    
    console.log('🚀 Deployment Status:', deployment.readyState);
    console.log('📍 URL:', deployment.url);
    console.log('📝 Commit:', deployment.gitSource?.sha?.substring(0, 7) || 'N/A');
    console.log('🏗️  Status:', deployment.status);
    
    if (deployment.buildingAt) {
      const duration = Math.floor((Date.now() - deployment.buildingAt) / 1000);
      console.log(`⏳ Build läuft seit: ${duration} Sekunden`);
    }
    
    if (deployment.ready && deployment.readyState === 'READY') {
      console.log('\n✅ DEPLOYMENT ERFOLGREICH!');
      console.log('🔗 Live URL: https://' + deployment.url);
      console.log('🎉 Der Build mit npm war erfolgreich!');
    } else if (deployment.readyState === 'ERROR') {
      console.log('\n❌ DEPLOYMENT FEHLGESCHLAGEN');
      console.log('Fehler:', deployment.errorMessage);
    } else if (deployment.readyState === 'BUILDING') {
      console.log('\n🔨 Build läuft noch...');
      console.log('Bitte warten...');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkNpmDeployment();