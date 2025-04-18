"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, ChevronRight, Circle } from "lucide-react"

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DropdownMenu({ trigger, children, className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg z-50">
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps) {
  return (
    <div className={cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className)}>
      {children}
      <ChevronRight className="ml-auto" />
    </div>
  )
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
  return (
    <div className={cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  className?: string
  inset?: boolean
}

export function DropdownMenuItem({ children, className, inset }: DropdownMenuItemProps) {
  return (
    <div className={cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuCheckboxItemProps {
  children: React.ReactNode
  checked: boolean
  className?: string
}

export function DropdownMenuCheckboxItem({ children, checked, className }: DropdownMenuCheckboxItemProps) {
  return (
    <div className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <span className="h-4 w-4">
          {checked && <Check className="h-4 w-4" />}
        </span>
      </span>
      {children}
    </div>
  )
}

interface DropdownMenuRadioItemProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuRadioItem({ children, className }: DropdownMenuRadioItemProps) {
  return (
    <div className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <span className="h-2 w-2 fill-current">
          <Circle className="h-2 w-2" />
        </span>
      </span>
      {children}
    </div>
  )
}

interface DropdownMenuLabelProps {
  children: React.ReactNode
  className?: string
  inset?: boolean
}

export function DropdownMenuLabel({ children, className, inset }: DropdownMenuLabelProps) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuSeparatorProps {
  className?: string
}

export function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps) {
  return (
    <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
  )
}

interface DropdownMenuShortcutProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuShortcut({ children, className }: DropdownMenuShortcutProps) {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)}>
      {children}
    </span>
  )
}

interface DropdownMenuGroupProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuGroup({ children, className }: DropdownMenuGroupProps) {
  return (
    <div className={cn("py-2", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuPortalProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuPortal({ children, className }: DropdownMenuPortalProps) {
  return (
    <div className={cn("fixed inset-0 z-50", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuSubProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuSub({ children, className }: DropdownMenuSubProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuSubContentProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuSubContent({ children, className }: DropdownMenuSubContentProps) {
  return (
    <div className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]", className)}>
      {children}
    </div>
  )
}

interface DropdownMenuSubTriggerProps {
  children: React.ReactNode
  className?: string
  inset?: boolean
}

export function DropdownMenuSubTrigger({ children, className, inset }: DropdownMenuSubTriggerProps) {
  return (
    <div className={cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className)}>
      {children}
      <ChevronRight className="ml-auto" />
    </div>
  )
}

interface DropdownMenuRadioGroupProps {
  children: React.ReactNode
  className?: string
}

export function DropdownMenuRadioGroup({ children, className }: DropdownMenuRadioGroupProps) {
  return (
    <div className={cn("py-2", className)}>
      {children}
    </div>
  )
}
