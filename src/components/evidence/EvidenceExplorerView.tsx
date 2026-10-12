import React, { useState } from 'react';
import { 
  mockClaim1Documents, 
  mockClaim1Findings, 
  mockClauses, 
  mockPolicies 
} from '../../data/mockData';
import { 
  FileText, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Hash, 
  Calendar, 
  Building, 
  ExternalLink, 
  Search, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight,
  Share2,
  FileSearch,
  ArrowRight
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface EvidenceExplorerProps {
  onNavigate?: (tab: NavigationTab, targetId?: string) => void;
  initialFindingId?: string | null;
}

export const EvidenceExplorerView: React.FC<EvidenceExplorerProps> = ({ 
  onNavigate, 
  initialFindingId 
}) => {
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    initialFindingId || mockClaim1Findings[1].id // Default to the temporal valve conflict
  );

  const activeFinding = mockClaim1Findings.find(f => f.id === selectedFindingId) || mockClaim1Findings[0];

  // Find all passages related to this finding
  const allPassages = mockClaim1Documents.flatMap(d => d.passages);
  const supportingPassages = allPassages.filter(p => activeFinding.supportingEvidenceIds.includes(p.id));
  const conflictingPassages = allPassages.filter(p => activeFinding.conflictingEvidenceIds.includes(p.id));

  // Active highlighted document in viewer
  const [activeDocId, setActiveDocId] = useState<string>(
    supportingPassages[0]?.documentId || mockClaim1Documents[1].id
  );

  const activeDocument = mockClaim1Documents.find(d => d.id === activeDocId) || mockClaim1Documents[0];
  const relatedClauses = mockClauses.filter(c => activeFinding.relatedClauseIds.includes(c.id));

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <FileSearch className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Evidence Explorer & Provenance Inspector
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic document traceability • Exact passage highlights • Cross-source contradiction analysis
          </p>
        </div>

        {/* Quick jump to Graph */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate('graph', activeFinding.id)}
            className="px-3.5 py-1.5 rounded-lg bg-navy-900 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold hover:bg-cyber-cyan/10 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            View in Knowledge Graph
          </button>
          <button
            onClick={() => onNavigate && onNavigate('review', activeFinding.id)}
            className="px-3.5 py-1.5 rounded-lg bg-cyber-cyan text-navy-950 text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 shadow-glow-cyan"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Review This Finding
          </button>
        </div>
      </div>

      {/* Main Layout: 3 Columns (Findings Selector, Document Reader, Evidence Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Finding Selector (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 px-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Target Findings ({mockClaim1Findings.length})
          </h3>

          <div className="space-y-2">
            {mockClaim1Findings.map(f => {
              const isSelected = f.id === activeFinding.id;
              return (
                <div
                  key={f.id}
                  onClick={() => {
                    setSelectedFindingId(f.id);
                    const sup = mockClaim1Documents.flatMap(d => d.passages).find(p => f.supportingEvidenceIds.includes(p.id));
                    if (sup) setActiveDocId(sup.documentId);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-navy-900 border-cyber-cyan shadow-glow-cyan/40 scale-[1.01]'
                      : 'bg-navy-900/60 border-white/10 hover:border-white/20 hover:bg-navy-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-navy-950 text-slate-300 border border-white/10">
                      {f.id}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      f.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      f.severity === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {f.severity}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2">
                    {f.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {f.category.replace(/_/g, ' ')}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Associated Documents Selector */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 px-1 mb-3">
              <FileText className="w-3.5 h-3.5 text-cyber-cyan" />
              Claim Documents ({mockClaim1Documents.length})
            </h3>
            <div className="space-y-1.5">
              {mockClaim1Documents.map(doc => {
                const isActive = doc.id === activeDocId;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setActiveDocId(doc.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-cyber-cyan/15 border-cyber-cyan/60 text-white font-medium'
                        : 'bg-navy-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-navy-900'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="truncate text-xs font-semibold">{doc.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{doc.fileName}</p>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyber-cyan' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: High-Fidelity Document Viewer with Highlight (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl flex flex-col">
          {/* Document Header bar */}
          <div className="p-4 bg-navy-900/90 border-b border-white/10 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-sm font-bold text-white truncate">
                  {activeDocument.title}
                </h3>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {activeDocument.fileName} • {activeDocument.version}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
              SHA-256 Verified
            </span>
          </div>

          {/* Document Meta Row */}
          <div className="px-4 py-2 bg-navy-950/70 border-b border-white/5 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
            <div>
              <span className="text-slate-500">ISSUED BY:</span> {activeDocument.authorAgency.split(',')[0]}
            </div>
            <div>
              <span className="text-slate-500">UPLOAD:</span> {activeDocument.uploadDate.split(' ')[0]}
            </div>
            <div className="col-span-2 truncate">
              <span className="text-slate-500">HASH:</span> {activeDocument.hashSHA256.substring(0, 24)}...
            </div>
          </div>

          {/* Document Body / Mock PDF Viewer */}
          <div className="p-5 overflow-y-auto max-h-[620px] space-y-4 bg-[#080E1C] font-mono text-xs text-slate-300">
            <div className="text-center pb-3 border-b border-white/10">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest block">
                [ OFFICIAL INSURANCE EVIDENCE ARCHIVE ]
              </span>
              <span className="text-[10px] text-slate-500">
                Document Reference: {activeDocument.id} • Page 1 of 4
              </span>
            </div>

            {/* Render Passages in this Document */}
            {activeDocument.passages.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No indexed passages in this document preview.
              </div>
            ) : (
              activeDocument.passages.map((p, idx) => {
                const isSupporting = activeFinding.supportingEvidenceIds.includes(p.id);
                const isConflicting = activeFinding.conflictingEvidenceIds.includes(p.id);
                const isTarget = isSupporting || isConflicting;

                return (
                  <div
                    key={p.id}
                    className={`rounded-xl p-4 transition-all border ${
                      isTarget
                        ? isConflicting
                          ? 'bg-rose-950/30 border-rose-500/80 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                          : 'bg-cyan-950/30 border-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                        : 'bg-navy-900/40 border-white/5 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px]">
                      <span className="text-cyber-cyan font-bold flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        Page {p.pageNumber} • {p.section}
                      </span>
                      {isTarget && (
                        <span className={`px-2 py-0.5 rounded font-bold font-sans text-[10px] ${
                          isConflicting
                            ? 'bg-rose-900 text-rose-200 border border-rose-700'
                            : 'bg-cyber-cyan text-navy-950'
                        }`}>
                          {isConflicting ? 'CONFLICTING PASSAGE' : 'KEY EVIDENCE PASSAGE'}
                        </span>
                      )}
                    </div>

                    {/* Exact highlighted text */}
                    <blockquote className="italic leading-relaxed text-slate-100 border-l-2 border-cyber-cyan pl-3 my-2 text-xs font-sans">
                      "{p.exactText}"
                    </blockquote>

                    {/* Extracted Structured Fact */}
                    <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] font-sans">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                        EXTRACTED STRUCTURED FACT:
                      </span>
                      <p className="text-white font-medium bg-navy-950/80 p-2 rounded-lg border border-white/5">
                        {p.extractedFact}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-slate-400">
                        <span>Confidence: {(p.confidenceScore * 100).toFixed(0)}%</span>
                        <span>Hash: {p.provenanceHash}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            <div className="p-3 bg-navy-950/40 rounded-lg border border-white/5 text-[10px] text-slate-500 text-center font-mono">
              --- END OF CERTIFIED PASSAGE ARCHIVE ---
            </div>
          </div>
        </div>

        {/* Right Column: Inconsistency Traceability & Contradiction Analysis (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Finding Core Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                {activeFinding.category.replace(/_/g, ' ')}
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">
                {activeFinding.status.replace(/_/g, ' ')}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">
              {activeFinding.title}
            </h3>

            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
                Discrepancy Explanation:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-navy-900/80 p-3 rounded-xl border border-white/5">
                {activeFinding.discrepancyExplanation}
              </p>
            </div>

            {/* Related Policy Clause */}
            {relatedClauses.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
                  Applicable Policy Clause:
                </span>
                {relatedClauses.map(cls => (
                  <div key={cls.id} className="p-3 rounded-xl bg-violet-950/30 border border-violet-800/40 text-xs">
                    <div className="flex items-center justify-between text-violet-300 font-mono font-bold text-[10px] mb-1">
                      <span>{cls.clauseCode}</span>
                      <span>{cls.category}</span>
                    </div>
                    <p className="font-semibold text-white text-xs">{cls.title}</p>
                    <p className="text-[11px] text-slate-300 mt-1 italic">"{cls.fullText}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Missing Information / Uncertainty */}
            {activeFinding.missingInformation && (
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-400 font-bold flex items-center gap-1.5 mb-1">
                  <ShieldAlert className="w-3 h-3" />
                  Identified Missing Evidence:
                </span>
                <p className="text-xs text-amber-200/90 bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/40 leading-relaxed">
                  {activeFinding.missingInformation}
                </p>
              </div>
            )}

            {/* Recommended Next Step */}
            <div>
              <span className="text-[10px] uppercase font-mono text-cyber-cyan font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3" />
                Recommended Next Step:
              </span>
              <p className="text-xs text-slate-200 bg-navy-900/80 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                {activeFinding.recommendedNextStep}
              </p>
            </div>

            {/* Determinism & Confidence note */}
            <div className="p-2.5 rounded-lg bg-navy-950 border border-white/10 text-[10px] font-mono text-slate-400">
              <span className="text-slate-300 font-semibold block">Confidence Grounding:</span>
              {activeFinding.confidenceNote}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
