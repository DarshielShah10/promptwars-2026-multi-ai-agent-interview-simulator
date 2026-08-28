import React, { useState, useEffect } from 'react';
import { 
  CandidateProfile, 
  AgentOpinion, 
  DebateMessage, 
  StanceShift, 
  FinalDecision, 
  CandidateComparison,
  AgentRole 
} from './types/simulator';
import { 
  JOB_DESCRIPTION, 
  RESUME_A_TEXT, 
  TRANSCRIPT_A_TEXT, 
  RESUME_B_TEXT, 
  TRANSCRIPT_B_TEXT 
} from './data/defaultCandidates';
import { Header } from './components/Header';
import { ProfileBuilderView } from './components/ProfileBuilderView';
import { IndependentAgentsView } from './components/IndependentAgentsView';
import { DebateArenaView } from './components/DebateArenaView';
import { FinalDecisionView } from './components/FinalDecisionView';
import { ComparisonMatrixView } from './components/ComparisonMatrixView';
import { RawDataDrawer } from './components/RawDataDrawer';
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Award, 
  FileText, 
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeCandidate, setActiveCandidate] = useState<'candidate_a' | 'candidate_b' | 'custom' | 'compare'>('candidate_a');
  const [activeStage, setActiveStage] = useState<'profile' | 'independent' | 'debate' | 'decision' | 'comparison'>('profile');
  const [isRunningPipeline, setIsRunningPipeline] = useState<boolean>(false);
  const [pipelineProgressText, setPipelineProgressText] = useState<string>('');
  const [isRawDataOpen, setIsRawDataOpen] = useState<boolean>(false);

  // Stored state per candidate
  const [dataA, setDataA] = useState<{
    profile?: CandidateProfile;
    opinions?: Record<AgentRole, AgentOpinion>;
    messages?: DebateMessage[];
    shifts?: StanceShift[];
    decision?: FinalDecision;
  }>({});

  const [dataB, setDataB] = useState<{
    profile?: CandidateProfile;
    opinions?: Record<AgentRole, AgentOpinion>;
    messages?: DebateMessage[];
    shifts?: StanceShift[];
    decision?: FinalDecision;
  }>({});

  const [comparisonData, setComparisonData] = useState<CandidateComparison | null>(null);

  // Initialize baseline data on mount
  useEffect(() => {
    loadAllCandidates();
  }, []);

  const loadAllCandidates = async () => {
    try {
      const res = await fetch('/api/candidates/all');
      if (!res.ok) throw new Error('Failed to fetch initial candidate data');
      const data = await res.json();
      
      if (data.candidate_a) {
        setDataA({
          profile: data.candidate_a.profile,
          opinions: data.candidate_a.opinions,
          messages: data.candidate_a.messages,
          shifts: data.candidate_a.shifts,
          decision: data.candidate_a.decision
        });
      }
      if (data.candidate_b) {
        setDataB({
          profile: data.candidate_b.profile,
          opinions: data.candidate_b.opinions,
          messages: data.candidate_b.messages,
          shifts: data.candidate_b.shifts,
          decision: data.candidate_b.decision
        });
      }
      if (data.comparison) {
        setComparisonData(data.comparison);
      }
    } catch (err) {
      console.warn('Initial candidate loader fallback:', err);
    }
  };

  const loadComparisonData = async () => {
    try {
      const res = await fetch('/api/evaluate/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await res.json();
      setComparisonData(data);
    } catch (err) {
      console.warn('Failed to load comparison:', err);
    }
  };

  const handleRunFullPipeline = async () => {
    setIsRunningPipeline(true);
    const isA = activeCandidate === 'candidate_a';
    const targetName = isA ? 'Rohan Malhotra' : 'Ananya Iyer';
    const resumeText = isA ? RESUME_A_TEXT : RESUME_B_TEXT;
    const transcriptText = isA ? TRANSCRIPT_A_TEXT : TRANSCRIPT_B_TEXT;

    try {
      setPipelineProgressText(`[1/4] Extracting profile & cross-verifying claims for ${targetName}...`);
      setActiveStage('profile');
      const profRes = await fetch('/api/evaluate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, transcriptText, jobDescription: JOB_DESCRIPTION, forceLive: true })
      });
      const profile = await profRes.json();
      await new Promise(r => setTimeout(r, 600));

      setPipelineProgressText(`[2/4] Executing 4 isolated agent evaluations (Technical, HR, Hiring Manager, Skeptic)...`);
      setActiveStage('independent');
      const indRes = await fetch('/api/evaluate/independent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, transcriptText, jobDescription: JOB_DESCRIPTION, candidateName: targetName, forceLive: true })
      });
      const opinions = await indRes.json();
      await new Promise(r => setTimeout(r, 800));

      setPipelineProgressText(`[3/4] Orchestrating cross-examination debate & tracking observable stance shifts...`);
      setActiveStage('debate');
      const debRes = await fetch('/api/evaluate/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateName: targetName, independentOpinions: opinions, transcriptText, resumeText, jobDescription: JOB_DESCRIPTION, forceLive: true })
      });
      const debateResult = await debRes.json();
      await new Promise(r => setTimeout(r, 800));

      setPipelineProgressText(`[4/4] Executing weighted decision reasoning engine & unresolved risk matrix...`);
      setActiveStage('decision');
      const decRes = await fetch('/api/evaluate/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName: targetName,
          independentOpinions: opinions,
          debateMessages: debateResult.debateMessages,
          stanceShifts: debateResult.stanceShifts,
          jobDescription: JOB_DESCRIPTION,
          forceLive: true
        })
      });
      const decision = await decRes.json();

      if (isA) {
        setDataA({
          profile,
          opinions,
          messages: debateResult.debateMessages,
          shifts: debateResult.stanceShifts,
          decision
        });
      } else {
        setDataB({
          profile,
          opinions,
          messages: debateResult.debateMessages,
          shifts: debateResult.stanceShifts,
          decision
        });
      }

      await loadComparisonData();
    } catch (err) {
      console.warn('Error running pipeline:', err);
    } finally {
      setIsRunningPipeline(false);
      setPipelineProgressText('');
    }
  };

  const currentData = activeCandidate === 'candidate_a' ? dataA : dataB;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeCandidate={activeCandidate}
        onSelectCandidate={(c) => {
          setActiveCandidate(c);
          if (c === 'compare') {
            setActiveStage('comparison');
          }
        }}
        activeStage={activeStage}
        onSelectStage={setActiveStage}
        isRunningPipeline={isRunningPipeline}
        onRunFullPipeline={handleRunFullPipeline}
        onOpenRawData={() => setIsRawDataOpen(true)}
      />

      {/* Live Pipeline Execution Progress Banner */}
      {isRunningPipeline && (
        <div className="bg-indigo-900 text-white px-4 py-2.5 shadow-xs flex items-center justify-between text-xs font-semibold">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
            <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
            <span>{pipelineProgressText}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Comparison Stage */}
        {activeCandidate === 'compare' || activeStage === 'comparison' ? (
          comparisonData ? (
            <ComparisonMatrixView 
              comparison={comparisonData} 
              onSelectCandidate={(cand) => {
                setActiveCandidate(cand);
                setActiveStage('decision');
              }} 
            />
          ) : (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-indigo-600 mb-2" />
              <p className="text-xs text-slate-500">Synthesizing head-to-head comparison...</p>
            </div>
          )
        ) : (
          /* Single Candidate Stages */
          <>
            {activeStage === 'profile' && currentData.profile && (
              <ProfileBuilderView 
                profile={currentData.profile} 
                onProceedToIndependent={() => setActiveStage('independent')} 
              />
            )}

            {activeStage === 'independent' && currentData.opinions && (
              <IndependentAgentsView 
                opinions={currentData.opinions} 
                onProceedToDebate={() => setActiveStage('debate')} 
              />
            )}

            {activeStage === 'debate' && currentData.messages && currentData.shifts && (
              <DebateArenaView 
                messages={currentData.messages} 
                stanceShifts={currentData.shifts} 
                onProceedToDecision={() => setActiveStage('decision')} 
              />
            )}

            {activeStage === 'decision' && currentData.decision && (
              <FinalDecisionView 
                decision={currentData.decision} 
                onProceedToComparison={() => {
                  setActiveCandidate('compare');
                  setActiveStage('comparison');
                }} 
              />
            )}
          </>
        )}

      </main>

      {/* Source Data Inspection Drawer */}
      <RawDataDrawer
        isOpen={isRawDataOpen}
        onClose={() => setIsRawDataOpen(false)}
      />

      {/* Compact Status Footer */}
      <footer className="border-t border-slate-200 bg-white py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">Multi-Agent AI Interview Panel Simulator</span>
            <span>• Built for 3-Hour AI Challenge</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>4 Isolated Agents</span>
            <span>Observable Stance Shifts</span>
            <span>Evidence Grounded</span>
            <span>Weighted Reasoning Engine</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
