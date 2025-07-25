'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCookieConsent } from '@/hooks/use-cookie-consent'
import { createClient } from '@/../../packages/shared/lib/supabase-client'

export default function SettingsPage() {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const { consent, updateConsent, revokeConsent } = useCookieConsent()

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setDeleteError(null)

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        // Sign out and redirect to home page
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
      } else {
        setDeleteError(data.error?.message || 'Fehler beim Löschen des Kontos')
      }
    } catch {
      setDeleteError('Netzwerkfehler. Bitte versuchen Sie es später erneut.')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Einstellungen</h1>

      {/* Privacy Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Datenschutz-Einstellungen</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notwendige Cookies</h3>
              <p className="text-sm text-gray-600">
                Diese Cookies sind für die Grundfunktionen erforderlich
              </p>
            </div>
            <input
              type="checkbox"
              checked={true}
              disabled
              className="h-4 w-4 text-blue-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Analyse-Cookies</h3>
              <p className="text-sm text-gray-600">
                Helfen uns, die Nutzung der Website zu verstehen
              </p>
            </div>
            <input
              type="checkbox"
              checked={consent?.analytics || false}
              onChange={(e) => updateConsent({ analytics: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Marketing-Cookies</h3>
              <p className="text-sm text-gray-600">Werden für personalisierte Werbung verwendet</p>
            </div>
            <input
              type="checkbox"
              checked={consent?.marketing || false}
              onChange={(e) => updateConsent({ marketing: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline" size="sm" onClick={revokeConsent}>
              Alle Cookie-Einstellungen zurücksetzen
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Export */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Datenexport</h2>
        <p className="text-gray-600 mb-4">
          Sie können eine Kopie Ihrer persönlichen Daten anfordern. Wir senden Ihnen diese per
          E-Mail zu.
        </p>
        <Button variant="outline">Datenexport anfordern</Button>
      </Card>

      {/* Account Deletion */}
      <Card className="p-6 border-red-200">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Gefahrenzone</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Konto löschen</h3>
            <p className="text-sm text-gray-600 mb-4">
              Das Löschen Ihres Kontos ist dauerhaft und kann nicht rückgängig gemacht werden. Alle
              Ihre Daten werden unwiderruflich gelöscht.
            </p>

            {deleteError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {deleteError}
              </div>
            )}

            {!showDeleteConfirm ? (
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Konto löschen
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    Sind Sie sicher, dass Sie Ihr Konto löschen möchten?
                  </p>
                  <p className="text-sm text-red-700">
                    Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre Daten werden
                    dauerhaft gelöscht.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
                    {isDeleting ? 'Wird gelöscht...' : 'Ja, Konto dauerhaft löschen'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    Abbrechen
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
