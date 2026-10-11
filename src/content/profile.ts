import type { ExperienceItem, Project, SkillCategory } from "@/types/content";

export const profile = {
  name: "Aditya Choubey",
  displayName: "ADITYA CHOUBEY",
  role: "AI Automation & Software Developer",
  microcopy: "AI Automation / Software Development / Industrial Technology",
  location: "Bhopal, Madhya Pradesh",
  hometown: "Durg, Chhattisgarh",
  email: "adityachoubey259@gmail.com",
  phone: "+91 70008 28276",
  github: "https://github.com/adityachoubey259",
  githubLabel: "github.com/adityachoubey259",
  availability: "Open to software, AI automation and industrial technology collaborations",
  resume: {
    available: true,
    href: "/resume/Aditya-Choubey-Resume.pdf",
  },
};

export const education = {
  degree: "B.Tech - Electrical & Electronics Engineering",
  institute: "LNCT Bhopal / RGPV",
  status: "Currently in third year",
  graduation: "Expected graduation: 2028",
};

export const projects: Project[] = [
  {
    number: "01",
    title: "XecroAI",
    company: "CAITPL",
    summary: "Industrial inspection and issue-management application for structured site observations.",
    problem:
      "Inspection workflows need consistent evidence, location context, criticality, dashboards and follow-up discipline.",
    contribution:
      "Contributed to practical inspection workflow development with issue capture, evidence tracking, dashboard thinking and kiosk-style usage in mind.",
    stack: ["Industrial software", "Dashboards", "Inspection workflows", "Evidence capture"],
    features: [
      "Photo-based industrial inspection",
      "Site observation and issue capture",
      "Location information",
      "Criticality classification",
      "Structured follow-ups",
      "Dedicated kiosk-style mode",
    ],
    visual: "inspection",
    note: "Illustrative interface treatment; replace with real screenshots when available.",
  },
  {
    number: "02",
    title: "ITL Checklist",
    company: "Industrial Trade Link",
    summary: "Digital industrial checklist application for structured inspections and operational records.",
    problem:
      "Operational teams need organized checklist records that can work in an industrial PC deployment context.",
    contribution:
      "Helped shape checklist workflows, structured data capture and a practical recordkeeping interface for industrial usage.",
    stack: ["Digital checklists", "Structured records", "Industrial PC context"],
    features: [
      "Digital checklist flows",
      "Structured inspection data capture",
      "Operational record organization",
      "Deployment context for industrial PCs",
    ],
    visual: "checklist",
    note: "Mock dashboard is conceptual, not a real application screenshot.",
  },
  {
    number: "03",
    title: "RS485 Industrial Monitoring",
    company: "Industrial Trade Link",
    summary: "Industrial monitoring concept combining hardware, embedded software and RS485 data exchange.",
    problem:
      "Industrial environments often need reliable communication between devices, processing logic and monitoring interfaces.",
    contribution:
      "Worked across the hardware/software interaction layer, communication architecture thinking and monitoring interface context.",
    stack: ["Hardware integration", "Embedded software", "RS485", "Monitoring interface"],
    features: [
      "Industrial device context",
      "RS485-linked data exchange",
      "Software processing layer",
      "Monitoring interface concept",
    ],
    visual: "rs485",
    note: "Architecture diagram is conceptual because exact implementation details are not supplied.",
  },
  {
    number: "04",
    title: "n8n Workflow Automation",
    company: "tirth.ai",
    summary: "Workflow orchestration and integration logic using n8n automation patterns.",
    problem:
      "Repeated information movement and trigger/action sequences need clear routing logic and dependable automation structure.",
    contribution:
      "Built and refined automation logic, data-routing patterns and workflow orchestration concepts with n8n.",
    stack: ["n8n", "Workflow orchestration", "Automation logic", "Data routing"],
    features: [
      "Trigger and action sequences",
      "Conditional automation paths",
      "Integration-oriented workflow logic",
      "Structured data movement",
    ],
    visual: "automation",
    note: "Specific connected APIs are intentionally not listed until confirmed.",
  },
  {
    number: "05",
    title: "Python-Based Website System",
    company: "tirth.ai",
    summary: "Editable case study for Python-based website and backend development work.",
    problem:
      "The exact production scope still needs more detail, so this case study stays factual and conservative.",
    contribution:
      "Worked on Python programming, website/backend functionality and practical processing logic.",
    stack: ["Python", "Backend logic", "Website functionality", "Automation support"],
    features: [
      "Python programming",
      "Backend-oriented functionality",
      "Processing logic",
      "Editable details for verified scope",
    ],
    visual: "python",
    note: "Add exact features later when the real system scope is confirmed.",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Software & Programming",
    eyebrow: "Working toolkit",
    status: "Mixed",
    skills: ["Python", "JavaScript", "HTML", "CSS", "PostgreSQL", "SQL / DBMS", "Data Structures and Algorithms", "C++ - currently learning"],
  },
  {
    title: "AI & Automation",
    eyebrow: "Systems thinking",
    status: "Demonstrated",
    skills: ["AI/ML fundamentals", "Prompt Engineering", "AI-Assisted Development", "AI Productivity", "n8n", "Workflow Automation", "Data Analysis", "Power BI"],
  },
  {
    title: "Web & Development Tools",
    eyebrow: "Delivery habits",
    status: "Demonstrated",
    skills: ["APIs", "Git / GitHub", "VS Code", "Deployment fundamentals", "Domain configuration concepts"],
  },
  {
    title: "Hardware & Industrial Technology",
    eyebrow: "Currently advancing",
    status: "Learning",
    skills: ["PLC programming", "HMI development", "SCADA", "Industrial wiring", "Hardware/software integration", "Drone basics", "Drone assembly", "Component selection", "Drone programming"],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Industrial Trade Link (ITL)",
    duration: "6 months",
    focus: "Industrial software, digital checklist systems, hardware/software integration and monitoring-related work.",
    associations: ["ITL Checklist", "Hardware Monitoring + RS485"],
  },
  {
    company: "Choubey Automation Innovation Technology Pvt. Ltd. (CAITPL)",
    duration: "3 months",
    focus: "Industrial software and XecroAI inspection workflow development.",
    associations: ["XecroAI"],
  },
  {
    company: "tirth.ai",
    duration: "3 months",
    focus: "n8n workflow automation, Python web development and integration-related work.",
    associations: ["n8n Workflow Automation", "Python-Based Website System"],
  },
];

export const labItems = [
  "C++ - currently learning",
  "PLC / HMI / SCADA - advancing practical knowledge",
  "Drone components, assembly and programming",
  "Cybersecurity fundamentals",
  "PCB design",
  "Deployment",
  "Domains",
  "DBMS",
];
