import type { Meta, StoryObj } from "@storybook/react";
import { NebulaGrid, type NebulaColumn } from "./NebulaGrid";
import { useState } from "react";

const meta = {
  title: "Organisms/NebulaGrid",
  component: NebulaGrid,
  parameters: {
    layout: "padded",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/cosmic-guide-tokens",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NebulaGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastActive: string;
}

const sampleData: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@cosmic.space`,
  role: ["Admin", "Editor", "Viewer"][i % 3],
  status: ["active", "inactive", "pending"][i % 3] as User["status"],
  joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
}));

const columns: NebulaColumn<User>[] = [
  {
    key: "id",
    header: "ID",
    width: 60,
  },
  {
    key: "name",
    header: "Name",
    width: 150,
  },
  {
    key: "email",
    header: "Email",
    width: 200,
  },
  {
    key: "role",
    header: "Role",
    width: 100,
  },
  {
    key: "status",
    header: "Status",
    width: 100,
    render: (value) => {
      const statusColors = {
        active: "text-green-600 bg-green-50",
        inactive: "text-gray-600 bg-gray-50",
        pending: "text-amber-600 bg-amber-50",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
          {value}
        </span>
      );
    },
  },
  {
    key: "joinDate",
    header: "Join Date",
    width: 120,
  },
  {
    key: "lastActive",
    header: "Last Active",
    width: 120,
  },
];

export const Default: Story = {
  args: {
    data: sampleData.slice(0, 10),
    columns: columns,
  },
};

export const VirtualizedLargeDataset: Story = {
  args: {
    data: sampleData,
    columns: columns,
    virtualize: true,
  },
};

export const NonVirtualized: Story = {
  args: {
    data: sampleData.slice(0, 20),
    columns: columns,
    virtualize: false,
  },
};

export const DensityOptions: Story = {
  render: () => {
    const [density, setDensity] = useState<"compact" | "normal" | "spacious">("normal");
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setDensity("compact")}
            className={`px-3 py-1 rounded ${density === "compact" ? "bg-[var(--c-accent)] text-white" : "bg-gray-100"}`}
          >
            Compact
          </button>
          <button
            onClick={() => setDensity("normal")}
            className={`px-3 py-1 rounded ${density === "normal" ? "bg-[var(--c-accent)] text-white" : "bg-gray-100"}`}
          >
            Normal
          </button>
          <button
            onClick={() => setDensity("spacious")}
            className={`px-3 py-1 rounded ${density === "spacious" ? "bg-[var(--c-accent)] text-white" : "bg-gray-100"}`}
          >
            Spacious
          </button>
        </div>
        
        <NebulaGrid
          data={sampleData.slice(0, 10)}
          columns={columns}
          density={density}
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-[var(--c-text-secondary)]">
          Selected: {selectedRows.size} rows
        </div>
        
        <NebulaGrid
          data={sampleData.slice(0, 10)}
          columns={columns}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    );
  },
};

export const CustomCellRenderers: Story = {
  args: {
    data: [
      { id: 1, product: "Cosmic UI Kit", price: 99.99, stock: 45, category: "Design" },
      { id: 2, product: "Nebula Components", price: 149.99, stock: 12, category: "Development" },
      { id: 3, product: "Starfield Icons", price: 29.99, stock: 0, category: "Design" },
      { id: 4, product: "Galaxy Templates", price: 199.99, stock: 8, category: "Templates" },
    ],
    columns: [
      {
        key: "id",
        header: "ID",
        width: 60,
      },
      {
        key: "product",
        header: "Product",
        width: 200,
        render: (value) => (
          <span className="font-medium text-[var(--c-accent)]">{value}</span>
        ),
      },
      {
        key: "price",
        header: "Price",
        width: 100,
        render: (value) => (
          <span className="font-mono">${(value as number).toFixed(2)}</span>
        ),
      },
      {
        key: "stock",
        header: "Stock",
        width: 100,
        render: (value) => {
          const stock = value as number;
          return (
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stock > 10 ? "bg-green-500" : stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
              <span className={stock === 0 ? "text-red-600" : ""}>{stock}</span>
            </div>
          );
        },
      },
      {
        key: "category",
        header: "Category",
        width: 120,
      },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: columns,
    emptyMessage: "No cosmic data found in this nebula",
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
    data: sampleData.slice(0, 10),
    columns: columns,
  },
};

export const LoadingState: Story = {
  render: () => {
    const loadingData = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: "...",
      email: "...",
      role: "...",
      status: "pending" as const,
      joinDate: "...",
      lastActive: "...",
    }));
    
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-[var(--c-text-secondary)]">Loading cosmic data...</div>
        </div>
        <NebulaGrid
          data={loadingData}
          columns={columns}
          className="opacity-50"
        />
      </div>
    );
  },
};