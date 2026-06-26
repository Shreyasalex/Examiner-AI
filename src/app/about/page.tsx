'use client';

import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { GradientMesh } from "@/components/GradientMesh";
import { Particles } from "@/components/Particles";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/sections/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#FAF6EE] font-sans selection:bg-[#C9B8EC] selection:text-[#1E1B24]">
      <GradientMesh />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-[-5]" />
      <Particles />
      <Navbar />

      {/* Content wrapper */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 relative z-10">
        
        {/* Back Link */}
        <div className="w-full max-w-3xl mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#5C5868] hover:text-[#1E1B24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Glass Card */}
        <div
          className="w-full max-w-3xl rounded-3xl p-8 md:p-12"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 24px 80px -20px rgba(80,60,120,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {/* Headline */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(227,217,247,0.8)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <Sparkles className="w-5 h-5 text-[#4A63C9]" />
            </div>
            <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[#9C7FDB] uppercase">
              ABOUT US
            </span>
          </div>

          <h1 className="font-display font-bold text-[36px] md:text-[48px] text-[#1E1B24] leading-[1.1] tracking-[-0.02em] mb-8">
            Exams, Reimagined by Intelligence.
          </h1>

          <div className="space-y-6 text-[#5C5868] text-base md:text-lg leading-[1.6]">
            <p>
              Examiner AI is built to bring security, efficiency, and academic integrity to the modern digital testing space. Our platform combines automated question generation, real-time secure proctoring, and instant evaluations into a single, seamless, bias-free workflow.
            </p>
            <p>
              We believe that examinations should be a fair measure of understanding, not a test of surveillance endurance. By replacing intrusive, black-box monitoring with calm, privacy-first intelligence, we empower both faculty and students to focus on what matters most: academic excellence.
            </p>
            <p>
              Trusted by institutions globally, Examiner AI is paving the way for a more accountable, accessible, and dignified educational future.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[rgba(30,27,36,0.08)]">
            <div>
              <div className="text-[24px] md:text-[32px] font-display font-bold text-[#1E1B24] tracking-tight">
                99.8%
              </div>
              <div className="text-xs font-medium text-[#5C5868]/70 mt-1 uppercase font-mono tracking-wider">
                Accuracy Rate
              </div>
            </div>
            <div>
              <div className="text-[24px] md:text-[32px] font-display font-bold text-[#1E1B24] tracking-tight">
                3M+
              </div>
              <div className="text-xs font-medium text-[#5C5868]/70 mt-1 uppercase font-mono tracking-wider">
                Exams Graded
              </div>
            </div>
            <div>
              <div className="text-[24px] md:text-[32px] font-display font-bold text-[#1E1B24] tracking-tight">
                70%
              </div>
              <div className="text-xs font-medium text-[#5C5868]/70 mt-1 uppercase font-mono tracking-wider">
                Time Saved
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
