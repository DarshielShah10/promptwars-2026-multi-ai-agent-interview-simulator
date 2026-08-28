import React, { useState } from 'react';
import { 
  JOB_DESCRIPTION, 
  RESUME_A_TEXT, 
  TRANSCRIPT_A_TEXT, 
  RESUME_B_TEXT, 
  TRANSCRIPT_B_TEXT 
} from '../data/defaultCandidates';
import { X, FileText, Search, Copy, Check } from 'lucide-react';

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
        return { title: '02_Job_Description.pdf (Voltrix Logistics)', text: JOB_DESCRIPTION };
      case 'resume_a':
        return { title: '03_Resume_A.pdf (Rohan Malhotra)', text: RESUME_A_TEXT };
      case 'transcript_a':
        return { title: '05_Transcript_A.pdf (Rohan Malhotra)', text: TRANSCRIPT_A_TEXT };
      case 'resume_b':
        return { title: '04_Resume_B.pdf (Ananya Iyer)', text: RESUME_B_TEXT };
      case 'transcript_b':
        return { title: '06_Transcript_B.pdf (Ananya Iyer)', text: TRANSCRIPT_B_TEXT };
      default:
        return { title: 'Document', text: '' };
    }
  };

  const doc = getDocContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(doc.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Source Dossier Documents</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 border-b border-slate-200 bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab('jd')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'jd' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Job Description
          </button>
          <button
            onClick={() => setActiveTab('resume_a')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'resume_a' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Resume A (Rohan)
          </button>
          <button
            onClick={() => setActiveTab('transcript_a')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'transcript_a' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Transcript A (Rohan)
          </button>
          <button
            onClick={() => setActiveTab('resume_b')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'resume_b' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Resume B (Ananya)
          </button>
          <button
            onClick={() => setActiveTab('transcript_b')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'transcript_b' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Transcript B (Ananya)
          </button>
        </div>

        {/* Action / Search Bar */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <div className="flex-1 text-xs font-bold text-slate-800 truncate">
            {doc.title}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-xs"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed bg-slate-50 whitespace-pre-wrap select-text">
          {doc.text}
        </div>

      </div>
    </div>
  );
};
