import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, ArrowLeft, Printer, Sparkles, FileText } from "lucide-react";
import { resumeData } from "../data/resumeData";
import InteractiveCV from "./InteractiveCV";

interface PrintableResumeProps {
  onClose: () => void;
  isDark?: boolean;
}

export default function PrintableResume({ onClose, isDark = true }: PrintableResumeProps) {
  const [activeMode, setActiveMode] = useState<"interactive" | "print">("interactive");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${
      isDark ? "bg-slate-950/98 text-slate-100" : "bg-slate-50/98 text-slate-850"
    } p-4 md:p-8 backdrop-blur-xl flex flex-col items-center`}>
      {/* Action Buttons & Tabs Header (Hidden during native system print) */}
      <div className={`w-full ${activeMode === "interactive" ? "max-w-6xl" : "max-w-4xl"} flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 print:hidden`}>
        <div className="flex flex-wrap items-center justify-between w-full sm:w-auto gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all active:scale-95 shrink-0"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </button>

          {/* Dual Toggle Tabs */}
          <div className="flex bg-slate-900/60 p-1 border border-slate-800/80 rounded-xl gap-1 shrink-0">
            <button
              onClick={() => setActiveMode("interactive")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                activeMode === "interactive"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles size={13} />
              Interactive CV Explorer
            </button>
            <button
              onClick={() => setActiveMode("print")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                activeMode === "print"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText size={13} />
              Pristine Print Layout
            </button>
          </div>
        </div>
        
        {activeMode === "print" && (
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <p className="hidden md:block text-[11px] text-slate-400 font-medium">
              Enable Background Graphics in Print Settings for best color rendering.
            </p>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Printer size={14} />
              Print / Save PDF
            </button>
          </div>
        )}
      </div>

      {/* Actual Content based on mode selection */}
      {activeMode === "interactive" ? (
        <InteractiveCV isDark={isDark} onClose={onClose} onSwitchToPrint={() => setActiveMode("print")} />
      ) : (
        <div 
          id="resume-printable-container"
          className="w-full max-w-4xl bg-white text-slate-800 p-8 sm:p-12 shadow-2xl rounded-xl print:shadow-none print:rounded-none pr-0 print:p-0 transition-colors duration-150"
        >
          {/* Header Block */}
          <div className="border-b-2 border-slate-200 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none mb-2">
                {resumeData.basics.name}
              </h1>
              <p className="text-lg font-bold text-emerald-600">
                {resumeData.basics.title}
              </p>
            </div>
            
            <div className="text-xs sm:text-sm text-slate-600 space-y-1.5 font-medium">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-600 print:text-slate-700" />
                <a href={`mailto:${resumeData.basics.email}`} className="hover:underline">{resumeData.basics.email}</a>
              </div>
              {resumeData.basics.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-emerald-600 print:text-slate-700" />
                  <span>{resumeData.basics.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-600 print:text-slate-700" />
                <span>{resumeData.basics.location} <span className="text-emerald-700 font-bold ml-1 print:text-slate-800">(Open for Relocation)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="text-emerald-600 print:text-slate-700" />
                <a href={resumeData.basics.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  linkedin.com/in/mayunbodele
                </a>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#090b19] border-b-2 border-emerald-600 pb-1 mb-2.5">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              {resumeData.basics.summary}
            </p>
          </section>

          {/* Experience Section */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#090b19] border-b-2 border-emerald-600 pb-1 mb-3.5">
              Professional Experience
            </h2>
            <div className="space-y-5">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h3 className="text-base font-bold text-slate-950">
                      {exp.company} <span className="font-normal text-slate-500">|</span> <span className="text-emerald-600 font-semibold">{exp.role}</span>
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                      <span>{exp.location}</span>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span>{exp.dates}</span>
                    </div>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700 leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Grid */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#090b19] border-b-2 border-emerald-600 pb-1 mb-3">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 font-medium">
              {resumeData.skills.map((skillGroup, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-slate-900">{skillGroup.category}: </span>
                  <span className="text-slate-700">{skillGroup.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Grid for Education & Metrics side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
            {/* Education */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#090b19] border-b-2 border-emerald-600 pb-1 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold text-slate-950">
                      <h4>{edu.institution}</h4>
                      <span className="text-slate-500 font-semibold text-[10px]">{edu.dates}</span>
                    </div>
                    <div className="text-slate-700 text-[11px] leading-tight mt-0.5">
                      {edu.degree} {edu.major ? `in ${edu.major}` : ""}
                      {edu.gpa && (
                        <span className="font-semibold text-emerald-600 block sm:inline sm:ml-2">
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
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#090b19] border-b-2 border-emerald-600 pb-1 mb-3">
                CERTIFICATIONS & EXTRA
              </h2>
              <div className="space-y-2 text-xs">
                <div className="space-y-1.5 text-slate-700 font-medium">
                  {resumeData.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-100 pt-2.5 mt-2.5">
                  <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wide mb-1.5">
                    Languages & Other Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    {resumeData.basics.languages.map((lng, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {lng.name} ({lng.level})
                      </span>
                    ))}
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                      Top Skills: Increase Productivity, Sprint Backlog, Data Analytics
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
