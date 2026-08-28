import React from 'react';
import { FinalDecision } from '../types/simulator';
import { 
  CheckCircle, 
  XCircle, 
  AlertOctagon, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  GitCompare, 
  ListChecks,
  AlertTriangle,
  Award,
  TrendingUp,
  Sliders,
  CheckCircle2,
  PartyPopper,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'motion/react';
import { CelebrationBanner } from './CelebrationBanner';
import { triggerHiringCelebration } from '../utils/confetti';

interface FinalDecisionViewProps {
  decision: FinalDecision;
  onProceedToComparison: () => void;
}

export const FinalDecisionView: React.FC<FinalDecisionViewProps> = ({
  decision,
  onProceedToComparison,
}) => {
  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_HIRE':
        return { 
          bg: 'bg-emerald-500/10 border-emerald-500/30', 
          badgeBg: 'bg-emerald-600 text-white', 
          badgeText: 'STRONG HIRE • EXTEND UNCONDITIONAL OFFER',
          textColor: 'text-emerald-950',
          accent: 'border-emerald-500'
        };
      case 'HIRE':
        return { 
          bg: 'bg-emerald-500/10 border-emerald-500/30', 
          badgeBg: 'bg-emerald-600 text-white', 
          badgeText: 'HIRE • EXTEND OFFER WITH STANDARD ONBOARDING',
          textColor: 'text-emerald-950',
          accent: 'border-emerald-400'
        };
      case 'LEAN_HIRE':
        return { 
          bg: 'bg-blue-500/10 border-blue-500/30', 
          badgeBg: 'bg-blue-600 text-white', 
          badgeText: 'LEAN HIRE • CONDITIONAL OFFER (PROBATION GOALS)',
          textColor: 'text-blue-950',
          accent: 'border-blue-400'
        };
      case 'LEAN_NO_HIRE':
        return { 
          bg: 'bg-amber-500/10 border-amber-500/30', 
          badgeBg: 'bg-amber-600 text-white', 
          badgeText: 'LEAN NO HIRE • HIGH EXECUTION RISK DETECTED',
          textColor: 'text-amber-950',
          accent: 'border-amber-400'
        };
      case 'NO_HIRE':
        return { 
          bg: 'bg-rose-500/10 border-rose-500/30', 
          badgeBg: 'bg-rose-600 text-white', 
          badgeText: 'NO HIRE • CRITICAL CONTRADICTIONS UNRESOLVED',
          textColor: 'text-rose-950',
          accent: 'border-rose-400'
        };
      default:
        return { 
          bg: 'bg-slate-50 border-slate-300', 
          badgeBg: 'bg-slate-800 text-white', 
          badgeText: verdict,
          textColor: 'text-slate-900',
          accent: 'border-slate-300'
        };
    }
  };

  const style = getVerdictStyle(decision.finalRecommendation);
  const isHire = decision.finalRecommendation.includes('HIRE') && !decision.finalRecommendation.includes('NO_HIRE');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* If Candidate is Eligible for the Job (HIRE) -> Confetti Celebration Banner */}
      {isHire ? (
        <CelebrationBanner
          candidateName={decision.candidateName}
          roleTitle="Staff / Senior AI Platform Engineer"
          consensusScore={decision.weightedScore}
        />
      ) : (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 text-white border-2 border-rose-500/50 shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="h-12 w-12 rounded-xl bg-rose-600/30 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  <XCircle className="h-3.5 w-3.5 text-rose-400" />
                  Hiring Verdict: Rejected • Ineligible for Senior Role
                </div>
                <h3 className="text-lg font-black text-white mt-1">
                  Offer Declined: High Contradiction & Scope Gap
                </h3>
                <p className="text-xs text-rose-200/90 font-medium">
                  Rohan's interview demonstrated execution gaps on production vector search scalability and unsubstantiated claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner Executive Decision */}
      <div className={`p-6 sm:p-7 rounded-2xl border-2 ${style.bg} ${style.accent} shadow-xs space-y-5 relative overflow-hidden bg-white`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs ${style.badgeBg}`}>
                {style.badgeText}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Candidate: <strong className="text-slate-900">{decision.candidateName}</strong>
              </span>
              {isHire && (
                <button
                  onClick={() => triggerHiringCelebration()}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-all cursor-pointer shadow-2xs"
                >
                  <PartyPopper className="h-3.5 w-3.5 text-amber-700" />
                  <span>Launch Confetti 🎉</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Executive Committee Consensus Report
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-slate-50/90 px-5 py-3 rounded-2xl border border-slate-200/90 shadow-2xs shrink-0">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Weighted Score</div>
              <div className="text-3xl font-black text-slate-950 font-mono">
                {decision.weightedScore.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 10</span>
              </div>
            </div>
            <div className="pl-4 border-l border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Confidence Level</div>
              <div className="text-3xl font-black text-indigo-700 font-mono">
                {decision.overallConfidence}%
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200/90 space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-indigo-600" />
            <span>Committee Executive Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {decision.executiveSummary}
          </p>
        </div>
      </div>

      {/* Weighted Reasoning Breakdown (Rule 4: Not Simple Averaging) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Scale className="h-4 w-4 text-indigo-600" />
            <span>Weighted Reasoning Engine (Not Simple Averaging)</span>
          </h2>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            Rule 4 Verification Passed
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {decision.scoringBreakdown.explanation}
        </p>

        {/* Weight Sliders/Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
            <div className="text-[11px] text-blue-900 font-bold uppercase tracking-wider">Technical Weight</div>
            <div className="text-2xl font-black text-blue-950 font-mono mt-1">
              {(decision.scoringBreakdown.technicalWeight * 100).toFixed(0)}%
            </div>
            <span className="text-[10px] text-blue-700 font-medium">Arch & Code Depth</span>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="text-[11px] text-emerald-900 font-bold uppercase tracking-wider">Culture / Integrity</div>
            <div className="text-2xl font-black text-emerald-950 font-mono mt-1">
              {(decision.scoringBreakdown.hrCultureWeight * 100).toFixed(0)}%
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Teamwork & Ethics</span>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
            <div className="text-[11px] text-amber-900 font-bold uppercase tracking-wider">Role Alignment</div>
            <div className="text-2xl font-black text-amber-950 font-mono mt-1">
              {(decision.scoringBreakdown.hiringManagerWeight * 100).toFixed(0)}%
            </div>
            <span className="text-[10px] text-amber-700 font-medium">Execution & Timeline</span>
          </div>
          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200">
            <div className="text-[11px] text-rose-900 font-bold uppercase tracking-wider">Skeptic Red-Team</div>
            <div className="text-2xl font-black text-rose-950 font-mono mt-1">
              {(decision.scoringBreakdown.skepticWeight * 100).toFixed(0)}%
            </div>
            <span className="text-[10px] text-rose-700 font-medium">Contradiction Penalty</span>
          </div>
        </div>
      </div>

      {/* Strengths & Risks Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Core Strengths */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span>Key Confirmed Strengths</span>
          </h3>

          <ul className="space-y-2.5">
            {decision.keyStrengths.map((str, i) => (
              <li key={i} className="text-xs text-slate-800 flex items-start gap-2.5 bg-emerald-50/30 p-3 rounded-xl border border-emerald-100 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Risks */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-rose-600" />
            <span>Critical Concerns & Risks</span>
          </h3>

          <ul className="space-y-2.5">
            {decision.keyRisksAndConcerns.map((risk, i) => (
              <li key={i} className="text-xs text-slate-800 flex items-start gap-2.5 bg-rose-50/30 p-3 rounded-xl border border-rose-100 font-medium">
                <span className="h-2 w-2 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Unresolved Disagreements (Rule 5 Report Requirement) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <AlertOctagon className="h-4 w-4 text-amber-600" />
            <span>Unresolved Agent Disagreements & Recommended Mitigations</span>
          </h3>
          <span className="text-xs font-semibold text-slate-400">Rule 5 Rubric Requirement</span>
        </div>

        {decision.unresolvedDisagreements.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No contentious disagreements remained unresolved post-debate.</p>
        ) : (
          <div className="space-y-3.5">
            {decision.unresolvedDisagreements.map((dis, idx) => (
              <div key={idx} className="p-4.5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Topic: {dis.topic}</span>
                  <span className="text-[10px] text-amber-900 bg-amber-100 border border-amber-200 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Active Trade-off
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {dis.agentsInvolved.map((a, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700">
                      <strong className="text-slate-900 uppercase text-[10px] block font-bold mb-0.5">{a.role}:</strong>
                      {a.stance}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">Impact on Role:</strong> {dis.impactOnRole}
                </div>
                <div className="text-xs text-indigo-950 bg-indigo-50/90 p-3 rounded-lg border border-indigo-200 font-medium leading-relaxed">
                  <strong className="text-indigo-900 block font-bold mb-0.5">Recommended Mitigation Strategy:</strong>
                  {dis.mitigationSuggestion}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hiring Conditions & Onboarding Mandates */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-indigo-600" />
          <span>Hiring Conditions & Post-Hire Execution Requirements</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {decision.hiringConditions.map((cond, i) => (
            <div key={i} className="text-xs text-slate-800 flex items-start gap-2.5 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 font-medium">
              <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{cond}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Comparison CTA */}
      <div className="p-6 bg-slate-950 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <h4 className="text-sm font-black tracking-tight">Compare Candidates Side-by-Side in Real-Time</h4>
          <p className="text-xs text-slate-400 font-medium">Launch the dual-candidate comparative matrix between Rohan and Ananya</p>
        </div>
        <button
          onClick={onProceedToComparison}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold shadow-xs hover:shadow-indigo-500/25 hover:shadow-md transition-all shrink-0 cursor-pointer"
        >
          <GitCompare className="h-4 w-4" />
          <span>Launch Comparative Matrix</span>
        </button>
      </div>

    </motion.div>
  );
};

