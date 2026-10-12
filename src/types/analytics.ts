export type EquipmentStatus = "Running" | "Idle" | "Attention" | "Fault";
export type AlarmSeverity = "None" | "Low" | "Medium" | "High";
export type SensorMetric = "temperature" | "vibration" | "motorCurrent";

export type Equipment = {
  id: string;
  name: string;
  section: string;
};

export type SensorRecord = {
  equipmentId: string;
  equipmentName: string;
  section: string;
  timestamp: string;
  temperature: number;
  vibration: number;
  motorCurrent: number;
  status: EquipmentStatus;
  alarmSeverity: AlarmSeverity;
  runtimeHours: number;
  downtimeMinutes: number;
};
