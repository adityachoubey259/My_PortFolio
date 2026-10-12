import { AnalyticsDashboard } from "@/components/charts/AnalyticsDashboard";
import { Shell } from "@/components/app/Shell";
import { PageHeader } from "@/components/app/Premium";

export const metadata = {
  title: "Data Analytics Demo | ADITYA OS",
  description: "A synthetic industrial analytics dashboard demonstration by Aditya Choubey.",
};

export default function AnalyticsPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Interactive Demo"
        title="Data Analytics Demo"
        description="Explore a sample industrial data dashboard with interactive charts and filters. The data is synthetic, not live plant telemetry."
      />
      <AnalyticsDashboard />
    </Shell>
  );
}
