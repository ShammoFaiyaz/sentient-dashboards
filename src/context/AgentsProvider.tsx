"use client";

import * as React from "react";
import { agents as seedAgents, type Agent, type AgentRole } from "@/mock/agents";

export type AgentWithRuntime = Agent & { online: boolean };

type AgentsContextValue = {
  agents: AgentWithRuntime[];
  agentsByRole: (role: AgentRole, opts?: { onlyOnline?: boolean }) => AgentWithRuntime[];
  setOnline: (id: string, online: boolean) => void;
  toggleOnline: (id: string) => void;
  createAgent: (agent: Omit<Agent, "id"> & { id?: string }) => AgentWithRuntime;
  removeAgent: (id: string) => void;
};

const AgentsCtx = React.createContext<AgentsContextValue | null>(null);

// Default 'Ready to demo' agents online by default
const DEFAULT_ONLINE_IDS = new Set<string>([
  // Student
  "ai-tutor-writer",
  "student-chatbot",
  "career-coach",
  "wellbeing-risk",
  "job-matching",
  "skill-gap",
  // Teacher
  "faculty-copilot",
  "genai-assistant",
  "sim-training",
  "ai-literacy-training",
  "ai-collab-labs",
  "integrated-course-design",
  "ai-research-tools",
  // Admin
  "virtual-admissions",
  "personalized-outreach",
  "staff-onboarding",
  "ai-coaching-tools",
]);

export function AgentsProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = React.useState<AgentWithRuntime[]>(() =>
    seedAgents.map((a) => ({ ...a, online: DEFAULT_ONLINE_IDS.has(a.id) }))
  );

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
    () => ({ agents: list, agentsByRole, setOnline, toggleOnline, createAgent, removeAgent }),
    [list, agentsByRole, setOnline, toggleOnline, createAgent, removeAgent]
  );

  return <AgentsCtx.Provider value={value}>{children}</AgentsCtx.Provider>;
}

export function useAgents() {
  const ctx = React.useContext(AgentsCtx);
  if (!ctx) throw new Error("useAgents must be used within AgentsProvider");
  return ctx;
}


