import { CircuitBoard, GraduationCap, Hammer, Lightbulb, Repeat2, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education } from "@/content/profile";

const principles = [
  { icon: Hammer, text: "Turning real requirements into working applications" },
  { icon: Repeat2, text: "Debugging and improving through iteration" },
  { icon: CircuitBoard, text: "Exploring integration between hardware and software" },
  { icon: Lightbulb, text: "Using AI and prompt engineering productively" },
  { icon: Wrench, text: "Adapting quickly to unfamiliar technologies" },
];

export function About() {
  return (
    <section className="page-section about-section" id="about">
      <SectionHeader
        eyebrow="About"
        title="An engineering student building at the intersection of software, automation and industrial systems."
      />
      <div className="about-grid">
        <Reveal className="about-story">
          <p>
            Aditya is an Electrical & Electronics Engineering student with hands-on experience across software
            applications, industrial automation contexts, AI-assisted development and workflow systems.
          </p>
          <p>
            His work is grounded in practical implementation: understanding requirements, building the first useful
            version, testing the behavior, and improving it through careful iteration.
          </p>
          <blockquote>I don&apos;t just explore technology. I build with it.</blockquote>
        </Reveal>

        <Reveal className="education-panel" delay={0.1}>
          <GraduationCap size={28} />
          <span>Education</span>
          <h3>{education.degree}</h3>
          <p>{education.institute}</p>
          <ul>
            <li>{education.status}</li>
            <li>{education.graduation}</li>
          </ul>
        </Reveal>
      </div>

      <div className="principle-grid">
        {principles.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.text} className="principle-item" delay={index * 0.04}>
              <Icon size={18} />
              <span>{item.text}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
