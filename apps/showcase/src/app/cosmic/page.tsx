'use client';

import { WaypointBtn, StarCard, StarCardHeader, StarCardTitle, StarCardDescription, StarCardContent, CometInput, OrbitNav } from '@voai/ui';
import { useState } from 'react';

export default function CosmicShowcase() {
  const [activeNav, setActiveNav] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', active: activeNav === 'home' },
    { id: 'constellations', label: 'Constellations', active: activeNav === 'constellations' },
    { id: 'nebulae', label: 'Nebulae', active: activeNav === 'nebulae' },
    { id: 'waypoints', label: 'Waypoints', active: activeNav === 'waypoints' },
  ];

  return (
    <div className="min-h-screen bg-[var(--c-bg)] cosmic-fade">
      <OrbitNav 
        items={navItems}
        onItemClick={(item) => setActiveNav(item.id)}
      />
      
      <main className="cosmic-container py-[var(--space-6)]">
        {/* Hero Section */}
        <div className="text-center mb-[var(--space-6)]">
          <h1 className="cosmic-headline mb-[var(--space-3)]">
            Explore your data universe
          </h1>
          <p className="cosmic-text text-[var(--c-text-secondary)] max-w-2xl mx-auto">
            Chart your Constellations. Sync every Orbit. Illuminate hidden Nebulae in your pipeline.
          </p>
        </div>

        {/* Quick Demo */}
        <div className="cosmic-grid mb-[var(--space-6)]">
          <StarCard className="col-span-12 md:col-span-4" glow>
            <StarCardHeader>
              <StarCardTitle>Launch CRM</StarCardTitle>
              <StarCardDescription>
                Start your cosmic journey
              </StarCardDescription>
            </StarCardHeader>
            <StarCardContent>
              <p className="mb-[var(--space-3)]">
                Access your entire data universe with a single click. All your customer constellations await.
              </p>
              <WaypointBtn variant="primary" className="w-full">
                Launch Now
              </WaypointBtn>
            </StarCardContent>
          </StarCard>

          <StarCard className="col-span-12 md:col-span-4">
            <StarCardHeader>
              <StarCardTitle>Quick Actions</StarCardTitle>
              <StarCardDescription>
                Navigate with Waypoints
              </StarCardDescription>
            </StarCardHeader>
            <StarCardContent>
              <div className="space-y-2">
                <WaypointBtn variant="secondary" className="w-full" size="sm">
                  Add Contact
                </WaypointBtn>
                <WaypointBtn variant="ghost" className="w-full" size="sm">
                  View Reports
                </WaypointBtn>
              </div>
            </StarCardContent>
          </StarCard>

          <StarCard className="col-span-12 md:col-span-4">
            <StarCardHeader>
              <StarCardTitle>Connect</StarCardTitle>
              <StarCardDescription>
                Join the cosmic network
              </StarCardDescription>
            </StarCardHeader>
            <StarCardContent>
              <form className="space-y-3">
                <CometInput 
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                />
                <WaypointBtn variant="primary" className="w-full" size="sm">
                  Subscribe
                </WaypointBtn>
              </form>
            </StarCardContent>
          </StarCard>
        </div>

        {/* Color System Demo */}
        <section className="cosmic-block">
          <h2 className="cosmic-section mb-[var(--space-4)]">
            Cosmic Color System
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-3)]">
            <div className="text-center">
              <div className="h-24 bg-[var(--c-accent)] rounded-[var(--radius-md)] mb-2"></div>
              <p className="cosmic-meta">Accent</p>
            </div>
            <div className="text-center">
              <div className="h-24 bg-[var(--c-surface)] cosmic-border rounded-[var(--radius-md)] mb-2"></div>
              <p className="cosmic-meta">Surface</p>
            </div>
            <div className="text-center">
              <div className="h-24 bg-[var(--c-success)] rounded-[var(--radius-md)] mb-2"></div>
              <p className="cosmic-meta">Success</p>
            </div>
            <div className="text-center">
              <div className="h-24 bg-[var(--c-error)] rounded-[var(--radius-md)] mb-2"></div>
              <p className="cosmic-meta">Error</p>
            </div>
          </div>
        </section>

        {/* Typography Demo */}
        <section className="cosmic-block">
          <h2 className="cosmic-section mb-[var(--space-4)]">
            Cosmic Typography
          </h2>
          
          <StarCard className="space-y-[var(--space-3)]">
            <h1 className="cosmic-h1">Cosmic Headline</h1>
            <h2 className="cosmic-h2">Section Title</h2>
            <h3 className="cosmic-h3">Component Title</h3>
            <p className="cosmic-body">
              Regular body text for content. This is the standard text size used throughout the cosmic interface.
            </p>
            <p className="cosmic-small text-[var(--c-text-secondary)]">
              Small meta text for secondary information and timestamps.
            </p>
          </StarCard>
        </section>
      </main>
    </div>
  );
}