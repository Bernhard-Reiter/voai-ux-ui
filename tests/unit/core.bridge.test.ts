import { describe, it, expect, vi } from 'vitest'
import * as core from '@/lib/modules/core'

vi.spyOn(global, 'fetch' as any).mockResolvedValue({ 
  ok: true, 
  json: async () => ({ ok:true }) 
} as any)

describe('core bridge', () => {
  it('enqueues ingest (http)', async () => {
    process.env.CORE_MODE = 'http'
    process.env.NEXT_PUBLIC_CORE_API_BASE = 'https://core.voai.me'
    const res = await core.enqueueIngest({ 
      userId:'u1', 
      source:'offers/x.pdf', 
      type:'document' 
    })
    expect(res).toBeTruthy()
  })
})