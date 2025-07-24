'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
} from '../organisms/Sidebar'
import { Button } from '../components/button'
import { LucideIconWrapper } from '../utils/lucide-wrapper'
import {
  Menu,
  Search,
  Bell,
  User,
  Home,
  Settings,
  LogOut,
  FileText,
  BarChart,
  Users,
  HelpCircle,
} from 'lucide-react'

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

/**
 * DashboardShell component provides a consistent layout structure for dashboard pages.
 * It includes a responsive sidebar navigation and a header with common actions.
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'Workflows', href: '/workflows' },
    { icon: BarChart, label: 'Analytics', href: '/analytics' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  const bottomItems = [
    { icon: HelpCircle, label: 'Help & Support', href: '/support' },
    { icon: LogOut, label: 'Logout', href: '/logout' },
  ]

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar className="h-full">
          <SidebarHeader>
            <h2 className="text-lg font-semibold px-4">VOAI Enterprise</h2>
          </SidebarHeader>
          <SidebarContent>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                active={pathname === item.href}
                onClick={() => router.push(item.href)}
              >
                <LucideIconWrapper icon={item.icon} className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </SidebarItem>
            ))}
          </SidebarContent>
          <SidebarFooter>
            {bottomItems.map((item) => (
              <SidebarItem key={item.href} onClick={() => router.push(item.href)}>
                <LucideIconWrapper icon={item.icon} className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </SidebarItem>
            ))}
          </SidebarFooter>
        </Sidebar>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <LucideIconWrapper icon={Menu} className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>

            {/* Search */}
            <div className="flex-1 flex items-center gap-4">
              <div className="relative max-w-md w-full">
                <LucideIconWrapper
                  icon={Search}
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <LucideIconWrapper icon={Bell} className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <LucideIconWrapper icon={User} className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
