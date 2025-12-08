import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { studentCourses } from "@/mock/courses";
import { RelevantAgentsStrip } from "@/components/agents/RelevantAgentsStrip";
import { Sparkles, BookOpen, Brain } from "lucide-react";
import { agents } from "@/mock/agents";

export default function CourseSchedule({ params }: { params: { slug: string } }) {
  const course = studentCourses.find((c) => c.id === params.slug);
  if (!course) return notFound();

  const sessions = [
    { when: "Mon 10:00—11:15", where: "Room 204" },
    { when: "Wed 10:00—11:15", where: "Room 204" },
    { when: "Fri 10:00—11:15", where: "Room 204" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Schedule - {course.title}</h1>
      <RelevantAgentsStrip
        agents={[
          { icon: <Sparkles className="h-4 w-4" />, name: "Generative Teaching Assistant", href: agents.find(a=>a.id==="genai-assistant")?.url },
          { icon: <BookOpen className="h-4 w-4" />, name: "AI Literacy & Prompt Training", href: agents.find(a=>a.id==="ai-literacy-training")?.url },
          { icon: <Brain className="h-4 w-4" />, name: "AI Collaboration Labs", href: agents.find(a=>a.id==="ai-collab-labs")?.url },
        ]}
      />
      <Card className="mt-6">
        <CardTitle>Sessions</CardTitle>
        <ul className="mt-2 list-inside list-disc text-sm text-neutral-dark/80">
          {sessions.map((s, i) => (
            <li key={i}>{s.when} • {s.where}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}


