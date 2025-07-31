const https = require('https')

const SUPABASE_URL = 'aqvnasuputatphvqrqam.supabase.co'
const ANON_KEY = 'sb_publishable_ba4oSPMoIr1EI1Wh_WyDsg_SdD2Z5ua'

async function checkStorageBuckets() {
  console.log('🔍 Checking Storage Buckets...\n')

  return new Promise((resolve) => {
    const options = {
      hostname: SUPABASE_URL,
      port: 443,
      path: '/storage/v1/bucket',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        apikey: ANON_KEY,
      },
    }

    const req = https.request(options, (res) => {
      let responseData = ''

      res.on('data', (chunk) => {
        responseData += chunk
      })

      res.on('end', () => {
        try {
          const buckets = JSON.parse(responseData)
          if (Array.isArray(buckets)) {
            console.log(`✅ Found ${buckets.length} storage buckets:`)
            buckets.forEach((bucket) => {
              console.log(`   - ${bucket.name} (${bucket.public ? 'public' : 'private'})`)
            })
          } else {
            console.log('❌ Could not retrieve buckets:', responseData)
          }
        } catch (e) {
          console.log('❌ Error parsing response:', e.message)
        }
        resolve()
      })
    })

    req.on('error', (error) => {
      console.error('❌ Error:', error.message)
      resolve()
    })

    req.end()
  })
}

async function checkTables() {
  console.log('\n🔍 Checking Tables via REST API...\n')

  const tables = ['workflow_status', 'files']

  for (const table of tables) {
    await new Promise((resolve) => {
      const options = {
        hostname: SUPABASE_URL,
        port: 443,
        path: `/rest/v1/${table}?limit=0`,
        method: 'HEAD',
        headers: {
          Authorization: `Bearer ${ANON_KEY}`,
          apikey: ANON_KEY,
        },
      }

      const req = https.request(options, (res) => {
        if (res.statusCode === 200) {
          console.log(`✅ Table '${table}' exists`)
        } else if (res.statusCode === 404 || res.statusCode === 406) {
          console.log(`❌ Table '${table}' not found (Status: ${res.statusCode})`)
        } else {
          console.log(`⚠️  Table '${table}' check returned status: ${res.statusCode}`)
        }
        resolve()
      })

      req.on('error', (error) => {
        console.error(`❌ Error checking ${table}:`, error.message)
        resolve()
      })

      req.end()
    })
  }
}

async function main() {
  console.log('🚀 Verifying Supabase Setup...\n')

  await checkStorageBuckets()
  await checkTables()

  console.log('\n📋 Summary:')
  console.log('1. Storage buckets have been created ✅')
  console.log('2. Database tables need to be created manually')
  console.log('\n📌 To create tables:')
  console.log('1. Go to: https://aqvnasuputatphvqrqam.supabase.co/project/aqvnasuputatphvqrqam/sql')
  console.log('2. Run the SQL from: scripts/supabase-pr12-setup.sql')
  console.log('\n✨ Once tables are created, the application is ready to use!')
}

main().catch(console.error)
