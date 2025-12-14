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
  // Fintech Dashboard
  { id: "portfolio-insights-copilot", name: "Portfolio Insights Copilot", description: "Explains performance drivers, factor exposures, and benchmark gaps.", bullets: ["Attribution analysis", "Scenario drilldowns"], color: "primary", icon: "brain", role: "teacher", url: baseUrl + "portfolio-insights-copilot", category: "Portfolio & Analytics" },
  { id: "execution-monitor", name: "Execution Monitor", description: "Monitors fills, slippage, and settlement issues; recommends routes.", bullets: ["Trade health checks", "Route suggestions"], color: "accent", icon: "bot", role: "teacher", url: baseUrl + "execution-monitor", category: "Trading & Ops" },
  { id: "risk-breach-sentinel", name: "Risk Breach Sentinel", description: "Watches limits, breaches, and VaR movements; raises timely alerts.", bullets: ["Limit tracking", "Auto-escalation"], color: "emerald", icon: "shield", role: "teacher", url: baseUrl + "risk-breach-sentinel", category: "Risk & Compliance" },
  { id: "liquidity-cash-forecast", name: "Liquidity & Cash Forecast", description: "Projects cash and liquidity needs across accounts and counterparties.", bullets: ["Cash ladders", "What‑if scenarios"], color: "accent", icon: "brain", role: "teacher", url: baseUrl + "liquidity-cash-forecast", category: "Treasury" },
  { id: "compliance-reporter", name: "Compliance Reporter", description: "Assembles audit evidence and compiles regulator‑ready reports.", bullets: ["Evidence rollups", "Audit trails"], color: "violet", icon: "shield", role: "admin", url: baseUrl + "compliance-reporter", category: "Risk & Compliance" },
  { id: "kyc-aml-analyzer", name: "KYC / AML Analyzer", description: "Surfaces anomalies in onboarding and ongoing monitoring data.", bullets: ["Adverse media", "PEP / sanctions"], color: "emerald", icon: "shield", role: "admin", url: baseUrl + "kyc-aml-analyzer", category: "Risk & Compliance" },
  { id: "billing-reconciliation", name: "Billing Reconciliation", description: "Flags failed payments, mismatches, and revenue leakage patterns.", bullets: ["Retry guidance", "Write‑off minimization"], color: "primary", icon: "briefcase", role: "admin", url: baseUrl + "billing-reconciliation", category: "Billing & Finance" },
  { id: "customer-spend-insights", name: "Customer Spend Insights", description: "Explains changes in spend and recommends relevant offers.", bullets: ["Segment drivers", "Offer targeting"], color: "accent", icon: "brain", role: "student", url: baseUrl + "customer-spend-insights", category: "Customer" },
  { id: "investment-goal-planner", name: "Investment Goal Planner", description: "Plans paths to goals with risk preferences and savings cadence.", bullets: ["Goal scenarios", "Rebalancing tips"], color: "primary", icon: "sparkles", role: "student", url: baseUrl + "investment-goal-planner", category: "Customer" },
  { id: "product-ops-insights", name: "Product Ops Insights", description: "Tracks feature adoption, pricing rules, and quality issues.", bullets: ["Usage telemetry", "Pricing checks"], color: "violet", icon: "briefcase", role: "admin", url: baseUrl + "product-ops-insights", category: "Product" },

  // Healthcare Dashboard
  { id: "care-plan-builder", name: "Care Plan Builder", description: "Generates personalized care plans aligned to guidelines.", bullets: ["Guideline mapping", "Task schedules"], color: "primary", icon: "book", role: "teacher", url: baseUrl + "care-plan-builder", category: "Clinical" },
  { id: "appointment-scheduler", name: "Appointment Scheduler", description: "Books, reschedules, and triages appointments with waitlist logic.", bullets: ["Smart triage", "No‑show reduction"], color: "accent", icon: "sparkles", role: "student", url: baseUrl + "appointment-scheduler", category: "Patient" },
  { id: "medication-safety-checker", name: "Medication Safety Checker", description: "Checks interactions, allergies, and duplicate therapies.", bullets: ["Interaction flags", "Dose ranges"], color: "emerald", icon: "shield", role: "teacher", url: baseUrl + "medication-safety-checker", category: "Clinical" },
  { id: "lab-trends-explainer", name: "Lab Trends Explainer", description: "Summarizes lab histories and contextualizes abnormal results.", bullets: ["Trend charts", "Differential hints"], color: "primary", icon: "brain", role: "teacher", url: baseUrl + "lab-trends-explainer", category: "Clinical Analytics" },
  { id: "clinical-note-summarizer", name: "Clinical Note Summarizer", description: "Condenses notes with problem lists and action items.", bullets: ["SOAP highlights", "Follow‑ups"], color: "primary", icon: "bot", role: "teacher", url: baseUrl + "clinical-note-summarizer", category: "Clinical" },
  { id: "patient-education-coach", name: "Patient Education Coach", description: "Teaches conditions and care steps in simple language.", bullets: ["Micro‑lessons", "Adherence nudges"], color: "accent", icon: "book", role: "student", url: baseUrl + "patient-education-coach", category: "Patient" },
  { id: "coverage-billing-assistant", name: "Coverage & Billing Assistant", description: "Explains coverage, estimates costs, and drafts appeals.", bullets: ["EOB explainers", "Appeal templates"], color: "primary", icon: "briefcase", role: "admin", url: baseUrl + "coverage-billing-assistant", category: "Admin Ops" },
  { id: "facility-capacity-monitor", name: "Facility Capacity Monitor", description: "Tracks beds, equipment, and staffing utilization.", bullets: ["Throughput alerts", "Bottleneck insights"], color: "emerald", icon: "brain", role: "admin", url: baseUrl + "facility-capacity-monitor", category: "Operations" },
  { id: "referral-coordinator", name: "Referral Coordinator", description: "Finds in‑network specialists and manages referrals.", bullets: ["In‑network matching", "Appointment handoffs"], color: "violet", icon: "sparkles", role: "teacher", url: baseUrl + "referral-coordinator", category: "Care Coordination" },
  { id: "hipaa-compliance-reporter", name: "HIPAA Compliance Reporter", description: "Compiles audit logs and breach assessments.", bullets: ["PHI tracking", "Breach timers"], color: "violet", icon: "shield", role: "admin", url: baseUrl + "hipaa-compliance-reporter", category: "Compliance" },

  // Hospitality Dashboard
  { id: "reservation-optimizer", name: "Reservation Optimizer", description: "Fills gaps with smart overbooking and waitlist logic.", bullets: ["Gap fills", "No‑show mitigation"], color: "primary", icon: "brain", role: "teacher", url: baseUrl + "reservation-optimizer", category: "Front Desk" },
  { id: "dynamic-pricing-revenue", name: "Dynamic Pricing & Revenue", description: "Optimizes room rates by demand and comp‑set.", bullets: ["Rate ladders", "Event spikes"], color: "primary", icon: "briefcase", role: "admin", url: baseUrl + "dynamic-pricing-revenue", category: "Revenue" },
  { id: "housekeeping-orchestrator", name: "Housekeeping Orchestrator", description: "Sequences cleans and routes tasks to crews.", bullets: ["Turnover SLAs", "Crew balancing"], color: "emerald", icon: "sparkles", role: "teacher", url: baseUrl + "housekeeping-orchestrator", category: "Operations" },
  { id: "guest-concierge", name: "Guest Concierge", description: "Answers questions, books amenities, and offers tips.", bullets: ["24/7 help", "Local suggestions"], color: "accent", icon: "sparkles", role: "student", url: baseUrl + "guest-concierge", category: "Guest" },
  { id: "upsell-recommender", name: "Upsell Recommender", description: "Suggests add‑ons like late checkout and room upgrades.", bullets: ["Personalized offers", "Time‑sensitive prompts"], color: "accent", icon: "megaphone", role: "student", url: baseUrl + "upsell-recommender", category: "Guest" },
  { id: "loyalty-recommender", name: "Loyalty Recommender", description: "Targets perks and rewards to increase retention.", bullets: ["Tier nudges", "Perk matching"], color: "violet", icon: "megaphone", role: "student", url: baseUrl + "loyalty-recommender", category: "Guest" },
  { id: "service-request-router", name: "Service Request Router", description: "Classifies requests and routes to the right team.", bullets: ["Auto‑triage", "ETA updates"], color: "primary", icon: "bot", role: "teacher", url: baseUrl + "service-request-router", category: "Operations" },
  { id: "property-ops-monitor", name: "Property Ops Monitor", description: "Monitors incidents, outages, and vendor SLAs.", bullets: ["SLA breaches", "Vendor alerts"], color: "emerald", icon: "brain", role: "admin", url: baseUrl + "property-ops-monitor", category: "Operations" },
  { id: "review-sentiment-analyzer", name: "Review Sentiment Analyzer", description: "Summarizes reviews and detects themes across sources.", bullets: ["Theme mining", "Competitor compare"], color: "violet", icon: "megaphone", role: "admin", url: baseUrl + "review-sentiment-analyzer", category: "Reputation" },
  { id: "payment-exception-resolver", name: "Payment Exception Resolver", description: "Flags declines, chargebacks, and retries.", bullets: ["Dispute prep", "Retry windows"], color: "primary", icon: "shield", role: "admin", url: baseUrl + "payment-exception-resolver", category: "Billing" },

  // Insurance Dashboard
  { id: "claims-intake-triage", name: "Claims Intake Triage", description: "Classifies claims and prioritizes by severity and coverage.", bullets: ["Queue routing", "Severity scoring"], color: "primary", icon: "bot", role: "teacher", url: baseUrl + "claims-intake-triage", category: "Claims" },
  { id: "fnol-extractor", name: "FNOL Extractor", description: "Pulls entities and facts from First Notice of Loss.", bullets: ["Entity capture", "Document links"], color: "accent", icon: "book", role: "teacher", url: baseUrl + "fnol-extractor", category: "Claims" },
  { id: "fraud-signal-detector", name: "Fraud Signal Detector", description: "Surfaces fraud indicators with explainable features.", bullets: ["Network links", "High‑risk patterns"], color: "emerald", icon: "shield", role: "admin", url: baseUrl + "fraud-signal-detector", category: "Risk" },
  { id: "subrogation-recommender", name: "Subrogation Recommender", description: "Finds recovery opportunities and drafts notices.", bullets: ["Recovery leads", "Template drafts"], color: "primary", icon: "briefcase", role: "teacher", url: baseUrl + "subrogation-recommender", category: "Claims" },
  { id: "settlement-optimizer", name: "Settlement Optimizer", description: "Analyzes offers and recommends fair settlement ranges.", bullets: ["Offer compare", "Reserve impacts"], color: "violet", icon: "briefcase", role: "teacher", url: baseUrl + "settlement-optimizer", category: "Claims" },
  { id: "underwriting-risk-scorer", name: "Underwriting Risk Scorer", description: "Scores submissions and explains key drivers.", bullets: ["Driver explainers", "Loss trends"], color: "primary", icon: "brain", role: "teacher", url: baseUrl + "underwriting-risk-scorer", category: "Underwriting" },
  { id: "policy-document-drafter", name: "Policy Document Drafter", description: "Drafts endorsements, binders, and policy docs.", bullets: ["Clause library", "Version compare"], color: "primary", icon: "book", role: "admin", url: baseUrl + "policy-document-drafter", category: "Policy" },
  { id: "regulatory-reporter", name: "Regulatory Reporter", description: "Compiles regulatory reports with evidence links.", bullets: ["Timeliness checks", "Data lineage"], color: "violet", icon: "shield", role: "admin", url: baseUrl + "regulatory-reporter", category: "Compliance" },
  { id: "customer-communication-composer", name: "Customer Communication Composer", description: "Drafts empathetic updates and explains decisions.", bullets: ["Tone control", "Multilingual"], color: "accent", icon: "megaphone", role: "student", url: baseUrl + "customer-communication-composer", category: "Customer" },
  { id: "coverage-gap-advisor", name: "Coverage Gap Advisor", description: "Identifies coverage gaps and suggests add‑ons.", bullets: ["Gap explainers", "Quote prompts"], color: "accent", icon: "brain", role: "student", url: baseUrl + "coverage-gap-advisor", category: "Customer" },

  // Retail Dashboard
  { id: "demand-forecasting", name: "Demand Forecasting", description: "Forecasts SKU‑store demand with seasonality and events.", bullets: ["Store‑SKU granularity", "Event adjustments"], color: "primary", icon: "brain", role: "teacher", url: baseUrl + "demand-forecasting", category: "Merchandising" },
  { id: "price-optimizer", name: "Price Optimizer", description: "Optimizes prices against elasticity and margin targets.", bullets: ["Elasticity curves", "Guardrails"], color: "primary", icon: "briefcase", role: "admin", url: baseUrl + "price-optimizer", category: "Merchandising" },
  { id: "promotion-recommender", name: "Promotion Recommender", description: "Recommends promotions and simulates lift.", bullets: ["Lift models", "Cannibalization checks"], color: "accent", icon: "megaphone", role: "teacher", url: baseUrl + "promotion-recommender", category: "Merchandising" },
  { id: "inventory-replenishment", name: "Inventory Replenishment", description: "Creates reorder proposals by lead time and service levels.", bullets: ["Order proposals", "Service SLAs"], color: "emerald", icon: "briefcase", role: "teacher", url: baseUrl + "inventory-replenishment", category: "Operations" },
  { id: "supplier-risk-monitor", name: "Supplier Risk Monitor", description: "Tracks supplier delays, shortages, and quality issues.", bullets: ["Delay alerts", "Quality flags"], color: "emerald", icon: "shield", role: "admin", url: baseUrl + "supplier-risk-monitor", category: "Supply Chain" },
  { id: "staffing-planner", name: "Staffing Planner", description: "Aligns staffing to traffic forecasts and tasks.", bullets: ["Shift templates", "Compliance limits"], color: "violet", icon: "brain", role: "admin", url: baseUrl + "staffing-planner", category: "Store Ops" },
  { id: "returns-analyzer", name: "Returns Analyzer", description: "Finds product and process issues driving returns.", bullets: ["Defect clusters", "Policy insights"], color: "primary", icon: "brain", role: "admin", url: baseUrl + "returns-analyzer", category: "Operations" },
  { id: "basket-insights", name: "Basket Insights", description: "Explains basket drivers and recommends cross‑sells.", bullets: ["Affinity graphs", "Next‑best offers"], color: "accent", icon: "brain", role: "student", url: baseUrl + "basket-insights", category: "Customer" },
  { id: "customer-support-copilot", name: "Customer Support Copilot", description: "Guides agents to quick, empathetic resolutions.", bullets: ["Macro suggestions", "Policy lookups"], color: "accent", icon: "bot", role: "student", url: baseUrl + "customer-support-copilot", category: "Customer Service" },
  { id: "store-performance-explainer", name: "Store Performance Explainer", description: "Summarizes store KPIs and anomalies with plain‑English insights.", bullets: ["Anomaly flags", "Action cues"], color: "primary", icon: "brain", role: "teacher", url: baseUrl + "store-performance-explainer", category: "Analytics" },

  // Logistics Dashboard
  {
    id: "network-capacity-planner",
    name: "Network Capacity Planner",
    description: "Simulates lane capacity, mode mix, and hub utilization across the network.",
    bullets: ["Lane rebalancing", "Seasonal what‑ifs"],
    color: "primary",
    icon: "brain",
    role: "admin",
    url: baseUrl + "network-capacity-planner",
    category: "Network Design",
  },
  {
    id: "fleet-route-optimizer",
    name: "Fleet Route Optimizer",
    description: "Builds cost‑aware routes that respect SLAs, driver hours, and constraints.",
    bullets: ["Time‑window routing", "Multi‑stop drops"],
    color: "accent",
    icon: "bot",
    role: "teacher",
    url: baseUrl + "fleet-route-optimizer",
    category: "Transportation",
  },
  {
    id: "warehouse-slot-allocator",
    name: "Warehouse Slot Allocator",
    description: "Recommends storage locations to reduce travel time and congestion.",
    bullets: ["ABC zoning", "Pick path shortening"],
    color: "emerald",
    icon: "brain",
    role: "teacher",
    url: baseUrl + "warehouse-slot-allocator",
    category: "Warehouse Ops",
  },
  {
    id: "delivery-exception-copilot",
    name: "Delivery Exception Copilot",
    description: "Guides agents through failed delivery, bad address, and damage workflows.",
    bullets: ["Root‑cause hints", "Customer comms drafts"],
    color: "accent",
    icon: "megaphone",
    role: "student",
    url: baseUrl + "delivery-exception-copilot",
    category: "Customer Ops",
  },
  {
    id: "last-mile-eta-predictor",
    name: "Last‑Mile ETA Predictor",
    description: "Predicts stop‑level ETAs using traffic, dwell time, and history.",
    bullets: ["Street‑level ETAs", "Delay warnings"],
    color: "primary",
    icon: "sparkles",
    role: "student",
    url: baseUrl + "last-mile-eta-predictor",
    category: "Last Mile",
  },
  {
    id: "dock-scheduling-assistant",
    name: "Dock Scheduling Assistant",
    description: "Optimizes dock appointments to reduce yard congestion and dwell.",
    bullets: ["Appointment smoothing", "Carrier SLAs"],
    color: "violet",
    icon: "briefcase",
    role: "admin",
    url: baseUrl + "dock-scheduling-assistant",
    category: "Yard & Dock",
  },
  {
    id: "safety-compliance-checker",
    name: "Safety & Compliance Checker",
    description: "Monitors driver hours, inspections, and incidents for compliance risk.",
    bullets: ["HOS checks", "Inspection reminders"],
    color: "emerald",
    icon: "shield",
    role: "admin",
    url: baseUrl + "safety-compliance-checker",
    category: "Compliance",
  },
  {
    id: "carrier-performance-analyst",
    name: "Carrier Performance Analyst",
    description: "Benchmarks carriers by on‑time, damage rate, and cost per mile.",
    bullets: ["Scorecards", "Routing guide hints"],
    color: "primary",
    icon: "brain",
    role: "teacher",
    url: baseUrl + "carrier-performance-analyst",
    category: "Carrier Management",
  },
  {
    id: "inventory-visibility-agent",
    name: "Inventory Visibility Agent",
    description: "Surfaces inventory across nodes and flags at‑risk orders.",
    bullets: ["Backorder risk", "Substitution ideas"],
    color: "accent",
    icon: "book",
    role: "student",
    url: baseUrl + "inventory-visibility-agent",
    category: "Network Inventory",
  },
  {
    id: "logistics-cost-analyzer",
    name: "Logistics Cost Analyzer",
    description: "Explains cost drivers across modes, lanes, and accessorials.",
    bullets: ["Accessorial breakdowns", "Lane cost trends"],
    color: "violet",
    icon: "shield",
    role: "admin",
    url: baseUrl + "logistics-cost-analyzer",
    category: "Finance & Cost",
  },
];

export function agentsForRole(role: AgentRole) {
  return agents.filter((a) => a.role === role);
}


