import { Shell } from "@/components/app/Shell";
import { PageHeader } from "@/components/app/Premium";
import { AutomationStudio } from "@/components/playground/AutomationStudio";

export const metadata = {
  title: "Automation Flow Studio | ADITYA OS",
  description: "n8n-inspired browser workflow simulation for routing and automation logic.",
};

export default function AutomationPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Playground / Automation"
        title="Automation Flow Studio"
        description="A node-based workflow simulation. No external services or API secrets are connected."
      />
      <AutomationStudio />
    </Shell>
  );
}
