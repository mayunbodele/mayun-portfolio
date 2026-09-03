/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Sun,
  Moon,
  Menu,
  X,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Globe,
  Sparkles,
  BookOpen,
  ArrowDown
} from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import SplashScreen from "./components/SplashScreen";
import PrintableResume from "./components/PrintableResume";
import { resumeData } from "./data/resumeData";

const getThemeColor = (idx: number) => {
  const thematicColors = [
    {
      // Index 0: Emerald (Lowe's HomeCare+, Users)
      glow: "#10b981", 
      text: "text-emerald-400", 
      textGradient: "from-emerald-400 to-teal-400",
      lightText: "text-emerald-600",
      lightTextGradient: "from-emerald-600 to-teal-600",
      bgLight: "bg-emerald-50/80",
      bgLightText: "text-emerald-700",
      bgDark: "bg-emerald-950/20",
      bgDarkText: "text-emerald-400",
      borderHover: "hover:border-emerald-500/50",
      borderHoverLight: "hover:border-emerald-300",
      glowBg: "bg-emerald-500/5",
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
      pulseColor: "shadow-emerald-500/20",
    },
    {
      // Index 1: Blue/Indigo (UAT Rest API metrics)
      glow: "#6366f1",
      text: "text-indigo-400",
      textGradient: "from-indigo-400 to-blue-400",
      lightText: "text-indigo-600",
      lightTextGradient: "from-indigo-600 to-blue-600",
      bgLight: "bg-indigo-50/80",
      bgLightText: "text-indigo-700",
      bgDark: "bg-indigo-950/20",
      bgDarkText: "text-indigo-400",
      borderHover: "hover:border-indigo-500/50",
      borderHoverLight: "hover:border-indigo-300",
      glowBg: "bg-indigo-500/5",
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-500/10",
      pulseColor: "shadow-indigo-500/20",
    },
    {
      // Index 2: Amber (User Engagement / Transactions platform)
      glow: "#f59e0b",
      text: "text-amber-400",
      textGradient: "from-amber-400 to-orange-400",
      lightText: "text-amber-600",
      lightTextGradient: "from-amber-600 to-orange-600",
      bgLight: "bg-amber-50/80",
      bgLightText: "text-amber-700",
      bgDark: "bg-amber-950/20",
      bgDarkText: "text-amber-400",
      borderHover: "hover:border-amber-500/50",
      borderHoverLight: "hover:border-amber-300",
      glowBg: "bg-amber-500/5",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/10",
      pulseColor: "shadow-amber-500/20",
    },
    {
      // Index 3: Cyan/Turquoise (Workflow efficiency onboardings)
      glow: "#06b6d4",
      text: "text-cyan-400",
      textGradient: "from-cyan-400 to-teal-400",
      lightText: "text-cyan-600",
      lightTextGradient: "from-cyan-600 to-teal-600",
      bgLight: "bg-cyan-50/80",
      bgLightText: "text-cyan-700",
      bgDark: "bg-cyan-950/20",
      bgDarkText: "text-cyan-400",
      borderHover: "hover:border-cyan-500/50",
      borderHoverLight: "hover:border-cyan-300",
      glowBg: "bg-cyan-500/5",
      iconColor: "text-cyan-500",
      iconBg: "bg-cyan-500/10",
      pulseColor: "shadow-cyan-500/20",
    },
    {
      // Index 4: Teal (PostgreSQL analysis/Feature Adoption)
      glow: "#14b8a6",
      text: "text-teal-400",
      textGradient: "from-teal-400 to-emerald-400",
      lightText: "text-teal-600",
      lightTextGradient: "from-teal-600 to-emerald-600",
      bgLight: "bg-teal-50/80",
      bgLightText: "text-teal-700",
      bgDark: "bg-teal-950/20",
      bgDarkText: "text-teal-400",
      borderHover: "hover:border-teal-500/50",
      borderHoverLight: "hover:border-teal-300",
      glowBg: "bg-teal-500/5",
      iconColor: "text-teal-500",
      iconBg: "bg-teal-500/10",
      pulseColor: "shadow-teal-500/20",
    },
    {
      // Index 5: Violet (AI-driven workflow optimization)
      glow: "#8b5cf6",
      text: "text-violet-400",
      textGradient: "from-violet-400 to-purple-400",
      lightText: "text-violet-600",
      lightTextGradient: "from-violet-600 to-purple-600",
      bgLight: "bg-violet-50/80",
      bgLightText: "text-violet-700",
      bgDark: "bg-violet-950/20",
      bgDarkText: "text-violet-400",
      borderHover: "hover:border-violet-500/50",
      borderHoverLight: "hover:border-violet-300",
      glowBg: "bg-violet-500/5",
      iconColor: "text-violet-500",
      iconBg: "bg-violet-500/10",
      pulseColor: "shadow-violet-500/20",
    }
  ];
  return thematicColors[idx % thematicColors.length];
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showPrintable, setShowPrintable] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [expandedExperience, setExpandedExperience] = useState<Record<string, boolean>>({
    wrth: true,
    lowes: true,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollbarPercentage, setScrollbarPercentage] = useState(0);

  // References for scroll spy
  const sectionRefs = {
    home: useRef<HTMLElement | null>(null),
    impact: useRef<HTMLElement | null>(null),
    experience: useRef<HTMLElement | null>(null),
    achievements: useRef<HTMLElement | null>(null),
    skills: useRef<HTMLElement | null>(null),
    education: useRef<HTMLElement | null>(null),
  };

  // Keep track of scroll progression & scroll spy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Scroll percentage calculation
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollbarPercentage(scrollPercent);

      // 2. Active section detection (Scroll Spy)
      const scrollPos = scrollTop + 150;
      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: keyof typeof sectionRefs) => {
    const ref = sectionRefs[id];
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 85,
        behavior: "smooth"
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  // Experience accordion toggle
  const toggleExperience = (id: string) => {
    setExpandedExperience((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Top list for quick impact
  const topImpactMetrics = [
    { value: "0-to-1", label: "Physical Stores Line Founded", sub: "7+ PRDs across POS, payments & inventory" },
    { value: "500K+", label: "Digital Users (Homecare+)", sub: "Seamless omnichannel scale at Lowe's" },
    { value: "35%", label: "Post-Release Defect Drop", sub: "140+ REST API microservices UAT test cases" },
  ];

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (showPrintable) {
    return <PrintableResume onClose={() => setShowPrintable(false)} isDark={isDark} />;
  }

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-700 select-none overflow-x-hidden ${isDark ? "text-slate-100 bg-[#090b19]" : "text-slate-800 bg-[#f8fafc]"}`}>
      
      {/* Dynamic Animated Background */}
      <AnimatedBackground isDark={isDark} />

      {/* Top sticky scroll-bar loader */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-100"
          style={{ width: `${scrollbarPercentage}%` }}
        />
      </div>

      {/* Primary Floating Header (Glassmorphic) */}
      <header className={`fixed top-4 left-4 right-4 h-16 rounded-2xl z-40 backdrop-blur-md border transition-all duration-300 ${
        isDark 
          ? "bg-slate-900/40 border-slate-800/60 shadow-emerald-950/20 shadow-xl" 
          : "bg-white/40 border-slate-200/60 shadow-slate-200/30 shadow-lg"
      }`}>
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          
          {/* Brand Monogram */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-all">
              MB
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight block">Mayun Bodele</span>
              <span className="font-mono text-[9px] text-emerald-500 font-bold uppercase tracking-wider block">Product Manager</span>
            </div>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: "home", label: "Intro" },
              { id: "impact", label: "Impact Spotlight" },
              { id: "experience", label: "Experience" },
              { id: "achievements", label: "Wins & Metrics" },
              { id: "skills", label: "Skills Radar" },
              { id: "education", label: "Credentials" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id as keyof typeof sectionRefs)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeSection === link.id
                    ? (isDark ? "bg-emerald-600/10 text-emerald-400 font-bold" : "bg-emerald-50 text-emerald-600 font-bold")
                    : "text-slate-400 hover:text-emerald-500"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activePill"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Settings Trigger: Dark/Light toggle + PDF Trigger */}
          <div className="flex items-center gap-3">
            {/* Quick Interactive PDF Print Action */}
            <button
              onClick={() => setShowPrintable(true)}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Sparkles size={12} className="text-emerald-100 animate-pulse" />
              Interactive CV
            </button>

            {/* Dark & Light Toggle Switch */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all active:scale-90 ${
                isDark 
                  ? "bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-700" 
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
              title="Toggle theme visualizer"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition-all ${
                isDark ? "bg-slate-800/60 border-slate-700/80 text-white" : "bg-slate-100 border-slate-200 text-slate-800"
              }`}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-4 right-4 p-5 rounded-2xl z-40 border shadow-2xl backdrop-blur-lg ${
              isDark ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200"
            } md:hidden`}
          >
            <div className="flex flex-col gap-2">
              {[
                { id: "home", label: "Intro" },
                { id: "impact", label: "Impact Spotlight" },
                { id: "experience", label: "Experience Portfolio" },
                { id: "achievements", label: "Wins & Metrics" },
                { id: "skills", label: "Skills Radar" },
                { id: "education", label: "Credentials" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id as keyof typeof sectionRefs)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === link.id
                      ? (isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600")
                      : "text-slate-400 hover:text-emerald-500"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-slate-800/60 my-2" />
              <button
                onClick={() => {
                  setShowPrintable(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-md cursor-pointer"
              >
                <Sparkles size={14} className="text-emerald-100 animate-pulse" />
                Launch Interactive CV Explorer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single Page Layout Container */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-40">

        {/* SECTION 1: HERO VIEWPORT */}
        <section 
          id="home"
          ref={sectionRefs.home}
          className="min-h-[75vh] flex flex-col justify-center items-start relative select-none"
        >
          {/* Subtle Cyber Grid Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-4xl space-y-6">
            
            {/* Tagline Accent Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono font-bold tracking-wider uppercase ${
                  isDark 
                    ? "bg-slate-900/60 border-slate-700/60 text-emerald-400" 
                    : "bg-emerald-50/80 border-emerald-100 text-emerald-600"
                }`}
              >
                <Sparkles size={12} className="animate-pulse" />
                <span>Latest Role: Founding Product Manager at WRTH</span>
              </motion.div>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono font-bold tracking-wider uppercase shadow-sm ${
                  isDark 
                    ? "bg-teal-950/40 border-teal-800/80 text-teal-300" 
                    : "bg-teal-50 border-teal-100 text-teal-700"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <Globe size={11} className="mr-0.5 shrink-0" />
                <span>Open for Relocation</span>
              </motion.div>
            </div>

            {/* Giant Display Name */}
            <motion.h1 
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none"
            >
              {resumeData.basics.name}
            </motion.h1>

            {/* Interactive Running Cyber-Title */}
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                {resumeData.basics.title}
              </span>
            </motion.h2>

            {/* Short High-Impact Summary Paragraph */}
            <motion.p 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`text-sm sm:text-base leading-relaxed text-justify md:max-w-3xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {resumeData.basics.summary}
            </motion.p>

            {/* Contacts Pill Drawer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-slate-400 font-semibold"
            >
              <div className="flex items-center gap-1.5">
                <Mail size={13} className="text-emerald-500" />
                <a href={`mailto:${resumeData.basics.email}`} className="hover:text-emerald-400 underline">{resumeData.basics.email}</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-500" />
                <span>{resumeData.basics.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-emerald-500" />
                <span>Chicago, IL / Charlotte, NC <span className={isDark ? "text-emerald-400 font-extrabold" : "text-emerald-600 font-extrabold"}>(Open for Relocation)</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Linkedin size={13} className="text-emerald-500" />
                <a href={resumeData.basics.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 underline">linkedin.com/in/mayunbodele</a>
              </div>
            </motion.div>

            {/* Beautiful CTA Grid */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={() => scrollToSection("experience")}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center gap-2 active:scale-95 transition-all"
              >
                <span>View Experience Portfolio</span>
                <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={() => setShowPrintable(true)}
                className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold border rounded-xl shadow-md transition-all active:scale-95 cursor-pointer ${
                  isDark 
                    ? "bg-slate-900/40 hover:bg-slate-800/80 border-slate-700/80 text-white" 
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <Sparkles size={14} className="text-emerald-400 animate-pulse" />
                <span>Launch Interactive CV Explorer</span>
              </button>
            </motion.div>

          </div>
        </section>


        {/* SECTION 2: TOP LEVEL ABOVE THE FOLD IMPACT STRIP */}
        <section 
          id="impact" 
          ref={sectionRefs.impact}
          className="scroll-mt-24"
        >
          <div className="space-y-10">
            <div className="flex flex-col items-start gap-2">
              <span className="font-mono text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase">
                // EXECUTIVE PERFORMANCE CHANNELS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                Top 3 Impact Spotlight
              </h2>
            </div>

            {/* Horizontal Impact Spotlight Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topImpactMetrics.map((itm, i) => {
                const col = getThemeColor(i);
                return (
                  <div 
                    key={i}
                    className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between h-48 sm:h-52 relative overflow-hidden transition-all duration-350 group ${
                      isDark
                        ? `bg-slate-900/30 border-slate-800/60 ${col.borderHover} shadow-md shadow-slate-950/20`
                        : `bg-white/80 border-slate-200/60 ${col.borderHoverLight} shadow-md shadow-slate-100`
                    }`}
                  >
                    {/* Subtle Background Accent Gradient Hoop */}
                    <div className={`absolute top-0 right-0 w-24 h-24 ${col.glowBg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                    
                    {/* Vector Ring Badge */}
                    <div className="flex justify-between items-start">
                      <div className={`w-10 h-10 rounded-xl ${col.iconBg} ${col.iconColor} flex items-center justify-center`}>
                        <Trophy size={18} />
                      </div>
                      <span className="font-mono text-slate-500 text-[10px] font-bold">MUTABLE BADGE 0{i + 1}</span>
                    </div>

                    {/* Main Metric digits */}
                    <div>
                      <span className={`text-4xl font-black bg-gradient-to-r ${isDark ? col.textGradient : col.lightTextGradient} bg-clip-text text-transparent block`}>
                        {itm.value}
                      </span>
                      <span className="font-bold text-sm tracking-wide block mt-1">
                        {itm.label}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium block mt-0.5 leading-tight">
                        {itm.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* SECTION 3: ACCORDION TIMELINE STORY PORTFOLIO */}
        <section 
          id="experience" 
          ref={sectionRefs.experience}
          className="scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Heading and Live Highlights Widget (Always sticky) */}
            <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-28 lg:h-fit">
              <div className="space-y-3">
                <span className="font-mono text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase">
                  // AGILITY TIMELINE PORTFOLIO
                </span>
                <h2 className="text-3xl font-black tracking-tight leading-none">
                  Professional Experience
                </h2>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Click any role card in the accordion portfolio to expand its comprehensive operational metrics, user acceptance cases, compliance specs, and system-level integrations.
                </p>
              </div>

              {/* Impact Highlights Panel */}
              <div className={`p-6 rounded-2xl border ${
                isDark ? "bg-slate-900/30 border-slate-800/80" : "bg-white/80 border-slate-200/80 shadow-md shadow-slate-100"
              }`}>
                <h3 className="text-xs font-bold font-mono text-emerald-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <TrendingUp size={14} />
                  Auto-Analyzed Impact Highlights
                </h3>
                <div className="space-y-4">
                  {resumeData.experience.flatMap(e => e.highlights).map((hl, k) => (
                    <div key={k} className="flex items-start gap-2.5">
                      <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                      <p className="text-[11px] sm:text-xs leading-relaxed text-slate-400 font-medium">
                        {hl}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Accordion timeline container */}
            <div className="lg:col-span-2 space-y-4">
              {resumeData.experience.map((exp, idx) => {
                const isOpen = expandedExperience[exp.id];
                const col = getThemeColor(idx);
                return (
                  <div 
                    key={exp.id}
                    className={`rounded-2xl border transition-all duration-300 relative overflow-hidden select-none ${
                      isOpen 
                        ? (isDark ? `bg-slate-900/35 border-slate-700/80 shadow-xl` : `bg-white border-emerald-200 shadow-md`)
                        : (isDark ? `bg-slate-900/10 border-slate-800/60 ${col.borderHover}` : `bg-slate-50/50 border-slate-200/60 ${col.borderHoverLight}`)
                    }`}
                  >
                    
                    {/* Glowing Accent Bar for Active Card */}
                    {isOpen && (
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${isDark ? col.textGradient : col.lightTextGradient}`} />
                    )}

                    {/* Accordion Toggle Header */}
                    <button
                      onClick={() => toggleExperience(exp.id)}
                      className="w-full text-left p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                            isDark ? `bg-slate-800/80 ${col.text}` : `${col.bgLight} ${col.lightText}`
                          }`}>
                            {exp.company}
                          </span>
                          <span className="text-slate-400 text-xs font-semibold">{exp.location}</span>
                        </div>
                        <h4 className="text-lg font-extrabold tracking-tight">
                          {exp.role}
                        </h4>
                        <span className="font-mono text-[10px] text-slate-500 font-bold block">
                          {exp.dates}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                        {/* Quick Metrics display inside the header */}
                        <div className="flex items-center gap-1.5">
                          {exp.metrics.slice(0, 1).map((m, mI) => (
                            <div key={mI} className={`px-2.5 py-1 rounded-md border text-[10px] font-bold ${
                              isDark ? `border-slate-800/80 bg-slate-950/40 ${col.text}` : `border-slate-200 bg-slate-50 ${col.lightText}`
                            }`}>
                              {m.value} {m.label}
                            </div>
                          ))}
                        </div>

                        {/* Chevron Trigger */}
                        <div className={`p-1.5 rounded-lg border flex items-center justify-center transition-transform duration-300 ${
                          isDark ? "bg-slate-800/60 border-slate-700" : "bg-slate-50 border-slate-100 text-slate-500"
                        } ${isOpen ? "rotate-180" : "rotate-0"}`}>
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </button>

                    {/* Expandable Panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className={`p-6 pt-0 border-t pl-6 sm:pl-8 ${isDark ? "border-slate-800/60" : "border-slate-100"}`}>
                            
                            {/* Detailed Metrics Panel */}
                            {exp.metrics.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-6">
                                {exp.metrics.map((m, mIdx) => (
                                  <div 
                                    key={mIdx} 
                                    className={`p-3 rounded-xl border text-center ${
                                      isDark ? "bg-slate-950/20 border-slate-800/60" : "bg-slate-50 border-slate-100"
                                    }`}
                                  >
                                    <span className={`text-lg font-black ${isDark ? col.text : col.lightText} block`}>{m.value}</span>
                                    <span className="text-[10px] text-slate-400 font-bold block">{m.label}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Job Description list bullets */}
                            <div className="space-y-3 pt-2">
                              {exp.bullets.map((bullet, bIdx) => (
                                <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                                  <div className="mt-1.5 shrink-0 flex items-center justify-center">
                                    <CheckCircle2 size={13} className={`${isDark ? col.text : col.lightText} shrink-0`} />
                                  </div>
                                  <p className={isDark ? "text-slate-300" : "text-slate-600"}>
                                    {bullet}
                                  </p>
                                </div>
                              ))}
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* SECTION 4: TROPHY ACHIEVEMENTS EXPANSION */}
        <section 
          id="achievements" 
          ref={sectionRefs.achievements}
          className="scroll-mt-24 select-none"
        >
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase">
                  // THE TROPHY CASE
                </span>
                <h2 className="text-3xl font-black tracking-tight leading-none">
                  Measurable Achievements & Wins
                </h2>
              </div>
              <p className={`text-xs sm:text-sm font-semibold sm:max-w-md ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Hover over cards to see detailed spotlight overlays. These metrics highlight a systematic focus on quantitative improvements.
              </p>
            </div>

            {/* Structured Bento Trophy Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumeData.achievements.map((ach, idx) => {
                const col = getThemeColor(idx);
                return (
                  <div 
                    key={idx}
                    className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between min-h-[13rem] sm:min-h-[14rem] relative overflow-hidden transition-all duration-300 group hover:-translate-y-1.5 shadow-lg ${
                      isDark
                        ? `bg-slate-900/40 border-slate-800/80 ${col.borderHover} shadow-slate-950/20`
                        : `bg-white border-slate-200/80 ${col.borderHoverLight} shadow-slate-100`
                    }`}
                    style={{
                      boxShadow: isDark 
                        ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)"
                        : `0 10px 30px -10px ${col.glow}15`
                    }}
                  >
                    
                    {/* Glowing background spotlight hover effect */}
                    <div className="absolute -inset-px opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(ellipse 100% 100% at 50% 50%, ${col.glow}, transparent)`
                      }}
                    />

                    <div className="flex justify-between items-start">
                      {/* Badge Category */}
                      <span className={`font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        isDark ? `bg-slate-800/80 ${col.text}` : `${col.bgLight} ${col.lightText}`
                      }`}>
                        {ach.category} win
                      </span>
                      <Award size={18} className={isDark ? col.text : col.lightText} />
                    </div>

                    <div className="mt-4 space-y-1 relative z-10">
                      <span className={`text-4xl font-black bg-gradient-to-r ${isDark ? col.textGradient : col.lightTextGradient} bg-clip-text text-transparent block`}>
                        {ach.value}
                      </span>
                      <span className={`text-xs font-bold tracking-wide block uppercase font-mono ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                        {ach.metric}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-4 leading-relaxed relative z-10 font-medium line-clamp-2">
                      {ach.context}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* SECTION 5: SKILLS GROUP BENTO GRID */}
        <section 
          id="skills" 
          ref={sectionRefs.skills}
          className="scroll-mt-24 select-none"
        >
          <div className="space-y-12">
            <div className="flex flex-col items-start gap-2">
              <span className="font-mono text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase">
                // SYSTEM CORE SKILLS
              </span>
              <h2 className="text-3xl font-black tracking-tight leading-none">
                Grouped Skills Radar
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.skills.map((skillGroup, groupIdx) => (
                <div 
                  key={groupIdx}
                  className={`p-6 sm:p-8 rounded-2xl border ${
                    isDark 
                      ? "bg-slate-900/30 border-slate-800/80 hover:border-slate-700/80" 
                      : "bg-white border-slate-200 shadow-md shadow-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      {groupIdx === 0 ? <Briefcase size={16} /> : 
                       groupIdx === 1 ? <TrendingUp size={16} /> : 
                       groupIdx === 2 ? <Cpu size={16} /> : <Cpu size={14} />}
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight">
                      {skillGroup.category}
                    </h3>
                  </div>

                  {/* Responsive Skill Chips array */}
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, itemIdx) => (
                      <span 
                        key={itemIdx}
                        className={`text-xs font-medium px-3.5 py-1.5 rounded-xl border font-mono transition-all duration-300 ${
                          isDark
                            ? "bg-slate-950/40 border-slate-800/80 text-slate-300 hover:text-white hover:border-emerald-400"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* SECTION 6: EDUCATION, LANGUAGES & CERTIFICATIONS */}
        <section 
          id="education" 
          ref={sectionRefs.education}
          className="scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Col: Headings */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase">
                  // THE VERIFICATION LAYER
                </span>
                <h2 className="text-3xl font-black tracking-tight leading-none">
                  Education & Verification
                </h2>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  A comprehensive audit of academic degrees, certifications, and language competencies. Verified by official transcripts and certification keys.
                </p>
              </div>

              {/* Extra Block items */}
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDark ? "bg-slate-900/30 border-slate-800/80" : "bg-white/80 border-slate-200/80 shadow-md"
              }`}>
                <h4 className="text-xs font-bold font-mono text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                  <BookOpen size={14} />
                  Language Competence
                </h4>
                <div className="space-y-3.5 pt-1">
                  {resumeData.basics.languages.map((lng, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-extrabold">{lng.name}</span>
                      <span className="font-mono font-bold text-[10px] text-slate-400">{lng.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Education List and Certifications Grid */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Education section */}
              <div className="space-y-6">
                <h3 className="text-sm font-black font-mono text-slate-500 uppercase tracking-widest">
                  // Academic Timeline
                </h3>
                
                <div className="space-y-5">
                  {resumeData.education.map((edu, idx) => (
                    <div 
                      key={idx}
                      className={`p-6 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden group transition-all duration-300 ${
                        isDark 
                          ? "bg-slate-900/20 border-slate-800/80 hover:border-emerald-500/30" 
                          : "bg-white border-slate-200/80 hover:border-emerald-100 shadow-md shadow-slate-100"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded font-mono ${
                            isDark ? "bg-slate-800 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                          }`}>
                            {edu.dates}
                          </span>
                          <span className="text-slate-500 text-xs font-semibold">{edu.location}</span>
                        </div>
                        <h4 className="text-base font-extrabold tracking-tight text-slate-100 dark:text-emerald-100 group-hover:text-emerald-400 transition-colors">
                          {edu.institution}
                        </h4>
                        <p className="text-slate-400 text-xs font-semibold">
                          {edu.degree} {edu.major ? `• ${edu.major}` : ""}
                        </p>
                      </div>

                      {edu.gpa && (
                        <div className={`px-4 py-2 rounded-xl text-center shrink-0 border bg-slate-950/20 ${
                          isDark ? "border-slate-800" : "border-slate-100 bg-slate-50/50"
                        }`}>
                          <span className="text-xs text-slate-400 block font-bold font-mono">GPA</span>
                          <span className="text-sm font-black text-emerald-400 dark:text-emerald-400 text-emerald-600 block">{edu.gpa}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Row */}
              <div className="space-y-6">
                <h3 className="text-sm font-black font-mono text-slate-500 uppercase tracking-widest">
                  // Professional Certifications
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resumeData.certifications.map((cert, idx) => (
                    <div 
                      key={idx}
                      className={`p-5 rounded-2xl border flex items-center gap-3.5 transition-all duration-300 hover:scale-[1.01] ${
                        isDark 
                          ? "bg-slate-900/30 border-slate-800/80 hover:border-slate-700/80" 
                          : "bg-white border-slate-200/80 hover:border-emerald-100 shadow shadow-slate-100"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Award size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider block">ID #0{idx+1} CERTIFIED</span>
                        <span className="text-xs font-extrabold tracking-tight text-slate-200 dark:text-slate-100 block">
                          {cert}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Floating Bottom Nav Hub (Mobile ONLY - Touch optimized, >= 44px active hit targets) */}
      <footer className="fixed bottom-4 left-4 right-4 h-14 rounded-2xl z-40 block md:hidden bg-slate-900/80 border border-slate-800/80 backdrop-blur shadow-2xl overflow-hidden">
        <div className="grid grid-cols-5 h-full">
          {[
            { id: "home", label: "Intro", icon: Sparkles },
            { id: "impact", label: "Scope", icon: TrendingUp },
            { id: "experience", label: "Exp", icon: Briefcase },
            { id: "achievements", label: "Wins", icon: Trophy },
            { id: "skills", label: "Skills", icon: Cpu }
          ].map((itm) => {
            const IconComp = itm.icon;
            const isSel = activeSection === itm.id;
            return (
              <button
                key={itm.id}
                onClick={() => scrollToSection(itm.id as keyof typeof sectionRefs)}
                className="flex flex-col items-center justify-center h-full select-none"
              >
                <IconComp size={16} className={isSel ? "text-emerald-400 scale-110" : "text-slate-400"} />
                <span className={`text-[9px] font-bold tracking-tight uppercase mt-1 ${isSel ? "text-emerald-400 font-extrabold" : "text-slate-500"}`}>
                  {itm.label}
                </span>
              </button>
            );
          })}
        </div>
      </footer>

      {/* Humble minimal metadata footer */}
      <div className="border-t border-slate-800/60 pb-16 pt-8 text-center text-xs font-mono text-slate-500 mt-20">
        <p>Mayun Bodele Portfolio • Crafted in 2026</p>
        <p className="mt-1 text-[10px] text-slate-600">Dynamic system syncing with Cloud Run infrastructure</p>
      </div>

    </div>
  );
}
