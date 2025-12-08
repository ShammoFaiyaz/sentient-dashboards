import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { Table, Th, Td } from "@/components/ui/Table";
import { studentCourses } from "@/mock/courses";
import { RelevantAgentsStrip } from "@/components/agents/RelevantAgentsStrip";
import { Sparkles, BookOpen, Brain } from "lucide-react";
import { agents } from "@/mock/agents";

export default function CourseGrading({ params }: { params: { slug: string } }) {
  const course = studentCourses.find((c) => c.id === params.slug);
  if (!course) return notFound();

  const items = [
    { id: "a1", student: "Alex R.", item: "Quiz 2", status: "Submitted" },
    { id: "a2", student: "Bianca T.", item: "Essay Draft", status: "Awaiting" },
    { id: "a3", student: "Carlos P.", item: "Lab 3", status: "Needs review" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-2 py-6">
      <h1 className="text-2xl font-semibold text-primary">Grading - {course.title}</h1>
      <RelevantAgentsStrip
        agents={[
          { icon: <Sparkles className="h-4 w-4" />, name: "Generative Teaching Assistant", href: agents.find(a=>a.id==="genai-assistant")?.url },
          { icon: <BookOpen className="h-4 w-4" />, name: "AI Literacy & Prompt Training", href: agents.find(a=>a.id==="ai-literacy-training")?.url },
          { icon: <Brain className="h-4 w-4" />, name: "AI Collaboration Labs", href: agents.find(a=>a.id==="ai-collab-labs")?.url },
        ]}
      />
      <Card className="mt-6">
        <CardTitle>Submissions</CardTitle>
        <Table>
          <thead>
            <tr>
              <Th>Student</Th>
              <Th>Item</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id} className="odd:bg-neutral-light/40">
                <Td>{s.student}</Td>
                <Td>{s.item}</Td>
                <Td>{s.status}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}


