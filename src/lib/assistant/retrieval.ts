import { assistantKnowledge } from "./knowledge";
import type { AssistantAnswer, KnowledgeRecord } from "./types";

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "at",
  "can",
  "did",
  "do",
  "does",
  "for",
  "from",
  "he",
  "his",
  "how",
  "i",
  "in",
  "is",
  "me",
  "of",
  "on",
  "or",
  "show",
  "tell",
  "the",
  "to",
  "what",
  "where",
  "with",
  "you",
]);

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word));
}

function scoreRecord(record: KnowledgeRecord, tokens: string[], raw: string) {
  const haystack = `${record.title} ${record.summary} ${record.keywords.join(" ")}`.toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (haystack.includes(token)) score += 1;
    if (record.title.toLowerCase().includes(token)) score += 2;
    if (record.keywords.some((keyword) => keyword.toLowerCase() === token)) score += 3;
  }

  if (raw.includes(record.title.toLowerCase())) score += 5;
  return score;
}

function composeAnswer(records: KnowledgeRecord[], query: string): string {
  const lower = query.toLowerCase();
  const asksDuration = /\b(year|years|month|months|duration|long|experience)\b/.test(lower);

  if (asksDuration && /\bitl|industrial trade link\b/.test(lower)) {
    return "Aditya's verified ITL experience is 6 months at Industrial Trade Link, focused on industrial software, checklist systems, hardware/software integration and monitoring-related work.";
  }

  if (asksDuration && /\bcaitpl|xecro\b/.test(lower)) {
    return "Aditya's verified CAITPL experience is 3 months, focused on industrial software and XecroAI inspection workflow development.";
  }

  if (asksDuration && /\btirth\b/.test(lower)) {
    return "Aditya's verified tirth.ai experience is 3 months, focused on n8n workflow automation, Python web development and integration-related work.";
  }

  if (records.length === 1) return records[0].summary;

  return records
    .map((record) => `${record.title}: ${record.summary}`)
    .join("\n\n");
}

export function answerPortfolioQuestion(query: string): AssistantAnswer {
  const trimmed = query.trim().slice(0, 900);
  const tokens = tokenize(trimmed);

  if (!tokens.length) {
    return {
      answer: "Ask me about Aditya's projects, experience, skills, resume, analytics dashboard, or contact route.",
      actions: [],
      confidence: 0.45,
      mode: "Portfolio Knowledge Mode",
      sources: ["Portfolio assistant"],
    };
  }

  const ranked = assistantKnowledge
    .map((record) => ({ record, score: scoreRecord(record, tokens, trimmed.toLowerCase()) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    return {
      answer:
        "I do not have that in the verified portfolio knowledge base yet. I can still help with Aditya's projects, experience, skills, resume, analytics dashboard, education, and contact details.",
      actions: [],
      confidence: 0.18,
      mode: "Portfolio Knowledge Mode",
      sources: ["Portfolio assistant"],
    };
  }

  const topScore = ranked[0].score;
  const selected = ranked
    .filter((item) => item.score >= Math.max(2, topScore - 2))
    .slice(0, 3)
    .map((item) => item.record);

  const actions = selected.flatMap((record) => record.actions ?? []);
  const dedupedActions = actions.filter((action, index) => actions.findIndex((item) => item.href === action.href) === index);

  return {
    answer: composeAnswer(selected, trimmed),
    actions: dedupedActions,
    confidence: Math.min(0.96, 0.42 + topScore / 18),
    mode: "Portfolio Knowledge Mode",
    sources: selected.flatMap((record) => record.sources),
  };
}
