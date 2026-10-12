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
  evidence?: ProjectEvidence;
};

export type ProjectMediaItem = {
  title: string;
  description: string;
  src?: string;
  alt?: string;
  kind: "screenshot" | "architecture" | "document" | "concept";
};

export type ProjectEvidence = {
  publishingPermissionStatus: "Public media available" | "Permission needed before publishing" | "Conceptual media only";
  media: ProjectMediaItem[];
  architecture: string[];
  githubHref?: string;
  liveHref?: string;
  contributions: string[];
  approach: string[];
  evidenceNotes: string[];
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
