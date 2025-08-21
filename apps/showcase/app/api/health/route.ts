import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    deployment: process.env.VERCEL_URL || 'local',
    region: process.env.VERCEL_REGION || 'unknown'
  })
}