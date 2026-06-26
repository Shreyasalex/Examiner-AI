'use client';

import React, { useState } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { Sparkles, FileText, Lock, Cpu, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function ExamCreatorPage() {
  const { draftExams, addDraftExam } = useFaculty();

  // AI Generator states
  const [topic, setTopic] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Neural Network Architectures (CS-305)');
  const [questionCount, setQuestionCount] = useState(10);
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [lockdown, setLockdown] = useState<'Standard' | 'Strict' | 'None'>('Standard');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedQuestions([]);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedQuestions([
        `Question 1: Explain the mathematical role of learning rate in stochastic gradient descent updates.`,
        `Question 2: Detail the vanishing gradient problem in deep recurrent neural networks.`,
        `Question 3: Derivate the partial derivatives of backpropagation for a single hidden node with Sigmoid activation.`,
        `Question 4: Compare ReLU vs Leaky-ReLU mathematical convergence curves.`
      ]);
    }, 2000);
  };

  const handleSaveExam = () => {
    addDraftExam({
      title: `AI Synthesized: ${topic.charAt(0).toUpperCase() + topic.slice(1)} Exam`,
      course: selectedCourse,
      questionsCount: questionCount,
      duration: duration,
      status: 'Draft',
      lockdownLevel: lockdown
    });

    setSaveSuccess(true);
    setTopic('');
    setGeneratedQuestions([]);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: AI Question Generator */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-5">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#9C7FDB]" />
            AI Exam Paper Synthesizer
          </h3>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[12.5px] font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Exam saved to drafts library successfully.</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Course Topic</label>
              <input
                type="text"
                placeholder="e.g. Backpropagation gradients, CNN pooling, Transformer attention"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 focus:border-[#9C7FDB] focus:bg-white/80 dark:focus:bg-[#1E1B24]/60 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C7FDB]/20 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Select Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B24] dark:text-white outline-none"
                >
                  <option value="Neural Network Architectures (CS-305)">Neural Networks (CS-305)</option>
                  <option value="Advanced Data Structures (CS-301)">Data Structures (CS-301)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B24] dark:text-white outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced (SLA Proctoring)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Question Count</label>
                <input
                  type="number"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Duration (Mins)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Proctor Security Sandbox Level</label>
              <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 max-w-sm">
                {(['None', 'Standard', 'Strict'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLockdown(lvl)}
                    className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all duration-200 ${
                      lockdown === lvl
                        ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                        : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 mt-2 bg-[#4A63C9] text-white text-[13.5px] font-bold rounded-xl hover:bg-[#3d54b3] shadow-md shadow-[#4A63C9]/10 transition-all flex items-center justify-center gap-1.5"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing questions...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Synthesize Exam Questions
                </>
              )}
            </button>
          </form>

          {/* Generated results review */}
          {generatedQuestions.length > 0 && (
            <div className="mt-6 p-5 rounded-2xl bg-white/60 dark:bg-black/15 border border-[#E3D5BC]/30 dark:border-white/5 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/20">
                <h4 className="font-semibold text-[13.5px] text-[#2E8B5C]">Preview Draft Questions</h4>
                <button
                  onClick={handleSaveExam}
                  className="px-4 py-1.5 bg-[#2E8B5C] text-white rounded-lg text-[11px] font-bold transition-all hover:bg-[#236e47] flex items-center gap-1"
                >
                  Save Draft <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {generatedQuestions.map((q, idx) => (
                  <p key={idx} className="text-[12.5px] text-[#5C5868] dark:text-[#E4E2E4]/80 leading-relaxed font-mono">
                    {q}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Active Drafts Library */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#4A63C9]" />
              Exams Drafts Library
            </h3>

            <div className="space-y-3.5">
              {draftExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/5 space-y-2 text-[12.5px]"
                >
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                      exam.status === 'Published'
                        ? 'bg-[#DFF3E8] text-[#2E8B5C]'
                        : 'bg-[#E7E9EF] text-[#5C6478] dark:bg-zinc-800 dark:text-[#E4E2E4]/80'
                    }`}>
                      {exam.status}
                    </span>
                    <span className="text-[10px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{exam.id}</span>
                  </div>
                  <h4 className="font-semibold text-[#1E1B24] dark:text-white leading-tight">{exam.title}</h4>
                  <div className="space-y-1 font-mono text-[11px] text-[#5C5868]/80 dark:text-[#E4E2E4]/60">
                    <p>Course: {exam.course.split(' ')[0]}</p>
                    <p>Questions: {exam.questionsCount} Qs · Duration: {exam.duration} mins</p>
                    <p className="flex items-center gap-1 text-[#4A63C9] dark:text-[#B5C7E8]">
                      <Lock className="w-3.5 h-3.5" /> Security: {exam.lockdownLevel} Sandbox
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
