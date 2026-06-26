'use client';

import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

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

interface ExamResult {
  id: string;
  name: string;
  date: string;
  score: string;
  proctorReview: string;
  status: 'Pass' | 'Fail';
}

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('current');

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
    { id: 'RES-883', name: 'Discrete Mathematics Final Exam', date: '2026-06-12', score: '98/100 (Grade A+)', proctorReview: 'Verified by AI Proctor. Face match: 99.8%. No anomalies detected during session.', status: 'Pass' },
    { id: 'RES-774', name: 'Advanced Data Structures Midterm', date: '2026-05-18', score: '84/100 (Grade A)', proctorReview: 'Verified by AI Proctor. Gaze anomalies: 1.2% (under threshold). Clear session.', status: 'Pass' },
    { id: 'RES-512', name: 'Computational Logic Mock Quiz 2', date: '2026-05-02', score: '90/100 (Grade A)', proctorReview: 'Self-proctored sandbox mode completion receipt issued.', status: 'Pass' }
  ];

  const sgpaHistory = [
    { sem: 'Semester 1', gpa: 3.85, status: 'Cleared' },
    { sem: 'Semester 2', gpa: 3.90, status: 'Cleared' },
    { sem: 'Semester 3', gpa: 3.94, status: 'Cleared' },
    { sem: 'Semester 4', gpa: 3.92, status: 'Cleared' }
  ];

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
                {/* SVG Graph path mapping SGPAs 3.85 -> 3.90 -> 3.94 -> 3.92 */}
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
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-1">
            Exam scripts & Proctoring Logs
          </h3>

          <div className="space-y-3.5">
            {examResults.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col md:flex-row justify-between items-start gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#DFF3E8] text-[#2E8B5C] dark:bg-[#2E8B5C]/20 font-mono text-[9px] font-bold">
                      {res.status.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{res.id}</span>
                  </div>
                  <h4 className="font-semibold text-[14px] text-[#1E1B24] dark:text-white truncate">{res.name}</h4>
                  <p className="text-[11.5px] font-mono text-[#4A63C9] dark:text-[#B5C7E8] font-semibold">
                    Score: {res.score}
                  </p>
                  <p className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-normal bg-white/30 dark:bg-black/10 p-2.5 rounded-xl border border-[#E3D5BC]/20 dark:border-white/5 italic">
                    {res.proctorReview}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40 shrink-0 self-start md:self-center">
                  Completed on: {res.date}
                </span>
              </div>
            ))}
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
