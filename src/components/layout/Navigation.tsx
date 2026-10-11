"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#systems", label: "Systems" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
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

      const current = links
        .map((link) => link.href.slice(1))
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
        <a className="monogram" href="#home" aria-label="Aditya Choubey home">
          AC
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} className={active === link.href.slice(1) ? "is-active" : ""} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href={`mailto:${profile.email}`}>
          Contact
        </a>
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
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
