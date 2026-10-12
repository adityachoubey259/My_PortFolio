"use client";

import { ArrowDown, Download, Github, Mail, MoveUpRight } from "lucide-react";
import { useState } from "react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "Software", x: 18, y: 52, body: "Interfaces, backend logic and practical web systems." },
  { label: "AI", x: 38, y: 26, body: "Prompt-assisted reasoning and intelligent classification." },
  { label: "Automation", x: 58, y: 52, body: "Trigger, route and follow-up workflows." },
  { label: "Hardware", x: 78, y: 28, body: "Device-aware thinking for industrial contexts." },
  { label: "Data", x: 82, y: 72, body: "Dashboards, records and monitoring signals." },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const node = nodes[active];

  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <span className="hero-kicker">Engineer the possible</span>
        <h1 aria-label="Aditya Choubey">
          <span>ADITYA</span>
          <span>CHOUBEY.</span>
        </h1>
        <p className="hero-role">AI Automation &amp; Software Development</p>
        <p className="hero-description">
          Building intelligent software, automation workflows and connected systems for real-world problems.
        </p>
        <div className="hero-actions">
          <MagneticLink href="#work">
            Explore My Work
            <MoveUpRight size={16} />
          </MagneticLink>
          <MagneticLink href={profile.resume.href} variant="secondary" download="Aditya-Choubey-Resume.pdf">
            <Download size={16} />
            Download Resume
          </MagneticLink>
          <MagneticLink href={profile.github} variant="ghost" target="_blank" rel="noreferrer">
            <Github size={16} />
            GitHub
          </MagneticLink>
        </div>
        <div className="availability" aria-label="Availability status">
          <span />
          {profile.availability}
        </div>
        <div className="hero-focus">
          <strong>Current focus</strong>
          <p>Software systems, AI productivity, industrial monitoring concepts and automation design.</p>
        </div>
      </div>

      <div className="system-instrument" aria-label="Interactive relationship between software, AI, automation, hardware and data">
        <div className="instrument-grid" aria-hidden="true" />
        <svg className="instrument-lines" viewBox="0 0 100 100" role="img" aria-label="Connected engineering capability map">
          <path d="M18 52 C26 34 31 30 38 26" />
          <path d="M38 26 C47 35 51 45 58 52" />
          <path d="M58 52 C66 40 70 32 78 28" />
          <path d="M58 52 C68 60 74 66 82 72" />
          <path d="M18 52 C36 74 60 83 82 72" />
        </svg>
        {nodes.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={cn("instrument-node", active === index && "is-active")}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
          >
            <span>{item.label}</span>
          </button>
        ))}
        <div className="instrument-readout">
          <span>Selected layer</span>
          <strong>{node.label}</strong>
          <p>{node.body}</p>
        </div>
        <div className="instrument-tabs" aria-label="Engineering relationship controls">
          {nodes.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={cn(active === index && "is-active")}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
        <ArrowDown size={16} />
      </a>
      <a className="hero-mail" href={`mailto:${profile.email}`}>
        <Mail size={15} />
        {profile.email}
      </a>
    </section>
  );
}
