import { NextRequest, NextResponse } from 'next/server';

// In production, this would send to your analytics service (Supabase, etc.)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics API]', body);
    }
    
    // In production, send to your analytics service
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      // Example: Send to Supabase
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/rest/v1/analytics_events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          event_name: body.event,
          event_properties: body.properties,
          variant: body.variant,
          ui_library: body.uiLibrary,
          session_id: body.sessionId,
          user_agent: body.userAgent,
          referrer: body.referrer,
          timestamp: body.timestamp,
        }),
      });
      
      if (!response.ok) {
        console.error('[Analytics] Supabase error:', await response.text());
      }
    }
    
    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics] Error processing event:', error);
    return NextResponse.json(
      { error: 'Failed to process analytics event' },
      { status: 500 }
    );
  }
}

// GET endpoint for checking analytics status
export async function GET() {
  return NextResponse.json({
    status: 'active',
    hasSupabase: !!process.env.SUPABASE_URL,
    timestamp: new Date().toISOString(),
  });
}