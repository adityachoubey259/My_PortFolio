import { projects } from "@/content/profile";

export type ProjectDetail = {
  slug: string;
  headline: string;
  role: string;
  context: string;
  architecture: string[];
  considerations: string[];
  learning: string;
  quote: string;
  editableFields: string[];
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "xecroai",
    headline: "A flagship inspection workflow shaped around evidence, criticality and follow-up clarity.",
    role: "Contributed to industrial inspection workflow development and interface thinking.",
    context:
      "XecroAI is presented here as a verified portfolio case study for structured industrial observations. Real screenshots and production metrics are intentionally left out until supplied.",
    architecture: ["Inspection entry", "Evidence capture", "Criticality tagging", "Issue dashboard", "Follow-up view"],
    considerations: [
      "Keep inspection records clear enough for repeated site usage.",
      "Separate conceptual visuals from verified application screenshots.",
      "Design for fast scanning in industrial operating contexts.",
    ],
    learning:
      "This work strengthened the connection between practical field workflows, interface structure and issue-management discipline.",
    quote: "Industrial software becomes useful when it reduces ambiguity at the point of work.",
    editableFields: ["Confirmed stack", "Production screenshots", "Deployment environment", "Workflow screenshots"],
  },
  {
    slug: "itl-checklist",
    headline: "A digital checklist system for repeatable industrial inspection and recordkeeping.",
    role: "Helped shape checklist workflows, structured capture and practical industrial PC usage patterns.",
    context:
      "The case study focuses on the verified checklist concept and the inspection demonstration available in the playground.",
    architecture: ["Inspection category", "Checklist item", "Observation", "Status decision", "Structured report"],
    considerations: [
      "Support simple pass, fail and attention states.",
      "Make progress visible without implying fake compliance scores.",
      "Keep exported report data structured and readable.",
    ],
    learning:
      "The project reinforced how small interaction details can make operational records more consistent.",
    quote: "A checklist is not just a form. It is a repeatable operating memory.",
    editableFields: ["Exact field list", "Production UI screenshots", "Export format", "Deployment notes"],
  },
  {
    slug: "rs485-industrial-monitoring",
    headline: "A hardware-aware monitoring concept connecting device signals, processing logic and dashboards.",
    role: "Worked across communication architecture thinking and hardware/software interaction context.",
    context:
      "This page is careful to describe RS485 as the communication layer and labels any Modbus RTU examples as illustrative protocol-mode frames.",
    architecture: ["Sensor or device", "RS485 physical bus", "Protocol frame", "Processing layer", "Dashboard surface"],
    considerations: [
      "Do not imply live browser connectivity to industrial hardware.",
      "Keep physical-layer RS485 and protocol framing conceptually separate.",
      "Design monitoring states that are understandable to non-specialist viewers.",
    ],
    learning:
      "This work made the boundary between electrical systems, embedded logic and software interfaces more tangible.",
    quote: "Signal quality, protocol clarity and user visibility all matter in the same system.",
    editableFields: ["Device model", "Protocol details", "Hardware photos", "Confirmed data pipeline"],
  },
  {
    slug: "n8n-workflow-automation",
    headline: "Workflow automation patterns for routing information through trigger, condition and action logic.",
    role: "Built and refined automation logic, data-routing patterns and workflow orchestration concepts with n8n.",
    context:
      "The portfolio simulator demonstrates the automation thinking without claiming a connected production execution.",
    architecture: ["Inquiry trigger", "Data extraction", "AI classification", "Conditional route", "Follow-up", "Notification"],
    considerations: [
      "Avoid exposing API keys or private service details.",
      "Make route decisions visible and explainable.",
      "Keep simulation labels clear when no backend execution is attached.",
    ],
    learning:
      "Automation quality depends on clear routing rules, inspectable payloads and failure-aware handoffs.",
    quote: "Good automation is readable even before it is fast.",
    editableFields: ["Connected apps", "Trigger source", "Production screenshots", "Workflow JSON"],
  },
  {
    slug: "python-website-system",
    headline: "An editable Python website and backend-oriented case study kept intentionally conservative.",
    role: "Worked on Python programming, website/backend functionality and practical processing logic.",
    context:
      "The exact production scope needs more verified detail, so this page separates confirmed contribution from future editable specifics.",
    architecture: ["Request", "Python logic", "Data handling", "Website response", "Operational refinement"],
    considerations: [
      "Avoid listing unconfirmed frameworks or infrastructure.",
      "Leave clear placeholders for verified screenshots and stack details.",
      "Present learning value without exaggerating project maturity.",
    ],
    learning:
      "The work strengthened practical backend thinking and implementation habits around web functionality.",
    quote: "Truthful portfolios age better than overdesigned claims.",
    editableFields: ["Framework", "Database", "Deployment target", "Screenshots"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectDetail(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}
