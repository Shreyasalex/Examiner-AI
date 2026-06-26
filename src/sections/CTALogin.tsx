'use client';

import { MagneticButton } from "@/components/MagneticButton";

const INSTITUTIONS = [
  "IIT Bombay", "MIT Cambridge", "Oxford University", "NUS Singapore",
  "IIT Delhi", "BITS Pilani", "University of Melbourne", "IIT Madras",
  "UCL London", "IISc Bangalore", "Monash University", "IIT Kharagpur",
  "University of Toronto", "VIT Vellore", "RMIT University", "Manipal Academy",
];

export function CTALogin() {
  const doubled = [...INSTITUTIONS, ...INSTITUTIONS];

  return (
    <section
      id="cta"
      className="relative py-40 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Soft ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,184,236,0.3) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 20% 80%, rgba(169,191,242,0.25) 0%, transparent 60%)
          `,
        }}
      />

      {/* Glass card wrapper */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center px-10 py-16 md:px-20 md:py-24 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.42)",
          backdropFilter: "blur(28px) saturate(150%)",
          WebkitBackdropFilter: "blur(28px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.65)",
          boxShadow: "0 24px 80px -20px rgba(80,60,120,0.2), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      >
        <h2 className="text-[44px] md:text-[64px] font-display font-bold text-[#1E1B24] leading-[1.02] tracking-[-0.025em] mb-5">
          Ready to step in?
        </h2>
        <p className="text-[18px] md:text-[20px] text-[#5C5868] mb-12 max-w-md leading-[1.6]">
          Sign in to your student, faculty, or admin dashboard.
        </p>

        {/* Institution ticker */}
        <div className="w-full mb-10 overflow-hidden">
          <div className="font-mono text-[10px] text-[#9C7FDB] uppercase tracking-[0.14em] mb-3 text-center">
            Trusted by
          </div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(255,255,255,0.5), transparent)", zIndex: 2 }} />
            <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(255,255,255,0.5), transparent)", zIndex: 2 }} />
            <div
              className="flex gap-6 whitespace-nowrap"
              style={{ animation: "tickerScroll 32s linear infinite" }}
            >
              {doubled.map((name, i) => (
                <div key={i} className="flex items-center gap-6 shrink-0">
                  <span className="font-mono text-[12px] font-medium text-[#5C5868] tracking-wide">{name}</span>
                  <span className="text-[#C9B8EC] text-[10px]">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <MagneticButton
          href="/login"
          className="bg-[#4A63C9] text-white px-10 py-4 rounded-full text-[16px] font-semibold shadow-[0_8px_32px_rgba(74,99,201,0.4)] hover:bg-[#3d54b3] transition-colors"
          data-testid="button-cta-login"
        >
          Login to Examiner AI
        </MagneticButton>
      </div>

      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

export default CTALogin;
