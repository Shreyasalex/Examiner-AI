'use client';

import React, { useState } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { Sparkles, Lock, ChevronRight, ChevronLeft, Loader2, CheckCircle2, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: string;
  text: string;
  type: 'Text' | 'Math' | 'Diagram' | 'Code' | 'Chemistry';
  bloomLevel: 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating';
}

export default function QuestionGeneratorPage() {
  const { materials } = useFaculty();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSubject, setSelectedSubject] = useState('CS-305: Neural Network Architectures');
  const [selectedMats, setSelectedMats] = useState<string[]>([]);
  const [easyPercent, setEasyPercent] = useState(30);
  const [mediumPercent, setMediumPercent] = useState(50);
  const [hardPercent, setHardPercent] = useState(20);
  const [bloomApplying, setBloomApplying] = useState(40);
  const [bloomAnalyzing, setBloomAnalyzing] = useState(40);
  const [bloomUnderstanding, setBloomUnderstanding] = useState(20);

  const [isGenerating, setIsGenerating] = useState(false);
  const [variantA, setVariantA] = useState<Question[]>([
    { id: 'a1', text: 'Explain backpropagation gradient chain rule steps.', type: 'Math', bloomLevel: 'Understanding' },
    { id: 'a2', text: 'Derive partial derivatives for a single sigmoid hidden node.', type: 'Math', bloomLevel: 'Analyzing' },
    { id: 'a3', text: 'Write a NumPy implementation of weight vector adjustments.', type: 'Code', bloomLevel: 'Applying' }
  ]);
  const [variantB, setVariantB] = useState<Question[]>([
    { id: 'b1', text: 'Detail vanishing gradient occurrences in deep LSTM networks.', type: 'Text', bloomLevel: 'Analyzing' },
    { id: 'b2', text: 'Derive error delta calculation w.r.t bias weights.', type: 'Math', bloomLevel: 'Understanding' },
    { id: 'b3', text: 'Map a neural network computational graph diagram.', type: 'Diagram', bloomLevel: 'Applying' }
  ]);
  const [variantC, setVariantC] = useState<Question[]>([
    { id: 'c1', text: 'Compare convergence speed of SGD vs Adam optimizers.', type: 'Text', bloomLevel: 'Evaluating' },
    { id: 'c2', text: 'Derive feedforward output using matrix dot operations.', type: 'Math', bloomLevel: 'Applying' },
    { id: 'c3', text: 'Implement Leaky-ReLU threshold functions in Python.', type: 'Code', bloomLevel: 'Applying' }
  ]);

  const [customPaper, setCustomPaper] = useState<Question[]>([]);
  const [paperLocked, setPaperLocked] = useState(false);

  const handleSelectMat = (id: string) => {
    setSelectedMats(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  const moveQuestionToCustom = (q: Question, from: 'A' | 'B' | 'C') => {
    setCustomPaper(prev => [...prev, { ...q, id: `cust-${Date.now()}` }]);
    if (from === 'A') setVariantA(prev => prev.filter(item => item.id !== q.id));
    if (from === 'B') setVariantB(prev => prev.filter(item => item.id !== q.id));
    if (from === 'C') setVariantC(prev => prev.filter(item => item.id !== q.id));
  };

  const handleQuestionTextChange = (id: string, text: string) => {
    setCustomPaper(prev => prev.map(q => q.id === id ? { ...q, text } : q));
  };

  const handleQuestionTypeChange = (id: string, type: Question['type']) => {
    setCustomPaper(prev => prev.map(q => q.id === id ? { ...q, type } : q));
  };

  const handleLockPaper = () => {
    setPaperLocked(true);
    setTimeout(() => {
      setPaperLocked(false);
      setStep(1);
      setCustomPaper([]);
    }, 3000);
  };

  const indexedMaterials = materials.filter(m => m.indexingStatus === 'Indexed ✓');

  if (indexedMaterials.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 font-mono py-20 animate-fade-in flex flex-col items-center gap-4">
        <BookOpen className="w-10 h-10 text-[#5C5868]/45" />
        <div className="space-y-1">
          <p className="font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">No Study Materials Indexed</p>
          <p className="text-[12px]">Upload and index study materials first before generating questions.</p>
        </div>
        <Link href="/faculty/materials" className="px-4 py-2 bg-[#4A63C9] text-white rounded-xl text-[12.5px] font-semibold mt-2">
          Upload Materials
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Timeline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E3D5BC]/20 dark:border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">AI-POWERED PAPER CREATION</span>
          <h2 className="font-display font-bold text-[22px] text-[#1E1B24] dark:text-[#EDEAF2] mt-0.5">
            Question Generator
          </h2>
        </div>

        {/* Stepper Timeline */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#5C5868]/80 dark:text-[#9591A3]/80">
          <span className={`px-2 py-1 rounded-lg ${step === 1 ? 'bg-[#E3D9F7] text-[#4A63C9] font-bold' : 'bg-[#E3D5BC]/20'}`}>1. Source</span>
          <ChevronRight className="w-3 h-3 text-[#5C5868]/40" />
          <span className={`px-2 py-1 rounded-lg ${step === 2 ? 'bg-[#E3D9F7] text-[#4A63C9] font-bold' : 'bg-[#E3D5BC]/20'}`}>2. Configure</span>
          <ChevronRight className="w-3 h-3 text-[#5C5868]/40" />
          <span className={`px-2 py-1 rounded-lg ${step === 3 ? 'bg-[#E3D9F7] text-[#4A63C9] font-bold' : 'bg-[#E3D5BC]/20'}`}>3. Generate</span>
          <ChevronRight className="w-3 h-3 text-[#5C5868]/40" />
          <span className={`px-2 py-1 rounded-lg ${step === 4 ? 'bg-[#E3D9F7] text-[#4A63C9] font-bold' : 'bg-[#E3D5BC]/20'}`}>4. Review</span>
        </div>
      </div>

      {paperLocked && (
        <div className="p-4 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[13px] font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#2E8B5C]" />
          <span>Paper variants successfully hash-locked and sent to Exams deployments bank!</span>
        </div>
      )}

      {/* Steps wizard content */}
      <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Step 1: Select Source Materials
            </h3>
            <p className="text-[12px] text-[#5C5868]/70 dark:text-[#9591A3]/60">
              Select which course syllabus slide decks or reference docs you want the RAG embeddings to scan.
            </p>

            <div className="space-y-3">
              <div className="space-y-1.5 max-w-sm">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Course Title</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2]"
                >
                  <option value="CS-305: Neural Network Architectures">Neural Networks (CS-305)</option>
                  <option value="CS-301: Advanced Data Structures">Data Structures (CS-301)</option>
                </select>
              </div>

              {/* Materials list */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Scanning RAG Index</span>
                <div className="space-y-2">
                  {indexedMaterials.map((mat) => (
                    <label key={mat.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/40 dark:border-white/5 bg-white/20 dark:bg-white/5 cursor-pointer hover:bg-white/40">
                      <input
                        type="checkbox"
                        checked={selectedMats.includes(mat.id)}
                        onChange={() => handleSelectMat(mat.id)}
                        className="rounded border-[#E3D5BC]/50 text-[#4A63C9] focus:ring-[#4A63C9] w-4.5 h-4.5"
                      />
                      <div>
                        <p className="text-[12.5px] font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">{mat.title}</p>
                        <p className="text-[10px] text-[#5C5868]/75 dark:text-[#9591A3]/50 font-mono mt-0.5">{mat.course}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={selectedMats.length === 0}
                className="px-5 py-2.5 rounded-xl bg-[#4A63C9] text-white hover:bg-[#3b51b3] disabled:opacity-50 text-[12.5px] font-bold flex items-center gap-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Step 2: Difficulty &amp; Bloom&apos;s Configuration
            </h3>
            <p className="text-[12px] text-[#5C5868]/70 dark:text-[#9591A3]/60">
              Set target difficulty weights and educational cognitive distribution parameters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Range Sliders */}
              <div className="space-y-4 p-4 rounded-xl border border-[#E3D5BC]/30 dark:border-white/5 bg-white/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block">Difficulty Curve sliders</span>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[11.5px] font-mono">
                    <span>Easy</span>
                    <span>{easyPercent}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={easyPercent} onChange={(e) => setEasyPercent(Number(e.target.value))} className="w-full h-1.5 bg-[#E3D5BC]/30 rounded-lg appearance-none cursor-pointer accent-[#4A63C9]" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11.5px] font-mono">
                    <span>Medium</span>
                    <span>{mediumPercent}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={mediumPercent} onChange={(e) => setMediumPercent(Number(e.target.value))} className="w-full h-1.5 bg-[#E3D5BC]/30 rounded-lg appearance-none cursor-pointer accent-[#4A63C9]" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11.5px] font-mono">
                    <span>Hard</span>
                    <span>{hardPercent}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={hardPercent} onChange={(e) => setHardPercent(Number(e.target.value))} className="w-full h-1.5 bg-[#E3D5BC]/30 rounded-lg appearance-none cursor-pointer accent-[#4A63C9]" />
                </div>
              </div>

              {/* Bloom's taxonomy weights */}
              <div className="space-y-4 p-4 rounded-xl border border-[#E3D5BC]/30 dark:border-white/5 bg-white/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block">Bloom&apos;s Taxonomy Weights</span>
                
                <div className="grid grid-cols-3 gap-3 font-mono text-[11.5px]">
                  <div className="space-y-1">
                    <label>Understanding</label>
                    <input type="number" value={bloomUnderstanding} onChange={(e) => setBloomUnderstanding(Number(e.target.value))} className="w-full bg-white dark:bg-[#1D1A24] border border-[#E3D5BC]/60 rounded-lg p-1.5 text-center font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label>Applying</label>
                    <input type="number" value={bloomApplying} onChange={(e) => setBloomApplying(Number(e.target.value))} className="w-full bg-white dark:bg-[#1D1A24] border border-[#E3D5BC]/60 rounded-lg p-1.5 text-center font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label>Analyzing</label>
                    <input type="number" value={bloomAnalyzing} onChange={(e) => setBloomAnalyzing(Number(e.target.value))} className="w-full bg-white dark:bg-[#1D1A24] border border-[#E3D5BC]/60 rounded-lg p-1.5 text-center font-bold" />
                  </div>
                </div>
                <p className="text-[9.5px] text-[#5C5868]/60">Sum should ideally target 100% distribution</p>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(1)} className="px-4 py-2 rounded-xl border border-[#E3D5BC]/40 dark:border-white/5 text-[12px] font-semibold flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button onClick={handleGenerate} className="px-5 py-2.5 rounded-xl bg-[#4A63C9] text-white hover:bg-[#3b51b3] text-[12.5px] font-bold flex items-center gap-1.5">
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    <span>Synthesizing variants...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Papers</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Step 3: Produced Paper Variants
            </h3>
            <p className="text-[12px] text-[#5C5868]/70 dark:text-[#9591A3]/60">
              Review side-by-side RAG question variants. Click items to mix/select them into your final custom 4th paper.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Variant A */}
              <div className="p-4 rounded-xl border border-white/60 dark:border-white/10 bg-white/20 backdrop-blur-sm space-y-3">
                <span className="font-mono text-[10px] font-bold text-[#4A63C9] bg-[#E1E9FB] px-2 py-0.5 rounded">Variant A (Theoretical math)</span>
                <div className="space-y-2">
                  {variantA.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => moveQuestionToCustom(q, 'A')}
                      className="p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-transparent hover:border-[#4A63C9] cursor-pointer text-[12px] text-[#1E1B24] dark:text-[#EDEAF2] transition-all"
                    >
                      <p className="line-clamp-3 leading-relaxed">{q.text}</p>
                      <span className="text-[8.5px] font-mono text-[#5C5868]/60 dark:text-[#9591A3]/45 block mt-2">Tag: {q.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variant B */}
              <div className="p-4 rounded-xl border border-white/60 dark:border-white/10 bg-white/20 backdrop-blur-sm space-y-3">
                <span className="font-mono text-[10px] font-bold text-[#9C7FDB] bg-[#9C7FDB]/10 px-2 py-0.5 rounded">Variant B (Applied modeling)</span>
                <div className="space-y-2">
                  {variantB.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => moveQuestionToCustom(q, 'B')}
                      className="p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-transparent hover:border-[#4A63C9] cursor-pointer text-[12px] text-[#1E1B24] dark:text-[#EDEAF2] transition-all"
                    >
                      <p className="line-clamp-3 leading-relaxed">{q.text}</p>
                      <span className="text-[8.5px] font-mono text-[#5C5868]/60 dark:text-[#9591A3]/45 block mt-2">Tag: {q.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Variant C */}
              <div className="p-4 rounded-xl border border-white/60 dark:border-white/10 bg-white/20 backdrop-blur-sm space-y-3">
                <span className="font-mono text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">Variant C (Optimized codes)</span>
                <div className="space-y-2">
                  {variantC.map((q) => (
                    <div
                      key={q.id}
                      onClick={() => moveQuestionToCustom(q, 'C')}
                      className="p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-transparent hover:border-[#4A63C9] cursor-pointer text-[12px] text-[#1E1B24] dark:text-[#EDEAF2] transition-all"
                    >
                      <p className="line-clamp-3 leading-relaxed">{q.text}</p>
                      <span className="text-[8.5px] font-mono text-[#5C5868]/60 dark:text-[#9591A3]/45 block mt-2">Tag: {q.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button onClick={() => setStep(2)} className="px-4 py-2 rounded-xl border border-[#E3D5BC]/40 dark:border-white/5 text-[12px] font-semibold flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(4)}
                disabled={customPaper.length === 0}
                className="px-5 py-2.5 rounded-xl bg-[#4A63C9] text-white hover:bg-[#3b51b3] text-[12.5px] font-bold flex items-center gap-1"
              >
                <span>Continue Review ({customPaper.length} Qs)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
            {/* Left 8 Cols: Custom paper edit pane */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
                Step 4: Review & Customize Custom Paper
              </h3>

              <div className="space-y-3">
                {customPaper.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-xl border border-[#E3D5BC]/30 dark:border-white/5 bg-white/20 space-y-3">
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#4A63C9]">Question {idx + 1}</span>
                      
                      {/* Answer type selector */}
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="text-[#5C5868]/70 dark:text-[#9591A3]/50 mr-1.5 font-mono uppercase text-[9.5px]">Expected Output:</span>
                        <select
                          value={q.type}
                          onChange={(e) => handleQuestionTypeChange(q.id, e.target.value as Question['type'])}
                          className="bg-white dark:bg-[#1D1A24] border border-[#E3D5BC]/65 rounded px-1.5 py-0.5 font-mono text-[10px]"
                        >
                          <option value="Text">Text</option>
                          <option value="Math">Math</option>
                          <option value="Diagram">Diagram</option>
                          <option value="Code">Code</option>
                          <option value="Chemistry">Chemistry</option>
                        </select>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={q.text}
                      onChange={(e) => handleQuestionTextChange(q.id, e.target.value)}
                      className="w-full bg-white/70 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={() => setStep(3)} className="px-4 py-2 rounded-xl border border-[#E3D5BC]/40 dark:border-white/5 text-[12px] font-semibold flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleLockPaper}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12.5px] font-bold flex items-center gap-1.5"
                >
                  <Lock className="w-4.5 h-4.5" />
                  <span>Lock & Send to Exams</span>
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Bloom's donut representation */}
            <div className="lg:col-span-4 p-5 rounded-xl border border-[#E3D5BC]/30 dark:border-white/5 bg-white/20 space-y-4">
              <h4 className="font-display font-bold text-[14px] text-[#1E1B24] dark:text-[#EDEAF2]">
                Bloom&apos;s Taxonomy Target Mix
              </h4>
              <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 leading-normal">
                Donut proportion chart indicating expected cognitive outcomes of the final paper.
              </p>

              {/* Ring Donut Mockup */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center pt-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="54" stroke="#E7E9EF" strokeWidth="12" fill="transparent" />
                  <circle cx="72" cy="72" r="54" stroke="#4A63C9" strokeWidth="12" strokeDasharray="339" strokeDashoffset="120" fill="transparent" />
                  <circle cx="72" cy="72" r="54" stroke="#9C7FDB" strokeWidth="12" strokeDasharray="339" strokeDashoffset="240" fill="transparent" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-[17px] font-mono font-bold">100%</span>
                  <p className="text-[8px] text-[#5C5868]/60 uppercase font-mono tracking-wider">Indexed</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-[11px] font-mono">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4A63C9]" />
                    <span>Applying</span>
                  </div>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9C7FDB]" />
                    <span>Analyzing</span>
                  </div>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Understanding</span>
                  </div>
                  <span className="font-bold">20%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
