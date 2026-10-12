import { Download, Github, Mail } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/app/Shell";
import { GlassPanel, PageHeader } from "@/components/app/Premium";
import { education, experience, profile, projects } from "@/content/profile";

export const metadata = {
  title: "Recruiter View | ADITYA OS",
  description: "Fast professional summary, skills, projects, experience and contact for Aditya Choubey.",
};

export default function RecruiterPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Connect / Recruiter"
        title="A focused hiring summary with the signal brought forward."
        description="Readable, fast and intentionally conservative: no invented dates, metrics or seniority."
        actions={
          <>
            <a className="premium-button" href={profile.resume.href} download="Aditya-Choubey-Resume.pdf">
              <Download size={16} /> Resume
            </a>
            <a className="premium-button premium-button--secondary" href={`mailto:${profile.email}`}>
              <Mail size={16} /> Email
            </a>
          </>
        }
      />
      <div className="recruiter-v4-grid">
        <GlassPanel>
          <h2>About</h2>
          <p>
            Electrical & Electronics Engineering student building practical software, AI automation workflows and
            industrial technology interfaces.
          </p>
        </GlassPanel>
        <GlassPanel>
          <h2>Strongest verified skills</h2>
          <ul>
            <li>Python, JavaScript, HTML, CSS and SQL/DBMS fundamentals</li>
            <li>Prompt engineering, AI productivity and n8n automation concepts</li>
            <li>Industrial monitoring concepts and hardware/software integration</li>
          </ul>
        </GlassPanel>
        <GlassPanel className="wide-panel">
          <h2>Top projects</h2>
          <div className="recruiter-project-row">
            {projects.slice(0, 3).map((project) => (
              <Link href={`/work/${project.slug}`} key={project.slug}>
                <span>{project.number}</span>
                <strong>{project.title}</strong>
                <p>{project.summary}</p>
              </Link>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="wide-panel">
          <h2>Experience</h2>
          <div className="compact-timeline">
            {experience.map((item) => (
              <div key={item.company}>
                <span>{item.duration}</span>
                <strong>{item.company}</strong>
                <p>{item.focus}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
        <GlassPanel>
          <h2>Education</h2>
          <p>{education.degree}</p>
          <p>{education.institute}</p>
          <p>{education.status}. {education.graduation}.</p>
        </GlassPanel>
        <GlassPanel>
          <h2>Contact</h2>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={16} /> {profile.githubLabel}
          </a>
        </GlassPanel>
      </div>
    </Shell>
  );
}
