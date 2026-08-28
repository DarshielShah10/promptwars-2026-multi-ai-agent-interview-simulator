import React, { useState } from 'react';
import { CandidateProfile } from '../types/simulator';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  Tag, 
  FileCheck, 
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Quote,
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileBuilderViewProps {
  profile: CandidateProfile;
  onProceedToIndependent: () => void;
}

export const ProfileBuilderView: React.FC<ProfileBuilderViewProps> = ({
  profile,
  onProceedToIndependent,
}) => {
  const [claimFilter, setClaimFilter] = useState<'all' | 'verified' | 'flagged'>('all');

  const verifiedCount = profile.keyClaims.filter(c => c.verifiedInTranscript).length;
  const flaggedCount = profile.keyClaims.filter(c => !c.verifiedInTranscript).length;

  const filteredClaims = profile.keyClaims.filter(item => {
    if (claimFilter === 'verified') return item.verifiedInTranscript;
    if (claimFilter === 'flagged') return !item.verifiedInTranscript;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      
      {/* Header Profile Dossier Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-50/50 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex items-center justify-center font-black text-xl shadow-xs border border-slate-800">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                  Structured Dossier
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">{profile.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{profile.yearsOfExperience} Years Experience</span>
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  <span>{profile.education}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onProceedToIndependent}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold shadow-xs hover:shadow-indigo-500/20 hover:shadow-md transition-all cursor-pointer"
            >
              <span>View 4 Isolated Agent Reviews</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Fact-Base Summary */}
        <div className="mt-5 pt-4 border-t border-slate-100 bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Shared Fact-Base Synthesis</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {profile.summary}
          </p>
        </div>
      </div>

      {/* Extracted Skills & Core Competencies */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Tag className="h-4 w-4 text-indigo-600" />
            <span>Extracted Skills & Verified Capabilities</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {profile.skills.length} Capabilities Indexed
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Claims Fact-Checking & Verification Matrix */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-indigo-600" />
              <span>Resume Claim vs. Transcript Cross-Verification</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated line-by-line audit comparing resume assertions against interview responses
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setClaimFilter('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                claimFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({profile.keyClaims.length})
            </button>
            <button
              onClick={() => setClaimFilter('verified')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                claimFilter === 'verified'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              Verified ({verifiedCount})
            </button>
            <button
              onClick={() => setClaimFilter('flagged')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                claimFilter === 'flagged'
                  ? 'bg-white text-rose-800 shadow-xs'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              Disputed ({flaggedCount})
            </button>
          </div>
        </div>

        <div className="space-y-3.5">
          <AnimatePresence>
            {filteredClaims.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className={`p-4 rounded-xl border transition-all ${
                  item.verifiedInTranscript
                    ? 'bg-emerald-50/20 border-emerald-200/80 hover:border-emerald-300'
                    : 'bg-rose-50/20 border-rose-200/80 hover:border-rose-300'
                }`}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500 px-2 py-0.5 bg-white border border-slate-200 rounded uppercase tracking-wider">
                        Source: {item.source}
                      </span>
                      {item.verifiedInTranscript ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Verified in Interview
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-300">
                          <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                          Contradicted / Exaggerated Claim
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    "{item.claim}"
                  </p>

                  {item.evidenceQuote && (
                    <div className="mt-2 text-xs bg-white/90 p-3 rounded-lg border border-slate-200/80 text-slate-800">
                      <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                        <Quote className="h-3 w-3 text-indigo-500" />
                        <span>Transcript Cross-Reference Quote:</span>
                      </div>
                      <p className="font-mono text-xs text-slate-700 italic bg-slate-50/80 p-2 rounded border border-slate-100">
                        "{item.evidenceQuote}"
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Identified Missing or Unclear Info (Judging Rule Requirement) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-slate-600" />
            <span>Unresolved Information Gaps & Audit Trace</span>
          </h2>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
            Strict Non-Fabrication Rule
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          All 4 agents operate under zero-speculation mandates. Missing or ambiguous telemetry is explicitly flagged below:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {profile.missingOrUnclearInfo.map((gap, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 mt-1 shrink-0" />
              <span className="font-medium leading-relaxed">{gap}</span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

