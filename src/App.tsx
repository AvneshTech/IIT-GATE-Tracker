/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GATE_TOPICS } from './data/topicsData';
import { INITIAL_MOCK_TESTS } from './data/metadataData';
import { GateTopic, StatusLevel, MockTestEntry } from './types';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MasterPlanView } from './components/MasterPlanView';
import { PYQAnalysisView } from './components/PYQAnalysisView';
import { StudyPlansView } from './components/StudyPlansView';
import { RevisionTrackerView } from './components/RevisionTrackerView';
import { MockTrackerView } from './components/MockTrackerView';
import { FormulaSheetView } from './components/FormulaSheetView';
import { StrategyGuideView } from './components/StrategyGuideView';
import { downloadGateExcelWorkbook } from './utils/excelGenerator';
import { Download, RotateCcw, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState('All');
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);

  // Initialize topics with localStorage persistence
  const [topics, setTopics] = useState<GateTopic[]>(() => {
    try {
      const saved = localStorage.getItem('gate_topics_status');
      if (saved) {
        const statusMap: Record<string, StatusLevel> = JSON.parse(saved);
        return GATE_TOPICS.map((t: GateTopic) => ({
          ...t,
          status: statusMap[t.id] || t.status
        }));
      }
    } catch (e) {
      console.error(e);
    }
    return GATE_TOPICS;
  });

  // Mock tests
  const [mocks, setMocks] = useState<MockTestEntry[]>(() => {
    try {
      const saved = localStorage.getItem('gate_mock_tests');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MOCK_TESTS;
  });

  // Persist status changes
  const handleUpdateStatus = (topicId: string, status: StatusLevel) => {
    setTopics(prev => {
      const updated = prev.map(t => (t.id === topicId ? { ...t, status } : t));
      try {
        const statusMap: Record<string, StatusLevel> = {};
        updated.forEach(t => {
          if (t.status !== 'Not Started') {
            statusMap[t.id] = t.status;
          }
        });
        localStorage.setItem('gate_topics_status', JSON.stringify(statusMap));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSelectSubject = (subjectName: string) => {
    setSelectedSubjectFilter(subjectName);
    setActiveTab('master');
  };

  const handleSelectPriority = (priority: string) => {
    setSelectedPriorityFilter(priority);
    setActiveTab('master');
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all topic progress and revision dates?')) {
      localStorage.removeItem('gate_topics_status');
      localStorage.removeItem('gate_revision_tracker');
      localStorage.removeItem('gate_completed_weeks');
      setTopics(GATE_TOPICS);
      window.location.reload();
    }
  };

  const completedCount = topics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          if (tab === 'most-important') {
            setSelectedPriorityFilter('🔴 MOST IMPORTANT');
            setActiveTab('master');
          }
        }}
        topics={topics}
        isGeneratingExcel={isGeneratingExcel}
        setIsGeneratingExcel={setIsGeneratingExcel}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            topics={topics}
            onSelectSubject={handleSelectSubject}
            onSelectPriority={handleSelectPriority}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'master' && (
          <MasterPlanView
            topics={topics}
            onUpdateStatus={handleUpdateStatus}
            selectedSubjectFilter={selectedSubjectFilter}
            setSelectedSubjectFilter={setSelectedSubjectFilter}
            selectedPriorityFilter={selectedPriorityFilter}
            setSelectedPriorityFilter={setSelectedPriorityFilter}
          />
        )}

        {activeTab === 'pyq-analysis' && <PYQAnalysisView topics={topics} />}

        {activeTab === 'study-plans' && <StudyPlansView />}

        {activeTab === 'revision' && <RevisionTrackerView topics={topics} />}

        {activeTab === 'mock-tests' && <MockTrackerView mocks={mocks} setMocks={setMocks} />}

        {activeTab === 'formulas' && <FormulaSheetView />}

        {activeTab === 'strategy' && <StrategyGuideView topics={topics} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-semibold block">GATE CSE Preparation Excel Hub</span>
              <span>Based on the latest official GATE CSE syllabus • All 11 subjects covered</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => downloadGateExcelWorkbook(topics)}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Excel (.xlsx)</span>
            </button>
            <span>•</span>
            <button
              onClick={handleResetProgress}
              className="flex items-center gap-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Local Progress</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
