import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/app/Shell";
import { ProjectEvidenceStudio } from "@/components/projects/ProjectEvidenceStudio";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { getProjectBySlug, getProjectDetail } from "@/content/projectDetails";
import { projects } from "@/content/profile";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: project ? `${project.title} | Aditya Choubey` : "Project | Aditya Choubey",
    description: project?.summary ?? "Project case study by Aditya Choubey.",
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const detail = getProjectDetail(slug);

  if (!project || !detail) notFound();

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <Shell>
      <main className="case-study-page">
        <section className="case-hero">
          <Link href="/projects" className="back-link">
            <ArrowLeft size={16} />
            Back to projects
          </Link>
          <div>
            <span className="eyebrow">{project.company}</span>
            <h1>{project.title}</h1>
            <p>{detail.headline}</p>
            <div className="case-hero-actions">
              {project.demoHref ? (
                <Link href={project.demoHref}>
                  Try Interactive Demo <ArrowUpRight size={15} />
                </Link>
              ) : null}
              <a href="#technical-details">Explore Technical Details</a>
              <a href="#evidence-title">View System Architecture</a>
            </div>
          </div>
          <ProjectVisual project={project} />
        </section>

        <section className="case-story-grid">
          <article className="case-story-card">
            <span>Problem</span>
            <p>{project.problem}</p>
          </article>
          <article className="case-story-card">
            <span>My contribution</span>
            <p>{project.contribution}</p>
          </article>
          <article className="case-story-card case-story-card--wide">
            <span>Verified context</span>
            <p>{detail.context}</p>
          </article>
        </section>

        <section className="architecture-narrative" id="technical-details">
          <blockquote>{detail.quote}</blockquote>
          <div>
            <span className="eyebrow">View System Architecture</span>
            <div className="case-architecture-flow">
              {detail.architecture.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="case-deep-dive">
          <article>
            <h2>Functional overview</h2>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
          <article>
            <details open>
              <summary>Technologies and implementation details</summary>
              <ul>
                {detail.considerations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          </article>
          <article>
            <h2>Challenges and learning</h2>
            <p>{detail.learning}</p>
            <div className="tag-row">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
          <article>
            <h2>Future evidence slots</h2>
            <p>These are intentionally left as future content slots until exact verified details are supplied.</p>
            <div className="tag-row">
              {detail.editableFields.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </section>

        <ProjectEvidenceStudio project={project} />

        <section className="related-work">
          <span className="eyebrow">Related work</span>
          <div>
            {related.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`}>
                {item.title}
                <ArrowUpRight size={15} />
              </Link>
            ))}
            {project.demoHref ? (
              <Link href={project.demoHref}>
                Try Interactive Demo
                <ArrowUpRight size={15} />
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </Shell>
  );
}
