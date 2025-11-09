export type AgentRole = "student" | "teacher" | "admin";

export type Agent = {
  id: string;
  name: string;
  description: string;
  role: AgentRole;
  url: string;
  category: string;
  bullets?: string[];
  icon?: "bot" | "sparkles" | "book" | "shield" | "briefcase" | "brain" | "megaphone";
  color?: "primary" | "accent" | "emerald" | "violet";
};

const baseUrl = "https://agents.sentient-university.demo/";

export const agents: Agent[] = [
  // Student experience & curriculum
  { id: "personalized-course-design", name: "Personalized Course Designer", description: "Builds adaptive curriculum pathways based on goals and prior learning.", bullets: ["Aligns to degree plan", "Adapts pacing"], color: "primary", icon: "book", role: "student", url: baseUrl + "personalized-course-design", category: "Curriculum & Teaching" },
  { id: "digital-fluency-ethics", name: "AI Literacy & Ethics Mentor", description: "Interactive modules to learn AI literacy and responsible use.", bullets: ["Short micro-lessons", "Scenario practice"], color: "accent", icon: "brain", role: "student", url: baseUrl + "digital-fluency-ethics", category: "Curriculum & Teaching" },
  { id: "ai-tutor-writer", name: "AI Tutor & Writing Assistant", description: "On-demand explanations, outlines, and draft feedback with citations.", bullets: ["Explain simply", "Draft with sources"], color: "primary", icon: "bot", role: "student", url: baseUrl + "ai-tutor-writer", category: "Curriculum & Teaching" },
  { id: "student-chatbot", name: "UniAI Student Concierge", description: "24/7 Q&A for courses, deadlines, and campus services.", bullets: ["Deadlines & reminders", "Campus help"], color: "accent", icon: "sparkles", role: "student", url: baseUrl + "student-chatbot", category: "Student Support" },
  { id: "career-coach", name: "Virtual Career Coach", description: "Resume review, interview prep, and matching to roles.", bullets: ["ATS resume tips", "Mock interviews"], color: "primary", icon: "briefcase", role: "student", url: baseUrl + "career-coach", category: "Student Support" },
  { id: "wellbeing-risk", name: "Wellbeing & Risk Sentinel", description: "Detects disengagement patterns and nudges to support (demo data).", bullets: ["Private signals", "Support routing"], color: "emerald", icon: "shield", role: "student", url: baseUrl + "wellbeing-risk", category: "Student Support" },
  { id: "job-matching", name: "AI Job Matching", description: "Recommends internships and roles based on skills and interests.", bullets: ["Skill matching", "Live postings"], color: "primary", icon: "briefcase", role: "student", url: baseUrl + "job-matching", category: "Careers" },
  { id: "skill-gap", name: "Skill-Gap Analyzer", description: "Finds gaps vs. target roles and suggests learning modules.", bullets: ["Gap radar", "Next steps"], color: "accent", icon: "brain", role: "student", url: baseUrl + "skill-gap", category: "Careers" },
  { id: "personalized-learning-paths", name: "Personalized Learning Pathways", description: "Adaptive nudging and pacing for each student.", bullets: ["Learning nudges", "Path adjustments"], color: "violet", icon: "sparkles", role: "student", url: baseUrl + "personalized-learning", category: "Student Support" },
  { id: "adaptive-learning-systems", name: "Adaptive Learning Systems", description: "Auto-adjusts difficulty based on performance and behavior.", bullets: ["Adjust difficulty", "Monitor progress"], color: "emerald", icon: "brain", role: "student", url: baseUrl + "adaptive-learning", category: "Student Support" },
  { id: "vr-labs", name: "AI Simulations & Virtual Labs", description: "Immersive labs with AI guidance for STEM courses.", bullets: ["VR/AR modules", "Guided by AI"], color: "accent", icon: "sparkles", role: "teacher", url: baseUrl + "vr-labs", category: "Curriculum & Teaching" },

  // Teacher & faculty support
  { id: "faculty-copilot", name: "Faculty Co‑Pilot", description: "Assists with course design, announcements, and class facilitation.", bullets: ["Drafts content", "Live session helpers"], color: "primary", icon: "sparkles", role: "teacher", url: baseUrl + "faculty-copilot", category: "Teaching Support" },
  { id: "genai-assistant", name: "Generative Teaching Assistant", description: "Drafts lesson content, examples, and assessment items.", bullets: ["Examples on demand", "Item bank seeds"], color: "accent", icon: "bot", role: "teacher", url: baseUrl + "genai-assistant", category: "Teaching Support" },
  { id: "sim-training", name: "Simulation‑Based Training (Chat Bot)", description: "Practice difficult scenarios like DEI conversations with a safe bot.", bullets: ["Role‑play safely", "Instant feedback"], color: "emerald", icon: "shield", role: "teacher", url: baseUrl + "sim-training", category: "Staff Development" },
  { id: "ai-literacy-training", name: "AI Literacy & Prompt Training", description: "Guided prompt libraries and micro‑courses for faculty.", bullets: ["Prompt patterns", "Micro‑courses"], color: "primary", icon: "book", role: "teacher", url: baseUrl + "ai-literacy-training", category: "Staff Development" },
  { id: "ai-collab-labs", name: "AI Collaboration Labs", description: "Sandbox to explore datasets and models with colleagues.", bullets: ["Shared workspace", "Model trials"], color: "accent", icon: "brain", role: "teacher", url: baseUrl + "ai-collab-labs", category: "Research & Innovation" },
  { id: "integrated-course-design", name: "AI‑Integrated Course Design", description: "Plan outcome‑aligned modules and personalized pathways.", bullets: ["Outcome mapping", "Pacing plans"], color: "primary", icon: "book", role: "teacher", url: baseUrl + "integrated-course-design", category: "Curriculum & Teaching" },
  { id: "teaching-analytics", name: "Teaching Effectiveness Analytics", description: "Measure engagement and outcomes to refine instruction.", bullets: ["Engagement metrics", "Outcome tracking"], color: "primary", icon: "brain", role: "teacher", url: baseUrl + "teaching-analytics", category: "Teaching Support" },
  { id: "peer-review-platforms", name: "AI Peer Review Platforms", description: "Faculty collaboration and reviews with AI assistance.", bullets: ["Review workflows", "Automated summaries"], color: "violet", icon: "sparkles", role: "teacher", url: baseUrl + "peer-review", category: "Teaching Support" },

  // Admin & recruitment
  { id: "virtual-admissions", name: "Virtual Admissions Assistant", description: "Guides applicants, answers FAQs, and triages inquiries.", bullets: ["24/7 guidance", "Smart triage"], color: "primary", icon: "bot", role: "admin", url: baseUrl + "virtual-admissions", category: "Recruitment & Marketing" },
  { id: "personalized-outreach", name: "Personalized Outreach Orchestrator", description: "Builds AI‑generated communication journeys for prospects.", bullets: ["Segments & journeys", "A/B optimize"], color: "accent", icon: "megaphone", role: "admin", url: baseUrl + "personalized-outreach", category: "Recruitment & Marketing" },
  { id: "staff-onboarding", name: "Personalized Staff Onboarding", description: "AI‑guided onboarding checklists and training paths.", bullets: ["Day‑1 setup", "Role‑tailored"], color: "emerald", icon: "shield", role: "admin", url: baseUrl + "staff-onboarding", category: "Staff Development" },
  { id: "ai-coaching-tools", name: "AI Coaching Tools", description: "Leadership and professional growth coaching chat assistant.", bullets: ["Growth plans", "Conversation practice"], color: "primary", icon: "brain", role: "admin", url: baseUrl + "ai-coaching-tools", category: "Staff Development" },
  { id: "predictive-targeting", name: "Predictive Targeting", description: "Identify likely student segments for recruitment.", bullets: ["Segment scoring", "Lookalike modeling"], color: "violet", icon: "brain", role: "admin", url: baseUrl + "predictive-targeting", category: "Recruitment & Marketing" },
  { id: "ethical-video-analysis", name: "Ethical Video Analysis", description: "Voice/image tools for interviews with safeguards.", bullets: ["Consent safeguards", "De-bias filters"], color: "emerald", icon: "shield", role: "admin", url: baseUrl + "ethical-video", category: "Recruitment & Marketing" },
  { id: "market-sentiment", name: "Market Sentiment Analysis", description: "Track trends and competitor benchmarks.", bullets: ["Trend watch", "Benchmarking"], color: "accent", icon: "megaphone", role: "admin", url: baseUrl + "market-sentiment", category: "Recruitment & Marketing" },
  { id: "intelligent-automation", name: "Intelligent Automation", description: "Automate admissions, timetabling, and finance tasks.", bullets: ["RPA + AI", "Human-in-loop"], color: "primary", icon: "sparkles", role: "admin", url: baseUrl + "intelligent-automation", category: "University Administration" },
  { id: "resource-planning", name: "AI Resource Planning", description: "Optimize space, staffing, and budgeting.", bullets: ["Capacity plans", "Scenario testing"], color: "accent", icon: "brain", role: "admin", url: baseUrl + "resource-planning", category: "University Administration" },
  { id: "nlp-doc-automation", name: "NLP Documentation Automation", description: "Automate report writing with templates and data.", bullets: ["Template fills", "Data merge"], color: "primary", icon: "book", role: "admin", url: baseUrl + "nlp-doc-automation", category: "University Administration" },
  { id: "policy-drafter", name: "LLM Policy Drafter", description: "Summarization and policy support for committees.", bullets: ["Summaries", "Draft proposals"], color: "violet", icon: "shield", role: "admin", url: baseUrl + "policy-drafter", category: "University Administration" },
  { id: "predictive-analytics", name: "Predictive Analytics", description: "Retention, performance, and employability analytics.", bullets: ["Risk flags", "Cohort trends"], color: "primary", icon: "brain", role: "admin", url: baseUrl + "predictive-analytics", category: "Student Analytics & Insights" },
  { id: "realtime-dashboards", name: "Real‑Time Dashboards", description: "Live dashboards for faculty and advisors.", bullets: ["Live KPIs", "Drilldowns"], color: "accent", icon: "sparkles", role: "admin", url: baseUrl + "realtime-dashboards", category: "Student Analytics & Insights" },
  { id: "feedback-sentiment", name: "Feedback Sentiment Analysis", description: "Mine surveys and forums for insights.", bullets: ["Theme extraction", "Alerts"], color: "emerald", icon: "brain", role: "admin", url: baseUrl + "feedback-sentiment", category: "Student Analytics & Insights" },
  { id: "academic-recos", name: "AI Academic Recommendations", description: "Personalized academic interventions for students.", bullets: ["Next-best action", "Advisor tools"], color: "primary", icon: "sparkles", role: "admin", url: baseUrl + "academic-recommendations", category: "Student Analytics & Insights" },
  { id: "visual-analytics", name: "Visual Analytics", description: "Dashboards for diversity, inclusion, and success.", bullets: ["Equity views", "Success paths"], color: "violet", icon: "brain", role: "admin", url: baseUrl + "visual-analytics", category: "Student Analytics & Insights" },
  { id: "staff-analytics", name: "Staff Analytics", description: "Track satisfaction, performance, and engagement.", bullets: ["Pulse surveys", "Retention risk"], color: "accent", icon: "briefcase", role: "admin", url: baseUrl + "staff-analytics", category: "Staff Development" },
  { id: "employer-engagement", name: "Employer Engagement Analytics", description: "Track partnerships and industry data.", bullets: ["Partner KPIs", "Hiring trends"], color: "emerald", icon: "briefcase", role: "admin", url: baseUrl + "employer-engagement", category: "Careers & Industry" },
  { id: "co-designed-simulations", name: "Co‑Designed AI Simulations", description: "Built with industry partners for authentic tasks.", bullets: ["Real scenarios", "Assess skills"], color: "violet", icon: "shield", role: "teacher", url: baseUrl + "co-designed-simulations", category: "Careers & Industry" },
  { id: "ai-research-tools", name: "AI Research Tools", description: "Literature review, hypothesis, and data analysis.", bullets: ["Paper summaries", "Dataset helpers"], color: "primary", icon: "book", role: "teacher", url: baseUrl + "ai-research-tools", category: "Research & Innovation" },
  { id: "research-integrity-tools", name: "Research Integrity Tools", description: "Detect plagiarism, deepfakes, and anomalies.", bullets: ["Plagiarism checks", "Attribution"], color: "emerald", icon: "shield", role: "teacher", url: baseUrl + "research-integrity-tools", category: "Research & Innovation" },
];

export function agentsForRole(role: AgentRole) {
  return agents.filter((a) => a.role === role);
}


