"use client";

import { useNicheRole } from "@/components/niche/useNicheRole";

function Panel({ title }: { title: string }) {
  return (
    <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
      <div className="text-sm font-semibold text-ink mb-2">{title}</div>
      <div className="h-48 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">chart / heatmap</div>
    </div>
  );
}

export default function RiskCompliancePage() {
  const role = useNicheRole("fintech-dashboard", "Risk Officer");
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Risk & Compliance</h1>
      <div className="text-sm text-muted mb-3">Role: {role}</div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="AML Alerts" />
        <Panel title="KYC Coverage" />
        <Panel title="Fraud Detection" />
        <Panel title="Policy Violations" />
      </div>
    </div>
  );
}


