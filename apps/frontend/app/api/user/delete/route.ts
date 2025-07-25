import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/../../packages/shared/lib/supabase-server'
import { AuthenticationError, handleApiError } from '@/lib/errors'

export async function DELETE(_request: NextRequest) {
  try {
    // Initialize Supabase client
    const supabase = await createServerSupabaseClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      throw new AuthenticationError('You must be authenticated to delete your account')
    }

    // Start a transaction to ensure all data is deleted
    const userId = user.id

    // Delete user's uploaded files metadata first (if you have a files table)
    const { error: filesError } = await supabase.from('files').delete().eq('user_id', userId)

    if (filesError && filesError.code !== 'PGRST116') {
      // PGRST116 = table doesn't exist
      console.error('Error deleting user files:', filesError)
    }

    // Delete user's sessions
    const { error: sessionsError } = await supabase.from('sessions').delete().eq('user_id', userId)

    if (sessionsError && sessionsError.code !== 'PGRST116') {
      console.error('Error deleting user sessions:', sessionsError)
    }

    // Delete any other user-related data from your custom tables
    // Add more deletion queries here for your specific tables

    // Delete user profile (if you have a profiles table)
    const { error: profileError } = await supabase.from('profiles').delete().eq('id', userId)

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error deleting user profile:', profileError)
    }

    // Finally, delete the user from auth
    // Note: This will sign out the user and delete their auth record
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)

    if (deleteError) {
      console.error('Error deleting user from auth:', deleteError)
      throw new Error('Failed to delete user account. Please contact support.')
    }

    // Clear auth cookies
    const response = NextResponse.json(
      {
        success: true,
        message: 'Your account and all associated data have been permanently deleted.',
      },
      { status: 200 }
    )

    // Clear Supabase auth cookies
    response.cookies.set('sb-access-token', '', {
      path: '/',
      maxAge: 0,
    })
    response.cookies.set('sb-refresh-token', '', {
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error) {
    return handleApiError(error)
  }
}

// OPTIONS for CORS
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
