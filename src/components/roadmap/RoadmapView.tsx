import React from 'react';
import { 
  Compass, 
  Layers, 
  Search, 
  FileCheck2, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Milestone, 
  Shield, 
  Cpu, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface RoadmapViewProps {
  onNavigate?: (tab: NavigationTab) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <Compass className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Product Principles & 3-Phase Roadmap
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Core 4-pillar methodology • Prototype scope • Progressive development roadmap
          </p>
        </div>

        <div className="font-mono text-xs text-cyber-cyan bg-navy-900 border border-cyber-cyan/30 px-3 py-1.5 rounded-lg">
          Flarre AI Challenge 2026
        </div>
      </div>

      {/* 4 Core Pillars Grid: Connect, Investigate, Trace, Review */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-400/40 flex items-center justify-center text-sky-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            1. Connect
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Bring claims, policies, clauses, documents, and evidence into a connected information graph, breaking unstructured multi-format data silos.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-violet-950 border border-violet-400/40 flex items-center justify-center text-violet-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            2. Investigate
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Use deterministic checks and AI-assisted analysis to identify potential inconsistencies, temporal conflicts, and missing proof-of-loss items.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            3. Trace
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Link each finding to its source documents, exact paragraph citations, page indices, and cryptographic hashes in our Evidence Explorer.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            4. Review
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Let a qualified human investigator verify findings and determine the appropriate next steps via a persistent review console and audit trail.
          </p>
        </div>

      </div>

      {/* 3-Phase Roadmap Timeline */}
      <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Milestone className="w-5 h-5 text-cyber-cyan" />
              Strategic Development Roadmap
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              From Hackathon Prototype to Enterprise Insurance Carrier Integration
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
            Phase 1 Live in Prototype
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phase 1 */}
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-emerald-500/40 space-y-3 shadow-glow-emerald/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                PHASE 1 (COMPLETED)
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white">Interactive Prototype & Core Graph</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interactive knowledge graph with React Flow, multi-peril fictional claims, deterministic consistency checks, evidence-linked findings, and human-in-the-loop review console.
            </p>
            <ul className="text-[11px] text-slate-400 space-y-1 font-mono pt-2 border-t border-white/5">
              <li>✓ Multi-source graph ontology</li>
              <li>✓ Interactive 10-step simulation</li>
              <li>✓ Evidence passage highlighter</li>
              <li>✓ LocalStorage decision persistence</li>
            </ul>
          </div>

          {/* Phase 2 */}
          <div className="p-5 rounded-2xl bg-navy-950/70 border border-cyber-cyan/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                PHASE 2 (PLANNED)
              </span>
              <Clock className="w-4 h-4 text-cyber-cyan" />
            </div>
            <h4 className="text-sm font-bold text-white">Production OCR & Provenance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real PDF parsing with LayoutLM/OCR pipelines, cryptographic bounding boxes, benchmark evaluation against double-blind historical adjuster reviews, and multi-tenancy.
            </p>
            <ul className="text-[11px] text-slate-400 space-y-1 font-mono pt-2 border-t border-white/5">
              <li>• Multi-page PDF layout parser</li>
              <li>• Automated character-offset indexing</li>
              <li>• Evaluation on anonymized test set</li>
              <li>• Enterprise SSO & role-based RBAC</li>
            </ul>
          </div>

          {/* Phase 3 */}
          <div className="p-5 rounded-2xl bg-navy-950/70 border border-violet-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 font-bold">
                PHASE 3 (VISION)
              </span>
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            <h4 className="text-sm font-bold text-white">Core System Carrier Integration</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct API connectors for Guidewire ClaimCenter and Duck Creek, controlled autonomous investigation agent sub-branches, and carrier-grade audit telemetry.
            </p>
            <ul className="text-[11px] text-slate-400 space-y-1 font-mono pt-2 border-t border-white/5">
              <li>• Guidewire ClaimCenter plugin</li>
              <li>• Subpoena & municipal log crawlers</li>
              <li>• Anti-fraud SIU workflow sync</li>
              <li>• SOC2 Type II compliance audit</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Honest Prototype Statement */}
      <div className="p-5 rounded-2xl bg-navy-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <span className="font-bold text-white block">Academic & Hackathon Submission Identity</span>
          <p className="text-slate-400">
            INSURON AI is an individual innovation challenge entry designed by <strong>B. Karthikeya Venkata Durga Amar</strong> (Chaitanya Bharathi Institute of Technology - CBIT) for the <strong>Flarre AI Innovation Challenge 2026</strong>.
          </p>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="px-4 py-2 rounded-xl bg-cyber-cyan text-navy-950 font-bold text-xs hover:bg-white transition-all shrink-0 shadow-glow-cyan"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
