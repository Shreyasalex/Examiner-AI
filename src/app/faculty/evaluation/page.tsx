'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { BarChart3, ChevronLeft, User, Check, CheckCircle2, PenSquare } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface KatexRenderer {
  render: (tex: string, element: HTMLElement, options?: { displayMode?: boolean; throwOnError?: boolean }) => void;
}

function MathView({ tex }: { tex: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [katexLoaded, setKatexLoaded] = useState(false);

  useEffect(() => {
    const win = window as unknown as { katex?: KatexRenderer };
    if (win.katex) {
      setKatexLoaded(true);
      return;
    }

    const cssId = 'katex-cdn-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
      document.head.appendChild(link);
    }

    const scriptId = 'katex-cdn-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
      script.onload = () => setKatexLoaded(true);
      document.body.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (win.katex) {
          setKatexLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const win = window as unknown as { katex?: KatexRenderer };
    if (katexLoaded && containerRef.current && win.katex) {
      try {
        win.katex.render(tex, containerRef.current, {
          displayMode: true,
          throwOnError: false
        });
      } catch (err) {
        console.error(err);
        containerRef.current.textContent = tex;
      }
    }
  }, [tex, katexLoaded]);

  return (
    <div ref={containerRef} className="py-2 overflow-x-auto text-[#1E1B24] dark:text-[#EDEAF2] font-serif italic text-center text-[13.5px]">
      {tex}
    </div>
  );
}

function EvaluationPageContent() {
  const { evaluationExams, approveQuestionMarks, approveAllQuestions, publishExamResults } = useFaculty();
  const searchParams = useSearchParams();
  const queryExamId = searchParams.get('examId');

  const [selectedExamId, setSelectedExamId] = useState<string | null>(queryExamId);
  const [selectedStudentRoll, setSelectedStudentRoll] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Marks adjustments state
  const [editingQId, setEditingQId] = useState<string | null>(null);
  const [overrideMarks, setOverrideMarks] = useState<number>(0);
  const [overrideFeedback, setOverrideFeedback] = useState('');

  const selectedExam = evaluationExams.find((e) => e.id === selectedExamId);
  const selectedScript = selectedExam?.scripts.find((s) => s.rollNumber === selectedStudentRoll);

  const handlePublishResults = () => {
    if (!selectedExamId) return;
    publishExamResults(selectedExamId);
    setShowPublishModal(false);
  };

  const handleSaveMarksOverride = (qId: string) => {
    if (!selectedExamId || !selectedStudentRoll) return;
    approveQuestionMarks(selectedExamId, selectedStudentRoll, qId, Number(overrideMarks), overrideFeedback);
    setEditingQId(null);
  };

  const handleApproveAll = () => {
    if (!selectedExamId || !selectedStudentRoll) return;
    approveAllQuestions(selectedExamId, selectedStudentRoll);
  };

  return (
    <div className="space-y-6">
      {/* Detail view breadcrumb backtrack */}
      {selectedExamId && (
        <button
          onClick={() => {
            if (selectedStudentRoll) {
              setSelectedStudentRoll(null);
            } else {
              setSelectedExamId(null);
            }
          }}
          className="flex items-center gap-1 text-[11.5px] font-mono text-[#5C5868]/70 dark:text-[#9591A3]/60 hover:underline select-none"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Back to {selectedStudentRoll ? 'Student List' : 'Exams List'}</span>
        </button>
      )}

      {/* Main Container */}
      <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        {!selectedExamId ? (
          /* List of exams */
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#4A63C9]" />
                Completed Exam Papers evaluation
              </h3>
              <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60">
                AI evaluates answers to suggest marks. Review, override parameters, and publish results to the students ledger.
              </p>
            </div>

            <div className="divide-y divide-[#E3D5BC]/20 dark:divide-white/5">
              {evaluationExams.map((ex) => {
                let statusColor = 'bg-[#FDEFD6] text-[#A8731A]';
                if (ex.status === 'Ready for Review') statusColor = 'bg-[#E1E9FB] text-[#3B5BC4]';
                if (ex.status === 'Published') statusColor = 'bg-[#DFF3E8] text-[#2E8B5C]';

                return (
                  <div key={ex.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px]">
                    <div>
                      <h4 className="font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">{ex.title}</h4>
                      <p className="text-[10px] text-[#5C5868]/70 dark:text-[#9591A3]/50 font-mono mt-0.5">
                        {ex.course}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-0.5 rounded font-mono text-[9px] font-bold ${statusColor}`}>
                        {ex.status}
                      </span>
                      <button
                        onClick={() => setSelectedExamId(ex.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-[#E3D5BC]/45 text-[11.5px] font-bold text-[#4A63C9] hover:bg-[#E3D9F7] transition-all"
                      >
                        {ex.status === 'Published' ? 'View Results' : 'Review scripts'}
                      </button>
                    </div>
                  </div>
                );
              })}
              {evaluationExams.length === 0 && (
                <p className="text-center py-8 text-[12px] text-[#5C5868]/60">Results will appear here once an exam has been completed.</p>
              )}
            </div>
          </div>
        ) : !selectedStudentRoll && selectedExam ? (
          /* Student scripts list for selected exam */
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3D5BC]/25 dark:border-white/5 pb-3">
              <div>
                <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
                  Grading Queue: {selectedExam.title}
                </h3>
                <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 mt-0.5">
                  AI scoring has pre-marked all scripts. Review and lock to finalize.
                </p>
              </div>

              {/* Publish Results Button */}
              {selectedExam.status !== 'Published' && (
                <button
                  onClick={() => setShowPublishModal(true)}
                  disabled={!selectedExam.scripts.every(s => s.reviewed)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-[12px] font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Results</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {selectedExam.scripts.map((script) => (
                <div
                  key={script.rollNumber}
                  className="p-4 rounded-xl border border-white/40 dark:border-white/5 bg-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px]"
                >
                  <div className="flex gap-2.5 items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E3D9F7] flex items-center justify-center text-[#4A63C9]">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">{script.studentName}</h4>
                      <p className="text-[9.5px] text-[#5C5868]/70 dark:text-[#9591A3]/50 font-mono mt-0.5">{script.rollNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0">
                    <div className="text-right font-mono text-[12px] text-[#5C5868]/80 dark:text-[#9591A3]/80">
                      <span>Score: </span>
                      <strong className="text-[#1E1B24] dark:text-[#EDEAF2]">{script.gpa}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-[9.5px] font-bold ${
                        script.reviewed ? 'bg-[#DFF3E8] text-[#2E8B5C]' : 'bg-[#FDEFD6] text-[#A8731A]'
                      }`}>
                        {script.reviewed ? 'Reviewed ✓' : 'Awaiting Review'}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedStudentRoll(script.rollNumber);
                          setEditingQId(null);
                        }}
                        className="px-3.5 py-1.5 bg-[#4A63C9] hover:bg-[#3b51b3] text-white rounded-lg text-[11px] font-bold transition-all"
                      >
                        {script.reviewed ? 'Inspect' : 'Review'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedScript && selectedExam ? (
          /* Question by Question Review page */
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3D5BC]/20 dark:border-white/5 pb-3">
              <div>
                <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
                  Script Review: {selectedScript.studentName}
                </h3>
                <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 mt-0.5">
                  Roll: {selectedScript.rollNumber} · Cumulative Evaluated Score: <strong className="font-mono text-[#4A63C9] dark:text-[#B5C7E8]">{selectedScript.gpa}</strong>
                </p>
              </div>

              {/* Approve All */}
              {!selectedScript.reviewed && (
                <button
                  onClick={handleApproveAll}
                  className="px-4 py-2 rounded-xl bg-white/70 hover:bg-[#E3D9F7] text-[#4A63C9] border border-[#E3D5BC]/50 text-[11.5px] font-bold transition-all shrink-0"
                >
                  Approve All suggested Marks
                </button>
              )}
            </div>

            {/* Questions review flow */}
            <div className="space-y-4">
              {selectedScript.questions.map((q, idx) => {
                const isUnderEdit = editingQId === q.id;
                const finalMarks = q.finalMarks !== undefined ? q.finalMarks : q.aiSuggestedMarks;
                const finalFeedback = q.finalFeedback !== undefined ? q.finalFeedback : q.aiFeedback;

                return (
                  <div key={q.id} className="p-5 rounded-2xl border border-white/60 dark:border-white/5 bg-white/20 space-y-4">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="font-mono text-[10.5px] font-bold text-[#5C5868]/70">QUESTION {idx + 1}</span>
                        <h4 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-[#EDEAF2] mt-1">{q.text}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-[#E7E9EF] text-[#5C6478]">
                        Type: {q.type}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[#E3D5BC]/30 dark:border-white/5 bg-white/35 dark:bg-black/10">
                      <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#5C5868]/60 block mb-1">Student Answer</span>
                      {q.type === 'Code' ? (
                        <pre className="font-mono text-[11px] bg-black/5 dark:bg-black/20 p-2.5 rounded-lg overflow-x-auto text-[#1E1B24] dark:text-[#EDEAF2]">
                          <code>{q.studentAnswer}</code>
                        </pre>
                      ) : q.type === 'Math' ? (
                        <MathView tex={q.studentAnswer} />
                      ) : (
                        <p className="text-[12.5px] leading-relaxed text-[#1E1B24] dark:text-[#EDEAF2] font-serif">
                          {q.studentAnswer}
                        </p>
                      )}
                    </div>

                    {/* AI Suggested details */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                      <div className="md:col-span-8 space-y-1">
                        <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#5C5868]/60">AI Feedback Comment</span>
                        {isUnderEdit ? (
                          <textarea
                            value={overrideFeedback}
                            onChange={(e) => setOverrideFeedback(e.target.value)}
                            rows={3}
                            className="w-full bg-white dark:bg-[#1D1A24] border border-[#E3D5BC] rounded-xl p-2 text-[12.5px]"
                          />
                        ) : (
                          <p className="text-[12px] text-[#5C5868] dark:text-[#9591A3] bg-white/10 p-2 rounded-lg border border-[#E3D5BC]/15">
                            {finalFeedback}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-4 flex flex-col justify-between items-end gap-3 text-right">
                        <div>
                          <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#5C5868]/60 block">Marks Secured</span>
                          {isUnderEdit ? (
                            <div className="flex items-center gap-1.5 justify-end mt-1">
                              <input
                                type="number"
                                value={overrideMarks}
                                onChange={(e) => setOverrideMarks(Number(e.target.value))}
                                className="bg-white border border-[#E3D5BC] rounded px-2 py-1 w-16 text-center font-mono font-bold"
                              />
                              <span className="text-[12.5px] font-mono">/ 25</span>
                            </div>
                          ) : (
                            <h3 className="text-[20px] font-mono font-bold mt-0.5">
                              {finalMarks} <span className="text-[12px] text-[#5C5868]/60">/ 25</span>
                            </h3>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex gap-2">
                          {isUnderEdit ? (
                            <>
                              <button onClick={() => setEditingQId(null)} className="px-2.5 py-1 rounded bg-[#E3D5BC]/30 hover:bg-[#E3D5BC]/50 text-[11.5px] font-bold">
                                Cancel
                              </button>
                              <button onClick={() => handleSaveMarksOverride(q.id)} className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold">
                                Save
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingQId(q.id);
                                  setOverrideMarks(finalMarks);
                                  setOverrideFeedback(finalFeedback);
                                }}
                                className="px-3 py-1 rounded bg-white hover:bg-[#E3D9F7] text-[#4A63C9] border border-[#E3D5BC]/40 text-[11px] font-semibold flex items-center gap-0.5"
                              >
                                <PenSquare className="w-3.5 h-3.5" /> Edit
                              </button>
                              {!q.approved && (
                                <button
                                  onClick={() => approveQuestionMarks(selectedExam.id, selectedScript.rollNumber, q.id, finalMarks, finalFeedback)}
                                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-0.5"
                                >
                                  <Check className="w-3.5 h-3.5" /> Approve
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF6EE] dark:bg-[#16141C] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-display font-bold text-[18px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Publish Exam Results?
            </h3>
            <p className="text-[13px] text-[#5C5868] dark:text-[#9591A3] mt-2 leading-relaxed">
              This action will release final marks to the student dashboard immediately and trigger notifications. This is a final action.
            </p>
            <div className="flex gap-3 justify-end mt-5">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 rounded-xl bg-[#E3D5BC]/30 dark:bg-white/5 hover:bg-[#E3D5BC]/50 text-[#1E1B24] dark:text-[#EDEAF2] text-[12.5px] font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishResults}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] font-semibold transition-all"
              >
                Confirm & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EvaluationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center font-mono text-[12.5px] text-[#5C5868]/70">
        Loading evaluation queue...
      </div>
    }>
      <EvaluationPageContent />
    </Suspense>
  );
}
