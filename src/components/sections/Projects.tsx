import { ArrowUpRight, BadgeCheck, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/content/profile";
import { ProjectVisual } from "./ProjectVisual";

export function Projects() {
  return (
    <section className="page-section work-section" id="work">
      <SectionHeader
        eyebrow="Selected work"
        title="Five practical systems, presented as an editorial engineering record."
        description="Concept visuals are labeled clearly. No fabricated metrics, links, screenshots or production claims are included."
      />
      <div className="project-stack" aria-label="Selected project case studies">
        {projects.map((project, index) => (
          <Reveal className={index === 0 ? "project-case project-case--feature" : "project-case"} key={project.title} delay={index * 0.04}>
            <div className="project-meta">
              <span>{project.number}</span>
              <p>{project.company}</p>
            </div>
            <ProjectVisual project={project} />
            <div className="project-content">
              <span className="case-label">Case study</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="case-columns">
                <div>
                  <strong>Use case</strong>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <strong>Contribution</strong>
                  <p>{project.contribution}</p>
                </div>
              </div>
              <ul className="feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <BadgeCheck size={15} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="case-footer">
                <p>{project.note}</p>
                <a href="#contact" aria-label={`Discuss ${project.title}`}>
                  Discuss details <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="beyond-work">
        <span>Beyond the Featured Work</span>
        <p>
          Aditya has also worked on several smaller software, automation and experimentation projects. This area is
          ready for verified names, links and screenshots as they become available.
        </p>
        <ChevronRight size={18} aria-hidden="true" />
      </Reveal>
    </section>
  );
}
