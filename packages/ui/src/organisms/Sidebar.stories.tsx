import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
} from './Sidebar';
import { Badge } from '../atoms/Badge';
import {
  Home,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  FolderOpen,
  FileText,
  Calendar,
  Bell,
  Search,
  Plus,
} from 'lucide-react';
import { LucideIconWrapper } from '../utils/lucide-wrapper';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Eine flexible Sidebar-Komponente für Navigation und App-Layout.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex h-screen bg-gray-50">
        <Story />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Hauptinhalt</h1>
          <p className="mt-4 text-gray-600">
            Die Sidebar kann kollabiert und auf mobilen Geräten als Overlay angezeigt werden.
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Sidebar
export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-semibold">VOAI</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem icon={<LucideIconWrapper icon={Home} />} active>
            Dashboard
          </SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={BarChart3} />}>Analytics</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Users} />}>
            Benutzer
            <Badge variant="secondary" className="ml-auto">
              23
            </Badge>
          </SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Settings} />}>Einstellungen</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarItem icon={<LucideIconWrapper icon={LogOut} />}>Abmelden</SidebarItem>
      </SidebarFooter>
    </Sidebar>
  ),
};

// With Groups
export const WithGroups: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-semibold">Workspace</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup title="Navigation">
          <SidebarItem icon={<LucideIconWrapper icon={Home} />} active>
            Übersicht
          </SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Search} />}>Suche</SidebarItem>
        </SidebarGroup>
        <SidebarGroup title="Workspace">
          <SidebarItem icon={<LucideIconWrapper icon={FolderOpen} />}>
            Projekte
            <Badge className="ml-auto">12</Badge>
          </SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={FileText} />}>Dokumente</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Calendar} />}>Kalender</SidebarItem>
        </SidebarGroup>
        <SidebarGroup title="System">
          <SidebarItem icon={<LucideIconWrapper icon={Bell} />}>
            Benachrichtigungen
            <Badge variant="destructive" className="ml-auto">
              3
            </Badge>
          </SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Settings} />}>Einstellungen</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={HelpCircle} />}>Hilfe</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};

// Collapsible
export const Collapsible: Story = {
  args: {
    collapsible: true,
    defaultCollapsed: false,
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <h2 className="text-xl font-semibold">App</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem icon={<LucideIconWrapper icon={Home} />} active>
            Home
          </SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={BarChart3} />}>Reports</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Users} />}>Team</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};

// Custom Actions
export const WithActions: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button className="ml-auto rounded p-1 hover:bg-accent">
            <LucideIconWrapper icon={Plus} className="h-4 w-4" />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="mb-4 px-2">
          <input
            type="search"
            placeholder="Suche..."
            className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
          />
        </div>
        <SidebarGroup title="Favoriten">
          <SidebarItem icon={<LucideIconWrapper icon={FolderOpen} />}>Website Redesign</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={FolderOpen} />}>Mobile App</SidebarItem>
        </SidebarGroup>
        <SidebarGroup title="Alle Projekte">
          <SidebarItem icon={<LucideIconWrapper icon={FolderOpen} />}>Backend API</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={FolderOpen} />}>Documentation</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={FolderOpen} />}>Testing Suite</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};

// Mobile Responsive
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-semibold">Mobile</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem icon={<LucideIconWrapper icon={Home} />} active>
            Dashboard
          </SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={BarChart3} />}>Analytics</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Users} />}>Users</SidebarItem>
          <SidebarItem icon={<LucideIconWrapper icon={Settings} />}>Settings</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};