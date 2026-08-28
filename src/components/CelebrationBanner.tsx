import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, Award, PartyPopper, CheckCircle2, ChevronRight } from 'lucide-react';
import { triggerHiringCelebration } from '../utils/confetti';

interface CelebrationBannerProps {
  candidateName: string;
  roleTitle: string;
  consensusScore: number;
  onTriggerConfetti?: () => void;
}

export const CelebrationBanner: React.FC<CelebrationBannerProps> = ({
  candidateName,
  roleTitle,
  consensusScore,
  onTriggerConfetti,
}) => {
  useEffect(() => {
    // Automatically launch confetti when this celebration banner mounts!
    const timer = setTimeout(() => {
      triggerHiringCelebration();
    }, 300);
    return () => clearTimeout(timer);
  }, [candidateName]);

  const handleCelebrate = () => {
    triggerHiringCelebration();
    if (onTriggerConfetti) onTriggerConfetti();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-5 sm:p-6 shadow-xl border-2 border-emerald-400/60"
    >
      {/* Background celebration glowing aura */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
        
        {/* Left Info */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0 ring-4 ring-white/20 animate-bounce">
            🎉
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-400/30 text-emerald-200 border border-emerald-400/50 shadow-xs">
                <Trophy className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                Hiring Complete • Candidate Eligible
              </span>
              <span className="text-xs font-bold text-emerald-200/90 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                Consensus Score: {consensusScore.toFixed(1)} / 10
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Offer Extended: {candidateName}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
              Passed multi-agent cross-examination with zero unverified claims and unanimous executive consensus for <strong className="text-white font-bold">{roleTitle}</strong>.
            </p>
          </div>
        </div>

        {/* Right Action Button */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
          <button
            onClick={handleCelebrate}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-amber-400/30 transition-all cursor-pointer ring-2 ring-white/30"
          >
            <PartyPopper className="h-4 w-4 text-slate-950" />
            <span>Celebrate Offer Confetti!</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};
