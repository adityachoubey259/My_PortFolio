"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Command, Download, Github, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { appNavigation, commandItems } from "@/content/navigation";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

function pathMatches(current: string, href: string) {
  if (href === "/") return current === "/";
  return current === href || current.startsWith(`${href}/`);
}

function getStoredCollapsed() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("aditya-os-sidebar") === "collapsed";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [collapsed, setCollapsed] = useState(getStoredCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && !isInput) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function toggleCollapsed() {
    setCollapsed((value) => {
      const next = !value;
      localStorage.setItem("aditya-os-sidebar", next ? "collapsed" : "expanded");
      return next;
    });
  }

  const nav = (
    <nav className="os-nav" aria-label="Application navigation">
      {appNavigation.map((group) => (
        <div className="os-nav-group" key={group.label}>
          <span>{group.label}</span>
          {group.items.map((item) => {
            const Icon = item.icon;
            const active = pathMatches(pathname, item.href);
            const content = (
              <>
                {active ? <motion.i layoutId="active-nav-pill" className="active-nav-pill" /> : null}
                <Icon size={18} />
                <strong>{item.label}</strong>
                <em>{item.description}</em>
              </>
            );

            return (
              <Link
                key={item.href}
                className={cn("os-nav-item", active && "is-active")}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                {content}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );

  return (
    <div className={cn("os-shell", collapsed && "os-shell--collapsed")}>
      <aside className="os-sidebar" aria-label="ADITYA OS sidebar">
        <div className="os-brand">
          <Link href="/" aria-label="ADITYA OS home">
            <span>AC</span>
            <strong>ADITYA OS</strong>
            <em>Interactive Engineering Portfolio</em>
          </Link>
          <button type="button" onClick={toggleCollapsed} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        {nav}
        <div className="os-sidebar-footer">
          <a href={profile.resume.href} download="Aditya-Choubey-Resume.pdf" aria-label="Download resume">
            <Download size={17} />
            <span>Download resume</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub">
            <Github size={17} />
            <span>{profile.githubLabel}</span>
          </a>
          <button type="button" onClick={() => setPaletteOpen(true)}>
            <Command size={17} />
            <span>Command</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>
      </aside>

      <header className="os-mobile-header">
        <Link href="/" className="mobile-brand">
          <span>AC</span>
          ADITYA OS
        </Link>
        <div>
          <button type="button" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
            <Search size={18} />
          </button>
          <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
            <Menu size={18} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div className="mobile-drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="mobile-drawer"
              initial={reduceMotion ? false : { x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: -24, opacity: 0 }}
            >
              <div className="drawer-head">
                <strong>ADITYA OS</strong>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close navigation">
                  <X size={18} />
                </button>
              </div>
              {nav}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <main className="os-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            className="os-page"
            initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return commandItems;
    return commandItems.filter((item) => `${item.label} ${item.keywords}`.toLowerCase().includes(search));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((value) => Math.min(value + 1, filtered.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((value) => Math.max(value - 1, 0));
      }
      if (event.key === "Enter" && filtered[selected]) {
        event.preventDefault();
        router.push(filtered[selected].href);
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filtered, onOpenChange, open, router, selected]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="command-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="command-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <div className="command-search">
              <Search size={18} />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                placeholder="Search ADITYA OS..."
              />
              <kbd>Esc</kbd>
            </div>
            <div className="command-results" role="listbox" aria-label="Navigation commands">
              {filtered.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    type="button"
                    className={cn(index === selected && "is-selected")}
                    onMouseEnter={() => setSelected(index)}
                    onClick={() => {
                      router.push(item.href);
                      onOpenChange(false);
                    }}
                  >
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              {!filtered.length ? <p>No command found.</p> : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
