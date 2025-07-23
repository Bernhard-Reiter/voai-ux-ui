'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle, AlertCircle, MessageSquare, RefreshCw } from 'lucide-react'

interface NegotiationStep {
  id: number
  title: string
  status: 'completed' | 'active' | 'pending'
  timestamp?: string
  description?: string
}

export default function StatusPage() {
  const [negotiationId] = useState('NEG-2024-1234')
  const [currentOffer] = useState(850)
  const [originalPrice] = useState(1000)
  const [messages] = useState([
    {
      sender: 'ai',
      text: 'Guten Tag, ich verhandle im Auftrag meines Kunden über das Angebot.',
      time: '14:32',
    },
    { sender: 'merchant', text: 'Hallo, wie kann ich Ihnen helfen?', time: '14:33' },
    {
      sender: 'ai',
      text: 'Mein Kunde ist sehr interessiert, jedoch liegt der Preis über dem Budget. Wäre ein Preisnachlass möglich?',
      time: '14:33',
    },
    { sender: 'merchant', text: 'Ich kann Ihnen einen Rabatt von 10% anbieten.', time: '14:35' },
    {
      sender: 'ai',
      text: 'Das ist ein guter Anfang. Basierend auf Marktanalysen wäre ein Preis von 850€ angemessen.',
      time: '14:36',
    },
  ])

  const steps: NegotiationStep[] = [
    { id: 1, title: 'Angebot hochgeladen', status: 'completed', timestamp: '14:30' },
    { id: 2, title: 'KI-Analyse durchgeführt', status: 'completed', timestamp: '14:31' },
    { id: 3, title: 'Verhandlung gestartet', status: 'completed', timestamp: '14:32' },
    {
      id: 4,
      title: 'In Verhandlung',
      status: 'active',
      description: 'KI verhandelt aktiv mit dem Händler',
    },
    { id: 5, title: 'Abschluss', status: 'pending' },
  ]

  const savings = originalPrice - currentOffer
  const savingsPercent = (savings / originalPrice) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Übersicht
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Verhandlungsstatus</h1>
          <p className="text-gray-600">Verhandlungs-ID: {negotiationId}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Fortschritt</h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : step.status === 'active'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : step.status === 'active' ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute top-10 left-5 w-0.5 h-12 -translate-x-1/2 ${
                            step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          step.status === 'pending' ? 'text-gray-500' : 'text-gray-900'
                        }`}
                      >
                        {step.title}
                      </h3>
                      {step.timestamp && <p className="text-sm text-gray-500">{step.timestamp}</p>}
                      {step.description && (
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preisübersicht</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Originalpreis</span>
                  <span className="font-medium">€{originalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aktuelles Angebot</span>
                  <span className="font-medium text-blue-600">€{currentOffer}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Ersparnis</span>
                    <div className="text-right">
                      <span className="font-semibold text-green-600">€{savings}</span>
                      <span className="text-sm text-green-600 ml-1">
                        ({savingsPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Verhandlungsverlauf
                </h2>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.sender === 'ai'
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-gray-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm font-medium mb-1">
                        {message.sender === 'ai' ? 'VOAI KI-Agent' : 'Händler'}
                      </p>
                      <p>{message.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center py-4"
                >
                  <div className="flex items-center gap-2 text-blue-600">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">KI verhandelt weiter...</span>
                  </div>
                </motion.div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  <p>
                    Die Verhandlung läuft vollautomatisch. Sie werden benachrichtigt, sobald ein
                    Ergebnis vorliegt.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
