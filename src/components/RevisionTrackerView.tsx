import React, { useState, useEffect } from 'react';
import { GateTopic, RevisionItem } from '../types';
import { Check, CheckCircle2, RotateCcw, AlertTriangle, Search, Filter } from 'lucide-react';

interface RevisionTrackerViewProps {
  topics: GateTopic[];
}

export const RevisionTrackerView: React.FC<RevisionTrackerViewProps> = ({ topics }) => {
  const [revisions, setRevisions] = useState<RevisionItem[]>(() => {
    try {
      const saved = localStorage.getItem('gate_revision_tracker');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initialized
    return topics.map(t => ({
      id: `rev-${t.id}`,
      topicId: t.id,
      subject: t.subject,
      topic: t.topic,
      priority: t.priority,
      firstStudyDate: '',
      rev1Date: '',
      rev2Date: '',
      rev3Date: '',
      pyqsCompleted: false,
      mockTested: false,
      confidence: 'Medium' as const
    }));
  });

  const [subjectFilter, setSubjectFilter] = useState('All');
  const [confidenceFilter, setConfidenceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('gate_revision_tracker', JSON.stringify(revisions));
    } catch (e) {
      console.error(e);
    }
  }, [revisions]);

  const updateItem = (id: string, field: keyof RevisionItem, value: any) => {
    setRevisions(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const subjects = Array.from(new Set(topics.map(t => t.subject)));

  const filteredRevisions = revisions.filter(r => {
    if (subjectFilter !== 'All' && r.subject !== subjectFilter) return false;
    if (confidenceFilter !== 'All' && r.confidence !== confidenceFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return r.topic.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const lowConfidenceCount = revisions.filter(r => r.confidence === 'Low').length;
  const highConfidenceCount = revisions.filter(r => r.confidence === 'High').length;
  const rev1Done = revisions.filter(r => r.rev1Date !== '').length;

  return (
    <div className="space-y-5">
      {/* Top Banner with Spaced Repetition Science */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-2">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-indigo-600" />
          <span>3-Cycle Spaced Repetition Revision Tracker</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The human brain loses 70% of new conceptual knowledge within 48 hours without active recall.
          Log your <strong>First Study Date</strong>, then complete <strong>Rev 1 (Day 7)</strong>,{' '}
          <strong>Rev 2 (Day 21)</strong>, and <strong>Rev 3 (Day 60)</strong> to achieve permanent long-term memory.
        </p>

        <div className="flex flex-wrap gap-4 pt-2 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span>Rev 1 Done: <strong>{rev1Done}</strong> / {revisions.length}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>High Confidence: <strong>{highConfidenceCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-red-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Needs Urgent Revision (Low): <strong>{lowConfidenceCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search topic or subject..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={subjectFilter}
            onChange={e => setSubjectFilter(e.target.value)}
            className="px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">All Subjects</option>
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={confidenceFilter}
            onChange={e => setConfidenceFilter(e.target.value)}
            className="px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All">All Confidence Levels</option>
            <option value="Low">Low Confidence (Urgent)</option>
            <option value="Medium">Medium Confidence</option>
            <option value="High">High Confidence (Solid)</option>
          </select>
        </div>
      </div>

      {/* Revision Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold text-xs border-b border-slate-800">
                <th className="py-3 px-4 min-w-[220px]">Topic &amp; Subject</th>
                <th className="py-3 px-3 text-center min-w-[140px]">First Study</th>
                <th className="py-3 px-3 text-center min-w-[140px]">Rev 1 (Day 7)</th>
                <th className="py-3 px-3 text-center min-w-[140px]">Rev 2 (Day 21)</th>
                <th className="py-3 px-3 text-center min-w-[140px]">Rev 3 (Day 60)</th>
                <th className="py-3 px-3 text-center w-28">PYQ Done?</th>
                <th className="py-3 px-3 text-center w-28">Mock Tested?</th>
                <th className="py-3 px-4 text-center min-w-[140px]">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRevisions.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{item.topic}</div>
                    <div className="text-xs text-slate-500">{item.subject}</div>
                  </td>

                  {/* Dates */}
                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="date"
                      value={item.firstStudyDate}
                      onChange={e => updateItem(item.id, 'firstStudyDate', e.target.value)}
                      className="px-2 py-1 rounded border border-slate-200 text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="date"
                      value={item.rev1Date}
                      onChange={e => updateItem(item.id, 'rev1Date', e.target.value)}
                      className="px-2 py-1 rounded border border-slate-200 text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="date"
                      value={item.rev2Date}
                      onChange={e => updateItem(item.id, 'rev2Date', e.target.value)}
                      className="px-2 py-1 rounded border border-slate-200 text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="date"
                      value={item.rev3Date}
                      onChange={e => updateItem(item.id, 'rev3Date', e.target.value)}
                      className="px-2 py-1 rounded border border-slate-200 text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </td>

                  {/* PYQs Completed Checkbox */}
                  <td className="py-2.5 px-3 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.pyqsCompleted}
                        onChange={e => updateItem(item.id, 'pyqsCompleted', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                    </label>
                  </td>

                  {/* Mock Tested Checkbox */}
                  <td className="py-2.5 px-3 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.mockTested}
                        onChange={e => updateItem(item.id, 'mockTested', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                    </label>
                  </td>

                  {/* Confidence Dropdown */}
                  <td className="py-2.5 px-4 text-center">
                    <select
                      value={item.confidence}
                      onChange={e => updateItem(item.id, 'confidence', e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                        item.confidence === 'High'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : item.confidence === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-red-50 text-red-700 border-red-300'
                      }`}
                    >
                      <option value="Low">Low ⚠️</option>
                      <option value="Medium">Medium ⏳</option>
                      <option value="High">High 🌟</option>
                    </select>
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
