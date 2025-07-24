import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'
import { CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { LucideIconWrapper } from '../utils/lucide-wrapper'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine flexible Card-Komponente für die Darstellung von gruppierten Inhalten.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Basic Card
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. You can put any content here.</p>
      </CardContent>
    </Card>
  ),
}

// Card with Footer
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Benachrichtigungen</CardTitle>
        <CardDescription>Sie haben 3 neue Nachrichten</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">Ihre wöchentliche Zusammenfassung ist bereit.</p>
          <p className="text-sm text-muted-foreground">Letzte Aktualisierung vor 2 Stunden</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Später</Button>
        <Button>Anzeigen</Button>
      </CardFooter>
    </Card>
  ),
}

// Interactive Card
export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Projekt Status</CardTitle>
          <Badge variant="success">Aktiv</Badge>
        </div>
        <CardDescription>Klicken Sie für Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LucideIconWrapper icon={CheckCircle} className="h-4 w-4 text-green-500" />
            <span className="text-sm">5 Tasks abgeschlossen</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideIconWrapper icon={Clock} className="h-4 w-4 text-orange-500" />
            <span className="text-sm">3 Tasks ausstehend</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

// Stats Card
export const StatsCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
        <LucideIconWrapper icon={TrendingUp} className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">€45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% gegenüber letztem Monat</p>
      </CardContent>
    </Card>
  ),
}

// Feature Card
export const FeatureCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <LucideIconWrapper icon={TrendingUp} className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4">Analytics Dashboard</CardTitle>
        <CardDescription>Behalten Sie Ihre wichtigsten Metriken im Blick</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Echtzeit-Datenvisualisierung</li>
          <li>• Anpassbare Berichte</li>
          <li>• Export in verschiedene Formate</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mehr erfahren</Button>
      </CardFooter>
    </Card>
  ),
}

// Card Grid
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
            <CardDescription>Description for card {i}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for card {i}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
