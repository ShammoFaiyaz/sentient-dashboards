"use client";
import { Card, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import { AgentTile } from "@/components/AgentTile";
import { agentsForRole } from "@/mock/agents";
import { Button } from "@/components/ui/Button";
 

export default function StudentAssessments() {
  const router = useRouter();
  const items = [
    { title: "Algorithms Quiz 2", due: "Nov 12", type: "Quiz", est: "20 mins" },
    { title: "Ethics Essay Draft", due: "Nov 15", type: "Essay", est: "45–60 mins" },
  ];

  const openMentorIntent = () => {
    router.push("/student/agents?intent=schedule_practice");
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Assessments</h1>
      <section className="mt-4">
        <h2 className="mb-1 font-medium">Featured Agents</h2>
        <p className="mb-2 text-xs text-muted">Transparent • Cites sources • Human override</p>
        <div className="grid gap-4 md:grid-cols-3">
          {agentsForRole("student").slice(0,3).map((a) => (
            <AgentTile key={a.id} agent={a} />
          ))}
        </div>
      </section>
      
      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="Nothing due"
            body="Stay sharp - schedule a quick practice session with your Mentor."
            ctaLabel="Ask Mentor to schedule practice"
            onCtaClick={openMentorIntent}
            variant="accent"
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <Card
              key={it.title}
              role="button"
              tabIndex={0}
              onClick={() => router.push("/student/agents?intent=practice")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push("/student/agents?intent=practice"); } }}
              className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 7h8M8 12h8M8 17h5" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <div>
                  <CardTitle className="text-[18px] md:text-[20px]">{it.title}</CardTitle>
                  <p className="text-[13px] text-muted">Prepare and submit on time.</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                <div>Due: <span className="text-ink/90">{it.due}</span></div>
                <div>Type: <span className="text-ink/90">{it.type}</span></div>
                <div>Est. time: <span className="text-ink/90">{it.est}</span></div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Button variant="ghost" onClick={(e) => { e.stopPropagation(); router.push("/student/agents?intent=practice"); }}>Open</Button>
                <Button variant="ghost" onClick={(e) => { e.stopPropagation(); router.push("/student/courses"); }}>Review</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


