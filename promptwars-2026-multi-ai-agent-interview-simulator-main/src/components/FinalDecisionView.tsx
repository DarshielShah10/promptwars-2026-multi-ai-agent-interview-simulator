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
  AlertTriangle
} from 'lucide-react';

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
        return { bg: 'bg-emerald-600', text: 'text-white', badge: 'STRONG HIRE — EXTEND OFFER IMMEDIATELY', border: 'border-emerald-500' };
      case 'HIRE':
        return { bg: 'bg-emerald-50 border-emerald-300', text: 'text-emerald-950', badge: 'HIRE — RECOMMEND OFFER', border: 'border-emerald-400' };
      case 'LEAN_HIRE':
        return { bg: 'bg-blue-50 border-blue-300', text: 'text-blue-950', badge: 'LEAN HIRE — CONDITIONAL OFFER', border: 'border-blue-400' };
      case 'LEAN_NO_HIRE':
        return { bg: 'bg-amber-50 border-amber-300', text: 'text-amber-950', badge: 'LEAN NO HIRE — DO NOT EXTEND', border: 'border-amber-400' };
      case 'NO_HIRE':
        return { bg: 'bg-rose-50 border-rose-300', text: 'text-rose-950', badge: 'NO HIRE — REJECT CANDIDATE', border: 'border-rose-400' };
      default:
        return { bg: 'bg-slate-50 border-slate-300', text: 'text-slate-900', badge: verdict, border: 'border-slate-300' };
    }
  };

  const style = getVerdictStyle(decision.finalRecommendation);
  const isHire = decision.finalRecommendation.includes('HIRE') && !decision.finalRecommendation.includes('NO_HIRE');

  return (
    <div className="space-y-6">
      
      {/* Top Banner Executive Decision */}
      <div className={`p-6 rounded-2xl border-2 ${style.bg} ${style.border} shadow-sm space-y-4`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isHire ? 'bg-emerald-700 text-white' : 'bg-rose-700 text-white'
              }`}>
                {style.badge}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Candidate: <strong className="text-slate-900">{decision.candidateName}</strong>
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Executive Committee Consensus
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white/90 px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Weighted Score</div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {decision.weightedScore.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 10</span>
              </div>
            </div>
            <div className="pl-4 border-l border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Confidence Level</div>
              <div className="text-2xl font-black text-indigo-700 font-mono">
                {decision.overallConfidence}%
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <p className="text-sm text-slate-800 leading-relaxed font-medium bg-white/80 p-4 rounded-xl border border-slate-200/80">
          {decision.executiveSummary}
        </p>
      </div>

      {/* Weighted Reasoning Breakdown (Rule 4: Not Simple Averaging) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Scale className="h-4 w-4 text-indigo-600" />
            <span>Weighted Reasoning Engine Synthesis (Not Simple Averaging)</span>
          </h2>
          <span className="text-xs font-medium text-slate-500">
            Rule 4 Verification
          </span>
        </div>

        <p className="text-xs text-slate-600">
          {decision.scoringBreakdown.explanation}
        </p>

        {/* Weight Sliders/Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200">
            <div className="text-xs text-blue-900 font-medium">Technical Weight</div>
            <div className="text-lg font-bold text-blue-950 font-mono">
              {(decision.scoringBreakdown.technicalWeight * 100).toFixed(0)}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <div className="text-xs text-emerald-900 font-medium">Culture / Integrity</div>
            <div className="text-lg font-bold text-emerald-950 font-mono">
              {(decision.scoringBreakdown.hrCultureWeight * 100).toFixed(0)}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200">
            <div className="text-xs text-amber-900 font-medium">Hiring Manager ROI</div>
            <div className="text-lg font-bold text-amber-950 font-mono">
              {(decision.scoringBreakdown.hiringManagerWeight * 100).toFixed(0)}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200">
            <div className="text-xs text-rose-900 font-medium">Skeptic Red-Team</div>
            <div className="text-lg font-bold text-rose-950 font-mono">
              {(decision.scoringBreakdown.skepticWeight * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Risks Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Core Strengths */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span>Key Confirmed Strengths</span>
          </h3>

          <ul className="space-y-2.5">
            {decision.keyStrengths.map((str, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span className="font-medium">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Risks */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-rose-600" />
            <span>Critical Concerns & Risks</span>
          </h3>

          <ul className="space-y-2.5">
            {decision.keyRisksAndConcerns.map((risk, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-rose-50/30 p-2.5 rounded-lg border border-rose-100">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span className="font-medium">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Unresolved Disagreements (Rule 5 Report Requirement) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <AlertOctagon className="h-4 w-4 text-amber-600" />
          <span>Unresolved Agent Disagreements & Risk Mitigations</span>
        </h3>

        {decision.unresolvedDisagreements.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No contentious disagreements remained unresolved post-debate.</p>
        ) : (
          <div className="space-y-3">
            {decision.unresolvedDisagreements.map((dis, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Topic: {dis.topic}</span>
                  <span className="text-[10px] text-amber-800 bg-amber-100 font-semibold px-2 py-0.5 rounded">
                    Active Trade-off
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {dis.agentsInvolved.map((a, i) => (
                    <div key={i} className="bg-white p-2 rounded border border-slate-200 text-slate-700">
                      <strong className="text-slate-900 uppercase text-[10px] block">{a.role}:</strong>
                      {a.stance}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-600 pt-1">
                  <strong className="text-slate-800">Impact on Role:</strong> {dis.impactOnRole}
                </div>
                <div className="text-xs text-indigo-900 bg-indigo-50/60 p-2 rounded border border-indigo-100 font-medium">
                  <strong>Recommended Mitigation:</strong> {dis.mitigationSuggestion}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hiring Conditions & Onboarding Mandates */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-indigo-600" />
          <span>Hiring Conditions & Post-Hire Execution Requirements</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {decision.hiringConditions.map((cond, i) => (
            <div key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
              <span>{cond}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Comparison CTA */}
      <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between shadow-xs">
        <div>
          <h4 className="text-xs font-bold">Compare Candidates Side-by-Side</h4>
          <p className="text-[11px] text-slate-400">View dual-candidate comparative matrix between Rohan and Ananya</p>
        </div>
        <button
          onClick={onProceedToComparison}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <GitCompare className="h-4 w-4" />
          <span>Launch Comparative Matrix</span>
        </button>
      </div>

    </div>
  );
};
