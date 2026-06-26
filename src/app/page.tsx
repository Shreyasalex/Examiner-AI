'use client';

import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";
import { GradientMesh } from "@/components/GradientMesh";
import { Particles } from "@/components/Particles";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { VideoDemo } from "@/sections/VideoDemo";
import { ProblemSolution } from "@/sections/ProblemSolution";
import { StudentFeatures } from "@/sections/StudentFeatures";
import { FacultyFeatures } from "@/sections/FacultyFeatures";
import { ExamWorkflow } from "@/sections/ExamWorkflow";
import { CTALogin } from "@/sections/CTALogin";
import { Footer } from "@/sections/Footer";

export default function Landing() {
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen selection:bg-[#C9B8EC] selection:text-[#1E1B24]">
      <GradientMesh />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-[-5]" />

      <Particles />
      <Navbar />


      {/* Ambient background floating shapes */}
      <div className="absolute top-[120vh] left-[-20vw] w-[60vw] h-[60vw] rounded-full bg-[#E3D9F7]/12 blur-[130px] pointer-events-none z-[-2] animate-floatSlow" />
      <div className="absolute top-[320vh] right-[-20vw] w-[50vw] h-[50vw] rounded-full bg-[#A9BFF2]/10 blur-[130px] pointer-events-none z-[-2] animate-floatSlowReverse" />
      <div className="absolute top-[520vh] left-[-15vw] w-[55vw] h-[55vw] rounded-full bg-[#E3D9F7]/8 blur-[120px] pointer-events-none z-[-2] animate-floatSlow" />

      <div id="overview">
        <Hero />
        <VideoDemo />
        <ProblemSolution />
      </div>

      <div id="students">
        <StudentFeatures />
      </div>

      <div id="faculty">
        <FacultyFeatures />
      </div>

      <div id="workflow">
        <ExamWorkflow />
      </div>

      <CTALogin />
      <Footer />
    </main>
  );
}
