"use client";

import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const stages = [
  {
    label: "Data Input",
    title: "Signals, Forms and Records",
    inputs: "Sensor values, checklist entries, inquiry text and operational observations.",
    role: "Capture real-world information without hiding its source context.",
    tech: "Forms, device data, inspection fields, structured records",
    output: "Clean initial payload",
    project: "ITL Checklist / RS485 Industrial Monitoring",
  },
  {
    label: "Processing",
    title: "Validation and Structuring",
    inputs: "Raw payloads and observations.",
    role: "Normalize inputs, check missing fields and prepare decision-ready data.",
    tech: "Python, JavaScript, APIs, SQL concepts",
    output: "Structured workflow state",
    project: "Python-Based Website System",
  },
  {
    label: "Intelligence",
    title: "Classification and Reasoning",
    inputs: "Structured state and context.",
    role: "Use AI-assisted reasoning or rules to classify priority and next action.",
    tech: "Prompt engineering, AI productivity, data analysis",
    output: "Priority, category and explanation",
    project: "XecroAI",
  },
  {
    label: "Automation",
    title: "Workflow Routing",
    inputs: "Classified payload and target action.",
    role: "Move data through conditional paths and follow-up steps.",
    tech: "n8n, workflow automation, trigger/action logic",
    output: "Assigned task, message or report",
    project: "n8n Workflow Automation",
  },
  {
    label: "Visualization",
    title: "Dashboard and Report Surface",
    inputs: "Processed records, alarms and summaries.",
    role: "Make system state readable through dashboards, reports and status views.",
    tech: "React interfaces, charting, Power BI-style thinking",
    output: "Human-readable insight",
    project: "Industrial Intelligence Studio",
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
    <section className="page-section architecture-section" id="systems">
      <SectionHeader
        eyebrow="From signal to insight"
        title="A technical explainer for how practical systems move from input to useful action."
        description="This is a conceptual model across portfolio work, not a claim that every stage belongs to one production deployment."
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
          <dl className="stage-detail-list">
            <div>
              <dt>Inputs</dt>
              <dd>{stages[active].inputs}</dd>
            </div>
            <div>
              <dt>Processing role</dt>
              <dd>{stages[active].role}</dd>
            </div>
            <div>
              <dt>Relevant technologies</dt>
              <dd>{stages[active].tech}</dd>
            </div>
            <div>
              <dt>Output</dt>
              <dd>{stages[active].output}</dd>
            </div>
            <div>
              <dt>Associated project</dt>
              <dd>{stages[active].project}</dd>
            </div>
          </dl>
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
