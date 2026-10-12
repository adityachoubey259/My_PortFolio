"use client";

import { BrainCircuit, Code2, Cpu, GraduationCap, Network } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/content/profile";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Programming",
    status: "Mixed",
    icon: Code2,
    skills: ["Python", "JavaScript", "HTML", "CSS", "PostgreSQL", "SQL / DBMS", "DSA", "C++ - currently learning"],
  },
  {
    title: "AI and Automation",
    status: "Demonstrated",
    icon: BrainCircuit,
    skills: ["AI/ML fundamentals", "Prompt Engineering", "AI Productivity", "n8n", "Workflow Automation", "Data Analysis", "Power BI"],
  },
  {
    title: "Industrial Technology",
    status: "Applied + learning",
    icon: Cpu,
    skills: ["RS485 integration", "Industrial monitoring concepts", "Hardware/software integration"],
  },
  {
    title: "Current Learning",
    status: "Learning",
    icon: GraduationCap,
    skills: ["PLC", "HMI", "SCADA", "Drone electronics", "Drone assembly", "Drone programming", "C++"],
  },
  {
    title: "Development Exposure",
    status: "Exposure",
    icon: Network,
    skills: ["APIs", "Git / GitHub", "Deployment", "Domains", "PCB design workshop exposure", "Cybersecurity workshop exposure"],
  },
];

const skillProjectMap: Record<string, string[]> = {
  Python: ["Python-Based Website System", "n8n Workflow Automation"],
  JavaScript: ["XecroAI", "ITL Checklist"],
  "n8n": ["n8n Workflow Automation"],
  "Workflow Automation": ["n8n Workflow Automation"],
  "RS485 integration": ["RS485 Industrial Monitoring"],
  "Industrial monitoring concepts": ["RS485 Industrial Monitoring", "ITL Checklist"],
  "Hardware/software integration": ["RS485 Industrial Monitoring"],
  "Power BI": ["RS485 Industrial Monitoring"],
  "Data Analysis": ["RS485 Industrial Monitoring", "XecroAI"],
  "Git / GitHub": projects.map((project) => project.title),
  APIs: ["n8n Workflow Automation", "Python-Based Website System"],
};

export function Expertise() {
  const [active, setActive] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState("Python");
  const category = categories[active];
  const relatedProjects = skillProjectMap[selectedSkill] ?? [];

  return (
    <section className="page-section expertise-section" id="expertise">
      <SectionHeader
        eyebrow="Expertise"
        title="A calm competency map, with current learning clearly separated from demonstrated work."
      />
      <div className="expertise-grid">
        <Reveal className="category-rail">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                className={cn("category-button", active === index && "is-active")}
                key={item.title}
                onClick={() => {
                  setActive(index);
                  setSelectedSkill(item.skills[0]);
                }}
              >
                <Icon size={18} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <em>{item.status}</em>
              </button>
            );
          })}
        </Reveal>
        <Reveal className="skill-system" delay={0.08}>
          <div className="system-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="status-pill">{category.status}</span>
          <h3>{category.title}</h3>
          <div className="skill-cloud" aria-live="polite">
            {category.skills.map((skill) => (
              <button
                key={skill}
                type="button"
                className={cn(selectedSkill === skill && "is-active")}
                onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="skill-association" aria-live="polite">
            <span>Selected capability</span>
            <strong>{selectedSkill}</strong>
            {relatedProjects.length ? (
              <div className="project-highlight-list">
                {projects.map((project) => (
                  <a
                    key={project.slug}
                    className={cn(relatedProjects.includes(project.title) && "is-linked")}
                    href={`/work/${project.slug}`}
                  >
                    {project.title}
                  </a>
                ))}
              </div>
            ) : (
              <p>This is shown as learning or exposure until a specific verified project connection is added.</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
