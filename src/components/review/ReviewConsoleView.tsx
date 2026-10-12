import React, { useState, useEffect } from 'react';
import { 
  mockClaim1Findings, 
  mockClaims, 
  mockClaim1Documents, 
  mockClauses,
  mockAuditTrail 
} from '../../data/mockData';
import { 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  HelpCircle, 
  Send, 
  History, 
  Layers, 
  UserCheck, 
  Eye, 
  RotateCcw,
  PlusCircle,
  Clock,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Finding, ReviewAction, FindingStatus, NavigationTab, AuditEvent } from '../../types';

interface ReviewConsoleProps {
  onNavigate?: (tab: NavigationTab, targetId?: string) => void;
  targetFindingId?: string | null;
  onAuditLogged?: (event: AuditEvent) => void;
}

export const ReviewConsoleView: React.FC<ReviewConsoleProps> = ({ 
  onNavigate, 
  targetFindingId,
  onAuditLogged 
}) => {
  // Local storage persisted findings state
  const [findings, setFindings] = useState<Finding[]>(() => {
    const saved = localStorage.getItem('insuron_findings_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved findings', e);
      }
    }
    return mockClaim1Findings;
  });

  // Selected active finding
  const [activeFindingId, setActiveFindingId] = useState<string>(
    targetFindingId || findings[0].id
  );

  const activeFinding = findings.find(f => f.id === activeFindingId) || findings[0];

  // Note input state
  const [noteInput, setNoteInput] = useState('');
  const [reviewerName, setReviewerName] = useState('J. Mercer (Senior Forensic Analyst)');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('insuron_findings_state', JSON.stringify(findings));
  }, [findings]);

  // Handle reviewer actions
  const executeReviewAction = (
    actionType: ReviewAction['actionType'], 
    newStatus?: FindingStatus,
    customNote?: string
  ) => {
    const note = customNote || noteInput || `Investigator marked action: ${actionType.replace(/_/g, ' ')}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newAction: ReviewAction = {
      id: `ACT-${Date.now()}`,
      findingId: activeFinding.id,
      actionType,
      timestamp,
      reviewerName,
      reviewerRole: 'Qualified Human Reviewer',
      noteContent: note,
      newStatus,
    };

    const updatedFindings = findings.map(f => {
      if (f.id === activeFinding.id) {
        return {
          ...f,
          status: newStatus || f.status,
          reviewerNotes: note,
          actionsHistory: [newAction, ...f.actionsHistory],
          updatedAt: timestamp,
        };
      }
      return f;
    });

    setFindings(updatedFindings);
    setNoteInput('');
    setActionFeedback(`Action recorded: ${actionType.replace(/_/g, ' ')}`);

    // Create Audit Event
    if (onAuditLogged) {
      onAuditLogged({
        id: `AUD-${Date.now()}`,
        timestamp,
        claimId: activeFinding.claimId,
        eventType: 'REVIEWER_ACTION',
        actor: reviewerName,
        description: `Reviewer performed ${actionType.replace(/_/g, ' ')} on ${activeFinding.id}: "${note}"`,
      });
    }

    setTimeout(() => setActionFeedback(null), 3500);
  };

  const resetAllActions = () => {
    localStorage.removeItem('insuron_findings_state');
    setFindings(mockClaim1Findings);
    setActionFeedback('Findings reset to default demo state.');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Human-Review & Investigator Console
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Human-in-the-loop oversight • Traceable determination actions • Local state persistence
          </p>
        </div>

        {/* Action feedback and reset */}
        <div className="flex items-center gap-3">
          {actionFeedback && (
            <span className="text-xs px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 animate-fadeIn font-mono">
              ✓ {actionFeedback}
            </span>
          )}
          <button
            onClick={resetAllActions}
            title="Reset to initial state"
            className="px-3 py-1.5 rounded-lg bg-navy-900 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-cyber-cyan transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo State
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Finding Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between px-1">
            <span>Review Queue ({findings.length})</span>
            <span className="text-[10px] font-mono text-slate-400">Claim: {activeFinding.claimId}</span>
          </h3>

          <div className="space-y-2.5">
            {findings.map(f => {
              const isSelected = f.id === activeFinding.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveFindingId(f.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-navy-900 border-emerald-400 shadow-glow-emerald/30'
                      : 'bg-navy-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-navy-950 text-slate-300 border border-white/10">
                      {f.id}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                      f.status === 'REVIEWED_CONFIRMED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      f.status === 'RESOLVED' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                      f.status === 'DISMISSED' ? 'bg-slate-800 text-slate-300 border border-slate-700' :
                      f.status === 'EVIDENCE_REQUESTED' ? 'bg-violet-950 text-violet-300 border border-violet-800' :
                      'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {f.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2">
                    {f.title}
                  </h4>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                    <span className="font-mono">{f.actionsHistory.length} review actions</span>
                    <span className="text-emerald-400 font-semibold font-mono">
                      {f.actionsHistory[0]?.reviewerName.split(' ')[0] || 'Unreviewed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Finding Workstation & Action Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Finding Core Review Dossier */}
          <div className="glass-panel p-6 rounded-2xl border border-white/15 space-y-5 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyber-cyan">{activeFinding.id}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    {activeFinding.category.replace(/_/g, ' ')}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mt-1 leading-snug">
                  {activeFinding.title}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Current Status</span>
                <span className="text-sm font-bold text-amber-400 font-mono">
                  {activeFinding.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Inconsistency Analysis */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                Investigator Explanation:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-navy-950/70 p-3 rounded-xl border border-white/5">
                {activeFinding.discrepancyExplanation}
              </p>
            </div>

            {/* Missing Info & Next Step */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-800/30">
                <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block mb-1">
                  Missing Information:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeFinding.missingInformation || 'No missing files identified.'}
                </p>
              </div>
              <div className="bg-cyber-cyan/5 p-3 rounded-xl border border-cyber-cyan/20">
                <span className="text-[10px] uppercase font-mono text-cyber-cyan font-bold block mb-1">
                  Recommended Verification:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeFinding.recommendedNextStep}
                </p>
              </div>
            </div>

            {/* Evidence & Graph Quick Links */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('evidence', activeFinding.id)}
                className="px-3 py-1.5 rounded-lg bg-navy-900 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold hover:bg-cyber-cyan/10 transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                Inspect Highlighted Passages in Documents
              </button>
              <button
                onClick={() => onNavigate && onNavigate('graph', activeFinding.id)}
                className="px-3 py-1.5 rounded-lg bg-navy-900 border border-white/10 text-slate-300 text-xs font-semibold hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                View Relationship Path in Graph
              </button>
            </div>

            {/* Action Bar (Working Controls) */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                Execute Investigator Decision
              </h3>

              {/* Note input */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400 font-mono">
                  Investigator Notes / Rationale (Audit Logged):
                </label>
                <textarea
                  rows={2}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Enter notes, formal instructions, or justification for this action..."
                  className="w-full p-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => executeReviewAction('MARK_REVIEWED', 'REVIEWED_CONFIRMED')}
                  className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-bold hover:bg-emerald-900/60 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Mark as Reviewed
                </button>

                <button
                  onClick={() => executeReviewAction('REQUEST_EVIDENCE', 'EVIDENCE_REQUESTED')}
                  className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-500/60 text-violet-300 text-xs font-bold hover:bg-violet-900/60 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-violet-400" />
                  Request Evidence
                </button>

                <button
                  onClick={() => executeReviewAction('REQUEST_FURTHER_INVESTIGATION', 'UNDER_INVESTIGATION')}
                  className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/60 text-amber-300 text-xs font-bold hover:bg-amber-900/60 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Request Investigation
                </button>

                <button
                  onClick={() => executeReviewAction('RESOLVE', 'RESOLVED')}
                  className="p-2.5 rounded-xl bg-sky-950/60 border border-sky-500/60 text-sky-300 text-xs font-bold hover:bg-sky-900/60 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  Mark as Resolved
                </button>

                <button
                  onClick={() => executeReviewAction('DISMISS', 'DISMISSED')}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  Dismiss Finding
                </button>

                <button
                  onClick={() => {
                    if (noteInput.trim()) {
                      executeReviewAction('NOTE_ADDED', activeFinding.status, noteInput);
                    }
                  }}
                  disabled={!noteInput.trim()}
                  className="p-2.5 rounded-xl bg-navy-800 border border-white/10 text-white text-xs font-bold hover:bg-navy-700 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-cyber-cyan" />
                  Add Note Only
                </button>
              </div>
            </div>
          </div>

          {/* Audit History Timeline for this Finding */}
          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-cyber-cyan" />
              Determination Audit History ({activeFinding.actionsHistory.length})
            </h3>

            {activeFinding.actionsHistory.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">No review actions recorded yet.</p>
            ) : (
              <div className="space-y-2.5">
                {activeFinding.actionsHistory.map((act) => (
                  <div 
                    key={act.id} 
                    className="p-3 rounded-xl bg-navy-950/70 border border-white/5 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{act.reviewerName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({act.reviewerRole})</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {act.actionType.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs italic bg-navy-900/50 p-2 rounded-lg border border-white/5">
                        "{act.noteContent}"
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {act.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
