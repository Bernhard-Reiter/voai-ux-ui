const https = require('https')

// Supabase project details
const PROJECT_REF = 'aqvnasuputatphvqrqam'
const SERVICE_KEY = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

// Function to make API request
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${PROJECT_REF}.supabase.co`,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => (body += chunk))
      res.on('end', () => {
        try {
          const result = JSON.parse(body)
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result)
          } else {
            reject(new Error(`API Error: ${res.statusCode} - ${JSON.stringify(result)}`))
          }
        } catch (e) {
          resolve(body)
        }
      })
    })

    req.on('error', reject)

    if (data) {
      req.write(JSON.stringify(data))
    }

    req.end()
  })
}

async function createTablesViaAPI() {
  console.log('🚀 Attempting to create tables via Supabase API...\n')

  try {
    // Try to execute SQL via the REST API
    // Unfortunately, Supabase doesn't expose a SQL execution endpoint in their REST API

    console.log('❌ Supabase REST API does not support direct SQL execution.\n')
    console.log('📝 The only way to execute SQL is through:')
    console.log('   1. Supabase Dashboard SQL Editor')
    console.log('   2. Direct PostgreSQL connection (which is blocked)\n')

    // Let's at least check if tables exist
    console.log('🔍 Checking if tables exist...\n')

    try {
      const workflowStatus = await makeRequest('GET', '/rest/v1/workflow_status?limit=1')
      console.log('⚠️  Table "workflow_status" already exists')
    } catch (error) {
      if (error.message.includes('404') || error.message.includes('relation')) {
        console.log('✅ Table "workflow_status" does not exist (needs to be created)')
      }
    }

    try {
      const files = await makeRequest('GET', '/rest/v1/files?limit=1')
      console.log('⚠️  Table "files" already exists')
    } catch (error) {
      if (error.message.includes('404') || error.message.includes('relation')) {
        console.log('✅ Table "files" does not exist (needs to be created)')
      }
    }

    console.log('\n' + '='.repeat(60))
    console.log('📋 MANUAL ACTION REQUIRED:')
    console.log('='.repeat(60) + '\n')
    console.log('Please manually execute the SQL in Supabase Dashboard:')
    console.log(`\n🔗 ${`https://${PROJECT_REF}.supabase.co/project/${PROJECT_REF}/sql`}\n`)
    console.log('Copy the SQL from:')
    console.log('📄 /Users/bernhard/voai-website/scripts/supabase-pr12-setup.sql\n')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

createTablesViaAPI()
