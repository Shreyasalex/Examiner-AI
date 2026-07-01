'use client';

import React, { useState } from 'react';
import { useStudent } from './context/StudentContext';
import { ArrowUpRight, TrendingUp, Trophy, Award, Send, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const { profile, chatHistory, sendChatMessage } = useStudent();
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#9C7FDB]/10 via-[#7B93E8]/10 to-transparent border border-white/40 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-[22px] md:text-[24px] text-[#1E1B24] dark:text-white flex items-center gap-2">
            Welcome back, {profile.name.split(' ')[0]} <Sparkles className="w-5 h-5 text-[#9C7FDB] animate-pulse" />
          </h2>
          <p className="text-[13.5px] text-[#5C5868] dark:text-[#E4E2E4]/80 mt-1.5 max-w-xl">
            Your AI Study Copilot has analyzed 4 new study tracks and predicted an <strong className="text-[#4A63C9] dark:text-[#B5C7E8] font-bold">8.2% improvement</strong> in your upcoming Computational Logic exam.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/student/exams"
            className="px-4 py-2.5 rounded-xl bg-[#4A63C9] hover:bg-[#3d54b3] text-white text-[13px] font-semibold transition-all shadow-md shadow-[#4A63C9]/15 flex items-center gap-1.5"
          >
            <span>Active Exams</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CGPA Progress */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
            <TrendingUp className="w-12 h-12 text-[#9C7FDB]" />
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full -rotate-90">
              <circle
                className="text-[#E3D5BC]/30 dark:text-white/5"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
              />
              <circle
                className="text-[#9C7FDB]"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251"
                strokeDashoffset="12" // ~95%
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono font-bold text-[20px] text-[#1E1B24] dark:text-white leading-none">
                3.92
              </span>
              <span className="text-[9px] uppercase font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1">
                CGPA
              </span>
            </div>
          </div>
          <p className="text-[11.5px] font-mono text-[#9C7FDB] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +0.14 this term
          </p>
        </div>

        {/* SGPA Progress */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
              Latest SGPA
            </span>
            <Award className="w-5 h-5 text-[#4A63C9]" />
          </div>
          <div className="mt-2">
            <h3 className="font-mono font-bold text-[32px] text-[#1E1B24] dark:text-white leading-none">
              4.0
            </h3>
            <p className="text-[12px] text-[#5C5868]/80 dark:text-[#E4E2E4]/70 mt-1">
              Perfect Semester Score
            </p>
          </div>
          <div className="mt-3 h-1.5 w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#4A63C9] w-full shadow-[0_0_8px_rgba(74,99,201,0.4)]" />
          </div>
        </div>

        {/* Attendance */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
              Attendance
            </span>
            <span className="font-mono font-bold text-[14px] text-[#2E8B5C]">
              94%
            </span>
          </div>
          {/* Bar chart simulation */}
          <div className="flex items-end justify-between h-14 gap-1.5 mt-2">
            <div className="w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-t h-[60%] relative group">
              <div className="absolute bottom-0 w-full bg-[#9C7FDB]/60 rounded-t h-[80%]" />
            </div>
            <div className="w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-t h-[70%] relative group">
              <div className="absolute bottom-0 w-full bg-[#9C7FDB]/60 rounded-t h-[90%]" />
            </div>
            <div className="w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-t h-[85%] relative group">
              <div className="absolute bottom-0 w-full bg-[#9C7FDB]/70 rounded-t h-[95%]" />
            </div>
            <div className="w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-t h-[60%] relative group">
              <div className="absolute bottom-0 w-full bg-[#9C7FDB]/60 rounded-t h-[75%]" />
            </div>
            <div className="w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-t h-[90%] relative group">
              <div className="absolute bottom-0 w-full bg-[#4A63C9] rounded-t h-full shadow-[0_0_8px_rgba(74,99,201,0.3)]" />
            </div>
          </div>
          <p className="text-[9px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40 text-center mt-2 uppercase tracking-widest">
            Last 5 Weeks Trend
          </p>
        </div>

        {/* Global Rank */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
              Institutional Rank
            </span>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-2 text-center">
            <span className="font-mono font-bold text-[30px] text-[#1E1B24] dark:text-white leading-none">
              #12
            </span>
            <p className="text-[12px] text-[#5C5868]/80 dark:text-[#E4E2E4]/70 mt-1">
              Top 1% of cohort
            </p>
          </div>
          {/* Small avatars row */}
          <div className="flex -space-x-1.5 justify-center mt-2.5">
            <div className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 bg-[#7B93E8]" />
            <div className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 bg-[#C9B8EC]" />
            <div className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 bg-[#4A63C9]" />
            <div className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-[#1E1B24] dark:text-white">
              +140
            </div>
          </div>
        </div>
      </div>

      {/* Main Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Exams & History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upcoming Exams card */}
          <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#4A63C9]" />
                Upcoming Exams
              </h3>
              <Link
                href="/student/exams"
                className="text-[11.5px] font-semibold text-[#4A63C9] dark:text-[#B5C7E8] hover:underline"
              >
                VIEW FULL SCHEDULE
              </Link>
            </div>
            <div className="space-y-3.5">
              {/* Exam 1 */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/30 dark:border-white/5 transition-all hover:bg-white/75 dark:hover:bg-[#1E1B24]/60">
                <div className="flex items-center gap-4">
                  <div className="text-center bg-white/80 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-[#E3D5BC]/30 dark:border-white/5">
                    <p className="text-[10px] font-mono font-bold text-[#4A63C9] dark:text-[#B5C7E8]">OCT</p>
                    <p className="text-[18px] font-mono font-bold text-[#1E1B24] dark:text-white leading-none mt-0.5">24</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-white leading-snug">
                      Advanced Algorithms & Complexity
                    </h4>
                    <p className="text-[11px] text-[#5C5868] dark:text-[#E4E2E4]/60 mt-1 font-mono">
                      09:00 AM • Hall 402 • Secure Sandbox Mode
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:block text-right">
                    <p className="text-[9px] uppercase font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">Countdown</p>
                    <p className="text-[11.5px] font-mono font-semibold text-[#1E1B24] dark:text-white mt-0.5">02d : 14h : 22m</p>
                  </div>
                  <Link
                    href="/student/exams"
                    className="px-4 py-2 bg-[#4A63C9]/10 hover:bg-[#4A63C9] text-[#4A63C9] hover:text-white border border-[#4A63C9]/20 hover:border-transparent rounded-lg text-[12px] font-bold transition-all"
                  >
                    Terminal
                  </Link>
                </div>
              </div>

              {/* Exam 2 */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/20 dark:bg-[#1E1B24]/20 border border-[#E3D5BC]/10 dark:border-white/5 opacity-75">
                <div className="flex items-center gap-4">
                  <div className="text-center bg-white/50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-[#E3D5BC]/10 dark:border-white/5">
                    <p className="text-[10px] font-mono text-[#5C5868] dark:text-[#E4E2E4]/50">OCT</p>
                    <p className="text-[18px] font-mono font-bold text-[#5C5868] dark:text-[#E4E2E4]/50 leading-none mt-0.5">28</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[13.5px] text-[#5C5868] dark:text-[#E4E2E4]/50 leading-snug">
                      Neural Network Architectures
                    </h4>
                    <p className="text-[11px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-1 font-mono">
                      02:00 PM • Proctor Verification
                    </p>
                  </div>
                </div>
                <button
                  disabled
                  className="px-4 py-2 text-[#5C5868]/50 dark:text-[#E4E2E4]/40 border border-transparent rounded-lg text-[12px] font-bold cursor-not-allowed"
                >
                  LOCKED
                </button>
              </div>
            </div>
          </div>

          {/* Recent results & feedbacks */}
          <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white mb-5">
              Recent Results & AI Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 flex flex-col justify-between gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-white truncate">
                      Discrete Mathematics
                    </h4>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                      ASSIGNMENT #4
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[18px] text-[#4A63C9] dark:text-[#B5C7E8] shrink-0">
                    98/100
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#4A63C9]/5 dark:bg-[#4A63C9]/10 border-l-2 border-[#4A63C9] text-[11px] text-[#5C5868] dark:text-[#E4E2E4]/70 italic leading-relaxed">
                  &quot;AI Feedback: Excellent mastery of graph theory. Recommended: Look into hypergraph theory for extra credit.&quot;
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 flex flex-col justify-between gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-white truncate">
                      Data Structures
                    </h4>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                      MIDTERM EXAM
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[18px] text-[#9C7FDB] shrink-0">
                    84/100
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#9C7FDB]/5 dark:bg-[#9C7FDB]/10 border-l-2 border-[#9C7FDB] text-[11px] text-[#5C5868] dark:text-[#E4E2E4]/70 italic leading-relaxed">
                  &quot;AI Feedback: Strong on trees, but time complexity analysis in Question 4 was slightly inefficient.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Chat & Radar Charts */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Copilot Panel */}
          <div className="rounded-2xl border border-white/40 dark:border-white/5 bg-white/35 dark:bg-white/5 overflow-hidden flex flex-col h-[420px]">
            {/* Copilot Header */}
            <div className="p-4 bg-gradient-to-r from-[#9C7FDB]/10 via-[#4A63C9]/10 to-transparent border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#9C7FDB] animate-pulse" />
              <div>
                <h4 className="font-bold text-[13.5px] text-[#1E1B24] dark:text-white">
                  Examiner AI Copilot
                </h4>
                <p className="text-[9px] uppercase font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 tracking-wider mt-0.5">
                  Academic Intelligence
                </p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scroll-smooth no-scrollbar">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[12.5px] leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#4A63C9] text-white rounded-tr-none'
                        : 'bg-white/70 dark:bg-white/5 text-[#1E1B24] dark:text-white border border-[#E3D5BC]/20 dark:border-white/5 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[8.5px] block text-right mt-1 opacity-70 ${
                        msg.sender === 'user' ? 'text-white/80' : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 bg-white/20 dark:bg-black/10 border-t border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask AI study advice..."
                className="flex-1 bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/40 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white placeholder:text-[#5C5868]/60 focus:outline-none focus:border-[#9C7FDB] transition-all"
              />
              <button
                type="submit"
                className="w-10 h-10 shrink-0 bg-[#4A63C9] hover:bg-[#3d54b3] text-white rounded-xl flex items-center justify-center shadow-md shadow-[#4A63C9]/10 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
