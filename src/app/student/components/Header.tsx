'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useStudent, AVATAR_PRESETS } from '../context/StudentContext';
import { Bell, ShieldAlert, GraduationCap, Wallet, HelpCircle } from 'lucide-react';

interface AlertItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'exam' | 'academics' | 'financial';
}

export default function Header() {
  const pathname = usePathname();
  const { avatarIndex } = useStudent();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 'a1',
      title: 'Advanced Algorithms Exam',
      desc: 'Syllabus updated. Exam scheduled for Thursday at 09:00 AM.',
      time: '10m ago',
      read: false,
      type: 'exam'
    },
    {
      id: 'a2',
      title: 'Discrete Mathematics Grade Published',
      desc: 'Assignment #4 graded by AI proctor. Score: 98/100.',
      time: '2h ago',
      read: false,
      type: 'academics'
    },
    {
      id: 'a3',
      title: 'Tuition Invoice Generated',
      desc: 'Semester 5 Tuition Invoice EX-029 is now available for payment.',
      time: '1d ago',
      read: true,
      type: 'financial'
    }
  ]);

  // Click outside to close notification panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const getPageInfo = () => {
    switch (pathname) {
      case '/student/exams':
        return { title: 'Examinations Hub', icon: ShieldAlert, breadcrumbs: ['Examinations'] };
      case '/student/academics':
        return { title: 'Academics & Evaluations', icon: GraduationCap, breadcrumbs: ['Academics'] };
      case '/student/vault':
        return { title: 'Financial Vault', icon: Wallet, breadcrumbs: ['Financial Vault'] };
      case '/student/settings':
        return { title: 'Settings & Security', icon: SettingsIcon, breadcrumbs: ['Settings'] };
      default:
        return { title: 'Command Center', icon: DashboardIcon, breadcrumbs: ['Overview'] };
    }
  };

  const SettingsIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const DashboardIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );

  const { title, breadcrumbs } = getPageInfo();

  return (
    <header className="h-16 border-b border-[#E3D5BC]/50 dark:border-white/10 flex items-center justify-between px-6 shrink-0 relative bg-white/20 dark:bg-black/10">
      {/* Page Info / Breadcrumbs */}
      <div className="flex flex-col select-none">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
          <span>Student Portal</span>
          <span>/</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb}>
              <span className={idx === breadcrumbs.length - 1 ? 'text-[#4A63C9] dark:text-[#B5C7E8]' : ''}>
                {crumb}
              </span>
              {idx < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>
        <h2 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white leading-none mt-1">
          {title}
        </h2>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Help Link */}
        <a
          href="mailto:support@examinerai.com"
          className="hidden md:flex items-center gap-1.5 text-[13px] text-[#5C5868] dark:text-[#E4E2E4]/70 hover:text-[#1E1B24] dark:hover:text-white transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support SLA</span>
        </a>

        <div className="h-4 w-[1px] bg-[#E3D5BC]/50 dark:border-white/10 hidden md:block" />

        {/* Notifications Panel */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/40 dark:hover:bg-white/5 text-[#5C5868] dark:text-[#E4E2E4]/80 hover:text-[#1E1B24] dark:hover:text-white transition-all relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#C1493D] shadow-sm animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#E3D5BC] dark:border-white/10 bg-white/95 dark:bg-[#131315]/95 shadow-xl backdrop-blur-2xl py-3 z-50 text-[13px]">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-[#E3D5BC]/50 dark:border-white/10">
                <span className="font-bold text-[#1E1B24] dark:text-white">Recent Updates</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-semibold text-[#4A63C9] dark:text-[#B5C7E8] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-[280px] overflow-y-auto divide-y divide-[#E3D5BC]/30 dark:divide-white/5">
                {alerts.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[#5C5868]/60 dark:text-[#E4E2E4]/40">
                    No new notifications.
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`px-4 py-3 hover:bg-[#F2EBE0]/20 dark:hover:bg-white/5 transition-colors ${
                        !alert.read ? 'bg-[#4A63C9]/5 dark:bg-[#4A63C9]/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1E1B24] dark:text-white truncate max-w-[200px]">
                          {alert.title}
                        </span>
                        <span className="text-[10px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 mt-1 leading-relaxed">
                        {alert.desc}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User quick avatar -> redirects to settings */}
        <Link
          href="/student/settings"
          className="w-9 h-9 rounded-xl border border-white dark:border-white/10 shadow-sm transition-transform hover:scale-105 shrink-0"
          style={{ background: AVATAR_PRESETS[avatarIndex] }}
        />
      </div>
    </header>
  );
}
