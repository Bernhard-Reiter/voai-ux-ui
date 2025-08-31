const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';
const DEPLOYMENT_ID = 'dpl_GFCt9HPkcntfZn55jG39xRiDwcwo';

async function getDeploymentLogs() {
  try {
    // Get build logs
    const res = await fetch(`https://api.vercel.com/v2/deployments/${DEPLOYMENT_ID}/events`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      }
    });

    if (!res.ok) {
      console.error('Failed to get logs:', res.status, await res.text());
      return;
    }

    const events = await res.json();
    
    console.log('📋 Build Logs für Deployment:', DEPLOYMENT_ID);
    console.log('=' .repeat(60));
    
    // Filter und zeige nur wichtige Events
    events.forEach(event => {
      if (event.type === 'stdout' || event.type === 'stderr') {
        const time = new Date(event.created).toLocaleTimeString();
        const prefix = event.type === 'stderr' ? '❌' : '📝';
        console.log(`[${time}] ${prefix} ${event.payload.text}`);
      } else if (event.type === 'command') {
        console.log(`\n🔧 Command: ${event.payload.command}\n`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

getDeploymentLogs();