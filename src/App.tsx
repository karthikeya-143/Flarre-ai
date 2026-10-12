import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { KnowledgeGraphView } from './components/graph/KnowledgeGraphView';
import { WorkspaceView } from './components/workspace/WorkspaceView';
import { FindingsView } from './components/findings/FindingsView';
import { EvidenceExplorerView } from './components/evidence/EvidenceExplorerView';
import { ArchitectureView } from './components/architecture/ArchitectureView';
import { ReviewConsoleView } from './components/review/ReviewConsoleView';
import { DocumentUploadView } from './components/upload/DocumentUploadView';
import { ReportView } from './components/report/ReportView';
import { AuditEvaluationView } from './components/audit/AuditEvaluationView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { InteractiveDemoModal } from './components/demo/InteractiveDemoModal';
import { NavigationTab, AuditEvent } from './types';
import { mockAuditTrail, mockClaim1Findings } from './data/mockData';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('landing');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Deep-linking context passed between views
  const [targetFindingId, setTargetFindingId] = useState<string | null>(null);
  const [targetClaimId, setTargetClaimId] = useState<string>('CLM-2026-8941');

  // Dynamic audit events state
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(mockAuditTrail);

  const handleNavigate = (tab: NavigationTab, targetId?: string) => {
    if (targetId) {
      if (targetId.startsWith('FIND-') || targetId.startsWith('PASS-')) {
        setTargetFindingId(targetId);
      } else if (targetId.startsWith('CLM-')) {
        setTargetClaimId(targetId);
      }
    }
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuditLogged = (event: AuditEvent) => {
    setAuditEvents(prev => [event, ...prev]);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-cyan/30 selection:text-cyber-cyan">
      {/* Top Navbar */}
      <Navbar 
        onNavigate={handleNavigate}
        onRunDemo={() => setDemoModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex w-full relative">
        
        {/* Sidebar (visible on non-landing views, or toggleable) */}
        {currentTab !== 'landing' && (
          <Sidebar
            currentTab={currentTab}
            onSelectTab={handleNavigate}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            findingsCount={mockClaim1Findings.length}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-2xl flex flex-col p-6 space-y-4 md:hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-bold text-white font-mono text-sm">INSURON AI Navigation</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            <div className="space-y-1.5 overflow-y-auto">
              {[
                { id: 'landing' as NavigationTab, label: 'Overview' },
                { id: 'dashboard' as NavigationTab, label: 'Investigation Dashboard' },
                { id: 'graph' as NavigationTab, label: 'Knowledge Graph' },
                { id: 'workspace' as NavigationTab, label: 'AI Workspace' },
                { id: 'findings' as NavigationTab, label: 'Inconsistency Matrix' },
                { id: 'evidence' as NavigationTab, label: 'Evidence Explorer' },
                { id: 'architecture' as NavigationTab, label: 'AI Architecture' },
                { id: 'review' as NavigationTab, label: 'Review Console' },
                { id: 'upload' as NavigationTab, label: 'Document Intake' },
                { id: 'report' as NavigationTab, label: 'Investigation Report' },
                { id: 'audit' as NavigationTab, label: 'Audit & Evaluation' },
                { id: 'roadmap' as NavigationTab, label: 'Principles & Roadmap' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold ${
                    currentTab === item.id 
                      ? 'bg-cyber-cyan text-navy-950' 
                      : 'text-slate-300 hover:bg-navy-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <main 
          className={`flex-1 transition-all duration-300 min-h-[calc(100vh-4rem)] ${
            currentTab !== 'landing' 
              ? isSidebarCollapsed 
                ? 'md:ml-16' 
                : 'md:ml-64'
              : 'ml-0'
          }`}
        >
          {currentTab === 'landing' && (
            <LandingPage 
              onNavigate={handleNavigate} 
              onRunDemo={() => setDemoModalOpen(true)} 
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardView 
              onNavigate={handleNavigate}
              onRunDemo={() => setDemoModalOpen(true)}
            />
          )}

          {currentTab === 'graph' && (
            <KnowledgeGraphView 
              onNavigate={handleNavigate}
              preselectedFindingId={targetFindingId}
            />
          )}

          {currentTab === 'workspace' && (
            <WorkspaceView 
              onNavigate={handleNavigate}
              selectedClaimId={targetClaimId}
            />
          )}

          {currentTab === 'findings' && (
            <FindingsView 
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === 'evidence' && (
            <EvidenceExplorerView 
              onNavigate={handleNavigate}
              initialFindingId={targetFindingId}
            />
          )}

          {currentTab === 'architecture' && (
            <ArchitectureView 
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === 'review' && (
            <ReviewConsoleView 
              onNavigate={handleNavigate}
              targetFindingId={targetFindingId}
              onAuditLogged={handleAuditLogged}
            />
          )}

          {currentTab === 'upload' && (
            <DocumentUploadView 
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === 'report' && (
            <ReportView 
              onNavigate={handleNavigate}
              selectedClaimId={targetClaimId}
            />
          )}

          {currentTab === 'audit' && (
            <AuditEvaluationView 
              onNavigate={handleNavigate}
              auditEvents={auditEvents}
            />
          )}

          {currentTab === 'roadmap' && (
            <RoadmapView 
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Interactive End-to-End Demo Modal */}
      <InteractiveDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
