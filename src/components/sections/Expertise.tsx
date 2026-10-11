"use client";

import { Cpu, Layers3, Network, Wrench } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillCategories } from "@/content/profile";
import { cn } from "@/lib/utils";

const icons = [Cpu, Network, Layers3, Wrench];

export function Expertise() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];

  return (
    <section className="page-section expertise-section" id="expertise">
      <SectionHeader
        eyebrow="Expertise"
        title="A calm competency map, with current learning clearly separated from demonstrated work."
      />
      <div className="expertise-grid">
        <Reveal className="category-rail">
          {skillCategories.map((item, index) => {
            const Icon = icons[index];
            return (
              <button
                type="button"
                className={cn("category-button", active === index && "is-active")}
                key={item.title}
                onClick={() => setActive(index)}
              >
                <Icon size={18} />
                <span>{item.eyebrow}</span>
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
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
