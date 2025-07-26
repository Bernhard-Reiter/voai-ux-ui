'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  CheckCircle,
  Building2,
  User,
  Briefcase,
  Globe,
} from 'lucide-react'

// Since this is a client component, we can't use metadata export
// You would need to set this in a layout or use generateMetadata

const contactInfo = [
  {
    icon: Mail,
    title: 'E-Mail',
    value: 'kontakt@voai.de',
    link: 'mailto:kontakt@voai.de',
  },
  {
    icon: Phone,
    title: 'Telefon',
    value: '+49 (0) 30 123 456 789',
    link: 'tel:+4930123456789',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Friedrichstraße 123, 10117 Berlin',
    link: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Geschäftszeiten',
    value: 'Mo-Fr: 9:00 - 18:00 Uhr',
    link: null,
  },
]

const departments = [
  {
    title: 'Vertrieb',
    description: 'Fragen zu Preisen und Paketen',
    email: 'vertrieb@voai.de',
  },
  {
    title: 'Support',
    description: 'Technische Unterstützung',
    email: 'support@voai.de',
  },
  {
    title: 'Partnerschaften',
    description: 'Kooperationsanfragen',
    email: 'partner@voai.de',
  },
  {
    title: 'Presse',
    description: 'Medienanfragen',
    email: 'presse@voai.de',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Kontaktieren Sie uns
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Wir sind für Sie da. Lassen Sie uns gemeinsam Ihre Verhandlungen optimieren.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Contact Form and Departments */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Senden Sie uns eine Nachricht
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Vielen Dank für Ihre Nachricht!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-purple-600 focus:outline-none transition-colors"
                            placeholder="Max Mustermann"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          E-Mail *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-purple-600 focus:outline-none transition-colors"
                            placeholder="max@beispiel.de"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Unternehmen
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-purple-600 focus:outline-none transition-colors"
                            placeholder="Beispiel GmbH"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Telefon
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-purple-600 focus:outline-none transition-colors"
                            placeholder="+49 123 456789"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Betreff *
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-purple-600 focus:outline-none transition-colors appearance-none"
                        >
                          <option value="">Bitte wählen</option>
                          <option value="demo">Demo anfordern</option>
                          <option value="pricing">Preisanfrage</option>
                          <option value="support">Technischer Support</option>
                          <option value="partnership">Partnerschaft</option>
                          <option value="other">Sonstiges</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Nachricht *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-purple-600 focus:outline-none transition-colors resize-none"
                          placeholder="Wie können wir Ihnen helfen?"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          Nachricht senden
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Departments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Direkte Ansprechpartner
              </h2>

              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {dept.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {dept.description}
                    </p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-purple-600 dark:text-purple-400 hover:underline text-sm flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {dept.email}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-4">Schnelle Hilfe</h3>
                <div className="space-y-3">
                  <a href="/faq" className="flex items-center hover:underline">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Häufige Fragen
                  </a>
                  <a
                    href="https://calendly.com/voai-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Demo-Termin buchen
                  </a>
                  <a href="/status" className="flex items-center hover:underline">
                    <Globe className="w-5 h-5 mr-2" />
                    System-Status
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Besuchen Sie uns
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Unser Hauptsitz in Berlin</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Adresse</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Friedrichstraße 123
                    <br />
                    10117 Berlin
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Öffnungszeiten
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Montag - Freitag
                    <br />
                    9:00 - 18:00 Uhr
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Parken</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Parkhaus Friedrichstraße
                    <br />5 Min. Fußweg
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
