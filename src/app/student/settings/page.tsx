'use client';

import React, { useState } from 'react';
import { useStudent, AVATAR_PRESETS, Theme } from '../context/StudentContext';
import { User, Palette, Shield, Camera, Bell, Laptop, Smartphone, Eye, EyeOff, CheckCircle2, RotateCw, LucideIcon } from 'lucide-react';

type Tab = 'profile' | 'appearance' | 'security' | 'face' | 'notifications';

interface DeviceItem {
  id: string;
  name: string;
  location: string;
  lastActive: string;
  icon: LucideIcon;
}

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    profile,
    updateProfile,
    avatarIndex,
    setAvatarIndex,
    isFaceEnrolled,
    enrollFace,
    resetFaceEnrollment,
    notificationSettings,
    setNotificationSettings
  } = useStudent();

  const [activeTab, setActiveTab] = useState<Tab>('profile');

  // Profile Form States
  const [profileName, setProfileName] = useState(profile.name);
  const [profilePhone, setProfilePhone] = useState(profile.phone);
  const [profileDept, setProfileDept] = useState(profile.department);
  const [profileSem, setProfileSem] = useState(profile.semester);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Security Form States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaveSuccess, setPasswordSaveSuccess] = useState(false);

  const [devices, setDevices] = useState<DeviceItem[]>([
    { id: 'dev-1', name: 'MacBook Pro 16" (M3 Max)', location: 'Bengaluru, India (Active Session)', lastActive: 'Just now', icon: Laptop },
    { id: 'dev-2', name: 'Apple iPhone 15 Pro Max', location: 'Bengaluru, India', lastActive: '2 hours ago', icon: Smartphone }
  ]);

  // Face scanner simulator states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      department: profileDept,
      semester: profileSem
    });
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setOldPassword('');
    setNewPassword('');
    setPasswordSaveSuccess(true);
    setTimeout(() => setPasswordSaveSuccess(false), 3000);
  };

  const handleRevokeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const handleStartFaceScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    resetFaceEnrollment();

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          enrollFace().then(() => {
            setIsScanning(false);
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Sidebar Selector */}
      <div className="lg:col-span-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 border-b lg:border-b-0 border-[#E3D5BC]/30 dark:border-white/5 scrollbar-thin scrollbar-thumb-zinc-400 no-scrollbar">
        {[
          { id: 'profile', name: 'Profile Info', icon: User },
          { id: 'appearance', name: 'Appearance', icon: Palette },
          { id: 'security', name: 'Security', icon: Shield },
          { id: 'face', name: 'Face Enrollment', icon: Camera },
          { id: 'notifications', name: 'Notifications', icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
              }`}
            >
              <Icon className="w-[17px] h-[17px]" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Settings Panel */}
      <div className="lg:col-span-9 p-6 md:p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 min-h-[460px]">
        {/* Tab content 1: Profile Info */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-5">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5">
              Personal Information
            </h3>

            {profileSaveSuccess && (
              <div className="p-3.5 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[13px] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile details updated successfully.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 focus:border-[#9C7FDB] focus:bg-white/80 dark:focus:bg-[#1E1B24]/60 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C7FDB]/20 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Email Address (Read-only)</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full bg-[#E3D5BC]/20 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 cursor-not-allowed outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Department</label>
                <input
                  type="text"
                  value={profileDept}
                  onChange={(e) => setProfileDept(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 focus:border-[#9C7FDB] focus:bg-white/80 dark:focus:bg-[#1E1B24]/60 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C7FDB]/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Semester</label>
                <input
                  type="text"
                  value={profileSem}
                  onChange={(e) => setProfileSem(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 focus:border-[#9C7FDB] focus:bg-white/80 dark:focus:bg-[#1E1B24]/60 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C7FDB]/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Roll Number</label>
                <input
                  type="text"
                  value={profile.rollNumber}
                  disabled
                  className="w-full bg-[#E3D5BC]/20 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 cursor-not-allowed outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Phone Number</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 focus:border-[#9C7FDB] focus:bg-white/80 dark:focus:bg-[#1E1B24]/60 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C7FDB]/20 transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13px] transition-all shadow-md shadow-[#4A63C9]/10"
              >
                Save Profile Details
              </button>
            </div>
          </form>
        )}

        {/* Tab content 2: Appearance & Theme */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5">
              Interface Customization
            </h3>

            {/* Segmented theme selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">ColorScheme</label>
              <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 max-w-sm">
                {(['light', 'dark', 'system'] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex-1 py-2 rounded-lg text-[12.5px] font-semibold capitalize transition-all duration-200 ${
                      theme === t
                        ? 'bg-white dark:bg-[#1E1B24] text-[#1E1B24] dark:text-white shadow-sm'
                        : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Preset Grid */}
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50 block">Select Profile Illustration</label>
                <span className="text-[11px] text-[#5C5868] dark:text-[#E4E2E4]/60">Select an illustrated geometric preset to represent your profile across Examiner AI.</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3.5 max-w-lg">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarIndex(idx)}
                    className={`aspect-square rounded-2xl border-2 transition-all ${
                      avatarIndex === idx
                        ? 'border-[#4A63C9] scale-105 shadow-md shadow-[#4A63C9]/10'
                        : 'border-white dark:border-white/10 opacity-70 hover:opacity-100'
                    }`}
                    style={{ background: preset }}
                  />
                ))}
              </div>
            </div>

            {/* Photo Upload Zone */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Or Upload photo</label>
              <div className="border border-dashed border-[#E3D5BC] dark:border-white/20 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/20 dark:hover:bg-white/5 transition-all max-w-lg flex flex-col items-center justify-center gap-2">
                <span className="text-[12.5px] font-semibold">Drag and drop file here</span>
                <span className="text-[11px] text-[#5C5868] dark:text-[#E4E2E4]/60">Supported formats: JPEG, PNG up to 2MB.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 3: Security & Session Log */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5">
              Change Account Password
            </h3>

            {passwordSaveSuccess && (
              <div className="p-3.5 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[13px] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Password changed successfully.</span>
              </div>
            )}

            <form onSubmit={handleSavePassword} className="space-y-4 max-w-sm">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl pl-4 pr-10 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5C5868]"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13px] transition-all"
              >
                Update Password
              </button>
            </form>

            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pt-4 pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5">
              Active Authorized Devices
            </h3>

            <div className="space-y-3.5">
              {devices.length === 0 ? (
                <div className="text-center py-6 text-[#5C5868]/60 dark:text-[#E4E2E4]/40 font-mono text-[12px]">
                  No active authorized devices.
                </div>
              ) : (
                devices.map((dev) => {
                  const Icon = dev.icon;
                  return (
                    <div
                      key={dev.id}
                      className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E3D5BC]/30 dark:bg-white/5 flex items-center justify-center text-[#5C5868] dark:text-white">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[13px] text-[#1E1B24] dark:text-white">{dev.name}</h4>
                          <span className="text-[10px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                            {dev.location} · {dev.lastActive}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRevokeDevice(dev.id)}
                        className="px-4 py-2 bg-[#C1493D]/10 hover:bg-[#C1493D] text-[#C1493D] hover:text-white border border-[#C1493D]/10 hover:border-transparent rounded-lg text-[11px] font-bold font-mono transition-colors"
                      >
                        REVOKE
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab content 4: Face Enrollment */}
        {activeTab === 'face' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5">
              Face Recognition Enrollment
            </h3>
            <p className="text-[13px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed max-w-xl">
              Face authentication secures your Exam Terminals. Ensure your webcam matches this biometric signature to complete tests successfully.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Webcam simulator screen */}
              <div className="md:col-span-7 aspect-video bg-zinc-800 dark:bg-black/35 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-white/5 shadow-inner">
                {isScanning ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Scanning Ring */}
                      <div className="w-32 h-32 rounded-full border border-dashed border-[#9C7FDB] animate-spin flex items-center justify-center" />
                      <div className="absolute font-mono text-[11px] text-[#9C7FDB] tracking-wider animate-pulse">
                        SCANNING {scanProgress}%
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#9C7FDB] to-[#7B93E8] transition-all" style={{ width: `${scanProgress}%` }} />
                    </div>
                  </>
                ) : isFaceEnrolled ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-[#2E8B5C]" />
                    <span className="text-[13px] font-mono text-[#2E8B5C] font-semibold mt-2">FACE REGISTERED</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-[#5C5868] dark:text-white/20" />
                    <span className="text-[12.5px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-2">WEBCAM READY</span>
                  </>
                )}
              </div>

              {/* Status details */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/5 space-y-2 text-[12.5px] font-mono">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={isFaceEnrolled ? 'text-[#2E8B5C] font-bold' : 'text-[#C1493D] font-bold'}>
                      {isFaceEnrolled ? 'ENROLLED' : 'NOT ENROLLED'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signature:</span>
                    <span className="text-right">SHA-256 Biometrics</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span>{isFaceEnrolled ? '2026-06-25' : '—'}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleStartFaceScan}
                    disabled={isScanning}
                    className="flex-1 py-3 bg-[#4A63C9] hover:bg-[#3d54b3] text-white font-bold rounded-xl text-[13px] transition-all shadow-md shadow-[#4A63C9]/10 flex items-center justify-center gap-1.5"
                  >
                    <RotateCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                    {isFaceEnrolled ? 'Re-enroll Face' : 'Enroll Biometrics'}
                  </button>
                  {isFaceEnrolled && (
                    <button
                      onClick={resetFaceEnrollment}
                      className="px-4 py-3 bg-[#C1493D]/10 hover:bg-[#C1493D] text-[#C1493D] hover:text-white border border-[#C1493D]/10 hover:border-transparent rounded-xl text-[13px] font-bold transition-all"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 5: Notification Toggles */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5">
              Notification Preferences
            </h3>
            <p className="text-[13px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed max-w-xl">
              Choose how and when you want to receive alerts from Examiner AI regarding upcoming exams, invoices, and grading reports.
            </p>

            <div className="space-y-4 max-w-md">
              {[
                { key: 'emailAlerts', title: 'Global Email Alerts', desc: 'Receive critical institutional communications and SLA updates.' },
                { key: 'examReminders', title: 'Exam Calendar Reminders', desc: 'Receive warnings 24 hours prior to scheduled proctored exams.' },
                { key: 'resultPublish', title: 'Grade Publications Alerts', desc: 'Get notified as soon as exam script results are signed by the AI proctor.' },
                { key: 'paymentsDue', title: 'Outstanding Due Warnings', desc: 'Receive payment alerts 5 days prior to fee deadlines.' }
              ].map((switchItem) => (
                <label
                  key={switchItem.key}
                  className="p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 border border-transparent hover:border-[#E3D5BC]/30 dark:hover:border-white/5 flex items-center justify-between gap-4 cursor-pointer transition-all"
                >
                  <div className="space-y-1">
                    <h5 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-white">{switchItem.title}</h5>
                    <p className="text-[11.5px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-normal">{switchItem.desc}</p>
                  </div>
                  {/* Switch toggle styling */}
                  <div
                    onClick={() =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        [switchItem.key]: !prev[switchItem.key as keyof typeof prev]
                      }))
                    }
                    className="w-10 h-6 rounded-full p-1 cursor-pointer transition-all shrink-0"
                    style={{
                      background: notificationSettings[switchItem.key as keyof typeof notificationSettings]
                        ? '#4A63C9'
                        : 'rgba(92,88,104,0.3)'
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full bg-white transition-all shadow-sm"
                      style={{
                        transform: notificationSettings[switchItem.key as keyof typeof notificationSettings]
                          ? 'translateX(16px)'
                          : 'translateX(0)'
                      }}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
