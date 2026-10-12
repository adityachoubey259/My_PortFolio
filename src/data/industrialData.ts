import type { Equipment, SensorRecord } from "@/types/analytics";

export const equipmentList: Equipment[] = [
  { id: "EQ-101", name: "Press Line Motor", section: "Forming" },
  { id: "EQ-204", name: "Cooling Pump", section: "Utilities" },
  { id: "EQ-318", name: "Conveyor Drive", section: "Assembly" },
  { id: "EQ-412", name: "Compressor Unit", section: "Air System" },
];

const baseTime = new Date("2026-10-11T00:00:00+05:30").getTime();

function wave(seed: number, index: number, scale: number) {
  return Math.sin((index + seed) * 0.41) * scale + Math.cos((index + seed) * 0.17) * (scale / 2);
}

function round(value: number, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export const sensorRecords: SensorRecord[] = equipmentList.flatMap((equipment, equipmentIndex) =>
  Array.from({ length: 72 }, (_, index) => {
    const hour = index + 1;
    const timestamp = new Date(baseTime - (72 - hour) * 60 * 60 * 1000).toISOString();
    const load = 1 + equipmentIndex * 0.09;
    const attentionCycle = (index + equipmentIndex * 5) % 23 === 0;
    const faultCycle = (index + equipmentIndex * 7) % 41 === 0;
    const idleCycle = (index + equipmentIndex * 3) % 17 === 0;
    const status = faultCycle ? "Fault" : attentionCycle ? "Attention" : idleCycle ? "Idle" : "Running";
    const temperature = round(48 + equipmentIndex * 4 + wave(equipmentIndex + 2, index, 5) + (faultCycle ? 9 : 0));
    const vibration = round(1.4 + equipmentIndex * 0.28 + wave(equipmentIndex + 6, index, 0.35) + (attentionCycle ? 0.75 : 0), 2);
    const motorCurrent = round(18 * load + wave(equipmentIndex + 8, index, 2.2) + (idleCycle ? -7 : 0), 1);

    return {
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      section: equipment.section,
      timestamp,
      temperature,
      vibration,
      motorCurrent,
      status,
      alarmSeverity: faultCycle ? "High" : attentionCycle ? "Medium" : idleCycle ? "Low" : "None",
      runtimeHours: status === "Running" || status === "Attention" ? 1 : 0,
      downtimeMinutes: status === "Fault" ? 38 : status === "Idle" ? 12 : 0,
    };
  }),
);

export const metricLabels = {
  temperature: { label: "Temperature", unit: "C" },
  vibration: { label: "Vibration", unit: "mm/s" },
  motorCurrent: { label: "Motor current", unit: "A" },
} as const;
