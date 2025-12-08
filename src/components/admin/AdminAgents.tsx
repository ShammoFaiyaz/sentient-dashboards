"use client";

import * as React from "react";
import { useAgents } from "@/context/AgentsProvider";
import { Card, CardTitle } from "@/components/ui/Card";

export default function AdminAgents() {
  const { agents, toggleOnline, removeAgent } = useAgents();

  return (
    <div className="mx-auto max-w-6xl px-2 py-6">
      <Card>
        <CardTitle>Agents</CardTitle>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">Role</th>
                <th className="px-2 py-2">Category</th>
                <th className="px-2 py-2">Online</th>
                <th className="px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a.id} className="border-t border-line/60">
                  <td className="px-2 py-2 text-ink">{a.name}</td>
                  <td className="px-2 py-2">{a.role}</td>
                  <td className="px-2 py-2">{a.category}</td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => toggleOnline(a.id)}
                      className={`rounded-full px-2 py-1 text-xs ${
                        a.online ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {a.online ? "Online" : "Offline"}
                    </button>
                  </td>
                  <td className="px-2 py-2">
                    <button
                      onClick={() => removeAgent(a.id)}
                      className="rounded-md px-2 py-1 text-xs text-error hover:bg-error/10"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


