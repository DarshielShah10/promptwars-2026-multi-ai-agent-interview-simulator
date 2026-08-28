import { describe, it, expect } from 'vitest';
import {
  JOB_DESCRIPTION,
  RESUME_A_TEXT,
  TRANSCRIPT_A_TEXT,
  RESUME_B_TEXT,
  TRANSCRIPT_B_TEXT,
} from '../data/defaultCandidates';
import {
  CandidateProfile,
  AgentOpinion,
  DebateMessage,
  StanceShift,
  FinalDecision,
  CandidateComparison,
} from '../types/simulator';

describe('Multi-AI Agent Interview Simulator - Data & Logic Validation', () => {
  it('should verify job description has required logistics & agent context', () => {
    expect(JOB_DESCRIPTION).toContain('Senior AI/Backend Engineer');
    expect(JOB_DESCRIPTION).toContain('Voltrix Logistics Tech');
    expect(JOB_DESCRIPTION).toContain('planner/executor/reviewer');
  });

  it('should load Candidate A (Rohan Malhotra) default profile data', () => {
    expect(RESUME_A_TEXT).toContain('Rohan Malhotra');
    expect(TRANSCRIPT_A_TEXT).toContain('sole architect');
    expect(TRANSCRIPT_A_TEXT).toContain('Priya');
  });

  it('should load Candidate B (Ananya Iyer) default profile data', () => {
    expect(RESUME_B_TEXT).toContain('Ananya Iyer');
    expect(TRANSCRIPT_B_TEXT).toContain('support-ticket assistant');
    expect(TRANSCRIPT_B_TEXT).toContain('retro');
  });

  it('should compute weighted decision score with custom multi-agent weights', () => {
    const technicalScore = 8.5;
    const hrCultureScore = 6.0;
    const hiringManagerScore = 7.0;
    const skepticScore = 5.0;

    const weights = {
      technicalWeight: 0.35,
      hrCultureWeight: 0.20,
      hiringManagerWeight: 0.25,
      skepticWeight: 0.20,
    };

    const weightedScore =
      technicalScore * weights.technicalWeight +
      hrCultureScore * weights.hrCultureWeight +
      hiringManagerScore * weights.hiringManagerWeight +
      skepticScore * weights.skepticWeight;

    expect(weightedScore).toBeCloseTo(6.925, 2);
    expect(weightedScore).toBeGreaterThanOrEqual(1.0);
    expect(weightedScore).toBeLessThanOrEqual(10.0);
  });

  it('should accurately calculate stance shift delta and identify significant shifts', () => {
    const shift: StanceShift = {
      agentRole: 'technical',
      agentName: 'Sarah Jenkins (Tech Lead)',
      initialScore: 8.5,
      revisedScore: 6.5,
      delta: -2.0,
      triggerQuote: 'I led the design, she built most of the production version.',
      reasonForChange: 'Candidate conceded to not being sole architect after Skeptic cross-examination.',
      shiftMomentDescription: 'Concession in Round 2 regarding implementation ownership.',
    };

    expect(shift.delta).toBe(shift.revisedScore - shift.initialScore);
    expect(Math.abs(shift.delta)).toBeGreaterThanOrEqual(1.0);
    expect(shift.triggerQuote).toBeTruthy();
  });

  it('should correctly format and validate structured deliberation challenge messages', () => {
    const challenge: DebateMessage = {
      id: 'deb-msg-1',
      round: 1,
      speakerRole: 'skeptic',
      speakerName: 'Marcus Vance (Critical Skeptic)',
      targetRole: 'technical',
      targetName: 'Sarah Jenkins (Tech Lead)',
      messageType: 'challenge',
      content: 'Technical Lead is overvaluing the claimed architecture without verifying actual production implementation ownership.',
      citedQuote: 'Your resume says sole architect, but Priya built a lot of it.',
      citedSource: 'Transcript Q7',
      stanceShiftBefore: 8.5,
      stanceShiftAfter: 7.0,
      shiftReason: 'Initial skepticism raised regarding claim inflation.',
    };

    expect(challenge.messageType).toBe('challenge');
    expect(challenge.citedSource).toContain('Transcript');
    expect(challenge.citedQuote.length).toBeGreaterThan(10);
  });

  it('should structure Final Decision synthesis with all required hiring conditions', () => {
    const mockDecision: FinalDecision = {
      candidateId: 'cand-a',
      candidateName: 'Rohan Malhotra',
      finalRecommendation: 'LEAN_HIRE',
      overallConfidence: 82,
      weightedScore: 6.8,
      scoringBreakdown: {
        technicalWeight: 0.35,
        hrCultureWeight: 0.20,
        hiringManagerWeight: 0.25,
        skepticWeight: 0.20,
        explanation: 'Weighted technical expertise adjusted for resume ownership gap.',
      },
      executiveSummary: 'Strong technical knowledge in agent graph architectures with manageable culture risks.',
      keyStrengths: ['Multi-agent architecture experience', 'Fast ramp-up capability'],
      keyRisksAndConcerns: ['Overstated sole ownership in resume', 'Short tenures'],
      unresolvedDisagreements: [
        {
          topic: 'Production Ownership vs Resume Inflation',
          agentsInvolved: [
            { role: 'technical', stance: 'High technical execution capability' },
            { role: 'skeptic', stance: 'Integrity flag on sole architect claim' },
          ],
          impactOnRole: 'May require close oversight on code ownership and team credit.',
          mitigationSuggestion: 'Conduct detailed 360 reference check with prior engineering peer.',
        },
      ],
      hiringConditions: [
        'Mandatory reference check with engineering peer (Priya) at Voltrix.',
        'Initial 90-day milestone pairing with Staff Engineer on core graph orchestrator.',
      ],
      missingDataNotes: ['Exact production exception volume not independently verified.'],
    };

    expect(mockDecision.finalRecommendation).toBe('LEAN_HIRE');
    expect(mockDecision.hiringConditions.length).toBe(2);
    expect(mockDecision.unresolvedDisagreements.length).toBe(1);
  });
});
