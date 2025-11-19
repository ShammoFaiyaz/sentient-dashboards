"use client";

 import { AgentTile } from "@/components/AgentTile";
 import { useAgents } from "@/context/AgentsProvider";
 import { useState } from "react";
 import { Button } from "@/components/ui/Button";
 
 export default function AdminAgents() {
 const { agentsByRole, toggleOnline, createAgent, removeAgent, setAllOffline } = useAgents();
   const students = agentsByRole("student");
   const teachers = agentsByRole("teacher");
   const admins = agentsByRole("admin");
 
   const [openForm, setOpenForm] = useState(false);
   const [name, setName] = useState("");
   const [role, setRole] = useState<"student" | "teacher" | "admin">("admin");
   const [category, setCategory] = useState("General");
   const [description, setDescription] = useState("");
   const [url, setUrl] = useState("https://agents.sentient-university.demo/custom");
  const [bullet1, setBullet1] = useState("");
  const [bullet2, setBullet2] = useState("");
 
   function submitNew() {
     if (!name || !description) return;
    const bullets = [bullet1, bullet2].filter(Boolean);
    createAgent({ name, role, category, description, url, bullets, icon: "bot", color: "primary" });
    setName(""); setDescription(""); setCategory("General"); setRole("admin"); setBullet1(""); setBullet2(""); setOpenForm(false);
   }
  return (
    <div className="mx-auto max-w-7xl px-3 md:px-1.5 py-4">
      {/* <div className="flex items-center justify-end gap-2">
        <Button variant="danger" onClick={setAllOffline}>Set all offline</Button>
      </div> */}
      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Agent Management</h1>
          <p className="mt-1 text-xs text-muted">Create agents and toggle availability across the app.</p>
        </div>
      </div> */}
 
       {openForm && (
         <div className="mt-4 rounded-lg border border-line/60 bg-white p-4 shadow-elevation-sm">
           <div className="grid gap-3 sm:grid-cols-2">
             <label className="text-sm">Name
               <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="Agent name" />
             </label>
             <label className="text-sm">Role
               <select value={role} onChange={(e) => setRole(e.target.value as any)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm">
                 <option value="admin">Admin</option>
                 <option value="teacher">Teacher</option>
                 <option value="student">Student</option>
               </select>
             </label>
             <label className="text-sm">Category
               <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="Category" />
             </label>
             <label className="text-sm">Link
               <input value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" placeholder="https://…" />
             </label>
             <label className="text-sm sm:col-span-2">Description
               <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-md border border-line/60 p-2 text-sm" rows={3} placeholder="What this agent does" />
             </label>
              <div className="sm:col-span-2">
                <div className="text-sm">What this agent can do</div>
                <div className="mt-1 grid gap-2 sm:grid-cols-2">
                  <input
                    value={bullet1}
                    onChange={(e) => setBullet1(e.target.value)}
                    className="w-full rounded-md border border-line/60 p-2 text-sm"
                    placeholder="e.g., Segment & personalize journeys"
                  />
                  <input
                    value={bullet2}
                    onChange={(e) => setBullet2(e.target.value)}
                    className="w-full rounded-md border border-line/60 p-2 text-sm"
                    placeholder="e.g., A/B optimize content"
                  />
                </div>
              </div>
           </div>
           <div className="mt-3 flex justify-end">
             <Button onClick={submitNew}>Create agent</Button>
           </div>
         </div>
       )}
 
      <Section
        title="Student Agents"
        action={<Button onClick={() => setOpenForm((s) => !s)}>{openForm ? "Close" : "Add agent"}</Button>}
      >
        <AgentsGrid items={students} onToggle={toggleOnline} onRemove={removeAgent} />
       </Section>
      <Section
        title="Teacher Agents"
        action={<Button onClick={() => setOpenForm((s) => !s)}>{openForm ? "Close" : "Add agent"}</Button>}
      >
        <AgentsGrid items={teachers} onToggle={toggleOnline} onRemove={removeAgent} />
      </Section>
      <Section
        title="Admin Agents"
        action={<Button onClick={() => setOpenForm((s) => !s)}>{openForm ? "Close" : "Add agent"}</Button>}
      >
        <AgentsGrid items={admins} onToggle={toggleOnline} onRemove={removeAgent} />
      </Section>
     </div>
   );
 }
 
function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
   return (
     <section className="mt-8">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        {action && <div className="shrink-0">{action}</div>}
      </div>
       <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>
     </section>
   );
 }
 
function AgentsGrid({ items, onToggle, onRemove }: { items: ReturnType<typeof useAgents>["agents"]; onToggle: (id: string) => void; onRemove: (id: string) => void }) {
   return (
     <>
       {items.map((a) => (
         <div key={a.id} className="relative">
           <div className="absolute right-3 top-3 z-10">
             <button
               onClick={() => onToggle(a.id)}
               className={[
                 "inline-flex h-6 w-10 items-center rounded-full border border-line/60 bg-white p-0.5 shadow-elevation-sm transition",
                 a.online ? "justify-end" : "justify-start",
               ].join(" ")}
               aria-label="Toggle availability"
               aria-pressed={a.online}
             >
               <span className={["h-5 w-5 rounded-full transition", a.online ? "bg-emerald-500" : "bg-neutral-400"].join(" ")} />
             </button>
           </div>
          <div className="absolute right-3 top-12 z-10">
            <button
              onClick={() => {
                if (window.confirm(`Delete agent "${a.name}"?`)) onRemove(a.id);
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-error/50 text-error/80 bg-white shadow-elevation-sm hover:bg-error/5"
              aria-label={`Delete ${a.name}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
           <AgentTile agent={a} status={a.online ? "online" : "offline"} />
         </div>
       ))}
     </>
   );
 }
 
