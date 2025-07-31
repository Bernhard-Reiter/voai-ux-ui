const https = require('https')

const SUPABASE_URL = 'aqvnasuputatphvqrqam.supabase.co'
const SERVICE_KEY = 'sb_secret_03gqoYtgkUp-_38JjWWBSw_Ddvmsn1I'

async function createStorageBucket(bucketConfig) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bucketConfig)

    const options = {
      hostname: SUPABASE_URL,
      port: 443,
      path: '/storage/v1/bucket',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SERVICE_KEY}`,
        apikey: SERVICE_KEY,
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }

    const req = https.request(options, (res) => {
      let responseData = ''

      res.on('data', (chunk) => {
        responseData += chunk
      })

      res.on('end', () => {
        console.log(`Response for ${bucketConfig.id}: ${res.statusCode}`)
        if (responseData) {
          console.log(`Response body: ${responseData}`)
        }
        resolve({ status: res.statusCode, data: responseData })
      })
    })

    req.on('error', (error) => {
      console.error(`Error creating bucket ${bucketConfig.id}:`, error.message)
      reject(error)
    })

    req.write(data)
    req.end()
  })
}

async function createBuckets() {
  console.log('🚀 Creating Storage Buckets via Supabase API...\n')

  // Create user-uploads bucket
  const userUploadsBucket = {
    id: 'user-uploads',
    name: 'user-uploads',
    public: false,
    file_size_limit: 10485760,
    allowed_mime_types: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ],
  }

  // Create avatars bucket
  const avatarsBucket = {
    id: 'avatars',
    name: 'avatars',
    public: true,
    file_size_limit: 2097152,
    allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp'],
  }

  try {
    console.log('📦 Creating user-uploads bucket...')
    await createStorageBucket(userUploadsBucket)

    console.log('\n📦 Creating avatars bucket...')
    await createStorageBucket(avatarsBucket)

    console.log('\n✅ Storage bucket creation attempted!')
    console.log('\n⚠️  Note: If buckets already exist, you may see 400 errors above.')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Also try to execute SQL via the Supabase REST API
async function testDatabaseAccess() {
  console.log('\n🔍 Testing database access...\n')

  return new Promise((resolve) => {
    const options = {
      hostname: SUPABASE_URL,
      port: 443,
      path: '/rest/v1/workflow_status?limit=1',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${SERVICE_KEY}`,
        apikey: SERVICE_KEY,
        'Content-Type': 'application/json',
      },
    }

    const req = https.request(options, (res) => {
      let responseData = ''

      res.on('data', (chunk) => {
        responseData += chunk
      })

      res.on('end', () => {
        console.log(`Database test response: ${res.statusCode}`)
        if (res.statusCode === 404) {
          console.log('⚠️  Table workflow_status does not exist yet')
          console.log('📌 Please run the SQL migrations manually in Supabase Dashboard')
        } else if (res.statusCode === 200) {
          console.log('✅ Table workflow_status exists!')
        }
        resolve()
      })
    })

    req.on('error', (error) => {
      console.error('Database test error:', error.message)
      resolve()
    })

    req.end()
  })
}

// Run everything
async function main() {
  await createBuckets()
  await testDatabaseAccess()

  console.log('\n📋 Next Steps:')
  console.log('1. Go to Supabase SQL Editor:')
  console.log(`   https://${SUPABASE_URL}/project/aqvnasuputatphvqrqam/sql`)
  console.log('2. Run the SQL from: scripts/supabase-pr12-setup.sql')
  console.log('3. Verify buckets at:')
  console.log(`   https://${SUPABASE_URL}/project/aqvnasuputatphvqrqam/storage/buckets`)
}

main().catch(console.error)
