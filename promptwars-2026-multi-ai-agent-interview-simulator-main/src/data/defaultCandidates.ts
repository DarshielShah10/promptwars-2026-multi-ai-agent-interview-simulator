export const JOB_DESCRIPTION = `Job Title: Senior AI/Backend Engineer
Company: Voltrix Logistics Tech
Location: Hybrid / Remote

About the Role:
We are seeking a Senior AI/Backend Engineer to lead our multi-agent logistics exception-handling engine. You will design, build, and maintain production LLM pipelines, autonomous agent workflows (planner/executor/reviewer architectures), and high-throughput Python/FastAPI microservices.

Key Responsibilities:
• Build and optimize robust multi-agent orchestration systems (LangGraph, CrewAI, or custom graph engines) that handle thousands of freight exceptions daily.
• Implement cost-effective model routing (GPT-4, Claude, and open-weight SLMs) and prompt engineering with strict evaluation benchmarks.
• Own end-to-end production reliability, observability, and participate in on-call rotations for critical agent failure loops.
• Foster high engineering standards, thorough code reviews, transparent post-mortems, and collaborative teamwork.

Requirements:
• 3+ years of professional backend engineering experience with strong Python and FastAPI depth.
• Proven track record architecting and shipping LLM/agent pipelines in production (not just toy projects or demos).
• Deep understanding of agent failure patterns, retry loops, evaluation sets, and latency/cost trade-offs.
• High ownership, intellectual honesty, transparent communication, and ability to thrive in a fast-paced environment.`;

export const RESUME_A_TEXT = `Rohan Malhotra
Senior AI/Backend Engineer

Summary:
AI engineer with 3.5 years of experience building multi-agent LLM systems and Python backends. Led design of a production agent platform now handling thousands of daily freight exceptions. Known for moving fast and shipping under pressure.

Experience:
Senior AI Engineer — Voltrix Logistics Tech (Jan 2025 – Present, 7 months)
• Designed and built the exception-handling engine end-to-end for Voltrix’s multi-agent freight ops platform (planner/executor/reviewer pattern), cutting manual exception review time by 40%.
• Owned prompt design and model routing across GPT-4 and open-weight SLMs, reducing inference cost by ~30%.
• Sole architect of the retry/escalation logic now running in production, handling 5,000+ freight exceptions/month.
• Presented the system design at a company-wide tech talk.

AI Engineer — Quickship Data Systems (Feb 2024 – Dec 2024, 11 months)
• Built a RAG pipeline over carrier rate documents using LangChain + Pinecone, cutting manual rate lookup time significantly.
• Improved BOL/invoice extraction accuracy through better OCR pre-processing.

Backend Developer — Nimbus Cloud Solutions (Aug 2022 – Jan 2024, 1.5 years)
• Built Python microservices for a SaaS analytics product used by 50+ enterprise clients.
• Led a 4-person team migrating a legacy monolith to microservices.

Skills:
Python, FastAPI, LangGraph, CrewAI, MongoDB, React (basic), RAG, Vector Search (Pinecone, FAISS), Prompt Engineering, Docker, Kubernetes

Education:
B.Tech Computer Science, 2022

Certifications:
• LangChain for LLM Application Development (2024)`;

export const TRANSCRIPT_A_TEXT = `Interview Transcript — Candidate A (Rohan Malhotra)

Technical Section
Q1 (Interviewer): Walk me through the exception-handling engine you built at Voltrix.
A1: It’s planner-executor-reviewer. Failures come in, get classified, retried or escalated, then double-checked. I designed the whole retry/escalation logic.
Q2: What made you choose that structure over a simpler rule-based system?
A2: Rules don’t scale. Too many failure types — timeouts, bad EDI, missing BOL fields. Agents handle that better.
Q3: How do you measure whether the reviewer agent is actually catching real problems?
A3: We track override rate. It’s low. I’d have to check the exact number though, haven’t looked recently.
Q4: What’s your approach to model routing?
A4: Cost-based. Simple stuff to the SLM, harder reasoning to GPT-4. No formal study, just tuned it as things broke.

Behavioral Section
Q5 (Interviewer): Tell me about a time you disagreed with a teammate on a technical decision.
A5: Teammate wanted to hardcode more categories up front. I pushed for the agent approach. We went with mine.
Q6: Who actually wrote the retry/escalation logic that’s in production now?
A6: I designed it. Priya did a lot of the implementation, I reviewed her PRs. I was the architect.
Q7 (Skeptic follow-up): Your resume says “sole architect.” But it sounds like Priya built a lot of it. Can you clarify?
A7: Fine — “sole architect” is probably too strong. I led the design, she built most of the production version.

Ownership / Hiring Manager Section
Q8: Why should we invest in ramping you up here versus someone with more freight-domain experience?
A8: I move fast. I’ve built something structurally close to this already. I don’t think I’d need much ramp time.
Q9: This role needs long-term ownership of production reliability. How do you feel about being on-call for agent failures?
A9: Fine, I’ve done on-call before. Though Voltrix’s user base is still small, so I haven’t seen serious incident volume yet.
Q10: You’ve had three roles in 3.5 years, each under a year except the first. What’s driving that?
A10: Better pay and title, mostly. Voltrix is more aligned with what I want long-term.`;

export const RESUME_B_TEXT = `Ananya Iyer
Software Engineer (Backend → AI)

Summary:
Backend engineer with steady experience maintaining internal tools, recently moved into applied AI work. Comfortable with Python and standard web APIs; still building depth in AI-specific tooling.

Experience:
Software Engineer II — Bridgepoint Systems (Jun 2021 – Present, 4 years)
• Maintains Python/FastAPI microservices for an internal ops platform used by a few internal teams.
• Helped migrate part of the document ingestion pipeline to use OCR-based extraction for scanned forms.
• Over the last 1.5 years, started building an internal RAG-based support-ticket assistant: set up a retrieval pipeline (LangChain + Chroma); team estimated answer accuracy improved by around 40% based on informal review.
• After a production incident (see interview), introduced a pre-deploy checklist for prompt changes that the team adopted.

Junior Backend Developer — Bridgepoint Systems (Jul 2019 – Jun 2021, 2 years)
• Built basic REST APIs for internal tooling.
• Worked with QA and product to define API contracts.

Skills:
Python, FastAPI, MongoDB, PostgreSQL, LangChain, Chroma, basic React, OCR pipelines (Tesseract), Docker

Education:
B.E. Information Technology, 2019

Note:
Has not used multi-agent orchestration frameworks (LangGraph, CrewAI, AutoGen) in production — most LLM work to date has been a single-agent RAG pipeline.`;

export const TRANSCRIPT_B_TEXT = `Interview Transcript — Candidate B (Ananya Iyer)

Technical Section
Q1 (Interviewer): Tell me about the RAG pipeline you built for the support-ticket assistant.
A1: Sure — happy to walk through it step by step. We retrieve from a Chroma vector store built from past resolved tickets and internal docs. The top few matches get passed to the LLM, which drafts a response for a human agent to review before it goes out. We chunked documents by section rather than fixed length, since that kept related context together.
Q2: Your resume mentions a ~40% accuracy improvement. How was that measured?
A2: I want to be upfront about this — it was based on internal review, not a formal benchmark. A few of us spot-checked a sample of responses before and after the change and it felt clearly better, but I wouldn’t want to present that number as something rigorous if it comes up again.
Q3: Have you worked with multi-agent orchestration frameworks — LangGraph, CrewAI?
A3: Not in production. I’ve read through the docs for both and built a small planner/executor toy project on my own time, but everything I’ve actually shipped has been single-agent RAG. That’s a real gap relative to what this role needs, and I’d rather say that clearly than talk around it.
Q4: How would you approach ramping up on multi-agent systems specifically?
A4: I’d start by reading through your existing planner/executor/reviewer code directly, rather than a general course, since the real failure patterns usually aren’t in the docs. Then I’d want to pair with someone on a small bug fix first, before touching the architecture itself.

Behavioral Section
Q5 (Interviewer): Tell me about a mistake you made and how you handled it.
A5: I pushed a prompt change to the support assistant straight to production — we didn’t have a review process at the time, so nothing stopped me. It caused a spike in bad responses for about two hours before we caught it and rolled back.
Q6: What did you do after that?
A6: A few things. First, I ran an incident retro with the team and was direct that it was my mistake in the writeup — I didn’t want to soften that. Second, I proposed a pre-deploy checklist for prompt changes: a lightweight review step plus a small eval set to run before anything ships. It’s been part of our process since.
Q7 (Skeptic follow-up): Was there any pushback on you owning that mistake publicly, or did you find a way to spread the responsibility?
A7: No, I named it as mine in the retro doc. One teammate pointed out we should’ve had the checklist before this happened, which is fair — but I didn’t try to shift blame for the specific incident onto the process gap.

Ownership / Hiring Manager Section
Q8: This role is heavily oriented around multi-agent orchestration on day one. Given you haven’t shipped that in production, how do you think about that gap?
A8: It’s real, and I’d rather you go in with clear eyes about it than find out later. What I’d point to instead is a pattern: I’ve picked up new technical areas quickly before — OCR pipelines, then RAG — and I tend to ask for help early instead of quietly struggling, which I think matters more for ramp time than having already touched this exact framework.
Q9: Why should we invest in ramping you up here versus someone who already has multi-agent experience?
A9: Honestly, I can’t out-argue someone who’s already done the exact work. What I’d say is I’m a safer bet on the production-ownership side — I’ve been through a real incident and changed how the team works because of it, not just shipped something that looked good in a demo.
Q10: You’ve been at one company for six years. Any concern about adapting to a fast-moving startup environment?
A10: It’s a fair thing to ask about. I’d say the role itself changed a lot even though the employer didn’t — I went from junior backend work, to leading a pipeline migration, to driving our team’s move into AI. So I’ve had to keep adapting, just inside one company.`;
