"use client";

import { Download, Pause, Play, RotateCcw, Send } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ChecklistStatus = "Pending" | "Pass" | "Needs attention" | "Fail";

const checklistCategories = {
  Safety: ["Emergency stop verified", "Guarding condition checked", "Area housekeeping reviewed"],
  Electrical: ["Panel indicators normal", "Cable routing visually inspected", "Motor current logged"],
  Mechanical: ["Bearing noise checked", "Fasteners visually checked", "Lubrication condition reviewed"],
};

const initialItems = Object.values(checklistCategories)
  .flat()
  .reduce<Record<string, { status: ChecklistStatus; observation: string }>>((acc, item) => {
    acc[item] = { status: "Pending", observation: "" };
    return acc;
  }, {});

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function EngineeringPlayground() {
  const [category, setCategory] = useState<keyof typeof checklistCategories>("Safety");
  const [items, setItems] = useState(initialItems);
  const [rsPaused, setRsPaused] = useState(false);
  const [fault, setFault] = useState(false);
  const [pollInterval, setPollInterval] = useState(800);
  const [inquiry, setInquiry] = useState("We need help with an urgent inspection issue and dashboard follow-up.");
  const [selectedNode, setSelectedNode] = useState("Inquiry received");
  const [workflowLog, setWorkflowLog] = useState<string[]>([]);

  const activeItems = checklistCategories[category];
  const completed = Object.values(items).filter((item) => item.status !== "Pending").length;
  const progress = Math.round((completed / Object.keys(items).length) * 100);
  const summary = useMemo(() => {
    const statuses = Object.values(items);
    return {
      pass: statuses.filter((item) => item.status === "Pass").length,
      attention: statuses.filter((item) => item.status === "Needs attention").length,
      fail: statuses.filter((item) => item.status === "Fail").length,
      pending: statuses.filter((item) => item.status === "Pending").length,
    };
  }, [items]);

  const workflowNodes = [
    "Inquiry received",
    "Data extraction",
    "AI classification",
    inquiry.toLowerCase().includes("urgent") || inquiry.toLowerCase().includes("alarm") ? "Priority routing" : "Standard routing",
    "Follow-up",
    "Team notification",
  ];

  function updateChecklist(item: string, patch: Partial<{ status: ChecklistStatus; observation: string }>) {
    setItems((current) => ({ ...current, [item]: { ...current[item], ...patch } }));
  }

  function runWorkflow() {
    const route = workflowNodes[3];
    setWorkflowLog([
      "Received sample inquiry",
      `Extracted payload length: ${inquiry.length} characters`,
      inquiry.toLowerCase().includes("urgent") || inquiry.toLowerCase().includes("alarm")
        ? "Classified as high priority because urgent/alarm wording was detected"
        : "Classified as standard priority",
      `Selected route: ${route}`,
      "Prepared follow-up summary",
      "Simulated notification payload generated",
    ]);
    setSelectedNode(route);
  }

  return (
    <div className="playground-suite">
      <section className="playground-demo checklist-demo">
        <div className="demo-copy">
          <span className="eyebrow">Demo A</span>
          <h2>Industrial Checklist</h2>
          <p>
            Portfolio demonstration inspired by the ITL Checklist project. This is a local interactive simulation, not a
            production inspection system.
          </p>
        </div>
        <div className="inspection-panel">
          <div className="inspection-toolbar">
            <label>
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value as keyof typeof checklistCategories)}>
                {Object.keys(checklistCategories).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </label>
            <div className="progress-ring" style={{ "--progress": `${progress}%` } as CSSProperties}>
              <strong>{progress}%</strong>
              <span>Complete</span>
            </div>
          </div>
          <div className="checklist-items">
            {activeItems.map((item) => (
              <article key={item}>
                <h3>{item}</h3>
                <div className="segmented">
                  {(["Pass", "Needs attention", "Fail"] as ChecklistStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={cn(items[item].status === status && "is-active")}
                      onClick={() => updateChecklist(item, { status })}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <label>
                  Observation
                  <textarea
                    value={items[item].observation}
                    onChange={(event) => updateChecklist(item, { observation: event.target.value })}
                    placeholder="Add short inspection note"
                  />
                </label>
              </article>
            ))}
          </div>
          <div className="summary-strip">
            <span>Pass: {summary.pass}</span>
            <span>Attention: {summary.attention}</span>
            <span>Fail: {summary.fail}</span>
            <span>Pending: {summary.pending}</span>
          </div>
          <div className="demo-actions">
            <button type="button" onClick={() => downloadJson("inspection-demo-report.json", { category, progress, summary, items })}>
              <Download size={15} />
              Download JSON
            </button>
            <button type="button" onClick={() => setItems(initialItems)}>
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="playground-demo rs485-demo">
        <div className="demo-copy">
          <span className="eyebrow">Demo B</span>
          <h2>RS485 Communication Visualizer</h2>
          <p>
            Educational simulation only. RS485 is shown as the physical communication layer; the frame below is an
            illustrative Modbus RTU-style request, not a live hardware connection.
          </p>
        </div>
        <div className={cn("rs-flow", rsPaused && "is-paused", fault && "has-fault")}>
          {["Sensor / device", "RS485 network", "Data processing", "Dashboard"].map((step) => (
            <div key={step} className="rs-node">
              <span />
              <strong>{step}</strong>
            </div>
          ))}
          <i className="signal-pulse" style={{ animationDuration: `${pollInterval}ms` }} />
        </div>
        <div className="simulator-grid">
          <div className="packet-panel">
            <span>Example frame</span>
            <code>{fault ? "01 03 00 ?? CRC ERROR" : "01 03 00 2A 00 02 E4 0B"}</code>
            <p>{fault ? "CRC mismatch simulated. Processing is held for operator review." : "Device 01 reads two holding registers starting at address 0x002A."}</p>
          </div>
          <div className="sim-controls">
            <button type="button" onClick={() => setRsPaused((value) => !value)}>
              {rsPaused ? <Play size={15} /> : <Pause size={15} />}
              {rsPaused ? "Resume" : "Pause"}
            </button>
            <button type="button" onClick={() => setFault((value) => !value)}>
              {fault ? "Clear fault" : "Simulate fault"}
            </button>
            <label>
              Polling interval: {pollInterval} ms
              <input
                type="range"
                min="450"
                max="1600"
                step="50"
                value={pollInterval}
                onChange={(event) => setPollInterval(Number(event.target.value))}
              />
            </label>
          </div>
        </div>
      </section>

      <section className="playground-demo workflow-demo">
        <div className="demo-copy">
          <span className="eyebrow">Demo C</span>
          <h2>n8n Automation Workflow Simulator</h2>
          <p>
            A browser simulation of automation routing logic. It does not execute a real n8n workflow or connect to
            external services.
          </p>
        </div>
        <div className="workflow-layout">
          <div className="workflow-nodes">
            {workflowNodes.map((node) => (
              <button
                key={node}
                type="button"
                className={cn(selectedNode === node && "is-active")}
                onClick={() => setSelectedNode(node)}
              >
                {node}
              </button>
            ))}
          </div>
          <div className="workflow-console">
            <label>
              Sample inquiry
              <textarea value={inquiry} onChange={(event) => setInquiry(event.target.value)} />
            </label>
            <button type="button" onClick={runWorkflow}>
              <Send size={15} />
              Run simulation
            </button>
            <div className="payload-view">
              <span>Selected node</span>
              <strong>{selectedNode}</strong>
              <pre>{JSON.stringify({ inquiry, route: workflowNodes[3], simulation: true }, null, 2)}</pre>
            </div>
            <ol className="event-log">
              {workflowLog.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
