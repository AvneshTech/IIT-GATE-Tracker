import React, { useState } from 'react';
import { FORMULA_ENTRIES } from '../data/metadataData';
import { FormulaEntry } from '../types';
import { Zap, Copy, Check, Search, BookOpen, AlertTriangle } from 'lucide-react';

export const FormulaSheetView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const subjects = ['All', ...Array.from(new Set(FORMULA_ENTRIES.map(f => f.subject)))];

  const filteredFormulas = FORMULA_ENTRIES.filter(f => {
    if (selectedSubject !== 'All' && f.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.formulaOrRule.toLowerCase().includes(q) ||
        f.notes.toLowerCase().includes(q) ||
        f.chapter.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-2">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span>High-Yield GATE CSE Formula &amp; Concept Cheat Sheet</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Essential mathematical rules, time &amp; space complexities, recurrence masters, and hardware sizing equations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search formulas, theorems, or exam traps..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map(f => (
          <div
            key={f.id}
            className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-indigo-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {f.subject} • {f.chapter}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  {f.frequencyInExam} Exam Weight
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{f.title}</h3>

              {/* Formula Block */}
              <div className="mt-2.5 p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs relative group">
                <div className="pr-8 leading-relaxed whitespace-pre-wrap">{f.formulaOrRule}</div>
                <button
                  onClick={() => handleCopy(f.formulaOrRule, f.id)}
                  className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy formula text"
                >
                  {copiedId === f.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Notes & Traps */}
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800">Exam Note:</strong> {f.notes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
