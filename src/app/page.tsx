import { ArrowRight, Download, Gauge, PanelsTopLeft, Sparkles, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/app/Shell";
import { GlossyCard, PremiumButton } from "@/components/app/Premium";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { profile, projects } from "@/content/profile";

const launchers = [
  {
    title: "Analytics Studio",
    href: "/analytics",
    icon: Gauge,
    body: "Synthetic industrial monitoring dashboard with filtering and CSV export.",
  },
  {
    title: "Engineering Playground",
    href: "/playground",
    icon: PanelsTopLeft,
    body: "Launch the checklist, RS485 and automation simulation apps.",
  },
  {
    title: "Skills Explorer",
    href: "/skills",
    icon: Sparkles,
    body: "Explore capabilities, learning areas and related projects.",
  },
  {
    title: "Recruiter View",
    href: "/recruiter",
    icon: UserRoundSearch,
    body: "A fast professional overview for hiring managers.",
  },
];

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <Shell>
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="os-eyebrow">ADITYA OS / Interactive Engineering Portfolio</span>
          <h1>
            <span>ADITYA</span>
            <span>CHOUBEY.</span>
          </h1>
          <p className="home-role">AI Automation &amp; Software Developer</p>
          <p className="home-description">Engineering intelligent software, automation workflows and connected systems.</p>
          <div className="home-actions">
            <PremiumButton href="/projects">
              Explore Projects <ArrowRight size={16} />
            </PremiumButton>
            <PremiumButton href="/playground" variant="secondary">
              Launch Workspace
            </PremiumButton>
            <PremiumButton href={profile.resume.href} variant="secondary" download="Aditya-Choubey-Resume.pdf">
              <Download size={16} /> Download Resume
            </PremiumButton>
          </div>
        </div>
        <div className="signature-object" aria-label="Interactive technical sculpture">
          <div className="signature-orbit signature-orbit--one" />
          <div className="signature-orbit signature-orbit--two" />
          <div className="signature-core">
            <span>SOFTWARE</span>
            <strong>AI + AUTOMATION</strong>
            <em>DATA / HARDWARE</em>
          </div>
          <i />
        </div>
      </section>

      <section className="home-section">
        <div className="section-kicker">
          <span>Featured work</span>
          <Link href="/projects">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((project) => (
            <Link className="featured-project" href={`/work/${project.slug}`} key={project.slug}>
              <ProjectVisual project={project} />
              <div>
                <span>{project.company}</span>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-kicker">
          <span>Explore workspace</span>
        </div>
        <div className="launcher-grid">
          {launchers.map((launcher) => {
            const Icon = launcher.icon;
            return (
              <GlossyCard key={launcher.href} className="launcher-card">
                <Icon size={22} />
                <h2>{launcher.title}</h2>
                <p>{launcher.body}</p>
                <Link href={launcher.href}>
                  Open <ArrowRight size={15} />
                </Link>
              </GlossyCard>
            );
          })}
        </div>
      </section>

      <section className="minimal-cta">
        <span>Available from Bhopal, Madhya Pradesh</span>
        <h2>Let&apos;s build a practical system that feels exceptional.</h2>
        <Link href="/contact">
          Start a conversation <ArrowRight size={16} />
        </Link>
      </section>
    </Shell>
  );
}
