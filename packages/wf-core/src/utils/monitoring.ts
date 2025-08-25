import { register, Counter, Histogram, Gauge } from 'prom-client'

// Clear register to avoid duplicates
register.clear()

// Metrics
export const jobsProcessedCounter = new Counter({
  name: 'voai_jobs_processed_total',
  help: 'Total number of jobs processed',
  labelNames: ['type', 'status']
})

export const jobProcessingDuration = new Histogram({
  name: 'voai_job_processing_duration_seconds',
  help: 'Duration of job processing in seconds',
  labelNames: ['type'],
  buckets: [0.1, 0.5, 1, 5, 10, 30, 60, 120, 300]
})

export const ocrProcessingDuration = new Histogram({
  name: 'voai_ocr_processing_duration_seconds',
  help: 'Duration of OCR processing in seconds',
  buckets: [1, 5, 10, 20, 30, 45, 60]
})

export const embeddingProcessingDuration = new Histogram({
  name: 'voai_embedding_processing_duration_seconds',
  help: 'Duration of embedding generation in seconds',
  buckets: [0.5, 1, 2, 5, 10, 20, 30]
})

export const activeJobsGauge = new Gauge({
  name: 'voai_active_jobs',
  help: 'Number of currently active jobs',
  labelNames: ['type']
})

export const webhookErrorsCounter = new Counter({
  name: 'voai_webhook_errors_total',
  help: 'Total number of webhook errors',
  labelNames: ['provider', 'error_type']
})

export const dlqSizeGauge = new Gauge({
  name: 'voai_dlq_size',
  help: 'Number of jobs in dead letter queue',
  labelNames: ['queue']
})

export const callSuccessRatio = new Gauge({
  name: 'voai_call_success_ratio',
  help: 'Ratio of successful calls',
  labelNames: ['provider']
})

// Metrics endpoint handler
export function getMetrics() {
  return register.metrics()
}

// Helper to record job processing
export function recordJobProcessing(type: string, status: 'success' | 'failed', durationMs: number) {
  jobsProcessedCounter.inc({ type, status })
  jobProcessingDuration.observe({ type }, durationMs / 1000)
}

// Helper to record webhook errors
export function recordWebhookError(provider: string, errorType: string) {
  webhookErrorsCounter.inc({ provider, error_type: errorType })
}

// Alert definitions for monitoring
export const alertDefinitions = {
  dlqAlert: {
    condition: 'voai_dlq_size > 0',
    for: '5m',
    severity: 'warning',
    summary: 'Jobs in dead letter queue',
    description: 'There are {{ $value }} jobs in the DLQ'
  },
  webhookErrorAlert: {
    condition: 'rate(voai_webhook_errors_total[5m]) > 0',
    for: '5m', 
    severity: 'critical',
    summary: 'Webhook errors detected',
    description: 'Webhook error rate is {{ $value }} per second'
  },
  jobProcessingSlowAlert: {
    condition: 'histogram_quantile(0.95, voai_job_processing_duration_seconds) > 300',
    for: '10m',
    severity: 'warning',
    summary: 'Job processing is slow',
    description: 'P95 job processing time is {{ $value }} seconds'
  },
  ocrSlowAlert: {
    condition: 'histogram_quantile(0.95, voai_ocr_processing_duration_seconds) > 30',
    for: '5m',
    severity: 'warning',
    summary: 'OCR processing exceeds 30s P95',
    description: 'P95 OCR processing time is {{ $value }} seconds'
  }
}