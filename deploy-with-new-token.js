const VERCEL_TOKEN = 'FiWUA5q3cfGzOB8Kpq50khPV';

async function deployToVercel() {
  console.log('🚀 Starte Vercel Deployment mit neuem Token...');
  
  try {
    // 1. Pr\u00fcfe Token und hole Account-Info
    console.log('🔐 \u00dcberpr\u00fcfe Token...');
    const userResponse = await fetch('https://api.vercel.com/v2/user', {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`
      }
    });
    
    if (!userResponse.ok) {
      throw new Error('Token ung\u00fcltig oder keine Berechtigung');
    }
    
    const user = await userResponse.json();
    console.log('✅ Angemeldet als:', user.user.username);
    
    // 2. Erstelle oder aktualisiere Projekt
    console.log('📁 Erstelle Vercel Projekt...');
    
    const projectResponse = await fetch('https://api.vercel.com/v9/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'voai-website-new',
        framework: 'nextjs',
        gitRepository: {
          type: 'github',
          repo: 'Bernhard-Reiter/voai-website-NEW'
        },
        rootDirectory: 'voai-next',
        buildCommand: 'pnpm build',
        installCommand: 'pnpm install',
        outputDirectory: '.next',
        publicSource: true
      })
    });

    let projectId;
    if (!projectResponse.ok) {
      const error = await projectResponse.text();
      console.log('ℹ️  Projekt existiert m\u00f6glicherweise schon:', error);
      
      // Hole existierendes Projekt
      const projectsResponse = await fetch('https://api.vercel.com/v9/projects/voai-website-new', {
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`
        }
      });
      
      if (projectsResponse.ok) {
        const project = await projectsResponse.json();
        projectId = project.id;
        console.log('✅ Verwende existierendes Projekt:', projectId);
      }
    } else {
      const project = await projectResponse.json();
      projectId = project.id;
      console.log('✅ Projekt erstellt:', project.name);
    }

    // 3. Triggere Deployment von GitHub
    console.log('🚀 Triggere Production Deployment...');
    
    const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'voai-website-new',
        gitSource: {
          type: 'github',
          ref: 'main',
          repo: 'Bernhard-Reiter/voai-website-NEW'
        },
        projectId: projectId,
        target: 'production',
        projectSettings: {
          rootDirectory: 'voai-next',
          buildCommand: 'pnpm build',
          installCommand: 'pnpm install',
          outputDirectory: '.next',
          framework: 'nextjs'
        }
      })
    });

    if (!deployResponse.ok) {
      const error = await deployResponse.text();
      throw new Error(`Deployment fehlgeschlagen: ${error}`);
    }

    const deployment = await deployResponse.json();
    console.log('✅ Deployment erfolgreich gestartet!');
    console.log('');
    console.log('📊 Deployment Details:');
    console.log('🆔 ID:', deployment.id);
    console.log('🌐 URL:', deployment.url || `https://${deployment.name}.vercel.app`);
    console.log('📈 Status:', deployment.readyState || 'BUILDING');
    console.log('🔗 Dashboard:', `https://vercel.com/${user.user.username}/${deployment.name}`);
    console.log('');
    console.log('⏳ Das Deployment l\u00e4uft... \u00dcberwachen Sie den Fortschritt im Dashboard.');
    
    return deployment;
    
  } catch (error) {
    console.error('❌ Fehler:', error.message);
    console.log('');
    console.log('💡 Alternativer Befehl:');
    console.log(`cd /Users/bernhard/voai-website-new/voai-next && VERCEL_TOKEN=${VERCEL_TOKEN} npx vercel --prod --yes`);
  }
}

// F\u00fchre Deployment aus
deployToVercel();