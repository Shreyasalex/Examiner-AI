'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Terminal, Shield, AlertTriangle, Eye, Video, Send, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

function ExamTerminalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const examId = searchParams.get('id') || 'CSE-501';

  const { profile } = useStudent();

  // Local state for exam configuration
  const [examName, setExamName] = useState('Advanced Algorithms & Complexity');
  const [examCode, setExamCode] = useState('CSE-501');

  const [timeLeft, setTimeLeft] = useState(10800); // 3 hours in seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tabFocusWarnings, setTabFocusWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [proctorLogs, setProctorLogs] = useState<string[]>([
    'System initialization successful.',
    'AI Live Invigilator: Active.',
    'Gaze calibration completed.'
  ]);

  const [studentAnswer, setStudentAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitHash, setSubmitHash] = useState('');

  const handleSubmitExam = useCallback(() => {
    setSubmitting(true);
    setTimeout(() => {
      const hash = '0x' + Math.random().toString(36).substring(2, 12) + 'd78b2e';
      setSubmitHash(hash);
      setSubmitting(false);
      setSubmitted(true);

      // Save complete status in student context exam lists
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('student_registered_subjects');
        const reg = stored ? JSON.parse(stored) : [];
        // Make sure it registers if not already
        if (!reg.includes(examCode)) {
          reg.push(examCode);
          localStorage.setItem('student_registered_subjects', JSON.stringify(reg));
        }

        // Save exam receipt certificate
        const receipts = JSON.parse(localStorage.getItem('student_receipts') || '[]');
        const examReceipt = {
          id: `RCP-EXM-${Math.floor(100 + Math.random() * 900)}`,
          examName: `${examName} (Final Exam)`,
          dateCompleted: new Date().toISOString().split('T')[0],
          amount: 0,
          hash: hash,
          status: 'Graded/Completed/Cleared'
        };
        localStorage.setItem('student_receipts', JSON.stringify([examReceipt, ...receipts]));
      }
    }, 2000);
  }, [examCode, examName]);
  
  // Set up exam meta details based on ID
  useEffect(() => {
    if (examId === 'CSE-501' || examId === 'E1') {
      setExamName('Advanced Algorithms & Complexity');
      setExamCode('CSE-501');
    } else if (examId === 'CSE-503' || examId === 'E2') {
      setExamName('Neural Network Architectures');
      setExamCode('CSE-503');
    } else if (examId === 'CSE-302' || examId === 'E3') {
      setExamName('Discrete Mathematics');
      setExamCode('CSE-302');
      setTimeLeft(7200);
    } else if (examId === 'CSE-505' || examId === 'E4') {
      setExamName('Computational Logic');
      setExamCode('CSE-505');
    }
  }, [examId]);

  // Countdown timer
  useEffect(() => {
    if (submitted || isLockedOut) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, isLockedOut, handleSubmitExam]);

  // Window Focus/Blur detectors for proctor lockdown simulation
  useEffect(() => {
    const handleBlur = () => {
      if (submitted || isLockedOut) return;
      setTabFocusWarnings((prev) => {
        const next = prev + 1;
        setProctorLogs((logs) => [
          ...logs,
          `WARNING [${new Date().toLocaleTimeString()}]: Window focus lost / tab switched (Violation ${next}/3)`
        ]);
        if (next >= 3) {
          setIsLockedOut(true);
          return next;
        }
        setShowWarningModal(true);
        return next;
      });
    };

    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('blur', handleBlur);
    };
  }, [submitted, isLockedOut]);

  // Block keyboard shortcuts (F12, Inspect Element, Copy/Paste)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+C, Ctrl+V, Ctrl+U, F12, Command+Option+I
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 'i' || e.key === 'j')
      ) {
        e.preventDefault();
        setProctorLogs((logs) => [
          ...logs,
          `SYSTEM [${new Date().toLocaleTimeString()}]: Restricted hotkey blocked (${e.key.toUpperCase()})`
        ]);
      }
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Simulate gaze tracking events in logs
  useEffect(() => {
    if (submitted || isLockedOut) return;
    const interval = setInterval(() => {
      const anomalies = [
        'Gaze anomaly detected: Looking off-screen left',
        'Gaze anomaly detected: Looking off-screen right',
        'Illumination variation detected',
        'Audio anomaly detected: Background noise level high'
      ];
      const randomAnomaly = anomalies[Math.floor(Math.random() * anomalies.length)];
      setProctorLogs((logs) => [
        ...logs,
        `PROCTOR [${new Date().toLocaleTimeString()}]: ${randomAnomaly}`
      ]);
    }, 45000); // every 45s

    return () => clearInterval(interval);
  }, [submitted, isLockedOut]);

  // Request Fullscreen
  const handleEnterFullscreen = () => {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().then(() => setIsFullscreen(true));
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };



  return (
    <div className="flex flex-col h-screen select-none bg-[#0D0C0F] text-white">
      {/* 1. LOCKOUT OVERLAY SCREEN */}
      {isLockedOut && (
        <div className="fixed inset-0 z-50 bg-[#000]/95 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-500 animate-pulse mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-[24px] text-red-500">EXAM TERMINAL BLOCKED</h2>
          <p className="text-[13.5px] text-zinc-400 mt-3 max-w-md leading-relaxed font-mono">
            Security lock engaged. Multiple window blurs or window resizing violations were recorded by the AI proctor.
            This attempt has been suspended.
          </p>
          <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl text-left font-mono text-[11px] text-zinc-500 mt-6 max-w-sm">
            <p>Student Roll: {profile.rollNumber}</p>
            <p>Exam Code: {examCode}</p>
            <p>Violation Count: {tabFocusWarnings}/3</p>
          </div>
          <button
            onClick={() => router.push('/student/exams')}
            className="mt-8 px-6 py-2.5 bg-red-600 hover:bg-red-700 font-bold rounded-xl text-[13px] flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Dashboard
          </button>
        </div>
      )}

      {/* 2. TAB BLUR WARNING MODAL */}
      {showWarningModal && (
        <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#1E1B24] border border-red-500/30 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
            <h4 className="font-display font-bold text-[18px] text-red-500">SECURITY BREACH WARNING</h4>
            <p className="text-[13px] text-zinc-300 font-mono leading-relaxed">
              You left the exam screen area. This violation has been logged.
              If you lose focus again **({3 - tabFocusWarnings} attempt(s) remaining)**, your examination script will be locked out immediately.
            </p>
            <button
              onClick={() => {
                setShowWarningModal(false);
                handleEnterFullscreen();
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-[13px]"
            >
              Resume Test Sandbox
            </button>
          </div>
        </div>
      )}

      {/* 3. FULLSCREEN ENROLMENT ENCOURAGEMENT */}
      {!isFullscreen && !submitted && !isLockedOut && (
        <div className="fixed inset-0 z-35 bg-black/90 flex flex-col items-center justify-center p-6 text-center">
          <Shield className="w-12 h-12 text-[#9C7FDB] mb-4 animate-pulse" />
          <h3 className="font-display font-bold text-[18px]">Initialize Proctored Exam Sandbox</h3>
          <p className="text-[13px] text-zinc-400 mt-2 max-w-sm leading-relaxed">
            Please enter Fullscreen mode. The AI invigilator will active secure lock-down keys and gaze verification diagnostics.
          </p>
          <button
            onClick={handleEnterFullscreen}
            className="mt-6 px-6 py-3 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13px]"
          >
            Enter Secure Fullscreen Mode
          </button>
        </div>
      )}

      {/* 4. SUCCESS SCREEN */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-[#0D0C0F] flex flex-col items-center justify-center p-6 text-center">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mb-5 animate-bounce" />
          <h2 className="font-display font-bold text-[22px] text-emerald-500">EXAMINATION COMPLETED</h2>
          <p className="text-[13.5px] text-zinc-400 mt-2 max-w-md leading-relaxed font-mono">
            Your examination session has closed successfully. Your scripts are cryptographically hashed and uploaded to the AI Proctor locker database.
          </p>
          <div className="p-4 bg-zinc-900 border border-white/5 rounded-xl font-mono text-[11px] text-zinc-400 max-w-sm mt-6 select-all">
            <span className="text-zinc-600 block mb-1">TRANSACTION CERTIFICATE HASH:</span>
            {submitHash}
          </div>
          <button
            onClick={() => router.push('/student/exams')}
            className="mt-8 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl text-[13px]"
          >
            Exit Terminal
          </button>
        </div>
      )}

      {/* 5. LIVE SPLIT-SCREEN WORKSPACE */}
      {/* Top Header */}
      <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#9C7FDB]" />
          <div>
            <h1 className="font-display font-bold text-[14.5px]">{examName}</h1>
            <p className="text-[10px] font-mono text-zinc-500">{examCode} · VTU Final Examinations 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#2E8B5C]/15 border border-[#2E8B5C]/30 px-3 py-1 rounded-full text-emerald-500 text-[10px] font-mono font-bold animate-pulse flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> AI Invigilator: ACTIVE
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-center shrink-0">
            <span className="text-[9px] text-zinc-500 block">TIME REMAINING</span>
            <span className="text-[14.5px] font-bold text-red-500">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Question Paper (Read-Only) */}
        <div className="w-1/2 p-6 overflow-y-auto border-r border-white/10 space-y-6 select-none bg-zinc-950/60 no-scrollbar">
          <div className="pb-4 border-b border-white/5">
            <span className="text-[10px] font-mono text-[#9C7FDB] font-bold">SECTION A: ESSAY & LOGIC</span>
            <h2 className="text-[15px] font-bold mt-1">Answer all theoretical & coding challenges</h2>
          </div>

          {/* Question 1 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[13.5px] text-zinc-200">Question 1 (15 Marks)</h3>
            <p className="text-[12.5px] font-mono text-zinc-400 leading-relaxed">
              Describe the NP-completeness reduction workflow. Prove that the Vertex Cover problem is NP-complete by building a polynomial-time reduction map from the 3-SAT decision problem. Use truth value constraints to enforce logical vertex structures.
            </p>
          </div>

          {/* Question 2 */}
          <div className="space-y-2">
            <h3 className="font-semibold text-[13.5px] text-zinc-200">Question 2 (15 Marks)</h3>
            <p className="text-[12.5px] font-mono text-zinc-400 leading-relaxed">
              Implement a Dijkstra path-finding routine inside an adjacency-list graph representation. Specify how back-tracking queues are updated when multiple shortest paths exist. What is the Big-O time complexity of your lookup when utilizing a Binary Heap vs Fibonacci Heap priority queue?
            </p>
          </div>
        </div>

        {/* Right Side: Answer Editor */}
        <div className="w-1/2 flex flex-col overflow-hidden bg-[#131315]">
          <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center shrink-0">
            <span className="text-[10.5px] font-mono uppercase text-zinc-500">Markdown Script Workspace</span>
            <span className="text-[10.5px] font-mono text-zinc-600">{studentAnswer.length} chars</span>
          </div>

          {/* Text Area Input */}
          <div className="flex-1 p-5 overflow-y-auto">
            <textarea
              className="w-full h-full bg-transparent text-[13px] font-mono text-zinc-100 outline-none resize-none leading-relaxed focus:ring-0 placeholder:text-zinc-700"
              placeholder="/* Write your detailed solution script here. You can include descriptions, derivations, or code blocks... */"
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
            />
          </div>

          {/* Footer Submit Bar */}
          <div className="p-4 bg-black/40 border-t border-white/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              Secure connection verified
            </div>
            <button
              onClick={handleSubmitExam}
              disabled={submitting || studentAnswer.trim().length < 10}
              className="px-6 py-2.5 bg-[#2E8B5C] hover:bg-[#236b46] disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-white font-bold rounded-xl text-[13px] transition-all flex items-center gap-1.5"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Script</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Live Diagnositics & Proctor log panel */}
      <div className="h-40 border-t border-white/10 bg-black/40 p-4 flex gap-4 shrink-0 overflow-hidden">
        {/* Cam simulator Feed */}
        <div className="w-48 bg-zinc-900 border border-white/10 rounded-xl relative overflow-hidden flex flex-col items-center justify-center shrink-0">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full border border-dashed border-[#2E8B5C]/40 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-[#2E8B5C]/60" />
            </div>
          </div>
          <Video className="w-6 h-6 text-zinc-700" />
          <span className="absolute bottom-2 left-2 bg-[#2E8B5C] text-[8px] font-mono px-1 rounded">
            WEBCAM FEED
          </span>
        </div>

        {/* Live Proctor anomalies logs feed */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          <h4 className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase shrink-0">
            AI PROCTOR DIAGNOSTICS & SYSTEM LOGS FEED
          </h4>
          <div className="flex-1 overflow-y-auto font-mono text-[10.5px] text-zinc-400 space-y-1 mt-2 pr-2 no-scrollbar">
            {proctorLogs.slice().reverse().map((log, index) => {
              const isWarning = log.includes('WARNING');
              return (
                <p key={index} className={isWarning ? 'text-red-400' : 'text-zinc-500'}>
                  {log}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamTerminalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D0C0F] text-white flex items-center justify-center font-mono text-[13px]">
        Loading Secure Exam Terminal...
      </div>
    }>
      <ExamTerminalContent />
    </Suspense>
  );
}
