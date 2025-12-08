"use client";

import { Card, CardTitle } from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";

type Staff = { id: string; name: string; role: "Instructor" | "Advisor" | "Registrar" | "Admin" };

const staff: Staff[] = [
  { id: "s1", name: "A. Kumar", role: "Instructor" },
  { id: "s2", name: "B. Lee", role: "Advisor" },
  { id: "s3", name: "C. Diaz", role: "Registrar" },
  { id: "s4", name: "D. Chen", role: "Admin" },
];

export default function AdminStaffPage() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Staff</h1>
      <Card className="mt-6">
        <CardTitle>People ({staff.length})</CardTitle>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="odd:bg-neutral-light/40">
                <Td>{s.name}</Td>
                <Td>{s.role}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost">Promote</Button>
                    <Button variant="ghost">Deactivate</Button>
                    <Button>Assign</Button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}


