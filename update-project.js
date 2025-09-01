const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function updateProject() {
  console.log('📝 Updating existing Vercel project with correct GitHub repo...\n');
  
  // Update the existing project
  const res = await fetch('https://api.vercel.com/v9/projects/voai-website-new', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gitRepository: {
        type: 'github',
        repo: 'Bernhard-Reiter/voai-website-NEW'
      },
      rootDirectory: 'voai-next',
      buildCommand: 'pnpm build',
      installCommand: 'pnpm install',
      outputDirectory: '.next'
    })
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error('❌ Update failed:', error);
    return;
  }
  
  const project = await res.json();
  console.log('✅ Project updated successfully!');
  console.log('Repository:', project.link?.repo || 'Not linked');
  
  // Now trigger a new deployment
  console.log('\n🚀 Triggering new deployment...\n');
  
  const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
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
        repoId: '888446558'  // Correct repo ID
      },
      projectId: 'prj_5cfCnI0PNbuQ1EEgAdsHHTvJ8K3P',  // From the existing project
      target: 'production'
    })
  });
  
  if (!deployRes.ok) {
    const error = await deployRes.text();
    console.error('❌ Deployment failed:', error);
    return;
  }
  
  const deployment = await deployRes.json();
  console.log('✅ Deployment started!');
  console.log('URL:', deployment.url);
  console.log('Status:', deployment.readyState);
  console.log('\n🔗 Monitor at:', deployment.inspectorUrl);
}

updateProject().catch(console.error);