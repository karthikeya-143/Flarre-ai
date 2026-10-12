import React, { useState } from 'react';
import { 
  Shield, 
  Layers, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Cpu, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Scale, 
  Building2, 
  Search, 
  ExternalLink,
  Lock,
  GitBranch,
  Eye,
  UserCheck
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface LandingPageProps {
  onNavigate: (tab: NavigationTab, targetId?: string) => void;
  onRunDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onRunDemo }) => {
  const [activeNodeHighlight, setActiveNodeHighlight] = useState<number>(2);

  const heroPipelineNodes = [
    { label: 'POLICYHOLDER', sub: 'Apex Logistics Intl', color: 'border-sky-400 text-sky-400' },
    { label: 'INSURANCE POLICY', sub: 'POL-COM-88219 ($2.5M)', color: 'border-cyan-400 text-cyan-400' },
    { label: 'CLAIM DOSSIER', sub: 'CLM-2026-8941 ($385K)', color: 'border-amber-400 text-amber-400' },
    { label: 'POLICY CLAUSE', sub: 'SEC-4.2 (Quarterly Warranty)', color: 'border-violet-400 text-violet-400' },
    { label: 'EVIDENCE PASSAGE', sub: 'Seattle FD Dispatch Log', color: 'border-cyber-cyan text-cyber-cyan shadow-glow-cyan' },
    { label: 'INCONSISTENCY FINDING', sub: 'Pre-Incident Valve Closed', color: 'border-rose-400 text-rose-400' },
  ];

  return (
    <div className="w-full min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-cyber-cyan/30 selection:text-cyber-cyan overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Hackathon Event Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono font-medium shadow-glow-cyan/20 animate-fadeIn mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Flarre AI Innovation Challenge 2026 • Individual Submission</span>
        </div>

        {/* Brand Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
          INSURON <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-blue-400 to-violet-400">AI</span>
        </h1>

        {/* Official Tagline */}
        <p className="text-lg sm:text-2xl font-semibold text-slate-200 mt-4 max-w-2xl font-sans tracking-wide">
          “Intelligent Insurance Investigation Through Connected Evidence.”
        </p>

        {/* 10-Second Elevator Pitch */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-4 leading-relaxed">
          INSURON AI connects insurance claims, policy clauses, and multi-source supporting evidence into an interactive knowledge graph — identifying potential inconsistencies and guaranteeing complete provenance for human investigators.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 rounded-xl bg-cyber-cyan text-navy-950 font-bold text-sm hover:bg-white transition-all flex items-center gap-2 shadow-glow-cyan hover:scale-[1.02]"
          >
            Explore Platform
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onRunDemo}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-glow-violet hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            Run Investigation Demo
          </button>

          <button
            onClick={() => onNavigate('graph')}
            className="px-6 py-3 rounded-xl bg-navy-900 border border-cyber-cyan/40 text-cyber-cyan font-semibold text-sm hover:bg-cyber-cyan/10 transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Explore Knowledge Graph
          </button>
        </div>

        {/* Hero Visual: Animated Interactive Knowledge Chain */}
        <div className="w-full mt-14 p-6 glass-panel rounded-3xl border border-cyber-cyan/20 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Connected Evidence Trail (Interactive Chain)
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyber-cyan">
              Click any node to inspect evidence linkage
            </span>
          </div>

          {/* Connected Horizontal Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {heroPipelineNodes.map((n, idx) => {
              const isActive = activeNodeHighlight === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveNodeHighlight(idx)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isActive
                      ? `bg-navy-900 ${n.color} scale-105 shadow-xl`
                      : 'bg-navy-950/60 border-white/10 text-slate-400 hover:border-white/25 hover:bg-navy-900'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold block mb-1">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {n.label}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 truncate">
                    {n.sub}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Chain Explanation */}
          <div className="mt-6 p-4 rounded-xl bg-navy-950/80 border border-white/10 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono text-cyber-cyan font-bold">
                Evidence Connection in Case CLM-2026-8941:
              </span>
              <p className="text-slate-200">
                Sprinkler valve padlocked closed at 23:30 PM (Seattle FD Log) contradicts Claim FNOL statement of active suppression and potentially violates Clause SEC-4.2.
              </p>
            </div>
            <button
              onClick={() => onNavigate('evidence')}
              className="px-3 py-1.5 rounded-lg bg-cyber-cyan text-navy-950 font-bold text-xs hover:bg-white shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              Trace in Evidence Explorer
            </button>
          </div>
        </div>
      </section>

      {/* Problem Statement Card (As requested in spec) */}
      <section className="py-12 px-6 bg-navy-900/40 border-y border-white/10">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
            The Industry Challenge
          </span>
          <blockquote className="text-base sm:text-xl font-medium text-slate-200 leading-relaxed italic">
            “Insurance investigations involve information scattered across claims, policy documents, communications, and supporting evidence. Manually connecting these sources makes it difficult to identify inconsistencies, trace evidence, and understand how different pieces of information relate to a claim.”
          </blockquote>
          <div className="pt-2 text-xs text-slate-400 font-mono">
            INSURON AI solves this by constructing a unified, deterministic knowledge graph over fragmented evidence.
          </div>
        </div>
      </section>

      {/* Three Key Capabilities Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-wider block mb-2">
            Core Value Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Three Key Capabilities of INSURON AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Empowering forensic adjusters and investigators with grounded intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Capability 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/15 space-y-4 hover:border-cyber-cyan/50 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-glow-cyan/20">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              1. Connect Related Insurance Information
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unifies policy schedules, claims forms, municipal dispatch logs, repair invoices, and maintenance certifications into a multi-relational Knowledge Graph.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-white/5 font-mono">
              <li>• Eliminates document data silos</li>
              <li>• Automatic entity resolution</li>
              <li>• Interactive node graph navigation</li>
            </ul>
          </div>

          {/* Capability 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/15 space-y-4 hover:border-amber-400/50 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-glow-amber/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              2. Discover & Investigate Inconsistencies
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Combines deterministic rule validation (variance thresholds, warranty expirations) with semantic AI checks to highlight objective contradictions.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-white/5 font-mono">
              <li>• Pre-incident timestamp conflict detection</li>
              <li>• Certified restoration amount variance</li>
              <li>• Neutral, non-accusatory findings</li>
            </ul>
          </div>

          {/* Capability 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/15 space-y-4 hover:border-cyber-cyan/50 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shadow-glow-cyan/20">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              3. Trace Findings to Source Evidence
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every identified inconsistency links directly to exact paragraphs, page numbers, and SHA-256 cryptographic document hashes in our Evidence Explorer.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-white/5 font-mono">
              <li>• Zero unsupported AI claims</li>
              <li>• Page-level citation highlighting</li>
              <li>• Legally defensible audit trail</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Responsible AI & Ethics Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Responsible AI & Ethics by Design
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Assistive Intelligence, Not Automated Decisions
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              INSURON AI is built strictly to empower qualified insurance investigators. The platform does NOT automatically approve, deny, or label claims as fraudulent. All findings require human verification in our dedicated review console.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('review')}
              className="px-5 py-2.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold text-xs hover:bg-emerald-900/60 transition-all flex items-center justify-center gap-2 shadow-glow-emerald"
            >
              <UserCheck className="w-4 h-4" />
              Open Human-Review Console
            </button>
            <button
              onClick={() => onNavigate('architecture')}
              className="px-5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-slate-300 text-xs font-semibold hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-violet-400" />
              View Architecture & Principles
            </button>
          </div>
        </div>
      </section>

      {/* Professional Footer with Submission Identity */}
      <footer className="mt-auto border-t border-white/10 bg-navy-950 py-10 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Shield className="w-4 h-4 text-cyber-cyan" />
              <span className="font-bold text-white text-sm">INSURON AI</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Intelligent Insurance Investigation Through Connected Evidence.
            </p>
          </div>

          {/* Submission Details */}
          <div className="text-center md:text-right space-y-1 font-mono text-[11px]">
            <p className="text-white">
              Submitted by: <strong className="text-cyber-cyan">B. Karthikeya Venkata Durga Amar</strong>
            </p>
            <p className="text-slate-400">
              Chaitanya Bharathi Institute of Technology (CBIT)
            </p>
            <p className="text-violet-400 font-semibold">
              Flarre AI Innovation Challenge 2026 Individual Submission
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};
