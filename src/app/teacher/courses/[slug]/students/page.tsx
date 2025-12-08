import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { studentCourses } from "@/mock/courses";
import { RelevantAgentsStrip } from "@/components/agents/RelevantAgentsStrip";
import { Sparkles, BookOpen, Brain } from "lucide-react";
import { agents } from "@/mock/agents";

export default function CourseStudents({ params }: { params: { slug: string } }) {
  const course = studentCourses.find((c) => c.id === params.slug);
  if (!course) return notFound();

  const items = [
    { name: "Alex R.", status: "Active", email: "alex@example.edu" },
    { name: "Bianca T.", status: "Active", email: "bianca@example.edu" },
    { name: "Carlos P.", status: "Probation", email: "carlos@example.edu" },
    { name: "Dana K.", status: "Active", email: "dana@example.edu" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-1.5 py-4">
      <h1 className="text-2xl font-semibold text-primary">Students - {course.title}</h1>
      <RelevantAgentsStrip
        agents={[
          { icon: <Sparkles className="h-4 w-4" />, name: "Generative Teaching Assistant", href: agents.find(a=>a.id==="genai-assistant")?.url },
          { icon: <BookOpen className="h-4 w-4" />, name: "AI Literacy & Prompt Training", href: agents.find(a=>a.id==="ai-literacy-training")?.url },
          { icon: <Brain className="h-4 w-4" />, name: "AI Collaboration Labs", href: agents.find(a=>a.id==="ai-collab-labs")?.url },
        ]}
      />
      <Card className="mt-6">
        <CardTitle>Roster ({items.length})</CardTitle>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Email</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.email} className="odd:bg-neutral-light/40">
                <Td>{s.name}</Td>
                <Td>{s.status}</Td>
                <Td className="text-sm text-neutral-dark/80">{s.email}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}


