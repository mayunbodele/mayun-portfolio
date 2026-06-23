export interface ResumeData {
  basics: {
    name: string;
    title: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    languages: { name: string; level: string }[];
  };
  experience: {
    id: string;
    company: string;
    role: string;
    dates: string;
    location: string;
    bullets: string[];
    highlights: string[];
    metrics: { value: string; label: string }[];
  }[];
  achievements: {
    value: string;
    metric: string;
    context: string;
    category: 'wins' | 'metrics' | 'leadership';
  }[];
  projects: {
    title: string;
    stack: string[];
    bullets: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    major?: string;
    gpa?: string;
    dates: string;
    location?: string;
  }[];
  certifications: string[];
  awards: string[];
  extra: string[];
}

export const resumeData: ResumeData = {
  basics: {
    name: "Mayun Bodele",
    title: "Product Manager",
    summary: "Product Manager with 4+ years defining and executing high-impact digital products. Proven ability to leverage AI and emerging technologies to reduce friction and drive measurable outcomes. Skilled at translating ambiguous requirements into clear specifications and deeply understanding user problems. Strong analytical mindset with track record of aligning cross-functional teams and shipping features that move real metrics in fast-moving environments.",
    location: "Chicago, IL, USA",
    email: "mayunbodele108@gmail.com",
    phone: "617-356-3215",
    linkedin: "https://www.linkedin.com/in/mayunbodele",
    languages: [
      { name: "English", level: "Professional Working" },
      { name: "Hindi", level: "Native or Bilingual" },
      { name: "French", level: "Elementary" }
    ]
  },
  experience: [
    {
      id: "lowes",
      company: "Lowe’s",
      role: "Product Manager",
      dates: "July 2025 – May 2026",
      location: "Charlotte, USA",
      bullets: [
        "Served as Product Owner for Homecare+ and related digital programs, owning product scope and ensuring seamless end-to-end functionality across web, mobile, and in-store experiences serving 500K+ users.",
        "Defined epics, user stories, and acceptance criteria in Jira and Confluence, partnering with engineering and UI/UX to align on scope, API contracts, and system behavior ahead of each sprint.",
        "Led User Acceptance Testing (UAT) across complex system integrations, authoring 140+ test cases that validated REST API responses via Postman, data flows between microservices, and front-end/back-end parity, reducing post-release defects by 35%.",
        "Coordinated cross-functional dependencies across Wallet, Payments, and Loyalty teams, ensuring accurate data flow and seamless API integrations, reducing integration failures by 15%.",
        "Synthesized user research and customer feedback through surveys and session analysis to identify friction points and inform roadmap prioritization.",
        "Shipped AI-powered recommendation and predictive workflow features across bi-weekly release cycles, reducing user drop-off at key decision points and improving session engagement across the Homecare+ platform."
      ],
      highlights: [
        "Served 500K+ users with Homecare+ end-to-end web, mobile, and store experience.",
        "Reduced post-release defects by 35% through robust integration UAT validating 140+ test cases.",
        "Reduced integration failures by 15% across key internal dependencies (Wallet, Payments, Loyalty)."
      ],
      metrics: [
        { value: "500K+", label: "Active Users Served" },
        { value: "35%", label: "Defects Reduction" },
        { value: "15%", label: "Integration Failure Cut" }
      ]
    },
    {
      id: "attribute",
      company: "Attribute Analytics",
      role: "Product Manager",
      dates: "June 2024 – June 2025",
      location: "Chicago, IL, USA",
      bullets: [
        "Partnered with the CEO to design and iterate on AI prompting workflows for a consumer product configurator, evaluating multiple LLMs across output categories including product images, descriptions, recipes, and ingredient suggestions.",
        "Tested and benchmarked AI model outputs across structured product attributes such as flavor profiles, dietary preferences, and demographic targeting, identifying the highest-performing models for each output type.",
        "Mapped end-to-end configurator workflows from consumer input selection to AI-generated product specs, identifying edge cases and refining prompt logic to improve output relevance and consistency.",
        "Brainstormed and stress-tested consumer-facing configuration scenarios across product categories, surfacing failure modes that shaped prompt engineering decisions and improved generation accuracy.",
        "Collaborated with the CEO on workflow ideation and use case testing, translating platform requirements into structured prompting logic across product types and consumer segments."
      ],
      highlights: [
        "Partnered with the CEO to design and iterate on AI prompting workflows for a consumer product configurator.",
        "Evaluated multiple LLMs across output categories including product images, descriptions, recipes, and suggestions."
      ],
      metrics: [
        { value: "5+", label: "LLMs Evaluated" },
        { value: "CEO", label: "Direct Partnership" },
        { value: "100%", label: "Prompt Workflow Precision" }
      ]
    },
    {
      id: "foodtrace",
      company: "Food Trace AI",
      role: "Product Manager",
      dates: "June 2024 – June 2025",
      location: "Remote, USA",
      bullets: [
        "Gathered and synthesized requirements from customers, compliance, and operations teams, translating insights into structured feature specs with clear acceptance criteria and edge case handling.",
        "Wrote SQL queries against PostgreSQL databases to analyze user behavior and product performance, identifying trends that informed roadmap prioritization and improved feature adoption by 17%.",
        "Built and maintained Power BI dashboards tracking 13 KPIs including user engagement, workflow completion rates, and feature adoption, used by 5 stakeholders weekly to drive prioritization decisions.",
        "Conducted root cause analysis on user drop-offs using funnel analysis and session data, recommending workflow changes that improved task completion rates across key user paths.",
        "Deployed LLM-based automation to eliminate manual compliance data entry across core operator workflows, cutting average task completion time and saving an estimated $40K annually in operational costs."
      ],
      highlights: [
        "Improved feature adoption by 17% using targeted SQL queries and behavior analysis.",
        "Deployed LLM-based workflow automation, saving an estimated $40K annually in operational costs."
      ],
      metrics: [
        { value: "17%", label: "Adoption Boost" },
        { value: "13", label: "KPIs Tracked" },
        { value: "$40K", label: "Annual Savings" }
      ]
    },
    {
      id: "kpranali",
      company: "K Pranali Investments",
      role: "Product Manager",
      dates: "Jan 2020 – Aug 2022",
      location: "Mumbai, India",
      bullets: [
        "Rebuilt the onboarding and account management flows based on SQL-driven behavioral analysis, driving a 42% increase in user engagement within six months of launch.",
        "Partnered with engineering to build and enhance systems with near real-time data updates and transaction flows, writing detailed specs that covered data validation, error states, and edge case handling.",
        "Mapped transaction patterns and account activity through SQL analysis to surface drop-offs in financial decision-making workflows, informing a UX redesign that improved task completion by 20%.",
        "Integrated KYC providers and payment gateways by defining API contracts and compliance validation rules, reducing onboarding verification failures and enabling seamless transaction processing.",
        "Ran end-to-end delivery across a regulated financial platform, coordinating tradeoffs between scope, speed, and compliance requirements to ship three major workflow improvements within a single fiscal year."
      ],
      highlights: [
        "Rebuilt onboarding/account management flows, driving 42% increase in user engagement in 6 months.",
        "Mapped transaction patterns and account activity to redesign UX, boosting task completion by 20%."
      ],
      metrics: [
        { value: "42%", label: "Engagement Increase" },
        { value: "20%", label: "Task Completion Boost" },
        { value: "3", label: "Major Workflows Shipped" }
      ]
    }
  ],
  achievements: [
    {
      value: "500K+",
      metric: "Active digital users",
      context: "Ensured seamless end-to-end product functionality for Lowe's Homecare+ program across channels.",
      category: "wins"
    },
    {
      value: "35%",
      metric: "Post-release defect reduction",
      context: "Led end-to-end integration UAT validating REST API microservice responses on Postman.",
      category: "metrics"
    },
    {
      value: "42%",
      metric: "Engagement increase",
      context: "Owned product roadmap for complex investment and transaction processing platforms.",
      category: "metrics"
    },
    {
      value: "20%",
      metric: "Workflow efficiency",
      context: "Simplified financial onboardings and processes to drive task completion across key systems.",
      category: "metrics"
    },
    {
      value: "17%",
      metric: "Feature adoption spike",
      context: "Performed PostgreSQL analysis and roadmap prioritization to boost user capabilities.",
      category: "metrics"
    },
    {
      value: "15%",
      metric: "Integration failure cut",
      context: "Coordinated cross-functional APIs across Wallet, Payments, and Loyalty system modules.",
      category: "leadership"
    }
  ],
  projects: [
    {
      title: "Homecare+ Platform (Lowe's)",
      stack: ["React", "Postman", "SQL", "Jira", "Adobe Analytics", "APIs"],
      bullets: [
        "Defined end-to-end digital programs spanning web, mobile apps, and retail in-store experiences.",
        "Ensured zero-downtime microservice integrations and authored thorough validation tests."
      ]
    },
    {
      title: "AI Prompting Workflows (Attribute Analytics)",
      stack: ["LLMs", "Prompt Engineering", "Vibe Design", "Product Configurator"],
      bullets: [
        "Designed and iterated on prompt logic for a consumer product configurator evaluating multiple LLMs.",
        "Tested model outputs across structured attributes such as flavor profiles and dietary preferences."
      ]
    },
    {
      title: "Workflow Automation with LLM (Food Trace AI)",
      stack: ["LLM Tools", "Claude / GPT", "Workflow Automation", "PostgreSQL"],
      bullets: [
        "Created an AI assistant mapping compliance data points, cutting manual verification overhead.",
        "Streamlined data-gathering specs for edge cases and regulatory compliance."
      ]
    },
    {
      title: "Fintech Platform Roadmap (K Pranali Investments)",
      stack: ["Agile/Scrum", "SQL", "Real-time updates", "UX Overhaul"],
      bullets: [
        "Engineered real-time data flows syncing user wallets and account updates.",
        "Managed risk assessments and discovery-to-delivery pipelines."
      ]
    }
  ],
  skills: [
    {
      category: "Product Management & Delivery",
      items: [
        "Product Roadmapping",
        "Agile / Scrum",
        "Backlog Prioritization",
        "User Stories & Acceptance Criteria",
        "Sprint Planning",
        "User Acceptance Testing (UAT)",
        "Product Lifecycle Management",
        "Stakeholder Management",
        "Risk Identification"
      ]
    },
    {
      category: "Data & Analytics",
      items: [
        "SQL (PostgreSQL, MySQL)",
        "Power BI",
        "Tableau",
        "Advanced Excel",
        "Data Analysis",
        "Dashboard Development",
        "KPI Definition",
        "Product Performance Monitoring",
        "Funnel Analysis"
      ]
    },
    {
      category: "Systems & Tools",
      items: [
        "Jira",
        "Confluence",
        "Figma",
        "Adobe Analytics",
        "Visio",
        "Postman",
        "ERP & Enterprise Platforms"
      ]
    },
    {
      category: "AI & Emerging Technologies",
      items: [
        "Claude",
        "GPT",
        "LLM Integration",
        "Workflow Automation",
        "Recommendation Engines",
        "Predictive Analytics"
      ]
    }
  ],
  education: [
    {
      institution: "University of Illinois Chicago - College of Business",
      degree: "Master of Science in Management Information Systems",
      gpa: "3.87/4.00",
      dates: "May 2024",
      location: "Chicago, IL, USA"
    },
    {
      institution: "Rajiv Gandhi Institute of Technology",
      degree: "Bachelor of Engineering in Computer Science",
      gpa: "3.56/4.00",
      dates: "May 2022",
      location: "Mumbai, India"
    }
  ],
  certifications: [
    "The data scientist's toolbox",
    "The complete SQL course",
    "RoboAuthor: Content Writing Automation 2021"
  ],
  awards: [],
  extra: [
    "Languages: English (Professional Working), Hindi (Native or Bilingual), French (Elementary)",
    "Top Skills: Increase Productivity, Sprint Backlog, Data Analytics"
  ]
};
