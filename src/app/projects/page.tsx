import { Shell } from "@/components/app/Shell";
import { PageHeader } from "@/components/app/Premium";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export const metadata = {
  title: "Projects | ADITYA OS",
  description: "Project gallery for Aditya Choubey's AI software, industrial applications, automation and web work.",
};

export default function ProjectsPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Projects"
        title="Practical software projects, explained clearly."
        description="Start with what was built and why it matters. Open any case study for architecture, implementation notes and optional demos."
      />
      <ProjectGallery />
    </Shell>
  );
}
