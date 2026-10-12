import {
  Activity,
  BadgeInfo,
  BriefcaseBusiness,
  CircuitBoard,
  ClipboardCheck,
  Code2,
  Contact,
  FlaskConical,
  FolderKanban,
  Gauge,
  Home,
  PanelsTopLeft,
  RadioTower,
  Sparkles,
  Workflow,
} from "lucide-react";

export const appNavigation = [
  {
    label: "Workspace",
    items: [
      { href: "/", label: "Home", icon: Home, description: "Launch ADITYA OS" },
      { href: "/projects", label: "Projects", icon: FolderKanban, description: "Premium project gallery" },
      { href: "/analytics", label: "Analytics", icon: Gauge, description: "Industrial Intelligence Studio" },
      { href: "/playground", label: "Playground", icon: PanelsTopLeft, description: "Engineering app launcher" },
    ],
  },
  {
    label: "Profile",
    items: [
      { href: "/skills", label: "Skills", icon: Code2, description: "Capability explorer" },
      { href: "/experience", label: "Experience", icon: BriefcaseBusiness, description: "Timeline and education" },
      { href: "/lab", label: "Engineering Lab", icon: FlaskConical, description: "Learning and experiments" },
    ],
  },
  {
    label: "Connect",
    items: [
      { href: "/recruiter", label: "Recruiter", icon: BadgeInfo, description: "Fast hiring summary" },
      { href: "/contact", label: "Contact", icon: Contact, description: "Email, phone and GitHub" },
    ],
  },
];

export const commandItems = [
  { href: "/", label: "Home", icon: Home, keywords: "overview launch workspace" },
  { href: "/projects", label: "Projects", icon: FolderKanban, keywords: "work portfolio gallery" },
  { href: "/analytics", label: "Analytics Studio", icon: Activity, keywords: "dashboard industrial intelligence data" },
  { href: "/playground", label: "Playground", icon: Sparkles, keywords: "demos applications launcher" },
  { href: "/playground/checklist", label: "Checklist App", icon: ClipboardCheck, keywords: "inspection export" },
  { href: "/playground/rs485", label: "RS485 Studio", icon: RadioTower, keywords: "modbus signal simulator" },
  { href: "/playground/automation", label: "Automation Studio", icon: Workflow, keywords: "n8n workflow routing" },
  { href: "/skills", label: "Skills", icon: Code2, keywords: "expertise capability" },
  { href: "/experience", label: "Experience", icon: BriefcaseBusiness, keywords: "timeline education" },
  { href: "/lab", label: "Engineering Lab", icon: CircuitBoard, keywords: "learning experiments" },
  { href: "/recruiter", label: "Recruiter", icon: BadgeInfo, keywords: "hiring resume summary" },
  { href: "/contact", label: "Contact", icon: Contact, keywords: "email github phone" },
];
