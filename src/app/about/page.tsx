import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/app/Shell";
import { GlassPanel, PageHeader } from "@/components/app/Premium";
import { education, profile } from "@/content/profile";

export const metadata = {
  title: "About | ADITYA OS",
  description: "About Aditya Choubey, AI Automation and Software Developer.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="About"
        title="Software, automation and engineering curiosity in one practical direction."
        description="A simple introduction to Aditya's background, interests and working style."
      />
      <section className="about-v6">
        <GlassPanel className="about-v6-intro">
          <span>{profile.location}</span>
          <h2>{profile.name}</h2>
          <p>
            I am focused on building useful software, automation workflows and connected-system ideas that solve real problems. My engineering
            education gives me a hardware-aware view of software, while my project work keeps the focus practical.
          </p>
          <p>
            I use AI productively as a development and thinking tool, especially for faster exploration, workflow design and clearer implementation.
            The goal is not hype; it is better systems, cleaner logic and more useful outcomes.
          </p>
          <div className="about-actions">
            <Link href="/projects">
              View Projects <ArrowRight size={15} />
            </Link>
            <a href={profile.resume.href} download="Aditya-Choubey-Resume.pdf">
              <Download size={15} />
              Download Resume
            </a>
          </div>
        </GlassPanel>
        <div className="about-v6-grid">
          <GlassPanel>
            <span>Education</span>
            <h3>{education.degree}</h3>
            <p>{education.institute}</p>
            <p>{education.status}. {education.graduation}.</p>
          </GlassPanel>
          <GlassPanel>
            <span>Focus</span>
            <h3>AI automation and practical software</h3>
            <p>Web applications, backend logic, workflow automation, industrial monitoring concepts and hardware-software integration.</p>
          </GlassPanel>
          <GlassPanel>
            <span>Approach</span>
            <h3>Clear, honest and useful</h3>
            <p>Verified project information, conservative claims and interfaces designed to make technical work easy to understand.</p>
          </GlassPanel>
        </div>
      </section>
    </Shell>
  );
}
