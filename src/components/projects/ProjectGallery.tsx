"use client";

import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { projects } from "@/content/profile";
import { cn } from "@/lib/utils";

const categories = ["All", "AI Software", "Industrial Applications", "Automation", "Hardware Integration", "Web Development"] as const;

const projectCategories: Record<string, Array<(typeof categories)[number]>> = {
  xecroai: ["AI Software", "Industrial Applications"],
  "itl-checklist": ["Industrial Applications"],
  "rs485-industrial-monitoring": ["Hardware Integration", "Industrial Applications"],
  "n8n-workflow-automation": ["Automation", "AI Software"],
  "python-website-system": ["Web Development", "Automation"],
};

export function ProjectGallery() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesSearch = !search || `${project.title} ${project.company} ${project.summary} ${project.stack.join(" ")}`.toLowerCase().includes(search);
      const matchesCategory = category === "All" || projectCategories[project.slug]?.includes(category);
      return matchesSearch && matchesCategory;
    });
  }, [category, query]);

  return (
    <div className="project-gallery">
      <div className="floating-toolbar">
        <label>
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." />
        </label>
        <div className="category-tabs" aria-label="Project categories">
          {categories.map((item) => (
            <button key={item} type="button" className={cn(category === item && "is-active")} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid-v4">
        {filtered.map((project, index) => (
          <Link className={cn("project-preview", index === 0 && "project-preview--featured")} href={`/work/${project.slug}`} key={project.slug}>
            <ProjectVisual project={project} />
            <div className="project-preview-copy">
              <span>{project.company}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <div className="tag-row">
                {(projectCategories[project.slug] ?? []).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <strong>
                Open case study <ArrowUpRight size={15} />
              </strong>
            </div>
          </Link>
        ))}
      </div>

      {!filtered.length ? <p className="empty-state">No projects match this view.</p> : null}
    </div>
  );
}
