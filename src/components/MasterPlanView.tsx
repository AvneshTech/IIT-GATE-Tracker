import React, { useState, useMemo } from 'react';
import { GateTopic, PriorityLevel, DifficultyLevel, StatusLevel } from '../types';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronDown,
  Sparkles,
  BookOpen,
  HelpCircle,
  X,
  Flame,
  Award
} from 'lucide-react';

interface MasterPlanViewProps {
  topics: GateTopic[];
  onUpdateStatus: (topicId: string, status: StatusLevel) => void;
  selectedSubjectFilter: string;
  setSelectedSubjectFilter: (sub: string) => void;
  selectedPriorityFilter: string;
  setSelectedPriorityFilter: (p: string) => void;
}

export const MasterPlanView: React.FC<MasterPlanViewProps> = ({
  topics,
  onUpdateStatus,
  selectedSubjectFilter,
  setSelectedSubjectFilter,
  selectedPriorityFilter,
  setSelectedPriorityFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTopicModal, setSelectedTopicModal] = useState<GateTopic | null>(null);

  const subjectsList = useMemo(() => {
    return Array.from(new Set(topics.map(t => t.subject)));
  }, [topics]);

  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      // Subject filter
      if (selectedSubjectFilter !== 'All' && t.subject !== selectedSubjectFilter) {
        return false;
      }
      // Priority filter
      if (selectedPriorityFilter !== 'All' && t.priority !== selectedPriorityFilter) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && t.difficulty !== selectedDifficulty) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'All' && t.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTopic = t.topic.toLowerCase().includes(q);
        const inSub = t.subTopic.toLowerCase().includes(q);
        const inChap = t.chapter.toLowerCase().includes(q);
        const inSubj = t.subject.toLowerCase().includes(q);
        const inFormula = t.keyFormulasOrConcepts.toLowerCase().includes(q);
        const inPatterns = t.commonPatterns.toLowerCase().includes(q);
        if (!inTopic && !inSub && !inChap && !inSubj && !inFormula && !inPatterns) {
          return false;
        }
      }
      return true;
    });
  }, [topics, selectedSubjectFilter, selectedPriorityFilter, selectedDifficulty, selectedStatus, searchQuery]);

  const completedInFilter = filteredTopics.filter(t => t.status === 'Completed' || t.status === 'Mastered').length;

  return (
    <div className="space-y-5">
      {/* Filter and Control Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by topic, sub-topic, formula, or question pattern..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Clear */}
          {(selectedSubjectFilter !== 'All' || selectedPriorityFilter !== 'All' || selectedDifficulty !== 'All' || selectedStatus !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubjectFilter('All');
                setSelectedPriorityFilter('All');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center gap-1 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Dropdowns & Priority Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Subject Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Subject:</span>
            <select
              value={selectedSubjectFilter}
              onChange={e => setSelectedSubjectFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Subjects ({topics.length})</option>
              {subjectsList.map(s => (
                <option key={s} value={s}>
                  {s} ({topics.filter(t => t.subject === s).length})
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Priority:</span>
            <select
              value={selectedPriorityFilter}
              onChange={e => setSelectedPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="🔴 MOST IMPORTANT">🔴 Most Important</option>
              <option value="🟠 IMPORTANT">🟠 Important</option>
              <option value="🟢 LOWER PRIORITY">🟢 Lower Priority</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Mastered">Mastered</option>
            </select>
          </div>

          <div className="ml-auto text-slate-500 text-xs font-medium">
            Showing <strong className="text-slate-800">{filteredTopics.length}</strong> topics ({completedInFilter} completed)
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold text-xs border-b border-slate-800">
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-4 min-w-[200px]">Subject &amp; Chapter</th>
                <th className="py-3 px-4 min-w-[280px]">Topic &amp; Sub-topics</th>
                <th className="py-3 px-3 text-center min-w-[150px]">Priority</th>
                <th className="py-3 px-3 text-center w-24">Difficulty</th>
                <th className="py-3 px-3 text-center min-w-[140px]">PYQ Frequency</th>
                <th className="py-3 px-3 text-center w-24">Study (h)</th>
                <th className="py-3 px-4 text-center min-w-[150px]">Status</th>
                <th className="py-3 px-3 text-center w-16">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTopics.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No topics matched the selected filters or search query.
                  </td>
                </tr>
              ) : (
                filteredTopics.map((item, idx) => {
                  const isCompleted = item.status === 'Completed' || item.status === 'Mastered';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCompleted ? 'bg-emerald-50/20' : ''
                      }`}
                    >
                      {/* Order */}
                      <td className="py-3 px-3 text-center text-slate-400 font-mono text-xs">
                        {item.studyOrder}
                      </td>

                      {/* Subject & Chapter */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 leading-snug">{item.subject}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.chapter}</div>
                      </td>

                      {/* Topic & Sub-topics */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 leading-snug">{item.topic}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.subTopic}
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                            {item.syllabusRef}
                          </span>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            item.priority.includes('MOST')
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : item.priority.includes('IMPORTANT')
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      {/* Difficulty */}
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

                      {/* PYQ Frequency */}
                      <td className="py-3 px-3 text-center">
                        <div className="text-xs font-medium text-slate-800">{item.pyqFrequency}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          ~{item.pyqCountLast15Years} Qs in 15 yrs
                        </div>
                      </td>

                      {/* Total Hours */}
                      <td className="py-3 px-3 text-center font-mono text-xs">
                        <span className="font-semibold text-slate-800">{item.totalHours}h</span>
                        <div className="text-[10px] text-slate-400">
                          {item.theoryHours}t + {item.practiceHours}p
                        </div>
                      </td>

                      {/* Interactive Status Selector */}
                      <td className="py-3 px-4 text-center">
                        <select
                          value={item.status}
                          onChange={e => onUpdateStatus(item.id, e.target.value as StatusLevel)}
                          className={`w-full px-2.5 py-1 rounded-lg text-xs font-medium border focus:outline-none transition-all cursor-pointer ${
                            item.status === 'Mastered'
                              ? 'bg-purple-100 text-purple-800 border-purple-300'
                              : item.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : item.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Mastered">Mastered 🏆</option>
                        </select>
                      </td>

                      {/* View Details Modal Button */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setSelectedTopicModal(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="View PYQ analysis & formula tips"
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Topic Details Modal */}
      {selectedTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {selectedTopicModal.subject}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">{selectedTopicModal.chapter}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedTopicModal.topic}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTopicModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">Priority</span>
                <span className="font-bold text-slate-800">{selectedTopicModal.priority}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">Difficulty</span>
                <span className="font-bold text-slate-800">{selectedTopicModal.difficulty}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">15-Yr PYQ Count</span>
                <span className="font-bold text-slate-800">~{selectedTopicModal.pyqCountLast15Years} Questions</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">Estimated Hours</span>
                <span className="font-bold text-slate-800">{selectedTopicModal.totalHours} hrs total</span>
              </div>
            </div>

            {/* Subtopics Coverage */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Detailed Sub-Topic Hierarchy
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                {selectedTopicModal.subTopic}
              </p>
            </div>

            {/* Common Question Patterns */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Common GATE Question Patterns &amp; Focus
              </h4>
              <div className="text-xs sm:text-sm text-slate-700 bg-amber-50/60 p-3 rounded-lg border border-amber-200/80 leading-relaxed">
                <p className="font-semibold text-amber-900 mb-1">
                  Type: {selectedTopicModal.questionType}
                </p>
                <p>{selectedTopicModal.commonPatterns}</p>
              </div>
            </div>

            {/* Key Formulas & Theorems */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Key Formulas, Theorems &amp; Rules
              </h4>
              <div className="text-xs sm:text-sm text-blue-900 bg-blue-50/70 p-3 rounded-lg border border-blue-200/80 font-mono leading-relaxed">
                {selectedTopicModal.keyFormulasOrConcepts}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Update Status:</span>
                <select
                  value={selectedTopicModal.status}
                  onChange={e => {
                    const next = e.target.value as StatusLevel;
                    onUpdateStatus(selectedTopicModal.id, next);
                    setSelectedTopicModal({ ...selectedTopicModal, status: next });
                  }}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 font-semibold text-slate-800 bg-white cursor-pointer"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Mastered">Mastered 🏆</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedTopicModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
