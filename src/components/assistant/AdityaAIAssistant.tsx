"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Bot,
  CornerDownLeft,
  Download,
  Grip,
  Mail,
  Maximize2,
  MessageSquarePlus,
  Minus,
  MoveHorizontal,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { AssistantAction, AssistantMode } from "@/lib/assistant/types";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  actions?: AssistantAction[];
  mode?: AssistantMode;
  sources?: string[];
};

type AssistantApiResponse = {
  answer: string;
  actions: AssistantAction[];
  confidence: number;
  mode: AssistantMode;
  sources: string[];
  error?: string;
};

type PanelPosition = {
  x: number;
  y: number;
};

const PANEL_WIDTH = 430;
const PANEL_HEIGHT = 630;
const MAX_CHARS = 900;
const STORAGE_KEY = "aditya-ai-panel-position";

const suggestions = [
  "Summarize Aditya for a recruiter",
  "What did Aditya do at ITL?",
  "Show the XecroAI project",
  "Download the resume",
];

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 10000)}`;
}

function defaultPosition(): PanelPosition {
  if (typeof window === "undefined") return { x: 24, y: 24 };
  return {
    x: Math.max(16, window.innerWidth - PANEL_WIDTH - 28),
    y: Math.max(16, window.innerHeight - PANEL_HEIGHT - 28),
  };
}

function getInitialPosition(): PanelPosition {
  if (typeof window === "undefined") return defaultPosition();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultPosition();

  try {
    const parsed = JSON.parse(stored) as Partial<PanelPosition>;
    if (typeof parsed.x === "number" && typeof parsed.y === "number") {
      return clampPosition({ x: parsed.x, y: parsed.y });
    }
  } catch {
    return defaultPosition();
  }

  return defaultPosition();
}

function clampPosition(position: PanelPosition): PanelPosition {
  if (typeof window === "undefined") return position;
  return {
    x: Math.min(Math.max(12, position.x), Math.max(12, window.innerWidth - PANEL_WIDTH - 12)),
    y: Math.min(Math.max(12, position.y), Math.max(12, window.innerHeight - PANEL_HEIGHT - 12)),
  };
}

function initialGreeting(): ChatMessage {
  return {
    id: makeId("assistant"),
    role: "assistant",
    content:
      "Hi, I am ADITYA AI. I can answer from this portfolio's verified knowledge base, open project case studies, help recruiters find the resume, and explain the industrial analytics demos.",
    mode: "Portfolio Knowledge Mode",
    sources: ["Portfolio assistant"],
  };
}

function ActionLink({ action }: { action: AssistantAction }) {
  if (action.kind === "internal") {
    return (
      <Link href={action.href} className="ai-action-chip">
        {action.label}
      </Link>
    );
  }

  const Icon = action.kind === "download" ? Download : Mail;
  return (
    <a href={action.href} className="ai-action-chip" download={action.kind === "download" ? true : undefined}>
      <Icon size={14} />
      {action.label}
    </a>
  );
}

export function AdityaAIAssistant() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [position, setPosition] = useState(getInitialPosition);
  const [dragging, setDragging] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showJump, setShowJump] = useState(false);
  const sessionRef = useRef<string | null>(null);
  const generationRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  function scrollToLatest(force = false) {
    const node = messagesRef.current;
    if (!node) return;
    const nearBottom = node.scrollHeight - node.scrollTop - node.clientHeight < 120;
    if (force || nearBottom) {
      requestAnimationFrame(() => {
        node.scrollTop = node.scrollHeight;
        setShowJump(false);
      });
    } else {
      setShowJump(true);
    }
  }

  function resetConversation() {
    abortRef.current?.abort();
    generationRef.current += 1;
    sessionRef.current = makeId("session");
    setMessages([initialGreeting()]);
    setInput("");
    setError("");
    setLoading(false);
    scrollToLatest(true);
  }

  function openAssistant() {
    if (!open || !messages.length) {
      resetConversation();
    }
    setOpen(true);
    setMinimized(false);
    window.setTimeout(() => inputRef.current?.focus(), 80);
  }

  function closeAssistant() {
    abortRef.current?.abort();
    generationRef.current += 1;
    setOpen(false);
    setMinimized(false);
    setMessages([]);
    setInput("");
    setError("");
    setLoading(false);
    window.setTimeout(() => launcherRef.current?.focus(), 40);
  }

  function persistPosition(next: PanelPosition) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function movePanel(next: PanelPosition) {
    const clamped = clampPosition(next);
    setPosition(clamped);
    persistPosition(clamped);
  }

  function dockPanel(side: "left" | "right") {
    if (typeof window === "undefined") return;
    movePanel({
      x: side === "left" ? 18 : window.innerWidth - PANEL_WIDTH - 18,
      y: Math.max(18, Math.min(position.y, window.innerHeight - PANEL_HEIGHT - 18)),
    });
  }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(max-width: 760px)").matches) return;
    if ((event.target as HTMLElement).closest("button,a")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragOffsetRef.current = { x: event.clientX - position.x, y: event.clientY - position.y };
    setDragging(true);
  }

  function dragPanel(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setPosition(
      clampPosition({
        x: event.clientX - dragOffsetRef.current.x,
        y: event.clientY - dragOffsetRef.current.y,
      }),
    );
  }

  function stopDrag() {
    if (!dragging) return;
    setDragging(false);
    persistPosition(position);
  }

  async function sendQuestion(value = input) {
    const question = value.trim().slice(0, MAX_CHARS);
    if (!question || loading) return;
    if (!sessionRef.current) sessionRef.current = makeId("session");

    const generation = generationRef.current + 1;
    generationRef.current = generation;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const userMessage: ChatMessage = {
      id: makeId("user"),
      role: "user",
      content: question,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setLoading(true);
    scrollToLatest(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, sessionId: sessionRef.current }),
        signal: controller.signal,
      });

      const data = (await response.json()) as AssistantApiResponse;
      if (generation !== generationRef.current) return;

      if (!response.ok) {
        throw new Error(data.error || "The assistant could not answer right now.");
      }

      setMessages((current) => [
        ...current,
        {
          id: makeId("assistant"),
          role: "assistant",
          content: data.answer,
          actions: data.actions,
          mode: data.mode,
          sources: data.sources,
        },
      ]);
      scrollToLatest();
    } catch (caught) {
      if (controller.signal.aborted) return;
      setError(caught instanceof Error ? caught.message : "The assistant could not answer right now.");
    } finally {
      if (generation === generationRef.current) setLoading(false);
    }
  }

  function handleInput(value: string) {
    setInput(value.slice(0, MAX_CHARS));
    const field = inputRef.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, 138)}px`;
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={cn("ai-launcher", open && !minimized && "is-hidden")}
        onClick={openAssistant}
        aria-label="Open ADITYA AI portfolio assistant"
      >
        <span>
          <Sparkles size={18} />
        </span>
        <strong>ADITYA AI</strong>
        <em>Portfolio Intelligence</em>
      </button>

      <AnimatePresence>
        {open && minimized ? (
          <motion.button
            type="button"
            className="ai-minimized"
            onClick={() => setMinimized(false)}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          >
            <Maximize2 size={16} />
            Restore ADITYA AI
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open && !minimized ? (
          <motion.section
            className={cn("ai-panel", dragging && "is-dragging")}
            style={{ left: position.x, top: position.y }}
            role="dialog"
            aria-label="ADITYA AI portfolio intelligence"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
          >
            <div
              className="ai-panel-header"
              onPointerDown={startDrag}
              onPointerMove={dragPanel}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
            >
              <div className="ai-title">
                <span>
                  <Bot size={18} />
                </span>
                <div>
                  <strong>ADITYA AI</strong>
                  <em>Portfolio Intelligence</em>
                </div>
              </div>
              <div className="ai-status">
                <i />
                Ready
              </div>
              <div className="ai-window-actions">
                <button type="button" onClick={resetConversation} aria-label="Start new assistant chat" title="New chat">
                  <MessageSquarePlus size={16} />
                </button>
                <button type="button" onClick={() => setMinimized(true)} aria-label="Minimize ADITYA AI" title="Minimize">
                  <Minus size={16} />
                </button>
                <button type="button" onClick={closeAssistant} aria-label="Close ADITYA AI" title="Close">
                  <X size={16} />
                </button>
              </div>
              <Grip className="ai-drag-grip" size={16} aria-hidden="true" />
            </div>

            <div className="ai-move-controls" aria-label="Assistant panel position controls">
              <button type="button" onClick={() => dockPanel("left")}>
                <MoveHorizontal size={14} />
                Dock left
              </button>
              <button type="button" onClick={() => dockPanel("right")}>
                <MoveHorizontal size={14} />
                Dock right
              </button>
              <button type="button" onClick={() => movePanel(defaultPosition())}>
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

            <div
              ref={messagesRef}
              className="ai-messages"
              onScroll={(event) => {
                const node = event.currentTarget;
                setShowJump(node.scrollHeight - node.scrollTop - node.clientHeight >= 160);
              }}
            >
              {messages.map((message) => (
                <article className={cn("ai-message", `ai-message--${message.role}`)} key={message.id}>
                  <p>{message.content}</p>
                  {message.actions?.length ? (
                    <div className="ai-action-row">
                      {message.actions.map((action) => (
                        <ActionLink action={action} key={`${message.id}-${action.href}`} />
                      ))}
                    </div>
                  ) : null}
                  {message.role === "assistant" && message.mode ? (
                    <small>{message.mode}</small>
                  ) : null}
                </article>
              ))}
              {loading ? (
                <article className="ai-message ai-message--assistant ai-message--typing" aria-live="polite">
                  <span />
                  <span />
                  <span />
                </article>
              ) : null}
            </div>

            {showJump ? (
              <button type="button" className="ai-jump" onClick={() => scrollToLatest(true)}>
                Jump to latest
              </button>
            ) : null}

            <div className="ai-suggestions" aria-label="Suggested assistant prompts">
              {suggestions.map((suggestion) => (
                <button type="button" onClick={() => sendQuestion(suggestion)} key={suggestion}>
                  {suggestion}
                </button>
              ))}
            </div>

            {error ? (
              <div className="ai-error" role="alert">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => sendQuestion([...messages].reverse().find((message) => message.role === "user")?.content ?? "")}
                >
                  Retry
                </button>
              </div>
            ) : null}

            <form
              className="ai-composer"
              onSubmit={(event) => {
                event.preventDefault();
                sendQuestion();
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                maxLength={MAX_CHARS}
                rows={1}
                placeholder="Ask about Aditya's projects, resume, skills, or experience..."
                onChange={(event) => handleInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendQuestion();
                  }
                }}
              />
              <div className="ai-composer-meta">
                <span>{MAX_CHARS - input.length} left</span>
                <span>
                  Enter <CornerDownLeft size={13} />
                </span>
              </div>
              <button type="submit" disabled={!input.trim() || loading} aria-label="Send assistant message">
                <Send size={17} />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}
