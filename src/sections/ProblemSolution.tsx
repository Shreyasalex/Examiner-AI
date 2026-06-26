'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const listItems = [
  "Manual question setting",
  "Subjective evaluation",
  "Delayed results",
  "Siloed academic data",
];

export function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const missionTextRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headlineRef.current || !missionTextRef.current || !statsRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Headline word entrance (triggers on entry)
      const headSplit = new SplitType(headlineRef.current!, { types: "words" });
      gsap.fromTo(
        headSplit.words,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.04,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Split mission text
      const missionSplit = new SplitType(missionTextRef.current!, { types: "words" });

      // 3. Main Scroll Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=160%", // Pin duration
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
        }
      });

      // A. Legacy list items animated crossing out
      listItems.forEach((_, i) => {
        const itemEl = containerRef.current!.querySelectorAll(".strike-line")[i];
        const textWrapper = containerRef.current!.querySelectorAll(".text-span")[i];
        
        tl.to(itemEl, { scaleX: 1, duration: 0.45, ease: "power1.inOut" }, i * 0.22);
        tl.to(textWrapper, { opacity: 0.4, duration: 0.45 }, i * 0.22);
      });

      // B. Staggered mission text reveal
      tl.fromTo(
        missionSplit.words,
        { opacity: 0.1, color: "#9C7FDB" },
        {
          opacity: 1,
          color: "#1E1B24",
          stagger: 0.06,
          duration: 1.8,
          ease: "none",
        },
        "+=0.2"
      );

      // C. Pop in stats pills
      const pills = statsRef.current!.children;
      tl.fromTo(
        pills,
        { opacity: 0, scale: 0.9, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "+=0.1"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 relative z-10 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">

        {/* Section label */}
        <div className="mb-4 px-3 py-1 inline-block rounded-full bg-[#E3D9F7]/50 text-[#9C7FDB] font-mono text-xs font-semibold tracking-[0.14em] uppercase">
          THE PROBLEM
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[34px] md:text-[60px] font-display font-semibold text-[#1E1B24] leading-[1.08] tracking-[-0.02em] mb-16 max-w-2xl"
        >
          {"Exams haven't changed in 50 years. Everything else has."}
        </h2>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">
          
          {/* Left — Legacy items (crossed out on scroll) */}
          <div className="flex flex-col gap-6 justify-center">
            {listItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-[#5C5868] text-xl font-medium relative py-1"
              >
                <span className="text-[#9C7FDB] text-lg font-bold select-none">✗</span>
                <span className="text-span relative inline-block text-ink-900 transition-opacity duration-300">
                  {item}
                  {/* Custom Strikethrough line overlay */}
                  <span className="strike-line absolute left-0 right-0 top-[55%] h-[2.5px] bg-[#9C7FDB] origin-left scale-x-0 pointer-events-none rounded" />
                </span>
              </div>
            ))}
          </div>

          {/* Right — mission text inside glass card */}
          <div
            className="flex items-center rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(22px) saturate(140%)",
              WebkitBackdropFilter: "blur(22px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.62)",
              boxShadow: "0 16px 48px -16px rgba(80,60,120,0.2)",
            }}
          >
            <p
              ref={missionTextRef}
              className="text-[20px] md:text-[26px] font-display font-medium leading-[1.5] text-[#1E1B24]"
            >
              Examiner AI unifies question generation, secure conduction, evaluation, and invigilation into one AI-native platform — built so every exam is fair, fast, and fully accountable.
            </p>
          </div>
        </div>

        {/* Stat pills */}
        <div
          ref={statsRef}
          className="flex flex-wrap gap-3 pt-8 border-t border-[rgba(30,27,36,0.06)]"
        >
          {[
            "~70% less faculty workload",
            "Results in hours, not weeks",
            "0 raw video ever stored",
          ].map((stat, i) => (
            <div
              key={i}
              className="px-5 py-2.5 rounded-full text-[#1E1B24] font-medium text-[14px]"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(201,184,236,0.4)",
                boxShadow: "0 4px 12px -4px rgba(80,60,120,0.12)",
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProblemSolution;
