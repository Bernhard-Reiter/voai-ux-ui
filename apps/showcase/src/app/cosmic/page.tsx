'use client';

import { useUIComponents } from '@/components/UIProvider';
import { useState, useEffect } from 'react';

export default function CosmicShowcase() {
  const [activeNav, setActiveNav] = useState('home');
  const components = useUIComponents();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', active: activeNav === 'home' },
    { id: 'constellations', label: 'Constellations', active: activeNav === 'constellations' },
    { id: 'nebulae', label: 'Nebulae', active: activeNav === 'nebulae' },
    { id: 'waypoints', label: 'Waypoints', active: activeNav === 'waypoints' },
  ];

  if (!mounted || !components) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading cosmic experience...</div>
      </div>
    );
  }

  // Destructure components - handle both UI libraries
  const Button = components.WaypointBtn || components.Button;
  const Card = components.StarCard || components.Card;
  const CardHeader = components.StarCardHeader || null;
  const CardTitle = components.StarCardTitle || null;
  const CardDescription = components.StarCardDescription || null;
  const CardContent = components.StarCardContent || null;
  const Input = components.CometInput || components.Input;
  const Nav = components.OrbitNav || null;

  // Add cosmic classes for the cosmic variant
  const cosmicClasses = Boolean(components.WaypointBtn) ? 'cosmic-gradient nebula-effect portal-gate' : '';

  return (
    <div className={`min-h-screen bg-[var(--c-bg)] cosmic-fade ${cosmicClasses}`}>
      {Nav !== null && (
        <Nav 
          items={navItems}
          onItemClick={(item: { id: string }) => setActiveNav(item.id)}
        />
      )}
      
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
          <Card className="col-span-12 md:col-span-4" glow>
            {CardHeader !== null && CardTitle !== null && CardDescription !== null && CardContent !== null ? (
              <>
                <CardHeader>
                  <CardTitle>Launch CRM</CardTitle>
                  <CardDescription>
                    Start your cosmic journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-[var(--space-3)]">
                    Access your entire data universe with a single click. All your customer constellations await.
                  </p>
                  <Button variant="primary" className="w-full">
                    Launch Now
                  </Button>
                </CardContent>
              </>
            ) : (
              <div className="p-6">
                <h3 className="font-semibold mb-2">Launch CRM</h3>
                <p className="text-sm text-gray-600 mb-4">Start your cosmic journey</p>
                <p className="mb-4">
                  Access your entire data universe with a single click. All your customer constellations await.
                </p>
                <Button variant="primary" className="w-full">
                  Launch Now
                </Button>
              </div>
            )}
          </Card>

          <Card className="col-span-12 md:col-span-4">
            {CardHeader !== null && CardTitle !== null && CardDescription !== null && CardContent !== null ? (
              <>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Navigate with Waypoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="secondary" className="w-full" size="sm">
                      Add Contact
                    </Button>
                    <Button variant="ghost" className="w-full" size="sm">
                      View Reports
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="p-6">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <p className="text-sm text-gray-600 mb-4">Navigate with Waypoints</p>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full" size="sm">
                    Add Contact
                  </Button>
                  <Button variant="ghost" className="w-full" size="sm">
                    View Reports
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <Card className="col-span-12 md:col-span-4">
            {CardHeader !== null && CardTitle !== null && CardDescription !== null && CardContent !== null ? (
              <>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                  <CardDescription>
                    Join the cosmic network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-3">
                    <Input 
                      label="Email"
                      placeholder="your@email.com"
                      type="email"
                    />
                    <Button variant="primary" className="w-full" size="sm">
                      Subscribe
                    </Button>
                  </form>
                </CardContent>
              </>
            ) : (
              <div className="p-6">
                <h3 className="font-semibold mb-2">Connect</h3>
                <p className="text-sm text-gray-600 mb-4">Join the cosmic network</p>
                <form className="space-y-3">
                  <Input 
                    placeholder="your@email.com"
                    type="email"
                  />
                  <Button variant="primary" className="w-full" size="sm">
                    Subscribe
                  </Button>
                </form>
              </div>
            )}
          </Card>
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
          
          <Card className="space-y-[var(--space-3)]">
            {CardContent !== null ? (
              <CardContent>
                <h1 className="cosmic-h1">Cosmic Headline</h1>
                <h2 className="cosmic-h2">Section Title</h2>
                <h3 className="cosmic-h3">Component Title</h3>
                <p className="cosmic-body">
                  Regular body text for content. This is the standard text size used throughout the cosmic interface.
                </p>
                <p className="cosmic-small text-[var(--c-text-secondary)]">
                  Small meta text for secondary information and timestamps.
                </p>
              </CardContent>
            ) : (
              <div className="p-6 space-y-4">
                <h1 className="cosmic-h1">Cosmic Headline</h1>
                <h2 className="cosmic-h2">Section Title</h2>
                <h3 className="cosmic-h3">Component Title</h3>
                <p className="cosmic-body">
                  Regular body text for content. This is the standard text size used throughout the cosmic interface.
                </p>
                <p className="cosmic-small text-[var(--c-text-secondary)]">
                  Small meta text for secondary information and timestamps.
                </p>
              </div>
            )}
          </Card>
        </section>
      </main>
    </div>
  );
}