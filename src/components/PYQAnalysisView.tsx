import React, { useState, useMemo } from 'react';
import { GateTopic } from '../types';
import { Search, TrendingUp, AlertCircle, BarChart3, HelpCircle, Layers } from 'lucide-react';

interface PYQAnalysisViewProps {
  topics: GateTopic[];
}

export const PYQAnalysisView: React.FC<PYQAnalysisViewProps> = ({ topics }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const subjects = useMemo(() => Array.from(new Set(topics.map(t => t.subject))), [topics]);

  // Sort topics by 15-yr PYQ count descending
  const sortedByPYQ = useMemo(() => {
    return [...topics].sort((a, b) => b.pyqCountLast15Years - a.pyqCountLast15Years);
  }, [topics]);

  const filteredTopics = useMemo(() => {
    return sortedByPYQ.filter(t => {
      if (selectedSubject !== 'All' && t.subject !== selectedSubject) return false;
      if (selectedType !== 'All' && t.questionType !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.topic.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.commonPatterns.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [sortedByPYQ, selectedSubject, selectedType, searchQuery]);

  // High-level PYQ Stats
  const topTopics = sortedByPYQ.slice(0, 5);
  const totalPYQsEstimated = sortedByPYQ.reduce((s, t) => s + t.pyqCountLast15Years, 0);

  return (
    <div className="space-y-6">
      {/* Methodology & Disclaimer Notice */}
      <div className="bg-amber-50 rounded-xl p-4 sm:p-5 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>10–15 Year GATE CSE PYQ Empirical Trend Methodology</span>
        </div>
        <p className="text-amber-800 leading-relaxed">
          <strong>Data Source &amp; Methodology:</strong> This analysis synthesizes approximately 1,600+ questions
          from official GATE CSE papers spanning 2010 through 2025 across all sets.
          Question counts and frequencies represent empirical trends and conceptual weightage inferences rather than
          an official IIT/IISc quota. GATE question papers vary from year to year; no single topic is mathematically guaranteed
          to appear, but mastering high-frequency clusters provides the highest statistical return on preparation time.
        </p>
      </div>

      {/* Top 5 High-Yield Topic Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-red-600" />
          <span>Top 5 Highest-Yield Conceptual Clusters (Last 15 Years)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {topTopics.map((t, idx) => (
            <div
              key={t.id}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm relative overflow-hidden"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                #{idx + 1} Highest Frequency
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">{t.topic}</div>
              <div className="text-xs text-blue-600 font-medium mt-0.5">{t.subject}</div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-xl font-bold text-slate-900">~{t.pyqCountLast15Years}</span>
                <span className="text-xs text-slate-500">questions asked</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">{t.pyqFrequency}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search question patterns, subjects, or concepts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">All Subjects</option>
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">All Question Types</option>
            <option value="Predominantly Numerical">Predominantly Numerical</option>
            <option value="Balanced Numerical & Conceptual">Balanced Numerical & Conceptual</option>
            <option value="Predominantly Conceptual">Predominantly Conceptual</option>
          </select>
        </div>
      </div>

      {/* Main PYQ Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold text-xs border-b border-slate-800">
                <th className="py-3 px-3 w-12 text-center">Rank</th>
                <th className="py-3 px-4 min-w-[200px]">Subject &amp; Topic</th>
                <th className="py-3 px-3 text-center min-w-[100px]">15-Yr PYQs</th>
                <th className="py-3 px-3 text-center min-w-[150px]">Exam Frequency</th>
                <th className="py-3 px-4 min-w-[280px]">Frequent Question Patterns</th>
                <th className="py-3 px-3 text-center min-w-[170px]">Question Nature</th>
                <th className="py-3 px-3 text-center w-24">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTopics.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 text-center text-slate-400 font-mono text-xs">
                    #{idx + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{item.topic}</div>
                    <div className="text-xs text-slate-500">{item.subject} • {item.chapter}</div>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900 text-sm">
                    ~{item.pyqCountLast15Years}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">
                      {item.pyqFrequency}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600 leading-relaxed">
                    {item.commonPatterns}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        item.questionType === 'Predominantly Numerical'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : item.questionType === 'Predominantly Conceptual'
                          ? 'bg-purple-50 text-purple-700 border border-purple-100'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      }`}
                    >
                      {item.questionType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        item.difficulty === 'Easy'
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.difficulty === 'Medium'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
