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
        eyebrow="Workspace / Projects"
        title="Software product gallery for practical engineering work."
        description="Search and filter verified project work. Illustrative visuals are labeled as conceptual and do not claim to be production screenshots."
      />
      <ProjectGallery />
    </Shell>
  );
}
