import Layout from "@/components/Layout";
import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, BookOpen, RotateCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "ai"; text: string };

const suggestions = [
  "Explain mitosis in simpler terms",
  "Give me an example of cytokinesis",
  "Generate 5 practice questions on this topic",
  "What's the difference between mitosis and meiosis?",
];

const aiReplies: Record<string, string> = {
  default: "Great question! Based on your study material about Cell Division & Mitosis, I can help you understand this concept better. Mitosis is essentially the cell's way of making an exact copy of itself — like a perfect photocopy. The process ensures that every new cell gets the exact same genetic information as the parent cell.",
  explain: "Think of mitosis like a dance routine with four moves — PMAT:\n\n1. **Prophase** 🌀 — The chromosomes condense and become visible. The spindle forms.\n2. **Metaphase** ↔️ — Chromosomes line up in the middle of the cell.\n3. **Anaphase** ↕️ — Sister chromatids are pulled apart to opposite ends.\n4. **Telophase** ✅ — Two new nuclei form, and the cell pinches in two.",
  example: "Here's a real-world example: When you cut your finger, your skin cells undergo mitosis to replace the damaged cells. The healthy cells nearby divide rapidly — each going through Prophase → Metaphase → Anaphase → Telophase — creating two identical daughter cells to heal the wound.",
  practice: "Here are 5 practice questions for your exam:\n\n1. Name the four phases of mitosis in order.\n2. What is the role of spindle fibers during Anaphase?\n3. How does mitosis differ from meiosis?\n4. At which phase do chromosomes align at the metaphase plate?\n5. What happens to the nuclear envelope during Prophase?",
};

function getReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("simpler") || lower.includes("explain")) return aiReplies.explain;
  if (lower.includes("example")) return aiReplies.example;
  if (lower.includes("practice") || lower.includes("question")) return aiReplies.practice;
  return aiReplies.default;
}

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi! I'm your AI Study Copilot 🎓 I've read your notes on **Cell Division & Mitosis**. Ask me anything — I can explain concepts, give examples, or generate practice questions!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "ai", text: getReply(text) }]);
    }, 1400);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-0px)] lg:h-screen max-h-screen">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-card flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-study">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground">AI Study Copilot</h1>
            <p className="text-xs text-muted-foreground">Studying: Cell Division &amp; Mitosis</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">Active</span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Chat */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0 mt-1 shadow-study">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line",
                      msg.role === "ai"
                        ? "bg-card border border-border text-foreground rounded-tl-sm"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-study">
                    <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
                  </div>
                  <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <div className="px-6 pb-3 flex gap-2 overflow-x-auto shrink-0">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-border bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-primary/30 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-6 pb-5 shrink-0">
              <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-card focus-within:ring-2 focus-within:ring-primary transition-all">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
                  placeholder="Ask anything about your notes..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                    input.trim() && !typing
                      ? "gradient-primary text-primary-foreground shadow-study hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: context notes */}
          <div className="hidden xl:flex w-72 border-l border-border flex-col p-5 space-y-4 bg-card shrink-0 overflow-y-auto">
            <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Study Context
            </h3>
            <div className="rounded-xl bg-muted/60 p-3.5 space-y-2">
              <p className="text-xs font-semibold text-foreground">Cell Division &amp; Mitosis</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mitosis produces two identical daughter cells. The four phases are Prophase, Metaphase, Anaphase, and Telophase.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Key Terms</p>
              {["Centromere", "Cytokinesis", "Chromatid", "Spindle Fiber", "Interphase"].map((term) => (
                <button key={term} className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-xs text-muted-foreground hover:text-foreground">
                  {term} <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 text-xs text-primary font-medium hover:underline">
              <RotateCcw className="w-3 h-3" /> Clear chat
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
