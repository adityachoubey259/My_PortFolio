"use client";

import { Pause, Play, RotateCcw, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Rs485Studio() {
  const [paused, setPaused] = useState(false);
  const [fault, setFault] = useState(false);
  const [pollInterval, setPollInterval] = useState(800);
  const [log, setLog] = useState<string[]>([
    "Simulation ready",
    "RS485 physical layer shown separately from Modbus RTU framing",
  ]);

  function addLog(entry: string) {
    setLog((current) => [entry, ...current].slice(0, 8));
  }

  return (
    <div className="mini-app rs485-studio">
      <section className="rs-layout">
        <div className="app-window signal-architecture">
          <span className="simulation-label">Simulation / no hardware connection</span>
          {["Sensor device", "RS485 bus", "Protocol frame", "Processing", "Dashboard"].map((node) => (
            <button key={node} type="button" onClick={() => addLog(`Inspected ${node}`)}>
              <span />
              {node}
            </button>
          ))}
        </div>

        <div className={cn("app-window signal-stage", paused && "is-paused", fault && "has-fault")}>
          <div className="signal-canvas">
            <i style={{ animationDuration: `${pollInterval}ms` }} />
            <strong>{fault ? "CRC fault simulated" : paused ? "Polling paused" : "Polling active"}</strong>
            <p>Example activity is illustrative and does not represent a browser connection to RS485 hardware.</p>
          </div>
          <div className="app-toolbar">
            <button type="button" onClick={() => { setPaused((value) => !value); addLog(paused ? "Simulation resumed" : "Simulation paused"); }}>
              {paused ? <Play size={15} /> : <Pause size={15} />}
              {paused ? "Resume" : "Pause"}
            </button>
            <button type="button" onClick={() => { setFault((value) => !value); addLog(fault ? "Fault cleared" : "CRC mismatch simulated"); }}>
              <Zap size={15} />
              {fault ? "Clear fault" : "Simulate error"}
            </button>
            <button type="button" onClick={() => { setFault(false); setPaused(false); setPollInterval(800); setLog(["Simulation reset"]); }}>
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        </div>

        <aside className="app-window device-panel">
          <h2>Device status</h2>
          <div className="status-stack">
            <span className={cn("status-indicator", fault ? "status-indicator--fault" : "status-indicator--ok")} />
            <strong>{fault ? "Frame requires review" : "Device polling nominal"}</strong>
          </div>
          <label>
            Polling interval: {pollInterval} ms
            <input
              type="range"
              min="450"
              max="1600"
              step="50"
              value={pollInterval}
              onChange={(event) => {
                setPollInterval(Number(event.target.value));
                addLog(`Polling interval changed to ${event.target.value} ms`);
              }}
            />
          </label>
          <div className="packet-panel">
            <span>Illustrative Modbus RTU-style frame</span>
            <code>{fault ? "01 03 00 ?? CRC ERROR" : "01 03 00 2A 00 02 E4 0B"}</code>
            <p>{fault ? "CRC mismatch is simulated for learning." : "Device 01 reads two holding registers starting at address 0x002A."}</p>
          </div>
        </aside>
      </section>

      <section className="app-window event-console">
        <h2>Technical event log</h2>
        <ol>
          {log.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
