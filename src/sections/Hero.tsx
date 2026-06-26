'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { MagneticButton } from "@/components/MagneticButton";

/* ---------- corner ray definitions ---------- */
const LEFT_RAYS = [
  { angle: -38, opacity: 0.28, width: 180 },
  { angle: -26, opacity: 0.18, width: 120 },
  { angle: -14, opacity: 0.32, width: 200 },
  { angle: -4,  opacity: 0.14, width: 100 },
  { angle: 8,   opacity: 0.22, width: 140 },
  { angle: 20,  opacity: 0.16, width: 90  },
  { angle: 32,  opacity: 0.26, width: 160 },
  { angle: 44,  opacity: 0.12, width: 80  },
];

const RIGHT_RAYS = [
  { angle: 180 + 38, opacity: 0.22, width: 160 },
  { angle: 180 + 26, opacity: 0.15, width: 110 },
  { angle: 180 + 14, opacity: 0.28, width: 190 },
  { angle: 180 + 4,  opacity: 0.12, width: 90  },
  { angle: 180 - 8,  opacity: 0.20, width: 140 },
  { angle: 180 - 20, opacity: 0.14, width: 85  },
  { angle: 180 - 32, opacity: 0.24, width: 150 },
  { angle: 180 - 44, opacity: 0.10, width: 75  },
];

/* ---------- ray component ---------- */
function CornerRays({ side }: { side: "left" | "right" }) {
  const raysRef = useRef<HTMLDivElement>(null);
  const rays = side === "left" ? LEFT_RAYS : RIGHT_RAYS;
  const originX = side === "left" ? "0% 0%" : "100% 0%";
  const posClass = side === "left" ? "left-0 top-0" : "right-0 top-0";

  useEffect(() => {
    if (!raysRef.current) return;
    const els = raysRef.current.querySelectorAll<HTMLElement>(".ray-beam");
    const tls: gsap.core.Tween[] = [];

    els.forEach((el, i) => {
      const base = parseFloat(el.dataset.baseOpacity ?? "0.2");
      const tween = gsap.to(el, {
        opacity: base * (0.45 + Math.random() * 0.55),
        duration: 2.5 + i * 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.28,
      });
      tls.push(tween);
    });

    return () => tls.forEach(t => t.kill());
  }, []);

  return (
    <div
      ref={raysRef}
      className={`pointer-events-none absolute ${posClass} w-[55vw] h-[80vh] overflow-hidden`}
      style={{ zIndex: 1 }}
    >
      {rays.map((ray, i) => (
        <div
          key={i}
          className="ray-beam absolute"
          data-base-opacity={ray.opacity}
          style={{
            opacity: ray.opacity,
            width: `${ray.width}px`,
            height: "200vh",
            transformOrigin: originX,
            transform: `rotate(${ray.angle}deg)`,
            top: 0,
            left: side === "left" ? 0 : "auto",
            right: side === "right" ? 0 : "auto",
            background:
              side === "left"
                ? `linear-gradient(to bottom, rgba(201,184,236,0.55) 0%, rgba(169,191,242,0.2) 45%, transparent 100%)`
                : `linear-gradient(to bottom, rgba(169,191,242,0.55) 0%, rgba(201,184,236,0.2) 45%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!headlineRef.current || !compositionRef.current) return;

    const ctx = gsap.context(() => {
      const text = new SplitType(headlineRef.current!, { types: "words" });

      gsap.fromTo(
        text.words,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.2 }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          y: index % 2 === 0 ? `+=${4 + index * 2}` : `-=${4 + index * 2}`,
          duration: 4 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      });

      gsap.fromTo(
        compositionRef.current,
        { scale: 0.82, rotateX: 8 },
        {
          scale: 1.1,
          rotateX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: compositionRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen pt-36 pb-20 flex flex-col items-center justify-center overflow-hidden">

      {/* Corner light rays */}
      <CornerRays side="left" />
      <CornerRays side="right" />

      {/* Hero content */}
      <div className="max-w-[880px] w-full px-6 flex flex-col items-center text-center z-10 relative">
        <div className="mb-6 px-4 py-1.5 rounded-full bg-[#E3D9F7] text-[#9C7FDB] font-mono text-xs font-semibold tracking-[0.14em] uppercase">
          ✦ AI-POWERED EXAMINATION PLATFORM
        </div>

        <h1
          ref={headlineRef}
          className="text-[44px] md:text-[96px] font-display font-bold text-[#1E1B24] leading-[1.02] tracking-[-0.025em] mb-8"
        >
          Exams, reimagined<br />by intelligence.
        </h1>

        <p className="max-w-[620px] text-[17px] md:text-[21px] text-[#5C5868] leading-[1.6] mb-10">
          AI-generated question papers, real-time invigilation, and instant,
          bias-free results — all inside one secure platform built for the
          next generation of academic integrity.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <MagneticButton
            href="/login"
            className="bg-[#4A63C9] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold shadow-[0_8px_24px_rgba(74,99,201,0.35)] hover:bg-[#3d54b3] transition-colors"
            data-testid="button-get-started-hero"
          >
            Get Started Free
          </MagneticButton>
          <MagneticButton
            className="glass-card text-[#1E1B24] px-7 py-3.5 rounded-full text-[15px] font-semibold flex items-center gap-2 hover:bg-[rgba(255,255,255,0.7)] transition-colors"
            data-testid="button-watch-film"
          >
            <span className="text-[10px]">▶</span> Watch the Film
          </MagneticButton>
        </div>

        <div className="font-mono text-[13px] text-[#5C5868] uppercase tracking-widest">
          TRUSTED BY 40+ INSTITUTIONS · 12,000+ STUDENTS PROCTORED
        </div>
      </div>

      {/* Hero card composition */}
      <div
        className="mt-16 w-full max-w-5xl px-6 relative z-10"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={compositionRef}
          className="relative w-full aspect-[16/10] md:aspect-[21/9] mx-auto"
        >
          {/* Primary Card */}
          <div
            ref={el => { if(el) cardsRef.current[0] = el; }}
            className="absolute inset-0 glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6 transform origin-center shadow-2xl z-10"
            style={{ transform: "rotateY(-4deg)" }}
          >
            <div className="w-full md:w-1/2 border-r border-[rgba(30,27,36,0.1)] pr-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-sm font-semibold text-[#5C5868]">Question 4 of 20</span>
                <span className="font-mono text-sm text-[#4A63C9] font-semibold bg-[#A9BFF2]/30 px-3 py-1 rounded-full">
                  01:23:45
                </span>
              </div>
              <div className="h-1 bg-[rgba(30,27,36,0.1)] rounded-full mb-8">
                <div className="h-full bg-[#4A63C9] rounded-full w-1/5" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-4 text-[#1E1B24]">
                Explain the key differences between photosynthesis in C3 and C4 plants.
              </h3>
              <p className="text-sm text-[#5C5868]">
                Include details on their carbon fixation pathways, anatomical adaptations,
                and efficiency under different environmental conditions.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex-1 bg-white/40 rounded-xl p-4 border border-white/60 shadow-inner">
                <p className="font-mono text-sm text-[#1E1B24] leading-relaxed">
                  C3 plants fix carbon directly using the Calvin cycle, where the first stable product is a 3-carbon compound...
                  <span className="inline-block w-2 h-4 bg-[#4A63C9] ml-1 animate-pulse" />
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Card — AI Invigilator */}
          <div
            ref={el => { if(el) cardsRef.current[1] = el; }}
            className="absolute -top-8 -right-4 md:-right-12 w-64 glass-card p-4 z-20 flex flex-col gap-3 shadow-xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E3D9F7] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[#9C7FDB] rounded-full animate-ping opacity-20" />
                <div className="w-3 h-3 bg-[#9C7FDB] rounded-full" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1E1B24]">Gaze OK</div>
                <div className="text-xs text-[#5C5868]">AI Invigilator Active</div>
              </div>
            </div>
            <div className="bg-[#FAF6EE]/80 rounded-lg p-2 flex items-center gap-2 text-xs font-mono text-[#5C5868]">
              <span className="text-[#4A63C9]">shield_ok</span> No violations detected
            </div>
          </div>

          {/* Tertiary Card — Score */}
          <div
            ref={el => { if(el) cardsRef.current[2] = el; }}
            className="absolute -bottom-6 -left-4 md:-left-8 w-56 glass-card p-5 z-20 shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#4A63C9]" />
            <div className="flex justify-between items-start mb-2">
              <div className="font-mono text-[10px] uppercase font-bold text-[#4A63C9] tracking-wider">
                AI Evaluated
              </div>
              <div className="text-xs text-[#5C5868] flex items-center gap-1">3.2s</div>
            </div>
            <div className="font-display text-4xl font-bold text-[#1E1B24] mt-2">
              92<span className="text-xl text-[#5C5868] font-medium">/100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
