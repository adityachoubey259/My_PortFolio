"use client";

import { RotateCcw, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const baseNodes = ["Inquiry Input", "Classification", "Decision", "Routing", "Follow-up", "Team Notification"];

export function AutomationStudio() {
  const [inquiry, setInquiry] = useState("We need help with an urgent inspection issue and dashboard follow-up.");
  const [active, setActive] = useState("Inquiry Input");
  const [log, setLog] = useState<string[]>([]);
  const priority = inquiry.toLowerCase().includes("urgent") || inquiry.toLowerCase().includes("alarm");
  const route = priority ? "Priority technical route" : "Standard collaboration route";

  function runSimulation() {
    setActive("Routing");
    setLog([
      "Inquiry received",
      `Extracted ${inquiry.length} characters`,
      priority ? "AI-style classification: high priority wording detected" : "AI-style classification: standard priority",
      `Decision selected: ${route}`,
      "Follow-up payload prepared",
      "Team notification simulated",
    ]);
  }

  function reset() {
    setActive("Inquiry Input");
    setLog([]);
  }

  return (
    <div className="mini-app automation-studio">
      <section className="workflow-editor app-window">
        <div className="workflow-canvas">
          {baseNodes.map((node) => (
            <button key={node} type="button" className={cn(active === node && "is-active")} onClick={() => setActive(node)}>
              <span />
              {node}
            </button>
          ))}
          <i className={cn(priority && "is-priority")} />
        </div>
      </section>

      <aside className="workflow-side app-window">
        <label>
          Sample inquiry
          <textarea value={inquiry} onChange={(event) => setInquiry(event.target.value)} />
        </label>
        <div className="app-toolbar">
          <button type="button" onClick={runSimulation}>
            <Send size={15} />
            Run simulation
          </button>
          <button type="button" onClick={reset}>
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
        <div className="payload-view">
          <span>Output summary</span>
          <strong>{route}</strong>
          <pre>{JSON.stringify({ simulation: true, priority, route, selectedNode: active }, null, 2)}</pre>
        </div>
      </aside>

      <section className="app-window event-console">
        <h2>Activity log</h2>
        <ol>
          {log.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
