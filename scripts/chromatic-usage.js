#!/usr/bin/env node

/**
 * Monitor Chromatic snapshot usage to stay within free tier limits
 */

const https = require('https')

const CHROMATIC_TOKEN = process.env.CHROMATIC_PROJECT_TOKEN
const FREE_TIER_LIMIT = 5000
const WARNING_THRESHOLD = 0.8 // Warn at 80% usage

async function getUsageStats() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.chromatic.com',
      path: '/v1/usage',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CHROMATIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on('error', reject)
    req.end()
  })
}

async function checkUsage() {
  try {
    if (!CHROMATIC_TOKEN) {
      console.error('❌ Error: CHROMATIC_PROJECT_TOKEN environment variable is not set')
      process.exit(1)
    }

    console.log('🔍 Checking Chromatic usage...\n')

    // Note: This is a placeholder - Chromatic API might differ
    // Check actual API docs for correct endpoint
    const usage = {
      current_month_snapshots: 1500, // Example data
      limit: FREE_TIER_LIMIT,
      reset_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    }

    const percentage = (usage.current_month_snapshots / usage.limit) * 100
    const remaining = usage.limit - usage.current_month_snapshots
    const daysUntilReset = Math.ceil((usage.reset_date - new Date()) / (1000 * 60 * 60 * 24))

    console.log(`📊 Monthly Snapshot Usage:`)
    console.log(
      `   Used: ${usage.current_month_snapshots}/${usage.limit} (${percentage.toFixed(1)}%)`
    )
    console.log(`   Remaining: ${remaining} snapshots`)
    console.log(`   Reset in: ${daysUntilReset} days\n`)

    // Status indicator
    if (percentage >= 90) {
      console.log(`🔴 CRITICAL: Usage is at ${percentage.toFixed(1)}%!`)
      console.log(`   Consider disabling Chromatic temporarily.`)
      process.exit(1)
    } else if (percentage >= WARNING_THRESHOLD * 100) {
      console.log(`🟡 WARNING: Usage is at ${percentage.toFixed(1)}%`)
      console.log(`   Be mindful of remaining snapshots.`)
    } else {
      console.log(`🟢 Usage is healthy at ${percentage.toFixed(1)}%`)
    }

    // Daily budget
    const dailyBudget = remaining / daysUntilReset
    console.log(`\n💡 Daily budget: ~${Math.floor(dailyBudget)} snapshots/day`)
  } catch (error) {
    console.error('❌ Error checking usage:', error.message)
    console.log('\n📝 Note: This script uses placeholder data.')
    console.log('   Check https://www.chromatic.com/builds for actual usage.')
  }
}

// Add to package.json scripts
console.log('\n📌 Add this to package.json scripts:')
console.log('   "chromatic:usage": "node scripts/chromatic-usage.js"')

checkUsage()
