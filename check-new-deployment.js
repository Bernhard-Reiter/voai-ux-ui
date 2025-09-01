const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';
const DEPLOYMENT_ID = 'dpl_GFCt9HPkcntfZn55jG39xRiDwcwo';

async function checkNewDeployment() {
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
    console.log('📝 Commit:', deployment.gitSource?.sha || 'N/A');
    console.log('🏗️  Status:', deployment.status);
    
    if (deployment.buildingAt) {
      console.log('⏳ Build läuft seit:', new Date(deployment.buildingAt).toLocaleTimeString());
    }
    
    if (deployment.ready && deployment.readyState === 'READY') {
      console.log('\n✅ DEPLOYMENT ERFOLGREICH!');
      console.log('🔗 Live URL: https://' + deployment.url);
    } else if (deployment.readyState === 'ERROR') {
      console.log('\n❌ DEPLOYMENT FEHLGESCHLAGEN');
      console.log('Fehler:', deployment.errorMessage);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkNewDeployment();