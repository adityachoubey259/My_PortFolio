import { ArrowRight, Download, Mail } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/app/Shell";
import { PremiumButton } from "@/components/app/Premium";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { profile, projects } from "@/content/profile";

const capabilities = [
  {
    title: "Software Development",
    body: "Python, web applications, backend logic and practical tools built around real workflow needs.",
  },
  {
    title: "AI & Automation",
    body: "AI-assisted development, prompt engineering, n8n workflows and intelligent process automation.",
  },
  {
    title: "Industrial Technology",
    body: "Industrial monitoring, device communication and hardware-software integration concepts.",
  },
];

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <Shell>
      <section className="home-hero home-hero--v6">
        <div className="home-hero-copy">
          <span className="os-eyebrow">ADITYA OS / Personal Portfolio</span>
          <h1>
            <span>ADITYA</span>
            <span>CHOUBEY</span>
          </h1>
          <p className="home-role">AI Automation &amp; Software Developer</p>
          <p className="home-description">Building intelligent software, automation workflows and connected systems for real-world challenges.</p>
          <div className="home-actions">
            <PremiumButton href="/projects">
              Explore My Projects <ArrowRight size={16} />
            </PremiumButton>
            <PremiumButton href={profile.resume.href} variant="secondary" download="Aditya-Choubey-Resume.pdf">
              <Download size={16} /> Download Resume
            </PremiumButton>
            <Link className="text-link-cta" href="/contact">
              Get in Touch <Mail size={15} />
            </Link>
          </div>
        </div>
        <div className="signature-object signature-object--calm" aria-label="Premium technical visual">
          <div className="signature-orbit signature-orbit--one" />
          <div className="signature-orbit signature-orbit--two" />
          <div className="signature-core">
            <span>SOFTWARE</span>
            <strong>AI + AUTOMATION</strong>
            <em>CONNECTED SYSTEMS</em>
          </div>
          <i />
        </div>
      </section>

      <section className="home-section home-section--v6">
        <div className="section-kicker">
          <span>Featured projects</span>
          <Link href="/projects">
            View all projects <ArrowRight size={15} />
          </Link>
        </div>
        <div className="featured-grid featured-grid--simple">
          {featured.map((project) => (
            <Link className="featured-project" href={`/work/${project.slug}`} key={project.slug}>
              <ProjectVisual project={project} />
              <div>
                <span>{project.company}</span>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <strong>
                  View Project <ArrowRight size={15} />
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="what-i-do">
        <div>
          <span className="os-eyebrow">What I do</span>
          <h2>Practical software work with an engineering mindset.</h2>
        </div>
        <div className="capability-editorial">
          {capabilities.map((capability) => (
            <article key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-preview-v6">
        <div>
          <span className="os-eyebrow">About</span>
          <h2>Curious about the space between software, automation and industrial systems.</h2>
        </div>
        <p>
          Aditya is a third-year Electrical &amp; Electronics Engineering student at LNCT Bhopal / RGPV, building practical software,
          automation workflows and connected-system ideas through real project exposure.
        </p>
        <Link href="/about">
          Read About Me <ArrowRight size={15} />
        </Link>
      </section>

      <section className="minimal-cta minimal-cta--v6">
        <span>Have an idea worth building?</span>
        <h2>Let&apos;s turn it into a clear, useful system.</h2>
        <div>
          <Link href="/contact">Get in Touch</Link>
          <a href={profile.resume.href} download="Aditya-Choubey-Resume.pdf">Download Resume</a>
        </div>
      </section>
    </Shell>
  );
}
