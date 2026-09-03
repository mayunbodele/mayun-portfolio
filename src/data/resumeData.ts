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
    summary: "Product Manager with 4+ years driving 0-to-1 product launches and cross-functional delivery across engineering, design, and operations, including founding a physical POS product line from hardware selection through go-to-market. Proven ability to leverage AI tools, SQL-driven data analysis, and A/B testing to drive measurable improvements in conversion, retention, and user engagement. Skilled at translating ambiguous requirements into clear specs and partnering closely with engineering, design, and analytics to ship features that move real metrics.",
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
      id: "wrth",
      company: "WRTH",
      role: "Founding Product Manager",
      dates: "June 2026 – Present",
      location: "Remote, USA",
      bullets: [
        "Founded the Physical Stores product line from zero, gathering market requirements directly from priority merchant accounts to shape 7+ PRDs covering POS, payments, refunds, and inventory.",
        "Selected and launched physical hardware (Stripe Terminal S700) for a new retail product line, managing device rollout, in-store setup, and cross-functional coordination from pilot through general availability.",
        "Defined the platform's end-to-end revenue model for physical retail transactions, building and managing external vendor and partner relationships around payout structure and rollout."
      ],
      highlights: [
        "Founded the Physical Stores product line from zero, shaping 7+ PRDs covering POS, payments, refunds, and inventory.",
        "Selected and launched physical hardware (Stripe Terminal S700) for a new retail product line from pilot to GA.",
        "Defined the platform's end-to-end revenue model for physical retail transactions and vendor payout structures."
      ],
      metrics: [
        { value: "0-to-1", label: "Product Line Founded" },
        { value: "7+", label: "PRDs Authored" },
        { value: "S700", label: "Stripe Hardware Rollout" }
      ]
    },
    {
      id: "lowes",
      company: "Lowe’s",
      role: "Product Manager",
      dates: "July 2025 – May 2026",
      location: "Charlotte, USA",
      bullets: [
        "Served as Product Owner for Homecare+ and related digital programs, owning product scope and ensuring seamless end-to-end functionality across web, mobile, and in-store experiences serving 500K+ users.",
        "Led User Acceptance Testing (UAT) across complex system integrations, authoring 140+ test cases that validated REST API responses via Postman, data flows between microservices, and front-end/back-end parity, reducing post-release defects by 35%.",
        "Coordinated dependencies across multiple product teams and stakeholder groups, ensuring aligned priorities and consistent execution across a 500K+ user platform, reducing integration failures by 15%.",
        "Spearheaded loyalty program and checkout experience improvements for Homecare+, collaborating across product, design, and engineering to reduce friction at key conversion points and drive measurable gains in member retention and engagement."
      ],
      highlights: [
        "Served 500K+ users with Homecare+ end-to-end web, mobile, and store experience.",
        "Authored 140+ test cases validating REST API microservices via Postman, cutting post-release defects by 35%.",
        "Coordinated dependencies across multiple teams, reducing integration failures by 15%."
      ],
      metrics: [
        { value: "500K+", label: "Users Served" },
        { value: "35%", label: "Defects Reduction" },
        { value: "15%", label: "Integration Failure Cut" }
      ]
    },
    {
      id: "attribute",
      company: "Attribute Analytics",
      role: "Product Manager",
      dates: "June 2024 – June 2025",
      location: "Chicago, USA",
      bullets: [
        "Wrote SQL queries against PostgreSQL databases to analyze user behavior and product performance, identifying trends that informed roadmap prioritization and improved feature adoption by 17%.",
        "Built and maintained Power BI dashboards tracking 13 KPIs across product performance, used by 5 stakeholders weekly to drive business decisions and prioritization.",
        "Conducted root cause analysis on user drop-offs using funnel analysis and session data, recommending workflow changes that improved task completion rates across key user paths.",
        "Deployed LLM-based automation to eliminate manual compliance data entry across core operator workflows, cutting average task completion time and saving an estimated $40K annually in operational costs."
      ],
      highlights: [
        "Wrote SQL queries against PostgreSQL databases to analyze behavior, improving feature adoption by 17%.",
        "Built and maintained Power BI dashboards tracking 13 KPIs used by 5 weekly stakeholders.",
        "Deployed LLM-based automation eliminating manual compliance entry, saving an estimated $40K annually."
      ],
      metrics: [
        { value: "17%", label: "Feature Adoption Boost" },
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
        "Mapped transaction patterns and account activity through SQL analysis to surface drop-offs in financial decision-making workflows, informing a UX redesign that improved task completion by 20%.",
        "Managed external partner relationships with KYC providers and payment gateway vendors, defining API contracts and compliance validation rules that reduced onboarding verification failures.",
        "Ran end-to-end delivery across a regulated financial platform, coordinating tradeoffs between scope, speed, and compliance requirements to ship three major workflow improvements within a single fiscal year."
      ],
      highlights: [
        "Rebuilt onboarding and account management flows, driving a 42% increase in user engagement in 6 months.",
        "Mapped transaction patterns through SQL analysis to inform UX redesign, improving task completion by 20%.",
        "Managed KYC and payment gateway vendor relationships, reducing onboarding verification failures."
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
      value: "0-to-1",
      metric: "Physical Stores Line Founded",
      context: "Founded the Physical Stores product line at WRTH, authoring 7+ PRDs across POS, payments, refunds, and inventory.",
      category: "leadership"
    },
    {
      value: "500K+",
      metric: "Active digital users",
      context: "Owned product scope for Lowe's Homecare+ program across web, mobile, and in-store touchpoints.",
      category: "wins"
    },
    {
      value: "35%",
      metric: "Post-release defect reduction",
      context: "Led end-to-end integration UAT validating 140+ REST API test cases via Postman across microservices.",
      category: "metrics"
    },
    {
      value: "42%",
      metric: "Engagement increase",
      context: "Rebuilt onboarding and account management flows based on SQL-driven behavioral analysis within six months.",
      category: "metrics"
    },
    {
      value: "17%",
      metric: "Feature adoption boost",
      context: "Wrote SQL queries against PostgreSQL databases to analyze behavior and inform roadmap prioritization.",
      category: "wins"
    },
    {
      value: "$40K",
      metric: "Annual operational savings",
      context: "Deployed LLM-based automation eliminating manual compliance data entry across core operator workflows.",
      category: "leadership"
    }
  ],
  projects: [
    {
      title: "Physical Stores & POS Hardware Line (WRTH)",
      stack: ["0-to-1 PM", "Stripe Terminal S700", "PRDs", "Physical POS", "Inventory Management"],
      bullets: [
        "Founded the Physical Stores product line from zero, gathering merchant requirements to shape 7+ PRDs.",
        "Launched Stripe Terminal S700 hardware, managing rollout, in-store setup, and GA cross-functional coordination."
      ]
    },
    {
      title: "Homecare+ Omnichannel Platform (Lowe's)",
      stack: ["Product Scope", "Postman UAT", "REST APIs", "Microservices", "Omnichannel"],
      bullets: [
        "Served as Product Owner owning product scope across web, mobile, and in-store for 500K+ users.",
        "Authored 140+ test cases cutting post-release defects by 35% and cut integration failures by 15%."
      ]
    },
    {
      title: "Product Performance & LLM Automation (Attribute Analytics)",
      stack: ["PostgreSQL", "Power BI", "Funnel Analysis", "LLM Automation", "KPIs"],
      bullets: [
        "Wrote SQL queries against PostgreSQL driving 17% feature adoption and built Power BI tracking 13 KPIs.",
        "Deployed LLM-based automation eliminating manual compliance data entry, saving $40K annually."
      ]
    },
    {
      title: "Fintech Platform & Onboarding Redesign (K Pranali Investments)",
      stack: ["SQL Analytics", "UX Redesign", "KYC APIs", "Payment Gateways", "Regulated Platform"],
      bullets: [
        "Rebuilt onboarding flows driving 42% user engagement growth within six months.",
        "Mapped transaction patterns via SQL to surface drop-offs, improving task completion by 20%."
      ]
    }
  ],
  skills: [
    {
      category: "Product Management & Delivery",
      items: [
        "PRDs",
        "0-to-1 Product Development",
        "Product Roadmapping",
        "Agile / Scrum",
        "Backlog Prioritization",
        "User Stories & Acceptance Criteria",
        "Sprint Planning",
        "User Acceptance Testing (UAT)",
        "Physical Product Launch",
        "Stakeholder Management"
      ]
    },
    {
      category: "Hardware & Physical Product",
      items: [
        "POS Hardware Selection & Rollout",
        "Device Deployment",
        "Cross-Channel Inventory Management",
        "Physical Retail Operations",
        "Marketplace Integrations",
        "Checkout Optimization"
      ]
    },
    {
      category: "Payments & Commerce",
      items: [
        "Stripe (Terminal, Connect)",
        "Payment Flows",
        "Fee Routing & Vendor Payouts",
        "Refunds & RBAC"
      ]
    },
    {
      category: "Data & Analytics",
      items: [
        "SQL (PostgreSQL, MySQL)",
        "Power BI",
        "Tableau",
        "Adobe Analytics",
        "GA4",
        "Looker",
        "Advanced Excel",
        "PowerPoint",
        "Data Analysis",
        "Dashboard Development",
        "KPI Definition",
        "A/B Testing",
        "Funnel Analysis"
      ]
    },
    {
      category: "Systems & Tools",
      items: [
        "Jira",
        "Confluence",
        "Figma",
        "Visio",
        "Postman",
        "ERP & Enterprise Platforms",
        "PIM Systems",
        "CRM Platforms"
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
