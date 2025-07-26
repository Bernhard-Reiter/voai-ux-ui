'use client'

import { withAuthSsr } from '@voai/shared'
import { useState } from 'react'
import { User } from '@supabase/supabase-js'

function DeleteAccountButton() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      if (response.ok) {
        window.location.href = '/'
      } else {
        alert('Fehler beim Löschen des Kontos. Bitte versuchen Sie es später erneut.')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Ein unerwarteter Fehler ist aufgetreten.')
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-red-600 font-medium">
          Sind Sie sicher? Diese Aktion kann nicht rückgängig gemacht werden.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Wird gelöscht...' : 'Ja, Konto löschen'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Abbrechen
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Konto löschen
    </button>
  )
}

async function SettingsPage({ user }: { user: User }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Einstellungen</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profil</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Benutzer-ID</label>
            <p className="mt-1 text-sm text-gray-900">{user.id}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Gefahrenzone</h2>
        <div className="space-y-4">
          <div className="border border-red-200 rounded p-4">
            <h3 className="text-lg font-medium text-red-600 mb-2">Konto löschen</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sobald Sie Ihr Konto löschen, gibt es kein Zurück. Bitte seien Sie sicher.
            </p>
            <DeleteAccountButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthSsr(SettingsPage)
