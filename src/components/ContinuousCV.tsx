import React from "react";
import { Mail, Phone, MapPin, Linkedin, Check } from "lucide-react";
import { resumeData } from "../data/resumeData";

interface ContinuousCVProps {
  isDarkCanvas: boolean;
  aesthetic: "detail" | "compact";
  focus: "all" | "pm" | "analyst" | "academic";
  selectedSkills: string[];
  activeTraceKeywords: string[];
  adaptExperiences: any[];
  handleToggleSkill: (skill: string) => void;
  highlightContentText: (text: string) => React.ReactNode;
}

export default function ContinuousCV({
  isDarkCanvas,
  aesthetic,
  focus,
  selectedSkills,
  activeTraceKeywords,
  adaptExperiences,
  handleToggleSkill,
  highlightContentText
}: ContinuousCVProps) {
  return (
    <div
      id="resume-printable-container"
      className={`w-full max-w-4xl transition-all duration-300 origin-top shadow-2xl rounded-xl text-justify border ${
        isDarkCanvas
          ? "bg-slate-950 border-slate-900 text-slate-100 shadow-emerald-950/5 p-6 md:p-12 mb-6"
          : "bg-white border-slate-200 text-slate-800 shadow-slate-900/10 p-6 md:p-12 mb-6"
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

      {/* Summary */}
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

      {/* Technical Skills Matrix */}
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
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-650 hover:bg-slate-100"
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

      {/* Academic focus rearrangement */}
      {focus === "academic" && (
        <div className="space-y-5">
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

      {/* Experience */}
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
              <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1.5 align-baseline">
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
                              ? "text-emerald-300 pl-1 border-l border-emerald-500 font-medium bg-emerald-500/5 py-0.5 rounded-r cursor-pointer" 
                              : "text-emerald-950 pl-1 border-l-2 border-emerald-600 font-semibold bg-emerald-50/50 py-0.5 rounded-r cursor-pointer")
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

      {/* Spotlight */}
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

      {/* Education representation */}
      {focus !== "academic" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 transition-all duration-300 w-full text-left">
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
                    <h4 className="text-left">{edu.institution}</h4>
                    <span className="text-slate-500 font-semibold text-[10px] font-mono shrink-0 ml-2">{edu.dates}</span>
                  </div>
                  <div className={`text-[11px] leading-tight mt-0.5 flex justify-between ${
                    isDarkCanvas ? "text-slate-400" : "text-slate-600"
                  }`}>
                    <span>{edu.degree} {edu.major ? `in ${edu.major}` : ""}</span>
                    {edu.gpa && (
                      <span className="font-extrabold text-emerald-500 font-mono dark:bg-emerald-500/10 dark:px-1.5 dark:py-0.2 rounded shrink-0">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={`font-black tracking-widest uppercase border-b pb-1 ${
              isDarkCanvas ? "text-slate-300 border-slate-800" : "text-slate-950 border-emerald-600"
            } ${aesthetic === "compact" ? "text-[11px] mb-1.5" : "text-xs mb-3"}`}>
              Certifications & Languages
            </h2>
            <div className="space-y-3 text-xs text-left">
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
                  Languages & Competencies
                </h4>
                <div className="flex flex-wrap gap-2 text-[10.5px]">
                  {resumeData.basics.languages.map((lng, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded border ${
                        isDarkCanvas 
                          ? "bg-slate-900 border-slate-800 text-slate-300"
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
      )}
    </div>
  );
}
