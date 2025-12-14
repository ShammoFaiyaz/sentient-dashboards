"use client";

import * as React from "react";
import { AgentTile } from "@/components/AgentTile";
import { useAgents } from "@/context/AgentsProvider";
import { NICHES } from "@/niches/config";
import { useNicheRole } from "@/components/niche/useNicheRole";
import { agentsForNicheAndRole, nicheRoleToSuRole } from "@/components/niche/roleMap";
import { usePathname } from "next/navigation";

export default function AppointmentsPage() {
  const { agents } = useAgents();
  const config = NICHES["healthcare-dashboard"];
  const roleLabel = useNicheRole("healthcare-dashboard", "Doctor");
  const pathname = usePathname() || "";
  const suRole = nicheRoleToSuRole("healthcare-dashboard", roleLabel);
  const effectiveRole = pathname.includes("/healthcare-dashboard/admin/") ? "admin" : suRole;
  const featured = agentsForNicheAndRole("healthcare-dashboard", agents, {
    suRole: effectiveRole,
  }).slice(0, 3);
  const [role, setRole] = React.useState<"Doctor" | "Patient">("Doctor");
  const [symptoms, setSymptoms] = React.useState("");
  const [preference, setPreference] = React.useState<"Any" | "Today" | "This Week" | "Next Week">("Any");
  const [visitType, setVisitType] = React.useState<"In‑person" | "Telehealth">("In‑person");
  const [aiPlan, setAiPlan] = React.useState<{ time: string; doctor: string; location: string; type: string } | null>(null);
  const [booked, setBooked] = React.useState(false);
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem("niche.role.healthcare-dashboard");
      if (stored === "Patient") setRole("Patient");
      else setRole("Doctor");
    } catch {}
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      {/* Featured Agents — SU style */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="font-medium">Featured Agents</h2>
            <p className="text-xs text-muted mt-0.5">
              Scheduling & Triage Agents — propose optimal slots, pre‑fill notes from symptoms, and trigger reminders.
            </p>
          </div>
          <a href="/healthcare-dashboard/agents" className="rounded-md px-2 py-1 text-sm text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            View all agents
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((a) => (
            <AgentTile key={a.id} agent={a} status={a.online ? "online" : "offline"} />
          ))}
        </div>
      </section>

      {/* KPI row (role-aware) */}
      <div className="grid gap-3 md:grid-cols-4">
        {role === "Patient" ? (
          <>
            <Kpi label="Upcoming Appointments" value="3" hint="next 30 days" colorHex="#004AAD" />
            <Kpi label="Completed This Month" value="2" hint="so far" colorHex="#008C74" />
            <Kpi label="Cancelled This Month" value="1" hint="so far" colorHex="#6D28D9" />
            <Kpi label="Telehealth Sessions" value="1" hint="scheduled" colorHex="#F4B23E" />
          </>
        ) : (
          <>
            <Kpi label="Appointments Today" value="38" hint="vs yesterday +3" colorHex="#004AAD" />
            <Kpi label="Cancelled Today" value="2" hint="rescheduled 1" colorHex="#008C74" />
            <Kpi label="No‑Shows This Week" value="4" hint="rolling 7d" colorHex="#6D28D9" />
            <Kpi label="Telehealth Today" value="9" hint="of total visits" colorHex="#F4B23E" />
          </>
        )}
      </div>

      {/* Calendar / or patient table + charts */}
      {role === "Doctor" ? (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
            <div className="text-sm font-semibold text-primary mb-2">Day Schedule</div>
            <div className="mt-2 h-64 border border-dashed border-line/60 rounded-md p-3 text-xs text-muted">
              <div className="grid grid-cols-[80px_1fr] gap-2">
                {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"].map((t, i) => (
                  <React.Fragment key={t}>
                    <div className="text-right pr-2">{t}</div>
                    <div className="border border-line/60 rounded-md px-3 py-2 flex justify-between">
                      <span>{["Follow‑up", "Telehealth", "New patient", "Procedure", "Follow‑up", "Telehealth"][i]}</span>
                      <span className="text-muted">Patient #{i + 1}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
            <div className="text-sm font-semibold text-primary mb-2">Appointment Types Breakdown</div>
            <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-40 h-40">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
                <g transform="rotate(-90 100 100)">
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="110 260" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="80 290" strokeDashoffset="-110" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="60 310" strokeDashoffset="-190" />
                </g>
                <circle cx="100" cy="100" r="40" fill="white" />
              </svg>
            </div>
            <div className="text-[11px] text-muted">Distribution of appointment types for the current week.</div>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
            <div className="text-sm font-semibold text-primary mb-2">My Appointments</div>
            <div className="overflow-x-auto border border-line/60 rounded-md">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-muted">
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Doctor</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["2025‑02‑01 09:00", "Dr. Patel", "General", "Scheduled"],
                    ["2025‑01‑20 10:30", "Dr. Lee", "Telehealth", "Completed"],
                    ["2025‑01‑10 11:00", "Dr. Rivera", "Follow‑up", "Cancelled"],
                  ].map((r, i) => (
                    <tr key={i} className="border-t border-line/60">
                      {r.map((c, j) => (
                        <td key={j} className="py-2 px-3">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
            <div className="text-sm font-semibold text-primary mb-2">Appointment Types</div>
            <div className="mt-2 h-44 border border-line/60 rounded-md p-3 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-40 h-40">
                <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="24" />
                <g transform="rotate(-90 100 100)">
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#60A5FA" strokeWidth="24" strokeDasharray="120 250" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#34D399" strokeWidth="24" strokeDasharray="70 300" strokeDashoffset="-120" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#FBBF24" strokeWidth="24" strokeDasharray="60 310" strokeDashoffset="-190" />
                </g>
                <circle cx="100" cy="100" r="40" fill="white" />
              </svg>
            </div>
            <div className="text-[11px] text-muted">Breakdown of your appointments this month.</div>
          </div>
        </div>
      )}

      {/* Patient self-booking with AI assistance */}
      {role === "Patient" && (
        <div className="mt-4 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">AI‑Assisted Booking</div>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="text-sm md:col-span-2">
              <div className="mb-1 text-muted">Describe your symptoms</div>
              <textarea
                className="w-full rounded-md border border-line px-3 py-2 text-sm"
                placeholder="e.g., persistent cough, mild fever, shortness of breath..."
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </label>
            <div className="grid gap-3">
              <label className="text-sm">
                <div className="mb-1 text-muted">Preferred timing</div>
                <select
                  className="w-full rounded-md border border-line px-3 py-2 text-sm"
                  value={preference}
                  onChange={(e) => setPreference(e.target.value as any)}
                >
                  <option>Any</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>Next Week</option>
                </select>
              </label>
              <label className="text-sm">
                <div className="mb-1 text-muted">Visit type</div>
                <select
                  className="w-full rounded-md border border-line px-3 py-2 text-sm"
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value as any)}
                >
                  <option>In‑person</option>
                  <option>Telehealth</option>
                </select>
              </label>
              <button
                className="mt-1 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                onClick={() => {
                  // mock AI planning based on symptom keywords + preferences
                  const isResp = /cough|breath|chest|fever/i.test(symptoms);
                  const plan = {
                    time:
                      preference === "Today"
                        ? "Today, 17:30"
                        : preference === "This Week"
                        ? "Wed, 14:00"
                        : preference === "Next Week"
                        ? "Mon, 10:30"
                        : "Tomorrow, 11:00",
                    doctor: isResp ? "Dr. Lee (Pulmonology)" : "Dr. Patel (Internal Medicine)",
                    location: visitType === "Telehealth" ? "Video visit" : "Main Clinic • Room 204",
                    type: visitType,
                  };
                  setAiPlan(plan);
                  setBooked(false);
                }}
              >
                Suggest & Book via AI
              </button>
            </div>
          </div>
          {/* AI suggestion panel */}
          {aiPlan && (
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <div className="rounded-lg border border-line/60 p-3">
                <div className="text-xs text-muted">Suggested time</div>
                <div className="text-lg font-semibold text-ink">{aiPlan.time}</div>
              </div>
              <div className="rounded-lg border border-line/60 p-3">
                <div className="text-xs text-muted">Clinician</div>
                <div className="text-lg font-semibold text-ink">{aiPlan.doctor}</div>
              </div>
              <div className="rounded-lg border border-line/60 p-3">
                <div className="text-xs text-muted">Location</div>
                <div className="text-lg font-semibold text-ink">{aiPlan.location}</div>
              </div>
              <div className="rounded-lg border border-line/60 p-3">
                <div className="text-xs text-muted">Visit type</div>
                <div className="text-lg font-semibold text-ink">{aiPlan.type}</div>
              </div>
              <div className="md:col-span-4 flex items-center justify-between rounded-lg bg-primary/5 border border-primary/30 p-3">
                <div className="text-sm text-ink">
                  AI matched your symptoms to the appropriate specialty and nearest availability.
                </div>
                <button
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                  onClick={() => setBooked(true)}
                >
                  Confirm Booking
                </button>
              </div>
              {booked && (
                <div className="md:col-span-4 rounded-lg bg-success/10 border border-success/30 p-3 text-success text-sm">
                  Booking confirmed. A confirmation message and pre‑visit checklist have been sent to your email and messages.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Alerts / Checklist */}
      <div className="mt-6 rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
        <div className="text-sm font-semibold text-primary mb-2">{role === "Patient" ? "Visit Prep Checklist" : "Scheduling Alerts"}</div>
        <ul className="space-y-2">
          {(role === "Patient"
            ? ["Bring recent lab results.", "Update medication list.", "Note new symptoms since last visit."]
            : ["Tomorrow is over 80% booked between 9 AM – 1 PM.", "2 patients scheduled twice this week.", "Several high‑risk patients have no follow‑up booked."]
          ).map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Agent‑style sections for scheduling */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm md:col-span-2">
          <div className="text-sm font-semibold text-primary mb-2">Scheduling Agent Suggestions</div>
          <ul className="space-y-2 text-sm">
            {[
              "Convert low‑complexity visits at 4 PM to telehealth to reduce wait time.",
              "Block 30 minutes at 1 PM for urgent walk‑ins (historical peak).",
              "Auto‑notify patients with incomplete pre‑visit forms (6 detected).",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-ink">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/60 bg-white p-4 shadow-elevation-sm">
          <div className="text-sm font-semibold text-primary mb-2">Automation Queue</div>
          <div className="overflow-x-auto border border-line/60 rounded-md">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="py-2 px-3">Task</th>
                  <th className="py-2 px-3">Agent</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Send prep instructions (Procedure 11:00)", "Care Coach Agent", "Running"],
                  ["Reschedule cancelled 10:30 slot", "Scheduling Agent", "Queued"],
                  ["Confirm telehealth link (09:30)", "Messaging Agent", "Completed"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-line/60">
                    <td className="py-2 px-3">{r[0]}</td>
                    <td className="py-2 px-3">{r[1]}</td>
                    <td className="py-2 px-3">
                      <span
                        className={
                          r[2] === "Completed"
                            ? "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"
                            : r[2] === "Queued"
                            ? "rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning"
                            : "rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                        }
                      >
                        {r[2]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

