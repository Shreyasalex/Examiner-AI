'use client';

import React, { useState } from 'react';
import { useFaculty, FACULTY_AVATAR_PRESETS, Theme } from '../context/FacultyContext';
import { Settings, User, Bell, Moon, Sun, Monitor, Check, CheckCircle2 } from 'lucide-react';

export default function FacultySettingsPage() {
  const {
    theme,
    setTheme,
    profile,
    updateProfile,
    avatarIndex,
    setAvatarIndex,
    notificationSettings,
    setNotificationSettings
  } = useFaculty();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [role, setRole] = useState(profile.role);
  const [department, setDepartment] = useState(profile.department);
  const [phone, setPhone] = useState(profile.phone);
  const [office, setOffice] = useState(profile.office);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      role,
      department,
      phone,
      office
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleNotificationChange = (key: 'scriptAlerts' | 'proctorAlerts' | 'meetingReminders') => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile settings */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
            <User className="w-5 h-5 text-[#4A63C9]" />
            Faculty Profile Identity
          </h3>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[12.5px] font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Faculty profile details synchronized successfully.</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Academic Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Faculty Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Office Contact</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Office Location</label>
                <input
                  type="text"
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white text-[13px] font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Sync Profile Info
            </button>
          </form>
        </div>

        {/* Right Column: Style and Notifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Theme & Avatar settings */}
          <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-5">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#9C7FDB]" />
              Visual Appearance
            </h3>

            {/* Custom Avatar Illustrator */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50 block">Faculty Avatar Illustrator</label>
              <div className="grid grid-cols-4 gap-3">
                {FACULTY_AVATAR_PRESETS.map((preset, idx) => {
                  const isSelected = idx === avatarIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarIndex(idx)}
                      style={{ background: preset }}
                      className={`h-11 rounded-xl border relative shadow-inner flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
                        isSelected ? 'border-white dark:border-[#4A63C9] ring-2 ring-[#4A63C9]' : 'border-white/30 dark:border-white/5'
                      }`}
                    >
                      {isSelected && (
                        <div className="bg-white/80 dark:bg-black/60 rounded-full p-0.5 shadow-sm">
                          <Check className="w-3.5 h-3.5 text-[#4A63C9]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dark theme toggle */}
            <div className="space-y-2.5 pt-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Console Base Theme</label>
              <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 max-w-sm">
                {([
                  { name: 'light', icon: Sun },
                  { name: 'dark', icon: Moon },
                  { name: 'system', icon: Monitor }
                ] as const).map((t) => {
                  const Icon = t.icon;
                  const isThemeSelected = theme === t.name;

                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTheme(t.name as Theme)}
                      className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isThemeSelected
                          ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                          : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grading Notifications */}
          <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Evaluation Alerts Settings
            </h3>

            <div className="space-y-3.5 text-[12.5px] text-[#1E1B24] dark:text-white">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notificationSettings.scriptAlerts}
                  onChange={() => handleNotificationChange('scriptAlerts')}
                  className="rounded border-[#E3D5BC]/50 text-[#4A63C9] focus:ring-[#4A63C9] w-4.5 h-4.5"
                />
                <div>
                  <p className="font-semibold leading-tight">Student Exam Submission Logs</p>
                  <p className="text-[10.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-0.5">Receive alert logs whenever student submits a sandbox exam script.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={notificationSettings.proctorAlerts}
                  onChange={() => handleNotificationChange('proctorAlerts')}
                  className="rounded border-[#E3D5BC]/50 text-[#4A63C9] focus:ring-[#4A63C9] w-4.5 h-4.5"
                />
                <div>
                  <p className="font-semibold leading-tight">AI Proctor Anomaly Triggers</p>
                  <p className="text-[10.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-0.5">Urgent proctor logs highlight if camera or eye-locked tracking is breached.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={notificationSettings.meetingReminders}
                  onChange={() => handleNotificationChange('meetingReminders')}
                  className="rounded border-[#E3D5BC]/50 text-[#4A63C9] focus:ring-[#4A63C9] w-4.5 h-4.5"
                />
                <div>
                  <p className="font-semibold leading-tight">Faculty Syndicate Reminders</p>
                  <p className="text-[10.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-0.5">Weekly invigilations scheduler notifications.</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
