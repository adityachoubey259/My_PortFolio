import { ArrowRight } from "lucide-react";
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
    status: "Practical toolkit",
    skills: ["Python", "JavaScript", "HTML", "CSS", "PostgreSQL", "APIs", "DSA"],
    context: "Used for web applications, backend-oriented logic, interfaces and structured data work.",
    projects: ["Python Website System", "XecroAI", "ITL Checklist"],
  },
  {
    title: "AI & Automation",
    status: "Applied learning",
    skills: ["AI/ML fundamentals", "Prompt Engineering", "n8n", "AI-assisted development", "Data Analysis"],
    context: "Applied to automation thinking, workflow routing, AI-assisted development and practical productivity systems.",
    projects: ["n8n Workflow Automation", "XecroAI"],
  },
  {
    title: "Industrial Systems",
    status: "Project exposure",
    skills: ["RS485", "Industrial monitoring", "Hardware-software integration"],
    context: "Connected-system thinking around device communication, monitoring surfaces and industrial workflows.",
    projects: ["RS485 Industrial Monitoring", "ITL Checklist"],
  },
  {
    title: "Currently Learning",
    status: "Learning",
    skills: ["C++", "PLC", "HMI", "SCADA", "Drone technology"],
    context: "Clearly marked as active learning and advancing practical knowledge, not represented as mastered.",
    projects: ["Learning Lab"],
  },
  {
    title: "Additional Technical Exposure",
    status: "Exposure",
    skills: ["PCB design", "Cybersecurity fundamentals", "Deployment", "Domains", "DBMS"],
    context: "Supporting areas that help connect software work with deployment, infrastructure and engineering fundamentals.",
    projects: ["Data Analytics Demo", "Learning Lab"],
  },
];

export default function SkillsPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Skills"
        title="A clear technical toolkit without fake percentages."
        description="Essential skills are visible immediately, with learning areas clearly labeled."
      />
      <div className="capability-grid capability-grid--simple">
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
        <span>Want to explore deeper?</span>
        <h2>Open the interactive demos for checklist, RS485, automation and data dashboard examples.</h2>
        <Link href="/playground">
          View Interactive Demos <ArrowRight size={16} />
        </Link>
      </section>
    </Shell>
  );
}
