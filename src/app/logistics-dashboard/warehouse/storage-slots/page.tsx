"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import {
  TableCard,
  BarChartCard,
  DonutCard,
  ListCard,
  StatGridCard,
  FormCard,
} from "@/components/logistics/LogisticsWidgets";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

function Kpi({ label, value, hint, colorHex }: { label: string; value: string; hint: string; colorHex: string }) {
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
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>
        {value}
      </div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

export default function LogisticsStorageSlotsPage() {
  const { agents } = useAgents();
  const config = NICHES["logistics-dashboard"];
  const featured = agentsForNicheAndRole("logistics-dashboard", agents, {
    roleLabel: "Warehouse Supervisor",
  }).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agent (TOP) */}
      <section className="mb-6">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agent</h2>
          <p className="text-xs text-muted">
            Warehouse Slot Allocator — recommends storage locations to reduce travel time and congestion.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div className="grid gap-3 md:grid-cols-4">
        <Kpi label="Storage Utilization" value="82%" hint="bin-level" colorHex="#004AAD" />
        <Kpi label="Fast Movers in Golden Zone" value="74%" hint="of top SKUs" colorHex="#008C74" />
        <Kpi label="Location Accuracy" value="99.1%" hint="inventory in correct slot" colorHex="#6D28D9" />
        <Kpi label="Re-slot Suggestions" value="36" hint="pending review" colorHex="#F4B23E" />
      </div>

      {/* Rich dummy sections (10) for Storage & Slots */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* 1. Full-width slot map */}
        <div className="md:col-span-3">
          <TableCard
            title="Slot Map"
            columns={["Zone", "Aisles", "Bin Range", "Utilization"]}
            rows={[
              ["A - Fast movers", "1–6", "A001–A480", "91%"],
              ["B - Standard", "7–16", "B001–B960", "78%"],
              ["C - Bulk / Reserve", "17–24", "C001–C720", "69%"],
            ]}
            caption="High-level layout of storage zones and their utilization."
          />
        </div>

        {/* 2. AI slotting suggestions */}
        <FormCard
          title="AI Slotting Suggestions"
          fields={[
            { label: "Target zone", placeholder: "e.g. A – Fast movers" },
            { label: "Max travel distance (m)", placeholder: "e.g. 120" },
            { label: "SKU family", placeholder: "e.g. Beverage" },
          ]}
          submitLabel="Generate slotting plan"
        />

        {/* 3–4. Empty locations + urgent utilization actions */}
        <StatGridCard
          title="Empty & Overflow Locations"
          stats={[
            { label: "Empty bins", value: "184" },
            { label: "Overflow pallets", value: "37" },
            { label: "Quarantine locations", value: "12" },
            { label: "Reserved slots", value: "46" },
          ]}
        />
        <ListCard
          title="Urgent Slotting / Utilization Actions"
          items={[
            "Zone A fast‑mover aisles above 95% — move overflow to reserve before next inbound wave.",
            "Bulk reserve in Zone C under 70% — consider pulling slow movers from golden zone.",
            "Two aisles flagged for chronic congestion; review travel paths before peak shift.",
          ]}
        />

        {/* 4–5. Fast/slow movers (pie) + ABC classification */}
        <DonutCard
          title="Fast vs Slow Movers"
          caption="Relative activity share for A/B/C classified SKUs."
        />
        <StatGridCard
          title="ABC Classification"
          stats={[
            { label: "A items", value: "14%" },
            { label: "B items", value: "26%" },
            { label: "C items", value: "60%" },
            { label: "A items in golden zone", value: "88%" },
          ]}
        />

        {/* 5–6. Temperature / hazmat zones */}
        <ListCard
          title="Temperature Zones"
          items={[
            "Frozen zone at 98% capacity — watch inbound waves.",
            "Chilled zone stable at 82% utilization.",
            "Ambient zone carrying seasonal overstock in aisles B19–B24.",
          ]}
        />
        <ListCard
          title="Hazmat & Restricted Zones"
          items={[
            "Two hazmat aisles locked for maintenance.",
            "Spill response kit expiring next month — schedule replacement.",
            "Segregation rules enforced for flammables and corrosives.",
          ]}
        />

        {/* 7–8. Cycle counts & congestion */}
        <TableCard
          title="Cycle Count Coverage"
          columns={["Zone", "Last Count", "Variance", "Next Due"]}
          rows={[
            ["A", "Yesterday", "0.4%", "3 days"],
            ["B", "3 days ago", "0.9%", "Today"],
            ["C", "Last week", "1.8%", "2 days"],
          ]}
          caption="Sample coverage for ongoing cycle count program."
        />
        <BarChartCard
          title="Congestion Hotspots"
          caption="Illustrative travel congestion across aisles (pick paths)."
        />
      </div>
    </div>
  );
}


