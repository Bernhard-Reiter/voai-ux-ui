import { createServerSupabaseClient } from '@voai/shared/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Call the export function to get all user data
    const { data: exportData, error: exportError } = await supabase
      .rpc('export_user_data', { p_user_id: user.id })

    if (exportError) {
      console.error('Error exporting user data:', exportError)
      return NextResponse.json({ error: 'Failed to export user data' }, { status: 500 })
    }

    // Add auth information to the export
    const fullExport = {
      ...exportData,
      auth_info: {
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        // Don't include sensitive auth metadata
      }
    }

    // Return data as JSON download
    return new NextResponse(JSON.stringify(fullExport, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="user-data-export-${user.id}.json"`,
      },
    })
  } catch (error) {
    console.error('Unexpected error in GET /api/user/export:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}