"use client";

import { ArrowDown, Download, Github, Mail } from "lucide-react";
import { useState } from "react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const facets = [
  {
    label: "Inspection logic",
    body: "Issue capture, evidence trails and follow-up workflows for industrial contexts.",
  },
  {
    label: "Automation paths",
    body: "n8n-style trigger, routing and action sequences shaped into maintainable flows.",
  },
  {
    label: "Signal exchange",
    body: "Hardware/software thinking around RS485-linked monitoring and device information.",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="hero-section" id="home">
      <div className="hero-backplate" aria-hidden="true" />
      <div className="hero-copy">
        <span className="hero-kicker">{profile.microcopy}</span>
        <h1 aria-label="Aditya Choubey">
          <span>ADITYA</span>
          <span>CHOUBEY.</span>
        </h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-description">
          Building intelligent software and connected systems for real-world problems.
        </p>
        <div className="hero-actions">
          <MagneticLink href="#work">Explore Work</MagneticLink>
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
      </div>

      <div className="atelier-object" aria-label="Interactive abstract technical monogram">
        <div className="object-grid" aria-hidden="true" />
        <div className="monogram-sculpture" aria-hidden="true">
          <span>A</span>
          <span>C</span>
          <i />
        </div>
        <div className="bus-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="facet-list">
          {facets.map((facet, index) => (
            <button
              key={facet.label}
              type="button"
              className={cn("facet-button", active === index && "is-active")}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {facet.label}
            </button>
          ))}
        </div>
        <div className="facet-readout">
          <span>Selected vector</span>
          <strong>{facets[active].label}</strong>
          <p>{facets[active].body}</p>
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
