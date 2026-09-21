import React from 'react';
import { Compass, CheckCircle2, Flame, Award, BookOpen, Download, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { downloadGateExcelWorkbook } from '../utils/excelGenerator';
import { GateTopic } from '../types';

interface StrategyGuideViewProps {
  topics: GateTopic[];
}

export const StrategyGuideView: React.FC<StrategyGuideViewProps> = ({ topics }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
          <Compass className="w-3.5 h-3.5" />
          <span>Complete Strategic Blueprint</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          GATE CSE Preparation Methodology &amp; Execution Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          GATE CSE is not an exam of memorization; it is an exam of conceptual precision, mathematical rigor, and error management.
          Follow this proven structural blueprint to turn your effort into a top All India Rank (AIR).
        </p>

        <div className="pt-2">
          <button
            onClick={() => downloadGateExcelWorkbook(topics)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Formatted Excel (.xlsx) Workbook</span>
          </button>
        </div>
      </div>

      {/* Section 1: Recommended Study Order */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
          <span>The Recommended Study Order (Concept Dependency Graph)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Never study subjects in random order or by syllabus chapter numbers. Discrete Mathematics is the mother of Theory of Computation,
          Data Structures is the mother of Algorithms, and Digital Logic is the mother of Computer Architecture.
        </p>

        <div className="space-y-4 pt-2 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-1 text-blue-700">
              Phase 1: Foundation (Weeks 1–7)
            </h3>
            <p className="text-slate-600 mb-2">
              <strong>Subjects:</strong> Engineering Mathematics (Discrete Math, Linear Algebra, Probability) &amp; Digital Logic.
            </p>
            <p className="text-slate-500 text-xs">
              <strong>Why:</strong> First-order predicate logic, relations, and graphs are mandatory prerequisites for TOC and DBMS.
              Boolean algebra and number systems (2's complement, IEEE 754) are mandatory for Computer Organization.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-1 text-indigo-700">
              Phase 2: Core Computing &amp; Languages (Weeks 8–16)
            </h3>
            <p className="text-slate-600 mb-2">
              <strong>Subjects:</strong> C Programming, Data Structures, Algorithms, Theory of Computation, Compiler Design.
            </p>
            <p className="text-slate-500 text-xs">
              <strong>Why:</strong> Pointers and recursion flow directly into Trees and Dynamic Programming.
              DFA and Context-Free Grammars flow directly into Lexical Analysis and LR/LL parsing in Compiler Design.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-1 text-purple-700">
              Phase 3: Systems &amp; Infrastructure (Weeks 17–24)
            </h3>
            <p className="text-slate-600 mb-2">
              <strong>Subjects:</strong> Operating Systems, Databases (DBMS), Computer Organization (COA), Computer Networks.
            </p>
            <p className="text-slate-500 text-xs">
              <strong>Why:</strong> OS process synchronization and virtual memory require solid C pointer understanding.
              Cache AMAT in COA directly maps to multi-level paging EMAT in OS.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-1 text-emerald-700">
              Phase 4: Spaced Revision &amp; Mock Tests (Last 60 Days)
            </h3>
            <p className="text-slate-600 mb-2">
              <strong>Subjects:</strong> 15-Year PYQ Drills, Formula Cheatsheet Review, 25-30 Full Length Mocks.
            </p>
            <p className="text-slate-500 text-xs">
              <strong>Why:</strong> Shift entirely from passive theory reading to timed test execution, negative mark analysis,
              and eliminating calculation slip-ups.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Highest Priority Subjects */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">2</span>
          <span>Highest-Priority Subjects &amp; 100% Scoring Topics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200">
            <h3 className="font-bold text-red-950 mb-1">1. General Aptitude (15 Marks)</h3>
            <p className="text-slate-700 text-xs leading-relaxed">
              Guaranteed 15 marks. Spend 30 minutes daily on spatial reasoning, numerical aptitude, and English grammar.
              Never sacrifice Aptitude; top rankers score 13–15/15 here.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200">
            <h3 className="font-bold text-red-950 mb-1">2. Engineering Mathematics (13–15 Marks)</h3>
            <p className="text-slate-700 text-xs leading-relaxed">
              Discrete Math, Eigenvalues (Linear Algebra), and Bayes Theorem (Probability) have the highest questions-per-study-hour ratio.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200">
            <h3 className="font-bold text-red-950 mb-1">3. Programming, Data Structures &amp; Algos (18–20 Marks)</h3>
            <p className="text-slate-700 text-xs leading-relaxed">
              Binary Trees, BST properties, QuickSort recurrence, Greedy Huffman/MST, and C pointers. Highly predictable question patterns.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200">
            <h3 className="font-bold text-red-950 mb-1">4. Theory of Computation &amp; Compiler (12–16 Marks)</h3>
            <p className="text-slate-700 text-xs leading-relaxed">
              DFA minimization, regular closure properties, Rice's theorem, FIRST/FOLLOW, and LALR/CLR state counting.
              Nearly 100% conversion rate once concepts are clear.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Methodology */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">3</span>
          <span>How Priority Was Determined</span>
        </h2>
        <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
          <p>
            The classification into 🔴 <strong>MOST IMPORTANT</strong>, 🟠 <strong>IMPORTANT</strong>, and 🟢 <strong>LOWER PRIORITY</strong>
            is derived from two transparent criteria:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
            <li>
              <strong>15-Year Question Volume:</strong> Topics that appeared in &gt;80% of all GATE papers since 2010
              (averaging 1.5 to 3 questions per year) are strictly labeled 🔴 Most Important.
            </li>
            <li>
              <strong>Prerequisite Multiplier:</strong> Topics that act as foundational building blocks for 2 or more downstream subjects
              (e.g., First-Order Logic, Pointers, Graph Connectivity) are elevated to 🔴 Most Important because weakness here cascades across multiple subjects.
            </li>
            <li>
              <strong>Empirical Inference Disclaimer:</strong> These classifications represent statistical inferences for student preparation optimization.
              They are not official categorizations published by the GATE organizing committee.
            </li>
          </ul>
        </div>
      </div>

      {/* Section 4: How to Use the Excel Tracker */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">4</span>
          <span>How to Use the Excel Tracker from Day 1 to Exam Day</span>
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="font-bold text-slate-900 shrink-0">Step 1:</span>
            <div>
              <strong className="text-slate-900 block">Download the Workbook</strong>
              <span>Save <code>GATE_CSE_Complete_Preparation_Roadmap.xlsx</code> locally on your computer or Google Drive.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="font-bold text-slate-900 shrink-0">Step 2:</span>
            <div>
              <strong className="text-slate-900 block">Follow the 'Rec. Order' Column</strong>
              <span>In Sheet 1 (Master Plan), sort by <em>Rec. Order</em> (1 to 64). Work on one topic at a time.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="font-bold text-slate-900 shrink-0">Step 3:</span>
            <div>
              <strong className="text-slate-900 block">Update the Status Dropdown Daily</strong>
              <span>Set Status to <em>In Progress</em> when watching lectures; switch to <em>Completed</em> after solving all PYQs; switch to <em>Mastered</em> after scoring &gt;80% on the subject test.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="font-bold text-slate-900 shrink-0">Step 4:</span>
            <div>
              <strong className="text-slate-900 block">Log Revision in Sheet 7 (Revision Tracker)</strong>
              <span>Put the date under <em>First Study</em>, and calendar reminders for <em>Rev 1 (Day 7)</em> and <em>Rev 2 (Day 21)</em>.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="font-bold text-slate-900 shrink-0">Step 5:</span>
            <div>
              <strong className="text-slate-900 block">Record Mocks in Sheet 8 (Mock Tracker)</strong>
              <span>Never take a mock test without immediately spending 1.5 hours classifying your mistake type and defining an improvement action.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
