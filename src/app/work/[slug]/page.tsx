import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/app/Shell";
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
          <Link href="/#work" className="back-link">
            <ArrowLeft size={16} />
            Back to work
          </Link>
          <div>
            <span className="eyebrow">{project.company}</span>
            <h1>{project.title}</h1>
            <p>{detail.headline}</p>
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

        <section className="architecture-narrative">
          <blockquote>{detail.quote}</blockquote>
          <div>
            <span className="eyebrow">Architecture illustration</span>
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
            <h2>Technical considerations</h2>
            <ul>
              {detail.considerations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
            <h2>Editable fields</h2>
            <p>These are intentionally left as future content slots until exact verified details are supplied.</p>
            <div className="tag-row">
              {detail.editableFields.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </section>

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
                Open related playground
                <ArrowUpRight size={15} />
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </Shell>
  );
}
