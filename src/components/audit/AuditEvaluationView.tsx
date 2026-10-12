import React from 'react';
import { 
  mockAuditTrail, 
  mockClaim1Findings, 
  mockClaims 
} from '../../data/mockData';
import { 
  History, 
  BarChart2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck, 
  UserCheck, 
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { NavigationTab, AuditEvent } from '../../types';

interface AuditEvaluationViewProps {
  onNavigate?: (tab: NavigationTab) => void;
  auditEvents?: AuditEvent[];
}

export const AuditEvaluationView: React.FC<AuditEvaluationViewProps> = ({ 
  onNavigate, 
  auditEvents = mockAuditTrail 
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <History className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Audit Trail & Evaluation Framework
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Immutable chronological action timeline • Proposed enterprise pilot evaluation criteria
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Log Integrity: 100% Verifiable</span>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Chronological Audit Trail (6 cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-white/15 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyber-cyan" />
              Chronological Audit Trail ({auditEvents.length} Events)
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Deterministic Ingestion & Human Actions
            </span>
          </div>

          <div className="space-y-3">
            {auditEvents.map((evt, idx) => (
              <div 
                key={evt.id}
                className="p-3.5 rounded-xl bg-navy-900/60 border border-white/5 space-y-1.5 text-xs hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-cyber-cyan">{evt.id}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-navy-950 text-slate-300 border border-white/10">
                      {evt.eventType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{evt.timestamp}</span>
                </div>

                <p className="text-slate-200 leading-snug">
                  {evt.description}
                </p>

                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Actor: <strong className="text-slate-300">{evt.actor}</strong></span>
                  <span>Target: {evt.claimId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Proposed Pilot Evaluation Framework (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-violet-400" />
                Proposed Pilot Evaluation Metrics
              </h3>
              <span className="text-[10px] bg-violet-950 text-violet-300 border border-violet-800 px-2 py-0.5 rounded font-mono">
                Pilot Framework
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              To evaluate INSURON AI in future enterprise carrier pilots, the following objective criteria are proposed to benchmark investigative efficiency, precision, and human agreement:
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  metric: 'Finding Precision & Recall',
                  desc: 'Proportion of flagged inconsistencies confirmed as actionable vs dismissed by qualified examiners in double-blind testing.',
                  target: 'Target: >85% Precision on structured warranties',
                },
                {
                  metric: 'False-Positive Rate',
                  desc: 'Frequency of benign variances flagged incorrectly. Minimizing investigator noise and alert fatigue.',
                  target: 'Target: <12% False Positive Rate',
                },
                {
                  metric: 'Evidence-Link Accuracy',
                  desc: 'Accuracy of character offset bounding and page references in linking findings back to exact source sentences.',
                  target: 'Target: 100% Deterministic Provenance',
                },
                {
                  metric: 'Investigative Triage Time',
                  desc: 'Reduction in examiner hours required to cross-reference multi-party logs (e.g. fire logs vs intake declarations).',
                  target: 'Benchmark: Measure pre vs post pilot elapsed time',
                },
                {
                  metric: 'Human Examiner Agreement',
                  desc: 'Inter-annotator concordance between senior forensic adjusters and INSURON AI suggested verification steps.',
                  target: 'Target: >90% Agreement on requested documents',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-navy-950/70 border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{item.metric}</span>
                    <span className="text-[10px] font-mono text-cyber-cyan">{item.target}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-navy-900 border border-white/10 text-[11px] text-slate-400">
              <strong className="text-white block mb-0.5">Note on Hackathon Metrics:</strong>
              These criteria represent a proposed formal evaluation framework for future carrier pilots, not historical or production achieved results.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
