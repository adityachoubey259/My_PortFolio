import { FlaskConical } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { labItems } from "@/content/profile";

export function Lab() {
  return (
    <section className="page-section lab-section">
      <SectionHeader
        eyebrow="Engineering lab"
        title="Currently exploring and strengthening the technical base."
        description="Includes approximately 1-2 month learning workshops around PCB design, cybersecurity, deployment, domains and DBMS."
      />
      <div className="lab-grid">
        {labItems.map((item, index) => (
          <Reveal className="lab-card" key={item} delay={index * 0.03}>
            <FlaskConical size={18} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
