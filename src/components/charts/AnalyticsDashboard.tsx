"use client";

import { Download, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { equipmentList, metricLabels, sensorRecords } from "@/data/industrialData";
import type { EquipmentStatus, SensorMetric, SensorRecord } from "@/types/analytics";
import { cn } from "@/lib/utils";

const statusOptions: Array<EquipmentStatus | "All"> = ["All", "Running", "Idle", "Attention", "Fault"];
const rangeOptions = [
  { label: "24h", hours: 24 },
  { label: "48h", hours: 48 },
  { label: "72h", hours: 72 },
];

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function latestByEquipment(records: SensorRecord[]) {
  return equipmentList
    .map((equipment) =>
      records
        .filter((record) => record.equipmentId === equipment.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0],
    )
    .filter(Boolean) as SensorRecord[];
}

function toCsv(records: SensorRecord[]) {
  const headers = [
    "equipmentId",
    "equipmentName",
    "section",
    "timestamp",
    "temperature_C",
    "vibration_mm_s",
    "motorCurrent_A",
    "status",
    "alarmSeverity",
    "runtimeHours",
    "downtimeMinutes",
  ];
  const rows = records.map((record) =>
    [
      record.equipmentId,
      record.equipmentName,
      record.section,
      record.timestamp,
      record.temperature,
      record.vibration,
      record.motorCurrent,
      record.status,
      record.alarmSeverity,
      record.runtimeHours,
      record.downtimeMinutes,
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}

function TrendChart({
  records,
  metric,
  type,
}: {
  records: SensorRecord[];
  metric: SensorMetric;
  type: "line" | "bars";
}) {
  const chartRecords = records.slice(-36);
  const values = chartRecords.map((record) => record[metric]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(max - min, 1);
  const points = chartRecords.map((record, index) => {
    const x = chartRecords.length === 1 ? 50 : 6 + (index / (chartRecords.length - 1)) * 88;
    const y = 88 - ((record[metric] - min) / spread) * 70;
    return { x, y, record };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className="chart-shell" aria-label={`${metricLabels[metric].label} trend chart`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img">
        <line x1="6" x2="94" y1="88" y2="88" />
        <line x1="6" x2="6" y1="16" y2="88" />
        {type === "line" ? (
          <>
            <path d={path} className="chart-line" />
            {points.filter((_, index) => index % 6 === 0).map((point) => (
              <circle key={`${point.record.timestamp}-${point.record.equipmentId}`} cx={point.x} cy={point.y} r="1.6">
                <title>{`${formatTime(point.record.timestamp)}: ${point.record[metric]} ${metricLabels[metric].unit}`}</title>
              </circle>
            ))}
          </>
        ) : (
          points.map((point) => (
            <rect
              key={`${point.record.timestamp}-${point.record.equipmentId}`}
              x={point.x - 0.8}
              y={point.y}
              width="1.6"
              height={88 - point.y}
              rx="0.5"
            >
              <title>{`${formatTime(point.record.timestamp)}: ${point.record[metric]} ${metricLabels[metric].unit}`}</title>
            </rect>
          ))
        )}
      </svg>
      <div className="chart-axis">
        <span>{formatTime(chartRecords[0]?.timestamp ?? sensorRecords[0].timestamp)}</span>
        <span>{metricLabels[metric].label} ({metricLabels[metric].unit})</span>
        <span>{formatTime(chartRecords.at(-1)?.timestamp ?? sensorRecords.at(-1)!.timestamp)}</span>
      </div>
    </div>
  );
}

function StatusBars({ records, onSelect }: { records: SensorRecord[]; onSelect: (status: EquipmentStatus) => void }) {
  const counts = statusOptions.slice(1).map((status) => ({
    status,
    count: records.filter((record) => record.status === status).length,
  }));
  const max = Math.max(...counts.map((item) => item.count), 1);

  return (
    <div className="status-bars" aria-label="Machine status distribution">
      {counts.map((item) => (
        <button key={item.status} type="button" onClick={() => onSelect(item.status as EquipmentStatus)}>
          <span>{item.status}</span>
          <strong>{item.count}</strong>
          <i style={{ width: `${(item.count / max) * 100}%` }} />
        </button>
      ))}
    </div>
  );
}

export function AnalyticsDashboard() {
  const [equipmentId, setEquipmentId] = useState("All");
  const [rangeHours, setRangeHours] = useState(48);
  const [metric, setMetric] = useState<SensorMetric>("temperature");
  const [status, setStatus] = useState<EquipmentStatus | "All">("All");
  const [chartType, setChartType] = useState<"line" | "bars">("line");

  const filteredRecords = useMemo(() => {
    const end = Math.max(...sensorRecords.map((record) => new Date(record.timestamp).getTime()));
    const start = end - rangeHours * 60 * 60 * 1000;
    return sensorRecords.filter((record) => {
      const time = new Date(record.timestamp).getTime();
      return (
        time >= start &&
        (equipmentId === "All" || record.equipmentId === equipmentId) &&
        (status === "All" || record.status === status)
      );
    });
  }, [equipmentId, rangeHours, status]);

  const latest = latestByEquipment(filteredRecords);
  const averageMetric =
    filteredRecords.reduce((sum, record) => sum + record[metric], 0) / Math.max(filteredRecords.length, 1);
  const downtime = filteredRecords.reduce((sum, record) => sum + record.downtimeMinutes, 0);
  const highAlarms = filteredRecords.filter((record) => record.alarmSeverity === "High").length;
  const alarms = filteredRecords
    .filter((record) => record.alarmSeverity !== "None")
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 7);

  function resetFilters() {
    setEquipmentId("All");
    setRangeHours(48);
    setMetric("temperature");
    setStatus("All");
    setChartType("line");
  }

  function exportCsv() {
    const blob = new Blob([toCsv(filteredRecords)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "industrial-intelligence-demo-data.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="analytics-dashboard">
      <div className="demo-banner">DEMONSTRATION DATA - NOT LIVE PLANT TELEMETRY</div>
      <section className="dashboard-controls" aria-label="Dashboard controls">
        <label>
          Equipment
          <select value={equipmentId} onChange={(event) => setEquipmentId(event.target.value)}>
            <option value="All">All equipment</option>
            {equipmentList.map((equipment) => (
              <option key={equipment.id} value={equipment.id}>
                {equipment.id} - {equipment.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Time range
          <select value={rangeHours} onChange={(event) => setRangeHours(Number(event.target.value))}>
            {rangeOptions.map((option) => (
              <option key={option.hours} value={option.hours}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Metric
          <select value={metric} onChange={(event) => setMetric(event.target.value as SensorMetric)}>
            {Object.entries(metricLabels).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value as EquipmentStatus | "All")}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Chart
          <select value={chartType} onChange={(event) => setChartType(event.target.value as "line" | "bars")}>
            <option value="line">Line</option>
            <option value="bars">Bars</option>
          </select>
        </label>
        <button type="button" onClick={resetFilters}>
          <RotateCcw size={15} />
          Reset
        </button>
        <button type="button" onClick={exportCsv}>
          <Download size={15} />
          Export CSV
        </button>
      </section>

      <section className="kpi-grid" aria-label="Equipment monitoring overview">
        <div>
          <span>Records</span>
          <strong>{filteredRecords.length}</strong>
          <p>Filtered sensor rows</p>
        </div>
        <div>
          <span>Average {metricLabels[metric].label}</span>
          <strong>
            {averageMetric.toFixed(metric === "vibration" ? 2 : 1)} {metricLabels[metric].unit}
          </strong>
          <p>Across current selection</p>
        </div>
        <div>
          <span>Downtime</span>
          <strong>{downtime} min</strong>
          <p>Demo event minutes</p>
        </div>
        <div>
          <span>High alarms</span>
          <strong>{highAlarms}</strong>
          <p>Severity filter aware</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card dashboard-card--wide">
          <div className="card-heading">
            <span>Industrial trend explorer</span>
            <h2>{metricLabels[metric].label} versus time</h2>
          </div>
          {filteredRecords.length ? (
            <TrendChart records={filteredRecords} metric={metric} type={chartType} />
          ) : (
            <p className="empty-state">No records match the current filters.</p>
          )}
        </article>

        <article className="dashboard-card">
          <div className="card-heading">
            <span>Cross-filter</span>
            <h2>Status distribution</h2>
          </div>
          <StatusBars records={filteredRecords} onSelect={setStatus} />
        </article>

        <article className="dashboard-card">
          <div className="card-heading">
            <span>Alarm timeline</span>
            <h2>Recent events</h2>
          </div>
          <div className="alarm-list">
            {alarms.length ? (
              alarms.map((alarm) => (
                <button
                  key={`${alarm.equipmentId}-${alarm.timestamp}`}
                  type="button"
                  onClick={() => {
                    setEquipmentId(alarm.equipmentId);
                    setStatus(alarm.status);
                  }}
                >
                  <strong>{alarm.alarmSeverity}</strong>
                  <span>{alarm.equipmentId} / {alarm.status}</span>
                  <time>{formatTime(alarm.timestamp)}</time>
                </button>
              ))
            ) : (
              <p className="empty-state">No alarm events in this filtered view.</p>
            )}
          </div>
        </article>

        <article className="dashboard-card dashboard-card--wide">
          <div className="card-heading">
            <span>Equipment comparison</span>
            <h2>Latest filtered state</h2>
          </div>
          <div className="comparison-table" role="region" aria-label="Accessible equipment table">
            <table>
              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Section</th>
                  <th>Temperature</th>
                  <th>Vibration</th>
                  <th>Current</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {latest.map((record) => (
                  <tr key={record.equipmentId}>
                    <td>{record.equipmentId}</td>
                    <td>{record.section}</td>
                    <td>{record.temperature} C</td>
                    <td>{record.vibration} mm/s</td>
                    <td>{record.motorCurrent} A</td>
                    <td>
                      <span className={cn("status-dot", `status-dot--${record.status.toLowerCase()}`)} />
                      {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
}
