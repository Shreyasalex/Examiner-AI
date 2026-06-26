'use client';

import React from 'react';
import { StudentProvider } from './context/StudentContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { GradientMesh } from '@/components/GradientMesh';
import { Particles } from '@/components/Particles';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudentProvider>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-3 md:p-6 lg:p-8 bg-[#FAF6EE] dark:bg-[#131315]">
        {/* Signature drift backgrounds */}
        <GradientMesh />
        <div className="fixed inset-0 grid-pattern pointer-events-none z-[-5]" />
        <Particles />

        {/* Big Glass Card - shell centering with gap */}
        <div
          className="relative z-10 w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] max-w-7xl rounded-[28px] flex overflow-hidden border border-white/70 bg-white/60 backdrop-blur-[28px] shadow-[0_24px_80px_-20px_rgba(80,60,120,0.22),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:bg-[#131315]/50 dark:border-white/10 dark:shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Context Header */}
            <Header />

            {/* Sub-view Content Panel */}
            <main className="flex-1 overflow-y-auto p-5 md:p-8 no-scrollbar relative select-text">
              {children}
            </main>
          </div>
        </div>
      </div>
    </StudentProvider>
  );
}
