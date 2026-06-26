'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Image from "next/image";
import { GradientMesh } from "@/components/GradientMesh";
import { Particles } from "@/components/Particles";

type Tab = "student" | "faculty";

function LoginForm({ role }: { role: Tab }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [email, setEmail] = useState("student@examiner.ai");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const label = role === "student" ? "Student" : "Faculty";

  useEffect(() => {
    setEmail(role === "student" ? "student@examiner.ai" : "faculty@examiner.ai");
    setPassword("password");
    setError("");
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (role === "student") {
      if (email === "student@examiner.ai" && password === "password") {
        router.push("/student");
      } else {
        setError("Invalid credentials. Use email: student@examiner.ai & password: password");
      }
    } else {
      if (email === "faculty@examiner.ai" && password === "password") {
        router.push("/faculty");
      } else {
        setError("Invalid credentials. Use email: faculty@examiner.ai & password: password");
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="p-3 rounded-xl bg-[#C1493D]/10 border border-[#C1493D]/20 text-[#C1493D] text-[12.5px] font-medium text-center">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C7FDB]" />
        <input
          type="email"
          placeholder={`${label} email address`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-[rgba(201,184,236,0.4)] text-[#1E1B24] text-[14px] placeholder:text-[#5C5868]/60 focus:outline-none focus:border-[#9C7FDB] focus:bg-white/70 transition-all duration-200"
          data-testid={`input-email-${role}`}
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C7FDB]" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/50 border border-[rgba(201,184,236,0.4)] text-[#1E1B24] text-[14px] placeholder:text-[#5C5868]/60 focus:outline-none focus:border-[#9C7FDB] focus:bg-white/70 transition-all duration-200"
          data-testid={`input-password-${role}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5C5868] hover:text-[#1E1B24] transition-colors"
          data-testid={`button-toggle-password-${role}`}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Keep signed in + forgot password */}
      <div className="flex items-center justify-between mt-0.5">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            onClick={() => setKeepSignedIn(!keepSignedIn)}
            className="w-4 h-4 rounded border border-[rgba(201,184,236,0.6)] flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: keepSignedIn ? "#4A63C9" : "rgba(255,255,255,0.5)",
              borderColor: keepSignedIn ? "#4A63C9" : "rgba(201,184,236,0.6)",
            }}
            data-testid={`checkbox-keep-signed-in-${role}`}
          >
            {keepSignedIn && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-[13px] text-[#5C5868] select-none">Keep me signed in</span>
        </label>
        <button
          type="button"
          className="text-[13px] text-[#4A63C9] hover:text-[#3d54b3] font-medium transition-colors"
          data-testid={`link-forgot-password-${role}`}
        >
          Forgot password?
        </button>
      </div>

      {/* Login button */}
      <button
        type="submit"
        className="w-full mt-2 py-3.5 rounded-xl bg-[#4A63C9] text-white font-semibold text-[15px] hover:bg-[#3d54b3] transition-all duration-200 shadow-[0_6px_24px_rgba(74,99,201,0.35)] hover:shadow-[0_8px_28px_rgba(74,99,201,0.42)] hover:-translate-y-px"
        data-testid={`button-login-${role}`}
      >
        Login as {label}
      </button>
    </form>
  );
}

export default function Login() {
  const [activeTab, setActiveTab] = useState<Tab>("student");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <GradientMesh />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-[-5]" />
      <Particles />

      {/* Back to home */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-[13px] font-medium text-[#5C5868] hover:text-[#1E1B24] transition-colors"
        data-testid="link-back-home"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </Link>

      {/* Login card */}
      <div
        className="relative z-10 w-full max-w-[420px] mx-6 rounded-3xl px-8 py-9"
        style={{
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(28px) saturate(150%)",
          WebkitBackdropFilter: "blur(28px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 24px 80px -20px rgba(80,60,120,0.22), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="mb-5">
            <Image
              src="/logo.png"
              alt="Examiner AI Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="font-display font-bold text-[22px] text-[#1E1B24] tracking-tight text-center">
            Welcome back
          </h1>
          <p className="text-[14px] text-[#5C5868] mt-1.5 text-center">
            Sign in to your Examiner AI dashboard
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="flex rounded-xl p-1 mb-7"
          style={{ background: "rgba(227,217,247,0.4)" }}
        >
          {(["student", "faculty"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-[13.5px] font-semibold transition-all duration-250"
              style={{
                background: activeTab === tab ? "white" : "transparent",
                color: activeTab === tab ? "#1E1B24" : "#5C5868",
                boxShadow: activeTab === tab ? "0 2px 8px rgba(80,60,120,0.12)" : "none",
              }}
              data-testid={`tab-${tab}`}
            >
              {tab === "student" ? "Student" : "Faculty"}
            </button>
          ))}
        </div>

        {/* Form */}
        <LoginForm role={activeTab} />

        {/* Footer */}
        <p className="text-center text-[12px] text-[#5C5868]/70 mt-6">
          Having trouble?{" "}
          <a href="mailto:support@examinerai.com" className="text-[#4A63C9] hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
