import type { Project } from "@/types/content";

export function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "rs485") {
    return (
      <div className="visual-shell rs485-visual" aria-label="Conceptual RS485 architecture diagram">
        {["Industrial Device", "RS485 Communication", "Software Processing", "Monitoring Interface"].map((label) => (
          <div className="flow-node" key={label}>
            {label}
          </div>
        ))}
        <div className="flow-pulse" />
      </div>
    );
  }

  if (project.visual === "automation") {
    return (
      <div className="visual-shell automation-visual" aria-label="Illustrative automation workflow canvas">
        {["Trigger", "Filter", "Route", "Action", "Notify"].map((label, index) => (
          <div className={`automation-node node-${index}`} key={label}>
            {label}
          </div>
        ))}
      </div>
    );
  }

  if (project.visual === "checklist") {
    return (
      <div className="visual-shell checklist-visual" aria-label="Conceptual checklist dashboard">
        {[82, 68, 94, 56].map((value, index) => (
          <div className="check-row" key={value}>
            <span />
            <strong>{value}%</strong>
            <em style={{ width: `${45 + index * 12}%` }} />
          </div>
        ))}
      </div>
    );
  }

  if (project.visual === "python") {
    return (
      <div className="visual-shell code-visual" aria-label="Conceptual Python backend panel">
        <code>def process_signal(data):</code>
        <code>    clean = normalize(data)</code>
        <code>    return route(clean)</code>
      </div>
    );
  }

  return (
    <div className="visual-shell inspection-visual" aria-label="Illustrative industrial inspection interface">
      <div className="camera-frame" />
      <div className="criticality-meter">
        <span />
        <span />
        <span />
      </div>
      <div className="evidence-stack">
        <b />
        <b />
        <b />
      </div>
    </div>
  );
}
