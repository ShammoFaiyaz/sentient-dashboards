import { NewsItem } from "@/types/news";

export const NEWS_ITEMS: NewsItem[] = [
	{
		id: "n1",
		title: "New AI Ethics Micro-Course Released",
		description: "Self-paced modules with case studies and assessments.",
		tag: "Teaching",
		imageSrc: "/news/ethics.jpg",
		href: "/updates/ai-ethics-microcourse",
		publishedAt: new Date().toISOString(),
		author: "Office of Teaching & Learning",
		content: [
			"Our new micro-course explores responsible AI use through real academic scenarios, with a focus on transparency and integrity.",
			"Students will complete short, rubric-aligned assessments that encourage reflection and citation of AI assistance where used.",
			"Instructors receive facilitation guides and banked prompts to adapt activities to their disciplines."
		],
		sources: [{ title: "Syllabus outline", url: "/updates/ai-ethics-microcourse#syllabus" }]
	},
	{
		id: "n2",
		title: "Lab Schedule Updated for Data Structures",
		description: "Section A moved to Wed 3pm to resolve conflicts.",
		tag: "Announcement",
		imageSrc: "/news/lab.jpg",
		href: "/updates/lab-schedule-change",
		publishedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
		author: "Registrar",
		content: [
			"To reduce overlap with Physics, Data Structures Lab A is moving to Wednesday 3:00–4:30 PM in Lab 2.",
			"All enrolled students have been emailed calendar invites; office hours will shift by 30 minutes on those days."
		]
	},
	{
		id: "n3",
		title: "Campus AI Fair - Meet the Agents",
		description: "Hands-on demos and talks from faculty and students.",
		tag: "Event",
		imageSrc: "/news/event.jpg",
		href: "/updates/campus-ai-fair",
		publishedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
		author: "Outreach",
		content: [
			"Join us for live demos of student, teacher, and admin agents solving real campus tasks.",
			"Short lightning talks will cover prompt design, rubric alignment, and data governance."
		]
	},
	{
		id: "n4",
		title: "Policy Refresh: Responsible AI Use",
		description: "Clear guidance on academic integrity and GenAI tools.",
		tag: "Policy",
		imageSrc: "/news/policy.jpg",
		href: "/updates/policy-refresh",
		publishedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
		author: "Academic Affairs",
		content: [
			"The updated policy clarifies expectations around citation of AI assistance and when instructor approval is required.",
			"We also provide examples of appropriate uses across coursework, research, and administrative tasks."
		]
	},
	{
		id: "n5",
		title: "New Collaboration Lab Spins Up",
		description: "Shared sandbox for exploring datasets and models.",
		tag: "Research",
		imageSrc: "/news/sandbox.jpg",
		href: "/updates/collab-lab",
		publishedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
		author: "Research Computing",
		content: [
			"The Collaboration Lab provides GPU-backed notebooks, governed datasets, and a prompt library.",
			"Faculty and students can request access via the research portal; onboarding takes ~2 business days."
		]
	},
	{
		id: "n6",
		title: "Ethics Workshop: Bias and Fairness",
		description: "Interactive session with real-world case analyses.",
		tag: "Teaching",
		imageSrc: "/news/workshop.jpg",
		href: "/updates/ethics-workshop",
		publishedAt: new Date(Date.now() - 90 * 3600 * 1000).toISOString(),
		author: "Center for Ethics"
	},
	{
		id: "n7",
		title: "Student Success Center Adds Evening Tutoring",
		description: "New peer-led sessions for Algorithms and Ethics after 6pm.",
		tag: "Announcement",
		imageSrc: "/news/tutoring.jpg",
		href: "/updates/evening-tutoring",
		publishedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
		author: "Student Success"
	},
	{
		id: "n8",
		title: "Faculty Grant: Human-AI Collaboration in Class",
		description: "Three instructors awarded to pilot generative feedback tools.",
		tag: "Research",
		imageSrc: "/news/grant.jpg",
		href: "/updates/faculty-grant-collaboration",
		publishedAt: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
		author: "Research Office"
	},
	{
		id: "n9",
		title: "Advising Week - Book Your 1:1",
		description: "Teachers and advisors open extra office hours for planning.",
		tag: "Announcement",
		imageSrc: "/news/advising.jpg",
		href: "/updates/advising-week",
		publishedAt: new Date(Date.now() - 15 * 3600 * 1000).toISOString(),
		author: "Advising"
	},
	{
		id: "n10",
		title: "Teaching Showcase: Prompting Best Practices",
		description: "Workshop for teachers on rubric-aligned AI activities.",
		tag: "Teaching",
		imageSrc: "/news/showcase.jpg",
		href: "/updates/teaching-showcase-prompts",
		publishedAt: new Date(Date.now() - 54 * 3600 * 1000).toISOString(),
		author: "Teaching & Learning"
	},
];


