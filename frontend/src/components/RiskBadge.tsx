import type { DangerLevel } from "../types/emergency";

const STYLES: Record<DangerLevel, string> = {
  low: "bg-success/10 text-success border-success/30",
  moderate: "bg-warning/10 text-warning border-warning/30",
  high: "bg-danger/10 text-danger border-danger/30",
  critical: "bg-danger text-white border-danger",
};

const LABELS: Record<DangerLevel, string> = {
  low: "Low risk",
  moderate: "Moderate risk",
  high: "High risk",
  critical: "Critical — act now",
};

export default function RiskBadge({ level }: { level: DangerLevel }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold font-display ${STYLES[level]}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          level === "critical" ? "bg-white" : "bg-current"
        } ${level === "critical" ? "" : "animate-pulse"}`}
      />
      {LABELS[level]}
    </span>
  );
}
