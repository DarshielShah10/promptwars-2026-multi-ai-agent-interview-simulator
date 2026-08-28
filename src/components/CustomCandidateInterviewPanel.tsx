import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  FileText, 
  Sparkles, 
  MessageSquare, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Bot, 
  ShieldAlert, 
  Award, 
  Clock, 
  Send,
  HelpCircle,
  Code2,
  BrainCircuit,
  Sliders
} from 'lucide-react';
import { CustomCandidateInput, InterviewQuestion } from '../types/simulator';

interface Props {
  onStartCustomEvaluation: (candidateData: {
    candidateId: string;
    candidateName: string;
    jobDescription: string;
    resumeText: string;
    transcriptText: string;
  }) => void;
  isLoading: boolean;
}

const PRESET_ROLES = [
  {
    title: 'Senior AI / Agentic Systems Engineer',
    jd: `Seeking a Senior AI Engineer to design and deploy resilient multi-agent orchestration systems, autonomous LangGraph workflows, and scalable SLM routing pipelines. Must demonstrate production evaluation rigor, blameless incident resolution, and high ownership.`
  },
  {
    title: 'Principal Backend & Distributed Systems Engineer',
    jd: `Looking for a Principal Backend Engineer with deep mastery of async messaging queues, high-throughput microservices, Redis caching hierarchies, and fault-tolerant retry architectures handling 20,000+ RPS.`
  },
  {
    title: 'Full-Stack Product Engineer (AI/ML)',
    jd: `Seeking a high-velocity Full-Stack Engineer with React, TypeScript, Node.js, and GenAI SDK integration experience. Responsible for building end-to-end user features with low latency and rigorous UX polish.`
  }
];

const SAMPLE_PROFILES = [
  {
    name: 'Darshiel Shah',
    title: 'Senior AI Systems Engineer',
    exp: 5,
    education: 'B.Tech in Computer Science & Engineering',
    skills: 'Python, TypeScript, LangChain, Multi-Agent Systems, FastEmbed, Redis, Docker, PyTest, CI/CD',
    resume: `DARSHIEL SHAH — Senior AI Systems Engineer
EXPERIENCE:
- Lead AI Developer @ QuantumLogic (2023 - Present):
  * Architected autonomous multi-agent task routing system handling 1.2M daily workflows with 99.4% task completion rate.
  * Implemented defensive fallback handlers, section-based semantic chunking, and dynamic model routing (GPT-4o to Llama-3.1-8B), reducing API latency by 35% and token spend by 48%.
  * Instituted rigorous evaluation suites with 300+ golden test cases and automated regression CI.
- Backend Software Engineer @ NovaCore Tech (2021 - 2023):
  * Built distributed event pipelines using Node.js, TypeScript, RabbitMQ, and PostgreSQL.
  * Designed circuit-breaker patterns and graceful degradation mechanisms during high-concurrency peak events.`
  },
  {
    name: 'Vikram Mehta',
    title: 'Principal Distributed Systems Engineer',
    exp: 8,
    education: 'M.S. in Computer Science',
    skills: 'Go, Java, Kubernetes, Distributed Consensus, Kafka, Postgres, System Architecture, On-Call Lead',
    resume: `VIKRAM MEHTA — Principal Distributed Systems Engineer
EXPERIENCE:
- Principal Systems Engineer @ Apex Scale Cloud (2020 - Present):
  * Designed partitioned event ingestion pipeline scaling to 50k RPS with sub-80ms p99 latency.
  * Authored runbooks, led blameless postmortems, and mentored 8 engineers across 3 distributed teams.`
  }
];

export const CustomCandidateInterviewPanel: React.FC<Props> = ({
  onStartCustomEvaluation,
  isLoading
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'interview' | 'transcript'>('profile');
  
  // Profile State
  const [candidateName, setCandidateName] = useState('Darshiel Shah');
  const [targetRole, setTargetRole] = useState('Senior AI / Agentic Systems Engineer');
  const [yearsExp, setYearsExp] = useState(5);
  const [education, setEducation] = useState('B.Tech in Computer Science');
  const [keySkills, setKeySkills] = useState('Python, TypeScript, Multi-Agent Architecture, PyTest, Redis, Docker');
  const [jobDescription, setJobDescription] = useState(PRESET_ROLES[0].jd);
  const [resumeText, setResumeText] = useState(SAMPLE_PROFILES[0].resume);

  // Interview Mode State
  const [interviewMode, setInterviewMode] = useState<'live_qa' | 'auto_simulate' | 'paste_transcript'>('live_qa');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isSimulatingAnswers, setIsSimulatingAnswers] = useState(false);
  const [customTranscript, setCustomTranscript] = useState('');

  // 1. Generate Targeted Questions via API
  const handleGenerateQuestions = async () => {
    setIsGeneratingQuestions(true);
    try {
      const res = await fetch('/api/interview/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName,
          jobTitle: targetRole,
          jobDescription,
          resumeText
        })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setActiveTab('interview');
        setCurrentQuestionIndex(0);
      }
    } catch (err) {
      console.error('Failed to generate questions', err);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // 2. Simulate AI Answers for all questions in one click
  const handleSimulateAllAnswers = async () => {
    if (questions.length === 0) {
      await handleGenerateQuestions();
    }
    setIsSimulatingAnswers(true);
    try {
      const qList = questions.length > 0 ? questions : [
        { id: 'q1', interviewerRole: 'technical', interviewerName: 'Dr. Alex Vance', category: 'Architecture', questionText: 'Describe your multi-agent architecture and retry policies.', evaluationFocus: 'System design' },
        { id: 'q2', interviewerRole: 'hr_culture', interviewerName: 'Elena Rostova', category: 'Integrity', questionText: 'Tell us about a time you handled a production bug or outage.', evaluationFocus: 'Honesty and accountability' },
        { id: 'q3', interviewerRole: 'hiring_manager', interviewerName: 'Marcus Sterling', category: 'Onboarding', questionText: 'How will you structure your first 30 days to ship value safely?', evaluationFocus: 'Ramp-up speed' },
        { id: 'q4', interviewerRole: 'skeptic', interviewerName: 'Devon Cross', category: 'Fact Check', questionText: 'What is the biggest operational limitation in your past project?', evaluationFocus: 'Self-awareness' },
        { id: 'q5', interviewerRole: 'technical', interviewerName: 'Panel Synthesis', category: 'Trade-offs', questionText: 'How do you balance latency vs evaluation accuracy under high load?', evaluationFocus: 'Incident response' }
      ];

      const res = await fetch('/api/interview/simulate-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName,
          resumeText,
          questions: qList
        })
      });
      const data = await res.json();
      if (data.answers) {
        const ansMap: Record<string, string> = {};
        data.answers.forEach((a: any) => {
          ansMap[a.questionId] = a.answerText;
        });
        setAnswers(ansMap);
      }
    } catch (err) {
      console.error('Failed to simulate answers', err);
    } finally {
      setIsSimulatingAnswers(false);
    }
  };

  // Build full transcript string
  const compileTranscript = (): string => {
    if (interviewMode === 'paste_transcript' && customTranscript.trim()) {
      return customTranscript.trim();
    }

    if (questions.length === 0) {
      return `Q1 [Dr. Alex Vance - Technical Architecture]: Could you explain your system architecture and error handling?\nCandidate ${candidateName}: I designed decoupled modular services with retry semantics and telemetry logging.\n\nQ2 [Elena Rostova - Integrity & Culture]: Tell us about an incident or mistake you owned.\nCandidate ${candidateName}: I documented an anomalous parser bug in our postmortem and instituted regression tests.\n\nQ3 [Marcus Sterling - Delivery]: How do you onboard?\nCandidate ${candidateName}: I pair on existing codebases and review runbooks before proposing changes.\n\nQ4 [Devon Cross - Skeptic Fact Check]: What was the system's biggest bottleneck?\nCandidate ${candidateName}: Synchronous indexing was a limitation, which we solved via asynchronous streaming.`;
    }

    return questions
      .map((q, idx) => {
        const ans = answers[q.id] || answers[`q${idx + 1}`] || `I handled this by designing decoupled services with automated tests, structured logging, and blameless retrospectives.`;
        return `Q${idx + 1} [${q.interviewerName} — ${q.category}]:\n"${q.questionText}"\n\n[Candidate ${candidateName} Answer]:\n"${ans}"\n`;
      })
      .join('\n----------------------------------------\n\n');
  };

  // Handle final submission to pipeline
  const handleSubmitEvaluation = () => {
    const finalTranscript = compileTranscript();
    onStartCustomEvaluation({
      candidateId: `custom_${candidateName.toLowerCase().replace(/\s+/g, '_')}_${Date.now().toString().slice(-4)}`,
      candidateName: candidateName.trim() || 'Candidate',
      jobDescription: jobDescription.trim() || PRESET_ROLES[0].jd,
      resumeText: resumeText.trim() || SAMPLE_PROFILES[0].resume,
      transcriptText: finalTranscript
    });
  };

  const loadPresetCandidate = (p: typeof SAMPLE_PROFILES[0]) => {
    setCandidateName(p.name);
    setTargetRole(p.title);
    setYearsExp(p.exp);
    setEducation(p.education);
    setKeySkills(p.skills);
    setResumeText(p.resume);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden mb-8" id="custom-candidate-panel">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 px-6 py-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <User className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">
              Interactive Candidate Intake & Live Interview Portal
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Input candidate credentials, generate customized panel questions, record or simulate live interview answers, and trigger the autonomous 4-agent hiring deliberation.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden lg:inline">Quick Fill:</span>
          {SAMPLE_PROFILES.map((p, i) => (
            <button
              key={i}
              id={`preset-btn-${i}`}
              onClick={() => loadPresetCandidate(p)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition font-medium"
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 px-6">
        <button
          id="tab-profile"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition ${
            activeTab === 'profile'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          1. Candidate Profile & Resume
        </button>

        <button
          id="tab-interview"
          onClick={() => {
            if (questions.length === 0) handleGenerateQuestions();
            setActiveTab('interview');
          }}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition ${
            activeTab === 'interview'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          2. Live Interview Session ({questions.length > 0 ? `${questions.length} Questions` : 'Ready'})
        </button>

        <button
          id="tab-transcript"
          onClick={() => setActiveTab('transcript')}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 text-sm font-semibold transition ${
            activeTab === 'transcript'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          3. Deliberation Transcript Preview
        </button>
      </div>

      {/* TAB 1: Profile & Resume Input */}
      {activeTab === 'profile' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Candidate Info Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <User className="w-4 h-4" /> Candidate Identity & Background
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  id="candidate-name-input"
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Darshiel Shah"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Experience</label>
                  <input
                    id="candidate-exp-input"
                    type="number"
                    value={yearsExp}
                    onChange={(e) => setYearsExp(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    min={0}
                    max={40}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Education</label>
                  <input
                    id="candidate-edu-input"
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. B.Tech Computer Science"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Technical Skills & Frameworks</label>
                <input
                  id="candidate-skills-input"
                  type="text"
                  value={keySkills}
                  onChange={(e) => setKeySkills(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Python, LangGraph, Redis, PostgreSQL, PyTest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex justify-between items-center">
                  <span>Resume / Experience Summary</span>
                  <span className="text-[11px] text-slate-500">Include achievements and metrics</span>
                </label>
                <textarea
                  id="candidate-resume-input"
                  rows={6}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  placeholder="Paste candidate work history, roles, key metrics, and claims..."
                />
              </div>
            </div>

            {/* Target Role & Job Description Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Target Job Role & Benchmarks
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Position Title</label>
                <input
                  id="target-role-input"
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Senior AI Systems Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preset Role Templates</label>
                <div className="grid grid-cols-1 gap-2">
                  {PRESET_ROLES.map((role, idx) => (
                    <button
                      key={idx}
                      id={`preset-role-${idx}`}
                      onClick={() => {
                        setTargetRole(role.title);
                        setJobDescription(role.jd);
                      }}
                      className={`text-left p-2.5 rounded-lg border text-xs transition ${
                        targetRole === role.title
                          ? 'border-sky-500 bg-sky-500/10 text-sky-200'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-semibold text-slate-200">{role.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{role.jd}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Description & Evaluation Criteria</label>
                <textarea
                  id="job-desc-input"
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-sky-500 leading-relaxed"
                  placeholder="Paste the target job description requirements..."
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-400">
              Ready to conduct the multi-agent interview with Alex Vance, Elena Rostova, Marcus Sterling, and Devon Cross.
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                id="generate-interview-btn"
                onClick={handleGenerateQuestions}
                disabled={isGeneratingQuestions}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-sm transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
              >
                {isGeneratingQuestions ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Panel Questions
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Live Interview Session */}
      {activeTab === 'interview' && (
        <div className="p-6 space-y-6">
          {/* Mode Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Interview Mode:</span>
              <button
                id="mode-live-qa"
                onClick={() => setInterviewMode('live_qa')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition ${
                  interviewMode === 'live_qa'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Interactive Q&A
              </button>
              <button
                id="mode-auto-simulate"
                onClick={() => {
                  setInterviewMode('auto_simulate');
                  handleSimulateAllAnswers();
                }}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition ${
                  interviewMode === 'auto_simulate'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Auto-Simulate with AI
              </button>
              <button
                id="mode-paste-transcript"
                onClick={() => setInterviewMode('paste_transcript')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition ${
                  interviewMode === 'paste_transcript'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Paste Full Transcript
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="auto-fill-all-answers-btn"
                onClick={handleSimulateAllAnswers}
                disabled={isSimulatingAnswers}
                className="text-xs px-3 py-1.5 bg-sky-900/60 hover:bg-sky-800/80 text-sky-200 border border-sky-700/50 rounded-md font-medium flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isSimulatingAnswers ? 'Synthesizing...' : 'AI Auto-Fill Answers'}
              </button>

              <button
                id="regenerate-questions-btn"
                onClick={handleGenerateQuestions}
                disabled={isGeneratingQuestions}
                className="text-xs px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md font-medium flex items-center gap-1 transition"
                title="Regenerate questions"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingQuestions ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {interviewMode === 'paste_transcript' ? (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Paste Complete Interview Transcript (Format: Q1 [Interviewer]: ... \n Candidate: ...)
              </label>
              <textarea
                id="pasted-transcript-area"
                rows={12}
                value={customTranscript}
                onChange={(e) => setCustomTranscript(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed"
                placeholder="Paste the full conversation text between interviewers and candidate..."
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Question Navigation Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {(questions.length > 0 ? questions : [
                  { id: 'q1', interviewerName: 'Dr. Alex Vance', category: 'Architecture' },
                  { id: 'q2', interviewerName: 'Elena Rostova', category: 'Integrity' },
                  { id: 'q3', interviewerName: 'Marcus Sterling', category: 'Delivery' },
                  { id: 'q4', interviewerName: 'Devon Cross', category: 'Fact Check' },
                  { id: 'q5', interviewerName: 'Panel Synthesis', category: 'Trade-offs' }
                ]).map((q, idx) => {
                  const hasAnswer = Boolean(answers[q.id] || answers[`q${idx + 1}`]);
                  return (
                    <button
                      key={idx}
                      id={`question-nav-${idx}`}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition whitespace-nowrap ${
                        currentQuestionIndex === idx
                          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
                          : hasAnswer
                          ? 'border-emerald-700/50 bg-emerald-950/30 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {hasAnswer ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                      )}
                      Question {idx + 1}: {q.category}
                    </button>
                  );
                })}
              </div>

              {/* Active Question Card */}
              {questions.length > 0 && questions[currentQuestionIndex] ? (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-indigo-900/60 border border-indigo-700/40 text-indigo-300 text-xs font-semibold">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Interviewer: <strong className="text-slate-200">{questions[currentQuestionIndex].interviewerName}</strong>
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Focus: {questions[currentQuestionIndex].category}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 border border-indigo-900/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-slate-100 leading-relaxed">
                      "{questions[currentQuestionIndex].questionText}"
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 italic flex items-center gap-1.5">
                      <HelpCircle className="w-3 h-3 text-indigo-400" />
                      {questions[currentQuestionIndex].evaluationFocus}
                    </p>
                  </div>

                  {/* Candidate Answer Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        Candidate's Response ({candidateName})
                      </label>
                      <span className="text-[11px] text-slate-500">
                        {answers[questions[currentQuestionIndex].id]?.length || 0} characters
                      </span>
                    </div>

                    <textarea
                      id={`answer-input-${questions[currentQuestionIndex].id}`}
                      rows={4}
                      value={answers[questions[currentQuestionIndex].id] || ''}
                      onChange={(e) => {
                        setAnswers({
                          ...answers,
                          [questions[currentQuestionIndex].id]: e.target.value
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                      placeholder="Type the candidate's answer to this question, explaining specific architectural decisions, telemetry, error handling, and honest learnings..."
                    />
                  </div>

                  {/* Pagination Buttons */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      id="prev-question-btn"
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
                    >
                      ← Previous Question
                    </button>

                    {currentQuestionIndex < questions.length - 1 ? (
                      <button
                        id="next-question-btn"
                        onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow"
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        id="preview-transcript-btn"
                        onClick={() => setActiveTab('transcript')}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Compile Transcript
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-950 rounded-xl border border-slate-800">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-400 mb-2" />
                  <p className="text-sm text-slate-300">Generating interview questions tailored to {candidateName}...</p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Call to Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={() => setActiveTab('profile')}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              ← Back to Profile
            </button>

            <button
              id="proceed-to-evaluation-btn"
              onClick={handleSubmitEvaluation}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white rounded-lg font-bold text-sm shadow-xl shadow-indigo-600/30 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Evaluating Candidate...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Launch 4-Agent Deliberation & Final Decision
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Transcript Preview & Deliberation Trigger */}
      {activeTab === 'transcript' && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Compiled Interview Transcript for Panel Review
            </h3>
            <span className="text-xs text-slate-400">
              Candidate: <strong className="text-slate-200">{candidateName}</strong> ({targetRole})
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto pr-2">
              {compileTranscript()}
            </pre>
          </div>

          {/* Pipeline stages reminder */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 font-semibold">Stage 1</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Profile & Claims Extraction</div>
              <div className="text-[10px] text-slate-500 mt-1">Cross-checks resume against transcript</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 font-semibold">Stage 2</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Independent Opinions</div>
              <div className="text-[10px] text-slate-500 mt-1">4 isolated agent reviews & Deep Insights</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 font-semibold">Stage 3</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Multi-Agent Debate Arena</div>
              <div className="text-[10px] text-slate-500 mt-1">Cross-examinations & dynamic stance shifts</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 font-semibold">Stage 4</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">Final Decision Synthesis</div>
              <div className="text-[10px] text-slate-500 mt-1">Weighted scoring, risks & hire conditions</div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <button
              onClick={() => setActiveTab('interview')}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              ← Edit Interview Answers
            </button>

            <button
              id="start-custom-pipeline-btn"
              onClick={handleSubmitEvaluation}
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 via-indigo-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white rounded-xl font-bold text-base shadow-xl shadow-indigo-600/30 transition disabled:opacity-50 transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Running Deliberation Pipeline...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  Start Multi-Agent Committee Evaluation
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
