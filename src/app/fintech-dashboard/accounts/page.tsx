"use client";

import { useNicheRole } from "@/components/niche/useNicheRole";

export default function AccountsPage() {
  const role = useNicheRole("fintech-dashboard", "Portfolio Manager");
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Accounts</h1>
      <div className="text-sm text-muted mb-3">Role: {role}</div>
      <div className="rounded-2xl bg-white border border-line/60 shadow-md p-4">
        <div className="text-sm font-semibold text-ink mb-2">Account Summary</div>
        <div className="h-56 rounded-md bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-dashed border-zinc-300 flex items-center justify-center text-xs text-zinc-500">table / cards placeholder</div>
      </div>
    </div>
  );
}


