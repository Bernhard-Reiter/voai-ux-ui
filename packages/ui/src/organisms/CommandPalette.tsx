"use client";

import * as React from "react";
import { cn } from "../utils";

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function CommandPalette({
  items,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  className,
}: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter items based on search
  const filteredItems = React.useMemo(() => {
    if (!search) return items;
    
    const searchLower = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(searchLower)
        )
    );
  }, [items, search]);

  // Keyboard shortcut to open (Cmd/Ctrl + K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) =>
          i < filteredItems.length - 1 ? i + 1 : i
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          setOpen(false);
          setSearch("");
          setSelectedIndex(0);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }
    },
    [filteredItems, selectedIndex]
  );

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 animate-fade-in"
        onClick={() => setOpen(false)}
      />

      {/* Command Palette */}
      <div className="fixed inset-x-0 top-[20vh] z-50 mx-auto max-w-2xl px-4">
        <div
          className={cn(
            "overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-scale-in",
            className
          )}
        >
          {/* Search Input */}
          <div className="border-b border-gray-200 px-4">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full border-0 bg-transparent py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto py-2">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                {emptyMessage}
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                    setSearch("");
                    setSelectedIndex(0);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                    index === selectedIndex
                      ? "bg-primary-50 text-primary-900"
                      : "hover:bg-gray-50"
                  )}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {item.icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      {item.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-gray-500">
                        {item.description}
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">↑↓</kbd>
                {" "}to navigate
              </span>
              <span>
                <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">↵</kbd>
                {" "}to select
              </span>
              <span>
                <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono">esc</kbd>
                {" "}to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Hook to easily use the command palette
export function useCommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return { open, setOpen };
}