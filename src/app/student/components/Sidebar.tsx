'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useStudent, AVATAR_PRESETS } from '../context/StudentContext';
import { LayoutDashboard, CalendarRange, ClipboardList, BookOpen, Coins, ShieldAlert, GraduationCap, FolderOpen, Settings, LogOut, Menu, X, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  const { profile, avatarIndex } = useStudent();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Command Center', href: '/student', icon: LayoutDashboard },
    { name: 'Timetable', href: '/student/timetable', icon: CalendarRange },
    { name: 'Assignments & Submissions', href: '/student/assignments', icon: ClipboardList },
    { name: 'Study Materials', href: '/student/materials', icon: BookOpen },
    { name: 'Payments & Registrations', href: '/student/payments', icon: Coins },
    { name: 'Examinations', href: '/student/exams', icon: ShieldAlert },
    { name: 'Results & Performance', href: '/student/academics', icon: GraduationCap },
    { name: 'Documents', href: '/student/documents', icon: FolderOpen },
    { name: 'Settings', href: '/student/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white/80 dark:bg-black/50 border border-white/40 dark:border-white/10 text-[#1E1B24] dark:text-white backdrop-blur-md shadow-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#F2EBE0]/90 dark:bg-[#131315]/95 border-r border-[#E3D5BC] dark:border-white/10 flex flex-col p-5 transition-transform duration-300 backdrop-blur-xl lg:translate-x-0 lg:static lg:h-full lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Wordmark */}
        <div className="flex items-center gap-3 mb-5 mt-2 px-1">
          <Image
            src="/logo.png"
            alt="Examiner AI Logo"
            width={36}
            height={36}
            className="object-contain shrink-0"
          />
          <div>
            <h1 className="font-display font-bold text-[18px] text-[#1E1B24] dark:text-white leading-none tracking-tight">
              EXAMINER AI
            </h1>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50 block mt-0.5">
              Student Command
            </span>
          </div>
        </div>

        {/* Mini Profile Card */}
        <div className="mb-5 p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl border border-white dark:border-white/10 shrink-0 shadow-inner"
            style={{ background: AVATAR_PRESETS[avatarIndex] }}
          />
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-[#1E1B24] dark:text-white truncate">
              {profile.name}
            </p>
            <p className="text-[11px] text-[#5C5868] dark:text-[#E4E2E4]/60 truncate mt-0.5">
              {profile.department} · {profile.semester}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#4A63C9] text-white shadow-[0_4px_16px_rgba(74,99,201,0.25)] dark:shadow-[0_4px_16px_rgba(74,99,201,0.4)]'
                    : 'text-[#5C5868] dark:text-[#E4E2E4]/70 hover:bg-white/50 dark:hover:bg-white/5 hover:text-[#1E1B24] dark:hover:text-white'
                }`}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Help & Support & Logout */}
        <div className="pt-3 border-t border-[#E3D5BC]/50 dark:border-white/10 space-y-1">
          <Link
            href="/student/help"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all ${
              pathname === '/student/help'
                ? 'bg-[#4A63C9] text-white shadow-md'
                : 'text-[#5C5868] dark:text-[#E4E2E4]/70 hover:bg-white/50 dark:hover:bg-white/5 hover:text-[#1E1B24] dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-[18px] h-[18px] shrink-0" />
            <span>Help & Support</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-[13.5px] font-medium text-[#C1493D] hover:bg-[#FBE4E1]/50 dark:hover:bg-[#C1493D]/10 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
