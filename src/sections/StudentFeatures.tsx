'use client';

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    title: "Live Exam Terminal",
    desc: "Take exams in a fully secure, distraction-free environment.",
    visual: (
      <div className="w-full h-full flex flex-col justify-between p-8">
        <div className="flex justify-between items-center border-b border-[rgba(30,27,36,0.08)] pb-5 mb-5">
          <div className="font-mono text-sm font-semibold text-[#1E1B24]">Terminal Mode</div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-[#5C5868] font-mono">Secure</span>
          </div>
        </div>
        <div className="text-xs text-[#5C5868] font-mono mb-3 uppercase tracking-wider">Question 4 of 20</div>
        <div className="bg-[#F2EBE0] rounded-xl p-4 mb-4 text-sm text-[#1E1B24] leading-relaxed">
          Explain the differences between C3 and C4 photosynthesis pathways and their ecological significance.
        </div>
        <div className="flex-1 bg-white/60 border border-[rgba(30,27,36,0.08)] rounded-xl p-4 text-sm text-[#5C5868]">
          <div className="h-4 w-3/4 bg-[#E3D9F7] rounded mb-3 animate-pulse" />
          <div className="h-4 w-full bg-[#F2EBE0] rounded mb-3" />
          <div className="h-4 w-5/6 bg-[#F2EBE0] rounded" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-mono text-xs text-[#5C5868]">01:23:45 remaining</div>
          <div className="bg-[#4A63C9] text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-md">Submit Answer</div>
        </div>
      </div>
    )
  },
  {
    title: "Results & AI Feedback",
    desc: "Get question-by-question feedback the moment results are out.",
    visual: (
      <div className="w-full h-full flex flex-col p-8 gap-5">
        <div className="flex items-end gap-4">
          <div className="text-6xl font-display font-bold text-[#1E1B24] leading-none">A+</div>
          <div className="text-[#5C5868] text-sm mb-1">Top 5% of class · 94/100</div>
        </div>
        <div className="space-y-3 flex-1">
          {[
            { q: "Q1", score: "10/10", text: "Perfect explanation of the thermodynamic cycle." },
            { q: "Q2", score: "8/10", text: "Missed the entropy definition in the second law." },
            { q: "Q3", score: "10/10", text: "Excellent diagram and real-world application." },
          ].map((row, i) => (
            <div key={i} className="bg-white/50 p-3 rounded-xl border border-white/60 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#C9B8EC] text-white text-xs flex items-center justify-center shrink-0 font-mono font-bold">{row.q}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs font-semibold text-[#1E1B24]">{row.score}</div>
                </div>
                <div className="text-xs text-[#5C5868]">{row.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "CGPA / SGPA Analytics",
    desc: "Track your academic growth, semester by semester.",
    visual: (
      <div className="w-full h-full flex flex-col p-8">
        <div className="font-display text-lg font-bold text-[#1E1B24] mb-1">Academic Performance</div>
        <div className="text-sm text-[#5C5868] mb-6">CGPA: 8.7 / 10.0</div>
        <div className="flex items-end gap-3 flex-1 mb-4">
          {[
            { label: "S1", h: 65, v: "7.8" },
            { label: "S2", h: 72, v: "8.2" },
            { label: "S3", h: 68, v: "7.9" },
            { label: "S4", h: 80, v: "8.6" },
            { label: "S5", h: 84, v: "8.9" },
            { label: "S6", h: 91, v: "9.2" },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono text-[#5C5868]">{bar.v}</div>
              <div className="w-full rounded-t-md transition-all duration-1000" style={{ height: `${bar.h}%`, background: i === 5 ? '#4A63C9' : '#A9BFF2' }} />
              <div className="text-[10px] text-[#5C5868] font-mono">{bar.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Study Materials",
    desc: "Every note and resource your faculty shares, organized by subject.",
    visual: (
      <div className="w-full h-full flex flex-col p-8">
        <div className="font-display font-bold text-[#1E1B24] mb-5">Physics 101</div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {[
            { name: "Lec_01.pdf", size: "2.1 MB" },
            { name: "Lec_02.pdf", size: "3.4 MB" },
            { name: "Assignment_1.pdf", size: "0.8 MB" },
            { name: "References.pdf", size: "1.2 MB" },
          ].map((file, i) => (
            <div key={i} className="bg-white/50 rounded-xl border border-white/60 p-4 flex flex-col gap-2">
              <div className="w-8 h-10 bg-[#E3D9F7] rounded-sm shadow-sm relative" />
              <div className="text-[10px] font-mono text-[#5C5868] leading-tight">{file.name}</div>
              <div className="text-[9px] text-[#5C5868]/60">{file.size}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Receipt Vault",
    desc: "Every exam, certified and stored — permanently.",
    visual: (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-full max-w-[260px] bg-[#FAF6EE] shadow-xl rounded-lg border border-[#E3D5BC] p-6 flex flex-col gap-4">
          <div className="text-center font-mono text-xs tracking-[0.2em] uppercase text-[#1E1B24] border-b border-dashed border-[#E3D5BC] pb-4">
            Official Exam Receipt
          </div>
          <div className="space-y-2">
            {[
              { k: "Exam ID", v: "EXM-8921" },
              { k: "Subject", v: "Physics 101" },
              { k: "Score", v: "94 / 100" },
              { k: "Hash", v: "0x8f4a...2a1" },
              { k: "Issued", v: "Oct 24, 2025" },
            ].map((row, i) => (
              <div key={i} className="flex justify-between text-[11px] font-mono">
                <span className="text-[#5C5868]/60">{row.k}</span>
                <span className="text-[#1E1B24]">{row.v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center">
            <div className="w-14 h-14 rounded-full border-4 border-[#4A63C9] opacity-25" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Offline Mode",
    desc: "Never lose progress, even when the internet does.",
    visual: (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center gap-5">
        <div className="w-20 h-20 rounded-full bg-[#E3D9F7] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9C7FDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 2 20 20"/><path d="M8.5 8.5c3.5-1.5 8-1.5 11.5.5"/><path d="M4 12c.5-.5 1-1 1.5-1.5"/><path d="M12 16c2.5-1 5-1 7 .5"/>
          </svg>
        </div>
        <div>
          <div className="font-display font-semibold text-xl text-[#1E1B24] mb-2">Connection Lost</div>
          <div className="text-sm text-[#5C5868]">Your answers are saved locally and will sync automatically.</div>
        </div>
        <div className="w-full max-w-[240px]">
          <div className="flex justify-between text-[10px] font-mono text-[#5C5868] mb-1.5">
            <span>Syncing progress</span><span>3 blocks</span>
          </div>
          <div className="w-full h-1.5 bg-[#E3D5BC] rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-[#4A63C9] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    )
  }
];

export function StudentFeatures() {
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

          {/* Left panel — pinned text */}
          <div className="w-[45%] flex flex-col h-full justify-center shrink-0">
            <div className="mb-4 px-3 py-1.5 inline-block w-max rounded-full bg-[#E3D9F7] text-[#9C7FDB] font-mono text-xs font-semibold tracking-[0.14em] uppercase">
              FOR STUDENTS
            </div>
            <h2 className="text-[40px] xl:text-[52px] font-display font-semibold text-[#1E1B24] leading-[1.08] tracking-[-0.02em] mb-10">
              Everything a student needs, in one calm dashboard.
            </h2>
            <div className="space-y-5">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 cursor-default"
                  style={{
                    opacity: activeIndex === i ? 1 : 0.28,
                    transform: activeIndex === i ? 'translateX(6px)' : 'translateX(0)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  <div
                    className="font-mono text-sm font-semibold mt-0.5 shrink-0 transition-colors duration-500"
                    style={{ color: activeIndex === i ? '#9C7FDB' : '#5C5868' }}
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

          {/* Right panel — cross-fading cards */}
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

        </div>
      </div>
    </div>
  );
}

export default StudentFeatures;
