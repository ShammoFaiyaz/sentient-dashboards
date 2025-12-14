"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { useAgents } from "@/context/AgentsProvider";
import type { AgentRole } from "@/mock/agents";
import { NICHES, type NicheKey } from "@/niches/config";
import { nicheRoleToSuRole } from "@/components/niche/roleMap";
import { Card, CardHeader, CardTitle, CardSubtitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AgentTile } from "@/components/AgentTile";

type DraftAgent = {
  name: string;
  description: string;
  category: string;
  role: AgentRole;
  roleLabel?: string;
  url: string;
  bullet1: string;
  bullet2: string;
};

const ROLE_LABELS: Record<AgentRole, string> = {
  admin: "Admin & governance agents",
  teacher: "Operational / analyst agents",
  student: "End‑user / frontline agents",
};

export default function AdminAgents() {
  const pathname = usePathname() || "/";
  const slug = (Object.keys(NICHES) as NicheKey[]).find((s) => pathname.startsWith("/" + s));
  const config = slug ? NICHES[slug] : undefined;

  const { agents, toggleOnline, removeAgent, createAgent } = useAgents();

  const defaultRoleLabel = config?.roles?.[0] ?? "";
  const defaultSuRole: AgentRole = config ? (nicheRoleToSuRole(config.slug, defaultRoleLabel) as AgentRole) : "admin";

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [draft, setDraft] = React.useState<DraftAgent>({
    name: "",
    description: "",
    category: "General",
    role: defaultSuRole,
    roleLabel: defaultRoleLabel,
    url: "",
    bullet1: "",
    bullet2: "",
  });

  const visibleAgents = React.useMemo(() => {
    if (!config) return agents;
    const allowedIds = new Set(config.agentIds);
    return agents.filter((a: any) => allowedIds.has(a.id) || a.niche === config.slug);
  }, [agents, config]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;

    const nicheSlug = config?.slug;
    const suRole: AgentRole = nicheSlug
      ? (nicheRoleToSuRole(nicheSlug, draft.roleLabel || "") as AgentRole)
      : draft.role;

    const bullets = [draft.bullet1, draft.bullet2].map((b) => b.trim()).filter(Boolean);

    createAgent({
      name: draft.name.trim(),
      description: draft.description.trim() || "Custom agent created in Agent Management.",
      category: draft.category.trim() || "General",
      role: suRole,
      url: draft.url.trim() || "#",
      bullets,
      icon: "bot",
      color: "primary",
      ...(nicheSlug ? { niche: nicheSlug } : {}),
    } as any);

    setDraft({
      name: "",
      description: "",
      category: "General",
      role: suRole,
      roleLabel: draft.roleLabel || defaultRoleLabel,
      url: "",
      bullet1: "",
      bullet2: "",
    });
    setShowAddForm(false);
  };

  // For niche dashboards, show role labels from that niche; otherwise group by core SU roles
  const businessRoles = React.useMemo(() => {
    if (!config) return null;
    return config.roles;
  }, [config]);

  const sections = React.useMemo(() => {
    if (businessRoles && config) {
      return businessRoles.map((label) => {
        const suRole = nicheRoleToSuRole(config.slug, label);
        const roleAgents = visibleAgents.filter((a) => a.role === suRole);
        return { id: label, label, suRole, agents: roleAgents };
      });
    }

    const suRoles: AgentRole[] = ["admin", "teacher", "student"];
    return suRoles.map((suRole) => ({
      id: suRole,
      label: ROLE_LABELS[suRole],
      suRole,
      agents: visibleAgents.filter((a) => a.role === suRole),
    }));
  }, [businessRoles, config, visibleAgents]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create agent</CardTitle>
            <CardSubtitle>Configure a new agent for this dashboard.</CardSubtitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-2" onSubmit={handleCreate}>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-muted mb-1">Name</label>
                <input
                  className="w-full rounded-md border border-line/60 px-2 py-1.5 text-sm"
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  placeholder="e.g. Claims Intake Triage"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-muted mb-1">Role</label>
                <select
                  className="w-full rounded-md border border-line/60 px-2 py-1.5 text-sm bg-white"
                  value={config ? draft.roleLabel || "" : draft.role}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (config) {
                      setDraft((d) => ({
                        ...d,
                        roleLabel: value,
                        role: nicheRoleToSuRole(config.slug, value) as AgentRole,
                      }));
                    } else {
                      setDraft((d) => ({ ...d, role: value as AgentRole }));
                    }
                  }}
                >
                  {config ? (
                    config.roles.map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="admin">Admin & governance</option>
                      <option value="teacher">Operational / analyst</option>
                      <option value="student">End‑user / frontline</option>
                    </>
                  )}
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-muted mb-1">Category</label>
                <input
                  className="w-full rounded-md border border-line/60 px-2 py-1.5 text-sm"
                  value={draft.category}
                  onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                  placeholder="e.g. Claims"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-muted mb-1">Link</label>
                <input
                  className="w-full rounded-md border border-line/60 px-2 py-1.5 text-sm"
                  value={draft.url}
                  onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
                  placeholder="https://agents.sentient-university.demo/custom"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-muted mb-1">Description</label>
                <textarea
                  className="w-full rounded-md border border-line/60 px-2 py-1.5 text-sm"
                  rows={2}
                  value={draft.description}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                  placeholder="Classifies claims and prioritizes by severity and coverage."
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-muted mb-1">What this agent can do</label>
                <input
                  className="w-full rounded-md border border-line/60 px-2 py-1.5 text-sm"
                  value={draft.bullet1}
                  onChange={(e) => setDraft((d) => ({ ...d, bullet1: e.target.value }))}
                  placeholder="e.g. Smoothens the workflow"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-muted mb-1 text-transparent select-none">
                  What this agent can do
                </label>
                <input
                  className="w-full rounded-md border border-line/60 px-2 py-1.5 text-sm"
                  value={draft.bullet2}
                  onChange={(e) => setDraft((d) => ({ ...d, bullet2: e.target.value }))}
                  placeholder="e.g. Helps you book appointments"
                />
              </div>
              <div className="md:col-span-2 flex items-end justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setDraft({
                      name: "",
                      description: "",
                      category: "General",
                      role: defaultSuRole,
                      roleLabel: defaultRoleLabel,
                      url: "",
                      bullet1: "",
                      bullet2: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Create agent
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {sections.map((section) =>
        section.agents.length === 0 ? null : (
          <Card key={section.id}>
            <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg">{section.label}</CardTitle>
                <CardSubtitle>
                  {section.agents.filter((a) => a.online).length} online • {section.agents.length} total
                  agents
                </CardSubtitle>
              </div>
              <Button
                type="button"
                variant="accent"
                size="sm"
                onClick={() => {
                  setShowAddForm(true);
                  setDraft((d) => ({
                    ...d,
                    role: section.suRole,
                    roleLabel: config ? section.label : d.roleLabel,
                  }));
                }}
              >
                <Plus className="h-4 w-4" />
                <span className="ml-1">Add new agent</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.agents.map((agent) => (
                  <AgentTile
                    key={agent.id}
                    agent={agent as any}
                    status={agent.online ? "online" : "offline"}
                    actions={
                      <>
                        <button
                          type="button"
                          onClick={() => toggleOnline((agent as any).id)}
                          aria-label={agent.online ? "Set agent offline" : "Set agent online"}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            agent.online ? "bg-emerald-500/80" : "bg-neutral-300/80"
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transform transition-transform ${
                              agent.online ? "translate-x-5" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeAgent((agent as any).id)}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-line/60 bg-white text-neutral-400 hover:bg-error/10 hover:text-error"
                          aria-label="Delete agent"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </>
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}