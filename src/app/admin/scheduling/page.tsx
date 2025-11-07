import { Card, CardTitle } from "@/components/ui/Card";

export default function AdminScheduling() {
  const alerts = [
    { id: 1, text: "Physics 101 requests larger room • 60 seats" },
    { id: 2, text: "Algorithms A/B near capacity" },
  ];
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Scheduling</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Alerts</CardTitle>
          <ul className="list-inside list-disc text-sm text-neutral-dark/80">
            {alerts.map((a) => (<li key={a.id}>{a.text}</li>))}
          </ul>
        </Card>
        <Card>
          <CardTitle>Upcoming windows</CardTitle>
          <ul className="list-inside list-disc text-sm text-neutral-dark/80">
            <li>Registration opens - Dec 1</li>
            <li>Add/Drop - Jan 10–20</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}


