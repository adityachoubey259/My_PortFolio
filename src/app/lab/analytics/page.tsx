import { AnalyticsDashboard } from "@/components/charts/AnalyticsDashboard";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";

export const metadata = {
  title: "Industrial Intelligence Studio | Aditya Choubey",
  description: "A deterministic demonstration analytics dashboard for industrial monitoring concepts.",
};

export default function AnalyticsPage() {
  return (
    <>
      <Navigation />
      <main className="route-shell">
        <section className="route-hero route-hero--analytics">
          <span className="eyebrow">Lab / Analytics</span>
          <h1>Industrial Intelligence Studio</h1>
          <p>
            A Power BI-inspired monitoring dashboard using clearly labeled synthetic demonstration data, built to show
            how equipment signals can become useful operating insight.
          </p>
        </section>
        <AnalyticsDashboard />
      </main>
      <Footer />
    </>
  );
}
