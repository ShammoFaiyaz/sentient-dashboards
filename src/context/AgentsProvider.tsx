"use client";

import * as React from "react";
import { agents as seedAgents, type Agent, type AgentRole } from "@/mock/agents";

export type AgentWithRuntime = Agent & { online: boolean };

type AgentsContextValue = {
  agents: AgentWithRuntime[];
  agentsByRole: (role: AgentRole, opts?: { onlyOnline?: boolean }) => AgentWithRuntime[];
  setOnline: (id: string, online: boolean) => void;
  toggleOnline: (id: string) => void;
  setAllOffline: () => void;
  createAgent: (agent: Omit<Agent, "id"> & { id?: string }) => AgentWithRuntime;
  removeAgent: (id: string) => void;
};

const AgentsCtx = React.createContext<AgentsContextValue | null>(null);

// Default 'Ready to demo' agents online by default
// Can be overridden in production via NEXT_PUBLIC_SU_ONLINE_IDS (comma-separated ids)
const ENV_ONLINE_IDS: Set<string> | null =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_SU_ONLINE_IDS
    ? new Set(
        process.env.NEXT_PUBLIC_SU_ONLINE_IDS.split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )
    : null;

const DEFAULT_ONLINE_IDS = new Set<string>([]);

export function AgentsProvider({ children, storageKey = "su_agents_state" }: { children: React.ReactNode; storageKey?: string }) {
  // Start with deterministic defaults for SSR to avoid hydration mismatches
  const [list, setList] = React.useState<AgentWithRuntime[]>(() => {
    const baseline = ENV_ONLINE_IDS ?? DEFAULT_ONLINE_IDS;
    return seedAgents.map((a) => ({ ...a, online: baseline.has(a.id) }));
  });

  // After mount, load any saved state from localStorage (client-only)
  React.useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as any[];
        if (Array.isArray(parsed)) {
          // Reconcile saved state with current seed agents:
          // - Drop any agents that no longer exist
          // - Keep online flags for matching ids
          // - Add any new seed agents as offline
          const seedById = new Map(seedAgents.map((a) => [a.id, a]));
          const savedById = new Map<string, AgentWithRuntime>();
          for (const a of parsed) {
            if (a && typeof a.id === "string") {
              const seed = seedById.get(a.id);
              if (seed) {
                savedById.set(a.id, {
                  ...seed,
                  online: typeof a.online === "boolean" ? a.online : false,
                });
              }
            }
          }
          // Add any missing seed agents (new ones) as offline
          for (const seed of seedAgents) {
            if (!savedById.has(seed.id)) {
              savedById.set(seed.id, { ...seed, online: false });
            }
          }
          setList(Array.from(savedById.values()));
        }
      }
    } catch {}
  }, [storageKey]);

  // Persist changes so admin toggles apply site-wide and survive refresh/navigation
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify(list));
      }
    } catch {}
  }, [list, storageKey]);

  const agentsByRole = React.useCallback(
    (role: AgentRole, opts?: { onlyOnline?: boolean }) => {
      const base = list.filter((a) => a.role === role);
      return opts?.onlyOnline ? base.filter((a) => a.online) : base;
    },
    [list]
  );

  const setOnline = React.useCallback((id: string, online: boolean) => {
    setList((prev) => prev.map((a) => (a.id === id ? { ...a, online } : a)));
  }, []);

  const toggleOnline = React.useCallback((id: string) => {
    setList((prev) => prev.map((a) => (a.id === id ? { ...a, online: !a.online } : a)));
  }, []);

  const setAllOffline = React.useCallback(() => {
    setList((prev) => {
      const next = prev.map((a) => ({ ...a, online: false }));
      // Persist immediately to reduce chances of stale defaults on reload
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        }
      } catch {}
      return next;
    });
  }, [storageKey]);

  const createAgent = React.useCallback(
    (agent: Omit<Agent, "id"> & { id?: string }) => {
      const id = agent.id ?? agent.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
      const item: AgentWithRuntime = { ...(agent as Agent), id, online: false };
      setList((prev) => [item, ...prev]);
      return item;
    },
    []
  );

  const removeAgent = React.useCallback((id: string) => {
    setList((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value = React.useMemo<AgentsContextValue>(
    () => ({ agents: list, agentsByRole, setOnline, toggleOnline, setAllOffline, createAgent, removeAgent }),
    [list, agentsByRole, setOnline, toggleOnline, setAllOffline, createAgent, removeAgent]
  );

  return <AgentsCtx.Provider value={value}>{children}</AgentsCtx.Provider>;
}

export function useAgents() {
  const ctx = React.useContext(AgentsCtx);
  if (!ctx) throw new Error("useAgents must be used within AgentsProvider");
  return ctx;
}


