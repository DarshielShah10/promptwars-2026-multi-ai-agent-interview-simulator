import React from 'react';
import { CandidateComparison } from '../types/simulator';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  GitCompare, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Crown,
  ChevronRight,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface ComparisonMatrixViewProps {
  comparison: CandidateComparison;
  onSelectCandidate: (c: 'candidate_a' | 'candidate_b') => void;
}

export const ComparisonMatrixView: React.FC<ComparisonMatrixViewProps> = ({
  comparison,
  onSelectCandidate,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      
      {/* Top Winner Banner Card */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider shadow-2xs">
                <Crown className="h-3.5 w-3.5 text-emerald-400" />
                Executive Consensus Recommendation
              </span>
              <span className="text-xs font-medium text-indigo-300">
                Target Role: Staff / Senior AI Platform Engineer
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {comparison.recommendedCandidate}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              {comparison.summaryVerdict}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center shrink-0 shadow-xs">
            <div className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">Consensus Score</div>
            <div className="text-3xl font-black text-white font-mono mt-0.5">
              {comparison.candidateBSummary.finalScore.toFixed(1)} <span className="text-xs text-indigo-300 font-normal">/ 10</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-400 mt-1 uppercase tracking-wider">
              {comparison.candidateBSummary.recommendation}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Candidate Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Candidate A: Rohan */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Candidate A</div>
                <h3 className="text-lg font-black text-slate-900">{comparison.candidateASummary.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{comparison.candidateASummary.profileType}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-900 border border-rose-200">
                  {comparison.candidateASummary.recommendation} ({comparison.candidateASummary.finalScore.toFixed(1)})
                </span>
              </div>
            </div>

            {/* Pros */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Documented Strengths</h4>
              {comparison.candidateASummary.pros.map((p, i) => (
                <div key={i} className="text-xs text-slate-700 flex items-start gap-2 font-medium bg-emerald-50/30 p-2 rounded-lg border border-emerald-100/60">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="leading-snug">{p}</span>
                </div>
              ))}
            </div>

            {/* Cons */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-rose-800 uppercase tracking-wider">Critical Risks & Misalignments</h4>
              {comparison.candidateASummary.cons.map((c, i) => (
                <div key={i} className="text-xs text-slate-700 flex items-start gap-2 font-medium bg-rose-50/30 p-2 rounded-lg border border-rose-100/60">
                  <XCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                  <span className="leading-snug">{c}</span>
                </div>
              ))}
            </div>

            {/* Best Suited For */}
            <div className="text-xs p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
              <strong className="text-slate-900 block mb-0.5 font-bold">Best Suited Role Alignment:</strong>
              {comparison.candidateASummary.bestSuitedFor}
            </div>
          </div>

          <button
            onClick={() => onSelectCandidate('candidate_a')}
            className="w-full py-2.5 mt-2 text-center text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Inspect Rohan's Full Committee Audit</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Candidate B: Ananya */}
        <div className="bg-white border-2 border-emerald-500/80 rounded-2xl p-6 shadow-xs space-y-4 relative flex flex-col justify-between">
          <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Check className="h-3 w-3" /> Recommended Candidate
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Candidate B</div>
                <h3 className="text-lg font-black text-slate-900">{comparison.candidateBSummary.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{comparison.candidateBSummary.profileType}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {comparison.candidateBSummary.recommendation} ({comparison.candidateBSummary.finalScore.toFixed(1)})
                </span>
              </div>
            </div>

            {/* Pros */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Documented Strengths</h4>
              {comparison.candidateBSummary.pros.map((p, i) => (
                <div key={i} className="text-xs text-slate-700 flex items-start gap-2 font-medium bg-emerald-50/40 p-2 rounded-lg border border-emerald-200/70">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="leading-snug">{p}</span>
                </div>
              ))}
            </div>

            {/* Cons */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Identified Growth Areas</h4>
              {comparison.candidateBSummary.cons.map((c, i) => (
                <div key={i} className="text-xs text-slate-700 flex items-start gap-2 font-medium bg-amber-50/40 p-2 rounded-lg border border-amber-200/70">
                  <XCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <span className="leading-snug">{c}</span>
                </div>
              ))}
            </div>

            {/* Best Suited For */}
            <div className="text-xs p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 text-slate-800">
              <strong className="text-emerald-950 block mb-0.5 font-bold">Best Suited Role Alignment:</strong>
              {comparison.candidateBSummary.bestSuitedFor}
            </div>
          </div>

          <button
            onClick={() => onSelectCandidate('candidate_b')}
            className="w-full py-2.5 mt-2 text-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs hover:shadow-emerald-500/20 hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Inspect Ananya's Full Committee Audit</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Dimension Ratings Breakdown Matrix */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <GitCompare className="h-4 w-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              5-Dimension Comparative Evaluation Matrix
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Cross-evaluated across all 4 independent personas
          </span>
        </div>

        <div className="space-y-4">
          {comparison.dimensionRatings.map((dim, idx) => (
            <div key={idx} className="p-4.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">{dim.dimension}</span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-600 font-medium">
                    Rohan: <strong className="text-slate-900 font-bold">{dim.candidateAScore.toFixed(1)}</strong>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600 font-medium">
                    Ananya: <strong className="text-emerald-700 font-black">{dim.candidateBScore.toFixed(1)}</strong>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-900 border border-indigo-200">
                    Advantage: {dim.winner === 'A' ? 'Rohan' : dim.winner === 'B' ? 'Ananya' : 'Tie'}
                  </span>
                </div>
              </div>

              {/* Progress Visualizer */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mb-1">
                    <span>Rohan</span>
                    <span>{dim.candidateAScore}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-slate-700 h-2 rounded-full transition-all" 
                      style={{ width: `${(dim.candidateAScore / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-emerald-700 font-bold uppercase mb-1">
                    <span>Ananya</span>
                    <span>{dim.candidateBScore}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all" 
                      style={{ width: `${(dim.candidateBScore / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 pt-1 leading-relaxed font-medium">
                {dim.analysis}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Executive Takeaway */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md space-y-2 border border-slate-800">
        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span>Core Strategic Hiring Recommendation</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {comparison.keyTakeaway}
        </p>
      </div>

    </motion.div>
  );
};

