"use client";

import { Check, Copy, Github, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="contact-section" id="contact">
      <Reveal className="contact-panel">
        <span className="eyebrow">Contact</span>
        <h2>Let&apos;s Build Something Worth Remembering.</h2>
        <p>
          Available from Bhopal for software development, AI automation, industrial workflow systems and practical
          hardware/software collaboration.
        </p>
        <div className="contact-actions">
          <MagneticLink href={`mailto:${profile.email}`}>
            <Mail size={16} />
            Email Aditya
          </MagneticLink>
          <button className="copy-button" type="button" onClick={copyEmail}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy email"}
          </button>
          <MagneticLink
            href={profile.resume.href}
            variant="secondary"
            download="Aditya-Choubey-Resume.pdf"
          >
            Download Resume
          </MagneticLink>
        </div>
        <div className="contact-grid">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={17} />
            {profile.githubLabel}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <Phone size={17} />
            {profile.phone}
          </a>
          <span>
            <MapPin size={17} />
            {profile.location}
          </span>
          <span>Hometown: {profile.hometown}</span>
        </div>
      </Reveal>
    </section>
  );
}
