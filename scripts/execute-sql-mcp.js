#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Read SQL files
const migrationSQL = fs.readFileSync(path.join(__dirname, 'supabase-pr12-setup.sql'), 'utf8')
const permissionsSQL = fs.readFileSync(path.join(__dirname, 'fix-permissions.sql'), 'utf8')

// Supabase connection
const DB_URL = 'postgresql://postgres:20Vi425!%3F@db.aqvnasuputatphvqrqam.supabase.co:5432/postgres'

console.log('🚀 Attempting SQL execution via psql...\n')

// Create temporary SQL file
const tempFile = path.join(__dirname, 'temp-migration.sql')

try {
  // First check if tables exist
  const checkSQL = `
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('workflow_status', 'files');
`

  fs.writeFileSync(tempFile, checkSQL)

  console.log('📊 Checking existing tables...')
  try {
    const result = execSync(`psql "${DB_URL}" -f "${tempFile}" -t`, { encoding: 'utf8' })
    console.log('Existing tables:', result.trim() || 'None found')
  } catch (error) {
    console.log('Error checking tables:', error.message)
  }

  // Execute migration SQL
  console.log('\n🔨 Executing migration SQL...')
  fs.writeFileSync(tempFile, migrationSQL)

  try {
    execSync(`psql "${DB_URL}" -f "${tempFile}"`, { encoding: 'utf8' })
    console.log('✅ Migration SQL executed successfully!')
  } catch (error) {
    console.log('❌ Migration error:', error.message)
  }

  // Execute permissions SQL
  console.log('\n🔐 Fixing permissions...')
  fs.writeFileSync(tempFile, permissionsSQL)

  try {
    execSync(`psql "${DB_URL}" -f "${tempFile}"`, { encoding: 'utf8' })
    console.log('✅ Permissions fixed successfully!')
  } catch (error) {
    console.log('❌ Permissions error:', error.message)
  }
} catch (error) {
  console.error('❌ Fatal error:', error.message)
} finally {
  // Clean up
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile)
  }
}

console.log('\n✨ Process complete!')
