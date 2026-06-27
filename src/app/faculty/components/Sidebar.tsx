'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useFaculty, FACULTY_AVATAR_PRESETS } from '../context/FacultyContext';
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  BookOpen,
  Sparkles,
  ClipboardList,
  BarChart3,
  ShieldAlert,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const { profile, avatarIndex } = useFaculty();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/faculty', icon: LayoutDashboard },
    { name: 'My Classes', href: '/faculty/classes', icon: Users },
    { name: 'Assignments & Projects', href: '/faculty/assignments', icon: FileCheck2 },
    { name: 'Study Materials', href: '/faculty/materials', icon: BookOpen },
    { name: 'Question Generator', href: '/faculty/question-generator', icon: Sparkles },
    { name: 'Exams', href: '/faculty/exams', icon: ClipboardList },
    { name: 'Evaluation & Results', href: '/faculty/evaluation', icon: BarChart3 },
    { name: 'Violation Review', href: '/faculty/violations', icon: ShieldAlert },
  ];

  const handleLogOut = () => {
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#FAF6EE] dark:bg-[#16141C] border border-[#E3D5BC]/50 dark:border-white/10 text-[#1E1B24] dark:text-[#EDEAF2] backdrop-blur-md shadow-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#F2EBE0] dark:bg-[#1D1A24] border-r border-[#E3D5BC]/50 dark:border-white/10 flex flex-col p-5 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-full lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Wordmark Logo */}
        <div className="flex items-center gap-3 mb-5 mt-2 px-1">
          <Image
            src="/logo.png"
            alt="Examiner AI Logo"
            width={36}
            height={36}
            className="object-contain shrink-0"
          />
          <div>
            <h1 className="font-display font-bold text-[18px] text-[#1E1B24] dark:text-[#EDEAF2] leading-none tracking-tight">
              EXAMINER AI
            </h1>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block mt-0.5">
              Faculty Command
            </span>
          </div>
        </div>

        {/* Mini Profile Card */}
        <div className="mb-5 p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/5 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl border border-white dark:border-white/10 shrink-0 shadow-inner"
            style={{ background: FACULTY_AVATAR_PRESETS[avatarIndex] }}
          />
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-[#1E1B24] dark:text-[#EDEAF2] truncate">
              {profile.name}
            </p>
            <p className="text-[11px] text-[#5C5868] dark:text-[#9591A3] truncate mt-0.5">
              Dept: CSE · Faculty
            </p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-all duration-200 relative ${
                  isActive
                    ? 'bg-[#E3D9F7] dark:bg-[#E3D9F7]/10 text-[#4A63C9] dark:text-[#B5C7E8] shadow-[0_4px_16px_rgba(156,127,219,0.1)] border-l-4 border-[#4A63C9]'
                    : 'text-[#5C5868] dark:text-[#9591A3] hover:bg-white/50 dark:hover:bg-white/5 hover:text-[#1E1B24] dark:hover:text-[#EDEAF2]'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-[#4A63C9] dark:text-[#B5C7E8]' : ''}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-3 border-t border-[#E3D5BC]/50 dark:border-white/10" />

        {/* Bottom items */}
        <div className="space-y-1">
          <Link
            href="/faculty/help"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-all duration-200 ${
              pathname === '/faculty/help'
                ? 'bg-[#E3D9F7] dark:bg-[#E3D9F7]/10 text-[#4A63C9] dark:text-[#B5C7E8]'
                : 'text-[#5C5868] dark:text-[#9591A3] hover:bg-white/50 dark:hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-[18px] h-[18px] shrink-0" />
            <span>Help & Support</span>
          </Link>

          <Link
            href="/faculty/settings"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[13.5px] font-semibold transition-all duration-200 ${
              pathname === '/faculty/settings'
                ? 'bg-[#E3D9F7] dark:bg-[#E3D9F7]/10 text-[#4A63C9] dark:text-[#B5C7E8]'
                : 'text-[#5C5868] dark:text-[#9591A3] hover:bg-white/50 dark:hover:bg-white/5'
            }`}
          >
            <Settings className="w-[18px] h-[18px] shrink-0" />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => setShowLogOutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-[13.5px] font-semibold text-[#C1493D] hover:bg-[#FBE4E1] dark:hover:bg-[#C1493D]/10 transition-colors text-left"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Log Out Confirm Modal */}
      {showLogOutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF6EE] dark:bg-[#16141C] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-display font-bold text-[18px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Confirm Log Out
            </h3>
            <p className="text-[13px] text-[#5C5868] dark:text-[#9591A3] mt-2 leading-relaxed">
              Are you sure you want to end your current session? Any unsaved edits will be discarded.
            </p>
            <div className="flex gap-3 justify-end mt-5">
              <button
                onClick={() => setShowLogOutModal(false)}
                className="px-4 py-2 rounded-xl bg-[#E3D5BC]/30 dark:bg-white/5 hover:bg-[#E3D5BC]/50 text-[#1E1B24] dark:text-[#EDEAF2] text-[12.5px] font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 rounded-xl bg-[#C1493D] hover:bg-[#a83e34] text-white text-[12.5px] font-semibold transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
