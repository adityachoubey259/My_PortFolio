import { NextRequest, NextResponse } from "next/server";
import { assistantContextDigest } from "@/lib/assistant/knowledge";
import { answerPortfolioQuestion } from "@/lib/assistant/retrieval";
import type { AssistantAnswer } from "@/lib/assistant/types";

type Bucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 18;
const MAX_MESSAGE_LENGTH = 900;

function getClientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function rateLimit(key: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

function readStringField(payload: unknown, key: string) {
  if (!payload || typeof payload !== "object" || !(key in payload)) return "";
  const value = (payload as Record<string, unknown>)[key];
  return typeof value === "string" ? value : "";
}

function safeError(status: number, message: string) {
  return NextResponse.json({ error: message }, { status });
}

async function askConfiguredModel(message: string, localAnswer: AssistantAnswer) {
  const apiKey = process.env.ASSISTANT_API_KEY || process.env.OPENAI_API_KEY;
  const model = process.env.ASSISTANT_MODEL || "gpt-5-mini";
  const providerUrl = process.env.ASSISTANT_PROVIDER_URL || "https://api.openai.com/v1/chat/completions";
  const timeoutMs = Number(process.env.ASSISTANT_TIMEOUT_MS || 8000);

  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number.isFinite(timeoutMs) ? timeoutMs : 8000);

  try {
    const response = await fetch(providerUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are ADITYA AI inside Aditya Choubey's portfolio. Answer only from the verified context. Do not invent screenshots, external links, private credentials, salaries, or unverified facts. Keep the answer concise and recruiter-friendly.",
          },
          {
            role: "user",
            content: `Verified context:\n${assistantContextDigest()}\n\nLocal retrieval answer:\n${localAnswer.answer}\n\nQuestion:\n${message}`,
          },
        ],
        max_tokens: 360,
        temperature: 0.2,
      }),
      signal: controller.signal,
    });

    if (!response.ok) return null;
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data.choices?.[0]?.message?.content?.trim().slice(0, 1800) || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  if (!rateLimit(getClientKey(request))) {
    return safeError(429, "Too many assistant requests. Please wait a moment and try again.");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return safeError(400, "Invalid request body.");
  }

  const message = readStringField(payload, "message").trim();
  const sessionId = readStringField(payload, "sessionId").trim();

  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return safeError(400, `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.`);
  }

  if (sessionId.length > 90) {
    return safeError(400, "Invalid assistant session.");
  }

  const localAnswer = answerPortfolioQuestion(message);
  const modelAnswer = await askConfiguredModel(message, localAnswer);

  return NextResponse.json({
    ...localAnswer,
    answer: modelAnswer ?? localAnswer.answer,
    mode: modelAnswer ? "AI-Powered Conversation" : localAnswer.mode,
  });
}
