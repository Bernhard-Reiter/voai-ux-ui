'use client';

import { useUIComponents } from '@/components/UIProvider';
import { useEffect, useState } from 'react';

export default function ShowcasePage() {
  const components = useUIComponents();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !components) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading components...</div>
      </div>
    );
  }

  const { Button, Card, Input, CommandPalette } = components;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommandPalette
        items={[
          { id: '1', title: 'Home', description: 'Go to home page', action: () => window.location.href = '/' },
          { id: '2', title: 'Components', description: 'View all components', action: () => window.location.href = '#components' },
          { id: '3', title: 'Colors', description: 'See color palette', action: () => window.location.href = '#colors' },
          { id: '4', title: 'Typography', description: 'Typography examples', action: () => window.location.href = '#typography' },
        ]}
        placeholder="Search documentation..."
        emptyMessage="No results found."
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            VOAI Design System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A modern, Superhuman-inspired UI component library
          </p>
        </div>

        <section id="components" className="mb-20">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">
            Components
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Buttons</h3>
              <div className="space-y-3">
                <Button variant="primary" size="sm">Small Button</Button>
                <Button variant="secondary">Default Button</Button>
                <Button variant="ghost" size="lg">Large Button</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Inputs</h3>
              <div className="space-y-3">
                <Input placeholder="Enter your email..." />
                <Input placeholder="Password" type="password" />
                <Input placeholder="Search..." className="w-full" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Cards</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cards are versatile containers for grouping related content and actions.
              </p>
            </Card>
          </div>
        </section>

        <section id="colors" className="mb-20">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">
            Color Palette
          </h2>
          
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="space-y-2">
              <div className="h-20 bg-primary-500 rounded-lg"></div>
              <p className="text-sm font-medium">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-gray-900 dark:bg-gray-100 rounded-lg"></div>
              <p className="text-sm font-medium">Gray</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-red-500 rounded-lg"></div>
              <p className="text-sm font-medium">Error</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-green-500 rounded-lg"></div>
              <p className="text-sm font-medium">Success</p>
            </div>
          </div>
        </section>

        <section id="typography" className="mb-20">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">
            Typography
          </h2>
          
          <Card className="p-8 space-y-4">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <h3 className="text-2xl font-medium">Heading 3</h3>
            <p className="text-lg">
              Large paragraph text for important content that needs emphasis.
            </p>
            <p>
              Regular paragraph text for body content. This is the default text size used throughout the application.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Small text for secondary information and metadata.
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}