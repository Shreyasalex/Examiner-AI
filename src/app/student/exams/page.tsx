'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Monitor, Video, Mic, CheckCircle2, ChevronRight, Play, RefreshCw, Sparkles, Terminal, AlertCircle, BrainCircuit } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

type Tab = 'active' | 'mock' | 'system';

interface Exam {
  id: string;
  name: string;
  code: string;
  date: string;
  time: string;
  duration: string;
  status: 'Pending' | 'Enrolled' | 'Upcoming' | 'Graded/Completed/Cleared' | 'Failed/Active Backlog';
  details: string;
}

export default function ExamsPage() {
  const { profile } = useStudent();
  const [activeTab, setActiveTab] = useState<Tab>('active');

  // Exam list state
  const [exams, setExams] = useState<Exam[]>([
    { id: 'E1', name: 'Advanced Algorithms & Complexity', code: 'CSE-501', date: '2026-06-29', time: '09:00 AM', duration: '3 Hrs', status: 'Enrolled', details: 'Focuses on NP-completeness, graph analytics, and dynamic programming approximation.' },
    { id: 'E2', name: 'Neural Network Architectures', code: 'CSE-503', date: '2026-07-02', time: '02:00 PM', duration: '3 Hrs', status: 'Upcoming', details: 'Covers CNNs, Transformers, optimization techniques, and backprop derivations.' },
    { id: 'E3', name: 'Discrete Mathematics', code: 'CSE-302', date: '2026-06-12', time: '11:00 AM', duration: '2 Hrs', status: 'Graded/Completed/Cleared', details: 'Set theory, combinatorics, proof by induction, and graph algorithms.' },
    { id: 'E4', name: 'Computational Logic', code: 'CSE-505', date: '2026-07-05', time: '09:00 AM', duration: '3 Hrs', status: 'Pending', details: 'First-order logic, SAT solvers, logic programming paradigms, and resolution.' }
  ]);

  // Exam Terminal simulator states
  const [inTerminalMode, setInTerminalMode] = useState(false);
  const [terminalStep, setTerminalStep] = useState<'info' | 'checking' | 'exam' | 'success'>('info');
  const [activeExamForTerminal, setActiveExamForTerminal] = useState<Exam | null>(null);
  const [sandboxMCQAnswers, setSandboxMCQAnswers] = useState<Record<number, string>>({});
  const [proctoredTimeRemaining, setProctoredTimeRemaining] = useState(599); // 10 minutes

  // Mock test states
  const [mockSubject, setMockSubject] = useState('Data Structures');
  const [mockDifficulty, setMockDifficulty] = useState('Intermediate');
  const [isGeneratingMock, setIsGeneratingMock] = useState(false);
  interface MockQuestion {
    id: number;
    q: string;
    options: string[];
    correct: string;
  }
  const [generatedMockQuestions, setGeneratedMockQuestions] = useState<MockQuestion[] | null>(null);
  const [mockAnswers, setMockAnswers] = useState<Record<number, string>>({});
  const [mockScore, setMockScore] = useState<number | null>(null);

  // Hardware check states
  const [systemCheckStatus, setSystemCheckStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [camCheck, setCamCheck] = useState<'pending' | 'checking' | 'ok'>('pending');
  const [micCheck, setMicCheck] = useState<'pending' | 'checking' | 'ok'>('pending');
  const [browserCheck, setBrowserCheck] = useState<'pending' | 'checking' | 'ok'>('pending');
  const [networkCheck, setNetworkCheck] = useState<'pending' | 'checking' | 'ok'>('pending');

  // Timer countdown inside Terminal Mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inTerminalMode && terminalStep === 'exam' && proctoredTimeRemaining > 0) {
      interval = setInterval(() => {
        setProctoredTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inTerminalMode, terminalStep, proctoredTimeRemaining]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Launch simulated exam
  const handleLaunchTerminal = (exam: Exam) => {
    setActiveExamForTerminal(exam);
    setInTerminalMode(true);
    setTerminalStep('info');
  };

  const startTerminalDiagnostics = () => {
    setTerminalStep('checking');
    setTimeout(() => {
      setTerminalStep('exam');
      setProctoredTimeRemaining(600); // reset
      setSandboxMCQAnswers({});
    }, 2000);
  };

  const submitSandboxExam = () => {
    setTerminalStep('success');
    // Update exam status in local state to graded/completed
    if (activeExamForTerminal) {
      setExams((prev) =>
        prev.map((e) => (e.id === activeExamForTerminal.id ? { ...e, status: 'Graded/Completed/Cleared' } : e))
      );
    }
  };

  // Generate Mock Test
  const handleGenerateMock = () => {
    setIsGeneratingMock(true);
    setGeneratedMockQuestions(null);
    setMockAnswers({});
    setMockScore(null);

    setTimeout(() => {
      setIsGeneratingMock(false);
      setGeneratedMockQuestions([
        {
          id: 1,
          q: 'Which of the following data structures holds elements in a hierarchical representation?',
          options: ['Queue', 'Stack', 'Tree', 'Array'],
          correct: 'Tree'
        },
        {
          id: 2,
          q: 'What is the worst-case time complexity of searching in a Balanced Binary Search Tree?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correct: 'O(log n)'
        },
        {
          id: 3,
          q: 'Which traversal algorithm is used to print nodes of a Binary Search Tree in sorted order?',
          options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
          correct: 'In-order'
        }
      ]);
    }, 2000);
  };

  const handleSelectMockAnswer = (qId: number, option: string) => {
    setMockAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleCalculateMockScore = () => {
    if (!generatedMockQuestions) return;
    let score = 0;
    generatedMockQuestions.forEach((q) => {
      if (mockAnswers[q.id] === q.correct) score += 1;
    });
    setMockScore(score);
  };

  // Run diagnostics
  const handleRunDiagnostics = () => {
    setSystemCheckStatus('running');
    setCamCheck('checking');
    setMicCheck('pending');
    setBrowserCheck('pending');
    setNetworkCheck('pending');

    setTimeout(() => {
      setCamCheck('ok');
      setMicCheck('checking');
    }, 1000);

    setTimeout(() => {
      setMicCheck('ok');
      setBrowserCheck('checking');
    }, 2000);

    setTimeout(() => {
      setBrowserCheck('ok');
      setNetworkCheck('checking');
    }, 3000);

    setTimeout(() => {
      setNetworkCheck('ok');
      setSystemCheckStatus('success');
    }, 4000);
  };

  // Status pill styling helper
  const getStatusStyle = (status: Exam['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FDEFD6] text-[#A8731A] dark:bg-[#A8731A]/20 dark:text-[#FDEFD6]';
      case 'Enrolled':
      case 'Upcoming':
        return 'bg-[#E1E9FB] text-[#3B5BC4] dark:bg-[#3B5BC4]/20 dark:text-[#E1E9FB]';
      case 'Graded/Completed/Cleared':
        return 'bg-[#DFF3E8] text-[#2E8B5C] dark:bg-[#2E8B5C]/20 dark:text-[#DFF3E8]';
      default:
        return 'bg-[#FBE4E1] text-[#C1493D] dark:bg-[#C1493D]/20 dark:text-[#FBE4E1]';
    }
  };

  return (
    <div className="relative">
      {/* 1. SECURE EXAM TERMINAL OVERLAY */}
      {inTerminalMode && activeExamForTerminal && (
        <div className="fixed inset-0 z-50 bg-[#131315]/95 backdrop-blur-md flex flex-col text-white">
          {/* Header */}
          <div className="px-6 py-4 bg-black/40 border-b border-white/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-[#9C7FDB]" />
              <div>
                <h3 className="font-display font-bold text-[15px]">{activeExamForTerminal.name}</h3>
                <p className="text-[10px] font-mono text-[#E4E2E4]/60">Secure Exam Mode • Sandbox Active</p>
              </div>
            </div>
            {terminalStep === 'exam' && (
              <div className="flex items-center gap-4">
                <div className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-center font-mono">
                  <span className="text-[10px] text-white/50 block">TIME REMAINING</span>
                  <span className="text-[15px] font-bold text-[#C1493D]">{formatTimer(proctoredTimeRemaining)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Warning Banner */}
          <div className="bg-[#C1493D]/10 border-b border-[#C1493D]/30 py-2.5 px-6 flex items-center justify-between text-[12.5px] shrink-0">
            <span className="flex items-center gap-2 font-mono text-[#FBE4E1]">
              <AlertCircle className="w-4 h-4 text-[#C1493D] animate-pulse" />
              AI PROCTORING ENGAGED. DO NOT ATTEMPT TO RESIZE OR SWITCH WINDOWS.
            </span>
            <span className="text-[11px] font-mono text-white/60">ID: {profile.rollNumber}</span>
          </div>

          {/* Main workspace */}
          <div className="flex-1 flex overflow-hidden">
            {/* Steps & Question Layout */}
            {terminalStep === 'info' && (
              <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
                <div className="max-w-md w-full bg-[#1E1B24] border border-white/10 p-6 rounded-2xl text-center space-y-4">
                  <ShieldAlert className="w-12 h-12 text-[#9C7FDB] mx-auto animate-bounce" />
                  <h4 className="font-display font-bold text-[18px]">Verification & Integrity Rules</h4>
                  <ul className="text-left text-[12.5px] text-white/70 space-y-2 bg-black/20 p-4 rounded-xl border border-white/5 font-mono">
                    <li>1. Continuous webcam tracking is active.</li>
                    <li>2. Tab switches will trigger automatic locks.</li>
                    <li>3. Multiple faces will flag audit violations.</li>
                    <li>4. Ensure your workspace remains quiet.</li>
                  </ul>
                  <button
                    onClick={startTerminalDiagnostics}
                    className="w-full py-3 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-semibold rounded-xl text-[14px] transition-all"
                  >
                    Run Proctor Verification
                  </button>
                  <button onClick={() => setInTerminalMode(false)} className="text-[12px] text-white/50 hover:underline">
                    Cancel & Return
                  </button>
                </div>
              </div>
            )}

            {terminalStep === 'checking' && (
              <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
                <div className="max-w-xs w-full text-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-[#9C7FDB] mx-auto animate-spin" />
                  <p className="text-[14px] font-mono">Analyzing workspace integrity...</p>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#9C7FDB] w-1/2 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {terminalStep === 'exam' && (
              <div className="flex-1 flex overflow-hidden">
                {/* Questions Panel */}
                <div className="flex-1 p-8 overflow-y-auto space-y-6">
                  <div>
                    <h3 className="text-[16px] font-bold">Section A: Multiple Choice Questions</h3>
                    <p className="text-[12px] text-white/50 mt-1 font-mono">Total marks: 30</p>
                  </div>

                  {/* MCQ 1 */}
                  <div className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-3">
                    <p className="text-[13.5px] font-mono leading-relaxed">
                      1. In a secure sandbox examination center, what is the consequence of resizing the window?
                    </p>
                    <div className="space-y-2">
                      {['Automatic Lockout & Proctor Flag', 'Temporary warning prompt', 'Page refresh', 'Nothing happens'].map((opt) => (
                        <label key={opt} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer">
                          <input
                            type="radio"
                            name="sandbox-q1"
                            checked={sandboxMCQAnswers[1] === opt}
                            onChange={() => setSandboxMCQAnswers((prev) => ({ ...prev, 1: opt }))}
                            className="text-[#9C7FDB] focus:ring-0 border-white/30 bg-transparent"
                          />
                          <span className="text-[13px]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* MCQ 2 */}
                  <div className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-3">
                    <p className="text-[13.5px] font-mono leading-relaxed">
                      2. Which parsing model provides linear O(n) parsing for context-free grammars?
                    </p>
                    <div className="space-y-2">
                      {['LL(k)', 'LR(k)', 'CYK Algorithm', 'Earley Parser'].map((opt) => (
                        <label key={opt} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer">
                          <input
                            type="radio"
                            name="sandbox-q2"
                            checked={sandboxMCQAnswers[2] === opt}
                            onChange={() => setSandboxMCQAnswers((prev) => ({ ...prev, 2: opt }))}
                            className="text-[#9C7FDB] focus:ring-0 border-white/30 bg-transparent"
                          />
                          <span className="text-[13px]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-8">
                    <button
                      onClick={submitSandboxExam}
                      className="px-6 py-3 bg-[#2E8B5C] hover:bg-[#256e49] text-white font-bold rounded-xl text-[13.5px] transition-all shadow-lg"
                    >
                      Finish & Submit Scripts
                    </button>
                  </div>
                </div>

                {/* Right panel: proctor webcam simulator */}
                <div className="w-72 bg-black/40 border-l border-white/10 p-6 flex flex-col justify-between shrink-0">
                  <div className="space-y-4">
                    <h5 className="font-mono text-[11px] uppercase tracking-wider text-white/50">PROCTOR WEBCAM FEED</h5>
                    <div className="aspect-video bg-zinc-800 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/10 shadow-inner">
                      {/* Face scanner simulator rings */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full border border-dashed border-[#2E8B5C] animate-spin" />
                      </div>
                      <Video className="w-8 h-8 text-white/20" />
                      <span className="absolute bottom-2 left-2 bg-[#2E8B5C] text-[8.5px] px-1.5 py-0.5 rounded font-mono">
                        PROCTOR LIVE
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11.5px] font-mono leading-relaxed space-y-1">
                      <p className="text-[#2E8B5C] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Face Aligned
                      </p>
                      <p className="text-white/60">Illumination: Normal</p>
                      <p className="text-white/60">Integrity Score: 98%</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-white/40 leading-relaxed font-mono">
                    Warning: Changing windows or toggling full screen will immediately terminate your session.
                  </div>
                </div>
              </div>
            )}

            {terminalStep === 'success' && (
              <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
                <div className="max-w-md w-full bg-[#1E1B24] border border-white/10 p-6 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#2E8B5C] mx-auto animate-pulse" />
                  <h4 className="font-display font-bold text-[18px]">Scripts Submitted Successfully</h4>
                  <p className="text-[13px] text-white/70">
                    Your answers for <strong className="text-[#9C7FDB]">{activeExamForTerminal.name}</strong> have been cryptographically signed and stored in the blockchain registry.
                  </p>
                  <div className="p-3 bg-black/30 rounded-xl font-mono text-[11px] text-[#E4E2E4]/80 select-all border border-white/5">
                    Hash: 0x{Math.random().toString(36).substring(2, 10)}ae839bcfe82f3a
                  </div>
                  <button
                    onClick={() => {
                      setInTerminalMode(false);
                      setActiveExamForTerminal(null);
                    }}
                    className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl text-[13px] hover:bg-white/95 transition-all"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. REGULAR DASHBOARD TABBED INTERFACE */}
      <div className="space-y-6">
        {/* Tab switcher */}
        <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-md">
          {[
            { id: 'active', name: 'Scheduled Exams' },
            { id: 'mock', name: 'Mock Test Simulator' },
            { id: 'system', name: 'System Diagnostics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E1B24] text-[#1E1B24] dark:text-white shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab content 1: Scheduled Exams */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-transform duration-250 hover:translate-y-[-2px] hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${getStatusStyle(exam.status)}`}>
                      {exam.status}
                    </span>
                    <span className="text-[11px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">{exam.code}</span>
                  </div>
                  <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white leading-tight">
                    {exam.name}
                  </h3>
                  <p className="text-[13px] text-[#5C5868] dark:text-[#E4E2E4]/70 max-w-xl leading-relaxed">
                    {exam.details}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-[#5C5868]/80 dark:text-[#E4E2E4]/60">
                    <span>Date: {exam.date}</span>
                    <span>Time: {exam.time} ({exam.duration})</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  {exam.status === 'Enrolled' ? (
                    <button
                      onClick={() => handleLaunchTerminal(exam)}
                      className="px-5 py-3 rounded-xl bg-[#4A63C9] hover:bg-[#3d54b3] text-white text-[13px] font-bold shadow-md shadow-[#4A63C9]/15 flex items-center gap-1.5"
                    >
                      <Play className="w-4 h-4" /> Launch Terminal
                    </button>
                  ) : exam.status === 'Graded/Completed/Cleared' ? (
                    <span className="text-[#2E8B5C] font-mono text-[12.5px] font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4.5 h-4.5" /> Exam Completed
                    </span>
                  ) : (
                    <button
                      disabled
                      className="px-5 py-3 rounded-xl bg-[#E3D5BC]/20 text-[#5C5868]/40 dark:text-[#E4E2E4]/30 text-[13px] font-bold cursor-not-allowed border border-transparent"
                    >
                      Terminal Locked
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab content 2: Mock Test Simulator */}
        {activeTab === 'mock' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Options generator */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
              <h3 className="font-display font-bold text-[15px] text-[#1E1B24] dark:text-white">
                Generate Custom Mock Exam
              </h3>
              <p className="text-[12.5px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed">
                Examiner AI will synthesize a unique set of multiple-choice questions aligned with your courses to test your cognitive recall.
              </p>
              
              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/85 dark:text-[#E4E2E4]/60">Select Subject</label>
                <select
                  value={mockSubject}
                  onChange={(e) => setMockSubject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/50 dark:bg-[#1E1B24] border border-[#E3D5BC]/50 dark:border-white/5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                >
                  <option value="Data Structures">Data Structures & Analysis</option>
                  <option value="Discrete Mathematics">Discrete Mathematics</option>
                  <option value="Advanced Algorithms">Advanced Algorithms</option>
                  <option value="Computational Logic">Computational Logic</option>
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/85 dark:text-[#E4E2E4]/60">Difficulty Level</label>
                <div className="flex gap-2">
                  {['Beginner', 'Intermediate', 'Hard'].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setMockDifficulty(diff)}
                      className={`flex-1 py-2 rounded-lg text-[12px] font-semibold border transition-all ${
                        mockDifficulty === diff
                          ? 'bg-[#9C7FDB] border-transparent text-white'
                          : 'bg-white/40 dark:bg-white/5 border-[#E3D5BC]/30 dark:border-white/10 text-[#5C5868] dark:text-[#E4E2E4]/70'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateMock}
                disabled={isGeneratingMock}
                className="w-full mt-2 py-3.5 bg-gradient-to-tr from-[#9C7FDB] to-[#7B93E8] hover:from-[#8b6ccd] hover:to-[#6780de] text-white font-bold rounded-xl text-[13.5px] transition-all flex items-center justify-center gap-1.5"
              >
                {isGeneratingMock ? (
                  <>
                    <RefreshCw className="w-4.5 h-4.5 animate-spin" /> Synthesizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5" /> Synthesize Mock Test
                  </>
                )}
              </button>
            </div>

            {/* Simulated Quiz Workspace */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5 min-h-[300px] flex flex-col justify-center">
              {isGeneratingMock ? (
                <div className="text-center space-y-3 py-12">
                  <BrainCircuit className="w-10 h-10 text-[#9C7FDB] mx-auto animate-pulse" />
                  <p className="text-[13px] font-mono text-[#5C5868] dark:text-[#E4E2E4]/70">AI Paper Generator assembling questions...</p>
                </div>
              ) : generatedMockQuestions ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5">
                    <h4 className="font-bold text-[14px] text-[#1E1B24] dark:text-white">Generated Mock: {mockSubject}</h4>
                    <span className="text-[11px] font-mono text-[#9C7FDB] font-semibold uppercase">{mockDifficulty} Mode</span>
                  </div>

                  {generatedMockQuestions.map((q) => (
                    <div key={q.id} className="space-y-3.5">
                      <p className="text-[13.5px] font-mono text-[#1E1B24] dark:text-white">{q.id}. {q.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt: string) => (
                          <button
                            key={opt}
                            onClick={() => handleSelectMockAnswer(q.id, opt)}
                            className={`p-3 rounded-xl text-left text-[12.5px] transition-all border ${
                              mockAnswers[q.id] === opt
                                ? 'bg-[#9C7FDB]/10 border-[#9C7FDB] text-[#9C7FDB] font-semibold'
                                : 'bg-white/40 dark:bg-white/5 border-[#E3D5BC]/30 dark:border-white/10 text-[#1E1B24] dark:text-white/80 hover:bg-white/70 dark:hover:bg-white/10'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-[#E3D5BC]/30 dark:border-white/5 flex items-center justify-between">
                    {mockScore !== null ? (
                      <div className="text-[14px] font-mono font-bold text-[#2E8B5C]">
                        Result: {mockScore} / {generatedMockQuestions.length} Correct Answers
                      </div>
                    ) : (
                      <div className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/60">
                        Answer all questions to submit.
                      </div>
                    )}
                    <button
                      onClick={handleCalculateMockScore}
                      className="px-6 py-2.5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13px]"
                    >
                      Submit Mock Test
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#5C5868]/60 dark:text-[#E4E2E4]/40 font-mono text-[13px]">
                  No mock test generated yet. Choose parameters and click synthesize.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab content 3: System Diagnostics */}
        {activeTab === 'system' && (
          <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <ShieldAlert className="w-10 h-10 text-[#9C7FDB] mx-auto" />
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white">
                Proctor Sandbox Diagnostics
              </h3>
              <p className="text-[12.5px] text-[#5C5868] dark:text-[#E4E2E4]/70 max-w-md mx-auto">
                Before initiating an exam terminal, ensure your camera, microphone, browser, and network checks meet academic integrity standards.
              </p>
            </div>

            {/* Check list */}
            <div className="space-y-4 bg-white/30 dark:bg-black/15 p-5 rounded-2xl border border-[#E3D5BC]/30 dark:border-white/5 font-mono text-[12.5px]">
              {/* Camera */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#5C5868] dark:text-white/70" /> Web Camera
                </span>
                <span
                  className={`font-semibold ${
                    camCheck === 'ok' ? 'text-[#2E8B5C]' : camCheck === 'checking' ? 'text-[#9C7FDB] animate-pulse' : 'text-gray-400'
                  }`}
                >
                  {camCheck === 'ok' ? 'OK (DETECTED)' : camCheck === 'checking' ? 'CHECKING...' : 'PENDING'}
                </span>
              </div>

              {/* Mic */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#5C5868] dark:text-white/70" /> Input Microphone
                </span>
                <span
                  className={`font-semibold ${
                    micCheck === 'ok' ? 'text-[#2E8B5C]' : micCheck === 'checking' ? 'text-[#9C7FDB] animate-pulse' : 'text-gray-400'
                  }`}
                >
                  {micCheck === 'ok' ? 'OK (DETECTED)' : micCheck === 'checking' ? 'CHECKING...' : 'PENDING'}
                </span>
              </div>

              {/* Browser */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#5C5868] dark:text-white/70" /> Browser Integrity
                </span>
                <span
                  className={`font-semibold ${
                    browserCheck === 'ok' ? 'text-[#2E8B5C]' : browserCheck === 'checking' ? 'text-[#9C7FDB] animate-pulse' : 'text-gray-400'
                  }`}
                >
                  {browserCheck === 'ok' ? 'OK (SECURED)' : browserCheck === 'checking' ? 'CHECKING...' : 'PENDING'}
                </span>
              </div>

              {/* Latency */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#5C5868] dark:text-white/70" /> Network Latency
                </span>
                <span
                  className={`font-semibold ${
                    networkCheck === 'ok' ? 'text-[#2E8B5C]' : networkCheck === 'checking' ? 'text-[#9C7FDB] animate-pulse' : 'text-gray-400'
                  }`}
                >
                  {networkCheck === 'ok' ? 'OK (14ms)' : networkCheck === 'checking' ? 'CHECKING...' : 'PENDING'}
                </span>
              </div>
            </div>

            <button
              onClick={handleRunDiagnostics}
              disabled={systemCheckStatus === 'running'}
              className="w-full py-3.5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13.5px] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#4A63C9]/10"
            >
              {systemCheckStatus === 'running' ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                'Run Diagnostics Checks'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
