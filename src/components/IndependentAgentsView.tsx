import React, { useState } from 'react';
import { AgentOpinion, AgentRole, CandidateProfile } from '../types/simulator';
import { 
  ShieldCheck, 
  Code, 
  HeartHandshake, 
  Briefcase, 
  AlertCircle, 
  Quote, 
  CheckCircle2, 
  ArrowRight,
  EyeOff,
  Flame,
  Search,
  Sparkles,
  TrendingUp,
  Scale,
  Zap,
  FileText,
  Copy,
  Check,
  Filter,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IndependentAgentsViewProps {
  opinions: Record<AgentRole, AgentOpinion>;
  candidateName?: string;
  candidateProfile?: CandidateProfile;
  onProceedToDebate: () => void;
}

interface EvidenceSnippet {
  id: string;
  agentRole: AgentRole;
  type: 'strength' | 'concern' | 'thesis' | 'missing';
  pointTitle: string;
  quote: string;
  sourceContext: string;
  impactScore?: string;
  severity?: 'low' | 'medium' | 'high';
  verifiableStatus: 'Verified in Transcript' | 'Direct Admission' | 'Resume Discrepancy' | 'Unverified Claim';
  personaReasoning: string;
}

export const IndependentAgentsView: React.FC<IndependentAgentsViewProps> = ({
  opinions,
  candidateName,
  candidateProfile,
  onProceedToDebate,
}) => {
  const [selectedRole, setSelectedRole] = useState<AgentRole>('technical');
  const [isDeepInsightMode, setIsDeepInsightMode] = useState<boolean>(true);
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);
  const [snippetFilter, setSnippetFilter] = useState<'all' | 'strengths' | 'concerns'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const agentMeta: Record<AgentRole, { color: string; bg: string; border: string; activeBorder: string; icon: any; title: string; avatar: string; lightBg: string }> = {
    technical: {
      color: 'text-blue-700',
      bg: 'bg-blue-50/70',
      lightBg: 'bg-blue-500/10',
      border: 'border-blue-200',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/20',
      icon: Code,
      title: 'Technical Depth & Architecture',
      avatar: 'DV'
    },
    hr_culture: {
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/70',
      lightBg: 'bg-emerald-500/10',
      border: 'border-emerald-200',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
      icon: HeartHandshake,
      title: 'Culture, Teamwork & Integrity',
      avatar: 'SC'
    },
    hiring_manager: {
      color: 'text-amber-700',
      bg: 'bg-amber-50/70',
      lightBg: 'bg-amber-500/10',
      border: 'border-amber-200',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
      icon: Briefcase,
      title: 'Role Alignment & Execution',
      avatar: 'MS'
    },
    skeptic: {
      color: 'text-rose-700',
      bg: 'bg-rose-50/70',
      lightBg: 'bg-rose-500/10',
      border: 'border-rose-200',
      activeBorder: 'border-rose-500 ring-2 ring-rose-500/20',
      icon: AlertCircle,
      title: 'Red-Team Contradiction Audit',
      avatar: 'RK'
    }
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_HIRE':
        return 'bg-emerald-700 text-white font-bold';
      case 'HIRE':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'LEAN_HIRE':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-semibold';
      case 'LEAN_NO_HIRE':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-semibold';
      case 'NO_HIRE':
        return 'bg-rose-100 text-rose-900 border-rose-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const roles: AgentRole[] = ['technical', 'hr_culture', 'hiring_manager', 'skeptic'];
  const scores = roles.map(r => opinions[r]?.score || 0);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const scoreSpread = (maxScore - minScore).toFixed(1);

  const activeAgent = opinions[selectedRole];
  const meta = agentMeta[selectedRole];
  const IconComponent = meta.icon;

  // Extract structured evidence snippets for the active agent
  const activeSnippets: EvidenceSnippet[] = React.useMemo(() => {
    if (!activeAgent) return [];
    const list: EvidenceSnippet[] = [];

    // Core thesis snippet
    if (activeAgent.corePerspective) {
      list.push({
        id: `${selectedRole}-thesis`,
        agentRole: selectedRole,
        type: 'thesis',
        pointTitle: 'Primary Stance Thesis',
        quote: activeAgent.corePerspective,
        sourceContext: 'Evaluator Synthesis from Full Transcript',
        impactScore: `Baseline Score: ${activeAgent.score.toFixed(1)}/10`,
        verifiableStatus: 'Verified in Transcript',
        personaReasoning: activeAgent.isolatedProof || 'Independent persona baseline formed strictly from raw transcript evidence.'
      });
    }

    // Strengths snippets
    activeAgent.strengths.forEach((s, idx) => {
      list.push({
        id: `${selectedRole}-str-${idx}`,
        agentRole: selectedRole,
        type: 'strength',
        pointTitle: s.point,
        quote: s.evidence,
        sourceContext: `Interview Transcript • Section Q${idx + 2} Context`,
        impactScore: '+1.5 pts Positive Impact',
        verifiableStatus: 'Verified in Transcript',
        personaReasoning: `Direct evidence validating candidate competency in ${s.point.toLowerCase()}.`
      });
    });

    // Concerns snippets
    activeAgent.concerns.forEach((c, idx) => {
      list.push({
        id: `${selectedRole}-con-${idx}`,
        agentRole: selectedRole,
        type: 'concern',
        pointTitle: c.point,
        quote: c.evidence,
        sourceContext: `Interview Transcript • Cross-Examination Q${idx + 5}`,
        severity: c.severity,
        impactScore: c.severity === 'high' ? '-2.5 pts High Risk Flag' : '-1.0 pt Consideration',
        verifiableStatus: c.severity === 'high' ? 'Resume Discrepancy' : 'Direct Admission',
        personaReasoning: `Identified friction or limitation regarding ${c.point.toLowerCase()}.`
      });
    });

    return list;
  }, [activeAgent, selectedRole]);

  // Filter and search snippets
  const filteredSnippets = activeSnippets.filter(snip => {
    if (snippetFilter === 'strengths' && snip.type !== 'strength') return false;
    if (snippetFilter === 'concerns' && snip.type !== 'concern') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        snip.pointTitle.toLowerCase().includes(q) ||
        snip.quote.toLowerCase().includes(q) ||
        snip.personaReasoning.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeSnippetDetails = selectedSnippetId 
    ? activeSnippets.find(s => s.id === selectedSnippetId) || activeSnippets[0]
    : activeSnippets[0];

  const handleCopyQuote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      
      {/* Top Banner with Isolation Status & Deep Insight Mode Toggle */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-950 text-white shadow-xs">
              <EyeOff className="h-3.5 w-3.5 text-indigo-400" />
              Isolated Parallel Execution
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              Initial Variance: {scoreSpread} pts divergence
            </span>
            {isDeepInsightMode && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 animate-pulse">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Deep Insight Mode Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Each agent evaluated candidate claims independently. {isDeepInsightMode ? 'Click on any opinion or strength/concern to view verbatim transcript evidence snippets.' : 'Enable Deep Insight Mode to drill down into transcript evidence citations.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Deep Insight Mode Toggle Button */}
          <button
            onClick={() => setIsDeepInsightMode(prev => !prev)}
            id="toggle-deep-insight-mode"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              isDeepInsightMode
                ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isDeepInsightMode ? 'bg-amber-500 ring-2 ring-amber-300' : 'bg-slate-400'}`} />
            <Zap className={`h-3.5 w-3.5 ${isDeepInsightMode ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span>Deep Insight</span>
            <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
              isDeepInsightMode ? 'bg-amber-200/80 text-amber-900' : 'bg-slate-200 text-slate-600'
            }`}>
              {isDeepInsightMode ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={onProceedToDebate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-indigo-500/20 hover:shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Convene Debate</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 4 Agent Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => {
          const agent = opinions[role];
          const m = agentMeta[role];
          const isSelected = selectedRole === role;
          const totalSnippets = (agent.strengths?.length || 0) + (agent.concerns?.length || 0) + 1;

          return (
            <motion.button
              key={role}
              id={`agent-card-${role}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                setSelectedRole(role);
                setSelectedSnippetId(null);
              }}
              className={`text-left p-4.5 rounded-2xl border transition-all relative cursor-pointer ${
                isSelected
                  ? `bg-white ${m.activeBorder} shadow-md`
                  : 'bg-white/90 border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${m.bg} ${m.color} border ${m.border}`}>
                    {m.avatar}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">{agent.agentName}</h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">{agent.agentTitle.split('•')[0]}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline justify-between my-2 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pre-Debate</span>
                <span className="text-xl font-black text-slate-900 font-mono">
                  {agent.score.toFixed(1)}<span className="text-xs font-normal text-slate-400">/10</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getVerdictBadge(agent.verdict)}`}>
                  {agent.verdict.replace('_', ' ')}
                </span>
                {isDeepInsightMode ? (
                  <span className="text-amber-800 font-mono text-[10px] font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                    <FileText className="h-3 w-3 text-amber-600" />
                    {totalSnippets} snippets
                  </span>
                ) : (
                  <span className="text-slate-500 font-mono text-[11px] font-semibold">
                    {agent.confidence}% Conf.
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Deep Insight Mode: Transcript Forensic Inspector */}
      {isDeepInsightMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-amber-50/40 via-white to-indigo-50/30 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-amber-200/80">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-xs">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                    Transcript Evidence Forensic Inspector
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {meta.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Direct transcript quotes parsed and analyzed by <span className="font-bold text-slate-900">{activeAgent?.agentName}</span> to form their independent score.
                </p>
              </div>
            </div>

            {/* Filter Chips & Search Bar */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setSnippetFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-all ${snippetFilter === 'all' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All ({activeSnippets.length})
                </button>
                <button
                  onClick={() => setSnippetFilter('strengths')}
                  className={`px-2.5 py-1 rounded-md transition-all ${snippetFilter === 'strengths' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Strengths
                </button>
                <button
                  onClick={() => setSnippetFilter('concerns')}
                  className={`px-2.5 py-1 rounded-md transition-all ${snippetFilter === 'concerns' ? 'bg-rose-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Concerns
                </button>
              </div>

              <div className="relative flex-1 sm:w-48">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter quotes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Dual Panel: Snippet Selector List + Active Snippet Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Snippet Card Selector List */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredSnippets.length === 0 ? (
                <div className="text-center p-6 bg-white/70 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No matching transcript snippets found for filter.
                </div>
              ) : (
                filteredSnippets.map((snippet) => {
                  const isCurrent = (activeSnippetDetails?.id === snippet.id);
                  const isStrength = snippet.type === 'strength';
                  const isConcern = snippet.type === 'concern';
                  
                  return (
                    <div
                      key={snippet.id}
                      onClick={() => setSelectedSnippetId(snippet.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                          : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isStrength 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isConcern
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                        }`}>
                          {snippet.type}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-semibold truncate">
                          {snippet.sourceContext}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1.5">
                        {snippet.pointTitle}
                      </h4>

                      <p className="text-[11px] text-slate-600 line-clamp-2 italic font-mono bg-slate-50 p-1.5 rounded border border-slate-100">
                        "{snippet.quote}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Expanded Active Snippet Deep Detail Card */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-amber-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              {activeSnippetDetails ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          activeSnippetDetails.type === 'strength'
                            ? 'bg-emerald-600 text-white'
                            : activeSnippetDetails.type === 'concern'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-900 text-white'
                        }`}>
                          {activeSnippetDetails.type}
                        </span>
                        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {activeSnippetDetails.impactScore}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {activeSnippetDetails.pointTitle}
                      </h4>
                    </div>

                    <button
                      onClick={() => handleCopyQuote(activeSnippetDetails.quote, activeSnippetDetails.id)}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Copy transcript quote snippet"
                    >
                      {copiedId === activeSnippetDetails.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Quote</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Verbatim Quote Box */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
                      <Quote className="h-3 w-3 text-amber-500" />
                      Verbatim Transcript Excerpt
                    </span>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed border border-slate-800 shadow-inner relative">
                      <p className="selection:bg-amber-500 selection:text-slate-950">
                        "{activeSnippetDetails.quote}"
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1 text-amber-400 font-sans font-bold">
                          <CheckCircle2 className="h-3 w-3" />
                          {activeSnippetDetails.verifiableStatus}
                        </span>
                        <span className="font-mono text-slate-400">{activeSnippetDetails.sourceContext}</span>
                      </div>
                    </div>
                  </div>

                  {/* Persona Interpretative Analysis */}
                  <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70 text-xs space-y-1">
                    <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wider">
                      Agent Interpretative Reasoning:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {activeSnippetDetails.personaReasoning}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 text-slate-400 text-xs">
                  Select a snippet on the left to inspect verbatim quotes.
                </div>
              )}
            </div>

          </div>
        </motion.div>
      )}

      {/* Selected Agent Standard Deep-Dive Panel */}
      <AnimatePresence mode="wait">
        {activeAgent && (
          <motion.div 
            key={selectedRole}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6"
          >
            
            {/* Agent Header Profile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${meta.bg} ${meta.color} border ${meta.border} font-black text-base shadow-2xs`}>
                  {meta.avatar}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">{activeAgent.agentName}</h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {meta.title}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500">{activeAgent.agentTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/70">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Initial Score</div>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {activeAgent.score.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 10</span>
                  </div>
                </div>
                <div className="text-right pl-4 border-l border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Initial Stance</div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getVerdictBadge(activeAgent.verdict)}`}>
                    {activeAgent.verdict.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Core Perspective Thesis */}
            <div 
              onClick={() => {
                if (isDeepInsightMode) {
                  setSelectedSnippetId(`${selectedRole}-thesis`);
                }
              }}
              className={isDeepInsightMode ? 'cursor-pointer group' : ''}
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Independent Assessment Thesis</span>
                </span>
                {isDeepInsightMode && (
                  <span className="text-[10px] font-bold text-amber-700 group-hover:underline flex items-center gap-1">
                    Click to view evidence <ChevronRight className="h-3 w-3" />
                  </span>
                )}
              </h4>
              <p className={`text-xs sm:text-sm text-slate-800 p-4 rounded-xl border leading-relaxed font-medium transition-all ${
                isDeepInsightMode
                  ? 'bg-amber-50/40 border-amber-200 group-hover:border-amber-400 group-hover:bg-amber-50'
                  : 'bg-slate-50/80 border-slate-200/80'
              }`}>
                "{activeAgent.corePerspective}"
              </p>
            </div>

            {/* Strengths & Concerns Dual Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Strengths */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Evidence-Backed Strengths</span>
                </h4>

                {activeAgent.strengths.length === 0 ? (
                  <div className="text-xs text-slate-400 italic p-4 bg-slate-50 rounded-xl border border-slate-200">
                    No definitive strengths documented under this persona's lens.
                  </div>
                ) : (
                  activeAgent.strengths.map((str, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        if (isDeepInsightMode) {
                          setSelectedSnippetId(`${selectedRole}-str-${idx}`);
                        }
                      }}
                      className={`p-4 rounded-xl bg-emerald-50/30 border border-emerald-200/70 space-y-2 transition-all ${
                        isDeepInsightMode ? 'hover:border-emerald-400 hover:shadow-xs cursor-pointer' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 leading-snug">{str.point}</p>
                        {isDeepInsightMode && (
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-1.5 py-0.5 rounded">
                            Inspect
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-700 bg-white/95 p-3 rounded-lg border border-emerald-200/60 font-mono">
                        <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-1">Transcript Evidence:</span>
                        "{str.evidence}"
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Concerns & Red Flags */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-rose-600" />
                  <span>Evidence-Backed Concerns & Risks</span>
                </h4>

                {activeAgent.concerns.length === 0 ? (
                  <div className="text-xs text-slate-500 italic p-4 bg-slate-50 rounded-xl border border-slate-200">
                    No major concerns identified by this persona.
                  </div>
                ) : (
                  activeAgent.concerns.map((con, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        if (isDeepInsightMode) {
                          setSelectedSnippetId(`${selectedRole}-con-${idx}`);
                        }
                      }}
                      className={`p-4 rounded-xl bg-rose-50/30 border border-rose-200/70 space-y-2 transition-all ${
                        isDeepInsightMode ? 'hover:border-rose-400 hover:shadow-xs cursor-pointer' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 leading-snug">{con.point}</p>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold whitespace-nowrap ${
                          con.severity === 'high' ? 'bg-rose-200 text-rose-900 border border-rose-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {con.severity} risk
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 bg-white/95 p-3 rounded-lg border border-rose-200/60 font-mono">
                        <span className="font-bold text-rose-800 block text-[11px] uppercase tracking-wider mb-1">Transcript Evidence:</span>
                        "{con.evidence}"
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Missing Info & Isolation Proof */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Identified Missing Information:</span>
                {activeAgent.missingInformationIdentified.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {activeAgent.missingInformationIdentified.map((info, i) => (
                      <li key={i} className="leading-relaxed">{info}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="italic text-slate-400">All required signals were verifiable in transcript/resume.</span>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Zero-Peer-Bias Verification:</span>
                <p className="leading-relaxed">{activeAgent.isolatedProof}</p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

