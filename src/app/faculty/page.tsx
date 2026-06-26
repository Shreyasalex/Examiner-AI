'use client';

import React, { useState } from 'react';
import { useFaculty } from './context/FacultyContext';
import { Sparkles, ArrowUpRight, Award, ShieldAlert, FileText, Send, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function FacultyCommandCenter() {
  const { profile, chatHistory, sendChatMessage, submissions } = useFaculty();
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  const pendingScriptsCount = submissions.filter((s) => s.status === 'Pending Review').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#9C7FDB]/10 via-[#7B93E8]/10 to-transparent border border-white/40 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-[22px] md:text-[24px] text-[#1E1B24] dark:text-white flex items-center gap-2">
            Welcome back, {profile.name} <Sparkles className="w-5 h-5 text-[#9C7FDB] animate-pulse" />
          </h2>
          <p className="text-[13.5px] text-[#5C5868] dark:text-[#E4E2E4]/80 mt-1.5 max-w-xl">
            Your AI Grading Copilot has processed 3 midterm submissions. You have <strong className="text-[#C1493D] font-bold">{pendingScriptsCount} scripts pending review</strong> with proctoring flags.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/faculty/grading"
            className="px-4 py-2.5 rounded-xl bg-[#4A63C9] hover:bg-[#3d54b3] text-white text-[13px] font-semibold transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Review Scripts</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Courses */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
              Active Courses
            </span>
            <Users className="w-5 h-5 text-[#4A63C9]" />
          </div>
          <div className="mt-2.5">
            <h3 className="font-mono font-bold text-[30px] text-[#1E1B24] dark:text-white leading-none">2</h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1">CS-305, CS-305L</p>
          </div>
        </div>

        {/* Pending Scripts */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
              Scripts Pending
            </span>
            <FileText className="w-5 h-5 text-[#9C7FDB]" />
          </div>
          <div className="mt-2.5">
            <h3 className="font-mono font-bold text-[30px] text-[#C1493D] leading-none">{pendingScriptsCount}</h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1">Requires manual approval</p>
          </div>
        </div>

        {/* Anomaly Flag rate */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
              Avg Proctor Flags
            </span>
            <ShieldAlert className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-2.5">
            <h3 className="font-mono font-bold text-[30px] text-amber-500 leading-none">1.2</h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1">Per session average</p>
          </div>
        </div>

        {/* Generated Papers */}
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
              Total Exam Sets
            </span>
            <Award className="w-5 h-5 text-[#2E8B5C]" />
          </div>
          <div className="mt-2.5">
            <h3 className="font-mono font-bold text-[30px] text-[#2E8B5C] leading-none">6</h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1">4 active, 2 draft</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Alerts & Growth Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Proctoring anomaly alert logs */}
          <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white mb-4">
              Real-Time Proctoring Anomaly Alerts
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#C1493D]/5 border-l-4 border-[#C1493D] flex justify-between gap-3 text-[12.5px]">
                <div>
                  <h4 className="font-bold text-[#C1493D]">Multiple Faces Detected Anomaly</h4>
                  <p className="text-[#5C5868] dark:text-[#E4E2E4]/70 mt-1">
                    Student: **Devon Lee** · Neural Networks Midterm. Anomaly score: 94%.
                  </p>
                </div>
                <Link href="/faculty/grading" className="text-[#C1493D] hover:underline font-mono text-[11px] shrink-0 font-bold">REVIEW</Link>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border-l-4 border-amber-500 flex justify-between gap-3 text-[12.5px]">
                <div>
                  <h4 className="font-bold text-amber-500">Secondary Audio Detected Anomaly</h4>
                  <p className="text-[#5C5868] dark:text-[#E4E2E4]/70 mt-1">
                    Student: **Alex Sterling** · Neural Networks Midterm. Anomaly score: 72%.
                  </p>
                </div>
                <Link href="/faculty/grading" className="text-amber-500 hover:underline font-mono text-[11px] shrink-0 font-bold">REVIEW</Link>
              </div>
            </div>
          </div>

          {/* Class average performance trend */}
          <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#9C7FDB]" />
              Cohort GPA Progression Trend
            </h3>
            <div className="h-56 w-full relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cohort-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A63C9" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4A63C9" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* SVG line path mapping class GPAs 3.52 -> 3.65 -> 3.74 -> 3.71 */}
                <path d="M0 160 Q 150 110 300 80 T 600 95 T 900 60 V 220 H 0 Z" fill="url(#cohort-grad)" />
                <path d="M0 160 Q 150 110 300 80 T 600 95 T 900 60" fill="none" stroke="#4A63C9" strokeWidth="2.5" />
                <circle cx="0" cy="160" fill="#4A63C9" r="4" />
                <circle cx="300" cy="80" fill="#4A63C9" r="4" />
                <circle cx="600" cy="95" fill="#4A63C9" r="4" />
                <circle cx="900" cy="60" fill="#9C7FDB" r="5" className="animate-pulse" />
              </svg>
              <div className="absolute bottom-[-18px] left-0 right-0 flex justify-between text-[10px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 px-2">
                <span>SEM 1 (3.52)</span>
                <span>SEM 2 (3.65)</span>
                <span>SEM 3 (3.74)</span>
                <span>SEM 4 (3.71)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI grading copilot */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/40 dark:border-white/5 bg-white/35 dark:bg-white/5 overflow-hidden flex flex-col h-[480px]">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#9C7FDB]/10 via-[#4A63C9]/10 to-transparent border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#9C7FDB] animate-pulse" />
              <div>
                <h4 className="font-bold text-[13.5px] text-[#1E1B24] dark:text-white">
                  AI Grading & Proctoring Copilot
                </h4>
                <p className="text-[9px] uppercase font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 tracking-wider mt-0.5">
                  Evaluation Intelligence
                </p>
              </div>
            </div>

            {/* Chat History */}
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

            {/* Input Form */}
            <form onSubmit={handleSendChat} className="p-3 bg-white/20 dark:bg-black/10 border-t border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask grading anomalies, e.g. 'Devon Lee'..."
                className="flex-1 bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/40 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white placeholder:text-[#5C5868]/60 focus:outline-none focus:border-[#9C7FDB] transition-all"
              />
              <button
                type="submit"
                className="w-10 h-10 shrink-0 bg-[#4A63C9] hover:bg-[#3d54b3] text-white rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-all"
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
