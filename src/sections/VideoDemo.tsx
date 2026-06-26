'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { 
  Play, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Eye, 
  RotateCcw 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function VideoDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const hasPlayedRef = useRef(false);

  const startSimulation = () => {
    setIsPlaying(true);
    setProgress(0);
    hasPlayedRef.current = true;
    
    // Stop scrolling
    const globalWindow = typeof window !== "undefined" ? (window as unknown as { lenis?: { stop: () => void; start: () => void } }) : null;
    if (globalWindow && globalWindow.lenis) {
      globalWindow.lenis.stop();
    }
  };

  const skipSimulation = () => {
    setProgress(100);
    setIsPlaying(false);
    setHasPlayed(true);
    
    // Re-enable scrolling
    const globalWindow = typeof window !== "undefined" ? (window as unknown as { lenis?: { stop: () => void; start: () => void } }) : null;
    if (globalWindow && globalWindow.lenis) {
      globalWindow.lenis.start();
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          setHasPlayed(true);
          
          // Re-enable scrolling
          const globalWindow = typeof window !== "undefined" ? (window as unknown as { lenis?: { stop: () => void; start: () => void } }) : null;
          if (globalWindow && globalWindow.lenis) {
            globalWindow.lenis.start();
          }
          return 100;
        }
        return next;
      });
    }, 85); // Stagger progress over ~8.5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!containerRef.current || !headlineRef.current || !videoContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      const text = new SplitType(headlineRef.current!, { types: "words" });
      gsap.fromTo(
        text.words,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // ScrollTrigger to Pin the Video Demo Section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%", // Keep pinned for 1.2x viewport height
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          if (!hasPlayedRef.current) {
            startSimulation();
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Determine active phase based on progress
  let activeStep = 1;
  if (progress >= 33 && progress < 66) activeStep = 2;
  else if (progress >= 66 && progress < 100) activeStep = 3;
  else if (progress === 100) activeStep = 4;

  return (
    <section ref={containerRef} className="py-24 px-6 relative z-10 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <div className="mb-4 px-3 py-1 rounded-full bg-[#E3D9F7]/50 text-[#9C7FDB] font-mono text-xs font-semibold tracking-[0.14em] uppercase">
          SEE IT IN ACTION
        </div>
        <h2 ref={headlineRef} className="text-[34px] md:text-[60px] font-display font-semibold text-[#1E1B24] leading-[1.08] tracking-[-0.02em] mb-12 max-w-3xl">
          Watch Examiner AI run a real exam, end to end.
        </h2>

        {/* Video Canvas Container */}
        <div 
          ref={videoContainerRef}
          className="w-full aspect-video md:aspect-[21/9] rounded-[24px] p-2 bg-white/40 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(80,60,120,0.15)] border border-white/60 relative overflow-hidden group"
        >
          {/* Unplayed / Ready State */}
          {!isPlaying && !hasPlayed && (
            <div 
              onClick={startSimulation}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#C9B8EC] via-[#A9BFF2] to-[#FAF6EE] opacity-80 transition-transform duration-700 group-hover:scale-105" />
              
              <div className="z-10 w-20 h-20 bg-[#4A63C9] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(74,99,201,0.4)] transition-transform duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 text-white ml-1 fill-white" />
              </div>
              <div className="z-10 mt-4 text-[#1E1B24] font-semibold text-lg">
                Click to Run Interactive Simulation
              </div>
            </div>
          )}

          {/* Active Simulation View */}
          {(isPlaying || hasPlayed) && (
            <div className="w-full h-full relative bg-[#1E1B24] text-white rounded-[20px] overflow-hidden flex flex-col font-sans select-none">
              
              {/* Header Bar */}
              <div className="flex justify-between items-center px-6 py-3.5 bg-black/40 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[11px] text-white/40 font-mono ml-2">examiner-ai-client-session://demo</span>
                </div>
                <div className="flex items-center gap-3">
                  {isPlaying && (
                    <button 
                      onClick={skipSimulation}
                      className="text-[11px] px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-all font-mono text-white/80"
                    >
                      Skip Demo
                    </button>
                  )}
                  <span className="text-[11px] px-2.5 py-1 rounded bg-[#4A63C9]/20 text-[#7B93E8] font-mono font-bold">
                    {progress < 100 ? `SIMULATING: ${progress}%` : "READY"}
                  </span>
                </div>
              </div>

              {/* Simulation body split panel */}
              <div className="flex-1 flex overflow-hidden min-h-0">
                
                {/* Left panel sidebar - Status */}
                <div className="w-1/4 bg-black/25 border-r border-white/5 p-5 flex flex-col justify-between shrink-0">
                  <div className="space-y-4">
                    <div className="font-mono text-[10px] text-white/30 tracking-wider uppercase">Exam Phases</div>
                    
                    {[
                      { id: 1, label: "AI Generator", step: 1 },
                      { id: 2, label: "Secure Proctor", step: 2 },
                      { id: 3, label: "AI Evaluator", step: 3 },
                    ].map((phase) => (
                      <div 
                        key={phase.id} 
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 text-left ${
                          activeStep === phase.step 
                            ? "bg-[#4A63C9]/10 border border-[#4A63C9]/30 text-[#7B93E8]"
                            : activeStep > phase.step
                            ? "text-green-400 opacity-60"
                            : "text-white/40 border border-transparent"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] border ${
                          activeStep === phase.step
                            ? "bg-[#4A63C9] text-white border-[#4A63C9]"
                            : activeStep > phase.step
                            ? "bg-green-400/20 text-green-400 border-green-400/30"
                            : "border-white/20 text-white/30"
                        }`}>
                          {activeStep > phase.step ? "✓" : phase.id}
                        </div>
                        <span className="text-[12px] font-semibold tracking-wide">{phase.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-left">
                    <div className="font-mono text-[9px] text-white/30 uppercase mb-1">Session Status</div>
                    <div className="text-[12px] font-mono text-white/80 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${progress < 100 ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                      {progress < 100 ? "Active Simulation" : "Demo Session Certified"}
                    </div>
                  </div>
                </div>

                {/* Right panel - Live Render Area */}
                <div className="flex-1 p-6 relative overflow-hidden flex items-center justify-center">
                  
                  {/* Step 1: AI Question Generator */}
                  {activeStep === 1 && (
                    <div className="w-full max-w-md flex flex-col items-center gap-4 text-center animate-fadeIn">
                      <div className="relative w-16 h-16 rounded-2xl bg-[#E3D9F7]/10 border border-[#9C7FDB]/30 flex items-center justify-center mb-2">
                        <div className="absolute inset-0 bg-[#C9B8EC] rounded-2xl opacity-10 animate-ping" />
                        <FileText className="w-8 h-8 text-[#9C7FDB]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold tracking-wide mb-1">Syllabus Ingestion</div>
                        <div className="text-[12px] text-white/50 font-mono">Analyzing syllabus.pdf and extracting concepts...</div>
                      </div>
                      
                      {/* Upload Animation progress */}
                      <div className="w-full max-w-[280px] bg-white/5 border border-white/10 rounded-xl p-3 text-left">
                        <div className="flex justify-between font-mono text-[10px] text-white/40 mb-1">
                          <span>generating_sets.py</span>
                          <span>Concept Extraction</span>
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2">
                          <div 
                            className="h-full bg-[#9C7FDB] transition-all duration-300"
                            style={{ width: `${(progress / 33) * 100}%` }}
                          />
                        </div>
                        <div className="text-[11px] font-mono text-green-400/80">
                          {progress < 10 ? "→ Parsing content modules..." :
                           progress < 22 ? "✓ 24 learning outcomes identified." :
                           "✦ Generating 3 randomized papers..."}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Secure Live Proctoring */}
                  {activeStep === 2 && (
                    <div className="w-full max-w-xl grid grid-cols-2 gap-6 animate-fadeIn items-center">
                      
                      {/* Mock Web Camera Feed */}
                      <div className="aspect-video rounded-xl bg-black/40 border border-white/10 relative overflow-hidden flex flex-col justify-between p-3">
                        <div className="flex justify-between items-start">
                          <div className="bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                            LIVE FEED
                          </div>
                          <span className="text-[9px] font-mono text-white/40">1080p · 30 FPS</span>
                        </div>

                        {/* Centered stylized avatar with scan lines */}
                        <div className="my-auto mx-auto w-16 h-16 rounded-full border-2 border-dashed border-[#A9BFF2]/40 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full border border-green-400/30 scale-110 animate-pulse" />
                          <Eye className="w-8 h-8 text-[#A9BFF2]/80" />
                        </div>

                        <div className="flex justify-between font-mono text-[9px] text-white/40 mt-2">
                          <span>Identity: Verified</span>
                          <span className="text-green-400 font-semibold">Gaze: OK</span>
                        </div>
                      </div>

                      {/* Proctoring Status List */}
                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <div className="text-xs font-semibold">Lockdown Active</div>
                            <div className="text-[10px] text-white/40 font-mono">Terminal full screen locked</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <div className="text-xs font-semibold">AI Gaze Guard</div>
                            <div className="text-[10px] text-white/40 font-mono">Monitoring facial coordinates</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <div className="text-xs font-semibold">Tab Switching Detector</div>
                            <div className="text-[10px] text-white/40 font-mono">Zero focus loss detected</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: AI Evaluator Grading */}
                  {activeStep === 3 && (
                    <div className="w-full max-w-md flex flex-col items-center gap-4 text-center animate-fadeIn">
                      <div className="relative w-16 h-16 rounded-full border border-[#7B93E8]/30 flex items-center justify-center mb-2">
                        <div className="absolute inset-0 bg-[#A9BFF2] rounded-full opacity-10 animate-pulse" />
                        <Award className="w-8 h-8 text-[#7B93E8]" />
                      </div>
                      
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-display font-bold text-white">
                          {Math.floor(70 + ((progress - 66) / 33) * 24)}
                        </span>
                        <span className="text-lg text-white/50 font-medium">/100</span>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold tracking-wide mb-1">Instant Bias-Free Grading</div>
                        <div className="text-[12px] text-white/50 font-mono">AI Evaluator analyzing answer logs...</div>
                      </div>

                      {/* Grading details */}
                      <div className="w-full max-w-[280px] bg-white/5 border border-white/10 rounded-xl p-3 text-left space-y-1 font-mono text-[10px] text-white/50">
                        <div className="flex justify-between">
                          <span>OSI Model definition:</span>
                          <span className="text-green-400">10/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Subnetting calculations:</span>
                          <span className="text-green-400">8/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TCP vs UDP analysis:</span>
                          <span className="text-green-400">10/10</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Certified Completion */}
                  {activeStep === 4 && (
                    <div className="w-full max-w-md flex flex-col items-center gap-4 text-center animate-scaleIn">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-1">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-lg font-display font-bold text-white mb-1">Session Certified</div>
                        <div className="text-[12px] text-white/50 font-mono max-w-xs mx-auto mb-3">
                          Cryptographic receipt issued and stored permanently.
                        </div>
                      </div>

                      {/* Digital Receipt */}
                      <div className="w-full max-w-[280px] bg-[#FAF6EE]/5 border border-white/10 rounded-xl p-4 text-left font-mono text-[10px] text-white/60 space-y-1.5 shadow-lg">
                        <div className="text-center text-white/40 border-b border-dashed border-white/15 pb-2 mb-2 uppercase tracking-widest text-[9px]">
                          Official Exam receipt
                        </div>
                        <div className="flex justify-between">
                          <span>EXAM ID:</span>
                          <span className="text-white">EXM-8921</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SCORE:</span>
                          <span className="text-[#7B93E8] font-bold">94/100 (A+)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HASH:</span>
                          <span className="text-white/80">0x8f4a...2a1</span>
                        </div>
                      </div>

                      {/* Replay action */}
                      <button
                        onClick={startSimulation}
                        className="mt-2 flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
                      >
                        <RotateCcw size={12} /> Replay Demo
                      </button>
                    </div>
                  )}

                </div>

              </div>

              {/* Progress Slider Track (Bottom) */}
              <div className="h-1 bg-white/5 w-full relative shrink-0">
                <div 
                  className="h-full bg-gradient-to-r from-[#C9B8EC] via-[#A9BFF2] to-[#4A63C9] transition-all duration-100 ease-out" 
                  style={{ width: `${progress}%` }} 
                />
              </div>

            </div>
          )}

        </div>

        {/* Caption */}
        <p className="mt-8 text-[#5C5868] text-base md:text-lg font-medium flex items-center gap-2">
          {progress < 100 ? (
            <span>From question generation to certified results — in under 3 minutes.</span>
          ) : (
            <span className="text-emerald-600 font-semibold flex items-center gap-1.5 animate-pulse">
              ✓ Demo session completed. You may now scroll to continue!
            </span>
          )}
        </p>
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default VideoDemo;
