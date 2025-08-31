#!/usr/bin/env node
const { execSync } = require('child_process');

// Vercel Deployment Script
const VERCEL_TOKEN = 'lcAfzDsg3RfL7skYdGxPeRl8';
const PROJECT_NAME = 'voai-website-new';
const TEAM = 'vi4';

console.log('🚀 Starte Vercel Deployment...');

try {
  // Set environment
  process.env.VERCEL_TOKEN = VERCEL_TOKEN;
  
  // Link project
  console.log('📎 Verlinke Projekt...');
  execSync(`npx vercel link --yes --project ${PROJECT_NAME} --scope ${TEAM}`, {
    stdio: 'inherit',
    env: { ...process.env, VERCEL_TOKEN }
  });
  
  // Build
  console.log('🔨 Erstelle Production Build...');
  execSync('npx vercel build --prod', {
    stdio: 'inherit',
    env: { ...process.env, VERCEL_TOKEN }
  });
  
  // Deploy
  console.log('🌐 Deploye zu Vercel...');
  const result = execSync('npx vercel deploy --prebuilt --prod --yes', {
    env: { ...process.env, VERCEL_TOKEN }
  });
  
  console.log('✅ Deployment erfolgreich!');
  console.log('URL:', result.toString().trim());
  
} catch (error) {
  console.error('❌ Deployment fehlgeschlagen:', error.message);
  process.exit(1);
}