import type { Meta, StoryObj } from "@storybook/react";
import { PortalGate } from "./PortalGate";
import { useState } from "react";

const meta = {
  title: "Organisms/PortalGate",
  component: PortalGate,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cosmic-guide-tokens",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PortalGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Open Modal
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          title="Welcome to the Cosmic Portal"
          description="This is a modal dialog demonstrating the PortalGate component"
        >
          <div className="space-y-4">
            <p className="text-[var(--c-text-secondary)]">
              PortalGate provides a flexible modal/drawer system with focus trapping,
              animations, and accessibility features built-in.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
              >
                Confirm
              </button>
            </div>
          </div>
        </PortalGate>
      </>
    );
  },
};

export const ModalSizes: Story = {
  render: () => {
    const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | "full" | null>(null);
    
    return (
      <>
        <div className="flex flex-wrap gap-2">
          {(["sm", "md", "lg", "xl", "full"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className="px-4 py-2 bg-[var(--c-surface)] rounded-[var(--radius-sm)] hover:bg-[var(--c-surface-hover)]"
            >
              Size: {s}
            </button>
          ))}
        </div>
        
        {size && (
          <PortalGate
            open={true}
            onClose={() => setSize(null)}
            title={`${size.toUpperCase()} Modal`}
            size={size}
          >
            <p className="text-[var(--c-text-secondary)]">
              This modal is using the "{size}" size variant.
            </p>
          </PortalGate>
        )}
      </>
    );
  },
};

export const DrawerLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Open Left Drawer
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          variant="drawer-left"
          title="Navigation Menu"
        >
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded hover:bg-[var(--c-surface)]">Home</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-[var(--c-surface)]">About</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-[var(--c-surface)]">Services</a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-[var(--c-surface)]">Contact</a>
          </nav>
        </PortalGate>
      </>
    );
  },
};

export const DrawerRight: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Open Right Drawer
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          variant="drawer-right"
          title="Settings"
          description="Customize your cosmic experience"
        >
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span>Dark Mode</span>
              <input type="checkbox" className="toggle" />
            </label>
            <label className="flex items-center justify-between">
              <span>Notifications</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span>Auto-save</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
          </div>
        </PortalGate>
      </>
    );
  },
};

export const DrawerBottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Open Bottom Drawer
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          variant="drawer-bottom"
          title="Cookie Preferences"
        >
          <div className="space-y-4">
            <p className="text-[var(--c-text-secondary)]">
              We use cookies to enhance your cosmic journey. Choose your preferences below.
            </p>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked disabled />
                <span>Essential Cookies (Required)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Analytics Cookies</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Marketing Cookies</span>
              </label>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]"
              >
                Reject All
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
              >
                Accept Selected
              </button>
            </div>
          </div>
        </PortalGate>
      </>
    );
  },
};

export const NoBackdropClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Open Modal (No Backdrop Close)
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          closeOnBackdrop={false}
          title="Important Action Required"
          description="This modal cannot be closed by clicking the backdrop"
        >
          <div className="space-y-4">
            <p className="text-[var(--c-text-secondary)]">
              You must explicitly click a button to close this modal.
              Clicking outside will not dismiss it.
            </p>
            
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
              >
                I Understand
              </button>
            </div>
          </div>
        </PortalGate>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Open Modal (No Close Button)
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          showCloseButton={false}
          title="Processing..."
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--c-accent)]"></div>
              <p className="text-[var(--c-text-secondary)]">
                Please wait while we process your request...
              </p>
            </div>
            
            <button
              onClick={() => setOpen(false)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-[var(--radius-sm)] hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </PortalGate>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Create New Item
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          title="Create New Cosmic Entity"
          size="lg"
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Entity Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-[var(--radius-sm)] focus:border-[var(--c-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-opacity-20"
                placeholder="Enter entity name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select className="w-full px-3 py-2 border rounded-[var(--radius-sm)] focus:border-[var(--c-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-opacity-20">
                <option>Star</option>
                <option>Planet</option>
                <option>Nebula</option>
                <option>Galaxy</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-[var(--radius-sm)] focus:border-[var(--c-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--c-accent)] focus:ring-opacity-20"
                rows={3}
                placeholder="Describe the cosmic entity..."
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
              >
                Create Entity
              </button>
            </div>
          </form>
        </PortalGate>
      </>
    );
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
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
        >
          Open Dark Mode Modal
        </button>
        
        <PortalGate
          open={open}
          onClose={() => setOpen(false)}
          title="Dark Mode Portal"
          description="Experience the cosmic portal in dark mode"
        >
          <p className="text-[var(--c-text-secondary)]">
            The PortalGate component automatically adapts to your theme settings,
            providing a seamless experience in both light and dark modes.
          </p>
        </PortalGate>
      </>
    );
  },
};