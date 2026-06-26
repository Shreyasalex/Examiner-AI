'use client';

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "AI Question Generator",
    desc: "Upload a syllabus, get three full papers in minutes.",
    visual: (
      <div className="w-full h-full flex flex-col justify-center gap-6 p-8">
        <div className="text-sm font-semibold text-[#1E1B24] mb-2">Generating from Syllabus.pdf</div>
        <div className="flex items-center gap-4">
          <div className="bg-[#F2EBE0] border border-[#E3D5BC] rounded-xl p-4 flex flex-col items-center gap-2 w-28 shrink-0">
            <svg className="w-8 h-8 text-[#9C7FDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[10px] font-mono text-[#5C5868]">Syllabus.pdf</span>
          </div>
          <div className="text-[#4A63C9] font-mono text-xl animate-pulse">→</div>
          <div className="flex-1 space-y-2">
            {["Paper A — Generated", "Paper B — Generated", "Paper C — Generated"].map((label, i) => (
              <div key={i} className="bg-[#4A63C9] text-white text-xs px-3 py-2 rounded-lg font-mono" style={{ opacity: 1 - i * 0.2 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    title: "AI Evaluator",
    desc: "Bias-free grading with question-by-question AI feedback.",
    visual: (
      <div className="w-full h-full flex flex-col p-8">
        <div className="flex justify-between items-center border-b border-[rgba(30,27,36,0.08)] pb-4 mb-4">
          <div className="font-semibold text-[#1E1B24]">Student #8921</div>
          <div className="text-[#4A63C9] font-bold font-display text-lg">85/100</div>
        </div>
        <div className="space-y-3 flex-1">
          {[
            { q: "Q1", s: "10/10", note: "Perfect explanation of thermodynamics." },
            { q: "Q2", s: "7/10", note: "Missed the second law definition.", dim: true },
            { q: "Q3", s: "9/10", note: "Strong derivation, minor notation error." },
          ].map((row, i) => (
            <div key={i} className={cn("p-3 rounded-xl border text-xs", row.dim ? "bg-[#F2EBE0]/50 border-[#E3D5BC]/50 opacity-70" : "bg-white/50 border-white/60")}>
              <div className="flex justify-between mb-1">
                <span className="font-mono font-bold text-[#1E1B24]">{row.q}</span>
                <span className="text-[#4A63C9] font-semibold">{row.s}</span>
              </div>
              <div className="text-[#5C5868]">{row.note}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Live Exam Monitoring",
    desc: "Watch every session in real time, flagged the moment something's off.",
    visual: (
      <div className="w-full h-full flex flex-col p-6 gap-3">
        <div className="text-sm font-semibold text-[#1E1B24] mb-1">Live Monitor — 24 Students</div>
        <div className="grid grid-cols-2 gap-2 flex-1">
          {[
            { id: "S01", ok: true }, { id: "S02", flagged: true },
            { id: "S03", ok: true }, { id: "S04", ok: true },
          ].map((s, i) => (
            <div key={i} className={cn("rounded-xl border p-3 flex flex-col justify-between", s.flagged ? "border-red-300 bg-red-50/50" : "border-white/60 bg-white/40")}>
              <div className="w-full h-12 bg-black/5 rounded-md mb-2 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#5C5868]/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className={cn("text-[10px] font-mono px-2 py-0.5 rounded w-max flex items-center gap-1", s.flagged ? "bg-red-500 text-white" : "bg-green-100 text-green-700")}>
                {s.flagged ? (
                  <><span className="w-1.5 h-1.5 bg-white rounded-full inline-block animate-ping" /><span>FLAGGED</span></>
                ) : "OK"}
              </div>
              <div className="text-[10px] text-[#5C5868] font-mono mt-1">{s.id}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Question Customisation Mixer",
    desc: "Mix, match, and fine-tune every question before deploying.",
    visual: (
      <div className="w-full h-full flex flex-col p-8 gap-4">
        <div className="text-sm font-semibold text-[#1E1B24]">Question Pool</div>
        {[
          { text: "Describe the OSI Model and its 7 layers.", active: true },
          { text: "What is a subnet mask? Provide an example.", active: false },
          { text: "Compare TCP and UDP with use cases.", active: false },
        ].map((q, i) => (
          <div
            key={i}
            className="p-3 rounded-xl border flex items-center gap-3 cursor-grab"
            style={{
              background: q.active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
              borderColor: q.active ? 'rgba(156,127,219,0.4)' : 'rgba(255,255,255,0.5)',
              opacity: q.active ? 1 : 0.6,
            }}
          >
            <div className="grid grid-cols-2 gap-[2px] opacity-30 shrink-0">
              {[0,1,2,3].map(d => <div key={d} className="w-1 h-1 bg-[#1E1B24] rounded-sm"/>)}
            </div>
            <div className="text-xs text-[#1E1B24]">{q.text}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Violation Review",
    desc: "Review AI-flagged moments and train the system to get smarter.",
    visual: (
      <div className="w-full h-full flex flex-col p-8 gap-4">
        <div className="flex-1 bg-black/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
          <div className="text-[#5C5868] text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Multi-face detected
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#E3D5BC]">
            <div className="w-1/3 h-full bg-red-500 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-3 bg-red-700 rounded-sm" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-red-500/10 text-red-700 text-center py-3 rounded-xl text-xs font-semibold border border-red-200/50">Reject Exam</div>
          <div className="flex-1 bg-green-500/10 text-green-700 text-center py-3 rounded-xl text-xs font-semibold border border-green-200/50">Override & Approve</div>
        </div>
      </div>
    )
  },
  {
    title: "Result Publishing",
    desc: "Approve, override, and publish — all from one screen.",
    visual: (
      <div className="w-full h-full flex flex-col p-8 items-center justify-center text-center gap-6">
        <div className="text-6xl font-display font-bold text-[#1E1B24] leading-none">120/120</div>
        <div className="text-[#5C5868] text-sm">Exams evaluated · Ready to publish</div>
        <div className="w-full max-w-[240px] space-y-3">
          <div className="w-full bg-[#F2EBE0] rounded-full h-2.5">
            <div className="w-full h-full bg-[#4A63C9] rounded-full" />
          </div>
          <div className="text-xs font-mono text-[#5C5868]">All answers AI-graded · Reviewed</div>
        </div>
        <div className="w-full max-w-[240px] bg-[#4A63C9] text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Publish Results
        </div>
      </div>
    )
  }
];

export function FacultyFeatures() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!outerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const raw = self.progress * features.length;
        const index = Math.min(features.length - 1, Math.floor(raw));
        setActiveIndex(index);
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={outerRef} style={{ height: `${features.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full max-w-[1320px] mx-auto px-10 flex gap-16 items-center h-full py-20">

          {/* Left panel — cross-fading cards (mirrored) */}
          <div className="flex-1 h-[70vh] relative flex items-center justify-center">
            {features.map((feature, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: activeIndex === i ? 'auto' : 'none',
                  zIndex: activeIndex === i ? 10 : 0,
                }}
              >
                <div
                  className="w-full max-w-[460px] h-[420px] rounded-3xl"
                  style={{
                    background: 'rgba(255,255,255,0.55)',
                    backdropFilter: 'blur(20px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 20px 60px -20px rgba(80,60,120,0.25)',
                  }}
                >
                  {feature.visual}
                </div>
              </div>
            ))}
          </div>

          {/* Right panel — pinned text (mirrored) */}
          <div className="w-[45%] flex flex-col h-full justify-center shrink-0">
            <div className="mb-4 px-3 py-1.5 inline-block w-max rounded-full bg-[#A9BFF2]/40 text-[#4A63C9] font-mono text-xs font-semibold tracking-[0.14em] uppercase">
              FOR FACULTY
            </div>
            <h2 className="text-[40px] xl:text-[52px] font-display font-semibold text-[#1E1B24] leading-[1.08] tracking-[-0.02em] mb-10">
              Set papers, evaluate, and monitor — without the manual grind.
            </h2>
            <div className="space-y-5">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 cursor-default"
                  style={{
                    opacity: activeIndex === i ? 1 : 0.28,
                    transform: activeIndex === i ? 'translateX(-6px)' : 'translateX(0)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  <div
                    className="font-mono text-sm font-semibold mt-0.5 shrink-0 transition-colors duration-500"
                    style={{ color: activeIndex === i ? '#4A63C9' : '#5C5868' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E1B24] text-lg mb-0.5">{feature.title}</h3>
                    <p className="text-[15px] text-[#5C5868] leading-relaxed">{feature.desc}</p>
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

export default FacultyFeatures;
