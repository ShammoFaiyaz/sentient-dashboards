"use client";

import Link from "next/link";
import { Bot, Sparkles, BookOpen, Shield, Briefcase, Brain, Megaphone, CheckCircle } from "lucide-react";
import { buttonVariants, cn } from "@/components/ui/Button";
import type { Agent } from "@/mock/agents";

function getIcon(name?: Agent["icon"]) {
  switch (name) {
    case "sparkles": return Sparkles;
    case "book": return BookOpen;
    case "shield": return Shield;
    case "briefcase": return Briefcase;
    case "brain": return Brain;
    case "megaphone": return Megaphone;
    default: return Bot;
  }
}

function medallionGradient(color?: Agent["color"]) {
  if (color === "accent") return "from-accent to-accent/70";
  if (color === "emerald") return "from-emerald-500 to-emerald-400";
  if (color === "violet") return "from-violet-500 to-violet-400";
  return "from-primary to-primary/70";
}

function roleCta(agent: Agent): { label: string; variant: "primary" | "accent" } {
  if (agent.role === "student") return { label: "Start mentor", variant: "accent" };
  if (agent.role === "teacher") return { label: agent.id === "faculty-copilot" ? "Run co-pilot" : "Generate content", variant: "primary" };
  return { label: agent.id === "virtual-admissions" ? "Open admissions bot" : "Build journey", variant: "primary" };
}

export function AgentTile({
  agent,
  poweredByBLDR,
  status,
  actions,
}: {
  agent: Agent;
  poweredByBLDR?: boolean;
  status?: "online" | "offline";
  /** Optional custom controls rendered in the top‑right corner (e.g. toggles, menus). */
  actions?: React.ReactNode;
}) {
  const Icon = getIcon(agent.icon);
  const grad = medallionGradient(agent.color);
  const { label, variant } = roleCta(agent);

  return (
    <div className="relative flex h-full flex-col justify-between rounded-card border border-line/60 bg-white p-5 text-ink shadow-elevation-sm dark:bg-slate-900">
      {status && (
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-line/60 bg-white px-2 py-0.5 text-[11px] shadow-elevation-sm">
          <span className={cn("h-2 w-2 rounded-full", status === "online" ? "bg-emerald-500" : "bg-error")} />
          <span className="text-xs text-ink/80 capitalize">{status}</span>
        </div>
      )}

      {(poweredByBLDR || actions) && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {poweredByBLDR && (
            <div className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] text-primary">Powered by BLDR</div>
          )}
          {actions}
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <div className={cn("flex size-14 items-center justify-center rounded-full border-2 border-line bg-gradient-to-br text-white", grad)}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="mt-3 text-xs uppercase tracking-wide text-muted">
          {String(agent.category || "").toUpperCase()}
        </div>
        <h3 className="mt-1 text-base font-semibold text-primary">{agent.name}</h3>
        <p className="mt-2 text-sm text-muted">{agent.description}</p>
      </div>

      {agent.bullets && agent.bullets.length > 0 && (
        <div className="mt-3">
          <div className="mb-1 text-xs font-medium text-muted">What this agent can do</div>
          <ul className="space-y-1 text-left text-sm">
            {agent.bullets.slice(0, 3).map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-ink/90">
                <CheckCircle className="h-4 w-4 text-accent" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center">
        <Link
          href={agent.url}
          target="_blank"
          className={cn(buttonVariants({ variant, size: "md" }))}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}



