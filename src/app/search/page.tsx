"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { agents } from "@/mock/agents";
import { NEWS_ITEMS } from "@/data/news.mock";
import { studentCourses } from "@/mock/courses";

export default function SearchPage() {
  const search = useSearchParams();
  const q = (search.get("q") || "").toLowerCase().trim();

  const agentMatches = agents.filter((a) => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  const newsMatches = NEWS_ITEMS.filter((n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q));
  const courseMatches = studentCourses.filter((c) => c.title.toLowerCase().includes(q));

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* <h1 className="text-2xl font-semibold text-primary">Search results</h1> */}
      <div className="mt-1 text-sm text-muted">for “{q || "…" }”</div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-primary">Agents</h2>
        {agentMatches.length === 0 ? (
          <div className="text-sm text-muted">No matching agents.</div>
        ) : (
          <ul className="mt-2 list-inside list-disc">
            {agentMatches.map((a) => (
              <li key={a.id}>
                <Link className="text-primary hover:underline" href={a.url ?? "/admin/agents"} target="_blank">
                  {a.name} <span className="text-xs text-muted">({a.role})</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-primary">Courses</h2>
        {courseMatches.length === 0 ? (
          <div className="text-sm text-muted">No matching courses.</div>
        ) : (
          <ul className="mt-2 list-inside list-disc">
            {courseMatches.map((c) => (
              <li key={c.id}>
                <Link className="text-primary hover:underline" href={`/student/courses/${c.id}`}>
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-primary">News</h2>
        {newsMatches.length === 0 ? (
          <div className="text-sm text-muted">No matching news.</div>
        ) : (
          <ul className="mt-2 list-inside list-disc">
            {newsMatches.map((n) => (
              <li key={n.id}>
                <Link className="text-primary hover:underline" href={n.href}>
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}


