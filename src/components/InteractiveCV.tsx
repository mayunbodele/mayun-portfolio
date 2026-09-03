import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Search, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  Globe,
  Printer,
  Copy,
  Layers,
  Sun,
  Moon,
  Filter,
  X,
  Plus,
  Trash2,
  FileCheck,
  TrendingUp,
  Cpu
} from "lucide-react";
import { resumeData } from "../data/resumeData";
import ContinuousCV from "./ContinuousCV";
import StagedPagesCV from "./StagedPagesCV";

interface InteractiveCVProps {
  isDark: boolean;
  onClose: () => void;
  onSwitchToPrint: () => void;
}

// Full mapping of Resume Skills to keywords found inside the professional experiences/projects
const SKILL_KEYWORDS: Record<string, string[]> = {
  // Product Management & Delivery
  "PRDs": ["prd", "prds", "specs", "requirements", "acceptance criteria"],
  "0-to-1 Product Development": ["0-to-1", "founded", "zero", "launched", "discovery", "new retail", "from zero"],
  "Product Roadmapping": ["roadmap", "roadmaps", "priorit", "prioritization", "scope", "deliv", "vision", "milestone"],
  "Agile / Scrum": ["agile", "scrum", "sprint", "grooming", "epic", "stories", "jira", "confluence", "velocity", "backlog"],
  "Backlog Prioritization": ["backlog", "grooming", "priorit", "roadmap", "prioritization", "scope"],
  "User Stories & Acceptance Criteria": ["stories", "acceptance", "criteria", "epics", "jira", "confluence", "specs", "edge cases"],
  "Sprint Planning": ["sprint", "planning", "grooming", "bi-weekly", "velocity"],
  "User Acceptance Testing (UAT)": ["uat", "testing", "test cases", "defect", "defects", "responses", "postman", "qa", "validation"],
  "Physical Product Launch": ["physical", "hardware", "terminal", "pos", "retail", "stores", "rollout", "s700", "in-store"],
  "Stakeholder Management": ["stakeholder", "stakeholders", "partner", "partnered", "external vendor", "cross-functional", "coordinate", "align", "dependencies"],

  // Hardware & Physical Product
  "POS Hardware Selection & Rollout": ["pos", "hardware", "terminal", "s700", "rollout", "device", "physical hardware"],
  "Device Deployment": ["device", "rollout", "in-store", "setup", "pilot", "general availability"],
  "Cross-Channel Inventory Management": ["inventory", "cross-channel", "in-store", "stores"],
  "Physical Retail Operations": ["physical", "retail", "stores", "in-store setup", "merchant accounts"],
  "Marketplace Integrations": ["marketplace", "merchant", "accounts", "integrations", "partner"],
  "Checkout Optimization": ["checkout", "conversion", "friction", "pos", "payments", "transactions"],

  // Payments & Commerce
  "Stripe (Terminal, Connect)": ["stripe", "terminal", "s700", "connect", "payments"],
  "Payment Flows": ["payment", "payments", "pos", "transactions", "checkout", "payout"],
  "Fee Routing & Vendor Payouts": ["payout", "payouts", "fee", "revenue model", "vendor", "external vendor"],
  "Refunds & RBAC": ["refunds", "refund", "rbac", "compliance", "validation rules", "contracts"],

  // Data & Analytics
  "SQL (PostgreSQL, MySQL)": ["sql", "postgresql", "mysql", "databases", "query", "queries"],
  "Power BI": ["power bi", "dashboard", "dashboards"],
  "Tableau": ["tableau"],
  "Adobe Analytics": ["adobe analytics", "analytics", "funnel", "session"],
  "GA4": ["ga4", "analytics", "behavior", "user drop-offs"],
  "Looker": ["looker"],
  "Advanced Excel": ["excel"],
  "PowerPoint": ["powerpoint", "stakeholders", "presentation"],
  "Data Analysis": ["analysis", "analytic", "data", "metric", "kpi", "behavior", "analytics"],
  "Dashboard Development": ["dashboard", "dashboards", "tracking", "kpis"],
  "KPI Definition": ["kpi", "kpis", "performance", "metrics", "13 kpis"],
  "A/B Testing": ["a/b testing", "a/b", "experiment", "conversion", "retention"],
  "Funnel Analysis": ["funnel", "drop-offs", "drop-off", "session data", "task completion", "conversion points"],

  // Systems & Tools
  "Jira": ["jira"],
  "Confluence": ["confluence"],
  "Figma": ["figma", "ui/ux", "design", "front-end"],
  "Visio": ["visio", "workflow", "workflows"],
  "Postman": ["postman", "rest", "api", "apis", "microservices"],
  "ERP & Enterprise Platforms": ["enterprise", "platforms", "erp"],
  "PIM Systems": ["pim", "inventory", "catalog"],
  "CRM Platforms": ["crm", "merchant", "accounts"]
};

export default function InteractiveCV({ isDark, onClose, onSwitchToPrint }: InteractiveCVProps) {
  // Selector controls state matching the premium toolbar in the screenshot
  const [focus, setFocus] = useState<"all" | "pm" | "analyst" | "academic">("all");
  const [aesthetic, setAesthetic] = useState<"detail" | "compact">("detail");
  const [canvasTheme, setCanvasTheme] = useState<"light" | "dark">("light");
  const [layout, setLayout] = useState<"pages" | "stream">("pages");
  const [activePage, setActivePage] = useState<"all" | 1 | 2 | 3>("all");
  
  // Interactive tracing skills selection engine
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedToast, setCopiedToast] = useState(false);

  // Toggle skill highlight trace
  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Reset tracing filters
  const handleClearTraces = () => {
    setSelectedSkills([]);
    setSearchQuery("");
  };

  // Plain-text copy mechanism
  const handleCopyPlainText = () => {
    const experiencesText = resumeData.experience
      .map(exp => `
COMPANY: ${exp.company}
ROLE: ${exp.role} | DATES: ${exp.dates} | LOCATION: ${exp.location}
KEY ACCOMPLISHMENTS:
${exp.bullets.map(b => `* ${b}`).join("\n")}
    `).join("\n");

    const skillsText = resumeData.skills
      .map(s => `${s.category}: ${s.items.join(", ")}`)
      .join("\n");

    const educationText = resumeData.education
      .map(edu => `${edu.institution} - ${edu.degree} ${edu.major ? `in ${edu.major}` : ""} (${edu.dates}) - GPA: ${edu.gpa}`)
      .join("\n");

    const fullPlainText = `
========================================
MAYUN BODELE - PRODUCT MANAGER
========================================
Email: ${resumeData.basics.email}
Phone: ${resumeData.basics.phone}
LinkedIn: ${resumeData.basics.linkedin}
Location: ${resumeData.basics.location}

PROFESSIONAL SUMMARY:
${resumeData.basics.summary}

RELEVANT SKILLS MATRIX:
${skillsText}

PROFESSIONAL EXPERIENCE:
${experiencesText}

EDUCATION & CREDENTIALS:
${educationText}

CERTIFICATIONS:
${resumeData.certifications.join(", ")}
========================================
    `.trim();

    navigator.clipboard.writeText(fullPlainText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  // Trigger system native print
  const handlePrint = () => {
    window.print();
  };

  // Compute matched trace terms
  const activeTraceKeywords = useMemo(() => {
    const list = new Set<string>();
    
    // Add keywords from selected state
    selectedSkills.forEach(s => {
      const keywords = SKILL_KEYWORDS[s] || [];
      keywords.forEach(k => list.add(k.toLowerCase()));
    });
    
    // Add search query if typed
    if (searchQuery.trim()) {
      list.add(searchQuery.trim().toLowerCase());
    }
    
    return Array.from(list).sort((a, b) => b.length - a.length);
  }, [selectedSkills, searchQuery]);

  // Highlight word occurrences inline inside the CV rendering view
  const highlightContentText = (text: string) => {
    if (activeTraceKeywords.length === 0) return text;

    const escapedKeywords = activeTraceKeywords
      .map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .filter(Boolean);

    if (escapedKeywords.length === 0) return text;

    const regexPattern = `\\b(${escapedKeywords.join("|")})\\b`;
    let regex: RegExp;
    try {
      regex = new RegExp(regexPattern, "gi");
    } catch (e) {
      regex = new RegExp(`(${escapedKeywords.join("|")})`, "gi");
    }

    const parts = text.split(regex);
    const isDarkCanvas = canvasTheme === "dark";

    return (
      <>
        {parts.map((part, idx) => {
          const isMatch = escapedKeywords.some(k => part.toLowerCase() === k.toLowerCase());
          if (isMatch) {
            return (
              <span
                key={idx}
                className={`transition-all duration-300 font-extrabold inline px-1 py-0.5 rounded ${
                  isDarkCanvas
                    ? "bg-emerald-500/25 text-emerald-300 border-b border-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                    : "bg-emerald-100/90 text-emerald-950 border-b border-emerald-600/80 shadow-sm"
                }`}
              >
                {part}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  };

  // Filter experiences according to focus choices
  const adaptExperiences = useMemo(() => {
    return resumeData.experience.map(exp => {
      const companyUpper = exp.company.toUpperCase();
      const isWrth = companyUpper.includes("WRTH");
      const isLowe = companyUpper.includes("LOWE");
      const isAttr = companyUpper.includes("ATTRIBUTE");
      const isPranali = companyUpper.includes("PRANALI");

      let emphasis = true;
      let badgeLabel = "Industry PM";

      if (focus === "pm") {
        emphasis = isWrth || isLowe || isPranali;
        badgeLabel = emphasis ? "Core PM" : "Supporting Context";
      } else if (focus === "analyst") {
        emphasis = isAttr || isPranali;
        badgeLabel = emphasis ? "Core Analytics" : "PM Context";
      } else if (focus === "academic") {
        emphasis = false; // Academic focus puts education timeline on top
        badgeLabel = "Enterprise PM";
      }

      // Check bullet keyword matching count to display badge count
      const matchedBullets = exp.bullets.filter(bullet => {
        if (activeTraceKeywords.length === 0) return true;
        return activeTraceKeywords.some(key => bullet.toLowerCase().includes(key));
      });

      return {
        ...exp,
        emphasis,
        badgeLabel,
        matchedCount: activeTraceKeywords.length > 0 ? matchedBullets.length : 0,
        originalCount: exp.bullets.length
      };
    });
  }, [focus, activeTraceKeywords]);

  const isDarkCanvas = canvasTheme === "dark";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0d0f1e] select-text">
      
      {/* Top Bar Navigation Block - Matches Richa Rameshkrishna Design */}
      <div className="w-full bg-[#0d0f1e] text-slate-200 border-b border-slate-800/80 p-4 shrink-0 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        {/* Left Title Panel */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </div>
          <div>
            <h2 className="text-sm md:text-base font-black tracking-tight flex items-center gap-2">
              Mayun Bodele <span className="text-slate-500 font-normal">|</span> Interactive Digital CV
            </h2>
            <p className="text-[9px] md:text-[10px] font-mono tracking-wider text-slate-400 uppercase mt-0.5">
              CLICK SKILLS BELOW TO HIGHLIGHT MATCHED JOB PARAMETERS
            </p>
          </div>
        </div>

        {/* Action Buttons Right Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopyPlainText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            <Copy size={13} className="text-slate-400" />
            Copy Plain Text
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition active:scale-95 cursor-pointer"
          >
            <Printer size={13} />
            Print PDF Resume
          </button>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Interactive Command Control Segment - Focus, Aesthetic, Canvas */}
      <div className="w-full bg-[#070810] px-4 md:px-6 py-3 border-b border-slate-900/40 flex flex-wrap items-center gap-5 justify-start text-[10px] font-bold text-slate-400 select-none print:hidden">
        
        {/* focus filter tab */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-500 flex items-center gap-1 uppercase tracking-wide">
            <Filter size={11} className="text-indigo-400" />
            Focus:
          </span>
          <div className="flex bg-slate-900/90 border border-slate-850 p-0.5 rounded-lg gap-0.5">
            {[
              { id: "all", label: "All (Full)" },
              { id: "pm", label: "Digital PM" },
              { id: "analyst", label: "PM Analyst" },
              { id: "academic", label: "Academic" }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFocus(f.id as any)}
                className={`px-2.5 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                  focus === f.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-250 hover:bg-slate-800/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* aesthetic layout toggle */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-500 flex items-center gap-1 uppercase tracking-wide">
            <Layers size={11} className="text-indigo-400" />
            Aesthetic:
          </span>
          <div className="flex bg-slate-900/90 border border-slate-850 p-0.5 rounded-lg gap-0.5">
            {[
              { id: "detail", label: "Corporate Detail" },
              { id: "compact", label: "Compact A4 Fit" }
            ].map(a => (
              <button
                key={a.id}
                onClick={() => setAesthetic(a.id as any)}
                className={`px-2.5 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                  aesthetic === a.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-250 hover:bg-slate-800/40"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* canvas mode selector */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-500 flex items-center gap-1 uppercase tracking-wide">
            <Sun size={11} className="text-emerald-400" />
            Canvas:
          </span>
          <div className="flex bg-slate-900/90 border border-slate-850 p-0.5 rounded-lg gap-0.5">
            {[
              { id: "light", label: "Crisp A4 Light" },
              { id: "dark", label: "Console Dark" }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setCanvasTheme(c.id as any)}
                className={`px-3 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                  canvasTheme === c.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-slate-250 hover:bg-slate-800/40"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* layout staging selector */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-500 flex items-center gap-1 uppercase tracking-wide">
            <FileCheck size={11} className="text-indigo-400" />
            Paging:
          </span>
          <div className="flex bg-slate-900/90 border border-slate-850 p-0.5 rounded-lg gap-0.5">
            {[
              { id: "pages", label: "Staged Pages" },
              { id: "stream", label: "Continuous" }
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setLayout(l.id as any)}
                className={`px-2.5 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                  layout === l.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-250 hover:bg-slate-800/40"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* active page selector - displays when staged pages is enabled */}
        {layout === "pages" && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="font-mono text-slate-500 flex items-center gap-1 uppercase tracking-wide">
              Active:
            </span>
            <div className="flex bg-slate-900/90 border border-slate-850 p-0.5 rounded-lg gap-0.5">
              {[
                { id: "all", label: "Stack All" },
                { id: 1, label: "Page 1" },
                { id: 2, label: "Page 2" },
                { id: 3, label: "Page 3" }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setActivePage(p.id as any)}
                  className={`px-2 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider cursor-pointer ${
                    activePage === p.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-250 hover:bg-slate-800/40"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Search Keyword field */}
        <div className="flex items-center gap-2 ml-auto shrink-0 w-full xl:w-auto mt-2 xl:mt-0">
          <div className="relative w-full xl:w-56">
            <input
              type="text"
              placeholder="Search / Filter keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-[10px] py-1 pl-7 pr-4 rounded-lg font-mono text-slate-200 outline-none focus:border-indigo-500/80 transition placeholder-slate-500"
            />
            <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-400 px-1 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Copy notification popup wrapper */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-600 border border-emerald-500 text-white text-xs font-bold text-center py-2 shrink-0 flex items-center justify-center gap-1.5"
          >
            <Check size={14} />
            Copied plain resume text successfully to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive tracing indicator banner */}
      {activeTraceKeywords.length > 0 && (
        <div className="bg-indigo-950/45 border-b border-slate-900 text-[10px] py-1.5 px-6 shrink-0 font-mono text-indigo-400 flex justify-between items-center print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            <span>Active Tracing: {activeTraceKeywords.length} term(s) matched in live resume below. Click active badges to untrace.</span>
          </div>
          <button
            onClick={handleClearTraces}
            className="text-[9px] font-black uppercase text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-950 px-2 py-0.5 rounded cursor-pointer transition-all"
          >
            Reset All Tracing
          </button>
        </div>
      )}

      {/* Immersive Sandbox CV Workspace Content Wrapper */}
      <div className="w-full grow bg-[#05060b] p-3 md:p-8 flex flex-col items-center overflow-y-auto max-h-[78vh] scrollbar-thin">
        
        {layout === "stream" ? (
          <ContinuousCV
            isDarkCanvas={isDarkCanvas}
            aesthetic={aesthetic}
            focus={focus}
            selectedSkills={selectedSkills}
            activeTraceKeywords={activeTraceKeywords}
            adaptExperiences={adaptExperiences}
            handleToggleSkill={handleToggleSkill}
            highlightContentText={highlightContentText}
          />
        ) : (
          <StagedPagesCV
            isDarkCanvas={isDarkCanvas}
            aesthetic={aesthetic}
            focus={focus}
            activePage={activePage}
            selectedSkills={selectedSkills}
            activeTraceKeywords={activeTraceKeywords}
            adaptExperiences={adaptExperiences}
            handleToggleSkill={handleToggleSkill}
            highlightContentText={highlightContentText}
          />
        )}

      </div>
    </div>
  );
}
