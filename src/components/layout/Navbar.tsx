import React from 'react';
import { 
  Shield, 
  Play, 
  Layers, 
  Sparkles, 
  Search, 
  Menu, 
  X,
  UserCheck,
  Cpu
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface NavbarProps {
  onNavigate: (tab: NavigationTab) => void;
  onRunDemo: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onRunDemo,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-navy-950/90 backdrop-blur-xl border-b border-white/10 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          onClick={() => onNavigate('landing')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="p-1.5 rounded-xl bg-navy-900 border border-cyber-cyan/40 text-cyber-cyan shadow-glow-cyan/30 group-hover:border-cyber-cyan transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-white tracking-wider font-sans">
                INSURON
              </span>
              <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyber-cyan/40">
                AI
              </span>
            </div>
            <p className="hidden sm:block text-[9px] text-slate-400 font-mono tracking-tight -mt-0.5">
              Connected Evidence Intelligence
            </p>
          </div>
        </div>
      </div>


      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onRunDemo}
          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyber-cyan via-blue-500 to-violet-600 text-navy-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shadow-glow-cyan"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Run AI Demo</span>
          <span className="sm:hidden">Demo</span>
        </button>

        {/* User / Investigator Pill */}
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-xs font-mono">
          <div className="w-7 h-7 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan text-xs font-bold">
            BK
          </div>
          <div className="text-right">
            <span className="text-slate-200 text-[11px] block leading-tight font-sans font-semibold">
              B. Karthikeya
            </span>
            <span className="text-[9px] text-slate-400 block leading-tight">
              CBIT • Flarre AI '26
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
