import type { Meta, StoryObj } from "@storybook/react";
import { OrbitNav } from "./OrbitNav";

const meta = {
  title: "Organisms/OrbitNav",
  component: OrbitNav,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cosmic-guide-tokens",
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OrbitNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "components", label: "Components", href: "/components" },
  { id: "docs", label: "Documentation", href: "/docs" },
  { id: "examples", label: "Examples", href: "/examples" },
  { id: "about", label: "About", href: "/about" },
];

export const Default: Story = {
  args: {
    items: defaultItems.map(item => item.id === "components" ? { ...item, active: true } : item),
  },
};

export const Horizontal: Story = {
  args: {
    items: defaultItems.map(item => item.id === "home" ? { ...item, active: true } : item),
  },
};

export const Vertical: Story = {
  args: {
    items: defaultItems.map(item => item.id === "docs" ? { ...item, active: true } : item),
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        ),
      },
      {
        id: "team",
        label: "Team",
        href: "/team",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
    ].map(item => item.id === "dashboard" ? { ...item, active: true } : item),
  },
};

export const NavigationBar: Story = {
  decorators: [
    (Story) => (
      <nav className="w-full bg-[var(--c-surface)] border-b border-[var(--c-border)] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-[var(--c-text-primary)]">Circula UI</h1>
            <Story />
          </div>
          <button className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]">
            Sign In
          </button>
        </div>
      </nav>
    ),
  ],
  args: {
    items: defaultItems.map(item => item.id === "components" ? { ...item, active: true } : item),
  },
};

export const Sidebar: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-[600px]">
        <aside className="w-64 bg-[var(--c-surface)] border-r border-[var(--c-border)] p-4">
          <h2 className="text-[var(--c-text-secondary)] font-medium mb-4 px-3">Navigation</h2>
          <Story />
        </aside>
        <main className="flex-1 p-8">
          <h1 className="text-[var(--c-text-primary)] font-semibold mb-4">Main Content</h1>
          <p className="text-[var(--c-text-secondary)]">
            Select a navigation item from the sidebar to see the OrbitNav component in action.
          </p>
        </main>
      </div>
    ),
  ],
  args: {
    items: [
      { id: "overview", label: "Overview", href: "#overview" },
      { id: "getting-started", label: "Getting Started", href: "#getting-started" },
      { id: "components", label: "Components", href: "#components" },
      { id: "customization", label: "Customization", href: "#customization" },
      { id: "api-reference", label: "API Reference", href: "#api-reference" },
      { id: "examples", label: "Examples", href: "#examples" },
      { id: "troubleshooting", label: "Troubleshooting", href: "#troubleshooting" },
    ].map(item => item.id === "components" ? { ...item, active: true } : item),
  },
};

export const WithCustomStyling: Story = {
  args: {
    items: defaultItems.map(item => item.id === "examples" ? { ...item, active: true } : item),
    className: "bg-gradient-to-r from-purple-50 to-indigo-50 p-2 rounded-lg",
  },
};

export const MobileResponsive: Story = {
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-[var(--c-surface)] rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-[var(--c-border)]">
            <h3 className="font-semibold">Mobile Navigation</h3>
          </div>
          <div className="p-4">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  args: {
    items: defaultItems.slice(0, 3).map(item => item.id === "home" ? { ...item, active: true } : item),
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-gray-900 rounded">
        <Story />
      </div>
    ),
  ],
  args: {
    items: defaultItems.map(item => item.id === "docs" ? { ...item, active: true } : item),
  },
};