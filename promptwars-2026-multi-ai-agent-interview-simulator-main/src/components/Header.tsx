import React from 'react';
import { 
  Users, 
  BrainCircuit, 
  MessageSquareCode, 
  Scale, 
  GitCompare, 
  Play, 
  RefreshCw, 
  FileText,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface HeaderProps {
  activeCandidate: 'candidate_a' | 'candidate_b' | 'custom' | 'compare';
  onSelectCandidate: (cand: 'candidate_a' | 'candidate_b' | 'custom' | 'compare') => void;
  activeStage: 'profile' | 'independent' | 'debate' | 'decision' | 'comparison';
  onSelectStage: (stage: 'profile' | 'independent' | 'debate' | 'decision' | 'comparison') => void;
  isRunningPipeline: boolean;
  onRunFullPipeline: () => void;
  onOpenRawData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCandidate,
  onSelectCandidate,
  activeStage,
  onSelectStage,
  isRunningPipeline,
  onRunFullPipeline,
  onOpenRawData,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <BrainCircuit className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-slate-900">
                  Multi-Agent AI Interview Panel
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  4-Agent Committee
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Autonomous candidate vetting, cross-examination debate & evidence-grounded decision engine
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              id="raw-data-button"
              onClick={onOpenRawData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs font-medium transition-colors shadow-xs"
              title="Inspect Raw JD, Resumes & Transcripts"
            >
              <FileText className="h-3.5 w-3.5 text-slate-500" />
              <span>Source Docs</span>
            </button>

            <button
              id="run-full-pipeline-button"
              onClick={onRunFullPipeline}
              disabled={isRunningPipeline}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-xs ${
                isRunningPipeline
                  ? 'bg-slate-700 cursor-not-allowed opacity-80'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
              }`}
            >
              {isRunningPipeline ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-white" />
                  <span>Evaluating Agents...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Run Panel Deliberation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Candidate Selector & Pipeline Navigation Sub-Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2.5 border-t border-slate-100 gap-3">
          
          {/* Candidate Tabs */}
          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg border border-slate-200/60">
            <button
              id="select-candidate-a"
              onClick={() => {
                onSelectCandidate('candidate_a');
                if (activeStage === 'comparison') onSelectStage('profile');
              }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeCandidate === 'candidate_a'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Candidate A: Rohan Malhotra
            </button>
            <button
              id="select-candidate-b"
              onClick={() => {
                onSelectCandidate('candidate_b');
                if (activeStage === 'comparison') onSelectStage('profile');
              }}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeCandidate === 'candidate_b'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Candidate B: Ananya Iyer
            </button>
            <button
              id="select-compare-mode"
              onClick={() => {
                onSelectCandidate('compare');
                onSelectStage('comparison');
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeCandidate === 'compare'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitCompare className="h-3.5 w-3.5" />
              <span>Head-to-Head</span>
            </button>
          </div>

          {/* Workflow Stage Steps */}
          {activeCandidate !== 'compare' && (
            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                id="stage-profile-btn"
                onClick={() => onSelectStage('profile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  activeStage === 'profile'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>1. Profile & Claims</span>
              </button>

              <button
                id="stage-independent-btn"
                onClick={() => onSelectStage('independent')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  activeStage === 'independent'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>2. Independent Review (4 Agents)</span>
              </button>

              <button
                id="stage-debate-btn"
                onClick={() => onSelectStage('debate')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  activeStage === 'debate'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <MessageSquareCode className="h-3.5 w-3.5" />
                <span>3. Live Debate & Stance Shifts</span>
              </button>

              <button
                id="stage-decision-btn"
                onClick={() => onSelectStage('decision')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  activeStage === 'decision'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Scale className="h-3.5 w-3.5" />
                <span>4. Weighted Final Decision</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
