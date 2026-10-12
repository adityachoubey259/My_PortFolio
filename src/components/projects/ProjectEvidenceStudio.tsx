"use client";

import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, FileImage, Github, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/types/content";

export function ProjectEvidenceStudio({ project }: { project: Project }) {
  const evidence = project.evidence;
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!evidence) return null;

  const media = evidence.media.length
    ? evidence.media
    : [
        {
          title: "Conceptual System Architecture",
          description: "Fallback diagram generated from verified architecture notes. This is not a production screenshot.",
          kind: "concept" as const,
        },
      ];
  const current = media[selected] ?? media[0];

  return (
    <section className="evidence-studio" aria-labelledby="evidence-title">
      <div className="evidence-head">
        <div>
          <span className="eyebrow">Evidence studio</span>
          <h2 id="evidence-title">Project proof, media and publishing status</h2>
        </div>
        <strong>{evidence.publishingPermissionStatus}</strong>
      </div>

      <div className="evidence-layout">
        <div className="evidence-viewer">
          <button type="button" onClick={() => setLightboxOpen(true)} className="evidence-preview">
            {current.src ? (
              <Image src={current.src} alt={current.alt ?? current.title} fill sizes="(max-width: 900px) 100vw, 760px" />
            ) : (
              <ConceptDiagram steps={evidence.architecture} />
            )}
          </button>
          <div className="evidence-caption">
            <FileImage size={16} />
            <div>
              <strong>{current.title}</strong>
              <p>{current.description}</p>
            </div>
          </div>
          <div className="evidence-thumbs">
            {media.map((item, index) => (
              <button type="button" className={index === selected ? "is-selected" : ""} onClick={() => setSelected(index)} key={item.title}>
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="evidence-notes">
          <EvidenceBlock title="Contributions" items={evidence.contributions} />
          <EvidenceBlock title="Approach" items={evidence.approach} />
          <EvidenceBlock title="Evidence notes" items={evidence.evidenceNotes} />
          <div className="evidence-links">
            {evidence.githubHref ? (
              <a href={evidence.githubHref} target="_blank" rel="noreferrer">
                <Github size={15} />
                GitHub
              </a>
            ) : null}
            {evidence.liveHref ? (
              <a href={evidence.liveHref} target="_blank" rel="noreferrer">
                <ExternalLink size={15} />
                Live demo
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div className="evidence-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="evidence-lightbox-panel"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              role="dialog"
              aria-modal="true"
              aria-label={current.title}
            >
              <button type="button" onClick={() => setLightboxOpen(false)} aria-label="Close media viewer">
                <X size={18} />
              </button>
              <div className="evidence-lightbox-media">
                {current.src ? (
                  <Image src={current.src} alt={current.alt ?? current.title} fill sizes="92vw" />
                ) : (
                  <ConceptDiagram steps={evidence.architecture} />
                )}
              </div>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function EvidenceBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function ConceptDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="concept-diagram" aria-label="Conceptual System Architecture">
      <span>Conceptual System Architecture</span>
      <div>
        {steps.map((step) => (
          <i key={step}>
            {step}
          </i>
        ))}
      </div>
    </div>
  );
}
