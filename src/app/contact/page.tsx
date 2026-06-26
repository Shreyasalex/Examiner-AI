'use client';

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle2 } from "lucide-react";
import { GradientMesh } from "@/components/GradientMesh";
import { Particles } from "@/components/Particles";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/sections/Footer";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSending(true);

    // Simulate sending network request
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#FAF6EE] font-sans selection:bg-[#C9B8EC] selection:text-[#1E1B24]">
      <GradientMesh />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-[-5]" />
      <Particles />
      <Navbar />

      {/* Content wrapper */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 relative z-10">
        
        {/* Back Link */}
        <div className="w-full max-w-4xl mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#5C5868] hover:text-[#1E1B24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Two-Column Contact Card */}
        <div
          className="w-full max-w-4xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            border: "1px solid rgba(255,255,255,0.65)",
            boxShadow: "0 24px 80px -20px rgba(80,60,120,0.18), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {/* Left panel: Info */}
          <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-[rgba(227,217,247,0.35)] border-r border-[rgba(255,255,255,0.5)]">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[#9C7FDB] uppercase">
                  CONTACT US
                </span>
              </div>
              <h2 className="font-display font-bold text-[30px] md:text-[38px] text-[#1E1B24] leading-[1.1] tracking-[-0.02em]">
                Get in touch with us.
              </h2>
              <p className="text-sm md:text-base text-[#5C5868] leading-[1.6]">
                Have questions about custom plans, academic integrations, or platform features? Send us a message and our team will get back to you shortly.
              </p>
            </div>

            {/* Info details */}
            <div className="space-y-6 mt-12 md:mt-0 pt-6 md:pt-0 border-t border-[rgba(30,27,36,0.06)] md:border-t-0">
              <div className="flex items-center gap-4 text-[#5C5868]">
                <div className="w-10 h-10 rounded-xl bg-white/60 border border-[rgba(201,184,236,0.4)] flex items-center justify-center text-[#4A63C9] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/60">Email</div>
                  <a href="mailto:hello@examinerai.com" className="text-sm font-semibold hover:text-[#4A63C9] transition-colors">hello@examinerai.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#5C5868]">
                <div className="w-10 h-10 rounded-xl bg-white/60 border border-[rgba(201,184,236,0.4)] flex items-center justify-center text-[#4A63C9] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/60">Phone</div>
                  <a href="tel:+15550192831" className="text-sm font-semibold hover:text-[#4A63C9] transition-colors">+1 (555) 019-2831</a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[#5C5868]">
                <div className="w-10 h-10 rounded-xl bg-white/60 border border-[rgba(201,184,236,0.4)] flex items-center justify-center text-[#4A63C9] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/60">Location</div>
                  <span className="text-sm font-semibold">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Form */}
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="flex flex-col items-center text-center py-10 animate-scaleIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#1E1B24] mb-2">Message Sent!</h3>
                <p className="text-[#5C5868] text-sm max-w-sm">
                  Thank you for reaching out. We will review your message and reply as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-xs font-semibold text-[#4A63C9] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-[12px] font-mono uppercase tracking-wider text-[#5C5868]/70">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C7FDB]" />
                    <input
                      id="email-input"
                      type="email"
                      required
                      placeholder="you@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-[rgba(201,184,236,0.4)] text-[#1E1B24] text-[14px] placeholder:text-[#5C5868]/60 focus:outline-none focus:border-[#9C7FDB] focus:bg-white/70 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message-input" className="text-[12px] font-mono uppercase tracking-wider text-[#5C5868]/70">
                    Message
                  </label>
                  <textarea
                    id="message-input"
                    required
                    rows={5}
                    placeholder="Describe how we can help your campus..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/50 border border-[rgba(201,184,236,0.4)] text-[#1E1B24] text-[14px] placeholder:text-[#5C5868]/60 focus:outline-none focus:border-[#9C7FDB] focus:bg-white/70 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending || !email || !message}
                  className="w-full py-3.5 rounded-xl bg-[#4A63C9] text-white font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-[#3d54b3] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_6px_24px_rgba(74,99,201,0.25)] hover:shadow-[0_8px_28px_rgba(74,99,201,0.35)] hover:-translate-y-px"
                >
                  {isSending ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </main>

      <Footer />

      <style>{`
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
