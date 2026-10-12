import React, { useState, useMemo } from 'react';
import { 
  mockClaims, 
  mockClaim1Findings, 
  mockAuditTrail 
} from '../../data/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  ShieldAlert, 
  Clock, 
  FileCheck2, 
  Layers, 
  Search, 
  ArrowRight, 
  Eye, 
  Play, 
  FileText, 
  TrendingUp, 
  CheckCircle2,
  Building,
  AlertTriangle
} from 'lucide-react';
import { NavigationTab, Claim } from '../../types';

interface DashboardViewProps {
  onNavigate?: (tab: NavigationTab, targetId?: string) => void;
  onRunDemo?: () => void;
}

const CATEGORY_CHART_DATA = [
  { name: 'Numerical', count: 2, fill: '#00F0FF' },
  { name: 'Temporal', count: 1, fill: '#8B5CF6' },
  { name: 'Clause Contradiction', count: 1, fill: '#F59E0B' },
  { name: 'Missing Evidence', count: 1, fill: '#EC4899' },
  { name: 'Discordance', count: 1, fill: '#38BDF8' },
];

const STATUS_CHART_DATA = [
  { name: 'Flagged Discrepancy', value: 1, color: '#F43F5E' },
  { name: 'Requires Verification', value: 1, color: '#F59E0B' },
  { name: 'In Review', value: 1, color: '#10B981' },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onRunDemo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const filteredClaims = useMemo(() => {
    return mockClaims.filter(c => {
      const matchesSearch = !searchQuery || 
        c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.policyholderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [searchQuery, filterPriority]);

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            Investigation Command Center
            <span className="text-[10px] bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 px-2 py-0.5 rounded-full font-mono">
              Flarre AI Challenge Prototype
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-source claims intelligence, connected evidence graphs, and investigative triage
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onRunDemo && onRunDemo()}
            className="px-4 py-2 rounded-lg bg-cyber-cyan text-navy-950 font-bold text-xs hover:bg-white transition-all flex items-center gap-2 shadow-glow-cyan"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run AI Investigation Demo
          </button>
        </div>
      </div>

      {/* 4 Enterprise Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-white/15 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Claims Ingested</span>
            <Building className="w-4 h-4 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-mono">3</span>
            <span className="text-[10px] text-emerald-400 font-mono">100% indexed in graph</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Fictional multi-peril commercial & personal dossiers
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/15 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Awaiting Human Review</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-400 font-mono">2</span>
            <span className="text-[10px] text-amber-300 font-mono">High priority triage</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Flagged items awaiting investigator verification
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/15 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Potential Inconsistencies</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-rose-400 font-mono">6</span>
            <span className="text-[10px] text-rose-300 font-mono">4 Critical/High severity</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Deterministic rule & semantic contradiction flags
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/15 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Linked Evidence Passages</span>
            <FileCheck2 className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-cyber-cyan font-mono">14</span>
            <span className="text-[10px] text-cyber-cyan font-mono">100% SHA-256 Provenance</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Directly citeable paragraphs in official files
          </p>
        </div>
      </div>

      {/* Charts Section: 2 Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Chart: Finding Categories Distribution (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Inconsistency Categories Breakdown
              </h3>
              <p className="text-[11px] text-slate-400">
                Deterministic rule failures vs semantic text contradictions
              </p>
            </div>
            <span className="text-[10px] font-mono text-cyber-cyan bg-navy-950 px-2 py-1 rounded border border-white/10">
              6 Seeded Findings
            </span>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#94A3B8', fontSize: 10 }} 
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#94A3B8', fontSize: 10 }} 
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#38BDF8', borderRadius: 8, fontSize: 11, color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {CATEGORY_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Investigation Status (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Investigation Dossier Status
            </h3>
            <p className="text-[11px] text-slate-400">
              Triage queue status distribution across demo claims
            </p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_CHART_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {STATUS_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#38BDF8', borderRadius: 8, fontSize: 11, color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[10px]">
            {STATUS_CHART_DATA.map(st => (
              <div key={st.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                <span className="text-slate-300 truncate">{st.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Filterable Claims Dossier Table */}
      <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Active Insurance Investigations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any claim to inspect its evidence trail, facts, or knowledge graph
            </p>
          </div>

          {/* Table Search & Priority filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search claims..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-navy-950 border border-white/15 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-navy-950 border border-white/15 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
            </select>
          </div>
        </div>

        {/* Claims Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950/80 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
              <tr>
                <th className="p-3">Claim Dossier</th>
                <th className="p-3">Policyholder</th>
                <th className="p-3">Claimed Amount</th>
                <th className="p-3">Peril / Incident</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Investigation Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClaims.map(claim => (
                <tr key={claim.id} className="hover:bg-navy-900/60 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-white font-mono block">{claim.claimNumber}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{claim.policyId}</span>
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-white">{claim.policyholderName}</p>
                    <span className="text-[10px] text-slate-400">{claim.category}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-white">
                    ${claim.claimedAmount.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <p className="text-slate-300 line-clamp-1 max-w-xs">{claim.reportedDescription}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{claim.incidentDate.split(' ')[0]}</span>
                  </td>
                  <td className="p-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                      claim.priority === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      claim.priority === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {claim.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-mono text-amber-400 font-medium">
                      {claim.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onNavigate && onNavigate('workspace', claim.id)}
                        className="px-2.5 py-1 rounded bg-cyber-cyan text-navy-950 text-[11px] font-bold hover:bg-white transition-colors flex items-center gap-1 shadow-glow-cyan"
                      >
                        Investigate
                      </button>
                      <button
                        onClick={() => onNavigate && onNavigate('graph', claim.id)}
                        className="px-2 py-1 rounded bg-navy-900 border border-white/10 text-slate-300 text-[11px] hover:text-white transition-colors"
                        title="View in Knowledge Graph"
                      >
                        <Layers className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
