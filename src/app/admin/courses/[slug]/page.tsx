import { notFound } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/Card";
import { studentCourses } from "@/mock/courses";

export default function AdminCourseManage({ params }: { params: { slug: string } }) {
  const course = studentCourses.find((c) => c.id === params.slug);
  if (!course) return notFound();
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-primary">Manage - {course.title}</h1>
      <Card className="mt-6">
        <CardTitle>Overview</CardTitle>
        <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
          <div>
            <div className="text-neutral-dark/70">Slug</div>
            <div className="text-ink/90">{course.id}</div>
          </div>
          <div>
            <div className="text-neutral-dark/70">Lessons</div>
            <div className="text-ink/90">{course.lessons.length}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-neutral-dark/70">Actions</div>
            <div className="text-ink/90">Assign instructors • Adjust sections • Review agents</div>
          </div>
        </div>
      </Card>
    </div>
  );
}


