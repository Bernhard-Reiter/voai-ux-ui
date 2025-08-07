import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle, ThemeProvider } from "./theme";

const meta: Meta<typeof ThemeToggle> = {
  title: "Utils/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cosmic-guide-tokens",
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const StyledButton: Story = {
  args: {
    className: "p-2 rounded-[var(--radius-sm)] bg-[var(--c-surface)] hover:bg-[var(--c-surface-hover)] transition-colors",
  },
};

export const WithCustomSize: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <p className="text-sm text-[var(--c-text-secondary)] mb-2">Small</p>
        <ThemeToggle className="p-1 [&_svg]:w-4 [&_svg]:h-4" />
      </div>
      <div className="text-center">
        <p className="text-sm text-[var(--c-text-secondary)] mb-2">Default</p>
        <ThemeToggle className="p-2" />
      </div>
      <div className="text-center">
        <p className="text-sm text-[var(--c-text-secondary)] mb-2">Large</p>
        <ThemeToggle className="p-3 [&_svg]:w-6 [&_svg]:h-6" />
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="w-full max-w-md p-6 bg-[var(--c-bg)] border border-[var(--c-border)] rounded-[var(--radius-md)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="cosmic-title">Settings</h2>
        <ThemeToggle className="p-2 rounded-[var(--radius-sm)] bg-[var(--c-surface)] hover:bg-[var(--c-surface-hover)] transition-colors" />
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-[var(--c-surface)] rounded-[var(--radius-sm)]">
          <h3 className="font-medium mb-2">Theme Preference</h3>
          <p className="text-sm text-[var(--c-text-secondary)]">
            Toggle between light, dark, and system themes. Your preference will be saved locally.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-white text-gray-900 rounded-[var(--radius-sm)] border">
            <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="4" />
              <path d="M10 1v2M10 17v2M19 10h-2M3 10H1M16.36 16.36l-1.42-1.42M5.06 5.06L3.64 3.64M16.36 3.64l-1.42 1.42M5.06 14.94l-1.42 1.42" />
            </svg>
            <p className="text-xs">Light</p>
          </div>
          <div className="p-3 bg-gray-900 text-white rounded-[var(--radius-sm)] border border-gray-700">
            <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
              <path d="M17.5 10.5A7.5 7.5 0 1 1 9.5 2.5a7.5 7.5 0 0 0 8 8z" />
            </svg>
            <p className="text-xs">Dark</p>
          </div>
          <div className="p-3 bg-[var(--c-surface)] rounded-[var(--radius-sm)] border border-[var(--c-border)]">
            <svg className="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
              <rect x="3" y="3" width="14" height="14" rx="2" />
              <path d="M7 7h6M7 10h6M7 13h2" />
            </svg>
            <p className="text-xs">System</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const NavigationBar: Story = {
  render: () => (
    <nav className="w-full px-6 py-4 bg-[var(--c-surface)] border-b border-[var(--c-border)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-[var(--c-accent)]">Cosmic UI</h1>
          <div className="flex gap-4">
            <a href="#" className="text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]">Components</a>
            <a href="#" className="text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]">Documentation</a>
            <a href="#" className="text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]">Examples</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle className="p-2 rounded-[var(--radius-sm)] hover:bg-[var(--c-bg)] transition-colors" />
          <button className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  ),
};

export const AccessibleWithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-[var(--c-surface)] rounded-[var(--radius-md)]">
      <label htmlFor="theme-toggle" className="text-sm font-medium">
        Theme:
      </label>
      <div id="theme-toggle">
        <ThemeToggle className="p-2 rounded-[var(--radius-sm)] bg-[var(--c-bg)] hover:bg-[var(--c-surface-hover)] transition-colors" />
      </div>
    </div>
  ),
};