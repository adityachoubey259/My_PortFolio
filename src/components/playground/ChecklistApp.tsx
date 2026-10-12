"use client";

import { Download, RotateCcw } from "lucide-react";
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

export function ChecklistApp() {
  const [category, setCategory] = useState<keyof typeof checklistCategories>("Safety");
  const [items, setItems] = useState(initialItems);
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

  function updateChecklist(item: string, patch: Partial<{ status: ChecklistStatus; observation: string }>) {
    setItems((current) => ({ ...current, [item]: { ...current[item], ...patch } }));
  }

  return (
    <div className="mini-app checklist-app">
      <section className="app-window app-window--large">
        <div className="app-toolbar">
          <label>
            Inspection category
            <select value={category} onChange={(event) => setCategory(event.target.value as keyof typeof checklistCategories)}>
              {Object.keys(checklistCategories).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => downloadJson("inspection-demo-report.json", { category, progress, summary, items })}>
            <Download size={15} />
            Export JSON
          </button>
          <button type="button" onClick={() => setItems(initialItems)}>
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

        <div className="checklist-workspace">
          <div className="checklist-items">
            {activeItems.map((item) => (
              <article key={item} className={cn(items[item].status !== "Pending" && "is-complete")}>
                <h2>{item}</h2>
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

          <aside className="summary-panel">
            <div className="progress-orb" style={{ "--progress": `${progress}%` } as CSSProperties}>
              <strong>{progress}%</strong>
              <span>complete</span>
            </div>
            <dl>
              <div><dt>Pass</dt><dd>{summary.pass}</dd></div>
              <div><dt>Attention</dt><dd>{summary.attention}</dd></div>
              <div><dt>Fail</dt><dd>{summary.fail}</dd></div>
              <div><dt>Pending</dt><dd>{summary.pending}</dd></div>
            </dl>
            <p>Portfolio demonstration inspired by ITL Checklist. Local browser simulation only.</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
