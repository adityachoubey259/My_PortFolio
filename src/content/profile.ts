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
    slug: "xecroai",
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
    evidence: {
      publishingPermissionStatus: "Permission needed before publishing",
      media: [],
      architecture: ["Inspection entry", "Evidence capture", "Criticality model", "Issue dashboard", "Follow-up queue"],
      contributions: [
        "Shaped inspection workflow thinking around structured observations.",
        "Worked with evidence, location and criticality concepts for industrial usage.",
        "Kept kiosk-style and dashboard review contexts in view.",
      ],
      approach: [
        "Model the inspection as repeatable issue capture rather than a generic form.",
        "Keep visual status and criticality easy to scan.",
        "Separate verified claims from placeholder media until real assets are approved.",
      ],
      evidenceNotes: [
        "No production screenshots are included in this portfolio build.",
        "Any real media should be added only after permission and privacy review.",
      ],
    },
  },
  {
    number: "02",
    slug: "itl-checklist",
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
    demoHref: "/playground/checklist",
    evidence: {
      publishingPermissionStatus: "Conceptual media only",
      media: [],
      architecture: ["Checklist template", "Inspection item", "Observation", "Status", "Report"],
      contributions: [
        "Helped shape structured checklist flows.",
        "Focused on practical industrial PC recordkeeping context.",
        "Built portfolio simulator patterns that demonstrate the workflow safely.",
      ],
      approach: [
        "Prioritize repeatable pass, fail and attention decisions.",
        "Make progress visible without implying fake production metrics.",
        "Keep exported data readable and structured.",
      ],
      evidenceNotes: [
        "The interactive playground is a conceptual portfolio demo.",
        "Production screenshots are not included.",
      ],
    },
  },
  {
    number: "03",
    slug: "rs485-industrial-monitoring",
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
    demoHref: "/playground/rs485",
    evidence: {
      publishingPermissionStatus: "Conceptual media only",
      media: [],
      architecture: ["Device signal", "RS485 bus", "Protocol frame", "Processing layer", "Dashboard"],
      contributions: [
        "Worked across hardware/software interaction thinking.",
        "Explored monitoring interface context for industrial data.",
        "Presented RS485 accurately as a physical communication layer.",
      ],
      approach: [
        "Keep device communication, protocol framing and UI states conceptually separate.",
        "Avoid claiming direct live hardware connectivity in the browser demo.",
        "Make signal health and fault states understandable to non-specialist viewers.",
      ],
      evidenceNotes: [
        "Hardware photos and exact device models are not supplied.",
        "Portfolio visuals are labeled as conceptual architecture.",
      ],
    },
  },
  {
    number: "04",
    slug: "n8n-workflow-automation",
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
    demoHref: "/playground/automation",
    evidence: {
      publishingPermissionStatus: "Permission needed before publishing",
      media: [],
      architecture: ["Trigger", "Extract", "Classify", "Route", "Notify"],
      contributions: [
        "Built and refined automation logic patterns.",
        "Worked with trigger/action sequencing and conditional routing concepts.",
        "Kept connected service details private until confirmed.",
      ],
      approach: [
        "Make route decisions inspectable.",
        "Keep payload movement understandable.",
        "Design for clear failure-aware handoffs.",
      ],
      evidenceNotes: [
        "Connected applications and workflow JSON are not published in this version.",
        "The playground demo is a safe simulation of the workflow logic.",
      ],
    },
  },
  {
    number: "05",
    slug: "python-website-system",
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
    evidence: {
      publishingPermissionStatus: "Permission needed before publishing",
      media: [],
      architecture: ["Request", "Python logic", "Data handling", "Website response", "Refinement"],
      contributions: [
        "Worked on Python programming and backend-oriented website functionality.",
        "Handled practical processing logic within a conservative verified scope.",
      ],
      approach: [
        "Avoid listing unconfirmed frameworks or infrastructure.",
        "Leave clear slots for exact stack, database and deployment details.",
        "Present learning value without overstating production maturity.",
      ],
      evidenceNotes: [
        "Exact production scope still needs more verified detail.",
        "No screenshots are included until real assets are supplied and approved.",
      ],
    },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Software Development",
    eyebrow: "Practical toolkit",
    status: "Mixed",
    skills: ["Python", "JavaScript", "HTML", "CSS", "PostgreSQL", "APIs", "Data Structures and Algorithms"],
  },
  {
    title: "AI & Automation",
    eyebrow: "Applied learning",
    status: "Demonstrated",
    skills: ["AI/ML fundamentals", "Prompt Engineering", "AI-Assisted Development", "n8n", "Workflow Automation", "Data Analysis"],
  },
  {
    title: "Industrial Systems",
    eyebrow: "Project exposure",
    status: "Demonstrated",
    skills: ["RS485", "Industrial monitoring", "Hardware/software integration"],
  },
  {
    title: "Currently Learning",
    eyebrow: "Active learning",
    status: "Learning",
    skills: ["C++", "PLC", "HMI", "SCADA", "Drone technology"],
  },
  {
    title: "Additional Technical Exposure",
    eyebrow: "Supporting fundamentals",
    status: "Learning",
    skills: ["PCB design", "Cybersecurity fundamentals", "Deployment", "Domains", "DBMS"],
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
