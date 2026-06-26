'use client';

import React, { useState } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { ShieldAlert, CheckCircle2, User, FileText, Check, Award, Eye, Volume2, Maximize2, Search } from 'lucide-react';

export default function GradingPage() {
  const { submissions, approveSubmission } = useFaculty();
  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [editScore, setEditScore] = useState<string>('');

  const selectedSubmission = submissions.find((s) => s.id === selectedSubId);

  // Sync edit score when selected submission changes
  React.useEffect(() => {
    if (selectedSubmission) {
      setEditScore(selectedSubmission.score === 'Pending Review' ? String(selectedSubmission.aiScore) : selectedSubmission.score.replace('/100', ''));
    }
  }, [selectedSubId, selectedSubmission]);

  const filteredSubmissions = submissions.filter((s) =>
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = () => {
    if (!selectedSubmission) return;
    const finalScoreStr = `${editScore}/100`;
    approveSubmission(selectedSubmission.id, finalScoreStr);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Submissions Roster */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#4A63C9]" />
              Student Submissions
            </h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60">
              Select a submission to inspect AI grading logs and proctor anomalies.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5C5868]/60 dark:text-[#E4E2E4]/50" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl pl-9 pr-4 py-2 text-[12.5px] text-[#1E1B24] dark:text-white focus:outline-none focus:border-[#9C7FDB] transition-all"
            />
          </div>

          {/* List */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto no-scrollbar">
            {filteredSubmissions.length === 0 ? (
              <p className="text-center text-[12px] text-[#5C5868]/60 py-6">No submissions found matching search.</p>
            ) : (
              filteredSubmissions.map((sub) => {
                const isActive = sub.id === selectedSubId;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubId(sub.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center gap-3 ${
                      isActive
                        ? 'bg-[#4A63C9] text-white border-transparent shadow-[0_4px_16px_rgba(74,99,201,0.2)]'
                        : 'bg-white/30 dark:bg-white/5 border-white/40 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 text-[#1E1B24] dark:text-white'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold truncate">{sub.studentName}</p>
                      <p className={`text-[10px] font-mono mt-0.5 truncate ${isActive ? 'text-white/80' : 'text-[#5C5868]/70 dark:text-[#E4E2E4]/50'}`}>
                        {sub.rollNumber}
                      </p>
                      <p className={`text-[10.5px] mt-1.5 truncate ${isActive ? 'text-white/90' : 'text-[#5C5868] dark:text-[#E4E2E4]/80'}`}>
                        AI Evaluated: <span className="font-bold font-mono">{sub.aiScore}%</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                        sub.status === 'Approved'
                          ? 'bg-[#DFF3E8] text-[#2E8B5C]'
                          : 'bg-[#FBE4E1] text-[#C1493D] dark:bg-red-950/40 dark:text-red-300'
                      }`}>
                        {sub.status}
                      </span>
                      {sub.proctorFlags > 0 ? (
                        <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold font-mono bg-amber-500/10 px-1.5 py-0.5 rounded">
                          <ShieldAlert className="w-3.5 h-3.5" /> {sub.proctorFlags} Flags
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-[#2E8B5C] font-semibold bg-[#DFF3E8]/30 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Clean Log
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Proctor Logs & AI Score Review */}
        <div className="lg:col-span-7 space-y-6">
          {selectedSubmission ? (
            <>
              {/* Profile Overview */}
              <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#9C7FDB]/10 border border-[#9C7FDB]/20 flex items-center justify-center text-[#9C7FDB]">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white leading-tight">
                        {selectedSubmission.studentName}
                      </h4>
                      <p className="text-[11px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-0.5">
                        {selectedSubmission.rollNumber} · {selectedSubmission.course.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-[#5C5868] dark:text-[#E4E2E4]/80 mt-3 leading-normal">
                    Assigned Exam: <strong>{selectedSubmission.examName}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#E3D5BC]/20 dark:bg-white/5 border border-white/30 dark:border-white/5 flex items-center gap-3 shrink-0">
                  <Award className="w-7 h-7 text-[#4A63C9]" />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">AI Score Recommendation</span>
                    <h3 className="text-[20px] font-mono font-bold text-[#1E1B24] dark:text-white leading-none mt-1">
                      {selectedSubmission.aiScore}%
                    </h3>
                  </div>
                </div>
              </div>

              {/* Proctor Anomaly Snapshot Sandbox */}
              <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
                <h4 className="font-display font-bold text-[14px] text-[#1E1B24] dark:text-white flex items-center gap-2">
                  <ShieldAlert className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                  AI Proctoring Intelligence Sandbox
                </h4>

                {/* Webcam Snapshot Simulations */}
                {selectedSubmission.proctorFlags > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="relative group rounded-xl overflow-hidden aspect-video border border-amber-500/20 bg-gradient-to-br from-[#7B93E8]/10 to-[#9C7FDB]/10 flex flex-col justify-center items-center p-2 text-center">
                      <Eye className="w-6 h-6 text-amber-500 mb-1.5" />
                      <span className="text-[9.5px] font-mono font-bold text-amber-500">Gaze Anomaly detected</span>
                      <span className="text-[8px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-0.5">T: 14:15:32</span>
                    </div>

                    {selectedSubmission.proctorFlags >= 4 && (
                      <>
                        <div className="relative group rounded-xl overflow-hidden aspect-video border border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent flex flex-col justify-center items-center p-2 text-center">
                          <Maximize2 className="w-6 h-6 text-[#C1493D] mb-1.5" />
                          <span className="text-[9.5px] font-mono font-bold text-[#C1493D]">Tab Out Violation</span>
                          <span className="text-[8px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-0.5">T: 14:12:02</span>
                        </div>
                        <div className="relative group rounded-xl overflow-hidden aspect-video border border-red-500/20 bg-gradient-to-br from-red-500/10 to-[#9C7FDB]/10 flex flex-col justify-center items-center p-2 text-center">
                          <User className="w-6 h-6 text-[#C1493D] mb-1.5" />
                          <span className="text-[9.5px] font-mono font-bold text-[#C1493D]">Multiple Faces Detected</span>
                          <span className="text-[8px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-0.5">T: 14:24:50</span>
                        </div>
                      </>
                    )}

                    {selectedSubmission.proctorFlags < 4 && selectedSubmission.proctorFlags >= 2 && (
                      <div className="relative group rounded-xl overflow-hidden aspect-video border border-amber-500/20 bg-gradient-to-br from-[#FF9A9E]/10 to-transparent flex flex-col justify-center items-center p-2 text-center">
                        <Volume2 className="w-6 h-6 text-amber-500 mb-1.5" />
                        <span className="text-[9.5px] font-mono font-bold text-amber-500">Audio Anomaly detected</span>
                        <span className="text-[8px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-0.5">T: 14:32:04</span>
                      </div>
                    )}

                    <div className="relative group rounded-xl overflow-hidden aspect-video border border-zinc-200 dark:border-white/5 bg-black/10 dark:bg-black/40 flex flex-col justify-center items-center text-center">
                      <span className="text-[10px] text-[#5C5868]/50 font-mono">Webcam feed</span>
                      <span className="text-[8.5px] text-[#5C5868]/50 font-mono">Standby</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#DFF3E8]/30 dark:bg-[#DFF3E8]/5 border border-[#2E8B5C]/10 text-center py-6">
                    <CheckCircle2 className="w-8 h-8 text-[#2E8B5C] mx-auto mb-2" />
                    <p className="text-[12.5px] text-[#2E8B5C] font-semibold">Zero Proctoring Anomaly Flags Detected</p>
                    <p className="text-[11px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60 mt-1">Student maintained focal locking in secure sandbox environment throughout the duration.</p>
                  </div>
                )}

                {/* Event Logs list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Proctoring Timeline Logs</span>
                  <div className="space-y-2 border border-[#E3D5BC]/30 dark:border-white/5 rounded-xl p-3.5 bg-white/20 dark:bg-[#1E1B24]/10 max-h-[180px] overflow-y-auto no-scrollbar font-mono text-[11.5px]">
                    {selectedSubmission.logs.map((log, idx) => (
                      <div key={idx} className="flex gap-2.5 py-1 items-start">
                        <span className="text-[#5C5868]/70 dark:text-[#E4E2E4]/40 shrink-0">{log.time}</span>
                        <span className="text-[#5C5868]/50 dark:text-[#E4E2E4]/30 shrink-0">·</span>
                        <span className={`flex-1 ${
                          log.status === 'alert' ? 'text-[#C1493D] font-bold' :
                          log.status === 'warning' ? 'text-amber-600 dark:text-amber-400 font-semibold' :
                          'text-[#2E8B5C]'
                        }`}>
                          {log.event}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Marks editor & approval */}
              <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
                <h4 className="font-display font-bold text-[14px] text-[#1E1B24] dark:text-white">
                  Instructor Evaluation Marks Adjuster
                </h4>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="space-y-1.5 flex-1 min-w-[150px]">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Final Score (Out of 100)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editScore}
                        onChange={(e) => setEditScore(e.target.value)}
                        className="bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[15px] font-bold font-mono text-[#1E1B24] dark:text-white focus:outline-none focus:border-[#9C7FDB] w-28"
                      />
                      <span className="text-[14px] font-mono text-[#5C5868]/60">/ 100</span>
                    </div>
                  </div>

                  <div className="flex items-end h-full">
                    {selectedSubmission.status === 'Approved' ? (
                      <div className="py-2.5 px-4 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[13px] font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Score Approved ({selectedSubmission.score})
                      </div>
                    ) : (
                      <button
                        onClick={handleApprove}
                        className="py-3 px-5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white text-[13.5px] font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5" /> Approve & Submit Marks
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 font-mono text-[13px] py-20">
              No submissions selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
