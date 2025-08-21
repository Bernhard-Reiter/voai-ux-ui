const https = require('https');

const TOKEN = 'PRz3rjY6MjqzR6PrgYCI0DqY';
const TEAM_ID = 'team_TQs0xL2xyN4vpEmOOErruKNA';
const PROJECT_ID = 'prj_DaI9YWeNQ274iiVYIQgHzpWPLga5';

async function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function fixDomains() {
  console.log('🔍 Getting project configuration...');
  
  // Get current project state
  const projectRes = await makeRequest({
    hostname: 'api.vercel.com',
    path: `/v9/projects/${PROJECT_ID}?teamId=${TEAM_ID}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  console.log('Project:', projectRes.data.name);
  console.log('Current production:', projectRes.data.targets?.production);
  
  // Get deployments
  const deploymentsRes = await makeRequest({
    hostname: 'api.vercel.com',
    path: `/v6/deployments?projectId=${PROJECT_ID}&teamId=${TEAM_ID}&limit=5&state=READY`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  });
  
  const latestDeployment = deploymentsRes.data.deployments[0];
  console.log('Latest deployment:', latestDeployment.url);
  
  // Force update git configuration
  console.log('🚀 Updating git integration...');
  const updateRes = await makeRequest({
    hostname: 'api.vercel.com',
    path: `/v9/projects/${PROJECT_ID}?teamId=${TEAM_ID}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  }, {
    gitRepository: {
      type: 'github',
      repo: 'Bernhard-Reiter/voai-website'
    }
  });
  
  console.log('Update response:', updateRes.status);
  
  // Trigger redeployment
  console.log('🔄 Triggering production redeployment...');
  const redeployRes = await makeRequest({
    hostname: 'api.vercel.com',
    path: `/v13/deployments`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  }, {
    name: 'voai-website',
    project: PROJECT_ID,
    target: 'production',
    gitSource: {
      type: 'github',
      ref: 'main',
      repo: 'Bernhard-Reiter/voai-website'
    }
  });
  
  console.log('Redeploy response:', redeployRes.status, redeployRes.data);
}

fixDomains().catch(console.error);