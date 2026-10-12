import React, { useState } from 'react';
import { 
  mockClaims, 
  mockPolicies, 
  mockClauses, 
  mockClaim1Documents, 
  mockClaim1Findings 
} from '../../data/mockData';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Shield, 
  Layers, 
  Eye, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Clock,
  Building,
  DollarSign
} from 'lucide-react';
import { NavigationTab, Claim } from '../../types';

interface WorkspaceViewProps {
  onNavigate?: (tab: NavigationTab, targetId?: string) => void;
  selectedClaimId?: string;
}

const INVESTIGATION_STAGES = [
  { id: 1, title: 'Claim & File Ingestion', desc: 'Loading verified claim dossier and intake narrative.' },
  { id: 2, title: 'Document Parsing & OCR', desc: 'Parsing 4 multi-format PDFs, verifying cryptographic hashes.' },
  { id: 3, title: 'Structured Fact Extraction', desc: 'Extracting timestamps, damage scopes, and valve logs.' },
  { id: 4, title: 'Knowledge Graph Construction', desc: 'Instantiating 18 entities and 24 semantic relationship edges.' },
  { id: 5, title: 'Deterministic Rule Evaluation', desc: 'Checking numerical variance and 90-day maintenance warranty.' },
  { id: 6, title: 'Semantic Cross-Document Analysis', desc: 'Comparing FNOL narrative against municipal fire dispatch records.' },
  { id: 7, title: 'Inconsistency Flagging', desc: 'Identified 4 potential inconsistencies across amount, date, and warranty.' },
  { id: 8, title: 'Traceable Evidence Retrieval', desc: 'Linking findings to exact page numbers and textual citations.' },
  { id: 9, title: 'Investigation Dossier Generation', desc: 'Synthesizing evidence-backed investigation report with audit hash.' },
  { id: 10, title: 'Human Review Console Handoff', desc: 'Routing findings to forensic investigator queue for human verification.' },
];

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({ 
  onNavigate, 
  selectedClaimId = 'CLM-2026-8941' 
}) => {
  const [activeClaimId, setActiveClaimId] = useState<string>(selectedClaimId);
  const activeClaim: Claim = mockClaims.find(c => c.id === activeClaimId) || mockClaims[0];
  const activePolicy = mockPolicies.find(p => p.id === activeClaim.policyId) || mockPolicies[0];

  // Investigation Simulation State
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const startInvestigationDemo = () => {
    setIsRunning(true);
    setIsCompleted(false);
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step <= INVESTIGATION_STAGES.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsCompleted(true);
      }
    }, 700);
  };

  const resetInvestigation = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setCurrentStepIndex(0);
  };

  const progressPercent = isCompleted ? 100 : Math.round((currentStepIndex / INVESTIGATION_STAGES.length) * 100);

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Top Banner with Simulation Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyber-violet/20 border border-cyber-violet/40 text-cyber-violet">
              <Cpu className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              AI Investigation Workspace
            </h1>
            <span className="text-[10px] bg-violet-950 text-violet-300 border border-violet-800 px-2 py-0.5 rounded-full font-mono">
              Agent Workflow & Consistency Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic rule validation • Semantic conflict detection • Graph-connected fact extraction
          </p>
        </div>

        {/* Claim Selector & Demo Action */}
        <div className="flex items-center gap-3">
          <select
            value={activeClaimId}
            onChange={(e) => {
              setActiveClaimId(e.target.value);
              resetInvestigation();
            }}
            className="bg-navy-900 border border-white/15 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-cyber-cyan font-mono"
          >
            {mockClaims.map(c => (
              <option key={c.id} value={c.id}>
                {c.claimNumber} ({c.category})
              </option>
            ))}
          </select>

          {!isRunning && !isCompleted && (
            <button
              onClick={startInvestigationDemo}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-blue-500 text-navy-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-glow-cyan"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Investigation
            </button>
          )}

          {isRunning && (
            <div className="px-4 py-2 rounded-lg bg-violet-950/80 border border-violet-500 text-violet-300 font-bold text-xs flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Simulating Workflow ({progressPercent}%)
            </div>
          )}

          {isCompleted && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate && onNavigate('report', activeClaim.id)}
                className="px-4 py-2 rounded-lg bg-cyber-cyan text-navy-950 font-bold text-xs hover:bg-white transition-all flex items-center gap-2 shadow-glow-cyan"
              >
                <FileText className="w-4 h-4" />
                View Dossier Report
              </button>
              <button
                onClick={resetInvestigation}
                title="Reset simulation"
                className="p-2 rounded-lg bg-navy-900 border border-white/15 text-slate-300 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulation Transparency Disclaimer */}
      <div className="p-3 bg-navy-900/60 rounded-xl border border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
          <span>
            <strong className="text-white">Hackathon Prototype Mode:</strong> Fictional demonstration powered by deterministic rule logic and seeded sample records. No external LLM or production database connection.
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">
          Deterministic Verification: Active
        </span>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Claim Details & Dossier (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Claim Summary Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-cyber-cyan">
                {activeClaim.claimNumber}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                activeClaim.priority === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {activeClaim.priority} PRIORITY
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {activeClaim.policyholderName}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {activeClaim.reportedDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-navy-950/60 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block">Claimed Loss</span>
                <span className="text-sm font-bold text-white font-mono">
                  ${activeClaim.claimedAmount.toLocaleString()}
                </span>
              </div>
              <div className="bg-navy-950/60 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 block">Incident Date</span>
                <span className="text-xs font-semibold text-white font-mono">
                  {activeClaim.incidentDate.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Policy Info */}
            <div className="p-3 bg-navy-900/80 rounded-xl border border-white/10 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-[10px]">POLICY NUMBER:</span>
                <span className="text-cyan-400 font-mono font-semibold">{activePolicy.policyNumber}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-[10px]">COVERAGE LIMIT:</span>
                <span className="text-white font-mono">${(activePolicy.coverageLimit / 1000000).toFixed(1)}M USD</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-[10px]">DEDUCTIBLE:</span>
                <span className="text-white font-mono">${activePolicy.deductible.toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Link to Knowledge Graph */}
            <button
              onClick={() => onNavigate && onNavigate('graph', activeClaim.id)}
              className="w-full py-2 px-3 rounded-lg bg-navy-900 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold hover:bg-cyber-cyan/10 transition-colors flex items-center justify-center gap-2"
            >
              <Layers className="w-3.5 h-3.5" />
              Inspect Claim in Knowledge Graph
            </button>
          </div>

          {/* Associated Documents Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyber-cyan" />
                Submitted Files ({mockClaim1Documents.length})
              </span>
              <button 
                onClick={() => onNavigate && onNavigate('evidence')}
                className="text-[10px] text-cyber-cyan hover:underline"
              >
                Open Explorer
              </button>
            </h3>

            <div className="space-y-2">
              {mockClaim1Documents.map(doc => (
                <div key={doc.id} className="p-2.5 rounded-xl bg-navy-950/60 border border-white/5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-medium text-white truncate text-xs">{doc.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{doc.fileName}</p>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 shrink-0">
                    {doc.passages.length} facts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Investigation Pipeline & Findings (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Workflow Execution Stage Tracker */}
          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyber-cyan" />
                  Deterministic Investigation Pipeline
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Phase-gated execution with traceable evidence indexing
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-cyber-cyan">{progressPercent}% Completed</span>
                <div className="w-32 bg-navy-950 rounded-full h-1.5 mt-1 border border-white/10 overflow-hidden">
                  <div 
                    className="bg-cyber-cyan h-full transition-all duration-300 shadow-glow-cyan"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
              {INVESTIGATION_STAGES.map((st, idx) => {
                const isPast = (idx + 1) < currentStepIndex || isCompleted;
                const isCurrent = (idx + 1) === currentStepIndex && isRunning;
                const isFuture = (idx + 1) > currentStepIndex && !isCompleted;

                return (
                  <div
                    key={st.id}
                    className={`p-2.5 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-violet-950/40 border-violet-400 shadow-glow-violet scale-[1.02]'
                        : isPast
                        ? 'bg-navy-900/80 border-emerald-500/30 text-slate-200'
                        : 'bg-navy-950/40 border-white/5 opacity-50'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isPast ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[9px] font-mono text-slate-400">
                          {st.id}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-semibold text-xs leading-snug ${
                        isCurrent ? 'text-violet-200' : isPast ? 'text-white' : 'text-slate-400'
                      }`}>
                        {st.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed line-clamp-1">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Potential Inconsistencies Detected */}
          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Identified Potential Inconsistencies ({mockClaim1Findings.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('findings')}
                className="text-xs text-cyber-cyan hover:underline flex items-center gap-1 font-semibold"
              >
                Open Full Findings Matrix <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {mockClaim1Findings.map(find => (
                <div 
                  key={find.id}
                  className="p-4 rounded-xl bg-navy-900/80 border border-white/10 hover:border-cyber-cyan/40 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        {find.category.replace(/_/g, ' ')}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1.5 leading-snug">
                        {find.title}
                      </h4>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                      find.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      find.severity === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {find.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {find.summary}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-slate-400">
                      Status: <strong className="text-amber-400">{find.status.replace(/_/g, ' ')}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate && onNavigate('evidence', find.id)}
                        className="px-2.5 py-1 rounded bg-navy-950 border border-cyber-cyan/30 text-cyber-cyan text-[11px] font-semibold hover:bg-cyber-cyan/10 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Trace Evidence
                      </button>
                      <button
                        onClick={() => onNavigate && onNavigate('review', find.id)}
                        className="px-2.5 py-1 rounded bg-cyber-cyan text-navy-950 text-[11px] font-bold hover:bg-white transition-colors flex items-center gap-1"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
