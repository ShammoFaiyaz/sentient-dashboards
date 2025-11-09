export type Lesson = {
  id: string;
  title: string;
  summary: string;
};

export type Course = {
  id: string;
  title: string;
  progressPercent: number;
  lessons: Lesson[];
};

export const studentCourses: Course[] = [
  {
    id: "algorithms",
    title: "Algorithms",
    progressPercent: 42,
    lessons: [
      { id: "1", title: "Greedy Strategies", summary: "Selecting locally optimal choices." },
      { id: "2", title: "Divide and Conquer", summary: "Breaking problems into subproblems." },
    ],
  },
  {
    id: "ethics",
    title: "Human-AI Ethics",
    progressPercent: 70,
    lessons: [
      { id: "1", title: "Bias & Fairness", summary: "Sources and mitigations." },
      { id: "2", title: "Transparency", summary: "Explainability patterns." },
    ],
  },
  {
    id: "data-structures",
    title: "Data Structures",
    progressPercent: 18,
    lessons: [
      { id: "1", title: "Arrays & Lists", summary: "Linear collections." },
      { id: "2", title: "Stacks & Queues", summary: "LIFO and FIFO." },
    ],
  },
  {
    id: "operating-systems",
    title: "Operating Systems",
    progressPercent: 55,
    lessons: [
      { id: "1", title: "Processes & Threads", summary: "Concurrency fundamentals." },
      { id: "2", title: "Scheduling", summary: "CPU scheduling algorithms." },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    progressPercent: 24,
    lessons: [
      { id: "1", title: "ER Modeling", summary: "Designing relational schemas." },
      { id: "2", title: "SQL Queries", summary: "Writing and optimizing queries." },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    progressPercent: 12,
    lessons: [
      { id: "1", title: "Linear Regression", summary: "Fitting lines to data." },
      { id: "2", title: "Classification", summary: "From logistic regression to trees." },
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    progressPercent: 63,
    lessons: [
      { id: "1", title: "HTTP & REST", summary: "Web fundamentals and APIs." },
      { id: "2", title: "Frontend Frameworks", summary: "Component-driven UIs." },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return studentCourses.find((c) => c.id === id);
}


