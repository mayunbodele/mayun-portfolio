import React from "react";
import { Mail, Phone, MapPin, Linkedin, Check } from "lucide-react";
import { resumeData } from "../data/resumeData";

interface StagedPagesCVProps {
  isDarkCanvas: boolean;
  aesthetic: "detail" | "compact";
  focus: "all" | "pm" | "analyst" | "academic";
  activePage: "all" | 1 | 2 | 3;
  selectedSkills: string[];
  activeTraceKeywords: string[];
  adaptExperiences: any[];
  handleToggleSkill: (skill: string) => void;
  highlightContentText: (text: string) => React.ReactNode;
}

export default function StagedPagesCV({
  isDarkCanvas,
  aesthetic,
  focus,
  activePage,
  selectedSkills,
  activeTraceKeywords,
  adaptExperiences,
  handleToggleSkill,
  highlightContentText
}: StagedPagesCVProps) {
  return (
    <div className="w-full flex flex-col items-center gap-8 select-text">
      {/* Page layout context header */}
      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 flex items-center justify-center gap-2 print:hidden select-none mb-1">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <span>Multi-Page Proportions Staging</span>
        <span>•</span>
        <span className="text-indigo-400 font-extrabold pb-0.5 border-b border-indigo-500/40 font-mono">A4 Boundaries Active</span>
      </div>

      {/* ====== PAGE 1 CONTROLLER/CONTAINER ====== */}
      {(activePage === "all" || activePage === 1) && (
        <div
          className={`w-full max-w-4xl transition-all duration-300 origin-top shadow-2xl rounded-xl border relative flex flex-col justify-between ${
            isDarkCanvas
              ? "bg-slate-950 border-slate-900 text-slate-100 shadow-emerald-950/5"
              : "bg-white border-slate-200 text-slate-800 shadow-slate-900/10"
          } ${
            aesthetic === "compact" 
              ? "p-6 md:p-10 leading-snug min-h-[960px]" 
              : "p-8 md:p-14 leading-relaxed min-h-[1080px]"
          } print:min-h-0 print:max-h-none print:border-none print:shadow-none print:m-0 print:p-0`}
        >
          <div>
            {/* Name Header Segment */}
            <div className={`border-b-2 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
              isDarkCanvas ? "border-slate-850" : "border-slate-200"
            } ${aesthetic === "compact" ? "mb-3" : "mb-5"}`}>
              <div>
                <h1 className={`font-black tracking-tight leading-none ${
                  isDarkCanvas ? "text-slate-100" : "text-slate-950"
                } ${aesthetic === "compact" ? "text-xl md:text-2xl mb-1" : "text-2xl sm:text-3xl mb-1.5"}`}>
                  {resumeData.basics.name}
                </h1>
                <p className="text-xs md:text-sm font-black text-emerald-600 uppercase tracking-widest leading-none">
                  {resumeData.basics.title}
                </p>
              </div>

              {/* Contact block */}
              <div className={`text-[10px] font-semibold ${
                isDarkCanvas ? "text-slate-400" : "text-slate-600"
              } space-y-0.5 shrink-0`}>
                <div className="flex items-center gap-1.5">
                  <Mail size={11} className="text-emerald-500" />
                  <a href={`mailto:${resumeData.basics.email}`} className="hover:underline">{resumeData.basics.email}</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={11} className="text-emerald-500" />
                  <span>{resumeData.basics.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-emerald-500" />
                  <span>{resumeData.basics.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Linkedin size={11} className="text-emerald-500" />
                  <a href={resumeData.basics.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    linkedin.com/in/mayunbodele
                  </a>
                </div>
              </div>
            </div>

            {/* Summary Segment */}
            <section className={aesthetic === "compact" ? "mb-3" : "mb-4.5"}>
              <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
              } ${aesthetic === "compact" ? "text-[10px] mb-1" : "text-[11px] mb-2"}`}>
                Professional Summary
              </h2>
              <p className={`text-justify ${
                isDarkCanvas ? "text-slate-300" : "text-slate-650"
              } ${aesthetic === "compact" ? "text-[10px] leading-normal" : "text-xs leading-relaxed"}`}>
                {highlightContentText(resumeData.basics.summary)}
              </p>
            </section>

            {/* Skills Grid Segment */}
            <section className={aesthetic === "compact" ? "mb-3" : "mb-5"}>
              <div className="flex justify-between items-center border-b pb-0.5 mb-1.5 border-slate-200 dark:border-slate-850">
                <h2 className={`font-black tracking-widest uppercase ${
                  isDarkCanvas ? "text-slate-300" : "text-slate-950"
                } ${aesthetic === "compact" ? "text-[10px]" : "text-[11px]"}`}>
                  Technical Skills Matrix
                </h2>
              </div>

              <div className={`space-y-1 ${aesthetic === "compact" ? "text-[9.5px]" : "text-[11px]"}`}>
                {resumeData.skills.map((grp, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-0.5 md:gap-4 items-start py-0.5 border-b last:border-0 border-slate-100/10 dark:border-[#14182a]">
                    <div className={`md:col-span-3 font-bold ${
                      isDarkCanvas ? "text-slate-400" : "text-slate-900"
                    }`}>
                      {grp.category}:
                    </div>
                    <div className="md:col-span-9 flex flex-wrap gap-1">
                      {grp.items.map((item, ii) => {
                        const isActive = selectedSkills.includes(item);
                        return (
                          <button
                            key={ii}
                            onClick={() => handleToggleSkill(item)}
                            className={`px-1 rounded text-[8px] font-mono font-semibold border transition-all duration-150 cursor-pointer ${
                              isActive
                                ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                                : isDarkCanvas
                                  ? "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-400"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-650 hover:bg-slate-100"
                            }`}
                          >
                            {isActive && <Check size={7} className="inline mr-0.5 text-white" />}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Adaptive Placement Section */}
            {focus === "academic" ? (
              <div className="space-y-4">
                <section>
                  <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                    isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                  } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2.5"}`}>
                    Academic Chronology (Priority Placement)
                  </h2>
                  <div className="space-y-2">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-900 dark:text-slate-200">
                          <h4 className="text-[11px]">{edu.institution}</h4>
                          <span className="text-slate-500 text-[9px] font-mono">{edu.dates}</span>
                        </div>
                        <div className="text-slate-500 text-[10.5px] leading-tight mt-0.5 flex justify-between">
                          <span>{edu.degree} {edu.major ? `in ${edu.major}` : ""}</span>
                          {edu.gpa && (
                            <span className="font-extrabold text-emerald-500 font-mono text-[10px]">GPA: {edu.gpa}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                    isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-900 border-emerald-600"
                  } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2"}`}>
                    Industry Certifications
                  </h2>
                  <div className="flex flex-wrap gap-1 text-xs">
                    {resumeData.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className={`px-1.5 py-0.5 rounded border font-mono text-[8.5px] ${
                          isDarkCanvas 
                            ? "bg-slate-900 border-slate-800 text-slate-400"
                            : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        • {cert}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <section className="transition-all duration-300">
                <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                  isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2.5"}`}>
                  Featured Professional Experience
                </h2>

                <div className="space-y-3.5">
                  {adaptExperiences.filter(e => e.id === "wrth" || e.id === "lowes").map((exp) => (
                    <div key={exp.id} className="transition-all duration-300">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h3 className="text-[11px] sm:text-xs font-black text-slate-950 dark:text-slate-100">
                          {exp.company} <span className="text-slate-400 font-normal">|</span> <span className="text-emerald-500 font-bold">{exp.role}</span>
                        </h3>

                        <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold">
                          {exp.matchedCount > 0 && (
                            <span className="px-1 py-0.2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded font-mono text-[8px]">
                              {exp.matchedCount} traces
                            </span>
                          )}
                          <span>{exp.dates}</span>
                        </div>
                      </div>

                      <ul className={`list-disc pl-4 space-y-0.5 text-justify ${
                        isDarkCanvas ? "text-slate-300" : "text-slate-650"
                      } ${aesthetic === "compact" ? "text-[9.5px]" : "text-[10.5px]"}`}>
                        {exp.bullets.map((bullet, idx) => {
                          const containsMatched = activeTraceKeywords.length > 0 && activeTraceKeywords.some(key => bullet.toLowerCase().includes(key));
                          return (
                            <li
                              key={idx}
                              className={`transition-all duration-150 ${
                                containsMatched 
                                  ? (isDarkCanvas 
                                      ? "text-emerald-300 pl-1 border-l border-emerald-500 font-medium bg-emerald-500/5 py-0.1 rounded" 
                                      : "text-emerald-950 pl-1 border-l-2 border-emerald-600 font-semibold bg-emerald-50/50 py-0.1 rounded")
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
            )}
          </div>

          {/* Page Footer */}
          <div className={`mt-4 pt-1 border-t text-[8px] uppercase font-mono tracking-wider flex justify-between items-center ${
            isDarkCanvas ? "border-slate-900 text-slate-600" : "border-slate-150 text-slate-400"
          }`}>
            <span>Mayun Bodele — Product Management leader</span>
            <span className="font-extrabold text-indigo-400 font-mono">Page 1/3</span>
          </div>
        </div>
      )}

      {/* ====== PAGE 2 CONTROLLER/CONTAINER ====== */}
      {(activePage === "all" || activePage === 2) && (
        <div
          className={`w-full max-w-4xl transition-all duration-300 origin-top shadow-2xl rounded-xl border relative flex flex-col justify-between ${
            isDarkCanvas
              ? "bg-slate-950 border-slate-900 text-slate-100 shadow-emerald-950/5"
              : "bg-white border-slate-200 text-slate-800 shadow-slate-900/10"
          } ${
            aesthetic === "compact" 
              ? "p-6 md:p-10 leading-snug min-h-[960px]" 
              : "p-8 md:p-14 leading-relaxed min-h-[1080px]"
          } print:min-h-0 print:max-h-none print:border-none print:shadow-none print:m-0 print:p-0 print:break-before-page break-before-page page-break`}
        >
          <div>
            <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
              isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
            } ${aesthetic === "compact" ? "text-[10px] mb-2" : "text-[11px] mb-3.5"}`}>
              Professional Experience (Continued Segment)
            </h2>

            <div className="space-y-4">
              {focus === "academic" ? (
                /* Academic focuses WRTH + Lowe's + Attribute on Page 2 */
                adaptExperiences.filter(e => e.id === "wrth" || e.id === "lowes" || e.id === "attribute").map((exp) => {
                  return (
                    <div key={exp.id} className="transition-all duration-200">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h3 className="text-[11px] sm:text-xs font-black text-slate-950 dark:text-slate-100">
                          {exp.company} <span className="text-slate-400 font-normal">|</span> <span className="text-emerald-500 font-bold">{exp.role}</span>
                        </h3>
                        <span className="text-[9.5px] font-semibold text-slate-500">{exp.dates}</span>
                      </div>

                      <ul className={`list-disc pl-4 space-y-1 text-justify ${
                        isDarkCanvas ? "text-slate-300" : "text-slate-650"
                      } ${aesthetic === "compact" ? "text-[9.5px]" : "text-[10.5px]"}`}>
                        {exp.bullets.map((bullet, idx) => {
                          const containsMatched = activeTraceKeywords.length > 0 && activeTraceKeywords.some(key => bullet.toLowerCase().includes(key));
                          return (
                            <li
                              key={idx}
                              className={containsMatched ? "text-emerald-400 dark:text-emerald-300 font-semibold" : ""}
                            >
                              {highlightContentText(bullet)}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
              ) : (
                /* Default places remaining roles: Attribute Analytics & K Pranali */
                adaptExperiences.filter(e => e.id !== "wrth" && e.id !== "lowes").map((exp) => {
                  return (
                    <div
                      key={exp.id}
                      className={`transition-all duration-300 ${
                        !exp.emphasis && focus !== "all"
                          ? "opacity-60 border-l border-dashed pl-3 border-slate-700/60"
                          : "opacity-100 pl-0"
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h3 className="text-[11px] sm:text-xs font-black text-slate-950 dark:text-slate-100">
                          {exp.company} <span className="text-slate-400 font-normal">|</span> <span className="text-emerald-500 font-bold">{exp.role}</span>
                        </h3>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold">
                          <span className="px-1 py-0.2 bg-slate-500/10 rounded tracking-wider uppercase text-[8px]">
                            {exp.badgeLabel}
                          </span>
                          <span>{exp.dates}</span>
                        </div>
                      </div>

                      <ul className={`list-disc pl-4 space-y-0.5 text-justify ${
                        isDarkCanvas ? "text-slate-300" : "text-slate-650"
                      } ${aesthetic === "compact" ? "text-[9.5px]" : "text-[10.5px]"}`}>
                        {exp.bullets.map((bullet, idx) => {
                          const containsMatched = activeTraceKeywords.length > 0 && activeTraceKeywords.some(key => bullet.toLowerCase().includes(key));
                          return (
                            <li
                              key={idx}
                              className={`transition-all duration-150 ${
                                containsMatched 
                                  ? (isDarkCanvas 
                                      ? "text-emerald-300 pl-1 border-l border-emerald-500 font-medium bg-emerald-500/5 py-0.1" 
                                      : "text-emerald-950 pl-1 border-l-2 border-emerald-600 font-semibold bg-emerald-50/50 py-0.1")
                                  : ""
                              }`}
                            >
                              {highlightContentText(bullet)}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Page Footer */}
          <div className={`mt-4 pt-1 border-t text-[8px] uppercase font-mono tracking-wider flex justify-between items-center ${
            isDarkCanvas ? "border-slate-900 text-slate-600" : "border-slate-150 text-slate-400"
          }`}>
            <span>Mayun Bodele — Product Management Leader</span>
            <span className="font-extrabold text-indigo-400 font-mono">Page 2/3</span>
          </div>
        </div>
      )}

      {/* ====== PAGE 3 CONTROLLER/CONTAINER ====== */}
      {(activePage === "all" || activePage === 3) && (
        <div
          className={`w-full max-w-4xl transition-all duration-300 origin-top shadow-2xl rounded-xl border relative flex flex-col justify-between ${
            isDarkCanvas
              ? "bg-slate-950 border-slate-900 text-slate-100 shadow-emerald-950/5"
              : "bg-white border-slate-200 text-slate-800 shadow-slate-900/10"
          } ${
            aesthetic === "compact" 
              ? "p-6 md:p-10 leading-snug min-h-[960px]" 
              : "p-8 md:p-14 leading-relaxed min-h-[1080px]"
          } print:min-h-0 print:max-h-none print:border-none print:shadow-none print:m-0 print:p-0 print:break-before-page break-before-page page-break`}
        >
          <div>
            {/* Spotlights (Experience continuation for Academic focus) */}
            {focus === "academic" && (
              <div className="space-y-3 mb-4">
                <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                  isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2.5"}`}>
                  Supporting Professional Context (Academic Focus)
                </h2>
                {adaptExperiences.filter(e => e.id === "kpranali").map((exp) => (
                  <div key={exp.id} className="opacity-75 pl-3 border-l border-slate-700/50">
                    <div className="flex justify-between items-baseline font-bold text-[11px] sm:text-xs">
                      <h4 className={isDarkCanvas ? "text-slate-200" : "text-slate-900"}>{exp.company} - <span className="text-emerald-500">{exp.role}</span></h4>
                      <span className="text-slate-500 text-[8.5px] font-mono">{exp.dates}</span>
                    </div>
                    <ul className="list-disc pl-4 text-[10px] text-slate-400 space-y-0.5 mt-0.5">
                      {exp.bullets.slice(0, 3).map((b, bi) => (
                        <li key={bi}>{highlightContentText(b)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Spotlight Projects Block */}
            <section className={aesthetic === "compact" ? "mb-3" : "mb-4.5"}>
              <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
              } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2.5"}`}>
                Digital Products & AI Projects Spotlight
              </h2>
              <div className="space-y-3">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="group border-l border-emerald-600 pl-3">
                    <div className="flex flex-wrap justify-between items-baseline gap-1 mb-0.5">
                      <h4 className={`text-[11px] md:text-xs font-bold ${
                        isDarkCanvas ? "text-slate-200" : "text-slate-950"
                      }`}>
                        {proj.title}
                      </h4>
                      <div className="flex flex-wrap gap-1 font-sans">
                        {proj.stack.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-slate-500/10 text-[8px] px-1 py-0.1 rounded font-mono text-slate-400 border border-slate-800/10 dark:border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className={`list-disc pl-4 text-xs ${
                      isDarkCanvas ? "text-slate-400" : "text-slate-655"
                    } ${aesthetic === "compact" ? "text-[9.5px]" : "text-[10.5px]"}`}>
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

            {/* Standard Placement of Academic/Edu/Cert if focus is default */}
            {focus !== "academic" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1.5 w-full text-left">
                {/* Education Block */}
                <section>
                  <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                    isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                  } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2.5"}`}>
                    Education Chronology
                  </h2>
                  <div className="space-y-2.5">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-950 dark:text-slate-100">
                          <h4 className="leading-tight text-[11px] text-left">{edu.institution}</h4>
                          <span className="text-slate-500 font-semibold text-[8.5px] font-mono shrink-0 ml-2">{edu.dates}</span>
                        </div>
                        <div className={`text-[10px] leading-tight mt-0.5 flex justify-between ${
                          isDarkCanvas ? "text-slate-400" : "text-slate-500"
                        }`}>
                          <span>{edu.degree} {edu.major ? `in ${edu.major}` : ""}</span>
                          {edu.gpa && (
                            <span className="font-extrabold text-emerald-500 font-mono text-[9px] shrink-0">GPA: {edu.gpa}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Certifications and Additional Languages */}
                <section>
                  <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                    isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                  } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2.5"}`}>
                    Certifications & Skills
                  </h2>
                  <div className="space-y-2.5 text-xs text-left">
                    <div className={`space-y-1 font-medium ${
                      isDarkCanvas ? "text-slate-300" : "text-slate-650"
                    }`}>
                      {resumeData.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                          <span className="text-[9.5px] font-mono leading-tight">{cert}</span>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t pt-1.5 mt-1.5 ${
                      isDarkCanvas ? "border-slate-800/80" : "border-slate-100"
                    }`}>
                      <h4 className={`font-bold uppercase tracking-wider text-[8.5px] mb-0.5 ${
                        isDarkCanvas ? "text-slate-400" : "text-slate-700"
                      }`}>
                        Languages & Competencies
                      </h4>
                      <div className="flex flex-wrap gap-1 text-[9px]">
                        {resumeData.basics.languages.map((lng, idx) => (
                          <span
                            key={idx}
                            className={`px-1 rounded border text-[8.5px] ${
                              isDarkCanvas 
                                ? "bg-slate-900 border-slate-850 text-slate-300"
                                : "bg-slate-100 border-slate-200 text-slate-850"
                            }`}
                          >
                            {lng.name} ({lng.level})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* Double column references or language matrix for Academic focus on Page 3 */
              <section className="w-full text-left">
                <h2 className={`font-black tracking-widest uppercase border-b pb-0.5 ${
                  isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
                } ${aesthetic === "compact" ? "text-[10px] mb-1.5" : "text-[11px] mb-2.5"}`}>
                  Additional Capabilities & Languages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs font-semibold">
                  <div className={`space-y-0.5 ${isDarkCanvas ? "text-slate-400" : "text-slate-655"}`}>
                    <p>• Languages: English (Professional), Hindi (Bilingual), French (Elementary)</p>
                    <p>• Quantitative backlogs tracking, relational PostgreSQL queries setup.</p>
                  </div>
                  <div className={`space-y-0.5 ${isDarkCanvas ? "text-slate-400" : "text-slate-655"}`}>
                    <p>• Technical Specifications writing, APIs Contracts verification, agile mappings.</p>
                    <p>• Agile Backlogs velocity monitoring, post-release defect mitigations.</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Page Footer */}
          <div className={`mt-4 pt-1 border-t text-[8px] uppercase font-mono tracking-wider flex justify-between items-center ${
            isDarkCanvas ? "border-slate-900 text-slate-600" : "border-slate-150 text-slate-400"
          }`}>
            <span>Mayun Bodele — Product Management Leader</span>
            <span className="font-extrabold text-indigo-400 font-mono">Page 3/3</span>
          </div>
        </div>
      )}
    </div>
  );
}
