import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  GitBranch, 
  Search, 
  FileCode, 
  Play, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface ArchitectureViewProps {
  onNavigate?: (tab: NavigationTab) => void;
}

interface StageDetail {
  id: string;
  name: string;
  category: 'PIPELINE' | 'AGENT_BRANCH' | 'HUMAN_GOVERNANCE';
  purpose: string;
  inputs: string[];
  outputs: string[];
  deterministic: boolean;
  role: string;
}

const STAGES_DATA: Record<string, StageDetail> = {
  'STAGE-1': {
    id: 'STAGE-1',
    name: 'Authorized Insurance Documents',
    category: 'PIPELINE',
    purpose: 'Cryptographically verify and ingest authorized policy schedules, intake claims, and third-party municipal/contractor PDFs.',
    inputs: ['PDF / Text claims documents', 'SHA-256 integrity hashes'],
    outputs: ['Validated document streams', 'Cryptographic ingestion audit records'],
    deterministic: true,
    role: 'Ensures chain of custody and data provenance before processing.',
  },
  'STAGE-2': {
    id: 'STAGE-2',
    name: 'Document Ingestion & OCR Parsing',
    category: 'PIPELINE',
    purpose: 'Parse multi-page unstructured documents, perform optical character recognition, and segment text into page/section chunks.',
    inputs: ['Raw document binaries', 'Document metadata'],
    outputs: ['Tokenized text blocks', 'Bounding boxes', 'Section demarcations'],
    deterministic: true,
    role: 'Converts unstructured PDFs into structured indexable segments.',
  },
  'STAGE-3': {
    id: 'STAGE-3',
    name: 'Entity & Fact Extraction',
    category: 'PIPELINE',
    purpose: 'Extract verified facts (dates, loss amounts, valve states, serial numbers) with cryptographic page-level provenance pointers.',
    inputs: ['Parsed text segments', 'Insurance entity ontology'],
    outputs: ['Atomic claims facts', 'Confidence scores', 'Character offset citations'],
    deterministic: false,
    role: 'Transforms document passages into structured semantic data points.',
  },
  'STAGE-4': {
    id: 'STAGE-4',
    name: 'Knowledge Graph Construction',
    category: 'PIPELINE',
    purpose: 'Link extracted facts into an interconnected graph ontology connecting Policyholder, Policy, Claim, Clauses, Documents, and Rules.',
    inputs: ['Structured claims facts', 'Underwriting policy schemas'],
    outputs: ['Multi-relational Knowledge Graph (Nodes & Directed Edges)'],
    deterministic: true,
    role: 'Breaks document silos by establishing explicit contextual relationships.',
  },
  'STAGE-5': {
    id: 'STAGE-5',
    name: 'Deterministic Rule Validation',
    category: 'PIPELINE',
    purpose: 'Execute strict arithmetic, temporal, and warranty logic (e.g. variance thresholds, 90-day maintenance certificate validity).',
    inputs: ['Graph entities', 'Insurance business rules'],
    outputs: ['Rule compliance passes', 'Variance flags', 'Breach warnings'],
    deterministic: true,
    role: 'Provides predictable, auditable baseline checks without hallucinations.',
  },
  'STAGE-6': {
    id: 'STAGE-6',
    name: 'AI-Assisted Semantic Analysis',
    category: 'PIPELINE',
    purpose: 'Evaluate textual consistency between narrative descriptions and objective third-party reports (e.g. fire dispatch logs vs intake claims).',
    inputs: ['Narrative passages', 'Cross-document statements'],
    outputs: ['Semantic discordance ratings', 'Contradiction hypotheses'],
    deterministic: false,
    role: 'Detects nuanced discrepancies that cannot be captured by simple arithmetic rules.',
  },
  'STAGE-7': {
    id: 'STAGE-7',
    name: 'Evidence Retrieval & Linking',
    category: 'PIPELINE',
    purpose: 'Retrieve exact source sentences, document IDs, page citations, and SHA-256 hashes that substantiate or contradict every finding.',
    inputs: ['Identified discrepancies', 'Source document index'],
    outputs: ['Evidence packages with dual-source citations'],
    deterministic: true,
    role: 'Guarantees 100% verifiable traceability for every flagged item.',
  },
  'STAGE-8': {
    id: 'STAGE-8',
    name: 'Structured Investigation Report',
    category: 'PIPELINE',
    purpose: 'Synthesize verified facts, graph relationships, conflicting evidence, and policy clause mappings into a structured investigation dossier.',
    inputs: ['Evidence packages', 'Claim summary', 'Rule evaluations'],
    outputs: ['Comprehensive claims investigation report'],
    deterministic: true,
    role: 'Prepares structured evidence for human forensic review.',
  },
  'STAGE-9': {
    id: 'STAGE-9',
    name: 'Human Review & Audit Trail',
    category: 'HUMAN_GOVERNANCE',
    purpose: 'Empower human investigators to verify, question, or dismiss findings, request further evidence, and maintain a legally defensible audit log.',
    inputs: ['Investigation dossier', 'Investigator actions & notes'],
    outputs: ['Reviewed determination actions', 'Immutable audit trail'],
    deterministic: true,
    role: 'Maintains ultimate human authority over all claims decisions.',
  },
  // CONDITIONAL AGENT BRANCH
  'AGENT-1': {
    id: 'AGENT-1',
    name: 'Potential Unresolved Finding',
    category: 'AGENT_BRANCH',
    purpose: 'Triggered conditionally ONLY when deterministic rules surface a complex or ambiguous finding requiring deep investigation.',
    inputs: ['High-severity discrepancy flag', 'Unresolved question tag'],
    outputs: ['Agent investigation trigger event'],
    deterministic: true,
    role: 'Activates conditional autonomous analysis only when necessary.',
  },
  'AGENT-2': {
    id: 'AGENT-2',
    name: 'Identify Missing Evidence',
    category: 'AGENT_BRANCH',
    purpose: 'Detect what documentary proof is missing (e.g. Origin & Cause forensic engineering report or security badge logs).',
    inputs: ['Policy clause proof-of-loss warranties', 'Current dossier state'],
    outputs: ['Missing document checklist'],
    deterministic: true,
    role: 'Identifies evidentiary gaps before drawing conclusions.',
  },
  'AGENT-3': {
    id: 'AGENT-3',
    name: 'Retrieve Authorized Source Passages',
    category: 'AGENT_BRANCH',
    purpose: 'Perform focused deep retrieval across authorized municipal archives and contractor estimates.',
    inputs: ['Targeted semantic queries', 'Authorized document repository'],
    outputs: ['Relevant source text chunks with confidence scores'],
    deterministic: true,
    role: 'Locates pertinent passages across complex multi-page files.',
  },
  'AGENT-4': {
    id: 'AGENT-4',
    name: 'Inspect Related Graph Entities',
    category: 'AGENT_BRANCH',
    purpose: 'Traverse graph neighbor nodes to verify historical policy renewals, previous claims, and contractor credentials.',
    inputs: ['Knowledge Graph sub-graphs', 'Entity identifiers'],
    outputs: ['Corroborated entity paths'],
    deterministic: true,
    role: 'Leverages connected graph structure for contextual intelligence.',
  },
  'AGENT-5': {
    id: 'AGENT-5',
    name: 'Verify Document Versions & Dates',
    category: 'AGENT_BRANCH',
    purpose: 'Cross-check effective dates, inspection dates, and revision versions to detect expired certificates or amended estimates.',
    inputs: ['Document timestamps', 'Policy endorsement schedules'],
    outputs: ['Chronological delta verification'],
    deterministic: true,
    role: 'Eliminates temporal confusion and expired document reliance.',
  },
  'AGENT-6': {
    id: 'AGENT-6',
    name: 'Compare Supporting & Conflicting Evidence',
    category: 'AGENT_BRANCH',
    purpose: 'Synthesize contradictory statements (e.g. 23:30 PM valve shutoff vs 02:15 AM fire ignition) into an objective comparison card.',
    inputs: ['Affirming facts', 'Contradicting facts'],
    outputs: ['Side-by-side contradiction matrix with uncertainty scores'],
    deterministic: false,
    role: 'Provides balanced, objective analysis without making biased accusations.',
  },
  'AGENT-7': {
    id: 'AGENT-7',
    name: 'Return Traceable Findings to Human',
    category: 'AGENT_BRANCH',
    purpose: 'Format findings with direct document citations and hand over immediately to the human review console.',
    inputs: ['Synthesized investigation package'],
    outputs: ['Actionable human review item with full provenance'],
    deterministic: true,
    role: 'Hands all agent findings back to qualified human investigator.',
  },
};

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onNavigate }) => {
  const [selectedStageId, setSelectedStageId] = useState<string>('STAGE-4');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const selectedStage = STAGES_DATA[selectedStageId] || STAGES_DATA['STAGE-4'];

  const startSimulation = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);

    const stageKeys = Object.keys(STAGES_DATA);
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      if (idx < stageKeys.length) {
        setActiveStepIndex(idx);
        setSelectedStageId(stageKeys[idx]);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 800);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyber-violet/20 border border-cyber-violet/40 text-violet-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              INSURON AI Architecture & Agent Workflow
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Hybrid deterministic pipeline + conditional investigation agent + human governance
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className="px-4 py-2 rounded-lg bg-cyber-cyan text-navy-950 font-bold text-xs hover:bg-white transition-all flex items-center gap-2 shadow-glow-cyan disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isSimulating ? 'Animating Data Flow...' : 'Simulate Architecture Flow'}
          </button>
        </div>
      </div>

      {/* Prominent Architectural Principle Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-cyber-cyan/30 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-cyber-cyan font-bold block">
              Core Architectural Tenet:
            </span>
            <p className="text-sm font-bold text-white italic tracking-wide">
              “Structured pipeline first. Investigation agent when needed. Human judgment for final decisions.”
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-navy-950 px-3 py-1.5 rounded-lg border border-white/5">
          Zero Hallucination Tolerance
        </span>
      </div>

      {/* Main Interactive Diagram & Inspection Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive Diagram Visualization (8 cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/15 space-y-8 shadow-2xl">
          
          {/* Section 1: Main Deterministic Pipeline (Electric Cyan / Blue) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyber-cyan uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
                Main Structured Pipeline (Deterministic & Predictable)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Stages 1 to 9</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'STAGE-1', name: '1. Authorized Documents', sub: 'PDF / Text Source Ingestion', icon: FileText },
                { id: 'STAGE-2', name: '2. Ingestion & OCR', sub: 'Parsing & SHA-256 Hashing', icon: FileCode },
                { id: 'STAGE-3', name: '3. Fact Extraction', sub: 'Provenance & Offset Tagging', icon: Search },
                { id: 'STAGE-4', name: '4. Knowledge Graph', sub: 'Entity-Relationship Construction', icon: Layers },
                { id: 'STAGE-5', name: '5. Deterministic Rules', sub: 'Amount & Warranty Checks', icon: ShieldCheck },
                { id: 'STAGE-6', name: '6. Semantic Analysis', sub: 'Cross-Document Alignment', icon: Sparkles },
                { id: 'STAGE-7', name: '7. Evidence Retrieval', sub: 'Exact Passage Citation Index', icon: Search },
                { id: 'STAGE-8', name: '8. Investigation Dossier', sub: 'Structured Evidence Report', icon: FileText },
                { id: 'STAGE-9', name: '9. Human Review & Audit', sub: 'Investigator Verification & Audit', icon: UserCheck },
              ].map(st => {
                const isSelected = selectedStageId === st.id;
                const Icon = st.icon;

                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStageId(st.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-navy-900 border-cyber-cyan shadow-glow-cyan/50 scale-[1.02]'
                        : 'bg-navy-950/70 border-white/10 hover:border-white/20 hover:bg-navy-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-cyber-cyan' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold text-white truncate">{st.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">{st.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flow Connector Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="w-full border-t border-dashed border-violet-500/30" />
            <span className="absolute px-3 py-1 bg-navy-950 border border-violet-500/40 rounded-full text-[10px] font-mono font-semibold text-violet-300 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-violet-400" />
              Conditional Investigation Branch (Triggered only when discrepancy flagged)
            </span>
          </div>

          {/* Section 2: Conditional Violet Investigation Agent Branch */}
          <div className="space-y-3 p-4 rounded-xl bg-violet-950/15 border border-violet-800/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                Conditional Investigation Agent Branch
              </span>
              <span className="text-[10px] text-violet-300/80 font-mono">Agent Stages 1 to 7</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'AGENT-1', name: 'Potential Unresolved Finding', sub: 'Discrepancy Trigger Event' },
                { id: 'AGENT-2', name: 'Identify Missing Evidence', sub: 'Proof-of-Loss Gap Detection' },
                { id: 'AGENT-3', name: 'Retrieve Authorized Passages', sub: 'Targeted Multi-Page Retrieval' },
                { id: 'AGENT-4', name: 'Inspect Related Graph Entities', sub: 'Ontology Traversal & Neighbors' },
                { id: 'AGENT-5', name: 'Verify Versions & Dates', sub: 'Chronological Delta Checks' },
                { id: 'AGENT-6', name: 'Compare Supporting & Conflicting', sub: 'Balanced Contradiction Matrix' },
                { id: 'AGENT-7', name: 'Return Traceable Findings', sub: 'Handoff to Human Review' },
              ].map(st => {
                const isSelected = selectedStageId === st.id;

                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStageId(st.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-violet-950/50 border-violet-400 shadow-glow-violet scale-[1.02]'
                        : 'bg-navy-950/60 border-violet-900/40 hover:border-violet-600/60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-violet-300' : 'text-violet-500'}`} />
                      <span className="text-xs font-bold text-violet-100 truncate">{st.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">{st.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Stage Deep-Dive Inspector Card (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/15 space-y-4 shadow-2xl">
          <div className="flex items-start justify-between pb-3 border-b border-white/10">
            <div>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                selectedStage.category === 'AGENT_BRANCH' ? 'bg-violet-950 text-violet-300 border border-violet-800' :
                selectedStage.category === 'HUMAN_GOVERNANCE' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                'bg-cyan-950 text-cyan-300 border border-cyan-800'
              }`}>
                {selectedStage.category.replace(/_/g, ' ')}
              </span>
              <h3 className="text-sm font-bold text-white mt-2 leading-snug">
                {selectedStage.name}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-navy-950 px-2 py-1 rounded border border-white/10">
              {selectedStage.id}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
              Purpose & Objective:
            </span>
            <p className="text-xs text-slate-200 leading-relaxed bg-navy-950/70 p-3 rounded-xl border border-white/5">
              {selectedStage.purpose}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
              Inputs:
            </span>
            <ul className="space-y-1">
              {selectedStage.inputs.map((inp, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5 bg-navy-900/60 p-2 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shrink-0" />
                  {inp}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
              Outputs:
            </span>
            <ul className="space-y-1">
              {selectedStage.outputs.map((out, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5 bg-navy-900/60 p-2 rounded-lg border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {out}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-navy-950 p-2.5 rounded-lg border border-white/5">
              <span className="text-[9px] uppercase font-mono text-slate-400 block">Execution Nature</span>
              <span className={`font-bold font-mono text-xs ${selectedStage.deterministic ? 'text-cyber-cyan' : 'text-violet-400'}`}>
                {selectedStage.deterministic ? 'Deterministic Logic' : 'Semantic AI Assisted'}
              </span>
            </div>
            <div className="bg-navy-950 p-2.5 rounded-lg border border-white/5">
              <span className="text-[9px] uppercase font-mono text-slate-400 block">Governance</span>
              <span className="font-bold text-white text-xs font-mono">Audit Logged</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
