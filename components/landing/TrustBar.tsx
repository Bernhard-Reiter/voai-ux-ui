'use client'

export default function TrustBar() {
  const partners = [
    { name: 'SAP', logo: '/logos/sap.svg' },
    { name: 'DATEV', logo: '/logos/datev.svg' },
    { name: 'Lexware', logo: '/logos/lexware.svg' },
    { name: 'sevDesk', logo: '/logos/sevdesk.svg' },
    { name: 'Personio', logo: '/logos/personio.svg' },
    { name: 'Xero', logo: '/logos/xero.svg' },
  ]

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container-width">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-8 text-center">
            Nahtlose Integration mit Ihren bestehenden Tools
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center">
                <div className="w-32 h-12 relative grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                  {/* Placeholder for partner logos */}
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-medium">
                    {partner.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}