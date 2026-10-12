import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/app/Shell";
import { GlossyCard, PageHeader } from "@/components/app/Premium";

export const metadata = {
  title: "Skills | ADITYA OS",
  description: "Interactive capability overview for Aditya Choubey.",
};

const capabilities = [
  {
    title: "Software Development",
    status: "Demonstrated + learning",
    skills: ["Python", "JavaScript", "HTML", "CSS", "PostgreSQL", "SQL / DBMS", "DSA", "C++ - currently learning"],
    context: "Used across software projects, backend-oriented logic, UI implementation and structured data work.",
    projects: ["Python Website System", "XecroAI", "ITL Checklist"],
  },
  {
    title: "AI and Automation",
    status: "Demonstrated",
    skills: ["AI/ML fundamentals", "Prompt Engineering", "AI Productivity", "n8n", "Workflow Automation", "Data Analysis"],
    context: "Applied to automation thinking, workflow routing, AI-assisted development and practical productivity systems.",
    projects: ["n8n Workflow Automation", "XecroAI"],
  },
  {
    title: "Industrial Technology",
    status: "Applied + advancing",
    skills: ["RS485 integration", "Industrial monitoring concepts", "Hardware/software integration"],
    context: "Connected-system thinking around device communication, monitoring surfaces and industrial workflows.",
    projects: ["RS485 Industrial Monitoring", "ITL Checklist"],
  },
  {
    title: "Data and Analytics",
    status: "Demonstrated through portfolio lab",
    skills: ["Power BI thinking", "Dashboard design", "Synthetic data modeling", "CSV export", "Status filtering"],
    context: "Presented through the Industrial Intelligence Studio demonstration with deterministic records.",
    projects: ["Industrial Intelligence Studio"],
  },
  {
    title: "Currently Learning",
    status: "Learning",
    skills: ["PLC", "HMI", "SCADA", "Drone electronics", "Drone assembly", "Drone programming", "C++"],
    context: "Clearly marked as active learning and advancing practical knowledge, not represented as mastered.",
    projects: ["Engineering Lab"],
  },
];

export default function SkillsPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Profile / Skills"
        title="Capability explorer without fake percentages."
        description="Skills are grouped by practical context, project relevance and honest learning status."
      />
      <div className="capability-grid">
        {capabilities.map((capability) => (
          <GlossyCard className="capability-card" key={capability.title}>
            <span>{capability.status}</span>
            <h2>{capability.title}</h2>
            <p>{capability.context}</p>
            <div className="skill-chip-grid">
              {capability.skills.map((skill) => (
                <button key={skill} type="button">{skill}</button>
              ))}
            </div>
            <div className="related-mini">
              {capability.projects.map((project) => (
                <small key={project}>{project}</small>
              ))}
            </div>
          </GlossyCard>
        ))}
      </div>
      <section className="minimal-cta">
        <span>Want proof of interaction?</span>
        <h2>Open the analytics and playground apps to see the skills in motion.</h2>
        <Link href="/playground">
          Launch playground <ArrowUpRight size={16} />
        </Link>
      </section>
    </Shell>
  );
}
