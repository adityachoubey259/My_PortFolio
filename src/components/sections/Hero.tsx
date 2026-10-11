"use client";

import { ArrowDown, Download, Github, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "Artificial Intelligence", x: 52, y: 15, description: "AI-assisted development, prompt systems and practical intelligence layers." },
  { label: "Software Development", x: 18, y: 33, description: "Interfaces, backend logic and dependable web workflows." },
  { label: "Workflow Automation", x: 74, y: 36, description: "n8n orchestration, data routing and trigger/action systems." },
  { label: "Industrial Monitoring", x: 28, y: 68, description: "Inspection workflows, monitoring concepts and operational records." },
  { label: "Hardware Integration", x: 62, y: 73, description: "Hardware/software interaction and RS485-linked communication thinking." },
  { label: "Data & Analytics", x: 84, y: 63, description: "Dashboards, structured records and decision-friendly views." },
];

const lines = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 4],
  [4, 5],
  [2, 5],
];

export function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="hero-section" id="home">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="hero-copy">
        <span className="hero-kicker">
          <Sparkles size={15} />
          {profile.microcopy}
        </span>
        <h1>
          <span>{profile.displayName.split(" ")[0]}</span>
          <span>{profile.displayName.split(" ")[1]}</span>
        </h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-description">
          Building intelligent software, practical automation
          <br />
          and connected systems that solve real-world problems.
        </p>
        <div className="hero-actions">
          <MagneticLink href="#work">Explore My Work</MagneticLink>
          <MagneticLink
            href={profile.resume.available ? profile.resume.href : "#contact"}
            variant="secondary"
            disabled={!profile.resume.available}
            aria-label={profile.resume.available ? "Download resume" : "Resume PDF not added yet"}
          >
            <Download size={16} />
            {profile.resume.available ? "Download Resume" : "Resume PDF Pending"}
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
      </div>

      <div className="constellation-card" aria-label="Interactive AI automation constellation">
        <div className="constellation-frame">
          <svg className="constellation-lines" viewBox="0 0 100 100" aria-hidden="true">
            {lines.map(([from, to]) => (
              <line key={`${from}-${to}`} x1={nodes[from].x} y1={nodes[from].y} x2={nodes[to].x} y2={nodes[to].y} />
            ))}
            <circle className="signal signal-a" r="1.1" />
            <circle className="signal signal-b" r="0.8" />
          </svg>
          {nodes.map((node, index) => (
            <button
              key={node.label}
              type="button"
              className={cn("constellation-node", active === index && "is-active")}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span />
              <strong>{node.label}</strong>
            </button>
          ))}
          <div className="constellation-readout">
            <span>Node 0{active + 1}</span>
            <strong>{nodes[active].label}</strong>
            <p>{nodes[active].description}</p>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <ArrowDown size={16} />
      </a>
      <a className="hero-mail" href={`mailto:${profile.email}`}>
        <Mail size={15} />
        {profile.email}
      </a>
    </section>
  );
}
