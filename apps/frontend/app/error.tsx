'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)

    // Report to Sentry if available
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6"
          >
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ups! Ein Fehler ist aufgetreten
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Es tut uns leid, aber etwas ist schiefgelaufen. Unser Team wurde benachrichtigt und
            arbeitet an einer Lösung.
          </p>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{error.message}</p>
              {error.digest && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
          >
            <RefreshCw className="mr-2 w-5 h-5" />
            Erneut versuchen
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <Home className="mr-2 w-5 h-5" />
            Zur Startseite
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-500">
          <p>Benötigen Sie Hilfe?</p>
          <Link href="/contact" className="text-purple-600 hover:underline">
            Kontaktieren Sie unseren Support
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
