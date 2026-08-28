import React from 'react';
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
  ArrowRight
} from 'lucide-react';

interface ProfileBuilderViewProps {
  profile: CandidateProfile;
  onProceedToIndependent: () => void;
}

export const ProfileBuilderView: React.FC<ProfileBuilderViewProps> = ({
  profile,
  onProceedToIndependent,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-lg">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Shared Agent Fact Base
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mt-0.5">{profile.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {profile.yearsOfExperience} Years Experience
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  {profile.education}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onProceedToIndependent}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Inspect 4 Independent Reviews</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-700 bg-slate-50/60 p-3.5 rounded-lg border border-slate-200/50">
          <span className="font-semibold text-slate-900 mr-1.5">Profile Fact-Base Synthesis:</span>
          {profile.summary}
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-indigo-600" />
          <span>Extracted Technical & Applied Capabilities</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Claims Fact-Checking & Verification Matrix */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-indigo-600" />
              <span>Resume Claim vs Transcript Cross-Verification</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated extraction comparing resume bullet claims against admissions during live interview
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {profile.keyClaims.map((item, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border transition-all ${
                item.verifiedInTranscript
                  ? 'bg-emerald-50/30 border-emerald-200/70'
                  : 'bg-amber-50/40 border-amber-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 px-2 py-0.5 bg-white border border-slate-200 rounded">
                      Source: {item.source}
                    </span>
                    {item.verifiedInTranscript ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified in Interview
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
                        Exaggerated or Clarified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm font-semibold text-slate-900">
                    "{item.claim}"
                  </p>

                  {item.evidenceQuote && (
                    <div className="mt-2 text-xs bg-white/90 p-2.5 rounded-lg border border-slate-200 text-slate-700 font-mono">
                      <span className="font-semibold text-slate-900 block mb-1">Transcript Evidence:</span>
                      {item.evidenceQuote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Identified Missing or Unclear Info (Judging Rule Requirement) */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-5 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2 mb-2">
          <HelpCircle className="h-4 w-4 text-slate-600" />
          <span>Unresolved Information Gaps & Missing Telemetry</span>
        </h2>
        <p className="text-xs text-slate-500 mb-3">
          In accordance with competition rules: missing or unverified data points are explicitly tracked rather than fabricated.
        </p>

        <ul className="space-y-2">
          {profile.missingOrUnclearInfo.map((gap, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <span>{gap}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
