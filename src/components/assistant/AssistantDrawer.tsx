"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

export function AssistantDrawer() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const SYSTEM_TEXT = "I'm your copilot for Sentient University. How can I help you today?";

  function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
  }

  function QuickChip({ label }: { label: string }) {
    return (
      <button
        onClick={() => send(label)}
        className="rounded-full border border-line/60 bg-white px-2 py-1 text-[11px] text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {label}
      </button>
    );
  }

  return (
    <>
      <button
        aria-label="Open Assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line/60 bg-accentStrong text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] hover:bg-accentStrong/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Bot className="h-6 w-6 text-white" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-[min(96vw,420px)] border-l border-line/60 bg-white shadow-elevation-md dark:bg-slate-900 flex min-h-full flex-col pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]"
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-line/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <div className="font-medium">Assistant</div>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="rounded-control px-2 py-1 text-sm hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col">
                {messages.length === 0 && (
                  <div className="mb-2 inline-flex max-w-[85%] self-start justify-start">
                    <div className="rounded-xl bg-neutral-light/60 px-3 py-2 text-xs text-neutral-dark/80">
                      {SYSTEM_TEXT}
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={[
                      "mb-2 inline-flex max-w-[85%]",
                      m.role === "user"
                        ? "self-end justify-end"
                        : "self-start justify-start",
                    ].join(" ")}
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "rounded-xl bg-primary/10 px-3 py-2 text-sm"
                          : "rounded-xl bg-neutral-light/60 px-3 py-2 text-sm"
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-line/60 p-3">
                <div className="mb-2 flex flex-wrap gap-2">
                  <QuickChip label="Find course" />
                  <QuickChip label="Explain policy" />
                  <QuickChip label="Draft email" />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-1 rounded-md border border-line/60 p-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-primary/90 px-3 py-2 text-sm font-medium text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    Send
                  </button>
                </form>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


