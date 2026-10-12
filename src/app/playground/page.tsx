import { ArrowRight, ClipboardCheck, RadioTower, Workflow } from "lucide-react";
import Link from "next/link";
import { Shell } from "@/components/app/Shell";
import { GlossyCard, PageHeader } from "@/components/app/Premium";

export const metadata = {
  title: "Interactive Demos | ADITYA OS",
  description: "Launch interactive engineering demos for inspection, RS485 communication and workflow automation.",
};

const apps = [
  {
    href: "/playground/checklist",
    title: "Industrial Checklist",
    icon: ClipboardCheck,
    body: "Interactive inspection checklist with records, status controls and JSON export.",
    status: "Functional demo",
  },
  {
    href: "/playground/rs485",
    title: "RS485 Communication Studio",
    icon: RadioTower,
    body: "Explore device communication, polling and technical signal flow.",
    status: "Educational simulator",
  },
  {
    href: "/playground/automation",
    title: "Automation Flow Studio",
    icon: Workflow,
    body: "Simulate intelligent workflow routing and automation logic.",
    status: "Browser simulation",
  },
];

export default function PlaygroundPage() {
  return (
    <Shell>
      <PageHeader
        eyebrow="Interactive Demos"
        title="Optional hands-on demos for technical visitors."
        description="Explore checklist, RS485 and automation simulations only when you want deeper interaction."
      />
      <div className="playground-launcher-grid">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <GlossyCard className="playground-launcher-card" key={app.href}>
              <div className="app-artwork">
                <Icon size={38} />
                <i />
              </div>
              <span>{app.status}</span>
              <h2>{app.title}</h2>
              <p>{app.body}</p>
              <Link href={app.href}>
                Launch <ArrowRight size={15} />
              </Link>
            </GlossyCard>
          );
        })}
      </div>
    </Shell>
  );
}
