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
  Award
} from 'lucide-react';

interface ComparisonMatrixViewProps {
  comparison: CandidateComparison;
  onSelectCandidate: (c: 'candidate_a' | 'candidate_b') => void;
}

export const ComparisonMatrixView: React.FC<ComparisonMatrixViewProps> = ({
  comparison,
  onSelectCandidate,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Winner Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-indigo-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <Trophy className="h-3.5 w-3.5 text-emerald-400" />
                Panel Consensus Winner
              </span>
              <span className="text-xs text-indigo-200">
                Senior AI/Backend Engineer
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {comparison.recommendedCandidate}
            </h1>
            <p className="text-xs text-indigo-200/90 max-w-2xl leading-relaxed">
              {comparison.summaryVerdict}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center shrink-0">
            <div className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Winning Score</div>
            <div className="text-3xl font-black text-white font-mono">
              {comparison.candidateBSummary.finalScore.toFixed(1)} <span className="text-xs text-indigo-300 font-normal">/ 10</span>
            </div>
            <div className="text-[11px] font-semibold text-emerald-400 mt-0.5">
              {comparison.candidateBSummary.recommendation}
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Candidate Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Candidate A: Rohan */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate A</div>
              <h3 className="text-base font-bold text-slate-900">{comparison.candidateASummary.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{comparison.candidateASummary.profileType}</p>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                {comparison.candidateASummary.recommendation} ({comparison.candidateASummary.finalScore.toFixed(1)})
              </span>
            </div>
          </div>

          {/* Pros */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Strengths</h4>
            {comparison.candidateASummary.pros.map((p, i) => (
              <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          {/* Cons */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider">Concerns & Gaps</h4>
            {comparison.candidateASummary.cons.map((c, i) => (
              <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                <XCircle className="h-3.5 w-3.5 text-rose-600 mt-0.5 shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>

          {/* Best Suited For */}
          <div className="text-xs p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
            <strong className="text-slate-800 block mb-0.5">Best Suited Context:</strong>
            {comparison.candidateASummary.bestSuitedFor}
          </div>

          <button
            onClick={() => onSelectCandidate('candidate_a')}
            className="w-full py-2 text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50 rounded-lg border border-indigo-100 transition-colors"
          >
            Inspect Rohan's Full Panel Audit →
          </button>
        </div>

        {/* Candidate B: Ananya */}
        <div className="bg-white border-2 border-emerald-400/80 rounded-xl p-5 shadow-xs space-y-4 relative">
          <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            Recommended Choice
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Candidate B</div>
              <h3 className="text-base font-bold text-slate-900">{comparison.candidateBSummary.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{comparison.candidateBSummary.profileType}</p>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {comparison.candidateBSummary.recommendation} ({comparison.candidateBSummary.finalScore.toFixed(1)})
              </span>
            </div>
          </div>

          {/* Pros */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Strengths</h4>
            {comparison.candidateBSummary.pros.map((p, i) => (
              <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          {/* Cons */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Identified Ramp-Up Gaps</h4>
            {comparison.candidateBSummary.cons.map((c, i) => (
              <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                <XCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>

          {/* Best Suited For */}
          <div className="text-xs p-3 rounded-lg bg-emerald-50/40 border border-emerald-200/70 text-slate-700">
            <strong className="text-emerald-950 block mb-0.5">Best Suited Context:</strong>
            {comparison.candidateBSummary.bestSuitedFor}
          </div>

          <button
            onClick={() => onSelectCandidate('candidate_b')}
            className="w-full py-2 text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/60 rounded-lg border border-emerald-200 transition-colors"
          >
            Inspect Ananya's Full Panel Audit →
          </button>
        </div>

      </div>

      {/* Dimension Ratings Breakdown Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <GitCompare className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              5-Dimension Comparative Evaluation Matrix
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Evaluated by all 4 agents
          </span>
        </div>

        <div className="space-y-4">
          {comparison.dimensionRatings.map((dim, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">{dim.dimension}</span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-slate-600">
                    Rohan: <strong className="text-slate-900">{dim.candidateAScore.toFixed(1)}</strong>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600">
                    Ananya: <strong className="text-emerald-700">{dim.candidateBScore.toFixed(1)}</strong>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                    Advantage: {dim.winner === 'A' ? 'Rohan' : dim.winner === 'B' ? 'Ananya' : 'Tie'}
                  </span>
                </div>
              </div>

              {/* Progress Visualizer */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Rohan</span>
                    <span>{dim.candidateAScore}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-slate-700 h-1.5 rounded-full" 
                      style={{ width: `${(dim.candidateAScore / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Ananya</span>
                    <span>{dim.candidateBScore}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-1.5 rounded-full" 
                      style={{ width: `${(dim.candidateBScore / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                {dim.analysis}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Executive Takeaway */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4" />
          <span>Core Strategic Hiring Takeaway</span>
        </h4>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {comparison.keyTakeaway}
        </p>
      </div>

    </div>
  );
};
