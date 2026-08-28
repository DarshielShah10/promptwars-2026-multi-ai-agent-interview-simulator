import React from 'react';
import { motion } from 'motion/react';

interface BackgroundAnimationProps {
  activeStage: 'profile' | 'independent' | 'debate' | 'decision' | 'comparison';
  activeCandidate: 'candidate_a' | 'candidate_b' | 'custom' | 'compare';
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  activeStage,
  activeCandidate,
}) => {
  // Determine dynamic background styling and orb colors based on current context
  const getThemeConfig = () => {
    if (activeStage === 'comparison' || activeCandidate === 'compare') {
      return {
        bg: 'bg-gradient-to-b from-[#f5f3ff] via-[#f8fafc] to-[#ecfdf5]',
        gridColor: 'rgba(99, 102, 241, 0.07)',
        orb1: 'from-violet-400/35 via-indigo-300/25 to-transparent',
        orb2: 'from-emerald-400/30 via-teal-200/20 to-transparent',
        orb3: 'from-amber-300/25 via-yellow-100/20 to-transparent',
        orb4: 'from-indigo-300/20 via-purple-100/15 to-transparent',
        particles: ['bg-violet-500', 'bg-emerald-500', 'bg-amber-400', 'bg-indigo-500', 'bg-teal-400']
      };
    }

    if (activeStage === 'decision') {
      if (activeCandidate === 'candidate_b') {
        // Celebratory HIRE state for Ananya
        return {
          bg: 'bg-gradient-to-b from-[#f0fdf4] via-[#f8fafc] to-[#ecfdf5]',
          gridColor: 'rgba(16, 185, 129, 0.08)',
          orb1: 'from-emerald-400/40 via-teal-300/25 to-transparent',
          orb2: 'from-emerald-300/35 via-green-200/20 to-transparent',
          orb3: 'from-amber-300/30 via-emerald-100/20 to-transparent',
          orb4: 'from-teal-300/25 via-cyan-100/15 to-transparent',
          particles: ['bg-emerald-500', 'bg-emerald-400', 'bg-teal-500', 'bg-amber-400', 'bg-green-500']
        };
      } else {
        // High caution NO_HIRE state for Rohan
        return {
          bg: 'bg-gradient-to-b from-[#fff1f2] via-[#f8fafc] to-[#fff7ed]',
          gridColor: 'rgba(244, 63, 94, 0.07)',
          orb1: 'from-rose-400/30 via-amber-300/20 to-transparent',
          orb2: 'from-rose-300/25 via-red-200/15 to-transparent',
          orb3: 'from-amber-300/25 via-orange-100/20 to-transparent',
          orb4: 'from-slate-300/20 via-rose-100/15 to-transparent',
          particles: ['bg-rose-500', 'bg-rose-400', 'bg-amber-500', 'bg-red-400', 'bg-slate-400']
        };
      }
    }

    if (activeStage === 'debate') {
      // High-energy dueling debate arena
      return {
        bg: 'bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-[#ede9fe]',
        gridColor: 'rgba(139, 92, 246, 0.08)',
        orb1: 'from-indigo-400/35 via-violet-300/25 to-transparent',
        orb2: 'from-amber-400/30 via-rose-300/20 to-transparent',
        orb3: 'from-purple-400/25 via-blue-200/20 to-transparent',
        orb4: 'from-rose-300/20 via-indigo-100/15 to-transparent',
        particles: ['bg-indigo-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500', 'bg-blue-500']
      };
    }

    if (activeStage === 'independent') {
      // 4-persona multi-spectrum harmony
      return {
        bg: 'bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc]',
        gridColor: 'rgba(59, 130, 246, 0.07)',
        orb1: 'from-blue-400/30 via-indigo-200/20 to-transparent',
        orb2: 'from-emerald-400/30 via-teal-200/20 to-transparent',
        orb3: 'from-amber-400/25 via-yellow-100/20 to-transparent',
        orb4: 'from-rose-400/25 via-rose-100/15 to-transparent',
        particles: ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500']
      };
    }

    // Default: 'profile' / claims stage (Analytical deep cyan & steel blue)
    return {
      bg: 'bg-gradient-to-b from-[#f0fdfa] via-[#f8fafc] to-[#f0f9ff]',
      gridColor: 'rgba(14, 165, 233, 0.07)',
      orb1: 'from-cyan-400/30 via-sky-300/20 to-transparent',
      orb2: 'from-blue-400/25 via-indigo-200/20 to-transparent',
      orb3: 'from-teal-300/25 via-emerald-100/20 to-transparent',
      orb4: 'from-sky-300/20 via-cyan-100/15 to-transparent',
      particles: ['bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-teal-500', 'bg-indigo-500']
    };
  };

  const theme = getThemeConfig();

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-colors duration-700 ${theme.bg}`}>
      {/* Dynamic Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.55] transition-opacity duration-700"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme.gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px'
        }}
      />

      {/* Floating Ambient Glowing Gradient Orbs */}
      <motion.div
        key={`orb1-${activeStage}-${activeCandidate}`}
        animate={{
          x: [0, 45, -35, 0],
          y: [0, -55, 25, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.4, 0.65, 0.4]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-gradient-to-br ${theme.orb1} blur-3xl`}
      />

      <motion.div
        key={`orb2-${activeStage}-${activeCandidate}`}
        animate={{
          x: [0, -60, 45, 0],
          y: [0, 45, -35, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.35, 0.6, 0.35]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
        className={`absolute top-1/4 -right-32 w-[560px] h-[560px] rounded-full bg-gradient-to-bl ${theme.orb2} blur-3xl`}
      />

      <motion.div
        key={`orb3-${activeStage}-${activeCandidate}`}
        animate={{
          x: [0, 50, -45, 0],
          y: [0, -45, 35, 0],
          scale: [0.95, 1.18, 1, 0.95],
          opacity: [0.3, 0.55, 0.3]
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3
        }}
        className={`absolute -bottom-32 left-1/4 w-[620px] h-[620px] rounded-full bg-gradient-to-tr ${theme.orb3} blur-3xl`}
      />

      <motion.div
        key={`orb4-${activeStage}-${activeCandidate}`}
        animate={{
          x: [0, -35, 35, 0],
          y: [0, 35, -55, 0],
          scale: [1, 1.12, 0.95, 1],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        className={`absolute top-2/3 right-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-r ${theme.orb4} blur-3xl`}
      />

      {/* Deliberation Signal Pulse / Agent Network Graph Motif */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-45" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Dynamic Curved Agent Deliberation Flow Beams */}
        <motion.path
          d="M -100 150 C 300 280, 600 50, 1200 220 S 1800 120, 2200 300"
          fill="none"
          stroke="url(#lineGrad1)"
          strokeWidth="1.5"
          strokeDasharray="8 8"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />

        <motion.path
          d="M -100 450 C 400 320, 800 600, 1300 400 S 1900 550, 2200 380"
          fill="none"
          stroke="url(#lineGrad2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [-100, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'linear' }}
        />

        <motion.path
          d="M -50 750 C 350 620, 750 820, 1250 680 S 1750 780, 2200 650"
          fill="none"
          stroke="url(#lineGrad1)"
          strokeWidth="1"
          strokeDasharray="10 10"
          animate={{ strokeDashoffset: [0, -120] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Dynamic Floating Micro-Nodes */}
      <div className="absolute inset-0">
        {[
          { top: '14%', left: '7%', color: theme.particles[0] || 'bg-indigo-500', size: 'w-2 h-2', duration: 3.8, delay: 0 },
          { top: '26%', left: '89%', color: theme.particles[1] || 'bg-blue-500', size: 'w-2.5 h-2.5', duration: 4.8, delay: 0.8 },
          { top: '63%', left: '6%', color: theme.particles[2] || 'bg-emerald-500', size: 'w-2 h-2', duration: 4.2, delay: 1.6 },
          { top: '76%', left: '91%', color: theme.particles[3] || 'bg-amber-500', size: 'w-2 h-2', duration: 5.5, delay: 0.4 },
          { top: '44%', left: '93%', color: theme.particles[4] || 'bg-purple-500', size: 'w-1.5 h-1.5', duration: 3.5, delay: 1.2 },
          { top: '84%', left: '19%', color: theme.particles[0] || 'bg-indigo-400', size: 'w-2 h-2', duration: 4.9, delay: 2.0 },
          { top: '19%', left: '41%', color: theme.particles[1] || 'bg-rose-400', size: 'w-1.5 h-1.5', duration: 4.0, delay: 2.7 },
          { top: '69%', left: '54%', color: theme.particles[2] || 'bg-teal-400', size: 'w-2 h-2', duration: 4.5, delay: 1.5 }
        ].map((node, i) => (
          <motion.div
            key={`${i}-${activeStage}-${activeCandidate}`}
            style={{ top: node.top, left: node.left }}
            animate={{
              y: [0, -16, 0],
              opacity: [0.25, 0.85, 0.25],
              scale: [0.85, 1.3, 0.85]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay
            }}
            className={`absolute ${node.size} ${node.color} rounded-full shadow-md`}
          />
        ))}
      </div>

      {/* Subtle Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,transparent_40%,rgba(241,245,249,0.5)_100%)]" />
    </div>
  );
};
