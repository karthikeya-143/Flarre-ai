# INSURON AI

> **Intelligent Insurance Investigation Through Connected Evidence.**

**Submitted by:** B. Karthikeya Venkata Durga Amar  
**Institution:** Chaitanya Bharathi Institute of Technology (CBIT)  
**Event:** Flarre AI Innovation Challenge 2026  
**Prototype URL:** [http://localhost:5173/](http://localhost:5173/) (Local development) / Ready for static hosting on Vercel or Firebase.

---

## 1. Executive Summary

Insurance fraud and claim investigation currently require forensic examiners to cross-reference fragmented evidence scattered across First Notices of Loss (FNOL), policy schedules, multi-page municipal fire and police logs, third-party repair estimates, and maintenance warranties. Manually connecting these documents makes it difficult to discover temporal or numerical discordances, trace evidence, and substantiate coverage decisions.

**INSURON AI** solves this by unifying claims, policy clauses, documents, and evidence into an **interactive Knowledge Graph**. The platform leverages:
1. **Deterministic Rule Validation**: Baseline arithmetic and temporal logic (e.g., amount variance, maintenance warranty expiration) with zero hallucination.
2. **Semantic Cross-Document Analysis**: AI-assisted comparison of subjective narrative declarations against objective municipal telemetry.
3. **Traceable Evidence Explorer**: 100% deterministic linking from every flagged inconsistency to exact source paragraphs, page numbers, and SHA-256 hashes.
4. **Conditional Investigation Agent**: A dedicated branch triggered only when unresolved findings require targeted evidentiary retrieval.
5. **Human-in-the-Loop Governance**: Qualified investigators verify findings, request proof, and maintain a legally defensible audit trail.

> **Responsible AI Principle:**  
> *“Structured pipeline first. Investigation agent when needed. Human judgment for final decisions.”*  
> INSURON AI is an assistive intelligence platform. It does not automatically decide whether a claim is approved, denied, or fraudulent.

---

## 2. Technology Stack

- **Frontend Core:** React 18, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS (cyber dark enterprise palette, custom glow shadows, glassmorphism)
- **Knowledge Graph:** `@xyflow/react` (React Flow v12) with custom nodes, handles, glowing edges, and search/category filters
- **Data Visualization:** Recharts for inconsistency category breakdown and dossier status distributions
- **Icons & Motion:** Lucide React, CSS keyframe glows, and transition animations
- **State & Persistence:** Client-side React state synced with `localStorage` for human review actions and audit logs
- **Zero External API Dependency:** Runs out of the box with high-fidelity seeded fictional claims.

---

## 3. Core Capabilities & Architecture

### Four Core Pillars:
- **Connect:** Bring claims, policies, clauses, documents, and evidence into a connected information graph.
- **Investigate:** Combine deterministic checks and semantic analysis to highlight potential inconsistencies and evidentiary gaps.
- **Trace:** Ground every finding with exact sentence citations and cryptographic document hashes.
- **Review:** Empower human forensic adjusters with actionable review decisions and an immutable audit trail.

### Pipeline Architecture:
1. **Authorized Insurance Documents** (PDF / Text Ingestion)
2. **Ingestion & OCR Parsing** (SHA-256 verification, section demarcation)
3. **Fact Extraction** (Atomic claims facts with provenance pointers)
4. **Knowledge Graph Construction** (Multi-relational graph ontology)
5. **Deterministic Rule Validation** (Amount variance, temporal chronology, warranty limits)
6. **Semantic Cross-Document Analysis** (Narrative vs municipal dispatch alignment)
7. **Traceable Evidence Retrieval** (Dual-source citation indexing)
8. **Structured Investigation Report** (Comprehensive evidence dossier)
9. **Human Review & Audit Trail** (Qualified investigator decision execution)

### Conditional Investigation Agent Branch:
*Potential Unresolved Finding → Identify Missing Evidence → Retrieve Authorized Passages → Inspect Graph Neighbors → Verify Versions & Dates → Compare Supporting vs Conflicting Evidence → Return Traceable Findings to Human.*

---

## 4. Key Pages & Features

| View | Purpose |
|------|---------|
| **Overview (Landing Page)** | Cinematic hero section, tagline, interactive knowledge chain, problem statement, 3 key capabilities, and author metadata. |
| **Investigation Dashboard** | Enterprise command center with KPIs, Recharts category breakdown, status donut chart, and filterable claims table. |
| **Connected Knowledge Graph** | Interactive React Flow canvas with 20 entities, 26 relationships, category filters, search, node inspector drawer, and trace path actions. |
| **AI Investigation Workspace** | Deep dive into active claim (`CLM-2026-8941`), featuring a 10-stage animated investigation pipeline runner. |
| **Inconsistency Matrix** | Neutral matrix of flagged potential inconsistencies with severity badges, discrepancy explanations, and clause links. |
| **Evidence Explorer** | Dual-pane document reader with exact highlighted citations, extracted facts, page numbers, and SHA-256 integrity hashes. |
| **AI Architecture** | Interactive SVG/HTML architecture diagram contrasting the main pipeline with the conditional agent branch. |
| **Human-Review Console** | Investigator workspace with working decision controls (*Mark Reviewed*, *Request Evidence*, *Request Investigation*, *Resolve*, *Dismiss*) persisting in `localStorage`. |
| **Document Intake Staging** | Drag-and-drop document upload interface with client staging and file type/size validation. |
| **Investigation Report** | Exportable, printable claims investigation dossier with copy-to-clipboard, PDF print layout, and JSON download. |
| **Audit Trail & Evaluation** | Chronological action timeline and formal proposed pilot evaluation metrics (precision/recall, false-positive rate, examiner agreement). |
| **Product Principles & Roadmap** | 4-pillar methodology and 3-phase strategic roadmap from prototype to enterprise carrier integration. |

---

## 5. Seeded Fictional Cases

1. **Signature Case: `CLM-2026-8941`** — *Apex Commercial Warehouse Structural Fire ($385,000 claimed)*
   - **Numerical Discrepancy:** Claim Form requests $385,000, while the certified third-party contractor estimate calculates $295,000 (unitemized $90,000 variance).
   - **Temporal Conflict:** Fire reported at 02:15 AM on Feb 18; municipal telemetry records sprinkler control valve was padlocked closed at 23:30 PM on Feb 17 (2h 45m prior to ignition).
   - **Warranty Breach (SEC-4.2):** Automatic sprinkler maintenance certificate expired Nov 15, 2024 (over 14 months past the 90-day warranty window).
   - **Missing Evidence:** Absence of certified Origin & Cause (O&C) forensic report required for commercial claims exceeding $250,000.
2. **Case 2: `CLM-2026-4412`** — *Vanguard Fleet Highway Collision ($118,400)*
   - Discrepancy between driver statement (55 MPH) and telematics ECU black box (73.4 MPH).
3. **Case 3: `CLM-2026-6109`** — *Metropolitan Healthcare Inpatient Appendectomy ($64,200)*
   - Billing code modifier discrepancy: Operative notes confirm laparoscopic surgery; billing invoice submitted open appendectomy for ruptured appendix.

---

## 6. Local Setup & Execution

### Prerequisites
- Node.js v18+ (tested on Node v24.11.1)
- npm v9+

### Quickstart
```bash
# Clone or navigate to the project directory
cd Hackthon

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 7. Public Deployment Guide

The project is structured as a static Single Page Application (SPA):
- `dist/` contains the fully bundled HTML, CSS, and JavaScript.
- `vercel.json` contains URL rewrite rules to ensure client-side routes reload cleanly.

### Deploy to Vercel:
```bash
npx vercel
```

### Deploy to Firebase Hosting:
```bash
firebase init hosting
firebase deploy
```

---

## 8. Implemented vs. Simulated Features

- **Fully Functional:**
  - Complete interactive Knowledge Graph with React Flow, node drag, zoom, pan, search, category filters, and node selection.
  - Interactive 10-step simulated AI investigation runner with real-time progress bar.
  - Evidence Explorer with exact sentence highlighting, document switching, and provenance tracking.
  - Human-Review Console with persistent state in `localStorage` and real-time audit log generation.
  - Dossier report generation with clipboard copy, JSON download, and PDF print stylesheet.
  - Recharts dashboard metrics, responsive collapsible sidebar, and full navigation.
- **Simulated / Fictional Demonstration:**
  - Files dropped into the Document Intake interface are staged in browser memory and simulated through extraction (no actual cloud OCR / backend parser).
  - All claims, documents, and policy clauses are fictional demonstration data created specifically for the Flarre AI Challenge.
  - External core insurance integrations (e.g., Guidewire) are architectural roadmaps for future phases.

---

## 9. Submission Identity

- **Platform:** INSURON AI
- **Tagline:** Intelligent Insurance Investigation Through Connected Evidence.
- **Submitted by:** B. Karthikeya Venkata Durga Amar
- **Institution:** Chaitanya Bharathi Institute of Technology (CBIT)
- **Challenge:** Flarre AI Innovation Challenge 2026
