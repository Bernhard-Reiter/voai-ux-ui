const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

// PostgreSQL connection with proper encoding
const connectionString =
  'postgresql://postgres:20Vi425!%3F@db.aqvnasuputatphvqrqam.supabase.co:6543/postgres'

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function runMigrations() {
  try {
    console.log('🔌 Connecting to database...')
    await client.connect()
    console.log('✅ Connected successfully!\n')

    // Read SQL file
    const sqlPath = path.join(__dirname, 'supabase-pr12-setup.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')

    // Split into individual statements
    const statements = sqlContent
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--'))

    console.log(`📝 Executing ${statements.length} SQL statements...\n`)

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'

      // Extract operation type
      const operation = statement.match(/^(CREATE|ALTER|DROP)/i)?.[1] || 'EXECUTE'

      try {
        await client.query(statement)
        console.log(`✅ [${i + 1}/${statements.length}] ${operation} executed successfully`)
      } catch (error) {
        console.error(
          `❌ [${i + 1}/${statements.length}] Failed to execute ${operation}:`,
          error.message
        )
        // Continue with other statements
      }
    }

    console.log('\n🎉 Migration completed!')

    // Verify tables were created
    console.log('\n🔍 Verifying tables...')

    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('workflow_status', 'files')
    `

    const result = await client.query(tablesQuery)
    console.log('\n📋 Created tables:')
    result.rows.forEach((row) => {
      console.log(`   ✅ ${row.table_name}`)
    })
  } catch (error) {
    console.error('❌ Connection error:', error.message)
  } finally {
    await client.end()
  }
}

runMigrations()
