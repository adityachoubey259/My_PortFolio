export type Project = {
  number: string;
  slug: string;
  title: string;
  company: string;
  summary: string;
  problem: string;
  contribution: string;
  stack: string[];
  features: string[];
  visual: "inspection" | "checklist" | "rs485" | "automation" | "python";
  note?: string;
  demoHref?: string;
};

export type SkillCategory = {
  title: string;
  eyebrow: string;
  status: "Demonstrated" | "Learning" | "Mixed";
  skills: string[];
};

export type ExperienceItem = {
  company: string;
  duration: string;
  focus: string;
  associations: string[];
};
