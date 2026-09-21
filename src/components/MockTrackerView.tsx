import React, { useState, useEffect } from 'react';
import { MockTestEntry } from '../types';
import { INITIAL_MOCK_TESTS } from '../data/metadataData';
import { Plus, Trash2, TrendingUp, AlertCircle, Award, Target, CheckCircle2, X } from 'lucide-react';

interface MockTrackerViewProps {
  mocks: MockTestEntry[];
  setMocks: React.Dispatch<React.SetStateAction<MockTestEntry[]>>;
}

export const MockTrackerView: React.FC<MockTrackerViewProps> = ({ mocks, setMocks }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMock, setNewMock] = useState<Partial<MockTestEntry>>({
    testName: '',
    date: new Date().toISOString().split('T')[0],
    totalMarks: 100,
    scoreObtained: 0,
    rankOrPercentile: '',
    accuracyPercent: 80,
    weakSubjects: '',
    weakTopics: '',
    mistakeType: 'Calculation Error',
    improvementAction: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('gate_mock_tests', JSON.stringify(mocks));
    } catch (e) {
      console.error(e);
    }
  }, [mocks]);

  const handleAddMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMock.testName) return;

    const entry: MockTestEntry = {
      id: `mock-${Date.now()}`,
      testName: newMock.testName || 'Full Length Mock',
      date: newMock.date || new Date().toISOString().split('T')[0],
      totalMarks: Number(newMock.totalMarks) || 100,
      scoreObtained: Number(newMock.scoreObtained) || 0,
      rankOrPercentile: newMock.rankOrPercentile || '-',
      accuracyPercent: Number(newMock.accuracyPercent) || 0,
      weakSubjects: newMock.weakSubjects || '-',
      weakTopics: newMock.weakTopics || '-',
      mistakeType: (newMock.mistakeType as any) || 'Calculation Error',
      improvementAction: newMock.improvementAction || '-'
    };

    setMocks([entry, ...mocks]);
    setShowAddModal(false);
    setNewMock({
      testName: '',
      date: new Date().toISOString().split('T')[0],
      totalMarks: 100,
      scoreObtained: 0,
      rankOrPercentile: '',
      accuracyPercent: 80,
      weakSubjects: '',
      weakTopics: '',
      mistakeType: 'Calculation Error',
      improvementAction: ''
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this mock test record?')) {
      setMocks(mocks.filter(m => m.id !== id));
    }
  };

  // Stats calculation
  const avgScore = mocks.length > 0
    ? (mocks.reduce((s, m) => s + m.scoreObtained, 0) / mocks.length).toFixed(1)
    : '0';

  const avgAccuracy = mocks.length > 0
    ? (mocks.reduce((s, m) => s + m.accuracyPercent, 0) / mocks.length).toFixed(1)
    : '0';

  const maxScore = mocks.length > 0
    ? Math.max(...mocks.map(m => m.scoreObtained))
    : 0;

  // Mistake breakdown
  const mistakeCounts = mocks.reduce((acc, m) => {
    acc[m.mistakeType] = (acc[m.mistakeType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Top Header with KPI stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-600" />
            <span>Mock Test Performance &amp; Error Analysis Log</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Logging every mock prevents recurring conceptual errors and negative marks on GATE day.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Mock Test</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Mocks Attempted
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{mocks.length} tests</div>
          <span className="text-xs text-slate-400">Target: 25-30 mocks</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Average Score
          </span>
          <div className="text-2xl font-bold text-blue-600 mt-1">{avgScore} / 100</div>
          <span className="text-xs text-slate-400">Best: {maxScore} marks</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Average Accuracy
          </span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{avgAccuracy}%</div>
          <span className="text-xs text-slate-400">Benchmark: &gt;85%</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Top Error Source
          </span>
          <div className="text-lg font-bold text-red-600 mt-1 truncate">
            {Object.keys(mistakeCounts).sort((a, b) => mistakeCounts[b] - mistakeCounts[a])[0] || 'None'}
          </div>
          <span className="text-xs text-slate-400">Review action items</span>
        </div>
      </div>

      {/* Mock Tests Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold text-xs border-b border-slate-800">
                <th className="py-3 px-4 min-w-[200px]">Test Name &amp; Date</th>
                <th className="py-3 px-3 text-center w-28">Score (/100)</th>
                <th className="py-3 px-3 text-center min-w-[140px]">Rank / Percentile</th>
                <th className="py-3 px-3 text-center w-24">Accuracy</th>
                <th className="py-3 px-4 min-w-[180px]">Weak Subject / Topic</th>
                <th className="py-3 px-3 text-center min-w-[160px]">Mistake Nature</th>
                <th className="py-3 px-4 min-w-[240px]">Action Plan</th>
                <th className="py-3 px-2 text-center w-12">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mocks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No mock tests logged yet. Click "Log New Mock Test" to record your scores and mistake analysis!
                  </td>
                </tr>
              ) : (
                mocks.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{m.testName}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{m.date}</div>
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 text-sm">
                      {m.scoreObtained}
                    </td>

                    <td className="py-3 px-3 text-center text-xs font-semibold text-slate-700">
                      {m.rankOrPercentile}
                    </td>

                    <td className="py-3 px-3 text-center font-mono text-xs text-emerald-700 font-bold">
                      {m.accuracyPercent}%
                    </td>

                    <td className="py-3 px-4 text-xs">
                      <div className="font-semibold text-slate-800">{m.weakSubjects}</div>
                      <div className="text-slate-500 mt-0.5 text-[11px] line-clamp-1">{m.weakTopics}</div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          m.mistakeType === 'Calculation Error'
                            ? 'bg-amber-100 text-amber-800'
                            : m.mistakeType === 'Conceptual Gap'
                            ? 'bg-red-100 text-red-800'
                            : m.mistakeType === 'Misread Question'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {m.mistakeType}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-xs text-slate-600 leading-relaxed">
                      {m.improvementAction}
                    </td>

                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1 rounded text-slate-300 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Mock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Log Mock Test Attempt</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMock} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Mock Test Name / Series</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Made Easy All India Mock 3"
                  value={newMock.testName}
                  onChange={e => setNewMock({ ...newMock, testName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newMock.date}
                    onChange={e => setNewMock({ ...newMock, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Score Obtained (/100)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 64.33"
                    value={newMock.scoreObtained}
                    onChange={e => setNewMock({ ...newMock, scoreObtained: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Rank / Percentile</label>
                  <input
                    type="text"
                    placeholder="e.g. AIR 154 / 96.8%"
                    value={newMock.rankOrPercentile}
                    onChange={e => setNewMock({ ...newMock, rankOrPercentile: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Accuracy %</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 84.5"
                    value={newMock.accuracyPercent}
                    onChange={e => setNewMock({ ...newMock, accuracyPercent: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Weak Subject(s)</label>
                  <input
                    type="text"
                    placeholder="e.g. Operating Systems, Networks"
                    value={newMock.weakSubjects}
                    onChange={e => setNewMock({ ...newMock, weakSubjects: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Dominant Mistake Type</label>
                  <select
                    value={newMock.mistakeType}
                    onChange={e => setNewMock({ ...newMock, mistakeType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                  >
                    <option value="Calculation Error">Calculation Error</option>
                    <option value="Conceptual Gap">Conceptual Gap</option>
                    <option value="Misread Question">Misread Question</option>
                    <option value="Time Pressure">Time Pressure</option>
                    <option value="Silly Guessing">Silly Guessing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Weak Topics</label>
                <input
                  type="text"
                  placeholder="e.g. Paging EMAT, TCP AIMD slow start"
                  value={newMock.weakTopics}
                  onChange={e => setNewMock({ ...newMock, weakTopics: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Improvement Action Plan</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Re-read Galvin Chapter 9, solve 15 questions on multi-level paging"
                  value={newMock.improvementAction}
                  onChange={e => setNewMock({ ...newMock, improvementAction: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
