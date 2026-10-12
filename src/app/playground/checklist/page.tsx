import { Shell } from "@/components/app/Shell";
import { PageHeader } from "@/components/app/Premium";
import { ChecklistApp } from "@/components/playground/ChecklistApp";

export const metadata = {
  title: "Industrial Checklist | ADITYA OS",
  description: "Interactive inspection checklist demo with export and completion tracking.",
};

export default function ChecklistPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Playground / Checklist"
        title="Industrial Checklist"
        description="Enterprise-style inspection simulation inspired by ITL Checklist. It runs locally in the browser."
      />
      <ChecklistApp />
    </Shell>
  );
}
