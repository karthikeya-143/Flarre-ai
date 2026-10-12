import React, { useState, useEffect } from 'react';
import { 
  mockClaim1Findings, 
  mockClaims, 
  mockClaim1Documents, 
  mockClauses 
} from '../../data/mockData';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Layers, 
  Eye, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Cpu
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab, targetId?: string) => void;
}

const DEMO_STAGES = [
  { id: 1, title: 'Loading Claim & Multi-Source Documents', desc: 'Ingested FNOL, Fire Dept Log, Contractor Estimate, and Maintenance Cert.' },
  { id: 2, title: 'Structured Fact Identification & Bounding', desc: 'Identified timestamps, claimed sums, valve state records, and NFPA dates.' },
  { id: 3, title: 'Knowledge Graph Relationship Construction', desc: 'Linked Policyholder → Policy → Claim → Clauses → Documents → Facts.' },
  { id: 4, title: 'Deterministic Policy & Variance Checks', desc: 'Evaluated 10% amount variance threshold and 90-day warranty rule.' },
  { id: 5, title: 'Potential Inconsistencies Detection', desc: 'Surfaced $90K discrepancy, pre-fire valve closure, and expired certificate.' },
  { id: 6, title: 'Evidence Retrieval & Provenance Linking', desc: 'Indexed exact page paragraphs and SHA-256 hashes for all 4 findings.' },
  { id: 7, title: 'Interactive Graph Highlighting', desc: 'Updated graph topology and connected evidence relationship paths.' },
  { id: 8, title: 'Investigation Dossier Synthesis', desc: 'Drafted evidence-linked report with unresolved verification questions.' },
  { id: 9, title: 'Human Review Queue Dispatch', desc: 'Transferred findings to Forensic Investigator workstation for review.' },
];

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && currentStep === 0 && !isRunning && !isFinished) {
      runDemoSimulation();
    }
  }, [isOpen]);

  const runDemoSimulation = () => {
    setIsRunning(true);
    setIsFinished(false);
    setCurrentStep(1);

    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      if (step <= DEMO_STAGES.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsFinished(true);
      }
    }, 750);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setIsFinished(false);
    runDemoSimulation();
  };

  if (!isOpen) return null;

  const targetClaim = mockClaims[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-navy-900 border border-cyber-cyan/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-navy-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                INSURON AI End-to-End Investigation Demo
                <span className="text-[10px] bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 px-2 py-0.5 rounded-full font-mono">
                  Live Simulation
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Automated traversal of claim CLM-2026-8941 across graph, rules, and evidence
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Progress Bar & Stage Tracker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold font-mono">
                {isFinished 
                  ? '✓ Investigation Simulation Complete' 
                  : `Stage ${currentStep} of ${DEMO_STAGES.length}: ${DEMO_STAGES[currentStep - 1]?.title || 'Starting'}`
                }
              </span>
              <span className="text-cyber-cyan font-mono font-bold">
                {Math.round((currentStep / DEMO_STAGES.length) * 100)}%
              </span>
            </div>

            <div className="w-full bg-navy-950 h-2 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-cyber-cyan to-violet-500 transition-all duration-300 shadow-glow-cyan"
                style={{ width: `${(currentStep / DEMO_STAGES.length) * 100}%` }}
              />
            </div>

            {/* Stages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              {DEMO_STAGES.map((st, idx) => {
                const isPast = idx + 1 < currentStep || isFinished;
                const isCurrent = idx + 1 === currentStep && isRunning;
                return (
                  <div
                    key={st.id}
                    className={`p-2.5 rounded-xl border text-[11px] transition-all flex items-start gap-2 ${
                      isCurrent
                        ? 'bg-violet-950/40 border-violet-400 shadow-glow-violet scale-[1.02]'
                        : isPast
                        ? 'bg-navy-950/80 border-emerald-500/30 text-slate-200'
                        : 'bg-navy-950/40 border-white/5 opacity-40'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isPast ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isCurrent ? (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[9px] font-mono text-slate-500">
                          {st.id}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-semibold truncate ${
                        isCurrent ? 'text-violet-200' : isPast ? 'text-white' : 'text-slate-400'
                      }`}>
                        {st.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Dossier Panel (Shown when finished or running) */}
          <div className="p-5 rounded-2xl bg-navy-950/70 border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Investigated Claim</span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {targetClaim.claimNumber} • {targetClaim.policyholderName}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Claimed Loss</span>
                <span className="text-sm font-bold text-white font-mono">
                  ${targetClaim.claimedAmount.toLocaleString()} USD
                </span>
              </div>
            </div>

            {/* Findings preview */}
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Detected Inconsistencies for Human Review ({mockClaim1Findings.length})
              </span>

              <div className="space-y-2">
                {mockClaim1Findings.map(find => (
                  <div key={find.id} className="p-3 rounded-xl bg-navy-900/80 border border-white/10 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-cyber-cyan">{find.id}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                          {find.category.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[9px] font-mono text-amber-400 font-bold">
                          {find.severity} PRIORITY
                        </span>
                      </div>
                      <h4 className="font-semibold text-white leading-snug">{find.title}</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                        {find.discrepancyExplanation}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onNavigate('evidence', find.id);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-navy-950 border border-cyber-cyan/40 text-cyber-cyan text-xs font-semibold hover:bg-cyber-cyan/10 shrink-0 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Trace
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-navy-950/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Deterministic demo simulation • Fictional records only</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-navy-900 border border-white/15 text-slate-300 text-xs font-semibold hover:text-white flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Re-run Demo
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigate('graph', targetClaim.id);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-navy-800 border border-cyber-cyan/40 text-cyber-cyan text-xs font-semibold hover:bg-cyber-cyan/10 flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              Open Knowledge Graph
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigate('review', targetClaim.findings[0]?.id);
              }}
              className="px-4 py-1.5 rounded-lg bg-cyber-cyan text-navy-950 text-xs font-bold hover:bg-white flex items-center gap-1.5 shadow-glow-cyan"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Open Review Console
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
