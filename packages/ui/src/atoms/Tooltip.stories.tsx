import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import { Button } from './Button';
import { Badge } from './Badge';
import { HelpCircle, Info, Settings, User } from 'lucide-react';
import { LucideIconWrapper } from '../utils/lucide-wrapper';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ein Tooltip-Component zur Anzeige von Hilfstexten und zusätzlichen Informationen.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex min-h-[200px] items-center justify-center">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Tooltip
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dies ist ein Tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// With Icon
export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
          <LucideIconWrapper icon={HelpCircle} className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Klicken Sie hier für weitere Informationen</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// Different Positions
export const Positions: Story = {
  render: () => (
    <div className="flex gap-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Oben</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip oben</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Rechts</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip rechts</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Unten</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip unten</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Links</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip links</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

// Rich Content
export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <LucideIconWrapper icon={Info} className="mr-2 h-4 w-4" />
          Erweiterte Info
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <p className="font-semibold">Erweiterte Informationen</p>
          <p className="text-sm">
            Dies ist ein längerer Tooltip mit mehreren Zeilen Text und zusätzlichen Details.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">Tag 1</Badge>
            <Badge variant="secondary">Tag 2</Badge>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

// Delayed Tooltip
export const Delayed: Story = {
  render: () => (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button variant="outline">Verzögerter Tooltip (1s)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dieser Tooltip erscheint nach 1 Sekunde</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// Icon Bar Example
export const IconBar: Story = {
  render: () => (
    <div className="flex gap-2 rounded-lg border p-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <LucideIconWrapper icon={User} className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Profil</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <LucideIconWrapper icon={Settings} className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Einstellungen</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <LucideIconWrapper icon={HelpCircle} className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hilfe & Support</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

// Form Field Helper
export const FormHelper: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="username" className="text-sm font-medium">
            Benutzername
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <LucideIconWrapper icon={HelpCircle} className="h-3 w-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Mindestens 3 Zeichen, nur Buchstaben und Zahlen</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <input
          id="username"
          type="text"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Ihr Benutzername"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Passwort
          </label>
          <Tooltip>
            <TooltipTrigger asChild>
              <LucideIconWrapper icon={HelpCircle} className="h-3 w-3 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-1">
                <p className="font-semibold">Passwort-Anforderungen:</p>
                <ul className="text-sm space-y-1">
                  <li>• Mindestens 8 Zeichen</li>
                  <li>• Ein Großbuchstabe</li>
                  <li>• Eine Zahl</li>
                  <li>• Ein Sonderzeichen</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <input
          id="password"
          type="password"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Ihr Passwort"
        />
      </div>
    </div>
  ),
};