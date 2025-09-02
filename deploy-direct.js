const TOKEN = 'dt0tf16jSilxTukDdpTd6m4Q';

async function deploy() {
  console.log('Starting deployment...');
  
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
        repoId: '719497938'
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
  
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

deploy().catch(console.error);