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
    title: "Product Manager at Lowe's",
    summary: "Product Manager with 4+ years of experience delivering data-driven digital products at the intersection of engineering, UX, and business. My latest landmark product is spearheading Lowe's flagship HomeCare+ and related digital programs, owning product scope and ensuring seamless end-to-end functionality across web, mobile, and in-store experiences serving 500K+ users. Hands-on with APIs, SQL-based analytics, system integrations, and Agile delivery. Skilled at translating ambiguous requirements into clear specifications, managing cross-functional dependencies, and using data to drive product decisions. Consistent track record of improving workflow efficiency, reducing friction in user-critical flows, and shipping high-quality releases in fast-moving environments.",
    location: "Chicago, Illinois, United States / Charlotte, NC, USA",
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
      company: "Lowe's Companies, Inc.",
      role: "Product Manager",
      dates: "July 2025 - Present",
      location: "Charlotte, NC, USA",
      bullets: [
        "Served as Product Owner for Homecare+ and related digital programs, owning product scope and ensuring seamless end-to-end functionality across web, mobile, and in-store experiences serving 500K+ users.",
        "Defined epics, user stories, and acceptance criteria in Jira and Confluence, partnering with engineering and UI/UX to align on scope, API contracts, and system behavior ahead of each sprint.",
        "Led User Acceptance Testing (UAT) across complex system integrations, authoring test cases that validated REST API responses via Postman, data flows between microservices, and front-end/back-end parity, reducing post-release defects by 35%.",
        "Coordinated cross-functional dependencies across Wallet, Payments, and Loyalty teams, ensuring accurate data flow and seamless API integrations, reducing integration failures by 15%.",
        "Monitored product performance and key KPIs using SQL and Adobe Analytics, identifying gaps in user journeys and driving improvements that increased workflow efficiency and reduced user friction.",
        "Managed release planning and product launches, supporting bi-weekly sprint releases, ensuring alignment across engineering, QA, and business stakeholders while proactively identifying risks, dependencies, and performance issues.",
        "Synthesized user research and customer feedback through surveys and session analysis to identify friction points and inform roadmap prioritization.",
        "Scaled AI-powered features from concept to bi-weekly releases, improving user experience through intelligent recommendation algorithms and predictive workflows."
      ],
      highlights: [
        "Served 500K+ users with Homecare+ end-to-end web, mobile, and store experience.",
        "Reduced post-release defects by 35% through robust integration UAT.",
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
      role: "Product Analyst",
      dates: "June 2024 - June 2025",
      location: "Chicago, IL, USA",
      bullets: [
        "Gathered and synthesized requirements from customers, compliance, and operations teams, defining product scope and translating insights into structured specifications with clear acceptance criteria and edge case handling.",
        "Wrote SQL queries against PostgreSQL databases to analyze user behavior and product performance, identifying trends that informed roadmap prioritization and improved feature adoption by 17%.",
        "Built and maintained Power BI dashboards tracking KPIs including user engagement, workflow completion rates, and feature adoption, enabling weekly data-driven prioritization discussions.",
        "Conducted root cause analysis on user drop-offs using funnel analysis and session data, recommending workflow changes that improved task completion rates across key user paths.",
        "Supported Agile sprint execution including backlog grooming, story pointing, and dependency mapping, ensuring engineering velocity stayed aligned with business priorities."
      ],
      highlights: [
        "Improved feature adoption by 17% using targeted SQL trend analysis."
      ],
      metrics: [
        { value: "17%", label: "Adoption Boost" },
        { value: "5/5", label: "Agile Sprinter" }
      ]
    },
    {
      id: "foodtrace",
      company: "Food Trace AI",
      role: "Product Analyst",
      dates: "June 2024 - February 2025",
      location: "Remote, USA",
      bullets: [
        "Gathered and synthesized requirements from customers, compliance, and operations teams, translating insights into structured feature specs with clear acceptance criteria and edge case handling.",
        "Wrote SQL queries against PostgreSQL databases to analyze user behavior and product performance, identifying trends that informed roadmap prioritization and improved feature adoption by 17%.",
        "Built and maintained Power BI dashboards tracking KPIs including user engagement, workflow completion rates, and feature adoption, enabling weekly data-driven prioritization discussions.",
        "Conducted root cause analysis on user drop-offs using funnel analysis and session data, recommending workflow changes that improved task completion rates across key user paths.",
        "Supported Agile sprint execution including backlog grooming, story pointing, and dependency mapping, ensuring engineering velocity stayed aligned with business priorities.",
        "Implemented AI-powered workflow automation using LLM tools to reduce manual compliance data entry, directly improving user efficiency and operational costs."
      ],
      highlights: [
        "Implemented AI-powered workflow automation with LLMs to eliminate manual data entry and save costs."
      ],
      metrics: [
        { value: "LLM", label: "Workflow Automation" },
        { value: "Zero-In", label: "Manual Entry Reduced" }
      ]
    },
    {
      id: "kpranali",
      company: "K PRANALI INVESTMENTS PRIVATE LIMITED (K Pranali Investments)",
      role: "Product Manager",
      dates: "January 2020 - August 2022",
      location: "Mumbai, India",
      bullets: [
        "Owned the product roadmap for a financial services platform handling investment workflows, transaction processing, and account management, prioritizing features that increased user engagement by 42%.",
        "Partnered with engineering to build and enhance systems with near real-time data updates and transaction flows, writing detailed specs that covered data validation, error states, and edge case handling.",
        "Analyzed customer behavior and transaction patterns using SQL to identify friction points in onboarding and financial decision-making workflows, driving targeted UX improvements.",
        "Simplified complex financial processes across the platform, reducing user friction and improving task completion efficiency by 20% across key workflows.",
        "Led discovery-to-delivery product lifecycle, aligning business, technology, and compliance stakeholders on priorities and managing tradeoffs between scope, speed, and system reliability."
      ],
      highlights: [
        "Increased user engagement by 42% on investment roadmap prioritizations.",
        "Boosted task completion efficiency by 20% by simplifying complex financial flows."
      ],
      metrics: [
        { value: "42%", label: "User Engagement Increase" },
        { value: "20%", label: "Task Completion Bump" }
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
      category: "wins"
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
      degree: "Master of Science",
      major: "Management Information Systems, General",
      gpa: "3.87/4.00",
      dates: "August 2022 - May 2024",
      location: "Chicago, IL, USA"
    },
    {
      institution: "MCT's Rajiv Gandhi Institute of Technology",
      degree: "Bachelor of Engineering (or Computational Science)",
      major: "Computer Science",
      gpa: "3.56/4.00",
      dates: "August 2018 - May 2022",
      location: "Mumbai, India"
    },
    {
      institution: "Pace Junior Science College",
      degree: "High School Diploma",
      major: "Engineering",
      dates: "June 2016 - May 2018",
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
