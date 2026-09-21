import { SubjectSummary, StudyPlanWeek, MockTestEntry, FormulaEntry } from '../types';

export const SUBJECT_SUMMARIES: SubjectSummary[] = [
  {
    name: 'Engineering Mathematics',
    code: 'EM',
    totalTopics: 13,
    mostImportantCount: 8,
    importantCount: 5,
    lowerPriorityCount: 0,
    totalEstimatedHours: 180,
    pyqWeightageApprox: '13-15 Marks',
    foundationalRank: 1,
    category: 'Foundation'
  },
  {
    name: 'Digital Logic',
    code: 'DL',
    totalTopics: 5,
    mostImportantCount: 4,
    importantCount: 0,
    lowerPriorityCount: 1,
    totalEstimatedHours: 68,
    pyqWeightageApprox: '5-7 Marks',
    foundationalRank: 2,
    category: 'Foundation'
  },
  {
    name: 'Computer Organization and Architecture',
    code: 'COA',
    totalTopics: 5,
    mostImportantCount: 3,
    importantCount: 2,
    lowerPriorityCount: 0,
    totalEstimatedHours: 74,
    pyqWeightageApprox: '8-10 Marks',
    foundationalRank: 6,
    category: 'Systems & Advanced'
  },
  {
    name: 'Programming and Data Structures',
    code: 'PDS',
    totalTopics: 5,
    mostImportantCount: 5,
    importantCount: 0,
    lowerPriorityCount: 0,
    totalEstimatedHours: 85,
    pyqWeightageApprox: '10-12 Marks',
    foundationalRank: 3,
    category: 'Core Concepts'
  },
  {
    name: 'Algorithms',
    code: 'ALGO',
    totalTopics: 5,
    mostImportantCount: 5,
    importantCount: 0,
    lowerPriorityCount: 0,
    totalEstimatedHours: 81,
    pyqWeightageApprox: '8-10 Marks',
    foundationalRank: 4,
    category: 'Core Concepts'
  },
  {
    name: 'Theory of Computation',
    code: 'TOC',
    totalTopics: 4,
    mostImportantCount: 4,
    importantCount: 0,
    lowerPriorityCount: 0,
    totalEstimatedHours: 71,
    pyqWeightageApprox: '8-10 Marks',
    foundationalRank: 5,
    category: 'Core Concepts'
  },
  {
    name: 'Compiler Design',
    code: 'CD',
    totalTopics: 5,
    mostImportantCount: 3,
    importantCount: 2,
    lowerPriorityCount: 0,
    totalEstimatedHours: 73,
    pyqWeightageApprox: '4-6 Marks',
    foundationalRank: 7,
    category: 'Core Concepts'
  },
  {
    name: 'Operating Systems',
    code: 'OS',
    totalTopics: 6,
    mostImportantCount: 5,
    importantCount: 1,
    lowerPriorityCount: 0,
    totalEstimatedHours: 95,
    pyqWeightageApprox: '8-10 Marks',
    foundationalRank: 8,
    category: 'Systems & Advanced'
  },
  {
    name: 'Databases',
    code: 'DBMS',
    totalTopics: 5,
    mostImportantCount: 5,
    importantCount: 0,
    lowerPriorityCount: 0,
    totalEstimatedHours: 85,
    pyqWeightageApprox: '7-9 Marks',
    foundationalRank: 9,
    category: 'Systems & Advanced'
  },
  {
    name: 'Computer Networks',
    code: 'CN',
    totalTopics: 7,
    mostImportantCount: 5,
    importantCount: 2,
    lowerPriorityCount: 0,
    totalEstimatedHours: 106,
    pyqWeightageApprox: '8-10 Marks',
    foundationalRank: 10,
    category: 'Systems & Advanced'
  },
  {
    name: 'General Aptitude',
    code: 'GA',
    totalTopics: 4,
    mostImportantCount: 3,
    importantCount: 1,
    lowerPriorityCount: 0,
    totalEstimatedHours: 47,
    pyqWeightageApprox: '15 Marks (Fixed)',
    foundationalRank: 11,
    category: 'Aptitude'
  }
];

export const STUDY_PLAN_6_MONTHS: StudyPlanWeek[] = [
  { week: 1, month: 1, subject: 'Discrete Mathematics', topicsFocus: 'Propositional & 1st Order Logic, Truth Tables, Validity', hoursTarget: 25, deliverables: 'Solve 40 PYQs on Predicate Logic', reviewCheckpoint: 'Master quantifiers equivalence rules' },
  { week: 2, month: 1, subject: 'Discrete Mathematics', topicsFocus: 'Sets, Relations, Equivalence, Partial Orders, Lattices', hoursTarget: 25, deliverables: 'Solve 35 PYQs on Relations & Hasse diagrams', reviewCheckpoint: 'Verify formulas for counting relation types' },
  { week: 3, month: 1, subject: 'Combinatorics & Graph Theory', topicsFocus: 'Permutations, Derangements, Graph Connectivity, Trees', hoursTarget: 26, deliverables: 'Solve 45 PYQs on Planar graphs, Eulerian, Hamiltonian', reviewCheckpoint: 'Handshaking theorem & Euler formula' },
  { week: 4, month: 1, subject: 'Linear Algebra & Calculus', topicsFocus: 'Eigenvalues, Cayley-Hamilton, System of Eqns, Limits', hoursTarget: 25, deliverables: 'Solve 50 PYQs on Matrix rank & Eigenvectors', reviewCheckpoint: 'Linear Algebra quick test (25 marks)' },
  { week: 5, month: 2, subject: 'Probability & Statistics', topicsFocus: 'Bayes Theorem, Random Variables, Poisson, Normal', hoursTarget: 26, deliverables: 'Solve 45 PYQs on Conditional probability & variance', reviewCheckpoint: 'Engg Math full subject mock test #1' },
  { week: 6, month: 2, subject: 'Digital Logic', topicsFocus: 'Boolean Minimization, K-Maps, MUX, Decoders, Adders', hoursTarget: 24, deliverables: 'Solve 40 PYQs on MUX trees and SOP simplification', reviewCheckpoint: 'Shannon expansion verification' },
  { week: 7, month: 2, subject: 'Digital Logic', topicsFocus: 'Sequential Circuits, Flip-Flops, Mod-N Counters, IEEE 754', hoursTarget: 26, deliverables: 'Solve 50 PYQs on Counter state transitions & IEEE float', reviewCheckpoint: 'Digital Logic subject test (25 marks)' },
  { week: 8, month: 2, subject: 'C Programming', topicsFocus: 'Pointers, Memory allocation, Recursion, Structs', hoursTarget: 25, deliverables: 'Solve 45 PYQs on C code tracing and pointer arithmetic', reviewCheckpoint: 'Operator precedence & static recursion check' },
  { week: 9, month: 3, subject: 'Data Structures', topicsFocus: 'Stacks, Queues, Linked Lists, Tree Traversals, BST, AVL', hoursTarget: 28, deliverables: 'Solve 50 PYQs on Inorder/Preorder reconstruction & BST', reviewCheckpoint: 'Catalan numbers & AVL rotation balance' },
  { week: 10, month: 3, subject: 'Data Structures & Algorithms', topicsFocus: 'Binary Heaps, Asymptotic notations, Master theorem, Sorting', hoursTarget: 27, deliverables: 'Solve 50 PYQs on Build-heap and QuickSort recurrence', reviewCheckpoint: 'Sorting stability & comparison bounds' },
  { week: 11, month: 3, subject: 'Algorithms Design', topicsFocus: 'Greedy (Huffman, MST), Dynamic Programming (0/1 Knapsack, MCM)', hoursTarget: 28, deliverables: 'Solve 45 PYQs on Matrix chain and greedy choice', reviewCheckpoint: 'DP state formulation practice' },
  { week: 12, month: 3, subject: 'Algorithms & Graph Algos', topicsFocus: 'BFS, DFS, Dijkstra, Bellman-Ford, Topological Sort', hoursTarget: 26, deliverables: 'Solve 40 PYQs on Shortest paths & Cycle detection', reviewCheckpoint: 'Algorithms subject test (25 marks)' },
  { week: 13, month: 4, subject: 'Theory of Computation', topicsFocus: 'DFA, NFA, Minimization, Regular Expressions, Myhill-Nerode', hoursTarget: 28, deliverables: 'Solve 50 PYQs on DFA state counting and equivalence', reviewCheckpoint: 'Closure properties of regular languages' },
  { week: 14, month: 4, subject: 'Theory of Computation', topicsFocus: 'CFG, PDA, Pumping Lemma, Turing Machines, Undecidability', hoursTarget: 28, deliverables: 'Solve 50 PYQs on Ambiguity, Rice theorem, Halting problem', reviewCheckpoint: 'TOC full subject mock test (25 marks)' },
  { week: 15, month: 4, subject: 'Compiler Design', topicsFocus: 'Lexical analysis, LL(1) Parsing, FIRST & FOLLOW sets', hoursTarget: 25, deliverables: 'Solve 40 PYQs on FIRST/FOLLOW & LL(1) conflicts', reviewCheckpoint: 'Conflict detection in parsing tables' },
  { week: 16, month: 4, subject: 'Compiler Design', topicsFocus: 'LR Parsing (SLR, LALR, CLR), SDT, Basic Blocks, Code Opt', hoursTarget: 26, deliverables: 'Solve 45 PYQs on LALR conflicts and 3AC basic blocks', reviewCheckpoint: 'Compiler Design subject test (25 marks)' },
  { week: 17, month: 5, subject: 'Operating Systems', topicsFocus: 'Processes, Threads, Fork, CPU Scheduling (SRTF, RR)', hoursTarget: 26, deliverables: 'Solve 45 PYQs on Fork count & Gantt chart waiting times', reviewCheckpoint: 'Turnaround & response time definitions' },
  { week: 18, month: 5, subject: 'Operating Systems', topicsFocus: 'Synchronization (Semaphores, Peterson), Deadlock, Banker’s', hoursTarget: 28, deliverables: 'Solve 50 PYQs on Counting semaphores & Safe sequences', reviewCheckpoint: 'Mutual exclusion & progress criteria check' },
  { week: 19, month: 5, subject: 'Operating Systems', topicsFocus: 'Virtual Memory, Multi-level Paging, TLB, Page Replacement', hoursTarget: 28, deliverables: 'Solve 50 PYQs on EMAT and Belady anomaly', reviewCheckpoint: 'OS full subject mock test (25 marks)' },
  { week: 20, month: 5, subject: 'Databases (DBMS)', topicsFocus: 'ER Model, Relational Algebra, SQL Queries, Normalization', hoursTarget: 28, deliverables: 'Solve 55 PYQs on Candidate keys, BCNF/3NF, and SQL', reviewCheckpoint: 'Lossless join & dependency preservation' },
  { week: 21, month: 6, subject: 'Databases & COA', topicsFocus: 'Transactions, Serializability, 2PL, B+ Trees, Addressing Modes', hoursTarget: 28, deliverables: 'Solve 50 PYQs on Precedence graphs & B+ tree order', reviewCheckpoint: 'DBMS subject test (25 marks)' },
  { week: 22, month: 6, subject: 'Computer Organization', topicsFocus: 'Instruction Pipelining, Hazards, Cache Memory (Direct/Set)', hoursTarget: 28, deliverables: 'Solve 50 PYQs on AMAT, Tag bit calculation & Pipeline stalls', reviewCheckpoint: 'COA subject test (25 marks)' },
  { week: 23, month: 6, subject: 'Computer Networks', topicsFocus: 'Framing, Stop-and-Wait, GBN, Selective Repeat, CSMA/CD, IPv4', hoursTarget: 28, deliverables: 'Solve 55 PYQs on Window efficiency, Subnetting & CIDR', reviewCheckpoint: 'Subnet masking & MTU fragmentation rules' },
  { week: 24, month: 6, subject: 'Computer Networks & GA', topicsFocus: 'Routing (Distance Vector), TCP Congestion, General Aptitude', hoursTarget: 28, deliverables: 'Solve 50 PYQs on TCP cwnd & Spatial/Quant aptitude', reviewCheckpoint: 'Comprehensive Full-Length Mock 1 & 2' }
];

export const TIME_ESTIMATES = {
  totalSyllabusTheoryHours: 375,
  totalSyllabusPracticeHours: 494,
  totalSyllabusHours: 869,
  totalPYQHours: 250,
  totalRevisionHours: 180,
  totalMockHours: 120, // 30 full-length mocks * 4 hours (test + 1h review)
  grandTotalHours: 1419,
  plansSummary: [
    { duration: '3 Months (Crash / Intensive)', dailyHours: '12-14 hrs/day', focus: '🔴 Most Important Topics only (80/20 rule), 10 Years PYQs, 15 Mocks', feasibility: 'High stress; requires existing baseline conceptual knowledge' },
    { duration: '6 Months (Recommended Standard)', dailyHours: '7-8 hrs/day', focus: '100% of 🔴 Most Important + 🟠 Important, 15 Years PYQs, 25 Mocks, 3-cycle revision', feasibility: 'Optimal balance of deep understanding and retention' },
    { duration: '9 Months (Comprehensive)', dailyHours: '5-6 hrs/day', focus: 'Complete syllabus coverage, standard textbooks, all PYQs twice, 35 Mocks', feasibility: 'Ideal for 3rd/4th year college students with classes' },
    { duration: '12 Months (Foundation to Ranker)', dailyHours: '3-4 hrs/day', focus: 'Deep foundational mastery, multiple textbook problem sets, 45+ Mocks, Top 100 AIR target', feasibility: 'Stress-free steady pace with maximum consistency' }
  ]
};

export const INITIAL_MOCK_TESTS: MockTestEntry[] = [
  {
    id: 'mock-01',
    testName: 'All India Full Length Mock 1',
    date: '2026-10-15',
    totalMarks: 100,
    scoreObtained: 58.67,
    rankOrPercentile: 'AIR 412 / 94.5%',
    accuracyPercent: 78.2,
    weakSubjects: 'Computer Networks, COA',
    weakTopics: 'Cache memory tag directory, TCP Congestion window',
    mistakeType: 'Calculation Error',
    improvementAction: 'Re-derive tag bit division formula and practice 10 numerical problems on AIMD graph transitions'
  },
  {
    id: 'mock-02',
    testName: 'Subject Test - Discrete Math & Digital Logic',
    date: '2026-10-28',
    totalMarks: 50,
    scoreObtained: 39.33,
    rankOrPercentile: 'AIR 88 / 98.1%',
    accuracyPercent: 86.5,
    weakSubjects: 'Digital Logic',
    weakTopics: 'Sequential circuit clock setup/hold time delay',
    mistakeType: 'Conceptual Gap',
    improvementAction: 'Review Morris Mano chapter 5 on flip-flop setup/hold constraints in synchronous counters'
  },
  {
    id: 'mock-03',
    testName: 'All India Full Length Mock 2',
    date: '2026-11-12',
    totalMarks: 100,
    scoreObtained: 66.33,
    rankOrPercentile: 'AIR 195 / 97.4%',
    accuracyPercent: 84.0,
    weakSubjects: 'Operating Systems',
    weakTopics: 'Multi-level paging EMAT with inverted page tables',
    mistakeType: 'Misread Question',
    improvementAction: 'Carefully highlight whether memory access time is for TLB miss penalty or complete page access'
  }
];

export const FORMULA_ENTRIES: FormulaEntry[] = [
  // Discrete Math & Logic
  { id: 'f-01', subject: 'Engineering Mathematics', chapter: 'Discrete Math', title: 'Equivalence Relations & Partitions', formulaOrRule: 'Total relations on n elements = 2^(n^2); Reflexive = 2^(n(n-1)); Symmetric = 2^(n(n+1)/2); Reflexive & Symmetric = 2^(n(n-1)/2)', notes: 'Equivalence relations equal Bell number B(n)', frequencyInExam: 'Very High' },
  { id: 'f-02', subject: 'Engineering Mathematics', chapter: 'Graph Theory', title: 'Euler Planar Formula & Handshaking', formulaOrRule: '∑ deg(v) = 2|E|; Planar connected: V - E + R = 2; Simple planar graph: E ≤ 3V - 6 (if no triangles, E ≤ 2V - 4)', notes: 'Crucial for chromatic bounds and planarity checks', frequencyInExam: 'Very High' },
  { id: 'f-03', subject: 'Engineering Mathematics', chapter: 'Linear Algebra', title: 'Eigenvalues & Cayley-Hamilton', formulaOrRule: 'Trace(A) = ∑ λ_i; Det(A) = ∏ λ_i; Eigenvalues of A^k are (λ_i)^k; Matrix satisfies characteristic equation |A - λI| = 0', notes: 'Frequently used to calculate matrix inverses or large powers', frequencyInExam: 'Very High' },
  { id: 'f-04', subject: 'Engineering Mathematics', chapter: 'Probability', title: 'Bayes Theorem & Poisson Dist', formulaOrRule: 'P(B_i|A) = P(A|B_i)P(B_i) / ∑ P(A|B_k)P(B_k); Poisson: P(X=k) = e^(-λ) λ^k / k! with Mean = Var = λ', notes: 'Exponential distribution has memoryless property: P(X > s+t | X > s) = P(X > t)', frequencyInExam: 'Very High' },
  
  // Digital Logic
  { id: 'f-05', subject: 'Digital Logic', chapter: 'Number Systems', title: 'IEEE 754 Single Precision 32-bit', formulaOrRule: 'Value = (-1)^S * (1.M) * 2^(E - 127); Sign: 1 bit, Exponent: 8 bits (bias 127), Mantissa: 23 bits', notes: 'E=255 with M=0 is ±Infinity; E=255 with M!=0 is NaN; E=0 is Denormalized', frequencyInExam: 'Very High' },
  { id: 'f-06', subject: 'Digital Logic', chapter: 'Sequential Circuits', title: 'Clock Frequency & Timing Constraints', formulaOrRule: 'T_clock ≥ T_propagation(FF) + T_combinational + T_setup; Hold constraint: T_prop(FF) + T_comb ≥ T_hold', notes: 'Setup time violation can be fixed by slowing clock; Hold time violation is unfixable by clock', frequencyInExam: 'Very High' },

  // COA
  { id: 'f-07', subject: 'Computer Organization', chapter: 'Memory Hierarchy', title: 'Cache Memory AMAT & Tag Bits', formulaOrRule: 'AMAT = Hit_Time + Miss_Rate * Miss_Penalty; Tag Bits = Physical_Addr_Bits - (Set_Bits + Offset_Bits)', notes: 'Direct Mapped has Set_Bits = log2(lines); Fully Associative has 0 Set_Bits', frequencyInExam: 'Very High' },
  { id: 'f-08', subject: 'Computer Organization', chapter: 'Pipelining', title: 'Pipeline Speedup & CPI', formulaOrRule: 'Speedup = (k * n) / (k + n - 1 + Stalls) * (t_nonpipelined / t_pipelined); Ideal CPI = 1; Actual CPI = 1 + Stalls_per_inst', notes: 'Branch penalties resolved by branch prediction or delayed branching', frequencyInExam: 'Very High' },

  // Data Structures & Algorithms
  { id: 'f-09', subject: 'Algorithms', chapter: 'Recurrences', title: 'Master Theorem for Divide & Conquer', formulaOrRule: 'T(n) = aT(n/b) + Θ(n^k log^p n): If log_b(a) > k ⇒ Θ(n^(log_b a)); If log_b(a) = k ⇒ Θ(n^k log^(p+1) n); If log_b(a) < k ⇒ Θ(n^k log^p n)', notes: 'Assumes a ≥ 1, b > 1, k ≥ 0, p is real', frequencyInExam: 'Very High' },
  { id: 'f-10', subject: 'Programming & Data Structures', chapter: 'Trees', title: 'Binary Tree Formulas & Catalan Numbers', formulaOrRule: 'Number of binary trees with n unlabeled nodes = Catalan C_n = (2n)! / ((n+1)! * n!); Strict BT: Leaves = Internal_Nodes + 1', notes: 'Inorder traversal of BST gives strictly ascending sequence', frequencyInExam: 'Very High' },

  // Operating Systems
  { id: 'f-11', subject: 'Operating Systems', chapter: 'Memory Management', title: 'Effective Memory Access Time (EMAT)', formulaOrRule: 'EMAT = h * (t_TLB + t_mem) + (1 - h) * (t_TLB + (k + 1) * t_mem) where k = levels of page table', notes: 'If page fault occurs: EMAT includes Page_Fault_Rate * Service_Time', frequencyInExam: 'Very High' },
  { id: 'f-12', subject: 'Operating Systems', chapter: 'Deadlock', title: 'Deadlock Avoidance Minimum Resources', formulaOrRule: 'System is guaranteed deadlock-free if Total Resources R ≥ ∑ (Max_Demand_i - 1) + 1 = ∑ Max_Demand_i - N + 1', notes: 'P processes, each requiring max M units', frequencyInExam: 'Very High' },

  // DBMS
  { id: 'f-13', subject: 'Databases', chapter: 'Normalization', title: 'Normal Form Decision Rules', formulaOrRule: 'For any FD X → Y: 1) BCNF: X is Superkey; 2) 3NF: X is Superkey OR Y is Prime Attribute; 3) 2NF: No partial dependency (Prime → Non-prime)', notes: 'Candidate key is minimal superkey. 3NF always achieves dependency preservation and lossless join.', frequencyInExam: 'Very High' },
  { id: 'f-14', subject: 'Databases', chapter: 'Indexing', title: 'B+ Tree Node Order Math', formulaOrRule: 'Internal node order p: p * PtrSize + (p - 1) * KeySize ≤ BlockSize; Leaf node order: m * (KeySize + RecordPtr) + BlockPtr ≤ BlockSize', notes: 'Root has at least 2 pointers. Non-root nodes have at least ⌈p/2⌉ pointers.', frequencyInExam: 'Very High' },

  // Computer Networks
  { id: 'f-15', subject: 'Computer Networks', chapter: 'Data Link Layer', title: 'Sliding Window Protocol Efficiency', formulaOrRule: 'Efficiency η = W / (1 + 2a) where a = T_prop / T_tx; For Stop-and-Wait, W=1; GBN: W_sender = 2^k - 1; SR: W_sender = 2^(k-1)', notes: 'Minimum sequence bits k: Stop-and-Wait needs 1 bit; GBN needs ⌈log2(W+1)⌉; SR needs ⌈log2(2W)⌉', frequencyInExam: 'Very High' },
  { id: 'f-16', subject: 'Computer Networks', chapter: 'MAC', title: 'CSMA/CD Minimum Frame Size', formulaOrRule: 'T_tx ≥ 2 * T_prop ⇒ Frame_Size / Bandwidth ≥ 2 * (Distance / Speed) ⇒ Frame_Size ≥ 2 * Bandwidth * (Distance / Speed)', notes: 'Prevents collision occurring after sender finishes transmission', frequencyInExam: 'Very High' }
];
