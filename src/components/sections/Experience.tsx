import { Building2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/content/profile";

export function Experience() {
  return (
    <section className="page-section experience-section" id="experience">
      <SectionHeader
        eyebrow="Experience"
        title="A focused timeline of real industrial software and automation exposure."
      />
      <div className="timeline">
        {experience.map((item, index) => (
          <Reveal className="timeline-item" key={item.company} delay={index * 0.06}>
            <div className="timeline-marker">
              <Building2 size={18} />
            </div>
            <div className="timeline-card">
              <span>{item.duration}</span>
              <h3>{item.company}</h3>
              <p>{item.focus}</p>
              <div className="tag-row">
                {item.associations.map((association) => (
                  <span key={association}>{association}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
