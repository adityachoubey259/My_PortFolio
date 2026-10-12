import { Shell } from "@/components/app/Shell";
import { GlossyCard, PageHeader } from "@/components/app/Premium";

export const metadata = {
  title: "Learning Lab | ADITYA OS",
  description: "Learning areas and experimental workspace for Aditya Choubey.",
};

const labAreas = [
  "PCB design",
  "Cybersecurity",
  "Deployment",
  "DBMS",
  "Domains",
  "PLC / HMI / SCADA",
  "Drone systems",
  "C++",
];

export default function LabPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Learning Lab"
        title="Current learning areas and technical exposure."
        description="This page avoids invented certifications. It marks verified workshop exposure and ongoing learning areas as exactly that."
      />
      <div className="lab-v4-grid">
        {labAreas.map((area, index) => (
          <GlossyCard className="lab-v4-card" key={area}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{area}</h2>
            <p>{index < 5 ? "Workshop exposure or practical fundamentals area." : "Currently learning and advancing practical knowledge."}</p>
          </GlossyCard>
        ))}
      </div>
    </Shell>
  );
}
