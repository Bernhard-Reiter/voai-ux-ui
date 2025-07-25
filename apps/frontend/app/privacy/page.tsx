import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | VOAI',
  description: 'Datenschutzerklärung und Informationen zum Umgang mit Ihren persönlichen Daten',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Verantwortlicher</h2>
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
          <p>
            [Ihr Name oder Firmenname]
            <br />
            [Ihre Adresse]
            <br />
            [PLZ Ort]
            <br />
            E-Mail: [Ihre E-Mail]
            <br />
            Telefon: [Ihre Telefonnummer]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Erhebung und Speicherung personenbezogener Daten
          </h2>
          <p>
            Beim Besuch unserer Website werden automatisch Informationen durch den Server erfasst.
            Diese Informationen beinhalten:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit der Anfrage</li>
            <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
            <li>Inhalt der Anforderung (konkrete Seite)</li>
            <li>Zugriffsstatus/HTTP-Statuscode</li>
            <li>Jeweils übertragene Datenmenge</li>
            <li>Website, von der die Anforderung kommt</li>
            <li>Browser</li>
            <li>Betriebssystem und dessen Oberfläche</li>
            <li>Sprache und Version der Browsersoftware</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Nutzung und Weitergabe personenbezogener Daten
          </h2>
          <p>
            Soweit Sie uns personenbezogene Daten zur Verfügung gestellt haben, verwenden wir diese
            nur zur Beantwortung Ihrer Anfragen, zur Abwicklung mit Ihnen geschlossener Verträge und
            für die technische Administration.
          </p>
          <p>
            Ihre personenbezogenen Daten werden an Dritte nur weitergegeben oder sonst übermittelt,
            wenn dies zum Zwecke der Vertragsabwicklung erforderlich ist, dies zu Abrechnungszwecken
            erforderlich ist oder Sie zuvor eingewilligt haben.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
          <p>
            Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
            gespeichert werden. Sie richten keinen Schaden an und enthalten keine Viren. Cookies
            ermöglichen es, Ihren Browser wiederzuerkennen.
          </p>
          <p>
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
            werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte
            Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim
            Schließen des Browsers aktivieren.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Ihre Rechte</h2>
          <p>
            Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
            personenbezogenen Daten:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Recht auf Auskunft</li>
            <li>Recht auf Berichtigung oder Löschung</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung</li>
            <li>Recht auf Datenübertragbarkeit</li>
          </ul>
          <p>
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
            Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Löschung von Daten</h2>
          <p>
            Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht,
            sobald ihre zur Verarbeitung erlaubten Einwilligungen widerrufen werden oder sonstige
            Erlaubnisse entfallen.
          </p>
          <p>
            Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige
            Zwecke erforderlich sind, wird deren Verarbeitung eingeschränkt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Kontakt</h2>
          <p>
            Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei
            Auskünften, Berichtigung, Sperrung oder Löschung von Daten sowie Widerruf erteilter
            Einwilligungen wenden Sie sich bitte an:
          </p>
          <p>E-Mail: [datenschutz@ihre-domain.de]</p>
        </section>
      </div>
    </div>
  )
}
