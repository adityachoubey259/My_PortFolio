export type AssistantActionKind = "internal" | "download" | "email";

export type AssistantAction = {
  label: string;
  href: string;
  kind: AssistantActionKind;
};

export type KnowledgeRecord = {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  sources: string[];
  actions?: AssistantAction[];
};

export type AssistantMode = "Portfolio Knowledge Mode" | "AI-Powered Conversation";

export type AssistantAnswer = {
  answer: string;
  actions: AssistantAction[];
  confidence: number;
  mode: AssistantMode;
  sources: string[];
};
