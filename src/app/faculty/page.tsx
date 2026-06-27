'use client';

import React, { useState } from 'react';
import { useFaculty } from './context/FacultyContext';
import {
  Sparkles,
  Users,
  AlertTriangle,
  ClipboardList,
  ArrowRight,
  BookOpen,
  FileCheck2,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function FacultyDashboard() {
  const { classes, assignments, exams, evaluationExams, violations } = useFaculty();
  const [activeSem, setActiveSem] = useState<'Sem 1' | 'Sem 3' | 'Sem 5' | 'Sem 7'>('Sem 5');

  // Filter values based on activeSem
  const activeClasses = classes.filter((c) => c.semester === activeSem || activeSem === 'Sem 5');
  const activeStudentCount = activeClasses.reduce((acc, curr) => acc + curr.studentCount, 0);

  const pendingEvalCount = evaluationExams.reduce((acc, curr) => {
    if (curr.status !== 'Published') {
      return acc + curr.scripts.filter(s => !s.reviewed).length;
    }
    return acc;
  }, 0);

  const unreviewedViolationsCount = violations.filter((v) => v.status === 'Unreviewed').length;
  const papersCount = exams.length;

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Greeting & Date Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">WELCOME BACK</span>
          <h2 className="font-display font-bold text-[22px] md:text-[24px] text-[#1E1B24] dark:text-[#EDEAF2] mt-0.5 flex items-center gap-2">
            Good morning, Dr. Priya Nair 👋
          </h2>
          <p className="text-[12px] font-mono text-[#5C5868]/70 dark:text-[#9591A3]/60 mt-1">
            {todayStr}
          </p>
        </div>

        {/* Semester / Dept Switch Chips */}
        <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 shrink-0 border border-[#E3D5BC]/20">
          {(['Sem 1', 'Sem 3', 'Sem 5', 'Sem 7'] as const).map((sem) => (
            <button
              key={sem}
              onClick={() => setActiveSem(sem)}
              className={`px-3 py-1.5 rounded-lg text-[11.5px] font-semibold transition-all duration-200 ${
                activeSem === sem
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#9591A3]/60 hover:text-[#1E1B24] dark:hover:text-[#EDEAF2]'
              }`}
            >
              {activeSem === sem && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A63C9] mr-1.5" />}
              {sem}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Card Stat Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="p-5 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">
              Students (This Sem)
            </span>
            <Users className="w-5 h-5 text-[#4A63C9]" />
          </div>
          <div className="mt-3">
            <h3 className="font-mono font-bold text-[28px] text-[#1E1B24] dark:text-[#EDEAF2] leading-none">
              {activeSem === 'Sem 5' ? activeStudentCount : activeSem === 'Sem 1' ? 64 : activeSem === 'Sem 3' ? 88 : 32}
            </h3>
            <p className="text-[11px] text-[#5C5868]/70 dark:text-[#9591A3]/50 mt-1.5">Registered in class roster</p>
          </div>
        </div>

        {/* Pending Evaluations */}
        <div className="p-5 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">
              Pending Evaluations
            </span>
            <FileCheck2 className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-3">
            <h3 className={`font-mono font-bold text-[28px] leading-none ${pendingEvalCount > 0 ? 'text-[#A8731A]' : 'text-[#2E8B5C]'}`}>
              {activeSem === 'Sem 5' ? pendingEvalCount : 0}
            </h3>
            <p className="text-[11px] text-[#5C5868]/70 dark:text-[#9591A3]/50 mt-1.5">
              {pendingEvalCount > 0 ? 'Needs manual review' : 'All evaluations cleared'}
            </p>
          </div>
        </div>

        {/* Papers Generated */}
        <div className="p-5 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">
              Papers Generated
            </span>
            <Sparkles className="w-5 h-5 text-[#9C7FDB]" />
          </div>
          <div className="mt-3">
            <h3 className="font-mono font-bold text-[28px] text-[#1E1B24] dark:text-[#EDEAF2] leading-none">
              {activeSem === 'Sem 5' ? papersCount : 1}
            </h3>
            <p className="text-[11px] text-[#5C5868]/70 dark:text-[#9591A3]/50 mt-1.5">RAG Synthesized sets</p>
          </div>
        </div>

        {/* Violation Flags */}
        <div className="p-5 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">
              Violation Flags
            </span>
            <AlertTriangle className="w-5 h-5 text-[#C1493D]" />
          </div>
          <div className="mt-3">
            <h3 className={`font-mono font-bold text-[28px] leading-none ${unreviewedViolationsCount > 0 ? 'text-[#C1493D]' : 'text-[#2E8B5C]'}`}>
              {activeSem === 'Sem 5' ? unreviewedViolationsCount : 0}
            </h3>
            <p className="text-[11px] text-[#5C5868]/70 dark:text-[#9591A3]/50 mt-1.5">
              {unreviewedViolationsCount > 0 ? 'Urgent reviews pending' : 'Zero logs flagged'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Deploy & Submissions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Upcoming Exams to Deploy */}
          <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-display font-bold text-[15.5px] text-[#1E1B24] dark:text-[#EDEAF2] mb-4 flex items-center gap-2">
              <ClipboardList className="w-4.5 h-4.5 text-[#4A63C9]" />
              Upcoming Exams to Deploy
            </h3>
            <div className="divide-y divide-[#E3D5BC]/20 dark:divide-white/5">
              {exams.filter((ex) => ex.status === 'Scheduled').map((ex) => (
                <div key={ex.id} className="py-3.5 flex items-center justify-between gap-3 text-[12.5px]">
                  <div>
                    <h4 className="font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">{ex.title}</h4>
                    <p className="text-[10px] text-[#5C5868]/75 dark:text-[#9591A3]/50 font-mono mt-0.5">
                      {ex.course} · {ex.questionsCount} Qs · {ex.marks} Marks
                    </p>
                  </div>
                  <Link
                    href="/faculty/exams"
                    className="px-3.5 py-1.5 rounded-lg bg-[#4A63C9] hover:bg-[#3b51b3] text-white text-[11.5px] font-bold transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Deploy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
              {exams.filter((ex) => ex.status === 'Scheduled').length === 0 && (
                <p className="text-center py-6 text-[12px] text-[#5C5868]/60">No pending exams to deploy.</p>
              )}
            </div>
          </div>

          {/* Recent Submissions awaiting grading */}
          <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-display font-bold text-[15.5px] text-[#1E1B24] dark:text-[#EDEAF2] mb-4 flex items-center gap-2">
              <FileCheck2 className="w-4.5 h-4.5 text-[#9C7FDB]" />
              Recent Submissions Awaiting Grading
            </h3>
            <div className="divide-y divide-[#E3D5BC]/20 dark:divide-white/5">
              {assignments.map((asn) => {
                const pendingGrading = asn.submissions.filter(s => s.status === 'Submitted' && !s.graded).length;
                if (pendingGrading === 0) return null;
                return (
                  <div key={asn.id} className="py-3.5 flex items-center justify-between gap-3 text-[12.5px]">
                    <div>
                      <h4 className="font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">{asn.title}</h4>
                      <p className="text-[10px] text-[#5C5868]/75 dark:text-[#9591A3]/50 font-mono mt-0.5">
                        {asn.course} · due {asn.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-mono text-[11.5px] text-[#A8731A] font-bold bg-[#FDEFD6] px-2 py-0.5 rounded">
                        {pendingGrading} pending
                      </span>
                      <Link
                        href="/faculty/assignments"
                        className="px-3.5 py-1.5 rounded-lg bg-white/80 dark:bg-white/5 border border-[#E3D5BC]/40 dark:border-white/5 text-[#4A63C9] hover:bg-[#4A63C9] hover:text-white text-[11.5px] font-bold transition-all flex items-center gap-1"
                      >
                        <span>Grade Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
              {assignments.every(asn => asn.submissions.filter(s => s.status === 'Submitted' && !s.graded).length === 0) && (
                <div className="text-center py-8 text-[12px] text-[#5C5868]/60 flex flex-col items-center gap-1.5">
                  <CheckCircle className="w-8 h-8 text-[#2E8B5C]" />
                  <span>All student submissions have been successfully graded!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Violation flags thumbnails & Quick links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Violation Flags Thumbnails */}
          <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <h3 className="font-display font-bold text-[15.5px] text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-2">
              <AlertTriangle className="w-4.5 h-4.5 text-[#C1493D]" />
              Unreviewed Violations
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              {violations.filter((v) => v.status === 'Unreviewed').map((v) => (
                <div key={v.id} className="relative group rounded-xl overflow-hidden border border-[#E3D5BC]/30 dark:border-white/5 aspect-[4/3] bg-black/40">
                  <div className="absolute inset-0 flex flex-col justify-between p-2.5 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-[9.5px] text-white">
                    <span className="px-1.5 py-0.5 rounded font-mono font-bold bg-[#FBE4E1] text-[#C1493D] self-start uppercase tracking-wider">
                      {v.type}
                    </span>
                    <div>
                      <p className="font-bold truncate">{v.studentName}</p>
                      <p className="text-[8px] opacity-75 truncate">{v.timestamp.split(' ')[1]} AM</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/faculty/violations"
              className="w-full py-2.5 rounded-xl border border-[#E3D5BC]/40 dark:border-white/5 hover:bg-[#E3D5BC]/30 dark:hover:bg-white/5 text-[12px] font-bold text-[#1E1B24] dark:text-[#EDEAF2] flex items-center justify-center gap-1 transition-all"
            >
              <span>Review Logs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Links Row */}
          <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
            <h3 className="font-display font-bold text-[15.5px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/faculty/question-generator"
                className="w-full p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 hover:border-[#4A63C9] flex items-center justify-between text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#9C7FDB]" />
                  <span>Question Generator</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5C5868]/60" />
              </Link>

              <Link
                href="/faculty/materials"
                className="w-full p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 hover:border-[#4A63C9] flex items-center justify-between text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4A63C9]" />
                  <span>Upload Materials</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5C5868]/60" />
              </Link>

              <Link
                href="/faculty/classes"
                className="w-full p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 hover:border-[#4A63C9] flex items-center justify-between text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>My Classes</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5C5868]/60" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
