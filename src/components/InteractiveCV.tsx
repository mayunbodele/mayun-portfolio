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

interface InteractiveCVProps {
  isDark: boolean;
  onClose: () => void;
  onSwitchToPrint: () => void;
}

// Full mapping of Resume Skills to keywords found inside the professional experiences/projects
const SKILL_KEYWORDS: Record<string, string[]> = {
  // Product Management & Delivery
  "Product Roadmapping": ["roadmap", "roadmaps", "priorit", "scope", "deliv", "vision", "milestone"],
  "Agile / Scrum": ["agile", "scrum", "sprint", "grooming", "epic", "stories", "jira", "confluence", "velocity", "backlog"],
  "Backlog Prioritization": ["backlog", "grooming", "priorit", "roadmap", "prioritization", "scope"],
  "User Stories & Acceptance Criteria": ["stories", "acceptance", "criteria", "epics", "jira", "confluence"],
  "Sprint Planning": ["sprint", "planning", "grooming", "bi-weekly", "velocity"],
  "User Acceptance Testing (UAT)": ["uat", "testing", "defect", "responses", "postman", "qa", "assertions", "validation"],
  "Product Lifecycle Management": ["lifecycle", "concept", "roadmap", "launch", "releases", "discovery-to-delivery"],
  "Stakeholder Management": ["stakeholder", "partner", "coordinate", "align", "dependencies"],
  "Risk Identification": ["risk", "issue", "dependenc", "friction"],

  // Data & Analytics
  "SQL (PostgreSQL, MySQL)": ["sql", "postgresql", "mysql", "databases", "query", "queries"],
  "Power BI": ["power bi", "dashboard", "dashboards"],
  "Tableau": ["tableau"],
  "Advanced Excel": ["excel"],
  "Data Analysis": ["analysis", "analytic", "data", "metric", "kpi", "behavior", "analytics"],
  "Dashboard Development": ["dashboard", "dashboards", "charts", "visual"],
  "KPI Definition": ["kpi", "performance", "metrics", "kpis"],
  "Product Performance Monitoring": ["performance", "adobe analytics", "kpi", "kpis", "monitored"],
  "Funnel Analysis": ["funnel", "drop-off", "session analysis"],

  // Systems & Tools
  "Jira": ["jira"],
  "Confluence": ["confluence"],
  "Visio": ["visio"],
  "Postman": ["postman", "rest", "api", "apis"],
  "ERP & Enterprise Platforms": ["enterprise", "platforms"],

  // AI & Emerging Technologies
  "Claude": ["claude"],
  "GPT": ["gpt"],
  "LLM Integration": ["llm", "large language", "ai-powered", "recommendation"],
  "Workflow Automation": ["workflow", "automation", "automate", "efficiency", "streamlined"],
  "Recommendation Engines": ["recommendation", "algorithms", "predictive"],
  "Predictive Analytics": ["predictive", "analytics"]
};

export default function InteractiveCV({ isDark, onClose, onSwitchToPrint }: InteractiveCVProps) {
  // Selector controls state matching the premium toolbar in the screenshot
  const [focus, setFocus] = useState<"all" | "pm" | "analyst" | "academic">("all");
  const [aesthetic, setAesthetic] = useState<"detail" | "compact">("detail");
  const [canvasTheme, setCanvasTheme] = useState<"light" | "dark">("light");
  
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

    // Sort keywords by length descending to match larger tokens first
    const escapedKeywords = activeTraceKeywords
      .map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
      .filter(Boolean);

    if (escapedKeywords.length === 0) return text;

    const regexPattern = `\\b(${escapedKeywords.join("|")})\\b`;
    let regex: RegExp;
    try {
      regex = new RegExp(regexPattern, "gi");
    } catch (e) {
      // Fallback word boundary
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
      const isLowe = companyUpper.includes("LOWE");
      const isPranali = companyUpper.includes("PRANALI");
      const isFood = companyUpper.includes("FOOD");
      const isAttr = companyUpper.includes("ATTRIBUTE");

      let emphasis = true;
      let badgeLabel = "Industry PM";

      if (focus === "pm") {
        emphasis = isLowe || isPranali;
        badgeLabel = emphasis ? "Core PM" : "Supporting Context";
      } else if (focus === "analyst") {
        emphasis = isFood || isAttr;
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
                className={`px-2.5 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider ${
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
                className={`px-2.5 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider ${
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
                className={`px-3 py-1 rounded text-[9px] font-extrabold uppercase transition-all tracking-wider ${
                  canvasTheme === c.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-250 hover:bg-slate-800/40"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

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
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-400 px-1 rounded"
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
        
        {/* Dynamic CV Document Sheet Representation */}
        <div
          id="resume-printable-container"
          className={`w-full max-w-4xl transition-all duration-300 origin-top shadow-2xl rounded-xl text-justify border ${
            isDarkCanvas
              ? "bg-slate-950 border-slate-900 text-slate-100 shadow-emerald-950/5 p-6 md:p-12"
              : "bg-white border-slate-200 text-slate-800 shadow-slate-900/10 p-6 md:p-12"
          } ${
            aesthetic === "compact" ? "p-5 md:p-8 leading-snug" : "leading-relaxed"
          }`}
        >
          {/* Resume Name Header Segment */}
          <div className={`border-b-2 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
            isDarkCanvas ? "border-slate-850" : "border-slate-200"
          } ${aesthetic === "compact" ? "mb-4" : "mb-6"}`}>
            <div>
              <h1 className={`font-black tracking-tight leading-none ${
                isDarkCanvas ? "text-slate-100" : "text-slate-950"
              } ${aesthetic === "compact" ? "text-2xl md:text-3xl mb-1.5" : "text-3xl sm:text-4xl mb-2"}`}>
                {resumeData.basics.name}
              </h1>
              <p className="text-sm md:text-base font-bold text-emerald-600 uppercase tracking-widest leading-none">
                {resumeData.basics.title}
              </p>
            </div>

            {/* Quick Contact Block */}
            <div className={`text-[11px] md:text-xs font-semibold ${
              isDarkCanvas ? "text-slate-400" : "text-slate-600"
            } space-y-1 shrink-0`}>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-emerald-500" />
                <a href={`mailto:${resumeData.basics.email}`} className="hover:underline">{resumeData.basics.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-500" />
                <span>{resumeData.basics.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-emerald-500" />
                <span>{resumeData.basics.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={13} className="text-emerald-500" />
                <a href={resumeData.basics.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  linkedin.com/in/mayunbodele
                </a>
              </div>
            </div>
          </div>

          {/* Professional Executive Hook Section */}
          <section className={`transition-all duration-300 ${aesthetic === "compact" ? "mb-4" : "mb-6"}`}>
            <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
              isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
            } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-2.5"}`}>
              Professional Summary
            </h2>
            <p className={`text-justify ${
              isDarkCanvas ? "text-slate-300" : "text-slate-650"
            } ${aesthetic === "compact" ? "text-[11px]" : "text-xs md:text-sm"}`}>
              {highlightContentText(resumeData.basics.summary)}
            </p>
          </section>

          {/* Dynamic Technical Skills Tracing Engine Component */}
          <section className={`transition-all duration-300 ${aesthetic === "compact" ? "mb-4" : "mb-6"}`}>
            <div className="flex justify-between items-center border-b pb-1 mb-2.5 border-slate-200 dark:border-slate-800">
              <h2 className={`font-black tracking-widest uppercase ${
                isDarkCanvas ? "text-slate-300" : "text-slate-950"
              } ${aesthetic === "compact" ? "text-[11px]" : "text-xs"}`}>
                Technical Skills Matrix
              </h2>
              <span className={`font-mono font-black text-[9px] uppercase tracking-wider select-none ${
                isDarkCanvas ? "text-emerald-400 animate-pulse" : "text-indigo-600"
              }`}>
                (Click tags to trace skill usage in bullets)
              </span>
            </div>

            <div className={`space-y-2 ${aesthetic === "compact" ? "text-[10px]" : "text-xs"}`}>
              {resumeData.skills.map((grp, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-1.5 md:gap-4 items-start py-1 border-b last:border-0 border-slate-100/10 dark:border-slate-900/50">
                  <div className={`md:col-span-3 font-bold ${
                    isDarkCanvas ? "text-slate-400" : "text-slate-900"
                  }`}>
                    {grp.category}:
                  </div>
                  <div className="md:col-span-9 flex flex-wrap gap-1.5">
                    {grp.items.map((item, ii) => {
                      const isActive = selectedSkills.includes(item);
                      return (
                        <button
                          key={ii}
                          onClick={() => handleToggleSkill(item)}
                          className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-semibold border transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-emerald-600 border-emerald-500 text-white shadow-sm ring-2 ring-emerald-500/20"
                              : isDarkCanvas
                                ? "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-400"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-600 hover:bg-slate-100"
                          }`}
                        >
                          {isActive && <Check size={10} className="inline mr-1 text-white" />}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Adaptive Placement Section: If Academic focus is selected, rearrangement pushes EDUCATION to top */}
          {focus === "academic" && (
            <div className="space-y-5">
              {/* Education Block rearranged top */}
              <section className={aesthetic === "compact" ? "mb-4" : "mb-6"}>
                <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
                  isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-3"}`}>
                  Academic Chronology (Priority Placement)
                </h2>
                <div className="space-y-3.5">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold">
                        <h4 className={isDarkCanvas ? "text-slate-100" : "text-slate-950"}>{edu.institution}</h4>
                        <span className="text-slate-500 text-[10px] font-mono">{edu.dates}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] leading-tight mt-0.5 flex justify-between">
                        <span>{edu.degree} {edu.major ? `in ${edu.major}` : ""}</span>
                        {edu.gpa && (
                          <span className="font-extrabold text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.2 rounded">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications Block rearranged top */}
              <section className={aesthetic === "compact" ? "mb-4" : "mb-6"}>
                <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
                  isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-3"}`}>
                  Industry Certifications
                </h2>
                <div className="flex flex-wrap gap-2 text-xs">
                  {resumeData.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-md border font-mono text-[10.5px] ${
                        isDarkCanvas 
                          ? "bg-slate-900 border-slate-800 text-slate-300"
                          : "bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      • {cert}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Adapted Professional Experience Timeline */}
          <section className={`transition-all duration-300 ${aesthetic === "compact" ? "mb-4" : "mb-6"}`}>
            <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
              isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
            } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-3.5"}`}>
              Professional Experience
            </h2>

            <div className="space-y-5">
              {adaptExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className={`transition-all duration-300 ${
                    !exp.emphasis && focus !== "all"
                      ? "opacity-45 hover:opacity-100 scale-99 border-l border-dashed pl-4 border-slate-600"
                      : "opacity-100 pl-0"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1.5">
                    <h3 className={`text-sm md:text-base font-black ${
                      isDarkCanvas ? "text-slate-100" : "text-slate-950"
                    }`}>
                      {exp.company}{" "}
                      <span className="text-slate-400 font-normal">|</span>{" "}
                      <span className="text-emerald-500 font-bold">{exp.role}</span>
                    </h3>
                    
                    <div className="flex items-center gap-2.5 text-[10px] md:text-xs text-slate-500 font-bold">
                      <span className="px-1.5 py-0.2 bg-slate-500/10 rounded tracking-wider uppercase text-[9px]">
                        {exp.badgeLabel}
                      </span>
                      {exp.matchedCount > 0 && (
                        <span className="px-1.5 py-0.2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded font-mono text-[9px] animate-pulse">
                          {exp.matchedCount} traces
                        </span>
                      )}
                      <span>{exp.dates}</span>
                    </div>
                  </div>

                  <ul className={`list-disc pl-5 space-y-1.5 text-xs text-justify ${
                    isDarkCanvas ? "text-slate-300" : "text-slate-700"
                  } ${aesthetic === "compact" ? "text-[11px] space-y-1" : "text-xs sm:text-sm"}`}>
                    {exp.bullets.map((bullet, idx) => {
                      const containsMatched = activeTraceKeywords.length > 0 && activeTraceKeywords.some(key => bullet.toLowerCase().includes(key));
                      return (
                        <li
                          key={idx}
                          className={`transition-all duration-300 ${
                            containsMatched 
                              ? (isDarkCanvas 
                                  ? "text-emerald-300 pl-1 border-l-2 border-emerald-500 font-medium bg-emerald-500/5 py-0.5 rounded-r" 
                                  : "text-emerald-950 pl-1 border-l-2 border-emerald-600 font-semibold bg-emerald-50/50 py-0.5 rounded-r")
                              : ""
                          }`}
                        >
                          {highlightContentText(bullet)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Digital Projects Spotlight (Renders highly formatted technical projects, similar to publications style in Richa's screenshot) */}
          <section className={`transition-all duration-300 ${aesthetic === "compact" ? "mb-4" : "mb-6"}`}>
            <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
              isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
            } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-3"}`}>
              Digital Products & AI Projects Spotlight
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((proj, idx) => (
                <div key={idx} className="group border-l border-slate-100/10 dark:border-slate-800 pl-3">
                  <div className="flex flex-wrap justify-between items-baseline gap-1 mb-1">
                    <h4 className={`text-xs md:text-sm font-bold ${
                      isDarkCanvas ? "text-slate-200" : "text-slate-950"
                    }`}>
                      {proj.title}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {proj.stack.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-slate-500/10 text-[9.5px] px-1.5 py-0.2 rounded font-mono text-slate-400 border border-slate-800/10 dark:border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className={`list-disc pl-4 text-xs ${
                    isDarkCanvas ? "text-slate-400" : "text-slate-600"
                  } ${aesthetic === "compact" ? "text-[11px]" : "text-xs"}`}>
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        {highlightContentText(b)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* standard placement of education when focus is not specifically 'academic' */}
          {focus !== "academic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 transition-all duration-300">
              {/* Education */}
              <section>
                <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
                  isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-3"}`}>
                  Education
                </h2>
                <div className="space-y-3.5">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-950 dark:text-slate-200">
                        <h4>{edu.institution}</h4>
                        <span className="text-slate-500 font-semibold text-[10px] font-mono">{edu.dates}</span>
                      </div>
                      <div className={`text-[11px] leading-tight mt-0.5 flex justify-between ${
                        isDarkCanvas ? "text-slate-400" : "text-slate-600"
                      }`}>
                        <span>{edu.degree} {edu.major ? `in ${edu.major}` : ""}</span>
                        {edu.gpa && (
                          <span className="font-extrabold text-emerald-500 font-mono dark:bg-emerald-500/10 dark:px-1.5 dark:py-0.2 rounded">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications and Additional Languages */}
              <section>
                <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
                  isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-3"}`}>
                  Certifications & Languages
                </h2>
                <div className="space-y-3 text-xs">
                  <div className={`space-y-1.5 font-medium ${
                    isDarkCanvas ? "text-slate-300" : "text-slate-700"
                  }`}>
                    {resumeData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                        <span className="text-[11px] font-mono">{cert}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`border-t pt-2.5 mt-2.5 ${
                    isDarkCanvas ? "border-slate-800" : "border-slate-100"
                  }`}>
                    <h4 className={`font-bold uppercase tracking-wider text-[10px] mb-1.5 ${
                      isDarkCanvas ? "text-slate-400" : "text-slate-800"
                    }`}>
                      Languages & Other Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2 text-[10.5px]">
                      {resumeData.basics.languages.map((lng, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded border ${
                            isDarkCanvas 
                              ? "bg-slate-900 border-slate-800 text-slate-300"
                              : "bg-slate-100 border-slate-200 text-slate-800"
                          }`}
                        >
                          {lng.name} ({lng.level})
                        </span>
                      ))}
                      <span
                        className={`px-2 py-0.5 rounded border ${
                          isDarkCanvas 
                            ? "bg-slate-900 border-slate-800 text-slate-300"
                            : "bg-slate-100 border-slate-200 text-slate-800"
                        }`}
                      >
                        Top Skills: High Productivity & Agile Backlog Analysis
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
