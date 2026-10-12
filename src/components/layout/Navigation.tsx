"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#home", label: "Home", id: "home" },
  { href: "/#work", label: "Work", id: "work" },
  { href: "/lab/analytics", label: "Analytics", id: "analytics" },
  { href: "/playground", label: "Playground", id: "playground" },
  { href: "/recruiter", label: "Recruiter", id: "recruiter" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 20);
      setProgress(height > 0 ? scrollTop / height : 0);

      if (window.location.pathname !== "/") {
        const route = links.find((link) => link.href === window.location.pathname);
        if (route) setActive(route.id);
        return;
      }

      const current = links
        .filter((link) => link.href.startsWith("/#"))
        .map((link) => link.id)
        .findLast((id) => {
          const element = document.getElementById(id);
          return element ? element.offsetTop <= scrollTop + 180 : false;
        });
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <header className={cn("site-nav", scrolled && "site-nav--scrolled")}>
        <Link className="monogram" href="/#home" aria-label="Aditya Choubey home">
          AC
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} className={active === link.id ? "is-active" : ""} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="nav-resume" href={profile.resume.href} download="Aditya-Choubey-Resume.pdf">
            <Download size={15} />
            Resume
          </a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className={cn("mobile-panel", open && "mobile-panel--open")}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href={profile.resume.href} download="Aditya-Choubey-Resume.pdf" onClick={() => setOpen(false)}>
          Download resume
        </a>
      </div>
    </>
  );
}
