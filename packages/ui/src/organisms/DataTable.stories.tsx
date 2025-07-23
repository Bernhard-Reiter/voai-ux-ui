import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, DataTableColumnHeader } from './DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

// Sample data type
type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  date: string;
};

// Sample data
const payments: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
    date: '2024-01-15',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'pending',
    email: 'Abe45@gmail.com',
    date: '2024-01-14',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
    date: '2024-01-13',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
    date: '2024-01-12',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
    date: '2024-01-11',
  },
  // Add more sample data
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `id${i + 6}`,
    amount: Math.floor(Math.random() * 1000),
    status: ['pending', 'processing', 'success', 'failed'][
      Math.floor(Math.random() * 4)
    ] as Payment['status'],
    email: `user${i + 6}@example.com`,
    date: new Date(2024, 0, 10 - i).toISOString().split('T')[0],
  })),
];

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Eine leistungsstarke Tabellen-Komponente mit Sortierung, Filterung und Pagination.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic columns
const basicColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: 'E-Mail',
  },
  {
    accessorKey: 'amount',
    header: 'Betrag',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant = {
        pending: 'warning',
        processing: 'info',
        success: 'success',
        failed: 'destructive',
      }[status] as any;
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Datum',
  },
];

// Advanced columns with sorting and actions
const advancedColumns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Transaktions-ID',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-Mail" />
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Betrag" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant = {
        pending: 'warning',
        processing: 'info',
        success: 'success',
        failed: 'destructive',
      }[status] as any;
      const label = {
        pending: 'Ausstehend',
        processing: 'In Bearbeitung',
        success: 'Erfolgreich',
        failed: 'Fehlgeschlagen',
      }[status];
      return <Badge variant={variant}>{label}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Datum" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return new Intl.DateTimeFormat('de-DE').format(date);
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    },
  },
];

// Basic Table
export const Default: Story = {
  args: {
    columns: basicColumns,
    data: payments,
  },
};

// Advanced Table with all features
export const Advanced: Story = {
  args: {
    columns: advancedColumns,
    data: payments,
  },
};

// Empty State
export const EmptyState: Story = {
  args: {
    columns: basicColumns,
    data: [],
  },
};

// Large Dataset
export const LargeDataset: Story = {
  args: {
    columns: basicColumns,
    data: Array.from({ length: 100 }, (_, i) => ({
      id: `id${i}`,
      amount: Math.floor(Math.random() * 1000),
      status: ['pending', 'processing', 'success', 'failed'][
        Math.floor(Math.random() * 4)
      ] as Payment['status'],
      email: `user${i}@example.com`,
      date: new Date(2024, 0, 30 - (i % 30)).toISOString().split('T')[0],
    })),
    pageSize: 20,
  },
};

// Custom Page Size
export const CustomPageSize: Story = {
  args: {
    columns: basicColumns,
    data: payments,
    pageSize: 5,
  },
};

// With Toolbar Example
export const WithToolbar: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="E-Mail filtern..."
              className="h-8 w-[250px] rounded-md border border-input bg-background px-3 py-1 text-sm"
            />
            <select className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm">
              <option value="">Alle Status</option>
              <option value="pending">Ausstehend</option>
              <option value="processing">In Bearbeitung</option>
              <option value="success">Erfolgreich</option>
              <option value="failed">Fehlgeschlagen</option>
            </select>
          </div>
          <Button>Export</Button>
        </div>
        <DataTable columns={advancedColumns} data={payments} />
      </div>
    );
  },
};