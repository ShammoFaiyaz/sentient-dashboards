"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getCourseById } from "@/mock/courses";

export default function LessonPage({ params }: { params: { id: string; lessonId: string } }) {
  const course = getCourseById(params.id);
  const lesson = useMemo(() => course?.lessons.find((l) => l.id === params.lessonId), [course, params.lessonId]);
  const [response, setResponse] = useState<string>("");

  if (!course || !lesson) return notFound();

  function explain() {
    setResponse("In greedy algorithms, at each step we choose the locally best option with the hope of reaching a global optimum. Example: selecting activities by earliest finish time.");
  }
  function example() {
    setResponse("Worked example: Given items with weights/values, the fractional knapsack sorts by value/weight and takes greedily until capacity is full.");
  }
  function quiz() {
    setResponse("Quick check: Which property must hold for greedy to be optimal in interval scheduling? A) Optimal substructure B) Matroid structure C) Overlapping subproblems. Correct: B.");
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link href={`/student/courses/${course.id}`} className="text-sm text-primary hover:underline">← Back to {course.title}</Link>
      <h1 className="mt-2 text-2xl font-semibold text-primary">Lesson: {lesson.title}</h1>

      <Card className="mt-4">
        <CardTitle>Inline Mentor</CardTitle>
        <div className="mt-3 flex gap-2">
          <Button onClick={explain}>Explain simply</Button>
          <Button variant="ghost" onClick={example}>Give example</Button>
          <Button variant="accent" onClick={quiz}>Quiz me</Button>
        </div>
        {response && <p className="mt-3 text-sm text-neutral-dark/90">{response}</p>}
      </Card>
    </div>
  );
}


