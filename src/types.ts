export type PriorityLevel = '🔴 MOST IMPORTANT' | '🟠 IMPORTANT' | '🟢 LOWER PRIORITY';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type StatusLevel = 'Not Started' | 'In Progress' | 'Completed' | 'Mastered';

export type PYQRelevance = 'Very High' | 'High' | 'Moderate' | 'Low';

export type PracticePriority = 'Extensive' | 'Standard' | 'Moderate';

export type RevisionPriority = 'High' | 'Medium' | 'Normal';

export interface GateTopic {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  subTopic: string;
  syllabusRef: string;
  priority: PriorityLevel;
  difficulty: DifficultyLevel;
  pyqFrequency: string; // e.g. "Every Year (2-3 Qs)", "Frequently (1-2 Qs)"
  pyqRelevance: PYQRelevance;
  studyOrder: number;
  theoryHours: number;
  practiceHours: number;
  totalHours: number;
  revisionPriority: RevisionPriority;
  practicePriority: PracticePriority;
  status: StatusLevel;
  // PYQ Analysis details
  pyqCountLast15Years: number;
  commonPatterns: string;
  questionType: 'Predominantly Numerical' | 'Predominantly Conceptual' | 'Balanced Numerical & Conceptual';
  keyFormulasOrConcepts: string;
}

export interface SubjectSummary {
  name: string;
  code: string;
  totalTopics: number;
  mostImportantCount: number;
  importantCount: number;
  lowerPriorityCount: number;
  totalEstimatedHours: number;
  pyqWeightageApprox: string; // e.g., "13-15 Marks"
  foundationalRank: number; // 1 = First foundation, etc.
  category: 'Foundation' | 'Core Concepts' | 'Systems & Advanced' | 'Aptitude';
}

export interface StudyPlanWeek {
  week: number;
  month: number;
  subject: string;
  topicsFocus: string;
  hoursTarget: number;
  deliverables: string;
  reviewCheckpoint: string;
}

export interface RevisionItem {
  id: string;
  topicId: string;
  subject: string;
  topic: string;
  priority: PriorityLevel;
  firstStudyDate: string;
  rev1Date: string;
  rev2Date: string;
  rev3Date: string;
  pyqsCompleted: boolean;
  mockTested: boolean;
  confidence: 'Low' | 'Medium' | 'High';
}

export interface MockTestEntry {
  id: string;
  testName: string;
  date: string;
  totalMarks: number;
  scoreObtained: number;
  rankOrPercentile: string;
  accuracyPercent: number;
  weakSubjects: string;
  weakTopics: string;
  mistakeType: 'Calculation Error' | 'Conceptual Gap' | 'Misread Question' | 'Time Pressure' | 'Silly Guessing';
  improvementAction: string;
}

export interface FormulaEntry {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  formulaOrRule: string;
  notes: string;
  frequencyInExam: 'Very High' | 'High' | 'Medium';
}
