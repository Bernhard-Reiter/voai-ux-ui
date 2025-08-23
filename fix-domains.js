#!/usr/bin/env node

const token = 'PRz3rjY6MjqzR6PrgYCI0DqY';
const projectId = 'prj_DaI9YWeNQ274iiVYIQgHzpWPLga5';
const workingDeployment = 'voai-website-lbvc1nwm1-vi4.vercel.app';

async function updateDomains() {
  console.log('Updating domain configuration via Vercel API...');
  
  // Get project details
  const projectResponse = await fetch(`https://api.vercel.com/v9/projects/${projectId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!projectResponse.ok) {
    console.error('Failed to get project:', await projectResponse.text());
    return;
  }
  
  const project = await projectResponse.json();
  console.log('Project:', project.name);
  console.log('Domains:', project.domains);
  
  // Update production branch
  const updateResponse = await fetch(`https://api.vercel.com/v9/projects/${projectId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productionDeploymentId: workingDeployment.replace('https://', '').replace('.vercel.app', '')
    })
  });
  
  if (!updateResponse.ok) {
    console.error('Failed to update project:', await updateResponse.text());
    return;
  }
  
  console.log('Successfully updated production deployment!');
}

updateDomains().catch(console.error);