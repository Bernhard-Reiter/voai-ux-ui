import { NextRequest, NextResponse } from 'next/server'
import { getMetrics } from '../../../../packages/wf-core/src/utils/monitoring'

export async function GET(request: NextRequest) {
  // Simple auth check - in production use proper auth
  const authHeader = request.headers.get('authorization')
  
  if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const metrics = await getMetrics()
    
    return new NextResponse(metrics, {
      headers: {
        'Content-Type': 'text/plain; version=0.0.4; charset=utf-8'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get metrics' }, { status: 500 })
  }
}