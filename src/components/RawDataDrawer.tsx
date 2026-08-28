import React, { useState } from 'react';
import { 
  JOB_DESCRIPTION, 
  RESUME_A_TEXT, 
  TRANSCRIPT_A_TEXT, 
  RESUME_B_TEXT, 
  TRANSCRIPT_B_TEXT 
} from '../data/defaultCandidates';
import { X, FileText, Search, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RawDataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RawDataDrawer: React.FC<RawDataDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'jd' | 'resume_a' | 'transcript_a' | 'resume_b' | 'transcript_b'>('jd');
  const [copied, setCopied] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const getDocContent = () => {
    switch (activeTab) {
      case 'jd':
        return { title: '02_Job_Description.pdf (Voltrix Logistics)', text: JOB_DESCRIPTION, tag: 'Job Spec' };
      case 'resume_a':
        return { title: '03_Resume_A.pdf (Rohan Malhotra)', text: RESUME_A_TEXT, tag: 'Resume' };
      case 'transcript_a':
        return { title: '05_Transcript_A.pdf (Rohan Malhotra)', text: TRANSCRIPT_A_TEXT, tag: 'Transcript' };
      case 'resume_b':
        return { title: '04_Resume_B.pdf (Ananya Iyer)', text: RESUME_B_TEXT, tag: 'Resume' };
      case 'transcript_b':
        return { title: '06_Transcript_B.pdf (Ananya Iyer)', text: TRANSCRIPT_B_TEXT, tag: 'Transcript' };
      default:
        return { title: 'Document', text: '', tag: 'Doc' };
    }
  };

  const doc = getDocContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(doc.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 relative z-10"
        >
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
                <Terminal className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">Primary Source Dossier</h2>
                <p className="text-[11px] text-slate-400">Ground truth context evaluated by the 4 AI panel personas</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 p-3 border-b border-slate-200 bg-slate-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('jd')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'jd' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Job Spec
            </button>
            <button
              onClick={() => setActiveTab('resume_a')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'resume_a' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Resume A (Rohan)
            </button>
            <button
              onClick={() => setActiveTab('transcript_a')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'transcript_a' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Transcript A (Rohan)
            </button>
            <button
              onClick={() => setActiveTab('resume_b')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'resume_b' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Resume B (Ananya)
            </button>
            <button
              onClick={() => setActiveTab('transcript_b')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'transcript_b' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              Transcript B (Ananya)
            </button>
          </div>

          {/* Action / Search Bar */}
          <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between gap-3">
            <div className="flex-1 text-xs font-bold text-slate-900 truncate font-mono">
              <span className="text-indigo-600 font-sans mr-2">[{doc.tag}]</span>
              {doc.title}
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-all shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-600" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>
          </div>

          {/* Content Viewer */}
          <div className="flex-1 p-6 overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed bg-slate-50/70 whitespace-pre-wrap select-text border-t border-slate-100">
            {doc.text}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

