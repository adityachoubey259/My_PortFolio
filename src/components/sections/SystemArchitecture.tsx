"use client";

import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const stages = [
  {
    label: "Input",
    title: "Sensors / Web Forms / Data",
    body: "Raw signals, records, inspection details and user-submitted operational information.",
  },
  {
    label: "Processing",
    title: "Python / Logic / APIs",
    body: "Validation, transformation and routing logic that turns messy input into usable structure.",
  },
  {
    label: "Automation",
    title: "AI / n8n Automation",
    body: "Prompt-assisted reasoning, workflow orchestration and conditional trigger/action paths.",
  },
  {
    label: "Output",
    title: "Dashboard / Alerts / Reports",
    body: "Readable interfaces, follow-up records and decision-friendly monitoring views.",
  },
];

export function SystemArchitecture() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  function playSignal() {
    setRunning(false);
    window.setTimeout(() => setRunning(true), 20);
  }

  return (
    <section className="page-section architecture-section">
      <SectionHeader
        eyebrow="Signature system"
        title="How I build systems: from real-world input to useful output."
        description="A conceptual model connecting software, data, automation and industrial technology."
      />
      <Reveal className="architecture-board">
        <div className={cn("architecture-flow", running && "is-running")}>
          {stages.map((stage, index) => (
            <button
              key={stage.label}
              type="button"
              className={cn("architecture-stage", active === index && "is-active")}
              onClick={() => {
                setActive(index);
                playSignal();
              }}
            >
              <span>{stage.label}</span>
              <strong>{stage.title}</strong>
            </button>
          ))}
          <div className="architecture-signal" aria-hidden="true" />
        </div>
        <div className="architecture-detail">
          <span>Stage 0{active + 1}</span>
          <h3>{stages[active].title}</h3>
          <p>{stages[active].body}</p>
          <div className="architecture-actions">
            <button type="button" onClick={playSignal}>
              <Play size={15} />
              Run signal
            </button>
            <button
              type="button"
              onClick={() => {
                setActive(0);
                setRunning(false);
              }}
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
