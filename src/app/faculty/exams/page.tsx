'use client';

import React, { useState } from 'react';
import { useFaculty } from '../context/FacultyContext';
import {
  Clock,
  ShieldAlert,
  Play,
  Pause,
  AlertTriangle,
  Trash2,
  X,
  PlusCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ExamsPage() {
  const { exams, deployExam, updateExamLiveControls } = useFaculty();

  const [activeTab, setActiveTab] = useState<'Scheduled' | 'Live Now' | 'Completed'>('Scheduled');
  const [selectedExamId, setSelectedExamId] = useState<string>('EXM-001');

  // Deployment configuration states
  const [selectedType, setSelectedType] = useState<'Theory' | 'Coding' | 'Circuit' | 'Chemistry' | 'Mixed'>('Theory');
  const [schedDate, setSchedDate] = useState('2026-07-05 10:00 AM');
  const [schedDuration, setSchedDuration] = useState(120);

  // Test Case Modal states
  const [showTestCasesModal, setShowTestCasesModal] = useState(false);
  const [testCases, setTestCases] = useState<{ input: string; output: string }[]>([
    { input: '5\n10 20 30 40 50', output: '150' }
  ]);
  const [newIn, setNewIn] = useState('');
  const [newOut, setNewOut] = useState('');

  // Live student detail pane state
  const [selectedLiveStudent, setSelectedLiveStudent] = useState<string | null>(null);

  const selectedExam = exams.find((e) => e.id === selectedExamId);
  const liveExam = exams.find((e) => e.status === 'Live Now');

  const handleAddTestCase = () => {
    if (!newIn.trim() || !newOut.trim()) return;
    setTestCases(prev => [...prev, { input: newIn, output: newOut }]);
    setNewIn('');
    setNewOut('');
  };

  const handleDeleteTestCase = (idx: number) => {
    setTestCases(prev => prev.filter((_, i) => i !== idx));
  };

  const handleDeploy = () => {
    if (!selectedExam) return;
    deployExam(selectedExam.id, {
      examType: selectedType,
      scheduleDate: schedDate,
      duration: schedDuration,
      testCases
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab controls */}
      <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 border border-[#E3D5BC]/20 max-w-md">
        {(['Scheduled', 'Live Now', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#4A63C9] text-white shadow-md shadow-[#4A63C9]/10'
                : 'text-[#5C5868]/80 dark:text-[#9591A3]/60 hover:text-[#1E1B24] dark:hover:text-[#EDEAF2]'
            }`}
          >
            {tab}
            {tab === 'Live Now' && liveExam && (
              <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'Scheduled' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {/* Left Column: Locked papers ready to go live */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Locked Papers</span>
            {exams.filter(e => e.status === 'Scheduled').map((ex) => {
              const isActive = ex.id === selectedExamId;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExamId(ex.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-white dark:bg-white/5 border-[#4A63C9] shadow-lg'
                      : 'bg-white/30 dark:bg-white/5 border-white/40 dark:border-white/5'
                  }`}
                >
                  <h4 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-[#EDEAF2] leading-tight">{ex.title}</h4>
                  <p className="text-[10px] text-[#5C5868]/70 dark:text-[#9591A3]/50 font-mono mt-1">{ex.course.split(': ')[0]}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#5C5868]/80 dark:text-[#9591A3]/80">
                    <span>{ex.questionsCount} Questions</span>
                    <span>{ex.marks} Marks</span>
                  </div>
                </button>
              );
            })}
            {exams.filter(e => e.status === 'Scheduled').length === 0 && (
              <p className="text-center py-8 text-[12px] text-[#5C5868]/60 bg-white/30 rounded-2xl">
                No exams scheduled. Generate and lock a paper first.
              </p>
            )}
          </div>

          {/* Right Column: Deployment Config Form */}
          {selectedExam && selectedExam.status === 'Scheduled' ? (
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
                Configure Deployment Parameters
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Exam Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as 'Theory' | 'Coding' | 'Circuit' | 'Chemistry' | 'Mixed')}
                      className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-2.5 py-2 text-[12px] text-[#1E1B24] dark:text-[#EDEAF2]"
                    >
                      <option value="Theory">Theory</option>
                      <option value="Coding">Coding</option>
                      <option value="Circuit">Circuit</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Duration (Mins)</label>
                    <input
                      type="number"
                      value={schedDuration}
                      onChange={(e) => setSchedDuration(Number(e.target.value))}
                      className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-3 py-2 text-[12px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Schedule Date & Time</label>
                  <input
                    type="text"
                    value={schedDate}
                    onChange={(e) => setSchedDate(e.target.value)}
                    className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                  />
                </div>

                {selectedType === 'Coding' && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowTestCasesModal(true)}
                      className="px-4 py-2 rounded-xl bg-[#E3D9F7] text-[#4A63C9] text-[11.5px] font-bold transition-all hover:bg-[#cfc0f2]"
                    >
                      Manage Test Cases
                    </button>
                  </div>
                )}

                <button
                  onClick={handleDeploy}
                  className="w-full py-3 bg-[#4A63C9] text-white text-[13.5px] font-bold rounded-xl hover:bg-[#3b51b3] shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="w-4.5 h-4.5" />
                  <span>Lock & Deploy Exam</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {activeTab === 'Live Now' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {liveExam ? (
            <>
              {/* Left Column: Live student grid */}
              <div className="lg:col-span-8 p-6 bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/20">
                  <div>
                    <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Feed: {liveExam.title}
                    </h3>
                  </div>

                  {/* connected student counter */}
                  <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    {liveExam.students.length} Connected Students
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {liveExam.students.map((st) => {
                    let dotColor = 'bg-emerald-500';
                    if (st.status === 'amber') dotColor = 'bg-amber-500';
                    if (st.status === 'red') dotColor = 'bg-red-500 animate-pulse';

                    return (
                      <button
                        key={st.id}
                        onClick={() => setSelectedLiveStudent(st.id)}
                        className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                          selectedLiveStudent === st.id
                            ? 'bg-white dark:bg-white/10 border-[#4A63C9]'
                            : 'bg-white/30 dark:bg-white/5 border-[#E3D5BC]/40 dark:border-white/5 hover:bg-white/50'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full border border-white shrink-0 relative flex items-center justify-center text-white font-bold font-mono shadow-sm text-[12px]"
                          style={{ background: st.avatar }}
                        >
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${dotColor}`} />
                          {st.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11.5px] font-semibold truncate max-w-[80px]">{st.name}</p>
                          {st.violationsCount > 0 && (
                            <span className="text-[9.5px] font-mono font-bold text-amber-600 dark:text-amber-400">
                              {st.violationsCount} Flags
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Faculty Live Controls */}
                <div className="pt-4 border-t border-[#E3D5BC]/20 dark:border-white/5 flex flex-wrap gap-2.5 justify-end">
                  <button onClick={() => updateExamLiveControls(liveExam.id, 'pause')} className="px-4 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-[#E3D5BC]/40 text-[#5C5868] text-[12px] font-semibold hover:bg-white transition-all flex items-center gap-1">
                    <Pause className="w-3.5 h-3.5" /> Pause Exam
                  </button>
                  <button onClick={() => updateExamLiveControls(liveExam.id, 'extend')} className="px-4 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-[#E3D5BC]/40 text-[#4A63C9] text-[12px] font-semibold hover:bg-[#E3D9F7] transition-all flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Extend Time (+10m)
                  </button>
                  <button onClick={() => updateExamLiveControls(liveExam.id, 'end')} className="px-4 py-2 rounded-xl bg-[#C1493D] text-white text-[12px] font-semibold hover:bg-[#a83e34] transition-all flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> End Exam Early
                  </button>
                </div>
              </div>

              {/* Right Column: Violation ticker & side details panel */}
              <div className="lg:col-span-4 space-y-6">
                {/* Selected Student Detail panel */}
                {selectedLiveStudent && (
                  <div className="p-5 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/20">
                      <h4 className="font-semibold text-[13.5px]">Session Inspection</h4>
                      <button onClick={() => setSelectedLiveStudent(null)} className="text-[#5C5868]/60 hover:text-[#1E1B24]">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {(() => {
                      const student = liveExam.students.find(s => s.id === selectedLiveStudent);
                      if (!student) return null;
                      return (
                        <div className="space-y-3.5 text-[12px]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold font-mono" style={{ background: student.avatar }}>
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold">{student.name}</p>
                              <p className="text-[10px] text-[#5C5868]/70">Secure Sandbox lock established</p>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block">Anomaly Records</span>
                            <div className="space-y-1 bg-white/20 dark:bg-black/10 border border-[#E3D5BC]/20 rounded-xl p-2.5 max-h-[140px] overflow-y-auto no-scrollbar font-mono text-[10.5px]">
                              {student.violationHistory.map((h, idx) => (
                                <p key={idx} className="text-[#C1493D] flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3 shrink-0" />
                                  {h}
                                </p>
                              ))}
                              {student.violationHistory.length === 0 && (
                                <p className="text-emerald-600 text-center py-4">Nominal: Zero anomalies flagged.</p>
                              )}
                            </div>
                          </div>

                          <button className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-[#A8731A] text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5">
                            <ShieldAlert className="w-4 h-4" /> Flag for Review
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Violation ticker list */}
                <div className="p-5 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-[14.5px] text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#C1493D]" />
                    Live Violation Feed Ticker
                  </h4>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto no-scrollbar font-mono text-[11px]">
                    {liveExam.violationsFeed.map((f, i) => (
                      <div key={i} className="p-2 bg-[#FBE4E1] dark:bg-[#C1493D]/10 text-[#C1493D] border border-transparent rounded-lg flex justify-between gap-1">
                        <div className="truncate">
                          <strong>{f.studentName}</strong>: {f.type}
                        </div>
                        <span className="shrink-0 opacity-70 text-[9.5px] mt-0.5">{f.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center py-8 text-[12px] text-[#5C5868]/60 bg-white/30 rounded-2xl">
              No exam currently in progress.
            </p>
          )}
        </div>
      )}

      {activeTab === 'Completed' && (
        <div className="p-6 bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl shadow-sm space-y-4 animate-fade-in">
          <div>
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Archived & Completed Exams
            </h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 mt-0.5">
              Review script results from completed tests.
            </p>
          </div>

          <div className="divide-y divide-[#E3D5BC]/20 dark:divide-white/5">
            {exams.filter((ex) => ex.status === 'Completed').map((ex) => (
              <div key={ex.id} className="py-4 flex items-center justify-between gap-3 text-[12.5px]">
                <div>
                  <h4 className="font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">{ex.title}</h4>
                  <p className="text-[10px] text-[#5C5868]/75 dark:text-[#9591A3]/50 font-mono mt-0.5">
                    {ex.course} · 45 submissions evaluated
                  </p>
                </div>
                <Link
                  href="/faculty/evaluation"
                  className="px-4 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-[#E3D5BC]/40 dark:border-white/5 hover:bg-[#4A63C9] hover:text-white text-[12px] font-semibold transition-all flex items-center gap-1.5"
                >
                  <span>View Submissions</span>
                </Link>
              </div>
            ))}
            {exams.filter((ex) => ex.status === 'Completed').length === 0 && (
              <p className="text-center py-8 text-[12px] text-[#5C5868]/60">No completed exams recorded in archives.</p>
            )}
          </div>
        </div>
      )}

      {/* Test Case Customizer Modal */}
      {showTestCasesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF6EE] dark:bg-[#16141C] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/20">
              <h3 className="font-display font-bold text-[17px] text-[#1E1B24] dark:text-[#EDEAF2]">
                Manage Test Cases
              </h3>
              <button type="button" onClick={() => setShowTestCasesModal(false)} className="text-[#5C5868]/60 hover:text-[#1E1B24]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar font-mono text-[11px]">
              {testCases.map((tc, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-[#E3D5BC]/30 dark:border-white/5 bg-white/20 flex justify-between gap-3 items-center">
                  <div className="truncate">
                    <p className="text-emerald-600 font-bold">In: {tc.input}</p>
                    <p className="text-[#4A63C9] font-bold">Out: {tc.output}</p>
                  </div>
                  <button onClick={() => handleDeleteTestCase(idx)} className="p-1 rounded text-[#C1493D] hover:bg-[#FBE4E1] shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add form */}
            <div className="space-y-3 pt-2 border-t border-[#E3D5BC]/20">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Expected input..."
                  value={newIn}
                  onChange={(e) => setNewIn(e.target.value)}
                  className="bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Expected output..."
                  value={newOut}
                  onChange={(e) => setNewOut(e.target.value)}
                  className="bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddTestCase}
                className="w-full py-2 bg-[#E3D9F7] text-[#4A63C9] text-[11.5px] font-bold rounded-lg transition-all hover:bg-[#cfc0f2] flex items-center justify-center gap-1"
              >
                <PlusCircle className="w-4 h-4" /> Add Test Case
              </button>
            </div>

            <button
              onClick={() => setShowTestCasesModal(false)}
              className="w-full py-2.5 bg-[#4A63C9] text-white text-[12px] font-bold rounded-xl transition-all"
            >
              Save & Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
