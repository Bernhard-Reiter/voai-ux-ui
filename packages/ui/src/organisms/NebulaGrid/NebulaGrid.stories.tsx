import type { Meta, StoryObj } from "@storybook/react";
import { NebulaGrid, type NebulaGridColumn } from "./NebulaGrid";
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

const columns: NebulaGridColumn<User>[] = [
  {
    id: "id",
    header: "ID",
    accessor: (row) => row.id,
    width: 60,
  },
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    width: 150,
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email,
    width: 200,
  },
  {
    id: "role",
    header: "Role",
    accessor: (row) => row.role,
    width: 100,
  },
  {
    id: "status",
    header: "Status",
    accessor: (row) => {
      const statusColors = {
        active: "text-green-600 bg-green-50",
        inactive: "text-gray-600 bg-gray-50",
        pending: "text-amber-600 bg-amber-50",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
          {row.status}
        </span>
      );
    },
    width: 100,
  },
  {
    id: "joinDate",
    header: "Join Date",
    accessor: (row) => row.joinDate,
    width: 120,
  },
  {
    id: "lastActive",
    header: "Last Active",
    accessor: (row) => row.lastActive,
    width: 120,
  },
];

export const Default: Story = {
  args: {
    data: sampleData.slice(0, 10),
    columns: columns as any,
  },
};

export const VirtualizedLargeDataset: Story = {
  args: {
    data: sampleData,
    columns: columns as any,
    virtualize: true,
  },
};

export const NonVirtualized: Story = {
  args: {
    data: sampleData.slice(0, 20),
    columns: columns as any,
    virtualize: false,
  },
};

const DensityOptionsComponent = () => {
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
};

export const DensityOptions: Story = {
  args: {
    data: [],
    columns: [],
  },
  render: DensityOptionsComponent,
};

const WithSelectionComponent = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | undefined>();
  
  return (
      <div className="space-y-4">
        <div className="text-sm text-[var(--c-text-secondary)]">
          Selected row: {selectedRowIndex !== undefined ? selectedRowIndex + 1 : 'none'}
        </div>
        
        <NebulaGrid
          data={sampleData.slice(0, 10)}
          columns={columns}
          selectedRowIndex={selectedRowIndex}
          onRowClick={(row, index) => setSelectedRowIndex(index)}
        />
      </div>
    );
};

export const WithSelection: Story = {
  args: {
    data: [],
    columns: [],
  },
  render: WithSelectionComponent,
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
        id: "id",
        header: "ID",
        accessor: (row: any) => row.id,
        width: 60,
      },
      {
        id: "product",
        header: "Product",
        accessor: (row: any) => (
          <span className="font-medium text-[var(--c-accent)]">{row.product}</span>
        ),
        width: 200,
      },
      {
        id: "price",
        header: "Price",
        accessor: (row: any) => (
          <span className="font-mono">${row.price.toFixed(2)}</span>
        ),
        width: 100,
      },
      {
        id: "stock",
        header: "Stock",
        accessor: (row: any) => {
          const stock = row.stock;
          return (
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stock > 10 ? "bg-green-500" : stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
              <span className={stock === 0 ? "text-red-600" : ""}>{stock}</span>
            </div>
          );
        },
        width: 100,
      },
      {
        id: "category",
        header: "Category",
        accessor: (row: any) => row.category,
        width: 120,
      },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: columns as any,
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
    columns: columns as any,
  },
};

const LoadingStateComponent = () => {
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
};

export const LoadingState: Story = {
  args: {
    data: [],
    columns: [],
  },
  render: LoadingStateComponent,
};