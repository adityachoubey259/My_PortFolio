import {
  Activity,
  BadgeInfo,
  BriefcaseBusiness,
  CircuitBoard,
  ClipboardCheck,
  Code2,
  Contact,
  FolderKanban,
  Gauge,
  Home,
  PanelsTopLeft,
  RadioTower,
  Sparkles,
  Workflow,
} from "lucide-react";

export const primaryNavigation = [
  { href: "/", label: "Home", icon: Home, description: "Portfolio overview" },
  { href: "/projects", label: "Projects", icon: FolderKanban, description: "Selected work" },
  { href: "/about", label: "About", icon: BadgeInfo, description: "Professional introduction" },
  { href: "/skills", label: "Skills", icon: Code2, description: "Technical toolkit" },
  { href: "/experience", label: "Experience", icon: BriefcaseBusiness, description: "Work and education" },
  { href: "/contact", label: "Contact", icon: Contact, description: "Email and resume" },
];

export const appNavigation = [
  {
    label: "Main",
    items: primaryNavigation,
  },
  {
    label: "Interactive demos",
    items: [
      { href: "/analytics", label: "Data Analytics Demo", icon: Gauge, description: "Synthetic industrial dashboard" },
      { href: "/playground", label: "Interactive Demos", icon: PanelsTopLeft, description: "Checklist, RS485 and automation" },
      { href: "/lab", label: "Learning Lab", icon: CircuitBoard, description: "Current learning areas" },
      { href: "/recruiter", label: "Quick Overview", icon: BadgeInfo, description: "Recruiter summary" },
    ],
  },
];

export const commandItems = [
  { href: "/", label: "Home", icon: Home, keywords: "overview portfolio" },
  { href: "/projects", label: "Projects", icon: FolderKanban, keywords: "work portfolio case studies" },
  { href: "/about", label: "About", icon: BadgeInfo, keywords: "profile introduction education mindset" },
  { href: "/skills", label: "Skills", icon: Code2, keywords: "technologies toolkit capability" },
  { href: "/experience", label: "Experience", icon: BriefcaseBusiness, keywords: "timeline education work" },
  { href: "/contact", label: "Contact", icon: Contact, keywords: "email github phone" },
  { href: "/analytics", label: "Data Analytics Demo", icon: Activity, keywords: "dashboard industrial data demo" },
  { href: "/playground", label: "Interactive Demos", icon: Sparkles, keywords: "demos applications launcher" },
  { href: "/playground/checklist", label: "Checklist Demo", icon: ClipboardCheck, keywords: "inspection export" },
  { href: "/playground/rs485", label: "RS485 Simulator", icon: RadioTower, keywords: "modbus signal simulator" },
  { href: "/playground/automation", label: "Automation Workflow Demo", icon: Workflow, keywords: "n8n workflow routing" },
  { href: "/lab", label: "Learning Lab", icon: CircuitBoard, keywords: "learning experiments" },
  { href: "/recruiter", label: "Quick Overview", icon: BadgeInfo, keywords: "hiring resume summary" },
];
