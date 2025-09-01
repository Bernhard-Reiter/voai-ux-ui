import 'server-only'
import { z } from 'zod'
import { nanoid } from 'nanoid'

// TODO: Uncomment when @voai/wf-core module is available
// import { WorkflowJobSchema } from '@voai/wf-core/src/types/workflow'

// Temporary schema until module is available
const WorkflowJobSchema = z.object({
  id: z.string(),
  status: z.string(),
  type: z.string(),
  data: z.any()
}).partial()

// Request ID generator
function newReqId() {
  return nanoid(12)
}

// Konfiguration
const MODE = process.env.CORE_MODE || 'http' // 'http' | 'module'
const CORE_BASE = process.env.NEXT_PUBLIC_CORE_API_BASE // z.B. https://core.voai.me

// Simplest schema for ingest request (align with your core)
export const IngestRequest = z.object({
  userId: z.string(),
  source: z.string(),           // storage path oder URL
  type: z.enum(['text','document','url','audio','video']).default('document'),
  content: z.string().optional(), // optional bei storage
  format: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional()
})
export type IngestRequest = z.infer<typeof IngestRequest>

async function httpIngest(req: IngestRequest) {
  const id = newReqId()
  const res = await fetch(`${CORE_BASE}/jobs/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Request-Id': id },
    body: JSON.stringify(req),
    cache: 'no-store'
  })
  if (!res.ok) throw new Error(`core ingest failed ${res.status} req:${id}`)
  const json = await res.json()
  // validiere mit Core-Schema (Job/Result), falls Response so gestaltet ist
  return WorkflowJobSchema.partial().parse(json)
}

// Fallback: eigene Edge Function oder Supabase RPC triggern
async function moduleIngest(req: IngestRequest) {
  const id = newReqId()
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/core/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Request-Id': id },
    body: JSON.stringify(req),
    cache: 'no-store'
  })
  if (!res.ok) throw new Error(`module ingest failed ${res.status} req:${id}`)
  return await res.json()
}

export async function enqueueIngest(req: IngestRequest) {
  IngestRequest.parse(req)
  if (MODE === 'http') {
    if (!CORE_BASE) throw new Error('CORE_API_BASE missing')
    return httpIngest(req)
  }
  return moduleIngest(req)
}