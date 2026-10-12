import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  Eye, 
  GitBranch, 
  UserCheck, 
  UploadCloud, 
  FileText, 
  History, 
  Compass, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  findingsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  findingsCount = 4,
}) => {
  const menuItems = [
    { id: 'landing' as NavigationTab, label: 'Overview', icon: Home },
    { id: 'dashboard' as NavigationTab, label: 'Investigation Dashboard', icon: LayoutDashboard },
    { id: 'graph' as NavigationTab, label: 'Knowledge Graph', icon: Layers, highlight: true },
    { id: 'workspace' as NavigationTab, label: 'AI Workspace', icon: Cpu },
    { id: 'findings' as NavigationTab, label: 'Inconsistency Matrix', icon: AlertTriangle, badge: findingsCount },
    { id: 'evidence' as NavigationTab, label: 'Evidence Explorer', icon: Eye },
    { id: 'architecture' as NavigationTab, label: 'AI Architecture', icon: GitBranch },
    { id: 'review' as NavigationTab, label: 'Review Console', icon: UserCheck },
    { id: 'upload' as NavigationTab, label: 'Document Intake', icon: UploadCloud },
    { id: 'report' as NavigationTab, label: 'Investigation Report', icon: FileText },
    { id: 'audit' as NavigationTab, label: 'Audit & Evaluation', icon: History },
    { id: 'roadmap' as NavigationTab, label: 'Principles & Roadmap', icon: Compass },
  ];

  return (
    <aside 
      className={`fixed top-16 left-0 bottom-0 z-30 bg-navy-950/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Navigation Links */}
      <div className="py-4 px-2 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
        {menuItems.map(item => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyber-cyan/20 to-blue-500/10 text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan/20 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-navy-900 border border-transparent'
              } ${item.highlight && !isActive ? 'text-cyan-300 hover:text-white' : ''}`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyber-cyan' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
              
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">
                  {item.label}
                </span>
              )}

              {!isCollapsed && item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
                  {item.badge}
                </span>
              )}

              {!isCollapsed && item.highlight && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-white/10 flex items-center justify-between">
        {!isCollapsed && (
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-mono text-slate-500 block truncate">
              Flarre AI Challenge 2026
            </span>
            <span className="text-[9px] font-mono text-slate-400 truncate block">
              B. Karthikeya (CBIT)
            </span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 transition-colors ml-auto"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
