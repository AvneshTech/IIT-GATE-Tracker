import ExcelJS from 'exceljs';
import { GateTopic, MockTestEntry, RevisionItem } from '../types';
import { GATE_TOPICS } from '../data/topicsData';
import { SUBJECT_SUMMARIES, STUDY_PLAN_6_MONTHS, FORMULA_ENTRIES } from '../data/metadataData';

export async function generateGateExcel(
  topics: GateTopic[] = GATE_TOPICS,
  customMocks?: MockTestEntry[],
  customRevisions?: RevisionItem[]
): Promise<Blob> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'GATE CSE Prep Roadmap';
  workbook.lastModifiedBy = 'GATE CSE Aspirant';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Color constants
  const NAVY_HEADER = '1E3A8A';
  const LIGHT_HEADER = 'F1F5F9';
  const BORDER_GRAY = 'CBD5E1';
  const RED_BG = 'FEE2E2';
  const RED_TEXT = '991B1B';
  const AMBER_BG = 'FEF3C7';
  const AMBER_TEXT = '92400E';
  const GREEN_BG = 'D1FAE5';
  const GREEN_TEXT = '065F46';

  const defaultBorder: Partial<ExcelJS.Borders> = {
    top: { style: 'thin', color: { argb: BORDER_GRAY } },
    left: { style: 'thin', color: { argb: BORDER_GRAY } },
    bottom: { style: 'thin', color: { argb: BORDER_GRAY } },
    right: { style: 'thin', color: { argb: BORDER_GRAY } }
  };

  const headerFont: Partial<ExcelJS.Font> = {
    name: 'Segoe UI',
    size: 11,
    bold: true,
    color: { argb: 'FFFFFF' }
  };

  // -------------------------------------------------------------
  // SHEET 1: DASHBOARD
  // -------------------------------------------------------------
  const dashSheet = workbook.addWorksheet('Dashboard', {
    views: [{ showGridLines: true }]
  });

  dashSheet.columns = [
    { width: 5 },
    { width: 32 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 22 },
    { width: 24 }
  ];

  // Title Banner
  dashSheet.mergeCells('B2:G2');
  const titleCell = dashSheet.getCell('B2');
  titleCell.value = 'GATE CSE PREPARATION COMMAND CENTER & MASTER TRACKER';
  titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
  dashSheet.getRow(2).height = 36;

  // Subtitle
  dashSheet.mergeCells('B3:G3');
  const subCell = dashSheet.getCell('B3');
  subCell.value = 'Based on Official Latest GATE CSE Syllabus & 15-Year PYQ Topic Frequency Trends';
  subCell.font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: '475569' } };
  subCell.alignment = { horizontal: 'center', vertical: 'middle' };
  dashSheet.getRow(3).height = 20;

  // KPI Summary Cards (Row 5 & 6)
  const kpis = [
    { col: 'B', label: 'Total Syllabus Topics', val: topics.length, note: '11 Subjects Covered' },
    { col: 'C', label: '🔴 Most Important', val: topics.filter(t => t.priority.includes('MOST')).length, note: 'High Exam Frequency' },
    { col: 'D', label: '🟠 Important', val: topics.filter(t => t.priority.includes('IMPORTANT') && !t.priority.includes('MOST')).length, note: 'Regularly Tested' },
    { col: 'E', label: '🟢 Lower Priority', val: topics.filter(t => t.priority.includes('LOWER')).length, note: 'Secondary Returns' },
    { col: 'F', label: 'Total Study Hours', val: topics.reduce((s, t) => s + t.totalHours, 0) + ' hrs', note: 'Theory + Practice' },
    { col: 'G', label: 'Syllabus Progress', formula: '="Track in Master Plan"', note: 'Dynamic Live Status' }
  ];

  dashSheet.getRow(5).height = 20;
  dashSheet.getRow(6).height = 28;

  kpis.forEach(kpi => {
    const lbl = dashSheet.getCell(`${kpi.col}5`);
    lbl.value = kpi.label;
    lbl.font = { name: 'Segoe UI', size: 9, color: { argb: '64748B' }, bold: true };
    lbl.alignment = { horizontal: 'center', vertical: 'middle' };
    lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_HEADER } };
    lbl.border = defaultBorder;

    const val = dashSheet.getCell(`${kpi.col}6`);
    if (kpi.formula) {
      val.value = kpi.formula;
    } else {
      val.value = kpi.val;
    }
    val.font = { name: 'Segoe UI', size: 14, color: { argb: '0F172A' }, bold: true };
    val.alignment = { horizontal: 'center', vertical: 'middle' };
    val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
    val.border = defaultBorder;
  });

  // Subject-wise Breakdown Table Header (Row 8)
  dashSheet.getCell('B8').value = 'Subject Breakdown';
  dashSheet.getCell('C8').value = 'Topics';
  dashSheet.getCell('D8').value = 'Most Important';
  dashSheet.getCell('E8').value = 'Weightage';
  dashSheet.getCell('F8').value = 'Study Time';
  dashSheet.getCell('G8').value = 'Prep Phase';

  const subHeaderRow = dashSheet.getRow(8);
  subHeaderRow.height = 24;
  ['B', 'C', 'D', 'E', 'F', 'G'].forEach(col => {
    const cell = dashSheet.getCell(`${col}8`);
    cell.font = headerFont;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '334155' } };
    cell.border = defaultBorder;
  });

  // Populate Subject summaries
  SUBJECT_SUMMARIES.forEach((subj, idx) => {
    const rowNum = 9 + idx;
    const row = dashSheet.getRow(rowNum);
    row.height = 20;

    const b = dashSheet.getCell(`B${rowNum}`);
    b.value = subj.name;
    b.font = { name: 'Segoe UI', size: 10, bold: true };
    b.border = defaultBorder;

    const c = dashSheet.getCell(`C${rowNum}`);
    c.value = subj.totalTopics;
    c.alignment = { horizontal: 'center' };
    c.border = defaultBorder;

    const d = dashSheet.getCell(`D${rowNum}`);
    d.value = subj.mostImportantCount;
    d.alignment = { horizontal: 'center' };
    d.font = { color: { argb: RED_TEXT }, bold: true };
    d.border = defaultBorder;

    const e = dashSheet.getCell(`E${rowNum}`);
    e.value = subj.pyqWeightageApprox;
    e.alignment = { horizontal: 'center' };
    e.border = defaultBorder;

    const f = dashSheet.getCell(`F${rowNum}`);
    f.value = subj.totalEstimatedHours + ' hrs';
    f.alignment = { horizontal: 'center' };
    f.border = defaultBorder;

    const g = dashSheet.getCell(`G${rowNum}`);
    g.value = subj.category;
    g.alignment = { horizontal: 'center' };
    g.font = { italic: true, color: { argb: '475569' } };
    g.border = defaultBorder;
  });

  // -------------------------------------------------------------
  // SHEET 2: GATE CSE MASTER PLAN
  // -------------------------------------------------------------
  const masterSheet = workbook.addWorksheet('GATE CSE Master Plan', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  masterSheet.columns = [
    { header: 'ID', key: 'id', width: 12 },
    { header: 'Subject', key: 'subject', width: 28 },
    { header: 'Chapter / Unit', key: 'chapter', width: 26 },
    { header: 'Topic', key: 'topic', width: 34 },
    { header: 'Priority', key: 'priority', width: 22 },
    { header: 'Difficulty', key: 'difficulty', width: 14 },
    { header: 'PYQ Frequency', key: 'pyqFrequency', width: 22 },
    { header: 'Theory (h)', key: 'theoryHours', width: 12 },
    { header: 'Practice (h)', key: 'practiceHours', width: 12 },
    { header: 'Total (h)', key: 'totalHours', width: 12 },
    { header: 'Rec. Order', key: 'studyOrder', width: 12 },
    { header: 'Status', key: 'status', width: 16 }
  ];

  masterSheet.getRow(1).height = 26;
  masterSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  topics.forEach((t, i) => {
    const row = masterSheet.addRow({
      id: t.id,
      subject: t.subject,
      chapter: t.chapter,
      topic: t.topic,
      priority: t.priority,
      difficulty: t.difficulty,
      pyqFrequency: t.pyqFrequency,
      theoryHours: t.theoryHours,
      practiceHours: t.practiceHours,
      totalHours: t.totalHours,
      studyOrder: t.studyOrder,
      status: t.status
    });

    row.height = 21;
    row.eachCell((cell, colNumber) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };

      // Priority formatting
      if (colNumber === 5) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        if (t.priority.includes('MOST')) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: RED_BG } };
          cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: RED_TEXT } };
        } else if (t.priority.includes('IMPORTANT')) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: AMBER_BG } };
          cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: AMBER_TEXT } };
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN_BG } };
          cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: GREEN_TEXT } };
        }
      }

      if ([1, 6, 7, 8, 9, 10, 11, 12].includes(colNumber)) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    });

    // Data validation for Status in column 12
    const statusCell = row.getCell(12);
    statusCell.dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Not Started,In Progress,Completed,Mastered"']
    };
  });

  // Enable Auto-filters on Master Plan
  masterSheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: topics.length + 1, column: 12 }
  };

  // -------------------------------------------------------------
  // SHEET 3: SUBJECT-WISE SYLLABUS
  // -------------------------------------------------------------
  const syllabusSheet = workbook.addWorksheet('Subject-wise Syllabus', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  syllabusSheet.columns = [
    { header: 'Subject', key: 'subject', width: 28 },
    { header: 'Chapter / Unit', key: 'chapter', width: 26 },
    { header: 'Topic', key: 'topic', width: 32 },
    { header: 'Sub-Topic Details', key: 'subTopic', width: 45 },
    { header: 'Official Syllabus Reference', key: 'syllabusRef', width: 40 },
    { header: 'Priority', key: 'priority', width: 22 },
    { header: 'Difficulty', key: 'difficulty', width: 14 }
  ];

  syllabusSheet.getRow(1).height = 26;
  syllabusSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  topics.forEach(t => {
    const row = syllabusSheet.addRow({
      subject: t.subject,
      chapter: t.chapter,
      topic: t.topic,
      subTopic: t.subTopic,
      syllabusRef: t.syllabusRef,
      priority: t.priority,
      difficulty: t.difficulty
    });
    row.height = 22;
    row.eachCell(cell => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
    });
  });

  // -------------------------------------------------------------
  // SHEET 4: MOST IMPORTANT TOPICS (🔴 Only)
  // -------------------------------------------------------------
  const mostImpSheet = workbook.addWorksheet('Most Important Topics', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  mostImpSheet.columns = [
    { header: 'Subject', key: 'subject', width: 28 },
    { header: 'Chapter', key: 'chapter', width: 26 },
    { header: 'Topic', key: 'topic', width: 34 },
    { header: 'PYQ Frequency', key: 'pyqFrequency', width: 22 },
    { header: '15-Yr PYQs', key: 'pyqs', width: 14 },
    { header: 'Key Concepts / Formulas', key: 'concepts', width: 50 },
    { header: 'Study Order', key: 'order', width: 12 },
    { header: 'Total (h)', key: 'hours', width: 12 }
  ];

  mostImpSheet.getRow(1).height = 26;
  mostImpSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '991B1B' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  topics.filter(t => t.priority.includes('MOST')).forEach(t => {
    const row = mostImpSheet.addRow({
      subject: t.subject,
      chapter: t.chapter,
      topic: t.topic,
      pyqFrequency: t.pyqFrequency,
      pyqs: t.pyqCountLast15Years,
      concepts: t.keyFormulasOrConcepts,
      order: t.studyOrder,
      hours: t.totalHours
    });
    row.height = 22;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      if ([4, 5, 7, 8].includes(col)) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // -------------------------------------------------------------
  // SHEET 5: IMPORTANT TOPICS (🟠 Only)
  // -------------------------------------------------------------
  const impSheet = workbook.addWorksheet('Important Topics', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  impSheet.columns = [
    { header: 'Subject', key: 'subject', width: 28 },
    { header: 'Chapter', key: 'chapter', width: 26 },
    { header: 'Topic', key: 'topic', width: 34 },
    { header: 'PYQ Frequency', key: 'pyqFrequency', width: 22 },
    { header: '15-Yr PYQs', key: 'pyqs', width: 14 },
    { header: 'Common Question Patterns', key: 'patterns', width: 50 },
    { header: 'Study Order', key: 'order', width: 12 },
    { header: 'Total (h)', key: 'hours', width: 12 }
  ];

  impSheet.getRow(1).height = 26;
  impSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D97706' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  topics.filter(t => t.priority.includes('IMPORTANT') && !t.priority.includes('MOST')).forEach(t => {
    const row = impSheet.addRow({
      subject: t.subject,
      chapter: t.chapter,
      topic: t.topic,
      pyqFrequency: t.pyqFrequency,
      pyqs: t.pyqCountLast15Years,
      patterns: t.commonPatterns,
      order: t.studyOrder,
      hours: t.totalHours
    });
    row.height = 22;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      if ([4, 5, 7, 8].includes(col)) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // -------------------------------------------------------------
  // SHEET 6: PYQ ANALYSIS
  // -------------------------------------------------------------
  const pyqSheet = workbook.addWorksheet('PYQ Analysis', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  pyqSheet.columns = [
    { header: 'Subject', key: 'subject', width: 28 },
    { header: 'Topic', key: 'topic', width: 32 },
    { header: '15-Yr PYQs Asked', key: 'count', width: 16 },
    { header: 'Frequency', key: 'frequency', width: 22 },
    { header: 'Question Pattern & Focus', key: 'pattern', width: 45 },
    { header: 'Question Nature', key: 'type', width: 32 },
    { header: 'Difficulty', key: 'difficulty', width: 14 }
  ];

  pyqSheet.getRow(1).height = 26;
  pyqSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  topics.forEach(t => {
    const row = pyqSheet.addRow({
      subject: t.subject,
      topic: t.topic,
      count: t.pyqCountLast15Years,
      frequency: t.pyqFrequency,
      pattern: t.commonPatterns,
      type: t.questionType,
      difficulty: t.difficulty
    });
    row.height = 22;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      if ([3, 4, 7].includes(col)) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // -------------------------------------------------------------
  // SHEET 7: 6-MONTH STUDY PLAN
  // -------------------------------------------------------------
  const planSheet = workbook.addWorksheet('6-Month Study Plan', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  planSheet.columns = [
    { header: 'Week #', key: 'week', width: 10 },
    { header: 'Month', key: 'month', width: 10 },
    { header: 'Subject Focus', key: 'subject', width: 28 },
    { header: 'Key Topics & Syllabi Focus', key: 'topics', width: 45 },
    { header: 'Target Hours', key: 'hours', width: 14 },
    { header: 'Weekly Deliverables', key: 'deliverables', width: 40 },
    { header: 'Review Checkpoint', key: 'checkpoint', width: 35 }
  ];

  planSheet.getRow(1).height = 26;
  planSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  STUDY_PLAN_6_MONTHS.forEach(w => {
    const row = planSheet.addRow({
      week: `Week ${w.week}`,
      month: `Month ${w.month}`,
      subject: w.subject,
      topics: w.topicsFocus,
      hours: `${w.hoursTarget} hrs`,
      deliverables: w.deliverables,
      checkpoint: w.reviewCheckpoint
    });
    row.height = 22;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      if ([1, 2, 5].includes(col)) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // -------------------------------------------------------------
  // SHEET 8: REVISION TRACKER
  // -------------------------------------------------------------
  const revSheet = workbook.addWorksheet('Revision Tracker', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  revSheet.columns = [
    { header: 'Topic', key: 'topic', width: 34 },
    { header: 'Subject', key: 'subject', width: 26 },
    { header: 'Priority', key: 'priority', width: 20 },
    { header: 'First Study Date', key: 'firstStudy', width: 16 },
    { header: 'Revision 1 (Day 7)', key: 'rev1', width: 18 },
    { header: 'Revision 2 (Day 21)', key: 'rev2', width: 18 },
    { header: 'Revision 3 (Day 60)', key: 'rev3', width: 18 },
    { header: 'PYQs Solved?', key: 'pyqsDone', width: 16 },
    { header: 'Mock Tested?', key: 'mockDone', width: 16 },
    { header: 'Confidence Level', key: 'confidence', width: 18 }
  ];

  revSheet.getRow(1).height = 26;
  revSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  topics.forEach((t, idx) => {
    const revItem = customRevisions?.find(r => r.topicId === t.id);
    const row = revSheet.addRow({
      topic: t.topic,
      subject: t.subject,
      priority: t.priority,
      firstStudy: revItem?.firstStudyDate || '',
      rev1: revItem?.rev1Date || '',
      rev2: revItem?.rev2Date || '',
      rev3: revItem?.rev3Date || '',
      pyqsDone: revItem ? (revItem.pyqsCompleted ? 'YES' : 'NO') : 'NO',
      mockDone: revItem ? (revItem.mockTested ? 'YES' : 'NO') : 'NO',
      confidence: revItem?.confidence || 'Medium'
    });

    row.height = 21;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      if (col >= 4) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // Data validation for Confidence
    const confCell = row.getCell(10);
    confCell.dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Low,Medium,High"']
    };

    // Data validation for Yes/No
    [8, 9].forEach(c => {
      row.getCell(c).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"YES,NO"']
      };
    });
  });

  // -------------------------------------------------------------
  // SHEET 9: MOCK TEST TRACKER
  // -------------------------------------------------------------
  const mockSheet = workbook.addWorksheet('Mock Test Tracker', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  mockSheet.columns = [
    { header: 'Test Name / Series', key: 'name', width: 30 },
    { header: 'Date', key: 'date', width: 14 },
    { header: 'Score (/100)', key: 'score', width: 14 },
    { header: 'Rank / Percentile', key: 'rank', width: 20 },
    { header: 'Accuracy %', key: 'accuracy', width: 14 },
    { header: 'Weak Subjects', key: 'weakSub', width: 26 },
    { header: 'Weak Topics', key: 'weakTop', width: 32 },
    { header: 'Dominant Mistake Type', key: 'mistake', width: 24 },
    { header: 'Improvement Action Plan', key: 'action', width: 45 }
  ];

  mockSheet.getRow(1).height = 26;
  mockSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  const mocksToRender = customMocks && customMocks.length > 0 ? customMocks : [
    {
      id: 'm-01',
      testName: 'All India Open Mock 1',
      date: '2026-10-15',
      totalMarks: 100,
      scoreObtained: 58.67,
      rankOrPercentile: 'AIR 412 / 94.5%',
      accuracyPercent: 78.2,
      weakSubjects: 'Computer Networks, COA',
      weakTopics: 'Cache memory tag directory, TCP Congestion',
      mistakeType: 'Calculation Error' as const,
      improvementAction: 'Re-derive tag bit division formula and solve 10 numerical problems'
    },
    {
      id: 'm-02',
      testName: 'Discrete Math & Digital Logic Subject Test',
      date: '2026-10-28',
      totalMarks: 50,
      scoreObtained: 39.33,
      rankOrPercentile: 'AIR 88 / 98.1%',
      accuracyPercent: 86.5,
      weakSubjects: 'Digital Logic',
      weakTopics: 'Flip-flop setup/hold time timing analysis',
      mistakeType: 'Conceptual Gap' as const,
      improvementAction: 'Review Morris Mano chapter 5 and solve gate questions from 2016-2024'
    },
    {
      id: 'm-03',
      testName: 'All India Mock 2',
      date: '2026-11-12',
      totalMarks: 100,
      scoreObtained: 66.33,
      rankOrPercentile: 'AIR 195 / 97.4%',
      accuracyPercent: 84.0,
      weakSubjects: 'Operating Systems',
      weakTopics: 'Multi-level paging EMAT with inverted page tables',
      mistakeType: 'Misread Question' as const,
      improvementAction: 'Carefully highlight question text whether TLB hit was assumed'
    }
  ];

  mocksToRender.forEach(m => {
    const row = mockSheet.addRow({
      name: m.testName,
      date: m.date,
      score: m.scoreObtained,
      rank: m.rankOrPercentile,
      accuracy: m.accuracyPercent + '%',
      weakSub: m.weakSubjects,
      weakTop: m.weakTopics,
      mistake: m.mistakeType,
      action: m.improvementAction
    });
    row.height = 22;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      if ([2, 3, 4, 5, 8].includes(col)) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    row.getCell(8).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Calculation Error,Conceptual Gap,Misread Question,Time Pressure,Silly Guessing"']
    };
  });

  // Add empty template rows for future mocks
  for (let i = 0; i < 15; i++) {
    const row = mockSheet.addRow({
      name: '',
      date: '',
      score: '',
      rank: '',
      accuracy: '',
      weakSub: '',
      weakTop: '',
      mistake: '',
      action: ''
    });
    row.height = 20;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
    });
    row.getCell(8).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Calculation Error,Conceptual Gap,Misread Question,Time Pressure,Silly Guessing"']
    };
  }

  // -------------------------------------------------------------
  // SHEET 10: FORMULA / SHORT NOTES
  // -------------------------------------------------------------
  const formulaSheet = workbook.addWorksheet('Formula & Short Notes', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  formulaSheet.columns = [
    { header: 'Subject', key: 'subject', width: 26 },
    { header: 'Chapter', key: 'chapter', width: 22 },
    { header: 'Formula / Concept Title', key: 'title', width: 34 },
    { header: 'Core Formula / Theorem / Rule', key: 'formula', width: 55 },
    { header: 'Exam Traps & Quick Notes', key: 'notes', width: 45 },
    { header: 'Exam Frequency', key: 'freq', width: 18 }
  ];

  formulaSheet.getRow(1).height = 26;
  formulaSheet.getRow(1).eachCell(cell => {
    cell.font = headerFont;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY_HEADER } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = defaultBorder;
  });

  FORMULA_ENTRIES.forEach(f => {
    const row = formulaSheet.addRow({
      subject: f.subject,
      chapter: f.chapter,
      title: f.title,
      formula: f.formulaOrRule,
      notes: f.notes,
      freq: f.frequencyInExam
    });
    row.height = 24;
    row.eachCell((cell, col) => {
      cell.border = defaultBorder;
      cell.font = { name: 'Segoe UI', size: 10 };
      cell.alignment = { vertical: 'middle' };
      if (col === 6) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
}

export async function downloadGateExcelWorkbook(
  topics?: GateTopic[],
  mocks?: MockTestEntry[],
  revisions?: RevisionItem[]
) {
  const blob = await generateGateExcel(topics, mocks, revisions);
  if (typeof window !== 'undefined') {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GATE_CSE_Complete_Preparation_Roadmap.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
