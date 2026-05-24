import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5s total splash duration
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 150);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#03070a] text-white select-none">
      <div className="relative flex flex-col items-center max-w-xs w-full px-6">
        {/* Animated Custom Monogram Logo */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          {/* Pulsing glow ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-emerald-500/30"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 blur-md pointer-events-none"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* SVG Initials Monogram (MB) with high contrast styling */}
          <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background hexagon/cage path */}
            <motion.polygon
              points="50,15 85,35 85,75 50,95 15,75 15,35"
              stroke="url(#monogramGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="300"
              initial={{ strokeDashoffset: 300 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Text logo */}
            <text
              x="50%"
              y="58%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              className="font-sans font-extrabold text-2xl tracking-[0.1em]"
            >
              MB
            </text>
            <defs>
              <linearGradient id="monogramGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Text descriptions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center"
        >
          <h2 className="font-sans font-bold text-lg tracking-wider text-slate-100 uppercase">
            Mayun Bodele
          </h2>
          <p className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase mt-1">
            Product Platform • Lowe's Co.
          </p>
        </motion.div>

        {/* Loading Progress Bar Container */}
        <div className="w-full h-1 bg-slate-800/60 rounded-full overflow-hidden mt-8 backdrop-blur-sm relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Percentage Counter */}
        <motion.span 
          className="font-mono text-xs text-emerald-300 mt-2 font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.floor(progress)}%
        </motion.span>
      </div>
    </div>
  );
}
