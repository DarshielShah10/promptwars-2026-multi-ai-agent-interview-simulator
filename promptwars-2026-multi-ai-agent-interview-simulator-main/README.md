Multi-Agent AI Interview Panel Simulator
An evidence-grounded, multi-agent hiring committee simulator that evaluates candidate resumes and interview transcripts through isolated expert perspectives, live cross-examination debate, observable stance shifts, and weighted synthesis.
🎯 Overview
Traditional hiring evaluation often suffers from groupthink, halo effects, or unverified claims. This system demonstrates a multi-agent deliberation framework designed to evaluate engineering candidates with adversarial rigor, objective attribution analysis, and transparent decision-making.
Key Personas in the Deliberation Panel
Technical Agent (Dr. Alex Vance — Principal AI Architect): Evaluates architectural depth, model routing, system design choices, failure handling, and engineering rigor.
HR & Culture Agent (Elena Rostova — VP of People & Culture): Evaluates attribution of credit, team psychological safety, tenure stability, and response to mistakes.
Hiring Manager (Marcus Sterling — Director of Engineering): Assesses onboarding runway, immediate team output, on-call readiness, and long-term retention ROI.
Skeptic Agent (Devon Cross — Senior Staff Red-Team Reviewer): Adversarially fact-checks resume metrics against transcript admissions to detect exaggeration or blame-shifting.
✨ Features & Deliberation Pipeline
1. Candidate Dossier & Profile Extraction
Extracts verified technical skills, verified claims, and unverified or contradicted assertions directly from raw interview transcripts and resumes.
Highlights missing or ambiguous information requiring follow-up.
2. Isolated Persona Evaluations (No Early Groupthink)
Each agent independently evaluates the candidate without seeing other agents' assessments.
Generates numeric scores (1.0–10.0), confidence ratings, core perspectives, and evidence-backed strengths and concerns citing exact quotes.
3. Multi-Round Debate & Observable Stance Shifts
Agents challenge each other's assumptions using direct quotes from transcripts and resumes.
Real-time Stance Shift Tracker logs when an agent concedes or revises their score due to evidence presented by peers (e.g., discovering teammate credit misattribution).
4. Evidence-Grounded Executive Decision
A weighted reasoning engine (not a simple arithmetic average) produces a final recommendation (STRONG_HIRE, HIRE, LEAN_HIRE, LEAN_NO_HIRE, NO_HIRE).
Details key strengths, risks, unresolved committee disagreements, and mandatory onboarding conditions.
5. Side-by-Side Candidate Comparison Matrix
Direct side-by-side benchmark comparing candidates across 5 core dimensions:
Multi-Agent Technical Depth
Intellectual Honesty & Integrity
Production Ownership & Reliability
Ramp-Up Speed & Learning Agility
Retention & Team Culture Fit
6. Raw Data & Transcript Drawer
Inspect complete raw job descriptions, full candidate resumes, and unedited interview transcripts at any point during deliberation.
🛠️ Tech Stack
Frontend: React 19, TypeScript, Tailwind CSS v4, Motion (animations), Lucide React (icons)
Backend: Express.js (Node.js runtime with TypeScript)
AI / LLM Integration: Google Gen AI SDK (@google/genai) with Gemini models (gemini-3.1-flash-lite, gemini-3.7-flash)
Build System: Vite, esbuild
🚀 Getting Started
Prerequisites
Node.js 20+ installed
A Gemini API Key from Google AI Studio
Installation
Clone the repository and install dependencies:
code
Bash
npm install
Configure environment variables:
Create a .env file in the project root:
code
Env
GEMINI_API_KEY=your_gemini_api_key_here
Start the development server:
code
Bash
npm run dev
The application will be accessible at http://localhost:3000.
Build for production:
code
Bash
npm run build
npm start
📡 API Endpoints
Endpoint	Method	Description
/api/candidates/all	GET	Returns pre-evaluated dossier, opinions, debate records, and decisions for Candidate A & B.
/api/evaluate/profile	POST	Extracts candidate profile and claim verification from resume and transcript text.
/api/evaluate/independent	POST	Executes isolated evaluations across the 4 panel personas.
/api/evaluate/debate	POST	Generates a 2-round cross-examination debate with evidence-triggered stance shifts.
/api/evaluate/decision	POST	Synthesizes independent opinions and debate shifts into an executive hiring decision.
/api/evaluate/comparison	GET	Generates a 5-dimension head-to-head comparison matrix.
