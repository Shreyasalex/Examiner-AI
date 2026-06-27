'use client';

import React, { useState } from 'react';
import { useFaculty, FACULTY_AVATAR_PRESETS, Theme } from '../context/FacultyContext';
import { Bell, Moon, Sun, Monitor, Check, CheckCircle2, Laptop, Smartphone, Key } from 'lucide-react';

export default function SettingsPage() {
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

  const [activeTab, setActiveTab] = useState<'Profile' | 'Appearance' | 'Security' | 'Notifications'>('Profile');

  // Profile forms
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [department, setDepartment] = useState(profile.department);
  const [role, setRole] = useState(profile.role);
  const [phone, setPhone] = useState(profile.phone);
  const [office, setOffice] = useState(profile.office);

  // Security forms
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Devices state
  const [devices, setDevices] = useState([
    { id: '1', name: 'MacBook Air M2', location: 'Bengaluru, India', active: true, icon: Laptop },
    { id: '2', name: 'iPhone 15 Pro Max', location: 'Bengaluru, India', active: false, icon: Smartphone }
  ]);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      department,
      role,
      phone,
      office
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleRevokeDevice = (id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
  };

  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 border border-[#E3D5BC]/20 max-w-lg scroll-smooth overflow-x-auto no-scrollbar">
        {(['Profile', 'Appearance', 'Security', 'Notifications'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[80px] py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#4A63C9] text-white shadow-md shadow-[#4A63C9]/10'
                : 'text-[#5C5868]/80 dark:text-[#9591A3]/60 hover:text-[#1E1B24] dark:hover:text-[#EDEAF2]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[12.5px] font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#2E8B5C]" />
          <span>Settings changes saved and synchronized successfully!</span>
        </div>
      )}

      {/* Tabs panels */}
      <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        {activeTab === 'Profile' && (
          <form onSubmit={handleProfileSave} className="space-y-4 animate-fade-in">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] border-b border-[#E3D5BC]/20 dark:border-white/5 pb-2">
              Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Designation / Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Office Contact</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Office Location</label>
                <input
                  type="text"
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#4A63C9] hover:bg-[#3b51b3] text-white text-[12.5px] font-bold shadow-md transition-all active:scale-95"
              >
                Save Details
              </button>
            </div>
          </form>
        )}

        {activeTab === 'Appearance' && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] border-b border-[#E3D5BC]/20 dark:border-white/5 pb-2">
              Appearance Settings
            </h3>

            {/* Live Mode switch */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block">Console Base Theme</label>
              <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 max-w-sm border border-[#E3D5BC]/20">
                {([
                  { name: 'light', icon: Sun },
                  { name: 'dark', icon: Moon },
                  { name: 'system', icon: Monitor }
                ] as const).map((t) => {
                  const Icon = t.icon;
                  const isSelected = theme === t.name;
                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTheme(t.name as Theme)}
                      className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold capitalize transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                          : 'text-[#5C5868]/80 dark:text-[#9591A3]/60 hover:text-[#1E1B24] dark:hover:text-[#EDEAF2]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom avatar illustrator picker */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block">Faculty Avatar illustrator</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 max-w-xl">
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
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-6 animate-fade-in">
            {/* Password Change */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] border-b border-[#E3D5BC]/20 dark:border-white/5 pb-2 flex items-center gap-1.5">
                <Key className="w-4.5 h-4.5 text-[#4A63C9]" />
                Change Password
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 focus:border-[#9C7FDB] focus:ring-2 focus:ring-[#9C7FDB]/20 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none transition-all"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSaveSuccess(true);
                  setCurrentPassword('');
                  setNewPassword('');
                  setTimeout(() => setSaveSuccess(false), 3000);
                }}
                className="px-4 py-2 bg-white hover:bg-[#E3D9F7] text-[#4A63C9] border border-[#E3D5BC]/40 text-[11.5px] font-bold rounded-xl transition-all"
              >
                Update Password
              </button>
            </div>

            {/* Registered Devices */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] border-b border-[#E3D5BC]/20 dark:border-white/5 pb-2">
                Registered Devices & Session Locks
              </h3>

              <div className="space-y-2 max-w-xl">
                {devices.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div
                      key={d.id}
                      className="p-3.5 rounded-xl border border-[#E3D5BC]/30 dark:border-white/5 bg-white/20 flex justify-between items-center text-[12.5px]"
                    >
                      <div className="flex gap-2.5 items-center">
                        <Icon className="w-5 h-5 text-[#4A63C9]" />
                        <div>
                          <p className="font-semibold">{d.name}</p>
                          <p className="text-[10px] text-[#5C5868]/75 dark:text-[#9591A3]/55 font-mono">{d.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {d.active ? (
                          <span className="font-mono text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Current Session</span>
                        ) : (
                          <button
                            onClick={() => handleRevokeDevice(d.id)}
                            className="px-2.5 py-1 rounded bg-[#FBE4E1] hover:bg-[#FBE4E1]/80 text-[#C1493D] text-[11px] font-bold transition-all"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] border-b border-[#E3D5BC]/20 dark:border-white/5 pb-2 flex items-center gap-1.5">
              <Bell className="w-4.5 h-4.5 text-[#4A63C9]" />
              Evaluation Alerts
            </h3>

            <div className="space-y-3.5 text-[12.5px] max-w-lg">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notificationSettings.scriptAlerts}
                  onChange={() => handleNotificationToggle('scriptAlerts')}
                  className="rounded border-[#E3D5BC]/50 text-[#4A63C9] focus:ring-[#4A63C9] w-4.5 h-4.5"
                />
                <div>
                  <p className="font-semibold leading-tight">Student Exam Submission logs</p>
                  <p className="text-[10.5px] text-[#5C5868]/75 dark:text-[#9591A3]/50 mt-0.5">Receive alert logs whenever student submits a sandbox exam script.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={notificationSettings.proctorAlerts}
                  onChange={() => handleNotificationToggle('proctorAlerts')}
                  className="rounded border-[#E3D5BC]/50 text-[#4A63C9] focus:ring-[#4A63C9] w-4.5 h-4.5"
                />
                <div>
                  <p className="font-semibold leading-tight">AI Invigilator Anomaly Triggers</p>
                  <p className="text-[10.5px] text-[#5C5868]/75 dark:text-[#9591A3]/50 mt-0.5">Urgent proctor logs highlight if camera or eye-locked tracking is breached.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={notificationSettings.meetingReminders}
                  onChange={() => handleNotificationToggle('meetingReminders')}
                  className="rounded border-[#E3D5BC]/50 text-[#4A63C9] focus:ring-[#4A63C9] w-4.5 h-4.5"
                />
                <div>
                  <p className="font-semibold leading-tight">Faculty Syndicate Reminders</p>
                  <p className="text-[10.5px] text-[#5C5868]/75 dark:text-[#9591A3]/50 mt-0.5">Weekly invigilations scheduler notifications.</p>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
