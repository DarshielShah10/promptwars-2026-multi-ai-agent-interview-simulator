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
  ShieldAlert,
  ChevronRight,
  ShieldCheck
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
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xs border border-slate-700/50">
              <BrainCircuit className="h-5 w-5 text-indigo-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  Multi-Agent AI Interview Panel
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  <Sparkles className="h-3 w-3 text-indigo-500" />
                  Evidence Grounded
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Autonomous 4-agent committee with cross-examination debate, observable stance shifts & weighted synthesis
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              id="raw-data-button"
              onClick={onOpenRawData}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
              title="Inspect Raw JD, Resumes & Transcripts"
            >
              <FileText className="h-3.5 w-3.5 text-slate-500" />
              <span>Source Dossier</span>
            </button>

            <button
              id="run-full-pipeline-button"
              onClick={onRunFullPipeline}
              disabled={isRunningPipeline}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-xs cursor-pointer ${
                isRunningPipeline
                  ? 'bg-slate-700 cursor-not-allowed opacity-80'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98 hover:shadow-indigo-500/20 hover:shadow-md'
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
                  <span>Re-Run Deliberation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Candidate Selector & Pipeline Navigation Sub-Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-2.5 border-t border-slate-100 gap-3">
          
          {/* Candidate Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shadow-2xs">
            <button
              id="select-candidate-a"
              onClick={() => {
                onSelectCandidate('candidate_a');
                if (activeStage === 'comparison') onSelectStage('profile');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCandidate === 'candidate_a'
                  ? 'bg-rose-50 text-rose-950 ring-1.5 ring-rose-400/60 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Candidate A: Rohan Malhotra</span>
            </button>
            <button
              id="select-candidate-b"
              onClick={() => {
                onSelectCandidate('candidate_b');
                if (activeStage === 'comparison') onSelectStage('profile');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCandidate === 'candidate_b'
                  ? 'bg-emerald-50 text-emerald-950 ring-1.5 ring-emerald-500/60 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Candidate B: Ananya Iyer ✨</span>
            </button>
            <button
              id="select-custom-candidate"
              onClick={() => {
                onSelectCandidate('custom');
                if (activeStage === 'comparison') onSelectStage('profile');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCandidate === 'custom'
                  ? 'bg-indigo-600 text-white ring-1.5 ring-indigo-400 shadow-xs font-bold'
                  : 'text-indigo-900 bg-indigo-50/70 hover:bg-indigo-100 hover:text-indigo-950'
              }`}
            >
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span>Custom Intake & Live Interview ⚡</span>
            </button>
            <button
              id="select-compare-mode"
              onClick={() => {
                onSelectCandidate('compare');
                onSelectStage('comparison');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCandidate === 'compare'
                  ? 'bg-indigo-600 text-white ring-1.5 ring-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <GitCompare className="h-3.5 w-3.5" />
              <span>Head-to-Head Matrix</span>
            </button>
          </div>

          {/* Workflow Stage Stepper */}
          {activeCandidate !== 'compare' && (
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                id="stage-profile-btn"
                onClick={() => onSelectStage('profile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeStage === 'profile'
                    ? 'bg-sky-900 text-white font-bold shadow-xs ring-1.5 ring-sky-500/40'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Users className="h-3.5 w-3.5 text-sky-400" />
                <span>1. Dossier & Claims</span>
              </button>

              <button
                id="stage-independent-btn"
                onClick={() => onSelectStage('independent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeStage === 'independent'
                    ? 'bg-indigo-900 text-white font-bold shadow-xs ring-1.5 ring-indigo-500/40'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BrainCircuit className="h-3.5 w-3.5 text-indigo-400" />
                <span>2. Isolated Reviews</span>
              </button>

              <button
                id="stage-debate-btn"
                onClick={() => onSelectStage('debate')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeStage === 'debate'
                    ? 'bg-purple-900 text-white font-bold shadow-xs ring-1.5 ring-purple-500/40'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <MessageSquareCode className="h-3.5 w-3.5 text-purple-400" />
                <span>3. Cross-Exam Debate</span>
              </button>

              <button
                id="stage-decision-btn"
                onClick={() => onSelectStage('decision')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeStage === 'decision'
                    ? activeCandidate === 'candidate_b'
                      ? 'bg-emerald-800 text-white font-bold shadow-xs ring-1.5 ring-emerald-400/50'
                      : 'bg-rose-900 text-white font-bold shadow-xs ring-1.5 ring-rose-400/50'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Scale className="h-3.5 w-3.5 text-amber-300" />
                <span>4. Weighted Synthesis</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

