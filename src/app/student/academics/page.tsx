'use client';

import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

type Tab = 'current' | 'history' | 'exams' | 'backlogs';

interface SubjectMark {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade: string;
  score: number;
  midterm: number;
  assignment: number;
  status: 'Completed' | 'Ongoing' | 'Pending';
}

interface BacklogItem {
  id: string;
  subject: string;
  code: string;
  semester: string;
  credits: number;
  status: 'Pending Registration' | 'Registered' | 'Cleared';
}

interface QuestionBreakdown {
  qText: string;
  studentAnswer: string;
  marksAwarded: number;
  maxMarks: number;
  aiComment: string;
}

interface ExamResult {
  id: string;
  name: string;
  date: string;
  score: string;
  proctorReview: string;
  status: 'Pass' | 'Fail';
  questions: QuestionBreakdown[];
}

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('current');
  const [expandedResultId, setExpandedResultId] = useState<string | null>(null);

  const currentSubjects: SubjectMark[] = [
    { id: 'S1', name: 'Advanced Algorithms & Complexity', code: 'CSE-501', credits: 4, grade: 'IP', score: 0, midterm: 88, assignment: 92, status: 'Ongoing' },
    { id: 'S2', name: 'Neural Network Architectures', code: 'CSE-503', credits: 4, grade: 'IP', score: 0, midterm: 82, assignment: 86, status: 'Ongoing' },
    { id: 'S3', name: 'Discrete Mathematics', code: 'CSE-302', credits: 3, grade: 'A+', score: 95, midterm: 92, assignment: 98, status: 'Completed' },
    { id: 'S4', name: 'Advanced Data Structures', code: 'CSE-304', credits: 4, grade: 'A', score: 88, midterm: 84, assignment: 90, status: 'Completed' },
    { id: 'S5', name: 'Software Engineering', code: 'CSE-306', credits: 3, grade: 'A-', score: 82, midterm: 78, assignment: 85, status: 'Completed' },
    { id: 'S6', name: 'Computational Logic', code: 'CSE-505', credits: 3, grade: 'N/A', score: 0, midterm: 0, assignment: 0, status: 'Pending' }
  ];

  const backlogs: BacklogItem[] = [
    { id: 'BCK-101', subject: 'Advanced Calculus & Linear Algebra', code: 'MTH-101', semester: 'Semester 3', credits: 4, status: 'Pending Registration' },
    { id: 'BCK-102', subject: 'Basic Electronics Laboratory', code: 'ECE-202L', semester: 'Semester 2', credits: 2, status: 'Registered' }
  ];

  const examResults: ExamResult[] = [
    {
      id: 'RES-883',
      name: 'Discrete Mathematics Final Exam',
      date: '2026-06-12',
      score: '98/100 (Grade A+)',
      proctorReview: 'Verified by AI Proctor. Face match: 99.8%. No anomalies detected during session.',
      status: 'Pass',
      questions: [
        {
          qText: 'Prove that if G is a connected planar graph with V vertices, E edges, and F faces, then V - E + F = 2.',
          studentAnswer: 'We prove Euler\'s formula by induction on the number of faces F. Base Case: F = 1. A planar graph with 1 face has no cycles, so it is a tree. For any tree, E = V - 1. Substituting this: V - (V - 1) + 1 = 1 + 1 = 2. This holds. Inductive Step: Assume the formula holds for any connected planar graph with F = k faces. Let G be a graph with k+1 faces. Since k+1 >= 2, G contains at least one cycle. Remove one edge "e" that lies on the boundary of two faces. The resulting graph G\' has V\' = V vertices, E\' = E - 1 edges, and F\' = k faces. By the induction hypothesis, V\' - E\' + F\' = 2. Substituting back: V - (E - 1) + (F - 1) = 2 => V - E + F = 2. Thus, the formula holds for F = k+1.',
          marksAwarded: 30,
          maxMarks: 30,
          aiComment: 'Flawless inductive proof with rigorous base case and cycle boundary edge removal description.'
        },
        {
          qText: 'State and prove the Handshaking Lemma for undirected graphs.',
          studentAnswer: 'The Handshaking Lemma states that in any undirected graph, the sum of degrees of all vertices is twice the number of edges: sum(deg(v)) = 2E. Proof: Every edge e = {u, v} in the graph connects two vertices. Thus, when we count the degree of each vertex (which is the number of incident edges), each edge contributes exactly 1 to the degree of its two endpoints. Therefore, summing the degrees over all vertices counts each edge exactly twice, yielding 2E.',
          marksAwarded: 30,
          maxMarks: 30,
          aiComment: 'Clear, concise explanation of edge endpoint incidence summing to 2E.'
        },
        {
          qText: 'Calculate the number of integer solutions to x1 + x2 + x3 + x4 = 20 where each xi >= 1.',
          studentAnswer: 'Let yi = xi - 1. Since xi >= 1, we have yi >= 0. Substituting xi = yi + 1 into the original equation: (y1 + 1) + (y2 + 1) + (y3 + 1) + (y4 + 1) = 20 => y1 + y2 + y3 + y4 = 16. Using the stars and bars method, the number of non-negative integer solutions is given by the combination C(N + K - 1, K - 1), where N = 16 and K = 4. Thus, we have C(16 + 4 - 1, 4 - 1) = C(19, 3) = (19 * 18 * 17) / (3 * 2 * 1) = 19 * 3 * 17 = 969 solutions.',
          marksAwarded: 38,
          maxMarks: 40,
          aiComment: 'Perfect mathematical formulation of non-negative variables conversion and Stars & Bars coefficient math.'
        }
      ]
    },
    {
      id: 'RES-774',
      name: 'Advanced Data Structures Midterm',
      date: '2026-05-18',
      score: '84/100 (Grade A)',
      proctorReview: 'Verified by AI Proctor. Gaze anomalies: 1.2% (under threshold). Clear session.',
      status: 'Pass',
      questions: [
        {
          qText: 'Explain the insertion algorithm in a Red-Black Tree and how double-red violations are resolved.',
          studentAnswer: 'New nodes are always inserted as RED. If the parent of the new node is also RED, we have a double-red violation. To resolve this, we check the color of the uncle node: Case 1: Uncle is RED. We recolor parent and uncle to BLACK, and grandparent to RED. Then recursively fix grandparent. Case 2: Uncle is BLACK. We perform rotations (single LL/RR or double LR/RL) depending on the alignment, and then recolor parent and grandparent.',
          marksAwarded: 34,
          maxMarks: 40,
          aiComment: 'Good categorization of uncle node cases. Could have sketched case-by-case rotation directions in more detail.'
        },
        {
          qText: 'Outline how a Fibonacci Heap achieves O(1) amortized time for decrease-key operations.',
          studentAnswer: 'In a Fibonacci Heap, decrease-key is performed by cutting the node from its parent if the heap order is violated, making it a new root in the root list. We mark the parent. If the parent was already marked, we cut it recursively. This cascading cut ensures that the degree of any node remains logarithmic relative to heap size, yielding O(1) amortized cost.',
          marksAwarded: 50,
          maxMarks: 60,
          aiComment: 'Correct structural description of cascading cuts and parent marking logic.'
        }
      ]
    },
    {
      id: 'RES-512',
      name: 'Computational Logic Mock Quiz 2',
      date: '2026-05-02',
      score: '90/100 (Grade A)',
      proctorReview: 'Self-proctored sandbox mode completion receipt issued.',
      status: 'Pass',
      questions: [
        {
          qText: 'Describe DPLL propositional SAT solver core steps.',
          studentAnswer: 'DPLL extends depth-first search of truth assignments with: 1. Unit Propagation (if a clause is unit, its literal must be true). 2. Pure Literal Elimination (if a literal appears with only one polarity, assign it to satisfy all containing clauses). 3. Backtracking on conflict.',
          marksAwarded: 90,
          maxMarks: 100,
          aiComment: 'Excellent grasp of unit clause simplification and pure literal pruning rules.'
        }
      ]
    }
  ];

  const sgpaHistory = [
    { sem: 'Semester 1', gpa: 3.85, status: 'Cleared' },
    { sem: 'Semester 2', gpa: 3.90, status: 'Cleared' },
    { sem: 'Semester 3', gpa: 3.94, status: 'Cleared' },
    { sem: 'Semester 4', gpa: 3.92, status: 'Cleared' }
  ];

  const toggleExpandResult = (id: string) => {
    setExpandedResultId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-lg overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'current', name: 'Current Term Report' },
            { id: 'history', name: 'Semester GPA History' },
            { id: 'exams', name: 'Recent Exam Results' },
            { id: 'backlogs', name: 'Pending Backlogs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content 1: Current Term */}
      {activeTab === 'current' && (
        <div className="p-6 rounded-2xl bg-white/45 dark:bg-white/5 border border-white/50 dark:border-white/5 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] text-[13.5px]">
            <thead>
              <tr className="border-b border-[#E3D5BC] dark:border-white/10 text-[#5C5868]/70 dark:text-[#E4E2E4]/50 font-mono text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Subject & Code</th>
                <th className="pb-3 font-semibold">Credits</th>
                <th className="pb-3 font-semibold">Midterm</th>
                <th className="pb-3 font-semibold">Assignment</th>
                <th className="pb-3 font-semibold text-right">Grade</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D5BC]/30 dark:divide-white/5">
              {currentSubjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/20 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-3">
                    <p className="font-semibold text-[#1E1B24] dark:text-white">{sub.name}</p>
                    <span className="text-[11px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1 block">
                      {sub.code}
                    </span>
                  </td>
                  <td className="py-4 font-mono">{sub.credits}</td>
                  <td className="py-4 font-mono">{sub.status === 'Pending' ? '—' : `${sub.midterm}/100`}</td>
                  <td className="py-4 font-mono">{sub.status === 'Pending' ? '—' : `${sub.assignment}/100`}</td>
                  <td className="py-4 text-right font-mono font-bold text-[#4A63C9] dark:text-[#B5C7E8]">
                    {sub.grade}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        sub.status === 'Completed'
                          ? 'bg-[#DFF3E8] text-[#2E8B5C] dark:bg-[#2E8B5C]/20'
                          : sub.status === 'Ongoing'
                          ? 'bg-[#E1E9FB] text-[#3B5BC4] dark:bg-[#3B5BC4]/20'
                          : 'bg-[#FDEFD6] text-[#A8731A] dark:bg-[#A8731A]/20'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content 2: History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sgpaHistory.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between gap-3"
              >
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                  {item.sem}
                </span>
                <div>
                  <h3 className="font-mono font-bold text-[28px] text-[#1E1B24] dark:text-white leading-none">
                    {item.gpa}
                  </h3>
                  <span className="text-[11px] font-mono text-[#2E8B5C] font-semibold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cleared
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* SGPA Growth/Decline SVG Line Chart */}
          <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
            <h3 className="font-display font-bold text-[15px] text-[#1E1B24] dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#4A63C9]" />
              Academic Performance Growth trajectory
            </h3>
            <div className="h-52 w-full relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
                <defs>
                  <linearGradient id="history-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A63C9" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4A63C9" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 20 85 L 130 75 L 240 60 L 350 68 V 100 H 20 Z" fill="url(#history-grad)" />
                <path d="M 20 85 L 130 75 L 240 60 L 350 68" fill="none" stroke="#4A63C9" strokeWidth="2" />
                <circle cx="20" cy="85" fill="#4A63C9" r="3" />
                <circle cx="130" cy="75" fill="#4A63C9" r="3" />
                <circle cx="240" cy="60" fill="#9C7FDB" r="4.5" className="animate-pulse" />
                <circle cx="350" cy="68" fill="#4A63C9" r="3" />
              </svg>
              <div className="absolute bottom-[-18px] left-0 right-0 flex justify-between text-[9px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 px-2.5">
                <span>SEM 1 (3.85)</span>
                <span>SEM 2 (3.90)</span>
                <span>SEM 3 (3.94)</span>
                <span>SEM 4 (3.92)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Exam Results */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white">
              Exam Scripts & Proctoring Logs
            </h3>
            <p className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 mt-1">
              Click on any exam script record below to expand the question-by-question scoring and AI invigilator remarks.
            </p>
          </div>

          <div className="space-y-3.5">
            {examResults.map((res) => {
              const isExpanded = expandedResultId === res.id;
              return (
                <div
                  key={res.id}
                  className="rounded-2xl border bg-white/40 dark:bg-white/5 border-white/50 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-all overflow-hidden"
                >
                  {/* Summary Bar (Clickable) */}
                  <div
                    onClick={() => toggleExpandResult(res.id)}
                    className="p-5 flex justify-between items-start md:items-center gap-4 cursor-pointer"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#DFF3E8] text-[#2E8B5C] dark:bg-[#2E8B5C]/20 font-mono text-[9px] font-bold">
                          {res.status.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{res.id}</span>
                      </div>
                      <h4 className="font-semibold text-[14.5px] text-[#1E1B24] dark:text-white truncate">{res.name}</h4>
                      <div className="flex items-center gap-4 text-[12px] font-mono text-[#4A63C9] dark:text-[#B5C7E8] font-bold">
                        <span>Score: {res.score}</span>
                        <span className="text-zinc-500 font-normal">Completed: {res.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-center">
                      <span className="text-[11px] font-semibold text-zinc-500 hidden sm:inline">
                        {isExpanded ? 'Hide Details' : 'View Breakdown'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-zinc-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-500" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Breakdown Panel */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-[#E3D5BC]/30 dark:border-white/5 bg-white/30 dark:bg-black/10 space-y-5 animate-fade-in">
                      {/* Proctor Integrity Log summary */}
                      <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-zinc-900/60 font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
                        <p className="font-bold text-[11px] text-[#9C7FDB] uppercase tracking-wider mb-1">
                          Proctor Audit Summary
                        </p>
                        <p className="italic">{res.proctorReview}</p>
                      </div>

                      {/* Question by question section */}
                      <div className="space-y-4">
                        <h5 className="font-display font-bold text-[13px] text-[#1E1B24] dark:text-white border-b border-zinc-200 dark:border-white/5 pb-1">
                          Question Breakdown
                        </h5>
                        
                        {res.questions.map((q, idx) => (
                          <div key={idx} className="space-y-2 text-[12.5px] border-l-2 border-[#4A63C9]/40 pl-4">
                            <div className="flex justify-between items-start gap-3">
                              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                                Question {idx + 1}: {q.qText}
                              </p>
                              <span className="font-mono font-bold text-[#4A63C9] dark:text-[#B5C7E8] shrink-0 text-right">
                                {q.marksAwarded} / {q.maxMarks} Marks
                              </span>
                            </div>
                            
                            <div className="p-3 bg-white/60 dark:bg-black/25 rounded-xl border border-zinc-200/50 dark:border-white/5">
                              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Student Answer Script</p>
                              <p className="font-mono leading-relaxed text-zinc-700 dark:text-zinc-300 select-text whitespace-pre-wrap">{q.studentAnswer}</p>
                            </div>

                            <p className="text-[12px] text-emerald-600 dark:text-emerald-400 italic font-medium leading-relaxed pl-1">
                              AI Evaluator feedback: &quot;{q.aiComment}&quot;
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content 4: Backlogs */}
      {activeTab === 'backlogs' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 p-4 bg-[#FDEFD6] border border-[#A8731A]/20 text-[#A8731A] rounded-2xl text-[13px] font-medium leading-relaxed">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Attention: You have **2 active backlog examinations** pending clearance. Ensure registration fees are processed before the examination terminal unlocks.</span>
          </div>

          <div className="space-y-3.5">
            {backlogs.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#C1493D]/10 text-[#C1493D] font-mono text-[9px] font-bold">
                      {item.status}
                    </span>
                    <span className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{item.code} · {item.semester}</span>
                  </div>
                  <h4 className="font-semibold text-[14.5px] text-[#1E1B24] dark:text-white">{item.subject}</h4>
                  <p className="text-[12px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60">Credits weight: {item.credits} pts</p>
                </div>
                {item.status === 'Pending Registration' ? (
                  <button
                    onClick={() => alert(`Backlog registration launched for ${item.code}. Redirecting to payments...`)}
                    className="px-4 py-2 bg-[#C1493D]/10 hover:bg-[#C1493D] text-[#C1493D] hover:text-white border border-[#C1493D]/10 hover:border-transparent rounded-xl text-[12px] font-bold transition-all shrink-0"
                  >
                    Register Exam
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-white/80 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/10 text-zinc-500 rounded-xl text-[12px] font-bold shrink-0">
                    Registered
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
