'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Upload, ArrowUpRight, X, Loader2, BarChart2, Link as LinkIcon, FileText } from 'lucide-react';

type Tab = 'all' | 'pending' | 'submitted' | 'graded';
type TypeFilter = 'all' | 'assignments' | 'projects';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  marks: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  score?: string;
  description: string;
  type: 'Assignment' | 'Project';
  submittedFile?: string;
  submittedLink?: string;
  submittedNotes?: string;
  submittedAt?: string;
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [activeType, setActiveType] = useState<TypeFilter>('all');
  
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tempFile, setTempFile] = useState<string | null>(null);
  const [tempLink, setTempLink] = useState('');
  const [tempNotes, setTempNotes] = useState('');

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'ASM-883',
      title: 'Graph Theory & Network Flows',
      course: 'Discrete Mathematics',
      dueDate: '2026-07-02',
      marks: '50',
      status: 'Pending',
      type: 'Assignment',
      description: 'Solve problem sets 1 to 15 detailing network flows, maximum bipartite matching, and Euler pathways. Submit in PDF format with mathematical proofs written clearly.'
    },
    {
      id: 'ASM-884',
      title: 'Backpropagation Algorithm from Scratch',
      course: 'Neural Network Architectures',
      dueDate: '2026-07-08',
      marks: '100',
      status: 'Pending',
      type: 'Project',
      description: 'Implement a multi-layer perceptron neural network using standard numpy arrays. Write code for forward pass, loss calculation, backward pass, and weights adjustment. Submit as a Jupyter Notebook (.ipynb).'
    },
    {
      id: 'ASM-771',
      title: 'B-Tree & Red-Black Tree Implementation',
      course: 'Advanced Data Structures',
      dueDate: '2026-06-20',
      marks: '50',
      status: 'Submitted',
      type: 'Assignment',
      submittedFile: 'rbtree_impl_v1.zip',
      submittedAt: '2026-06-19 04:30 PM',
      description: 'Write a C++ program implementing Red-Black tree insertion and deletion algorithms. Test boundary cases and print terminal visual logs.'
    },
    {
      id: 'ASM-512',
      title: 'Satisfiability (SAT) Solvers Quiz-Prep',
      course: 'Computational Logic',
      dueDate: '2026-06-14',
      marks: '20',
      status: 'Graded',
      score: '18/20',
      type: 'Assignment',
      submittedFile: 'logic_quiz_solutions.pdf',
      submittedAt: '2026-06-13 11:20 AM',
      description: 'Analyze DPLL algorithms and resolution proofs for propositional logic sentences.'
    },
    {
      id: 'ASM-501',
      title: 'Complexity Classes NP-Complete Reductions',
      course: 'Advanced Algorithms',
      dueDate: '2026-06-08',
      marks: '100',
      status: 'Graded',
      score: '96/100',
      type: 'Project',
      submittedFile: 'np_reductions_project.pdf',
      submittedLink: 'https://github.com/alex/np-reductions',
      submittedNotes: 'Implemented the Vertex Cover reduction in Python. Included graph visualizer.',
      submittedAt: '2026-06-07 09:15 PM',
      description: 'Design reduction proofs from 3-SAT to Vertex Cover and Hamiltonian Cycle problems.'
    }
  ]);

  const handleOpenSubmit = (id: string) => {
    const asm = assignments.find((a) => a.id === id);
    if (!asm) return;
    setSelectedAssignmentId(id);
    setTempFile(asm.submittedFile || null);
    setTempLink(asm.submittedLink || '');
    setTempNotes(asm.submittedNotes || '');
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleFileSelect = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setTempFile('solutions_submission_v2.pdf');
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const handleFinalSubmit = () => {
    if (!selectedAssignmentId) return;

    setAssignments((prev) =>
      prev.map((asm) =>
        asm.id === selectedAssignmentId
          ? {
              ...asm,
              status: 'Submitted' as const,
              submittedFile: tempFile || undefined,
              submittedLink: tempLink || undefined,
              submittedNotes: tempNotes || undefined,
              submittedAt: new Date().toLocaleString()
            }
          : asm
      )
    );
    setSelectedAssignmentId(null);
  };

  const filteredAssignments = assignments.filter((asm) => {
    // 1. Type Filter
    if (activeType === 'assignments' && asm.type !== 'Assignment') return false;
    if (activeType === 'projects' && asm.type !== 'Project') return false;

    // 2. Status Tab Filter
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return asm.status === 'Pending';
    if (activeTab === 'submitted') return asm.status === 'Submitted';
    if (activeTab === 'graded') return asm.status === 'Graded';
    return true;
  });

  return (
    <div className="space-y-6 relative">
      {/* 1. UPLOAD & SUBMISSION PANEL DRAWER */}
      {selectedAssignmentId && (() => {
        const asm = assignments.find((a) => a.id === selectedAssignmentId);
        if (!asm) return null;
        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#FAF6EE] dark:bg-[#131315] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 shadow-2xl text-[#1E1B24] dark:text-white space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-[16px]">
                    {asm.status === 'Pending' ? 'Submit Solutions' : 'Review / Resubmit Solutions'}
                  </h3>
                  <p className="text-[11px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                    ID: {asm.id} · {asm.course}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAssignmentId(null)}
                  className="p-1 rounded-lg hover:bg-white/20 dark:hover:bg-white/5 text-[#5C5868]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-white/40 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[13.5px]">{asm.title}</h4>
                  <span className="px-2 py-0.5 rounded bg-[#4A63C9]/10 text-[#4A63C9] font-mono text-[9px] font-bold">
                    {asm.type}
                  </span>
                </div>
                <p className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed">
                  {asm.description}
                </p>
              </div>

              {/* Submissions Panel Fields */}
              <div className="space-y-4">
                {/* 1. File Upload Zone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-white/60">
                    File Attachment
                  </label>
                  {!tempFile ? (
                    <div
                      onClick={handleFileSelect}
                      className="border-2 border-dashed border-[#E3D5BC] dark:border-white/20 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/40 dark:hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-8 h-8 text-[#4A63C9] animate-spin" />
                          <span className="text-[12px] font-mono text-[#4A63C9] font-bold">Uploading {uploadProgress}%</span>
                          <div className="w-32 h-1 bg-[#E3D5BC]/30 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#4A63C9] transition-all" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-[#9C7FDB]" />
                          <span className="text-[13px] font-semibold">Select and upload solution file</span>
                          <span className="text-[10px] text-[#5C5868] dark:text-[#E4E2E4]/60">PDF, ZIP, IPYNB up to 10MB</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl border border-[#2E8B5C]/20 bg-[#DFF3E8]/80 text-[#2E8B5C] flex items-center justify-between gap-3 text-[12.5px]">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 shrink-0" />
                        <span className="truncate font-mono">{tempFile}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTempFile(null)}
                        className="p-1 hover:bg-[#2E8B5C]/10 rounded text-[#2E8B5C]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Repository/Demo Link */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-white/60">
                    Repository or Demo Link (Optional)
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-[#5C5868]/60" />
                    <input
                      type="text"
                      placeholder="https://github.com/username/project"
                      value={tempLink}
                      onChange={(e) => setTempLink(e.target.value)}
                      className="w-full bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-[13px] outline-none focus:border-[#4A63C9]"
                    />
                  </div>
                </div>

                {/* 3. Submission Notes */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-white/60">
                    Submission Notes & Instructions
                  </label>
                  <textarea
                    placeholder="Enter any notes for the evaluator..."
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-[#4A63C9] resize-none"
                  />
                </div>

                {asm.submittedAt && (
                  <p className="text-[10.5px] font-mono text-[#5C5868]/70 text-right">
                    Last submitted: {asm.submittedAt}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedAssignmentId(null)}
                  className="flex-1 py-3 border border-[#E3D5BC] dark:border-white/10 text-[13px] font-semibold rounded-xl hover:bg-white/20 transition-all text-[#5C5868] dark:text-white"
                >
                  Close
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!tempFile && !tempLink}
                  className="flex-1 py-3 bg-[#4A63C9] disabled:bg-zinc-400 dark:disabled:bg-zinc-800 disabled:cursor-not-allowed text-white text-[13px] font-bold rounded-xl hover:bg-[#3d54b3] shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  {asm.status === 'Pending' ? 'Submit Solutions' : 'Resubmit Solutions'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 2. REGULAR INTERFACE */}
      {/* Type Filter Chips + Tab switcher */}
      <div className="space-y-4">
        {/* Type selector chips */}
        <div className="flex gap-2">
          {[
            { id: 'all', name: 'All Types' },
            { id: 'assignments', name: 'Assignments' },
            { id: 'projects', name: 'Projects' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id as TypeFilter)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                activeType === type.id
                  ? 'bg-[#E3D9F7] text-[#4A63C9] border-[#4A63C9]/10'
                  : 'bg-white/40 dark:bg-white/5 border-[#E3D5BC]/30 dark:border-white/10 text-[#5C5868] dark:text-[#E4E2E4]/80'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-md shrink-0">
          {[
            { id: 'all', name: 'All Tasks' },
            { id: 'pending', name: 'Pending' },
            { id: 'submitted', name: 'Submitted' },
            { id: 'graded', name: 'Graded & Insights' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
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

      {/* Task List */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 dark:text-[#E4E2E4]/40 font-mono text-[13px]">
            No items found. All clear!
          </div>
        ) : (
          filteredAssignments.map((asm) => (
            <div
              key={asm.id}
              className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      asm.status === 'Pending'
                        ? 'bg-[#C1493D]/10 text-[#C1493D]'
                        : asm.status === 'Submitted'
                        ? 'bg-[#4A63C9]/10 text-[#4A63C9] dark:text-[#B5C7E8]'
                        : 'bg-[#DFF3E8] text-[#2E8B5C] dark:bg-[#2E8B5C]/20'
                    }`}
                  >
                    {asm.status}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[9px] font-bold">
                    {asm.type}
                  </span>
                  <span className="text-[11.5px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{asm.id} · {asm.course}</span>
                </div>
                <h4 className="font-semibold text-[14.5px] text-[#1E1B24] dark:text-white">{asm.title}</h4>
                <p className="text-[12.5px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed">{asm.description}</p>
                <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 pt-1">
                  <Calendar className="w-3.5 h-3.5" /> Due: {asm.dueDate} · Marks Weightage: {asm.marks} pts
                </div>
              </div>

              <div className="flex items-center gap-5 sm:self-center shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                <div className="font-mono text-right shrink-0">
                  {asm.status === 'Graded' ? (
                    <>
                      <p className="text-[9px] uppercase tracking-wider text-[#5C5868]/60 dark:text-[#E4E2E4]/40">Score</p>
                      <p className="font-bold text-[18px] text-[#2E8B5C]">{asm.score}</p>
                    </>
                  ) : asm.status === 'Submitted' ? (
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold uppercase">Pending Evaluation</span>
                  ) : (
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-semibold uppercase">Not Submitted</span>
                  )}
                </div>

                {asm.status === 'Pending' ? (
                  <button
                    onClick={() => handleOpenSubmit(asm.id)}
                    className="px-5 py-2.5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white rounded-xl text-[12.5px] font-bold transition-all shadow-md shadow-[#4A63C9]/10"
                  >
                    Submit Work
                  </button>
                ) : asm.status === 'Submitted' ? (
                  <button
                    onClick={() => handleOpenSubmit(asm.id)}
                    className="px-4 py-2 border border-[#E3D5BC] dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/5 rounded-xl text-[12px] font-bold transition-all text-[#1E1B24] dark:text-white flex items-center gap-1"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#9C7FDB]" /> Resubmit
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Showing grader analytical feedback for ${asm.id}:\nExcellent structure, logical resolution proofs.`)}
                    className="px-4 py-2 border border-[#E3D5BC] dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/5 rounded-xl text-[12px] font-bold transition-all text-[#1E1B24] dark:text-white flex items-center gap-1.5"
                  >
                    Feedback <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Grade Growth & Submissions bar chart */}
      <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
        <h3 className="font-display font-bold text-[15px] text-[#1E1B24] dark:text-white mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#9C7FDB]" />
          Grades Progress & Submissions Rate
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3.5 font-mono text-[12.5px]">
            <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/30 dark:border-white/5">
              <span>Total Course Tasks:</span>
              <span className="font-bold text-[14px]">5 Assignments</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/30 dark:border-white/5">
              <span>Completions Rate:</span>
              <span className="font-bold text-[14px] text-[#2E8B5C]">60%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Graded Average:</span>
              <span className="font-bold text-[14px] text-[#4A63C9] dark:text-[#B5C7E8]">93.5%</span>
            </div>
          </div>

          <div className="h-28 flex items-end justify-around gap-2 px-4">
            {[
              { label: 'MATH', height: '98%', score: '98%' },
              { label: 'ADS', height: '84%', score: '84%' },
              { label: 'LOGIC', height: '90%', score: '90%' },
              { label: 'ALGO', height: '96%', score: '96%' }
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[9px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{bar.score}</span>
                <div className="w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-t relative h-full">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#4A63C9] to-[#9C7FDB] rounded-t shadow-[0_0_8px_rgba(156,127,219,0.3)]"
                    style={{ height: bar.height }}
                  />
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#1E1B24] dark:text-white mt-1">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
