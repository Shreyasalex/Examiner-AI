'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFaculty, FACULTY_AVATAR_PRESETS } from '../context/FacultyContext';
import { Bell, HelpCircle, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface NotificationItem {
  id: string;
  text: string;
  time: string;
  isRead: boolean;
  type: 'alert' | 'info' | 'success';
}

export default function Header() {
  const { avatarIndex } = useFaculty();
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', text: 'Alex Sterling submitted Midterm Script.', time: '10m ago', isRead: false, type: 'success' },
    { id: '2', text: 'High anomaly flags (5) on Devon Lee proctor log.', time: '45m ago', isRead: false, type: 'alert' },
    { id: '3', text: 'AI Question set generated successfully for Quiz 3.', time: '2h ago', isRead: true, type: 'info' }
  ]);

  // Handle route matching for breadcrumb naming
  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    return parts.map((part, index) => {
      const href = '/' + parts.slice(0, index + 1).join('/');
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      if (part === 'exams') label = 'Exam Creator';
      if (part === 'grading') label = 'Grading & Proctoring';
      if (part === 'timetable') label = 'Teaching Schedule';
      if (part === 'students') label = 'Class Registry';
      if (part === 'materials') label = 'Course Materials';
      if (part === 'vault') label = 'Departmental Vault';
      return { href, label };
    });
  };

  const breadcrumbs = getBreadcrumbs();
  const activeLabel = breadcrumbs[breadcrumbs.length - 1]?.label || 'Command Center';

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <header className="relative px-5 md:px-8 py-4 border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center justify-between z-30 select-none">
      {/* 1. Breadcrumbs */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1 text-[11px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
          <Link href="/faculty" className="hover:underline">Faculty Portal</Link>
          {breadcrumbs.slice(1).map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#5C5868]/50" />
              <Link href={crumb.href} className="hover:underline">{crumb.label}</Link>
            </React.Fragment>
          ))}
        </div>
        <h2 className="font-display font-bold text-[18px] text-[#1E1B24] dark:text-white leading-tight">
          {activeLabel}
        </h2>
      </div>

      {/* 2. Top bar Controls */}
      <div className="flex items-center gap-3 relative">
        {/* Support Link */}
        <a
          href="mailto:faculty-support@examinerai.com"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/50 dark:hover:bg-white/5 text-[11.5px] font-mono text-[#5C5868] dark:text-[#E4E2E4]/70 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support SLA</span>
        </a>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-white/40 dark:bg-white/5 hover:bg-white border border-[#E3D5BC]/30 dark:border-white/5 text-[#5C5868] dark:text-white transition-all relative"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C1493D] ring-2 ring-white dark:ring-zinc-900" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#FAF6EE] dark:bg-[#131315] border border-[#E3D5BC] dark:border-white/10 rounded-2xl shadow-2xl p-4 z-50 text-[#1E1B24] dark:text-white space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/30 dark:border-white/5">
                <span className="font-display font-semibold text-[13.5px]">Grading Alerts</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] font-semibold text-[#4A63C9] dark:text-[#B5C7E8] hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                {notifications.length === 0 ? (
                  <p className="text-center text-[11.5px] text-[#5C5868]/60 py-4">No new alerts.</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border flex gap-2.5 items-start text-[12px] leading-normal transition-all ${
                        n.isRead
                          ? 'border-transparent opacity-65'
                          : 'border-white dark:border-white/5 bg-white/40 dark:bg-white/5'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'alert' && <ShieldAlert className="w-4 h-4 text-[#C1493D]" />}
                        {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#2E8B5C]" />}
                        {n.type === 'info' && <Bell className="w-4 h-4 text-[#9C7FDB]" />}
                      </div>
                      <div className="flex-1">
                        <p>{n.text}</p>
                        <span className="text-[9px] font-mono text-[#5C5868]/60 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-full py-1.5 bg-[#E3D5BC]/30 hover:bg-[#E3D5BC]/50 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-[11px] font-bold text-[#5C5868] dark:text-white transition-colors"
              >
                Close Alerts
              </button>
            </div>
          )}
        </div>

        {/* Profile Circle preset */}
        <Link
          href="/faculty/settings"
          className="w-[34px] h-[34px] rounded-xl border border-white dark:border-white/10 shadow-sm shrink-0 cursor-pointer"
          style={{ background: FACULTY_AVATAR_PRESETS[avatarIndex] }}
        />
      </div>
    </header>
  );
}
