import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { candidates } from "@/mock/admissions";

export default function AdminAdmissionDetail({ params }: { params: { id: string } }) {
  const cand = candidates.find((c) => c.id === params.id);
  if (!cand) return notFound();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Application - {cand.name}</h1>
      <Card className="mt-6">
        <CardTitle>Details</CardTitle>
        <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
          <div>
            <div className="text-neutral-dark/70">ID</div>
            <div className="text-ink/90">{cand.id}</div>
          </div>
          <div>
            <div className="text-neutral-dark/70">Program</div>
            <div className="text-ink/90">{cand.program}</div>
          </div>
          <div>
            <div className="text-neutral-dark/70">GPA</div>
            <div className="text-ink/90">{cand.gpa.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-neutral-dark/70">Score</div>
            <div className="text-ink/90">{cand.score}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-neutral-dark/70">Why</div>
            <div className="text-ink/90">{cand.why}</div>
          </div>
          <div>
            <div className="text-neutral-dark/70">Docs</div>
            <div className="text-ink/90">{cand.missingDocs ? "Missing" : "Complete"}</div>
          </div>
          <div>
            <div className="text-neutral-dark/70">Visa</div>
            <div className="text-ink/90">{cand.visa ?? "—"}</div>
          </div>
          <div>
            <div className="text-neutral-dark/70">Fee Waiver</div>
            <div className="text-ink/90">{cand.feeWaiver ? "Yes" : "No"}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}


