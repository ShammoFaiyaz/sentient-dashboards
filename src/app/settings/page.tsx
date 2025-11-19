"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useDensity } from "@/components/prefs/DensityProvider";
import { useRole } from "@/components/role/RoleProvider";

export default function SettingsPage() {
  const { density, setDensity } = useDensity();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("student@example.edu");
  const { role } = useRole();
  const major = role === "student" ? "Computer Science" : role === "teacher" ? "Faculty" : "Operations";

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
  }, [theme]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Settings</h1>
      <div className="mt-6">
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">User settings</div>
        <div className="space-y-4">
        <Card>
          <CardTitle>Profile</CardTitle>
          <div className="mt-3 grid gap-3 md:grid-cols-3 text-sm">
            <div className="flex items-center gap-3 md:col-span-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line/60 bg-neutral-light/60 text-muted">IMG</div>
              <button className="rounded-control border border-line/60 px-2 py-1 text-[12px] text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Upload</button>
            </div>
            <label className="block md:col-span-1">
              <div className="mb-1 text-neutral-dark/70">Name</div>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-line/60 p-2" />
            </label>
            <label className="block">
              <div className="mb-1 text-neutral-dark/70">Email</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-line/60 p-2" />
            </label>
          </div>
          <div className="mt-3 flex justify-end">
            <Button>Save</Button>
          </div>
        </Card>
        <Card>
          <CardTitle>Role / Major</CardTitle>
          <div className="mt-3 grid gap-3 md:grid-cols-2 text-sm">
            <div>
              <div className="mb-1 text-neutral-dark/70">Role</div>
              <div className="rounded-md border border-line/60 bg-neutral-light/40 p-2">{role.charAt(0).toUpperCase() + role.slice(1)}</div>
            </div>
            <div>
              <div className="mb-1 text-neutral-dark/70">{role === "student" ? "Major" : "Department"}</div>
              <div className="rounded-md border border-line/60 bg-neutral-light/40 p-2">{major}</div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button>Save</Button>
          </div>
        </Card>
        
        </div>

        <div className="mt-8 mb-2 text-xs font-medium uppercase tracking-wide text-muted">App settings</div>
        <div className="space-y-4">
          <Card>
            <CardTitle>Notifications</CardTitle>
            <div className="mt-3 space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Email summaries</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Deadline reminders</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Push notifications</span>
              </label>
            </div>
          </Card>
          <Card>
            <CardTitle>Data & Privacy</CardTitle>
            <div className="mt-3 space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Anonymize analytics data</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Allow product improvements</span>
              </label>
            </div>
          </Card>
          <Card>
            <CardTitle>Integrations</CardTitle>
            <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
              <label className="flex items-center justify-between rounded-md border border-line/60 p-2">
                <span>Calendar sync</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className="flex items-center justify-between rounded-md border border-line/60 p-2">
                <span>Cloud drive</span>
                <input type="checkbox" />
              </label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


