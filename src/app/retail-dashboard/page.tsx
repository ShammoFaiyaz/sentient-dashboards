"use client";

import * as React from "react";
import Link from "next/link";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import NewsCarousel from "@/components/news/NewsCarousel";
import WelcomeBanner from "@/components/topbar/WelcomeBanner";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

function KpiCard({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md bg-white border border-line/60"
      style={{
        background:
          colorHex === "#004AAD"
            ? "linear-gradient(180deg, rgba(0,74,173,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#008C74"
            ? "linear-gradient(180deg, rgba(0,140,116,0.14) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#6D28D9"
            ? "linear-gradient(180deg, rgba(109,40,217,0.12) 0%, rgba(255,255,255,1) 100%)"
            : colorHex === "#EF4444"
            ? "linear-gradient(180deg, rgba(239,68,68,0.12) 0%, rgba(255,255,255,1) 100%)"
            : "linear-gradient(180deg, rgba(244,178,62,0.18) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="text-xs text-muted">{label}</div>
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function RetailDashboard() {
  const { agents } = useAgents();
  const config = NICHES["retail-dashboard"];
  const role = useNicheRole("retail-dashboard", "Store Manager");
  const featured = agentsForNicheAndRole("retail-dashboard", agents, { roleLabel: role }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <WelcomeBanner />
      {/* KPI cards (role-aware) */}
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {role === "Merchandiser" ? (
          <>
            <KpiCard label="Active Products" value="8,420" hint="online + stores" colorHex="#004AAD" />
            <KpiCard label="Promotions Running" value="32" hint="live campaigns" colorHex="#008C74" />
            <KpiCard label="Out-of-Stock SKUs" value="42" hint="requires action" colorHex="#EF4444" />
            <KpiCard label="Supplier Alerts" value="7" hint="pending" colorHex="#6D28D9" />
          </>
        ) : role === "Admin" ? (
          <>
            <KpiCard label="Active Users" value="54k" hint="system‑wide" colorHex="#004AAD" />
            <KpiCard label="Total Products" value="8,420" hint="catalog" colorHex="#008C74" />
            <KpiCard label="Sales Today" value="$182k" hint="POS + online" colorHex="#6D28D9" />
            <KpiCard label="System Alerts" value="12" hint="last 24h" colorHex="#F4B23E" />
          </>
        ) : role === "Customer" ? (
          <>
            <KpiCard label="Loyalty Points" value="12,400" hint="available" colorHex="#004AAD" />
            <KpiCard label="Active Orders" value="3" hint="in progress" colorHex="#008C74" />
            <KpiCard label="Pending Returns" value="1" hint="awaiting pick-up" colorHex="#6D28D9" />
            <KpiCard label="Saved Items" value="22" hint="wishlist" colorHex="#F4B23E" />
          </>
        ) : (
          <>
            <KpiCard label="Daily Sales" value="$182k" hint="POS + online" colorHex="#004AAD" />
            <KpiCard label="Monthly Sales" value="$4.6M" hint="MTD" colorHex="#008C74" />
            <KpiCard label="Foot Traffic Today" value="5,120" hint="sensors" colorHex="#6D28D9" />
            <KpiCard label="Conversion Rate" value="3.8%" hint="today" colorHex="#F4B23E" />
          </>
        )}
      </div>

      {/* Latest news carousel (under KPI cards) */}
      <div className="mt-6">
        <NewsCarousel />
      </div>

      {/* Remove extra charts/updates per request */}

      {/* Featured agents block (SU-style) */}
      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted">
              {role === "Merchandiser"
                ? "Merchandising Agent — summarizes product performance and pricing opportunities."
                : role === "Admin"
                ? "Retail Operations Agent — highlights operational risks, system alerts, and performance KPIs."
                : role === "Customer"
                ? "Shopping Assistant Agent — order status, returns help, and recommendations."
                : "Store Insights Agent — summarizes store performance and operational priorities."}
            </p>
          </div>
          <Link href="/retail-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">View all agents</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.length > 0 ? (
            featured.map((a) => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)
          ) : (
            <div className="rounded-2xl border border-line/60 bg-white p-5 text-sm text-muted">No agent configured; placeholder card.</div>
          )}
        </div>
      </section>
    </div>
  );
}
