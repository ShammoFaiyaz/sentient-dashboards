"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

type StaffRole = "Admin" | "Registrar" | "Advisor";

type StaffMember = {
  id: string;
  name: string;
  role: StaffRole;
  email: string;
};

const staffMembers: StaffMember[] = [
  { id: "s-001", name: "Aisha Khan", role: "Admin", email: "aisha.khan@example.edu" },
  { id: "s-002", name: "Miguel Santos", role: "Registrar", email: "miguel.santos@example.edu" },
  { id: "s-003", name: "Priya Patel", role: "Advisor", email: "priya.patel@example.edu" },
  { id: "s-004", name: "Liam O'Connor", role: "Advisor", email: "liam.oconnor@example.edu" },
  { id: "s-005", name: "Sofia Rossi", role: "Registrar", email: "sofia.rossi@example.edu" },
  { id: "s-006", name: "David Chen", role: "Admin", email: "david.chen@example.edu" },
];

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const [first, second] = [parts[0], parts[parts.length - 1]];
  return ((first?.[0] ?? "").toUpperCase() + (second?.[0] ?? "").toUpperCase()) || "?";
}

export function StaffList() {
  const { show } = useToast();

  function onAction(action: "view" | "edit" | "deactivate", member: StaffMember) {
    const title = action === "view" ? "View profile" : action === "edit" ? "Edit staff" : "Deactivated";
    const variant = action === "deactivate" ? "warning" : "primary";
    show({ title, message: `${member.name} - ${member.role}`, variant });
  }

  return (
    <Card className="mt-8">
      <CardTitle>Staff List</CardTitle>
      <Table>
        <thead>
          <tr>
            <Th>Avatar</Th>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((m) => (
            <tr key={m.id} className="odd:bg-neutral-light/40">
              <Td>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {getInitials(m.name)}
                </div>
              </Td>
              <Td className="whitespace-nowrap">{m.name}</Td>
              <Td>{m.role}</Td>
              <Td className="text-sm text-neutral-dark/80">{m.email}</Td>
              <Td>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => onAction("view", m)}>View</Button>
                  <Button size="sm" variant="ghost" onClick={() => onAction("edit", m)}>Edit</Button>
                  <Button size="sm" variant="ghost" className="!border-error !text-error hover:!bg-error/10" onClick={() => onAction("deactivate", m)}>Deactivate</Button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}


