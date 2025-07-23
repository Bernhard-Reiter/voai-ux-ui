import * as React from "react"
import { cn } from "../utils"
import { Button } from "../atoms/Button"
import { ChevronLeft, Menu, X } from "lucide-react"
import { LucideIconWrapper } from "../utils/lucide-wrapper"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  mobile: boolean
  setMobile: (mobile: boolean) => void
}>({
  collapsed: false,
  setCollapsed: () => {},
  mobile: false,
  setMobile: () => {},
})

export function Sidebar({
  className,
  collapsible = true,
  defaultCollapsed = false,
  onCollapsedChange,
  children,
  ...props
}: SidebarProps) {
  const [collapsed, setCollapsedState] = React.useState(defaultCollapsed)
  const [mobile, setMobile] = React.useState(false)

  const setCollapsed = React.useCallback(
    (value: boolean) => {
      setCollapsedState(value)
      onCollapsedChange?.(value)
    },
    [onCollapsedChange]
  )

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobile, setMobile }}>
      <aside
        className={cn(
          "relative flex h-full flex-col border-r bg-background transition-all duration-300",
          collapsed && !mobile && "w-16",
          !collapsed && !mobile && "w-64",
          mobile && "fixed inset-y-0 left-0 z-50 w-64",
          className
        )}
        {...props}
      >
        {children}
        {mobile && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobile(false)}
          />
        )}
      </aside>
    </SidebarContext.Provider>
  )
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  const { collapsed, setCollapsed, mobile, setMobile } = React.useContext(SidebarContext)

  return (
    <div
      className={cn(
        "flex h-16 items-center justify-between border-b px-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <LucideIconWrapper icon={X} className="h-4 w-4" /> : <LucideIconWrapper icon={Menu} className="h-4 w-4" />}
        </Button>
        {!collapsed && props.children}
      </div>
      {!mobile && (
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setCollapsed(!collapsed)}
        >
          <LucideIconWrapper 
            icon={ChevronLeft} 
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      )}
    </div>
  )
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-2 py-4", className)}
      {...props}
    />
  )
}

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

export function SidebarGroup({ title, className, children, ...props }: SidebarGroupProps) {
  const { collapsed } = React.useContext(SidebarContext)

  return (
    <div className={cn("mb-4", className)} {...props}>
      {title && !collapsed && (
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  active?: boolean
  badge?: React.ReactNode
}

export function SidebarItem({
  icon,
  active,
  badge,
  className,
  children,
  ...props
}: SidebarItemProps) {
  const { collapsed } = React.useContext(SidebarContext)

  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        collapsed && "justify-center px-2",
        className
      )}
      {...props}
    >
      {icon && <span className="flex h-5 w-5 items-center justify-center">{icon}</span>}
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{children}</span>
          {badge}
        </>
      )}
    </button>
  )
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      className={cn("mt-auto border-t p-4", className)}
      {...props}
    />
  )
}