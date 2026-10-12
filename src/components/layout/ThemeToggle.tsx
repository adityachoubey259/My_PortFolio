"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function updateTheme() {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Toggle color theme"
      onClick={updateTheme}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          <Sun className="theme-icon theme-icon--sun" size={14} />
          <Moon className="theme-icon theme-icon--moon" size={14} />
        </span>
      </span>
    </button>
  );
}
