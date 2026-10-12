import { Shell } from "@/components/app/Shell";
import { GlassPanel, PageHeader } from "@/components/app/Premium";
import { education, experience } from "@/content/profile";

export const metadata = {
  title: "Experience | ADITYA OS",
  description: "Professional experience and education timeline for Aditya Choubey.",
};

export default function ExperiencePage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Profile / Experience"
        title="Career timeline and education, presented without inflated claims."
        description="Focused exposure across industrial software, automation, Python development and engineering education."
      />
      <div className="experience-v4">
        {experience.map((item) => (
          <GlassPanel className="experience-node" key={item.company}>
            <span>{item.duration}</span>
            <h2>{item.company}</h2>
            <p>{item.focus}</p>
            <div className="tag-row">
              {item.associations.map((association) => (
                <span key={association}>{association}</span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
      <GlassPanel className="education-v4">
        <span>Education</span>
        <h2>{education.degree}</h2>
        <p>{education.institute}</p>
        <p>{education.status}. {education.graduation}.</p>
      </GlassPanel>
    </Shell>
  );
}
