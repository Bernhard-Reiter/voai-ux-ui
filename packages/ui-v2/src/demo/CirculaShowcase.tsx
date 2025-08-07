import React from 'react';
import {
  CirculaButton,
  CTAButton,
  TextButton,
  CirculaCard,
  CirculaCardHeader,
  CirculaCardTitle,
  CirculaCardDescription,
  CirculaCardContent,
  CirculaStatCard,
  CirculaInput,
  CirculaTextarea,
  CirculaSelect,
  CirculaNav,
  CirculaLogo,
  CirculaCheckList,
  CirculaCheckListCompact,
  CirculaCheckListCard,
  CirculaSuccessMessage,
} from '../components';

// Import styles
import '../styles/circula-globals.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', active: true },
  { id: 'expenses', label: 'Ausgaben' },
  { id: 'reports', label: 'Berichte' },
  { id: 'team', label: 'Team' },
];

const checkListItems = [
  { id: '1', text: 'Automatisierte Belegerfassung mit KI' },
  { id: '2', text: 'Reibungslose, KI-gestützte Freigabeprozesse' },
  { id: '3', text: 'Nahtlose Integration in bestehende Systeme' },
  { id: '4', text: 'Echtzeit-Ausgabenübersicht und Reporting' },
];

export const CirculaShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--circula-white)]">
      {/* Navigation */}
      <CirculaNav
        items={navItems}
        logo={<CirculaLogo />}
        cta={<CTAButton>Beratung buchen</CTAButton>}
      />
      
      {/* Main Content */}
      <main className="circula-container py-[var(--circula-space-10)]">
        {/* Hero Section */}
        <section className="mb-[var(--circula-space-12)]">
          <h1 className="circula-text-headline mb-[var(--circula-space-4)]">
            Ausgabenverwaltung auf Autopilot
          </h1>
          <p className="circula-text-body text-[var(--circula-text-lg)] mb-[var(--circula-space-8)] max-w-[600px]">
            voai automatisiert Ihre Ausgabenprozesse mit künstlicher Intelligenz. 
            Sparen Sie Zeit und behalten Sie die volle Kontrolle.
          </p>
          <div className="flex gap-[var(--circula-space-3)]">
            <CTAButton size="lg">Demo anfordern</CTAButton>
            <CirculaButton variant="secondary" size="lg">
              Mehr erfahren
            </CirculaButton>
          </div>
        </section>
        
        {/* Features with CheckList */}
        <section className="mb-[var(--circula-space-12)]">
          <h2 className="circula-text-title mb-[var(--circula-space-8)]">
            Warum voai?
          </h2>
          <div className="circula-grid grid-cols-1 md:grid-cols-2">
            <div>
              <CirculaCheckList items={checkListItems} />
            </div>
            <CirculaCheckListCard
              title="Ihre Vorteile"
              description="Erleben Sie die Zukunft der Ausgabenverwaltung"
              items={[
                { id: '1', text: 'Bis zu 80% Zeitersparnis' },
                { id: '2', text: 'Volle Compliance-Konformität' },
                { id: '3', text: 'Reduzierte Fehlerquote' },
              ]}
            />
          </div>
        </section>
        
        {/* Stats Cards */}
        <section className="mb-[var(--circula-space-12)]">
          <h2 className="circula-text-title mb-[var(--circula-space-6)]">
            Unsere Zahlen sprechen für sich
          </h2>
          <div className="circula-grid grid-cols-1 md:grid-cols-3">
            <CirculaStatCard
              label="Verarbeitete Belege"
              value="2.4M"
              change={{ value: "+12%", positive: true }}
            />
            <CirculaStatCard
              label="Eingesparte Stunden"
              value="48k"
              change={{ value: "+24%", positive: true }}
            />
            <CirculaStatCard
              label="Aktive Nutzer"
              value="1,250"
              change={{ value: "+8%", positive: true }}
            />
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="mb-[var(--circula-space-12)]">
          <CirculaCard variant="borderless" className="max-w-[600px]">
            <CirculaCardHeader>
              <CirculaCardTitle>Kontaktieren Sie uns</CirculaCardTitle>
              <CirculaCardDescription>
                Unser Team meldet sich innerhalb von 24 Stunden bei Ihnen
              </CirculaCardDescription>
            </CirculaCardHeader>
            <CirculaCardContent className="space-y-[var(--circula-space-4)]">
              <div className="circula-grid grid-cols-2">
                <CirculaInput label="Vorname" placeholder="Max" />
                <CirculaInput label="Nachname" placeholder="Mustermann" />
              </div>
              <CirculaInput
                label="E-Mail"
                type="email"
                placeholder="max@firma.de"
              />
              <CirculaSelect label="Unternehmensgröße">
                <option>Bitte wählen</option>
                <option>1-10 Mitarbeiter</option>
                <option>11-50 Mitarbeiter</option>
                <option>51-200 Mitarbeiter</option>
                <option>200+ Mitarbeiter</option>
              </CirculaSelect>
              <CirculaTextarea
                label="Nachricht"
                placeholder="Erzählen Sie uns von Ihren Anforderungen..."
                rows={4}
              />
              <CTAButton fullWidth>Nachricht senden</CTAButton>
            </CirculaCardContent>
          </CirculaCard>
        </section>
        
        {/* Success Message Example */}
        <section className="mb-[var(--circula-space-12)]">
          <CirculaSuccessMessage>
            Ihre Nachricht wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen.
          </CirculaSuccessMessage>
        </section>
        
        {/* Component Showcase */}
        <section>
          <h2 className="circula-text-title mb-[var(--circula-space-6)]">
            Komponenten-Übersicht
          </h2>
          
          {/* Button Variants */}
          <div className="mb-[var(--circula-space-8)]">
            <h3 className="circula-text-subtitle mb-[var(--circula-space-4)]">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-[var(--circula-space-3)]">
              <CirculaButton>Primary Button</CirculaButton>
              <CirculaButton variant="secondary">Secondary Button</CirculaButton>
              <CirculaButton variant="ghost">Ghost Button</CirculaButton>
              <CirculaButton variant="success">Success Button</CirculaButton>
              <TextButton>Text Button</TextButton>
            </div>
          </div>
          
          {/* Card Variants */}
          <div className="mb-[var(--circula-space-8)]">
            <h3 className="circula-text-subtitle mb-[var(--circula-space-4)]">
              Cards
            </h3>
            <div className="circula-grid grid-cols-1 md:grid-cols-3">
              <CirculaCard>
                <CirculaCardTitle>Default Card</CirculaCardTitle>
                <CirculaCardContent>
                  Mit subtiler Border und Hover-Effekt
                </CirculaCardContent>
              </CirculaCard>
              <CirculaCard variant="borderless">
                <CirculaCardTitle>Borderless Card</CirculaCardTitle>
                <CirculaCardContent>
                  Nur mit dezentem Schatten
                </CirculaCardContent>
              </CirculaCard>
              <CirculaCard variant="highlight">
                <CirculaCardTitle>Highlight Card</CirculaCardTitle>
                <CirculaCardContent>
                  Mit verstärkter schwarzer Border
                </CirculaCardContent>
              </CirculaCard>
            </div>
          </div>
          
          {/* Compact CheckList */}
          <div>
            <h3 className="circula-text-subtitle mb-[var(--circula-space-4)]">
              Compact CheckList
            </h3>
            <CirculaCheckListCompact
              items={[
                { id: '1', text: 'Kompakte Variante für kleinere Bereiche' },
                { id: '2', text: 'Kleinere Icons und Schrift' },
                { id: '3', text: 'Platzsparend und übersichtlich' },
              ]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};