export type AgentRole = 'technical' | 'hr_culture' | 'hiring_manager' | 'skeptic';

export interface EvidenceQuote {
  id: string;
  source: 'resume' | 'transcript';
  quote: string;
  context: string;
  questionNumber?: string;
  verified: boolean;
  notes?: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  yearsOfExperience: number;
  education: string;
  skills: string[];
  keyClaims: Array<{
    claim: string;
    source: string;
    verifiedInTranscript: boolean;
    evidenceQuote?: string;
  }>;
  summary: string;
  missingOrUnclearInfo: string[];
}

export interface AgentOpinion {
  agentRole: AgentRole;
  agentName: string;
  agentTitle: string;
  score: number; // 1 to 10
  confidence: number; // 0 to 100%
  verdict: 'STRONG_HIRE' | 'HIRE' | 'LEAN_HIRE' | 'LEAN_NO_HIRE' | 'NO_HIRE';
  corePerspective: string;
  strengths: Array<{ point: string; evidence: string }>;
  concerns: Array<{ point: string; evidence: string; severity: 'low' | 'medium' | 'high' }>;
  missingInformationIdentified: string[];
  isolatedProof: string; // Explains why this is an independent evaluation
}

export interface DebateMessage {
  id: string;
  round: number;
  speakerRole: AgentRole;
  speakerName: string;
  targetRole?: AgentRole;
  targetName?: string;
  messageType: 'challenge' | 'rebuttal' | 'concession' | 'clarification' | 'synthesis';
  content: string;
  citedQuote: string;
  citedSource: string;
  stanceShiftBefore?: number;
  stanceShiftAfter?: number;
  shiftReason?: string;
}

export interface StanceShift {
  agentRole: AgentRole;
  agentName: string;
  initialScore: number;
  revisedScore: number;
  delta: number;
  triggerMessageId?: string;
  triggerQuote: string;
  reasonForChange: string;
  shiftMomentDescription: string;
}

export interface UnresolvedDisagreement {
  topic: string;
  agentsInvolved: { role: AgentRole; stance: string }[];
  impactOnRole: string;
  mitigationSuggestion: string;
}

export interface FinalDecision {
  candidateId: string;
  candidateName: string;
  finalRecommendation: 'STRONG_HIRE' | 'HIRE' | 'LEAN_HIRE' | 'LEAN_NO_HIRE' | 'NO_HIRE';
  overallConfidence: number; // 0-100%
  weightedScore: number; // 1-10 (calculated via weighted reasoning, not simple arithmetic average)
  scoringBreakdown: {
    technicalWeight: number;
    hrCultureWeight: number;
    hiringManagerWeight: number;
    skepticWeight: number;
    explanation: string;
  };
  executiveSummary: string;
  keyStrengths: string[];
  keyRisksAndConcerns: string[];
  unresolvedDisagreements: UnresolvedDisagreement[];
  hiringConditions: string[]; // e.g. reference checks with Priya, pairing on initial tasks
  missingDataNotes: string[];
}

export interface CandidateComparison {
  summaryVerdict: string;
  recommendedCandidate: string;
  candidateASummary: {
    name: string;
    profileType: string;
    pros: string[];
    cons: string[];
    bestSuitedFor: string;
    finalScore: number;
    recommendation: string;
  };
  candidateBSummary: {
    name: string;
    profileType: string;
    pros: string[];
    cons: string[];
    bestSuitedFor: string;
    finalScore: number;
    recommendation: string;
  };
  dimensionRatings: Array<{
    dimension: string;
    candidateAScore: number;
    candidateBScore: number;
    winner: 'A' | 'B' | 'TIE';
    analysis: string;
  }>;
  keyTakeaway: string;
}

export interface EvaluationState {
  candidateId: string;
  jobDescription: string;
  resumeText: string;
  transcriptText: string;
  profile?: CandidateProfile;
  independentOpinions?: Record<AgentRole, AgentOpinion>;
  debateMessages?: DebateMessage[];
  stanceShifts?: StanceShift[];
  finalDecision?: FinalDecision;
  isLoading: boolean;
  activeStage: 'input' | 'profile' | 'independent' | 'debate' | 'decision' | 'comparison';
  error?: string;
}
