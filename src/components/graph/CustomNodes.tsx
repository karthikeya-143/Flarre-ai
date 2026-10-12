import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Fingerprint, 
  FileCode, 
  Scale, 
  Building2, 
  CheckCircle,
  Eye,
  AlertCircle
} from 'lucide-react';

export interface GraphNodeData {
  id: string;
  label: string;
  sublabel?: string;
  category: 
    | 'policyholder'
    | 'policy'
    | 'claim'
    | 'clause'
    | 'document'
    | 'evidence'
    | 'rule'
    | 'finding'
    | 'action';
  status?: string;
  severity?: string;
  details?: Record<string, any>;
  isHighlighted?: boolean;
}

export const CustomGraphNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as GraphNodeData;
  const isSelected = selected || nodeData.isHighlighted;

  const getCategoryStyles = () => {
    switch (nodeData.category) {
      case 'policyholder':
        return {
          border: isSelected ? 'border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]' : 'border-sky-700/60 hover:border-sky-400',
          bg: 'bg-navy-900/95',
          headerBg: 'bg-sky-950/60',
          accent: 'text-sky-400',
          badge: 'bg-sky-900/50 text-sky-300 border-sky-700/40',
          icon: Building2,
        };
      case 'policy':
        return {
          border: isSelected ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.6)]' : 'border-cyan-700/60 hover:border-cyan-400',
          bg: 'bg-navy-900/95',
          headerBg: 'bg-cyan-950/60',
          accent: 'text-cyan-400',
          badge: 'bg-cyan-900/50 text-cyan-300 border-cyan-700/40',
          icon: Shield,
        };
      case 'claim':
        return {
          border: isSelected ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]' : 'border-amber-600/60 hover:border-amber-400',
          bg: 'bg-navy-900/95',
          headerBg: 'bg-amber-950/60',
          accent: 'text-amber-400',
          badge: 'bg-amber-900/50 text-amber-300 border-amber-700/40',
          icon: AlertCircle,
        };
      case 'clause':
        return {
          border: isSelected ? 'border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.6)]' : 'border-violet-700/60 hover:border-violet-400',
          bg: 'bg-navy-900/95',
          headerBg: 'bg-violet-950/60',
          accent: 'text-violet-400',
          badge: 'bg-violet-900/50 text-violet-300 border-violet-700/40',
          icon: Scale,
        };
      case 'document':
        return {
          border: isSelected ? 'border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'border-blue-700/60 hover:border-blue-400',
          bg: 'bg-navy-900/95',
          headerBg: 'bg-blue-950/60',
          accent: 'text-blue-400',
          badge: 'bg-blue-900/50 text-blue-300 border-blue-700/40',
          icon: FileText,
        };
      case 'evidence':
        return {
          border: isSelected ? 'border-cyber-cyan shadow-[0_0_25px_rgba(0,240,255,0.7)] animate-pulse' : 'border-cyber-cyan/50 hover:border-cyber-cyan',
          bg: 'bg-navy-850/95',
          headerBg: 'bg-cyan-950/70',
          accent: 'text-cyber-cyan',
          badge: 'bg-cyan-900/60 text-cyan-200 border-cyan-500/50',
          icon: Eye,
        };
      case 'rule':
        return {
          border: isSelected ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'border-purple-700/60 hover:border-purple-400',
          bg: 'bg-navy-900/95',
          headerBg: 'bg-purple-950/60',
          accent: 'text-purple-400',
          badge: 'bg-purple-900/50 text-purple-300 border-purple-700/40',
          icon: FileCode,
        };
      case 'finding':
        return {
          border: isSelected ? 'border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.7)]' : 'border-rose-500/60 hover:border-rose-400',
          bg: 'bg-navy-850/95',
          headerBg: 'bg-rose-950/70',
          accent: 'text-rose-400',
          badge: 'bg-rose-900/60 text-rose-200 border-rose-600/50',
          icon: AlertTriangle,
        };
      case 'action':
        return {
          border: isSelected ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)]' : 'border-emerald-600/60 hover:border-emerald-400',
          bg: 'bg-navy-900/95',
          headerBg: 'bg-emerald-950/60',
          accent: 'text-emerald-400',
          badge: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/40',
          icon: CheckCircle2,
        };
      default:
        return {
          border: 'border-slate-700',
          bg: 'bg-navy-900',
          headerBg: 'bg-slate-900',
          accent: 'text-slate-400',
          badge: 'bg-slate-800 text-slate-300 border-slate-700',
          icon: Fingerprint,
        };
    }
  };

  const style = getCategoryStyles();
  const Icon = style.icon;

  return (
    <div 
      className={`relative min-w-[210px] max-w-[270px] rounded-xl border-2 transition-all duration-300 backdrop-blur-md shadow-xl ${style.bg} ${style.border}`}
    >
      {/* Target handle on top */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-slate-300 !border-2 !border-navy-950 -top-1.5 transition-transform hover:scale-125" 
      />

      {/* Header with category and icon */}
      <div className={`px-3 py-2 rounded-t-[10px] flex items-center justify-between border-b border-white/10 ${style.headerBg}`}>
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon className={`w-3.5 h-3.5 shrink-0 ${style.accent}`} />
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold truncate text-slate-300">
            {nodeData.category}
          </span>
        </div>
        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono uppercase shrink-0 ${style.badge}`}>
          {nodeData.id}
        </span>
      </div>

      {/* Node body */}
      <div className="p-3">
        <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2">
          {nodeData.label}
        </h4>
        {nodeData.sublabel && (
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {nodeData.sublabel}
          </p>
        )}

        {/* Status / Severity indicator */}
        {(nodeData.status || nodeData.severity) && (
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
            {nodeData.severity && (
              <span className={`px-1.5 py-0.5 rounded font-mono font-medium ${
                nodeData.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                nodeData.severity === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                'bg-blue-950 text-blue-300 border border-blue-800'
              }`}>
                {nodeData.severity}
              </span>
            )}
            {nodeData.status && (
              <span className="text-slate-400 font-mono text-[9px] truncate ml-auto">
                {nodeData.status.replace(/_/g, ' ')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Source handle on bottom */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-cyber-cyan !border-2 !border-navy-950 -bottom-1.5 transition-transform hover:scale-125" 
      />
    </div>
  );
});

CustomGraphNode.displayName = 'CustomGraphNode';
