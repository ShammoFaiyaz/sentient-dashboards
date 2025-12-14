"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { AgentTile } from "@/components/AgentTile";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole } from "@/components/niche/roleMap";

export default function Communications() {
  const config = NICHES["insurance-dashboard"];
  const { agents } = useAgents();
  const roleLabel = useNicheRole("insurance-dashboard", config.roles[0]);
  const featured = agentsForNicheAndRole("insurance-dashboard", agents, { roleLabel }).slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <section className="mb-4">
        <div className="mb-2">
          <h2 className="font-medium">Featured Agents</h2>
          <p className="text-xs text-muted">Automate outreach, summarize threads, and draft compliant responses.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map(a => <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />)}
        </div>
      </section>
      {/* KPI cards */}
      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <Kpi label="Unread" value="14" hint="inbox" colorHex="#004AAD" />
        <Kpi label="Avg Response" value="22m" hint="last 24h" colorHex="#008C74" />
        <Kpi label="Threads Today" value="38" hint="active" colorHex="#6D28D9" />
        <Kpi label="Templates Used" value="12" hint="last 7d" colorHex="#F4B23E" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle className="text-primary">Inbox</CardTitle>
          <div className="mt-2 overflow-x-auto rounded-md border border-line/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">From</th>
                  <th className="py-2 px-3">Subject</th>
                  <th className="py-2 px-3">Received</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Jane Doe", "Estimate question", "10:24"],
                  ["S. Gomez", "Photo request", "Yesterday"],
                  ["System", "SLA Warning", "2d"],
                  ["M. Chen", "Additional docs needed", "3d"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <CardTitle className="text-primary">Composer</CardTitle>
          <div className="mt-2 space-y-2">
            <label className="text-sm block">
              Customer
              <select className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm">
                <option>Jane Doe • POL-123456</option>
                <option>Michael Chen • POL-991027</option>
                <option>Sarah Gomez • POL-776512</option>
              </select>
            </label>
            <input className="w-full rounded-md border border-line/60 p-2 text-sm" placeholder="Subject" />
            <textarea className="w-full rounded-md border border-line/60 p-2 text-sm" rows={6} placeholder="Write your message..." />
            <div className="flex justify-end">
              <button className="rounded-md bg-primary text-white px-4 py-2 text-sm">Send</button>
            </div>
          </div>
        </Card>
        <Card>
          <CardTitle className="text-primary">Templates</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {["Request for additional documents","SLA reminder","Settlement proposal"].map((t,i)=>(
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-neutral-700">{t}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle className="text-primary">Recent Interactions</CardTitle>
          <ul className="mt-2 text-sm space-y-2">
            {["10:24 Outbound email to Jane Doe", "Yesterday Inbound email from S. Gomez", "2d System SLA alert"].map((e,i)=>(
              <li key={i} className="flex items-center gap-2 leading-6">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

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
      <div className="text-2xl font-semibold" style={{ color: colorHex }}>{value}</div>
      <div className="text-xs text-neutral-600">{hint}</div>
    </div>
  );
}

