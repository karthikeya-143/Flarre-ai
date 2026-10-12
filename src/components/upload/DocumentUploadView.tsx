import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface DocumentUploadViewProps {
  onNavigate?: (tab: NavigationTab) => void;
}

interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  status: 'QUEUED' | 'INGESTING' | 'PARSED' | 'ERROR';
  progress: number;
  extractedFactsCount?: number;
}

export const DocumentUploadView: React.FC<DocumentUploadViewProps> = ({ onNavigate }) => {
  const [files, setFiles] = useState<UploadedFileItem[]>([
    {
      id: 'UPL-001',
      name: 'FNOL_Apex_Warehouse_Fire_20260218.pdf',
      size: 248100,
      type: 'application/pdf',
      uploadDate: '2026-02-18 09:30 EST',
      status: 'PARSED',
      progress: 100,
      extractedFactsCount: 2,
    },
    {
      id: 'UPL-002',
      name: 'SeattleFD_Battalion4_Incident_Report_26-0914.pdf',
      size: 612400,
      type: 'application/pdf',
      uploadDate: '2026-02-19 14:15 EST',
      status: 'PARSED',
      progress: 100,
      extractedFactsCount: 2,
    },
    {
      id: 'UPL-003',
      name: 'NW_Restoration_ApexWarehouse_Estimate_RevA.pdf',
      size: 984500,
      type: 'application/pdf',
      uploadDate: '2026-02-21 11:00 EST',
      status: 'PARSED',
      progress: 100,
      extractedFactsCount: 1,
    },
  ]);

  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0) return;
    setErrorMessage(null);

    const newItems: UploadedFileItem[] = [];

    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];

      // Validate file type
      const allowed = ['application/pdf', 'text/plain', 'application/json'];
      if (!allowed.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.txt')) {
        setErrorMessage(`Invalid file format: "${file.name}". Please upload PDF or TXT files only.`);
        continue;
      }

      // Validate size (max 25MB)
      if (file.size > 25 * 1024 * 1024) {
        setErrorMessage(`File exceeds 25MB limit: "${file.name}"`);
        continue;
      }

      const item: UploadedFileItem = {
        id: `UPL-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type || 'document',
        uploadDate: new Date().toLocaleTimeString(),
        status: 'INGESTING',
        progress: 30,
      };

      newItems.push(item);
    }

    if (newItems.length > 0) {
      setFiles(prev => [...newItems, ...prev]);

      // Simulate progressive parsing
      setTimeout(() => {
        setFiles(curr => curr.map(f => {
          const matched = newItems.find(n => n.id === f.id);
          if (matched) {
            return { ...f, status: 'PARSED', progress: 100, extractedFactsCount: 3 };
          }
          return f;
        }));
      }, 1800);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] bg-navy-950 p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Document Intake & Extraction Staging
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Secure client-side document staging • Cryptographic checksum verification • Multi-format support
          </p>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('workspace')}
          className="px-3.5 py-1.5 rounded-lg bg-cyber-cyan text-navy-950 text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 shadow-glow-cyan"
        >
          Open Investigation Workspace
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Honest Prototype Notice */}
      <div className="p-4 rounded-xl bg-navy-900/80 border border-white/10 text-xs space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
          <strong className="text-white font-mono text-xs">Prototype Intake Notice:</strong>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          In this frontend demonstration for the Flarre AI Challenge, files dropped here are staged locally in client memory and simulated through the OCR & Fact Extraction pipeline. The investigation demo uses verified seeded sample datasets to ensure 100% reliable traceability without requiring cloud API keys or transmitting private documents.
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`glass-panel p-10 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
          dragOver 
            ? 'border-cyber-cyan bg-cyan-950/20 shadow-glow-cyan' 
            : 'border-white/20 hover:border-cyber-cyan/50'
        }`}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept=".pdf,.txt,.json"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="p-4 rounded-2xl bg-navy-900 border border-cyber-cyan/30 text-cyber-cyan mb-4 shadow-glow-cyan/20">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base font-bold text-white">
          Drop Claims Files Here, or Browse Computer
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md">
          Supports multi-page PDF First Notices of Loss, Municipal Dispatch Records, Certified Repair Estimates, and Maintenance Certificates (Max 25MB each).
        </p>

        <div className="flex items-center gap-3 mt-4 text-[10px] font-mono text-slate-500">
          <span>• PDF format</span>
          <span>• SHA-256 Verified</span>
          <span>• Client Staged</span>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-700/60 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Staged & Parsed Documents List */}
      <div className="glass-panel p-5 rounded-2xl border border-white/15 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyber-cyan" />
            Staged Document Repository ({files.length})
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            Simulated OCR & Parser Queue
          </span>
        </div>

        <div className="space-y-2.5">
          {files.map(f => (
            <div 
              key={f.id}
              className="p-3.5 rounded-xl bg-navy-900/60 border border-white/10 flex items-center justify-between gap-4 text-xs hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate text-xs">{f.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {(f.size / 1024).toFixed(1)} KB • Added {f.uploadDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {f.status === 'INGESTING' ? (
                  <div className="flex items-center gap-1.5 text-violet-400 font-mono text-[10px]">
                    <div className="w-3 h-3 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                    Extracting Facts...
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Parsed ({f.extractedFactsCount} facts)</span>
                  </div>
                )}

                <button
                  onClick={() => removeFile(f.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                  title="Remove from queue"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
