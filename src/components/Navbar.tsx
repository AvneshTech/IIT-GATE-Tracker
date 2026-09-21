import React from 'react';
import { Download, CheckCircle2, BookOpen, Clock, FileSpreadsheet } from 'lucide-react';
import { GateTopic } from '../types';
import { downloadGateExcelWorkbook } from '../utils/excelGenerator';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  topics: GateTopic[];
  isGeneratingExcel: boolean;
  setIsGeneratingExcel: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  topics,
  isGeneratingExcel,
  setIsGeneratingExcel
}) => {
  const completedCount = topics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;
  const progressPercent = Math.round((completedCount / topics.length) * 100) || 0;

  const handleDownload = async () => {
    try {
      setIsGeneratingExcel(true);
      await downloadGateExcelWorkbook(topics);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback to static pre-generated file if any issues
      const link = document.createElement('a');
      link.href = '/GATE_CSE_Complete_Preparation_Roadmap.xlsx';
      link.download = 'GATE_CSE_Complete_Preparation_Roadmap.xlsx';
      link.click();
    } finally {
      setIsGeneratingExcel(false);
    }
  };

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'master', label: 'Master Plan', icon: '📋' },
    { id: 'most-important', label: '🔴 Most Important', icon: '🔥' },
    { id: 'pyq-analysis', label: 'PYQ Trends', icon: '📈' },
    { id: 'study-plans', label: 'Study Schedules', icon: '📅' },
    { id: 'revision', label: 'Revision Tracker', icon: '🔁' },
    { id: 'mock-tests', label: 'Mock Tests', icon: '🎯' },
    { id: 'formulas', label: 'Formula Notes', icon: '⚡' },
    { id: 'strategy', label: 'Strategy Guide', icon: '🧭' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">GATE CSE Roadmap</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                  Latest Official Syllabus
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Exam-Oriented Subject → Chapter → Topic Hierarchy with 15-Yr PYQ Weights
              </p>
            </div>
          </div>

          {/* Progress & Excel Download CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Completion Pill */}
            <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{completedCount}/{topics.length}</span>
              </div>
              <span className="text-slate-400">({progressPercent}%)</span>
              <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Primary Download Excel Button */}
            <button
              onClick={handleDownload}
              disabled={isGeneratingExcel}
              id="download-excel-header-btn"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
              title="Download full styled Excel workbook (.xlsx)"
            >
              <Download className={`w-4 h-4 ${isGeneratingExcel ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">
                {isGeneratingExcel ? 'Generating Excel...' : 'Download .xlsx Tracker'}
              </span>
              <span className="sm:hidden">.xlsx</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto py-2 no-scrollbar text-xs sm:text-sm">
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
