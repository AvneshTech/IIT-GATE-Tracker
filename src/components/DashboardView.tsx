import React from 'react';
import { GateTopic, SubjectSummary } from '../types';
import { SUBJECT_SUMMARIES, TIME_ESTIMATES } from '../data/metadataData';
import {
  CheckCircle2,
  Clock,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Download,
  AlertCircle,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { downloadGateExcelWorkbook } from '../utils/excelGenerator';

interface DashboardViewProps {
  topics: GateTopic[];
  onSelectSubject: (subjectName: string) => void;
  onSelectPriority: (priority: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  topics,
  onSelectSubject,
  onSelectPriority,
  onNavigateTab
}) => {
  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;
  const inProgressTopics = topics.filter(t => t.status === 'In Progress').length;
  const completionPercent = Math.round((completedTopics / totalTopics) * 100) || 0;

  // Most Important progress
  const mostImpTopics = topics.filter(t => t.priority.includes('MOST'));
  const mostImpCompleted = mostImpTopics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;
  const mostImpPercent = Math.round((mostImpCompleted / mostImpTopics.length) * 100) || 0;

  // Important progress
  const impTopics = topics.filter(t => t.priority.includes('IMPORTANT') && !t.priority.includes('MOST'));
  const impCompleted = impTopics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;

  // Hours calculation
  const totalSyllabusHours = topics.reduce((acc, t) => acc + t.totalHours, 0);
  const completedHours = topics
    .filter(t => t.status === 'Completed' || t.status === 'Mastered')
    .reduce((acc, t) => acc + t.totalHours, 0);
  const remainingHours = totalSyllabusHours - completedHours;

  return (
    <div className="space-y-6">
      {/* Top Banner with Excel Workbook Callout */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-5 sm:p-6 text-white border border-indigo-700/40 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
              <span>GATE CSE 2027 / 2028 Ready</span>
              <span>•</span>
              <span>11 Official Subjects</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Official GATE CSE Preparation Tracker &amp; Excel Master Roadmap
            </h1>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Every topic categorized into <strong className="text-red-300">🔴 Most Important</strong>,{' '}
              <strong className="text-amber-300">🟠 Important</strong>, and{' '}
              <strong className="text-emerald-300">🟢 Lower Priority</strong> using 15-year previous year question (PYQ)
              empirical weights. Use this live dashboard or download the formatted multi-sheet Excel spreadsheet.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => downloadGateExcelWorkbook(topics)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => onNavigateTab('master')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 font-medium text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <span>View Full Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Syllabus Progress */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Syllabus Complete</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              {completionPercent}%
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              {completedTopics} <span className="text-sm font-normal text-slate-500">/ {totalTopics} topics</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1.5">
              <span>{inProgressTopics} in progress</span>
              <span>{totalTopics - completedTopics - inProgressTopics} remaining</span>
            </div>
          </div>
        </div>

        {/* Card 2: Most Important Topics */}
        <div
          onClick={() => onSelectPriority('🔴 MOST IMPORTANT')}
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-red-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              Most Important (🔴)
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
              {mostImpPercent}%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">
              {mostImpCompleted} <span className="text-sm font-normal text-slate-500">/ {mostImpTopics.length}</span>
            </div>
            <div className="w-full h-2 bg-red-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-500 rounded-full"
                style={{ width: `${mostImpPercent}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1.5">
              ~75% of actual GATE exam marks originate from these topics
            </div>
          </div>
        </div>

        {/* Card 3: Estimated Study Hours */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Total Hours
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
              {completedHours}h done
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              {remainingHours} <span className="text-sm font-normal text-slate-500">hours left</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${Math.round((completedHours / totalSyllabusHours) * 100)}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-1.5">
              Target: {totalSyllabusHours}h theory &amp; practice
            </div>
          </div>
        </div>

        {/* Card 4: Recommended Study Velocity */}
        <div
          onClick={() => onNavigateTab('study-plans')}
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Standard Target
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">
              6 Months
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              7-8 <span className="text-sm font-normal text-slate-500">hrs / day</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2">
              Includes full syllabus, 15 years PYQs, 3-cycle spaced revision &amp; 25 mock tests.
            </p>
          </div>
        </div>
      </div>

      {/* Priority Distribution & Subject Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subject Progress & Topic Counts */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Subject-wise Syllabus Breakdown</h2>
              <p className="text-xs text-slate-500">Click any subject to filter topics and track status</p>
            </div>
            <span className="text-xs text-slate-400 font-medium">11 Subjects</span>
          </div>

          <div className="space-y-3">
            {SUBJECT_SUMMARIES.map(subj => {
              const subjTopics = topics.filter(t => t.subject === subj.name);
              const done = subjTopics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;
              const percent = Math.round((done / subjTopics.length) * 100) || 0;

              return (
                <div
                  key={subj.code}
                  onClick={() => onSelectSubject(subj.name)}
                  className="p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {subj.code}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{subj.name}</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {subj.pyqWeightageApprox}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <span>{subjTopics.length} topics</span>
                        <span>•</span>
                        <span className="text-red-600 font-medium">
                          {subj.mostImportantCount} Most Important
                        </span>
                        <span>•</span>
                        <span>{subj.totalEstimatedHours} hrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-28 text-right">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{done}/{subjTopics.length}</span>
                        <span className="font-semibold text-slate-700">{percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Priority Analysis & Quick Prep Sequence */}
        <div className="space-y-6">
          {/* Priority Weightage Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Priority Classification</h3>
            <p className="text-xs text-slate-500 mb-4">
              Categorization based on 15-year PYQ frequency and structural prerequisites.
            </p>

            <div className="space-y-3">
              <div
                onClick={() => onSelectPriority('🔴 MOST IMPORTANT')}
                className="p-3 rounded-lg bg-red-50/60 border border-red-200 hover:border-red-300 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-800">🔴 MOST IMPORTANT</span>
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                    {mostImpTopics.length} Topics (72%)
                  </span>
                </div>
                <p className="text-xs text-red-700/80 mt-1">
                  Tested every year (1-3 questions). Direct scoring impact. Master these first.
                </p>
              </div>

              <div
                onClick={() => onSelectPriority('🟠 IMPORTANT')}
                className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 hover:border-amber-300 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800">🟠 IMPORTANT</span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    {impTopics.length} Topics (26%)
                  </span>
                </div>
                <p className="text-xs text-amber-700/80 mt-1">
                  Regularly tested in alternate years. Crucial for securing ranks under AIR 500.
                </p>
              </div>

              <div
                onClick={() => onSelectPriority('🟢 LOWER PRIORITY')}
                className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">🟢 LOWER PRIORITY</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    1 Topic (2%)
                  </span>
                </div>
                <p className="text-xs text-emerald-700/80 mt-1">
                  Rarely asked standalone questions (e.g. FSM sequence state reduction).
                </p>
              </div>
            </div>
          </div>

          {/* Study Order Progression Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Recommended Progression Order</h3>
            <p className="text-xs text-slate-500 mb-3">
              Follow dependencies rather than random textbook chapters:
            </p>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-4 text-xs">
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                <span className="font-bold text-slate-900 block">Phase 1: Foundation (Weeks 1-7)</span>
                <span className="text-slate-500">Discrete Math, Linear Algebra, Probability &amp; Digital Logic</span>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                <span className="font-bold text-slate-900 block">Phase 2: Core Concepts (Weeks 8-16)</span>
                <span className="text-slate-500">C Programming, Data Structures, Algorithms, TOC &amp; Compiler</span>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-white" />
                <span className="font-bold text-slate-900 block">Phase 3: Systems &amp; Hardware (Weeks 17-24)</span>
                <span className="text-slate-500">Operating Systems, DBMS, COA &amp; Computer Networks</span>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                <span className="font-bold text-slate-900 block">Phase 4: Spaced Revision &amp; Mocks</span>
                <span className="text-slate-500">3-Cycle revision, 15 years PYQ drills, 25-30 full length mocks</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('strategy')}
              className="mt-4 w-full py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-blue-600 font-medium text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer border border-slate-200"
            >
              <span>Read Full Strategy &amp; Methodology Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
