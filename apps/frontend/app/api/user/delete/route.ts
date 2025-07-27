import { createServerSupabaseClient } from '@voai/shared/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function DELETE() {
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

    // Call the comprehensive user data deletion function
    const { error: deleteFunctionError } = await supabase
      .rpc('delete_user_data', { user_id: user.id })

    if (deleteFunctionError) {
      console.error('Error calling delete_user_data:', deleteFunctionError)
      return NextResponse.json({ error: 'Failed to delete user data' }, { status: 500 })
    }

    // Log the deletion for GDPR compliance
    const { error: logError } = await supabase
      .rpc('log_user_deletion', {
        p_user_id: user.id,
        p_deletion_type: 'user_requested',
        p_metadata: {
          request_ip: 'anonymized', // Don't log actual IP for privacy
          timestamp: new Date().toISOString(),
        }
      })

    if (logError) {
      console.error('Error logging deletion:', logError)
      // Continue with deletion even if logging fails
    }

    // Use service role client to delete from auth.users
    // This requires the service role key to be available as an environment variable
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const serviceSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      )

      const { error: authDeleteError } = await serviceSupabase.auth.admin.deleteUser(user.id)

      if (authDeleteError) {
        console.error('Error deleting auth user:', authDeleteError)
        // Return partial success message
        return NextResponse.json({
          success: true,
          message: 'User data deleted. Auth account deletion pending admin review.',
        })
      }
    } else {
      // If service role key not available, sign out user and inform them
      await supabase.auth.signOut()
      
      return NextResponse.json({
        success: true,
        message: 'User data deleted. Please contact support to complete account deletion.',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'User account and all associated data have been permanently deleted.',
    })
  } catch (error) {
    console.error('Unexpected error in DELETE /api/user/delete:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
