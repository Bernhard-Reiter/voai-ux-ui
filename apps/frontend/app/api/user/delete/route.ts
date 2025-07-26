import { createServerSupabaseClient } from '@voai/shared'
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

    // Delete all user's workflow status records
    const { error: deleteError } = await supabase
      .from('workflow_status')
      .delete()
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Error deleting workflow status:', deleteError)
      return NextResponse.json({ error: 'Failed to delete user data' }, { status: 500 })
    }

    // Note: Deleting the user from auth.users requires service role key
    // This would typically be done in a separate admin function
    // For now, we'll just sign out the user
    await supabase.auth.signOut()

    return NextResponse.json({
      success: true,
      message:
        'User data deleted successfully. Please contact support to complete account deletion.',
    })
  } catch (error) {
    console.error('Unexpected error in DELETE /api/user/delete:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
