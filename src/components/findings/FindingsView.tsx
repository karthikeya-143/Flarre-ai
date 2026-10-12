import React, { useState, useMemo } from 'react';
import { 
  mockClaim1Findings, 
  mockClaims, 
  mockClauses, 
  mockClaim1Documents 
} from '../../data/mockData';
import { 
  AlertTriangle, 
  Filter, 
  Search, 
  Eye, 
  CheckCircle2, 
  Share2, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  Info,
  Scale
} from 'lucide-react';
import { NavigationTab, FindingCategory, SeverityLevel, FindingStatus } from '../../types';

interface FindingsViewProps {
  onNavigate?: (tab: NavigationTab, targetId?: string) => void;
}

export const FindingsView: React.FC<FindingsViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Gather all findings across claims
  const allFindings = useMemo(() => {
    return mockClaims.flatMap(c => c.findings);
  }, []);

  const filteredFindings = useMemo(() => {
    return allFindings.filter(f => {
      const matchesSearch = !searchQuery || 
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'ALL' || f.category === selectedCategory;
      const matchesSev = selectedSeverity === 'ALL' || f.severity === selectedSeverity;
      const matchesStatus = selectedStatus === 'ALL' || f.status === selectedStatus;

      return matchesSearch && matchesCat && matchesSev && matchesStatus;
    });
  }, [allFindings, searchQuery, selectedCategory, selectedSeverity, selectedStatus]);

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Potential Inconsistency Matrix
            </h1>
            <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full font-mono">
              Assistive Verification Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic rule violations • Cross-document contradictions • Human review triage
          </p>
        </div>

        {/* Ethical disclaimer badge */}
        <div className="px-3 py-1.5 rounded-lg bg-navy-900 border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyber-cyan shrink-0" />
          <span>Neutral findings for investigator review. Not automated fraud determination.</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-xl border border-white/15 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by finding title, ID, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-white/15 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyber-cyan"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-navy-950 border border-white/15 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-cyber-cyan"
        >
          <option value="ALL">All Inconsistency Types</option>
          <option value="NUMERICAL_DISCREPANCY">Numerical Discrepancy</option>
          <option value="TEMPORAL_CONFLICT">Temporal Conflict</option>
          <option value="EXCLUSION_CLAUSE_CONTRADICTION">Clause Contradiction</option>
          <option value="MISSING_MANDATORY_EVIDENCE">Missing Evidence</option>
          <option value="CROSS_DOCUMENT_DISCORDANCE">Document Discordance</option>
        </select>

        {/* Severity filter */}
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="bg-navy-950 border border-white/15 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-cyber-cyan"
        >
          <option value="ALL">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
        </select>

        {/* Status filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-navy-950 border border-white/15 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-cyber-cyan"
        >
          <option value="ALL">All Review Statuses</option>
          <option value="PENDING_REVIEW">Pending Review</option>
          <option value="UNDER_INVESTIGATION">Under Investigation</option>
          <option value="EVIDENCE_REQUESTED">Evidence Requested</option>
          <option value="REVIEWED_CONFIRMED">Reviewed & Confirmed</option>
        </select>

        <span className="text-xs font-mono text-slate-400 ml-auto">
          Showing {filteredFindings.length} of {allFindings.length} findings
        </span>
      </div>

      {/* Findings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFindings.map(find => {
          const relatedClaim = mockClaims.find(c => c.id === find.claimId);
          const relatedClause = mockClauses.find(cls => find.relatedClauseIds.includes(cls.id));

          return (
            <div
              key={find.id}
              className="glass-panel p-5 rounded-2xl border border-white/15 hover:border-cyber-cyan/40 transition-all flex flex-col justify-between gap-4 shadow-xl"
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950 text-slate-300 border border-white/10 font-bold">
                      {find.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                      {find.category.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    find.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    find.severity === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {find.severity} PRIORITY
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white leading-snug">
                  {find.title}
                </h3>

                {/* Claim Context */}
                <div className="flex items-center justify-between text-xs text-slate-400 bg-navy-950/60 p-2.5 rounded-lg border border-white/5">
                  <span>Claim: <strong className="text-white font-mono">{find.claimId}</strong></span>
                  <span className="truncate max-w-[180px]">{relatedClaim?.policyholderName}</span>
                </div>

                {/* Discrepancy Explanation */}
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
                    Discrepancy Analysis:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-navy-900/60 p-3 rounded-xl border border-white/5">
                    {find.discrepancyExplanation}
                  </p>
                </div>

                {/* Clause Citation if present */}
                {relatedClause && (
                  <div className="p-2.5 rounded-lg bg-violet-950/30 border border-violet-800/40 text-xs flex items-center justify-between">
                    <span className="text-violet-300 font-mono font-bold text-[10px] flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5" />
                      Policy Clause {relatedClause.clauseCode}
                    </span>
                    <span className="text-slate-300 text-[11px] truncate max-w-[200px]">
                      {relatedClause.title}
                    </span>
                  </div>
                )}

                {/* Recommended Next Step */}
                <div className="p-2.5 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/20 text-xs">
                  <span className="text-[10px] uppercase font-mono text-cyber-cyan font-bold block mb-0.5">
                    Recommended Next Investigation Step:
                  </span>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {find.recommendedNextStep}
                  </p>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-400">
                  Status: <strong className="text-amber-400">{find.status.replace(/_/g, ' ')}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate && onNavigate('evidence', find.id)}
                    className="px-3 py-1.5 rounded-lg bg-navy-900 border border-cyber-cyan/40 text-cyber-cyan text-xs font-semibold hover:bg-cyber-cyan/10 transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Trace Evidence
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('review', find.id)}
                    className="px-3 py-1.5 rounded-lg bg-cyber-cyan text-navy-950 text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 shadow-glow-cyan"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Review
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
