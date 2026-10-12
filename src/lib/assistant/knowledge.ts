import { education, experience, labItems, profile, projects, skillCategories } from "@/content/profile";
import type { AssistantAction, KnowledgeRecord } from "./types";

export const approvedAssistantActions: AssistantAction[] = [
  { label: "Download resume", href: profile.resume.href, kind: "download" },
  { label: "Open projects", href: "/projects", kind: "internal" },
  { label: "Open playground", href: "/playground", kind: "internal" },
  { label: "Open analytics", href: "/analytics", kind: "internal" },
  { label: "Open skills", href: "/skills", kind: "internal" },
  { label: "Open lab", href: "/lab", kind: "internal" },
  { label: "Open experience", href: "/experience", kind: "internal" },
  { label: "Open recruiter view", href: "/recruiter", kind: "internal" },
  { label: "Open contact", href: "/contact", kind: "internal" },
  { label: "Email Aditya", href: `mailto:${profile.email}`, kind: "email" },
  ...projects.map((project) => ({
    label: `Open ${project.title}`,
    href: `/work/${project.slug}`,
    kind: "internal" as const,
  })),
];

function actionByHref(href: string) {
  return approvedAssistantActions.find((action) => action.href === href);
}

const projectRecords: KnowledgeRecord[] = projects.map((project) => ({
  id: `project-${project.slug}`,
  title: project.title,
  summary: [
    `${project.title} is a ${project.company} project: ${project.summary}`,
    `Problem: ${project.problem}`,
    `Aditya's contribution: ${project.contribution}`,
    `Key features: ${project.features.join(", ")}.`,
    `Stack and themes: ${project.stack.join(", ")}.`,
    project.note ? `Evidence note: ${project.note}` : "",
  ]
    .filter(Boolean)
    .join(" "),
  keywords: [
    project.title,
    project.company,
    project.slug,
    project.visual,
    ...project.stack,
    ...project.features,
    ...project.title.split(/\s+/),
  ],
  sources: [`Project: ${project.title}`],
  actions: [actionByHref(`/work/${project.slug}`), project.demoHref ? actionByHref(project.demoHref) : undefined].filter(
    Boolean,
  ) as AssistantAction[],
}));

export const assistantKnowledge: KnowledgeRecord[] = [
  {
    id: "profile",
    title: "Aditya Choubey",
    summary: `${profile.name} is an ${profile.role} based in ${profile.location}, from ${profile.hometown}. His focus areas are AI automation, software development and industrial technology. He is ${profile.availability.toLowerCase()}.`,
    keywords: ["aditya", "choubey", "profile", "about", "bio", "location", "hometown", "role", "availability"],
    sources: ["Profile"],
    actions: [actionByHref("/contact"), actionByHref(profile.resume.href)].filter(Boolean) as AssistantAction[],
  },
  {
    id: "resume",
    title: "Resume",
    summary: `Aditya's resume is available as a PDF at ${profile.resume.href}. It is the safest artifact to share for recruiters who need a compact overview.`,
    keywords: ["resume", "cv", "download", "pdf", "recruiter", "hire", "hiring"],
    sources: ["Resume"],
    actions: [actionByHref(profile.resume.href), actionByHref("/recruiter")].filter(Boolean) as AssistantAction[],
  },
  {
    id: "contact",
    title: "Contact",
    summary: `Aditya can be contacted at ${profile.email}. His GitHub is ${profile.githubLabel}, and the portfolio contact page is /contact.`,
    keywords: ["contact", "email", "mail", "phone", "github", "connect", "reach", "call"],
    sources: ["Contact"],
    actions: [actionByHref("/contact"), actionByHref(`mailto:${profile.email}`)].filter(Boolean) as AssistantAction[],
  },
  {
    id: "experience",
    title: "Experience",
    summary: `Verified experience: ${experience
      .map((item) => `${item.duration} at ${item.company}, focused on ${item.focus}`)
      .join(" ")} The portfolio should describe these as months of practical exposure rather than full-time years.`,
    keywords: ["experience", "internship", "itl", "industrial trade link", "caitpl", "tirth", "months", "duration", "work"],
    sources: ["Experience"],
    actions: [actionByHref("/experience"), actionByHref("/recruiter")].filter(Boolean) as AssistantAction[],
  },
  {
    id: "education",
    title: "Education",
    summary: `${education.degree} at ${education.institute}. ${education.status}. ${education.graduation}.`,
    keywords: ["education", "college", "degree", "btech", "electrical", "electronics", "lnct", "rgpv", "graduation"],
    sources: ["Education"],
  },
  {
    id: "skills",
    title: "Skills",
    summary: skillCategories
      .map((category) => `${category.title}: ${category.skills.join(", ")}.`)
      .join(" "),
    keywords: ["skills", "python", "javascript", "sql", "dbms", "automation", "n8n", "power bi", "plc", "hmi", "scada", "drone", "c++"],
    sources: ["Skills"],
    actions: [actionByHref("/skills")].filter(Boolean) as AssistantAction[],
  },
  {
    id: "learning-lab",
    title: "Learning Lab",
    summary: `Current learning and lab interests include ${labItems.join(", ")}.`,
    keywords: ["learning", "lab", "currently", "studying", "c++", "plc", "hmi", "scada", "cybersecurity", "pcb", "deployment", "domains"],
    sources: ["Lab"],
    actions: [actionByHref("/lab")].filter(Boolean) as AssistantAction[],
  },
  {
    id: "analytics",
    title: "Analytics Dashboard",
    summary:
      "The analytics section is a deterministic industrial operations dashboard with KPI cards, alarm data, health indicators and export interaction. It is a portfolio simulation, not a live plant connection.",
    keywords: ["analytics", "dashboard", "kpi", "alarm", "export", "data", "industrial", "operations"],
    sources: ["Analytics Dashboard"],
    actions: [actionByHref("/analytics")].filter(Boolean) as AssistantAction[],
  },
  ...projectRecords,
];

export function assistantContextDigest() {
  return assistantKnowledge.map((record) => `${record.title}: ${record.summary}`).join("\n");
}
