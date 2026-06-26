'use client';

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    id: 1,
    title: "Initiation",
    desc: "Full browser lockdown activates. The secure exam portal verifies your device and disables all external applications before entry.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Verification",
    desc: "Multi-factor authentication runs alongside AI biometric face matching. Identity is confirmed before a single question appears.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Reading",
    desc: "The paper opens in read-only mode. Text selection, copy-paste, and screen capture are disabled. You read, nothing else.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Writing",
    desc: "The split-screen terminal opens. All answer types are supported — text, equations, diagrams, code. Every keystroke is autosaved.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  {
    id: 5,
    title: "Review",
    desc: "A final pass over all answers before submission. The timer shows prominently. Flagged questions are highlighted for attention.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/>
      </svg>
    )
  },
  {
    id: 6,
    title: "Submission",
    desc: "On confirm, the answer bundle is cryptographically signed and timestamped. Tampering becomes mathematically impossible.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    )
  },
  {
    id: 7,
    title: "Certification",
    desc: "An immutable receipt is generated and stored permanently. Both the student and institution receive a verifiable record of the exam.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    )
  }
];

export function ExamWorkflow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!outerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const raw = self.progress * steps.length;
        const index = Math.min(steps.length - 1, Math.floor(raw));
        setActiveStep(index);
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={outerRef} style={{ height: `${steps.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Section header */}
        <div className="flex flex-col items-center pt-16 pb-8 shrink-0">
          <div className="mb-4 px-3 py-1.5 rounded-full bg-[#E3D9F7] text-[#9C7FDB] font-mono text-xs font-semibold tracking-[0.14em] uppercase">
            HOW AN EXAM RUNS
          </div>
          <h2 className="text-[34px] md:text-[52px] font-display font-semibold text-[#1E1B24] leading-[1.08] tracking-[-0.02em] text-center">
            Seven phases. Zero gaps.
          </h2>
        </div>

        {/* Step progress bar */}
        <div className="flex items-center justify-center gap-2 px-10 mb-8 shrink-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 transition-all duration-500"
                style={{
                  opacity: i === activeStep ? 1 : i < activeStep ? 0.7 : 0.3,
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500"
                  style={{
                    background: i === activeStep ? '#4A63C9' : i < activeStep ? '#A9BFF2' : '#E3D5BC',
                    color: i <= activeStep ? 'white' : '#5C5868',
                    transform: i === activeStep ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {step.id}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 h-[2px] rounded-full transition-all duration-500" style={{ background: i < activeStep ? '#4A63C9' : '#E3D5BC' }} />
              )}
            </div>
          ))}
        </div>

        {/* Active step card */}
        <div className="flex-1 flex items-center justify-center px-6 pb-8">
          <div className="relative w-full max-w-[700px] h-[340px]">
            {steps.map((step, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: activeStep === i ? 1 : 0,
                  transform: activeStep === i
                    ? 'translateY(0) scale(1)'
                    : activeStep > i
                    ? 'translateY(-24px) scale(0.96)'
                    : 'translateY(24px) scale(0.96)',
                  transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: activeStep === i ? 'auto' : 'none',
                }}
              >
                <div
                  className="w-full h-full rounded-3xl flex flex-col items-center justify-center text-center gap-6 px-12"
                  style={{
                    background: 'rgba(255,255,255,0.55)',
                    backdropFilter: 'blur(20px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 20px 60px -20px rgba(80,60,120,0.25)',
                  }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#E3D9F7] flex items-center justify-center text-[#4A63C9]">
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#9C7FDB] uppercase tracking-[0.14em] mb-3">
                      Phase {step.id} of {steps.length}
                    </div>
                    <h3 className="text-[36px] font-display font-bold text-[#1E1B24] leading-tight tracking-[-0.02em] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[17px] text-[#5C5868] leading-[1.65] max-w-[480px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ExamWorkflow;
