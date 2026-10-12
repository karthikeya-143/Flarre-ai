import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Node,
  Edge,
  ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomGraphNode, GraphNodeData } from './CustomNodes';
import { buildInsuronKnowledgeGraph } from './graphUtils';
import { 
  Search, 
  RotateCcw, 
  Filter, 
  ExternalLink, 
  Shield, 
  FileText, 
  AlertTriangle, 
  Eye, 
  CheckCircle2, 
  Scale, 
  Building2, 
  X,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { NavigationTab } from '../../types';

const nodeTypes = {
  custom: CustomGraphNode,
};

interface KnowledgeGraphViewProps {
  onNavigate?: (tab: NavigationTab, targetId?: string) => void;
  preselectedFindingId?: string | null;
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ 
  onNavigate, 
  preselectedFindingId 
}) => {
  const initialData = useMemo(() => buildInsuronKnowledgeGraph(), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<Node | null>(() => {
    if (preselectedFindingId) {
      const match = initialData.nodes.find(n => n.id === preselectedFindingId);
      return match || null;
    }
    return null;
  });

  const [activeCategoryFilters, setActiveCategoryFilters] = useState<Record<string, boolean>>({
    policyholder: true,
    policy: true,
    claim: true,
    clause: true,
    document: true,
    evidence: true,
    finding: true,
    action: true,
  });

  const [showLegend, setShowLegend] = useState(true);

  // Filter nodes based on active filters & search query
  const filteredNodes = useMemo(() => {
    return nodes.map(node => {
      const data = node.data as unknown as GraphNodeData;
      const categoryVisible = activeCategoryFilters[data.category] !== false;
      const matchesSearch = !searchQuery || 
        data.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (data.sublabel && data.sublabel.toLowerCase().includes(searchQuery.toLowerCase()));

      const isHidden = !categoryVisible || !matchesSearch;

      return {
        ...node,
        hidden: isHidden,
      };
    });
  }, [nodes, activeCategoryFilters, searchQuery]);

  // Handle node selection and edge highlighting
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);

    // Highlight adjacent edges
    setEdges(eds => eds.map(e => {
      const isConnected = e.source === node.id || e.target === node.id;
      return {
        ...e,
        animated: isConnected,
        style: isConnected 
          ? { stroke: '#00F0FF', strokeWidth: 3.5, filter: 'drop-shadow(0 0 8px #00F0FF)' }
          : { stroke: 'rgba(56, 189, 248, 0.3)', strokeWidth: 1.5 },
      };
    }));
  }, [setEdges]);

  // Reset filter and selection
  const handleReset = () => {
    setSearchQuery('');
    setSelectedNode(null);
    setActiveCategoryFilters({
      policyholder: true,
      policy: true,
      claim: true,
      clause: true,
      document: true,
      evidence: true,
      finding: true,
      action: true,
    });
    setEdges(initialData.edges);
  };

  const toggleCategoryFilter = (cat: string) => {
    setActiveCategoryFilters(prev => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const selectedNodeData = selectedNode?.data as unknown as GraphNodeData | undefined;

  return (
    <div className="relative w-full h-[calc(100vh-4.5rem)] bg-navy-950 overflow-hidden flex flex-col">
      {/* Top Controls Bar */}
      <div className="h-14 border-b border-white/10 bg-navy-900/90 backdrop-blur-md px-4 flex items-center justify-between z-10 gap-3">
        {/* Left: Title & Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              Connected Insurance Knowledge Graph
              <span className="text-[10px] bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 px-2 py-0.5 rounded-full font-mono">
                {nodes.length} Entities • {edges.length} Relationships
              </span>
            </h2>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-2 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search claim, clause, evidence, finding, or policy ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-navy-950/80 border border-white/15 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Right: Category Filter Pills & Reset */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { key: 'policyholder', label: 'Policyholder', color: 'text-sky-400' },
            { key: 'policy', label: 'Policy', color: 'text-cyan-400' },
            { key: 'claim', label: 'Claim', color: 'text-amber-400' },
            { key: 'clause', label: 'Clause', color: 'text-violet-400' },
            { key: 'document', label: 'Document', color: 'text-blue-400' },
            { key: 'evidence', label: 'Evidence', color: 'text-cyber-cyan' },
            { key: 'finding', label: 'Finding', color: 'text-rose-400' },
            { key: 'action', label: 'Action', color: 'text-emerald-400' },
          ].map(cat => (
            <button
              key={cat.key}
              onClick={() => toggleCategoryFilter(cat.key)}
              className={`text-[10px] px-2 py-1 rounded-md border font-medium transition-all ${
                activeCategoryFilters[cat.key]
                  ? 'bg-navy-800 border-white/20 text-white shadow-sm'
                  : 'bg-navy-950/40 border-white/5 text-slate-500 opacity-60'
              }`}
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                activeCategoryFilters[cat.key] ? 'bg-cyber-cyan' : 'bg-slate-600'
              }`} />
              {cat.label}
            </button>
          ))}

          <button
            onClick={handleReset}
            title="Reset Filters and View"
            className="p-1.5 rounded-lg bg-navy-800 border border-white/15 text-slate-300 hover:text-white hover:border-cyber-cyan transition-colors ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 w-full h-full bg-[#070B14]">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={1.8}
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={24} 
            size={1.5} 
            color="rgba(56, 189, 248, 0.12)" 
          />
          <Controls className="!m-4 !border-white/20 !shadow-2xl" />
        </ReactFlow>

        {/* Legend Overlay Card */}
        {showLegend && (
          <div className="absolute bottom-5 left-5 z-10 glass-panel p-3 rounded-xl border border-white/15 max-w-xs shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
              <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyber-cyan" /> Graph Ontology Legend
              </span>
              <button 
                onClick={() => setShowLegend(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-sky-400 bg-sky-950" />
                <span className="text-slate-300">Policyholder</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-cyan-400 bg-cyan-950" />
                <span className="text-slate-300">Insurance Policy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-amber-400 bg-amber-950" />
                <span className="text-slate-300">Claim</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-violet-400 bg-violet-950" />
                <span className="text-slate-300">Policy Clause</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-blue-400 bg-blue-950" />
                <span className="text-slate-300">Supporting Doc</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-cyber-cyan bg-cyan-950 shadow-[0_0_8px_#00F0FF]" />
                <span className="text-cyber-cyan font-medium">Evidence Fact</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-rose-400 bg-rose-950" />
                <span className="text-rose-300 font-medium">Inconsistency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-emerald-400 bg-emerald-950" />
                <span className="text-emerald-300">Human Action</span>
              </div>
            </div>
            <p className="mt-2 text-[9px] text-slate-400 leading-tight border-t border-white/5 pt-1.5">
              Click any node to inspect provenance and linked documentary evidence.
            </p>
          </div>
        )}

        {!showLegend && (
          <button
            onClick={() => setShowLegend(true)}
            className="absolute bottom-5 left-5 z-10 glass-panel px-3 py-1.5 rounded-lg border border-white/15 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 shadow-xl"
          >
            <Info className="w-3.5 h-3.5 text-cyber-cyan" /> Show Legend
          </button>
        )}

        {/* Selected Entity Drawer / Inspection Card */}
        {selectedNode && selectedNodeData && (
          <div className="absolute top-5 right-5 z-20 w-80 md:w-96 glass-panel rounded-2xl border border-cyber-cyan/40 p-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40">
                  {selectedNodeData.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-2 leading-snug">
                  {selectedNodeData.label}
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {selectedNodeData.id}
                </span>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-3 text-xs">
              {selectedNodeData.sublabel && (
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-mono">Description / Scope</span>
                  <p className="text-slate-200 mt-0.5 leading-relaxed bg-navy-950/60 p-2.5 rounded-lg border border-white/5">
                    {selectedNodeData.sublabel}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-navy-950/40 p-2 rounded-lg border border-white/5">
                  <span className="text-[9px] uppercase text-slate-400 font-mono block">Status</span>
                  <span className="font-semibold text-white">
                    {selectedNodeData.status || 'Active in Graph'}
                  </span>
                </div>
                {selectedNodeData.severity && (
                  <div className="bg-navy-950/40 p-2 rounded-lg border border-white/5">
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">Severity</span>
                    <span className={`font-semibold ${
                      selectedNodeData.severity === 'CRITICAL' ? 'text-rose-400' :
                      selectedNodeData.severity === 'HIGH' ? 'text-amber-400' : 'text-blue-400'
                    }`}>
                      {selectedNodeData.severity}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons depending on type */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                {selectedNodeData.category === 'evidence' && (
                  <button
                    onClick={() => onNavigate && onNavigate('evidence', selectedNodeData.id)}
                    className="w-full py-2 px-3 rounded-lg bg-cyber-cyan text-navy-950 font-bold hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-glow-cyan text-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect in Evidence Explorer
                  </button>
                )}

                {selectedNodeData.category === 'finding' && (
                  <>
                    <button
                      onClick={() => onNavigate && onNavigate('evidence', selectedNodeData.id)}
                      className="w-full py-2 px-3 rounded-lg bg-cyber-cyan text-navy-950 font-bold hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-glow-cyan text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Trace to Source Document Passages
                    </button>
                    <button
                      onClick={() => onNavigate && onNavigate('review', selectedNodeData.id)}
                      className="w-full py-2 px-3 rounded-lg bg-navy-800 text-emerald-400 border border-emerald-500/40 font-semibold hover:bg-emerald-950/60 transition-all flex items-center justify-center gap-1.5 text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Submit to Human Review Console
                    </button>
                  </>
                )}

                {selectedNodeData.category === 'claim' && (
                  <button
                    onClick={() => onNavigate && onNavigate('workspace', selectedNodeData.id)}
                    className="w-full py-2 px-3 rounded-lg bg-amber-500 text-navy-950 font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-1.5 shadow-glow-amber text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Investigation Workspace
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
