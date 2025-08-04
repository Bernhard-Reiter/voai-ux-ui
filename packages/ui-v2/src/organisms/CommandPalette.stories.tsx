import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette } from "./CommandPalette";
import { useState } from "react";

const meta = {
  title: "Organisms/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cosmic-guide-tokens",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: "new-file",
    title: "New File",
    description: "Create a new file in the current directory",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    action: () => alert("New file created"),
    keywords: ["create", "add"],
  },
  {
    id: "open-file",
    title: "Open File",
    description: "Open an existing file",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    action: () => alert("Opening file..."),
    keywords: ["browse", "find"],
  },
  {
    id: "save",
    title: "Save",
    description: "Save the current file",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
      </svg>
    ),
    action: () => alert("File saved"),
    keywords: ["export"],
  },
  {
    id: "search",
    title: "Search",
    description: "Search across all files",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    action: () => alert("Opening search..."),
    keywords: ["find", "locate"],
  },
  {
    id: "settings",
    title: "Settings",
    description: "Open application settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    action: () => alert("Opening settings..."),
    keywords: ["preferences", "config"],
  },
];

const InteractiveDemoComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState("");

  const items = defaultItems.map(item => ({
    ...item,
    action: () => {
      setLastAction(`Executed: ${item.title}`);
      setIsOpen(false);
    },
  }));

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
      >
        Open Command Palette
      </button>
      
      <p className="text-sm text-[var(--c-text-secondary)]">
        Or press <kbd className="px-2 py-1 text-xs bg-gray-100 rounded">⌘K</kbd> / <kbd className="px-2 py-1 text-xs bg-gray-100 rounded">Ctrl+K</kbd>
      </p>

      {lastAction && (
        <p className="text-sm text-green-600 mt-4">{lastAction}</p>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-0 top-[20vh] z-50 mx-auto max-w-2xl px-4">
            <CommandPalette items={items} />
          </div>
        </div>
      )}
    </div>
  );
};

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
};

const WithCategoriesComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categorizedItems = [
    {
      id: "goto-home",
      title: "Go to Home",
      description: "Navigate to home page",
      icon: "→",
      action: () => alert("Navigating to home..."),
      keywords: ["navigate", "home"],
    },
    {
      id: "goto-profile",
      title: "Go to Profile",
      description: "Navigate to your profile",
      icon: "→",
      action: () => alert("Navigating to profile..."),
      keywords: ["navigate", "profile", "account"],
    },
    {
      id: "toggle-theme",
      title: "Toggle Theme",
      description: "Switch between light and dark mode",
      icon: "🎨",
      action: () => alert("Toggling theme..."),
      keywords: ["theme", "dark", "light", "mode"],
    },
    {
      id: "toggle-sidebar",
      title: "Toggle Sidebar",
      description: "Show or hide the sidebar",
      icon: "📱",
      action: () => alert("Toggling sidebar..."),
      keywords: ["sidebar", "layout", "view"],
    },
    {
      id: "help-docs",
      title: "Documentation",
      description: "Open the documentation",
      icon: "📚",
      action: () => alert("Opening docs..."),
      keywords: ["help", "docs", "guide"],
    },
    {
      id: "help-support",
      title: "Contact Support",
      description: "Get help from our support team",
      icon: "💬",
      action: () => alert("Opening support..."),
      keywords: ["help", "support", "contact"],
    },
  ];

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
      >
        Open Command Palette
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-0 top-[20vh] z-50 mx-auto max-w-2xl px-4">
            <CommandPalette
              items={categorizedItems}
              placeholder="Search for commands, navigation, or help..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const WithCategories: Story = {
  render: () => <WithCategoriesComponent />,
};

const EmptyStateComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[var(--c-accent)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--c-accent-hover)]"
      >
        Open Empty Command Palette
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-0 top-[20vh] z-50 mx-auto max-w-2xl px-4">
            <CommandPalette
              items={[]}
              emptyMessage="No commands available. Try adding some!"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const EmptyState: Story = {
  render: () => <EmptyStateComponent />,
};

const CustomStylingComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const customItems = [
    {
      id: "cosmic-jump",
      title: "Cosmic Jump",
      description: "Teleport to another dimension",
      icon: "🚀",
      action: () => alert("Jumping through cosmos..."),
      keywords: ["space", "teleport"],
    },
    {
      id: "nebula-scan",
      title: "Nebula Scan",
      description: "Scan nearby nebulas for resources",
      icon: "🌌",
      action: () => alert("Scanning nebulas..."),
      keywords: ["scan", "resources"],
    },
    {
      id: "star-chart",
      title: "Star Chart",
      description: "View the cosmic star chart",
      icon: "⭐",
      action: () => alert("Opening star chart..."),
      keywords: ["map", "navigation"],
    },
  ];

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-[var(--radius-sm)] hover:from-purple-600 hover:to-indigo-700"
      >
        Launch Cosmic Command Center
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-0 top-[20vh] z-50 mx-auto max-w-2xl px-4">
            <CommandPalette
              items={customItems}
              placeholder="Enter cosmic command..."
              className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const CustomStyling: Story = {
  render: () => <CustomStylingComponent />,
};

// Note: This story demonstrates the command palette but won't show in the static Storybook view
export const KeyboardShortcut: Story = {
  render: () => (
    <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <p className="text-lg font-medium">Press the keyboard shortcut to open</p>
        <p className="text-3xl">
          <kbd className="px-3 py-2 text-lg bg-gray-100 rounded">⌘K</kbd> or <kbd className="px-3 py-2 text-lg bg-gray-100 rounded">Ctrl+K</kbd>
        </p>
      </div>
      <p className="text-sm text-[var(--c-text-secondary)] max-w-md">
        The CommandPalette component automatically registers this keyboard shortcut when mounted.
        This is a demonstration of the built-in keyboard shortcut functionality.
      </p>
    </div>
  ),
  args: {
    items: defaultItems,
  },
};