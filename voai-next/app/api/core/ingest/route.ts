import 'server-only'
import { NextRequest } from 'next/server'
import { IngestRequest } from '@/lib/modules/core'

// Beispiel: Nur stub/ack (Log + 202). In echt → Supabase Function, Queue, etc.
export const runtime = 'nodejs'
export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = IngestRequest.parse(body)
  console.info('ingest stub', data)
  // TODO: call Supabase Edge Function or queue
  return Response.json({ ok: true }, { status: 202 })
}