import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { User, CreditCard, Settings, Bell } from 'lucide-react';
import { LucideIconWrapper } from '../utils/lucide-wrapper';

const meta: Meta<typeof Tabs> = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine Tab-Komponente zur Organisation von Inhalten in verschiedenen Ansichten.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>
          <CardHeader>
            <CardTitle>Tab 1 Inhalt</CardTitle>
            <CardDescription>Dies ist der Inhalt von Tab 1.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Hier können Sie beliebige Inhalte einfügen.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>
          <CardHeader>
            <CardTitle>Tab 2 Inhalt</CardTitle>
            <CardDescription>Dies ist der Inhalt von Tab 2.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Verschiedene Tabs können unterschiedliche Inhalte anzeigen.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card>
          <CardHeader>
            <CardTitle>Tab 3 Inhalt</CardTitle>
            <CardDescription>Dies ist der Inhalt von Tab 3.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Die Navigation zwischen Tabs ist nahtlos.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Account Settings Example
export const AccountSettings: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">
          <LucideIconWrapper icon={User} className="mr-2 h-4 w-4" />
          Profil
        </TabsTrigger>
        <TabsTrigger value="billing">
          <LucideIconWrapper icon={CreditCard} className="mr-2 h-4 w-4" />
          Abrechnung
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <LucideIconWrapper icon={Bell} className="mr-2 h-4 w-4" />
          Benachrichtigungen
        </TabsTrigger>
        <TabsTrigger value="security">
          <LucideIconWrapper icon={Settings} className="mr-2 h-4 w-4" />
          Sicherheit
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>
              Verwalten Sie Ihre persönlichen Informationen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                defaultValue="Max Mustermann"
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">E-Mail</label>
              <input
                type="email"
                defaultValue="max@beispiel.de"
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
            <Button>Änderungen speichern</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="billing">
        <Card>
          <CardHeader>
            <CardTitle>Abrechnung</CardTitle>
            <CardDescription>
              Verwalten Sie Ihre Zahlungsmethoden und Abonnements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Aktueller Plan</p>
                  <p className="text-sm text-muted-foreground">Professional</p>
                </div>
                <Badge>Aktiv</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nächste Zahlung</p>
                  <p className="text-sm text-muted-foreground">€29.99 am 15. Februar 2024</p>
                </div>
                <Button variant="outline" size="sm">Ändern</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Benachrichtigungen</CardTitle>
            <CardDescription>
              Konfigurieren Sie, wie Sie benachrichtigt werden möchten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">E-Mail-Benachrichtigungen</p>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Updates per E-Mail
                  </p>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push-Benachrichtigungen</p>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Push-Benachrichtigungen
                  </p>
                </div>
                <input type="checkbox" className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Sicherheit</CardTitle>
            <CardDescription>
              Verwalten Sie Ihre Sicherheitseinstellungen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">Passwort ändern</Button>
              <Button variant="outline" className="w-full">Zwei-Faktor-Authentifizierung</Button>
              <Button variant="outline" className="w-full">Aktive Sitzungen</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Vertical Tabs
export const VerticalTabs: Story = {
  render: () => (
    <div className="flex gap-8">
      <Tabs defaultValue="overview" className="flex gap-8">
        <TabsList className="flex h-auto flex-col">
          <TabsTrigger value="overview" className="w-full justify-start">
            Übersicht
          </TabsTrigger>
          <TabsTrigger value="analytics" className="w-full justify-start">
            Analysen
          </TabsTrigger>
          <TabsTrigger value="reports" className="w-full justify-start">
            Berichte
          </TabsTrigger>
          <TabsTrigger value="settings" className="w-full justify-start">
            Einstellungen
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1">
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Übersicht</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Dashboard-Übersicht mit wichtigen Metriken.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analysen</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detaillierte Analysedaten und Visualisierungen.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Berichte</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Generierte Berichte und Exporte.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Einstellungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Konfigurationsoptionen für das Dashboard.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
};

// Controlled Tabs
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setValue("tab1")}
          >
            Gehe zu Tab 1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setValue("tab2")}
          >
            Gehe zu Tab 2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setValue("tab3")}
          >
            Gehe zu Tab 3
          </Button>
        </div>
        
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardContent className="pt-6">
                <p>Aktueller Tab: {value}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardContent className="pt-6">
                <p>Aktueller Tab: {value}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardContent className="pt-6">
                <p>Aktueller Tab: {value}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};