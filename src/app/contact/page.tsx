"use client";

import { Check, Copy, Download, Github, Mail, Phone } from "lucide-react";
import { Shell } from "@/components/app/Shell";
import { GlassPanel, PageHeader } from "@/components/app/Premium";
import { profile } from "@/content/profile";
import { useState } from "react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Shell>
      <PageHeader
        eyebrow="Connect / Contact"
        title="LET'S CREATE WHAT'S NEXT."
        description="Direct contact details for collaboration, hiring and project conversations."
      />
      <GlassPanel className="contact-v4">
        <div>
          <span>Aditya Choubey</span>
          <h2>{profile.role}</h2>
          <p>{profile.location}</p>
        </div>
        <div className="contact-action-grid">
          <button type="button" onClick={copyEmail}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy email"}
          </button>
          <a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}><Phone size={16} /> Phone</a>
          <a href={profile.resume.href} download="Aditya-Choubey-Resume.pdf"><Download size={16} /> Resume</a>
        </div>
        <dl>
          <div><dt>Email</dt><dd>{profile.email}</dd></div>
          <div><dt>Phone</dt><dd>{profile.phone}</dd></div>
          <div><dt>GitHub</dt><dd>{profile.githubLabel}</dd></div>
          <div><dt>City</dt><dd>{profile.location}</dd></div>
        </dl>
      </GlassPanel>
    </Shell>
  );
}
