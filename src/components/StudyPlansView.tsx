import React, { useState } from 'react';
import { STUDY_PLAN_6_MONTHS, TIME_ESTIMATES } from '../data/metadataData';
import { Calendar, Clock, CheckCircle2, Award, Zap, Compass, Target } from 'lucide-react';

export const StudyPlansView: React.FC = () => {
  const [activePlan, setActivePlan] = useState<'6m' | '3m' | '9m' | '12m'>('6m');
  const [completedWeeks, setCompletedWeeks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('gate_completed_weeks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWeek = (weekNum: number) => {
    const updated = completedWeeks.includes(weekNum)
      ? completedWeeks.filter(w => w !== weekNum)
      : [...completedWeeks, weekNum];
    setCompletedWeeks(updated);
    try {
      localStorage.setItem('gate_completed_weeks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Estimation Overview Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Realistic Preparation Time Estimation Math</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Calculated for complete mastery of theory, problem sets, PYQs, and test series.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs sm:text-sm border border-blue-100">
            Grand Total: ~{TIME_ESTIMATES.grandTotalHours} Hours
          </div>
        </div>

        {/* 4 Pillars of Time Estimation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
              1. Syllabus Coverage
            </span>
            <div className="text-lg font-bold text-slate-900 mt-1">
              {TIME_ESTIMATES.totalSyllabusHours} hrs
            </div>
            <p className="text-slate-500 text-[11px] mt-1">
              375h conceptual lectures + 494h standard textbook practice
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
              2. 15-Yr PYQ Practice
            </span>
            <div className="text-lg font-bold text-slate-900 mt-1">
              {TIME_ESTIMATES.totalPYQHours} hrs
            </div>
            <p className="text-slate-500 text-[11px] mt-1">
              ~1,600+ questions solved topic-by-topic with multiple passes
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
              3. 3-Cycle Spaced Revision
            </span>
            <div className="text-lg font-bold text-slate-900 mt-1">
              {TIME_ESTIMATES.totalRevisionHours} hrs
            </div>
            <p className="text-slate-500 text-[11px] mt-1">
              Day 7, Day 21, and Day 60 short notes and formula sheet drills
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
              4. Mock Tests &amp; Analysis
            </span>
            <div className="text-lg font-bold text-slate-900 mt-1">
              {TIME_ESTIMATES.totalMockHours} hrs
            </div>
            <p className="text-slate-500 text-[11px] mt-1">
              25-30 full-length mocks (3h test + 1.5h post-test error log)
            </p>
          </div>
        </div>
      </div>

      {/* Plan Duration Selector Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActivePlan('6m')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
            activePlan === '6m'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>6-Month Standard Plan (Recommended)</span>
        </button>

        <button
          onClick={() => setActivePlan('3m')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
            activePlan === '3m'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>3-Month Intensive / Crash</span>
        </button>

        <button
          onClick={() => setActivePlan('9m')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
            activePlan === '9m'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>9-Month Comprehensive</span>
        </button>

        <button
          onClick={() => setActivePlan('12m')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all ${
            activePlan === '12m'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Target className="w-4 h-4 text-purple-300" />
          <span>12-Month Foundation to Ranker</span>
        </button>
      </div>

      {/* Plan Content */}
      {activePlan === '6m' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-900 text-sm">6-Month Week-by-Week Preparation Roadmap</span>
              <p className="text-slate-500">24 weeks • 7-8 hours daily • Full syllabus, 15-year PYQs, and mocks</p>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span>Weeks Completed:</span>
              <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {completedWeeks.length} / 24
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STUDY_PLAN_6_MONTHS.map(w => {
              const isDone = completedWeeks.includes(w.week);

              return (
                <div
                  key={w.week}
                  className={`rounded-xl border p-4 transition-all ${
                    isDone
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                        Week {w.week}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">Month {w.month}</span>
                    </div>

                    <button
                      onClick={() => toggleWeek(w.week)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        isDone
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{w.subject}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {w.topicsFocus}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Target Hours:</span>
                      <span className="font-semibold text-slate-800">{w.hoursTarget} hrs</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Deliverables
                      </span>
                      <span className="text-slate-700 text-xs font-medium">{w.deliverables}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Review Checkpoint
                      </span>
                      <span className="text-indigo-700 text-xs font-medium">{w.reviewCheckpoint}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activePlan === '3m' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">3-Month Intensive / Crash Strategy (80/20 Rule)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily Commitment: <strong>12-14 hours/day</strong> • Target: Rank under AIR 800 with targeted scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2">
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">
                Month 1: 🔴 High-Yield Foundation &amp; Logic
              </span>
              <p className="text-slate-700 leading-relaxed">
                Focus strictly on <strong>Discrete Math, Digital Logic, C Pointers &amp; Data Structures</strong>.
                Skip lower priority proofs and solve the last 10 years of PYQs immediately after reading formulas.
              </p>
              <div className="font-semibold text-red-700">Target: 320 hours study + 500 PYQs</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                Month 2: Algorithms, TOC, OS &amp; DBMS
              </span>
              <p className="text-slate-700 leading-relaxed">
                Cover <strong>Greedy/DP/Graph Algorithms, DFA/NFA/Undecidability, CPU Scheduling &amp; Virtual Memory, Normalization &amp; SQL</strong>.
                Take subject-wise tests every Sunday.
              </p>
              <div className="font-semibold text-amber-700">Target: 340 hours study + 600 PYQs</div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                Month 3: COA, Networks, Revision &amp; Mocks
              </span>
              <p className="text-slate-700 leading-relaxed">
                Master <strong>Pipelining, Cache AMAT, Subnetting, TCP Congestion, General Aptitude</strong>.
                Dedicate the last 20 days purely to 15 full-length mock tests and formula revisions.
              </p>
              <div className="font-semibold text-blue-700">Target: 15 Full-length Mock Tests</div>
            </div>
          </div>
        </div>
      )}

      {activePlan === '9m' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">9-Month Comprehensive Strategy</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily Commitment: <strong>5-6 hours/day</strong> • Ideal for college students balancing semester courses.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="font-bold text-blue-600 shrink-0">Months 1–3:</span>
              <div>
                <strong className="text-slate-900 block">Foundational Depth (Discrete Math, C, Data Structures, Digital Logic)</strong>
                <span className="text-slate-600">Solve exercises from standard textbooks (Kenneth Rosen, Morris Mano, CLRS).</span>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="font-bold text-blue-600 shrink-0">Months 4–6:</span>
              <div>
                <strong className="text-slate-900 block">Core Computing (Algorithms, TOC, Compiler, OS, DBMS)</strong>
                <span className="text-slate-600">Complete subject-wise PYQ bank and create one-page formula cheat sheets.</span>
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="font-bold text-blue-600 shrink-0">Months 7–9:</span>
              <div>
                <strong className="text-slate-900 block">COA, Networks, Multi-Cycle Revision &amp; 35 Mock Tests</strong>
                <span className="text-slate-600">Focus on speed, accuracy, and negative mark elimination under exam timing.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePlan === '12m' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">12-Month Foundation-to-Ranker Strategy (AIR &lt;100)</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily Commitment: <strong>3-4 hours/day steady</strong> • 0 stress, maximum conceptual mastery and retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">Q1 (Months 1–3): Math &amp; Hardware</span>
              <p className="text-slate-600 leading-relaxed">
                Discrete Math, Linear Algebra, Calculus, Probability, and Digital Logic.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">Q2 (Months 4–6): Data &amp; Computation</span>
              <p className="text-slate-600 leading-relaxed">
                C Programming, Data Structures, Algorithms, and Theory of Computation.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">Q3 (Months 7–9): Systems &amp; Infrastructure</span>
              <p className="text-slate-600 leading-relaxed">
                Compiler Design, Operating Systems, Databases, COA, and Computer Networks.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">Q4 (Months 10–12): Drills, PYQ Pass 2 &amp; 45+ Mocks</span>
              <p className="text-slate-600 leading-relaxed">
                2 full passes over all PYQs (2000–2025), subject tests, and 45 full-length mock tests.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
