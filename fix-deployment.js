const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function createCorrectDeployment() {
  console.log('Creating deployment with correct repository...');
  
  // First, let's create/update the project with correct GitHub repo
  const projectRes = await fetch('https://api.vercel.com/v9/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'voai-website-new-correct',
      framework: 'nextjs',
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
  
  const project = await projectRes.json();
  console.log('Project response:', project);
  
  // Now create deployment
  const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'voai-website-new-correct',
      gitSource: {
        type: 'github',
        ref: 'main',
        repo: 'Bernhard-Reiter/voai-website-NEW'
      },
      projectSettings: {
        rootDirectory: 'voai-next',
        buildCommand: 'pnpm build',
        installCommand: 'pnpm install',
        outputDirectory: '.next',
        framework: 'nextjs'
      }
    })
  });
  
  const deployment = await deployRes.json();
  console.log('Deployment created:', JSON.stringify(deployment, null, 2));
}

createCorrectDeployment().catch(console.error);