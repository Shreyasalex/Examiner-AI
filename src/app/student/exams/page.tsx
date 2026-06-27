'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Monitor, Video, Mic, CheckCircle2, Play, RefreshCw, Sparkles, BrainCircuit, Award, QrCode, Download, Lock } from 'lucide-react';
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
  const router = useRouter();
  const { profile } = useStudent();
  const [activeTab, setActiveTab] = useState<Tab>('active');

  // Registered subjects state (loaded from payments tab)
  const [registeredSubjects, setRegisteredSubjects] = useState<string[]>([]);
  
  // Modals state
  const [showHallTicket, setShowHallTicket] = useState(false);
  const [showJITDiagnostics, setShowJITDiagnostics] = useState(false);
  const [selectedExamForJIT, setSelectedExamForJIT] = useState<Exam | null>(null);

  // Diagnostics checklist steps
  const [jitStep, setJitStep] = useState<number>(0);
  const [jitChecking, setJitChecking] = useState<boolean>(false);
  const [jitStates, setJitStates] = useState({
    cam: 'pending',
    mic: 'pending',
    browser: 'pending',
    face: 'pending'
  });

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

  // Load registration statuses
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('student_registered_subjects');
      if (stored) {
        setRegisteredSubjects(JSON.parse(stored));
      } else {
        const legacy = localStorage.getItem('student_exam_registered') === 'true';
        if (legacy) {
          const allCodes = ['CSE-501', 'CSE-503', 'CSE-302', 'CSE-505'];
          setRegisteredSubjects(allCodes);
        }
      }
    }
  }, []);

  const exams: Exam[] = [
    { id: 'E1', name: 'Advanced Algorithms & Complexity', code: 'CSE-501', date: '2026-06-29', time: '09:00 AM', duration: '3 Hrs', status: 'Pending', details: 'Focuses on NP-completeness, graph analytics, and dynamic programming approximation.' },
    { id: 'E2', name: 'Neural Network Architectures', code: 'CSE-503', date: '2026-07-02', time: '02:00 PM', duration: '3 Hrs', status: 'Pending', details: 'Covers CNNs, Transformers, optimization techniques, and backprop derivations.' },
    { id: 'E3', name: 'Discrete Mathematics', code: 'CSE-302', date: '2026-06-12', time: '11:00 AM', duration: '2 Hrs', status: 'Graded/Completed/Cleared', details: 'Set theory, combinatorics, proof by induction, and graph algorithms.' },
    { id: 'E4', name: 'Computational Logic', code: 'CSE-505', date: '2026-07-05', time: '09:00 AM', duration: '3 Hrs', status: 'Pending', details: 'First-order logic, SAT solvers, logic programming paradigms, and resolution.' }
  ];

  // Adjust exam status dynamically based on registration context
  const getDynamicExams = (): Exam[] => {
    return exams.map((exam) => {
      // Keep completed exams graded
      if (exam.status === 'Graded/Completed/Cleared') {
        return exam;
      }
      
      const isRegistered = registeredSubjects.includes(exam.code);
      return {
        ...exam,
        status: isRegistered ? ('Enrolled' as const) : ('Pending' as const)
      };
    });
  };

  // Launch Just-in-Time Security Diagnostics modal
  const handleLaunchTerminal = (exam: Exam) => {
    setSelectedExamForJIT(exam);
    setShowJITDiagnostics(true);
    setJitStep(0);
    setJitChecking(false);
    setJitStates({
      cam: 'pending',
      mic: 'pending',
      browser: 'pending',
      face: 'pending'
    });
  };

  // Run the JIT checks in sequence
  const startJitSequence = () => {
    setJitChecking(true);
    
    // Check 1: Web Camera
    setJitStates(prev => ({ ...prev, cam: 'checking' }));
    setTimeout(() => {
      setJitStates(prev => ({ ...prev, cam: 'ok' }));
      setJitStep(1);
      
      // Check 2: Microphone
      setJitStates(prev => ({ ...prev, mic: 'checking' }));
      setTimeout(() => {
        setJitStates(prev => ({ ...prev, mic: 'ok' }));
        setJitStep(2);
        
        // Check 3: Browser Integrity
        setJitStates(prev => ({ ...prev, browser: 'checking' }));
        setTimeout(() => {
          setJitStates(prev => ({ ...prev, browser: 'ok' }));
          setJitStep(3);
          
          // Check 4: Face alignment
          setJitStates(prev => ({ ...prev, face: 'checking' }));
          setTimeout(() => {
            setJitStates(prev => ({ ...prev, face: 'ok' }));
            setJitStep(4);
            setJitChecking(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleProceedToTerminal = () => {
    if (!selectedExamForJIT) return;
    setShowJITDiagnostics(false);
    // Push routing to isolated full screen page
    router.push(`/student/exams/terminal?id=${selectedExamForJIT.id}`);
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

  const getStatusStyle = (status: Exam['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20';
      case 'Enrolled':
      case 'Upcoming':
        return 'bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20';
      case 'Graded/Completed/Cleared':
        return 'bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20';
      default:
        return 'bg-red-500/10 text-red-500 font-bold border border-red-500/20';
    }
  };

  const registeredExamsList = getDynamicExams().filter(e => e.status === 'Enrolled' || e.status === 'Graded/Completed/Cleared');

  return (
    <div className="relative space-y-6">
      {/* 1. HALL TICKET MODAL OVERLAY */}
      {showHallTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FAF6EE] dark:bg-[#131315] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 shadow-2xl text-[#1E1B24] dark:text-white space-y-5">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#9C7FDB]" />
                <h3 className="font-display font-bold text-[16px]">Official Exam Hall Ticket</h3>
              </div>
              <button
                onClick={() => setShowHallTicket(false)}
                className="text-[12px] font-mono text-zinc-500 hover:text-zinc-700"
              >
                Close
              </button>
            </div>

            {/* Ticket Card layout */}
            <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-[#E3D5BC] dark:border-white/10 space-y-4">
              <div className="flex gap-4 items-center border-b border-[#E3D5BC]/30 dark:border-white/5 pb-4">
                {/* Photo Preset */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#9C7FDB] to-[#7B93E8] shrink-0" />
                <div className="font-mono text-[12px] space-y-1">
                  <h4 className="font-bold text-[14px] font-display text-[#1E1B24] dark:text-white leading-tight">{profile.name}</h4>
                  <p className="text-zinc-500">Roll: {profile.rollNumber}</p>
                  <p className="text-zinc-500">Sem: {profile.semester} / CS Dept</p>
                </div>
              </div>

              {/* Subject list */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Registered Subjects</span>
                {registeredExamsList.length === 0 ? (
                  <p className="text-[12px] text-red-500 font-mono">No subjects registered yet. Complete exam payments.</p>
                ) : (
                  <ul className="space-y-1.5 font-mono text-[11.5px] text-zinc-700 dark:text-zinc-300">
                    {registeredExamsList.map((e, idx) => (
                      <li key={idx} className="flex justify-between border-b border-zinc-100 dark:border-white/5 pb-1">
                        <span className="truncate max-w-[220px]">{e.name}</span>
                        <span className="font-bold text-[#4A63C9] shrink-0">{e.code}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* QR and crypt sign */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E3D5BC]/30 dark:border-white/5">
                <div className="font-mono text-[9px] text-zinc-500 space-y-0.5">
                  <p>VTU University Registrar</p>
                  <p>Signed: SHA-256 Authorized</p>
                  <p className="font-bold text-emerald-600">STATUS: CLEAR & ACTIVE</p>
                </div>
                <QrCode className="w-14 h-14 text-zinc-700 dark:text-white shrink-0" />
              </div>
            </div>

            <button
              onClick={() => {
                alert('Downloading Hall Ticket PDF Locker asset...');
                setShowHallTicket(false);
              }}
              className="w-full py-3 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13px] flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Download Certified Hall Ticket
            </button>
          </div>
        </div>
      )}

      {/* 2. JIT SECURITY DIAGNOSTICS MODAL OVERLAY */}
      {showJITDiagnostics && selectedExamForJIT && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FAF6EE] dark:bg-[#131315] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 shadow-2xl text-[#1E1B24] dark:text-white space-y-6">
            <div className="text-center space-y-2">
              <ShieldAlert className="w-10 h-10 text-[#9C7FDB] mx-auto animate-pulse" />
              <h3 className="font-display font-bold text-[17px]">Just-in-Time Security Diagnostics</h3>
              <p className="text-[12.5px] text-zinc-500 leading-normal max-w-sm mx-auto font-mono">
                Verify webcam, audio levels, browser locks, and face profile before launching terminal for **{selectedExamForJIT.name}**.
              </p>
            </div>

            {/* Steps Checklist */}
            <div className="space-y-3.5 bg-white/40 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 p-4 rounded-2xl font-mono text-[12px]">
              {/* Camera */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Video className="w-4 h-4 text-[#4A63C9]" /> Web Camera Scan
                </span>
                <span className={`font-bold ${jitStates.cam === 'ok' ? 'text-emerald-500' : jitStates.cam === 'checking' ? 'text-purple-500 animate-pulse' : 'text-zinc-400'}`}>
                  {jitStates.cam === 'ok' ? 'OK ✓' : jitStates.cam === 'checking' ? 'SCANNING...' : 'PENDING'}
                </span>
              </div>

              {/* Mic */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Mic className="w-4 h-4 text-[#9C7FDB]" /> Microphone Amplitude
                </span>
                <span className={`font-bold ${jitStates.mic === 'ok' ? 'text-emerald-500' : jitStates.mic === 'checking' ? 'text-purple-500 animate-pulse' : 'text-zinc-400'}`}>
                  {jitStates.mic === 'ok' ? 'OK ✓' : jitStates.mic === 'checking' ? 'CALIBRATING...' : 'PENDING'}
                </span>
              </div>

              {/* Browser locks */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Monitor className="w-4 h-4 text-[#4A63C9]" /> Sandbox Browser Check
                </span>
                <span className={`font-bold ${jitStates.browser === 'ok' ? 'text-emerald-500' : jitStates.browser === 'checking' ? 'text-purple-500 animate-pulse' : 'text-zinc-400'}`}>
                  {jitStates.browser === 'ok' ? 'SECURED ✓' : jitStates.browser === 'checking' ? 'ENFORCING...' : 'PENDING'}
                </span>
              </div>

              {/* Face calibration */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Sparkles className="w-4 h-4 text-[#9C7FDB]" /> Face Alignment Check
                </span>
                <span className={`font-bold ${jitStates.face === 'ok' ? 'text-emerald-500' : jitStates.face === 'checking' ? 'text-purple-500 animate-pulse' : 'text-zinc-400'}`}>
                  {jitStates.face === 'ok' ? 'ALIGNED ✓' : jitStates.face === 'checking' ? 'VERIFYING...' : 'PENDING'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowJITDiagnostics(false)}
                disabled={jitChecking}
                className="flex-1 py-3 border border-[#E3D5BC] dark:border-white/10 font-semibold rounded-xl hover:bg-white/20 transition-all text-[#5C5868] dark:text-white text-[13px]"
              >
                Cancel
              </button>
              
              {jitStep === 4 ? (
                <button
                  onClick={handleProceedToTerminal}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[13px] transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-1.5 animate-bounce"
                >
                  <Play className="w-4 h-4" /> Enter Terminal
                </button>
              ) : (
                <button
                  onClick={startJitSequence}
                  disabled={jitChecking}
                  className="flex-1 py-3 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13px] transition-all shadow-md shadow-[#4A63C9]/10 flex items-center justify-center gap-1.5"
                >
                  {jitChecking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                    </>
                  ) : (
                    'Verify Credentials'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN TABBED CONTAINER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tab Selector */}
        <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-md shrink-0">
          {[
            { id: 'active', name: 'Scheduled Exams' },
            { id: 'mock', name: 'Mock Test Simulator' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Hall Ticket trigger button */}
        <button
          onClick={() => setShowHallTicket(true)}
          className="px-4 py-2 border border-[#4A63C9] hover:bg-[#4A63C9]/15 text-[#4A63C9] dark:text-[#B5C7E8] font-bold rounded-xl text-[12.5px] transition-all flex items-center gap-1.5 self-start sm:self-center"
        >
          <Award className="w-4 h-4" /> View Hall Ticket
        </button>
      </div>

      {/* Tab 1: Scheduled Exams */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {getDynamicExams().map((exam) => (
            <div
              key={exam.id}
              className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded font-mono text-[9.5px] ${getStatusStyle(exam.status)}`}>
                    {exam.status === 'Enrolled' ? 'ACTIVE & ELIGIBLE' : exam.status === 'Pending' ? 'REGISTRATION DUES' : exam.status}
                  </span>
                  <span className="text-[11.5px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{exam.code}</span>
                </div>
                <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white leading-tight">
                  {exam.name}
                </h3>
                <p className="text-[13px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed">
                  {exam.details}
                </p>
                <div className="flex items-center gap-4 text-[11px] font-mono text-[#5C5868]/80 dark:text-[#E4E2E4]/60">
                  <span>Date: {exam.date}</span>
                  <span>Time: {exam.time} ({exam.duration})</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end">
                {exam.status === 'Enrolled' ? (
                  <button
                    onClick={() => handleLaunchTerminal(exam)}
                    className="px-5 py-3 rounded-xl bg-[#4A63C9] hover:bg-[#3d54b3] text-white text-[13px] font-bold shadow-md shadow-[#4A63C9]/15 flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-4 h-4" /> Launch Terminal
                  </button>
                ) : exam.status === 'Graded/Completed/Cleared' ? (
                  <span className="text-[#2E8B5C] font-mono text-[12.5px] font-semibold flex items-center gap-1.5 bg-[#DFF3E8] dark:bg-[#2E8B5C]/20 px-3 py-1.5 rounded-xl border border-emerald-500/10">
                    <CheckCircle2 className="w-4.5 h-4.5" /> Cleared & Signed
                  </span>
                ) : (
                  <button
                    onClick={() => router.push('/student/payments')}
                    className="px-5 py-3 rounded-xl border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white text-[13px] font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Lock className="w-3.5 h-3.5" /> Register Required
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Mock Test Simulator */}
      {activeTab === 'mock' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
            <h3 className="font-display font-bold text-[15px] text-[#1E1B24] dark:text-white">
              Generate Custom Mock Exam
            </h3>
            <p className="text-[12.5px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed">
              Examiner AI will synthesize a unique set of multiple-choice questions aligned with your courses to test your cognitive recall.
            </p>
            
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
    </div>
  );
}
