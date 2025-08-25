import PgBoss from 'pg-boss'
import pino from 'pino'
import { registerIngestWorker } from './jobs/ingest.worker'
import { registerAnalysisWorker } from './jobs/analysis.worker'
import { registerCallWorkers } from './jobs/call.workers'
import { registerRetentionWorker } from './jobs/retention.worker'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

async function start() {
  const boss = new PgBoss({
    connectionString: process.env.DATABASE_URL!,
    max: 20,
    retryLimit: 3,
    retryDelay: 1000,
    retryBackoff: true,
    expireInHours: 24,
    archiveCompletedAfterSeconds: 60 * 60 * 24 * 7, // 7 days
    deleteAfterDays: 30,
    monitorStateIntervalSeconds: 30,
    maintenanceIntervalSeconds: 60,
    uuid: 'v4',
    pgBoss: true
  })

  boss.on('error', (error) => {
    logger.error({ error }, 'PgBoss error')
  })

  boss.on('monitor-states', (states) => {
    logger.info({ states }, 'Queue states')
  })

  await boss.start()
  logger.info('PgBoss started successfully')

  // Register workers
  await registerIngestWorker(boss, logger)
  await registerAnalysisWorker(boss, logger)
  await registerCallWorkers(boss, logger)
  await registerRetentionWorker(boss, logger)

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Shutting down worker')
    await boss.stop()
    process.exit(0)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

start().catch((error) => {
  logger.error({ error }, 'Failed to start worker')
  process.exit(1)
})