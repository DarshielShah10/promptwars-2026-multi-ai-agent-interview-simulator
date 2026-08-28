import React, { useState } from 'react';
import { AgentOpinion, AgentRole } from '../types/simulator';
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
  Search
} from 'lucide-react';

interface IndependentAgentsViewProps {
  opinions: Record<AgentRole, AgentOpinion>;
  onProceedToDebate: () => void;
}

export const IndependentAgentsView: React.FC<IndependentAgentsViewProps> = ({
  opinions,
  onProceedToDebate,
}) => {
  const [selectedRole, setSelectedRole] = useState<AgentRole>('technical');

  const agentMeta: Record<AgentRole, { color: string; bg: string; border: string; icon: any; title: string }> = {
    technical: {
      color: 'text-blue-700',
      bg: 'bg-blue-50/50',
      border: 'border-blue-200',
      icon: Code,
      title: 'Technical Depth & Architecture'
    },
    hr_culture: {
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200',
      icon: HeartHandshake,
      title: 'Culture, Teamwork & Integrity'
    },
    hiring_manager: {
      color: 'text-amber-700',
      bg: 'bg-amber-50/50',
      border: 'border-amber-200',
      icon: Briefcase,
      title: 'Role Alignment & Execution'
    },
    skeptic: {
      color: 'text-rose-700',
      bg: 'bg-rose-50/50',
      border: 'border-rose-200',
      icon: AlertCircle,
      title: 'Red-Team Contradiction Audit'
    }
  };

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_HIRE':
        return 'bg-emerald-700 text-white';
      case 'HIRE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'LEAN_HIRE':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'LEAN_NO_HIRE':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'NO_HIRE':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const roles: AgentRole[] = ['technical', 'hr_culture', 'hiring_manager', 'skeptic'];
  const activeAgent = opinions[selectedRole];
  const meta = agentMeta[selectedRole];
  const IconComponent = meta.icon;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Explaining Multi-Agent Isolation */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 text-white">
              <EyeOff className="h-3.5 w-3.5" />
              Isolated Parallel Execution
            </span>
            <span className="text-xs font-medium text-slate-500">
              4 Separate Prompt Invocations • Zero Shared Context
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1.5">
            Rule 2 Compliance: Each agent independently evaluated the candidate without seeing peer evaluations prior to the debate.
          </p>
        </div>

        <button
          onClick={onProceedToDebate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0"
        >
          <span>Convene Live Debate Arena</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 4 Agent Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {roles.map((role) => {
          const agent = opinions[role];
          const m = agentMeta[role];
          const Icon = m.icon;
          const isSelected = selectedRole === role;

          return (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`text-left p-4 rounded-xl border transition-all relative ${
                isSelected
                  ? `bg-white ${m.border} ring-2 ring-indigo-500/20 shadow-sm`
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {agent.score.toFixed(1)}<span className="text-xs font-normal text-slate-400">/10</span>
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-900">{agent.agentName}</h3>
              <p className="text-xs text-slate-500 mb-3">{agent.agentTitle}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getVerdictBadge(agent.verdict)}`}>
                  {agent.verdict.replace('_', ' ')}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {agent.confidence}% Conf.
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Agent Deep-Dive Panel */}
      {activeAgent && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          
          {/* Agent Header Profile */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${meta.bg} ${meta.color} border ${meta.border}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{activeAgent.agentName}</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {meta.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{activeAgent.agentTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Initial Score</div>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {activeAgent.score.toFixed(1)} <span className="text-sm font-normal text-slate-400">/ 10</span>
                </div>
              </div>
              <div className="text-right pl-4 border-l border-slate-100">
                <div className="text-xs text-slate-400 font-medium">Initial Stance</div>
                <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold border mt-0.5 ${getVerdictBadge(activeAgent.verdict)}`}>
                  {activeAgent.verdict.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Core Perspective */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Independent Assessment Thesis
            </h4>
            <p className="text-sm text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed font-medium">
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
                <div className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-lg border border-slate-200">
                  No definitive strengths documented under this persona's lens.
                </div>
              ) : (
                activeAgent.strengths.map((str, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/60 space-y-1.5">
                    <p className="text-xs font-semibold text-slate-900">{str.point}</p>
                    <div className="text-xs text-slate-600 bg-white/90 p-2.5 rounded-lg border border-emerald-100 font-mono">
                      <span className="font-semibold text-emerald-800 block text-[11px] mb-0.5">Citation:</span>
                      {str.evidence}
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
                <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-200">
                  No major concerns identified by this persona.
                </div>
              ) : (
                activeAgent.concerns.map((con, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-900">{con.point}</p>
                      <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                        con.severity === 'high' ? 'bg-rose-200 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {con.severity} risk
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 bg-white/90 p-2.5 rounded-lg border border-rose-100 font-mono">
                      <span className="font-semibold text-rose-800 block text-[11px] mb-0.5">Citation:</span>
                      {con.evidence}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Missing Info & Isolation Proof */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
              <span className="font-semibold text-slate-800 block mb-1">Identified Missing Information:</span>
              {activeAgent.missingInformationIdentified.length > 0 ? (
                <ul className="list-disc list-inside space-y-0.5">
                  {activeAgent.missingInformationIdentified.map((info, i) => (
                    <li key={i}>{info}</li>
                  ))}
                </ul>
              ) : (
                <span className="italic text-slate-400">All required signals were verifiable in transcript/resume.</span>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
              <span className="font-semibold text-slate-800 block mb-1">Isolation & Independence Audit:</span>
              <p>{activeAgent.isolatedProof}</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
