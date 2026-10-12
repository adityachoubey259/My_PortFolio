import { AnalyticsDashboard } from "@/components/charts/AnalyticsDashboard";
import { Shell } from "@/components/app/Shell";
import { PageHeader } from "@/components/app/Premium";

export const metadata = {
  title: "Industrial Intelligence Studio | ADITYA OS",
  description: "A synthetic industrial analytics dashboard demonstration by Aditya Choubey.",
};

export default function AnalyticsPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Workspace / Analytics"
        title="Industrial Intelligence Studio"
        description="Interactive industrial analytics demonstration using deterministic synthetic data. This is not live plant telemetry."
      />
      <AnalyticsDashboard />
    </Shell>
  );
}
