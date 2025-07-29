'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Users,
  Briefcase,
  DollarSign,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileCheck,
  X,
} from 'lucide-react'
import { sanitizeInput, validateEmail } from '@/lib/security'
import { Button } from '@voai/ui'
import { Card, CardContent } from '@voai/ui'
import { cn } from '@/lib/utils'
import { useSound } from '@/hooks/use-sound'

export default function UploadPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    merchantName: '',
    merchantPhone: '',
    originalPrice: '',
    productCategory: 'general',
    urgencyLevel: 'medium',
    customerNotes: '',
    file: null as File | null,
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [csrfToken, setCsrfToken] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  // Sound effects
  const [playClick] = useSound('/sounds/click.mp3')
  const [playSuccess] = useSound('/sounds/success.mp3')
  const [playError] = useSound('/sounds/error.mp3')

  // CSRF Token beim Laden holen
  useEffect(() => {
    const token =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf-token='))
        ?.split('=')[1] || ''
    setCsrfToken(token)
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const sanitizedValue = ['customerName', 'merchantName', 'customerNotes'].includes(name)
      ? sanitizeInput(value)
      : value
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('Die Datei ist zu groß. Maximale Größe: 10MB')
      playError()
      return
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ]
    if (!allowedTypes.includes(file.type)) {
      setError('Nicht unterstützter Dateityp. Erlaubt sind: PDF, DOC, DOCX, JPG, PNG')
      playError()
      return
    }

    setError(null)
    setFormData((prev) => ({ ...prev, file }))
    playSuccess()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateEmail(formData.customerEmail)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      playError()
      return
    }

    if (!formData.file) {
      setError('Bitte laden Sie ein Dokument hoch')
      playError()
      return
    }

    setIsUploading(true)
    playClick()

    try {
      const uploadData = new FormData()
      uploadData.append('file', formData.file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken,
        },
        body: uploadData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload fehlgeschlagen')
      }

      const result = await response.json()

      localStorage.setItem(
        'negotiation',
        JSON.stringify({
          ...formData,
          fileId: result.fileId,
          uploadedAt: new Date().toISOString(),
        })
      )

      setUploadSuccess(true)
      playSuccess()
      setTimeout(() => {
        window.location.href = '/status'
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
      setIsUploading(false)
      playError()
    }
  }

  const steps = [
    { id: 1, title: 'Kundendaten', icon: Users },
    { id: 2, title: 'Händlerdaten', icon: Briefcase },
    { id: 3, title: 'Angebotsdetails', icon: DollarSign },
    { id: 4, title: 'Dokument', icon: FileText },
  ]

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.customerName && formData.customerEmail
      case 2:
        return formData.merchantName && formData.merchantPhone
      case 3:
        return formData.originalPrice
      case 4:
        return formData.file
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Zurück zur Startseite
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Neue Verhandlung starten
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            In nur 4 Schritten zu Ihrer KI-gestützten Preisverhandlung
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <button
                    onClick={() => isStepValid(step.id - 1) && setCurrentStep(step.id)}
                    disabled={!isStepValid(step.id - 1) && step.id > currentStep}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
                      'disabled:cursor-not-allowed',
                      currentStep === step.id &&
                        'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-110',
                      currentStep > step.id && 'bg-green-500 text-white',
                      currentStep < step.id &&
                        'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    )}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </button>
                  <span
                    className={cn(
                      'absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap',
                      currentStep === step.id
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-500 dark:text-gray-400'
                    )}
                  >
                    {step.title}
                  </span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-6 left-12 w-full h-0.5 -z-10',
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardContent className="flex items-center gap-3 p-4">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-700 dark:text-red-300">{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
        >
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Customer Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                        <Users className="w-6 h-6 text-purple-600" />
                        Ihre Kontaktdaten
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ihr Name *
                          </label>
                          <input
                            type="text"
                            name="customerName"
                            required
                            value={formData.customerName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                            placeholder="Max Mustermann"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            E-Mail-Adresse *
                          </label>
                          <input
                            type="email"
                            name="customerEmail"
                            required
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                            placeholder="max@beispiel.de"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Merchant Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                        Händlerinformationen
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Händlername *
                          </label>
                          <input
                            type="text"
                            name="merchantName"
                            required
                            value={formData.merchantName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="Firma GmbH"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Telefonnummer *
                          </label>
                          <input
                            type="tel"
                            name="merchantPhone"
                            required
                            value={formData.merchantPhone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="+49 123 456789"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Offer Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        Angebotsdetails
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Originalpreis (€) *
                          </label>
                          <input
                            type="number"
                            name="originalPrice"
                            required
                            min="0"
                            step="0.01"
                            value={formData.originalPrice}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                            placeholder="1000.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Produktkategorie
                          </label>
                          <select
                            name="productCategory"
                            value={formData.productCategory}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                          >
                            <option value="general">Allgemein</option>
                            <option value="electronics">Elektronik</option>
                            <option value="automotive">Automobil</option>
                            <option value="services">Dienstleistungen</option>
                            <option value="software">Software</option>
                            <option value="consulting">Beratung</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Dringlichkeit
                          </label>
                          <select
                            name="urgencyLevel"
                            value={formData.urgencyLevel}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                          >
                            <option value="low">Niedrig</option>
                            <option value="medium">Mittel</option>
                            <option value="high">Hoch</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Zusätzliche Notizen
                        </label>
                        <textarea
                          name="customerNotes"
                          value={formData.customerNotes}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                          placeholder="Spezielle Anforderungen oder Hinweise..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: File Upload */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-orange-600" />
                        Dokument hochladen
                      </h2>
                      <div className="relative">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={cn(
                            'flex flex-col items-center justify-center w-full px-6 py-12 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200',
                            isDragging
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800/50'
                          )}
                        >
                          {formData.file ? (
                            <div className="text-center">
                              <FileCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                {formData.file.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-4"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                  e.preventDefault()
                                  setFormData((prev) => ({ ...prev, file: null }))
                                }}
                              >
                                Andere Datei wählen
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Klicken zum Hochladen oder Drag & Drop
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                PDF, DOC, DOCX, JPG, PNG bis zu 10MB
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Zurück
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      playClick()
                      setCurrentStep(Math.min(4, currentStep + 1))
                    }}
                    disabled={!isStepValid(currentStep)}
                    className="group"
                  >
                    Weiter
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isUploading || !isStepValid(4)}
                    className="min-w-[200px] group"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verarbeitung läuft...
                      </>
                    ) : uploadSuccess ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Erfolgreich!
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        KI-Verhandlung starten
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.form>
      </div>
    </div>
  )
}
