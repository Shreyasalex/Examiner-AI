'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Mail, MessageSquare } from 'lucide-react';

type Tab = 'classes' | 'labs' | 'faculty';

interface TimetableSlot {
  time: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
}

interface FacultyMember {
  name: string;
  role: string;
  email: string;
  office: string;
  courses: string[];
  color: string;
}

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TIMETABLE_DATA: Record<string, TimetableSlot[]> = {
  Monday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Advanced Data Structures', code: 'CS-301', faculty: 'Dr. Evelyn Vance', room: 'LHC-201' },
    { time: '11:00 AM - 12:30 PM', subject: 'Discrete Mathematics', code: 'CS-302', faculty: 'Prof. Marcus Brody', room: 'LHC-104' },
    { time: '02:00 PM - 03:30 PM', subject: 'Computational Logic', code: 'CS-303', faculty: 'Dr. Sarah Jenkins', room: 'LHC-302' },
  ],
  Tuesday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Advanced Algorithms', code: 'CS-304', faculty: 'Prof. Alan Turing', room: 'LHC-108' },
    { time: '11:00 AM - 12:30 PM', subject: 'Neural Network Architectures', code: 'CS-305', faculty: 'Dr. Grace Hopper', room: 'LHC-405' },
    { time: '02:00 PM - 05:00 PM', subject: 'Data Structures Lab', code: 'CS-301L', faculty: 'Dr. Evelyn Vance', room: 'Lab 3' },
  ],
  Wednesday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Computational Logic', code: 'CS-303', faculty: 'Dr. Sarah Jenkins', room: 'LHC-302' },
    { time: '11:00 AM - 12:30 PM', subject: 'Advanced Data Structures', code: 'CS-301', faculty: 'Dr. Evelyn Vance', room: 'LHC-201' },
    { time: '02:00 PM - 03:30 PM', subject: 'Discrete Mathematics', code: 'CS-302', faculty: 'Prof. Marcus Brody', room: 'LHC-104' },
  ],
  Thursday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Neural Network Architectures', code: 'CS-305', faculty: 'Dr. Grace Hopper', room: 'LHC-405' },
    { time: '11:00 AM - 12:30 PM', subject: 'Advanced Algorithms', code: 'CS-304', faculty: 'Prof. Alan Turing', room: 'LHC-108' },
    { time: '02:00 PM - 05:00 PM', subject: 'Neural Networks Lab', code: 'CS-305L', faculty: 'Dr. Grace Hopper', room: 'Lab 5' },
  ],
  Friday: [
    { time: '09:00 AM - 10:30 AM', subject: 'Discrete Mathematics', code: 'CS-302', faculty: 'Prof. Marcus Brody', room: 'LHC-104' },
    { time: '11:00 AM - 12:30 PM', subject: 'Advanced Algorithms', code: 'CS-304', faculty: 'Prof. Alan Turing', room: 'LHC-108' },
    { time: '02:00 PM - 03:30 PM', subject: 'Computational Logic', code: 'CS-303', faculty: 'Dr. Sarah Jenkins', room: 'LHC-302' },
  ],
};

const LAB_DATA = [
  { day: 'Tuesday', time: '02:00 PM - 05:00 PM', name: 'Advanced Data Structures Lab', code: 'CS-301L', room: 'Computing Center Lab 3', instructor: 'Dr. Evelyn Vance' },
  { day: 'Thursday', time: '02:00 PM - 05:00 PM', name: 'Neural Network Systems Lab', code: 'CS-305L', room: 'AI & Robotics Lab 5', instructor: 'Dr. Grace Hopper' },
];

const FACULTY_DATA: FacultyMember[] = [
  { name: 'Dr. Evelyn Vance', role: 'Associate Professor', email: 'e.vance@university.edu', office: 'Block C, Room 304', courses: ['Advanced Data Structures (CS-301)', 'Data Structures Lab (CS-301L)'], color: '#9C7FDB' },
  { name: 'Prof. Marcus Brody', role: 'Department Head, Math', email: 'm.brody@university.edu', office: 'Block A, Room 512', courses: ['Discrete Mathematics (CS-302)'], color: '#7B93E8' },
  { name: 'Dr. Sarah Jenkins', role: 'Assistant Professor', email: 's.jenkins@university.edu', office: 'Block C, Room 218', courses: ['Computational Logic (CS-303)'], color: '#FF9A9E' },
  { name: 'Prof. Alan Turing', role: 'Chair Professor, CS', email: 'a.turing@university.edu', office: 'Block B, Room 101', courses: ['Advanced Algorithms (CS-304)'], color: '#FDA085' },
  { name: 'Dr. Grace Hopper', role: 'Professor, Neural Systems', email: 'g.hopper@university.edu', office: 'Block B, Room 402', courses: ['Neural Network Architectures (CS-305)', 'Neural Networks Lab (CS-305L)'], color: '#8fd3f4' },
];

export default function TimetablePage() {
  const [activeTab, setActiveTab] = useState<Tab>('classes');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-md shrink-0">
          {[
            { id: 'classes', name: 'Class Schedule' },
            { id: 'labs', name: 'Lab Sessions' },
            { id: 'faculty', name: 'Faculty Directory' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content 1: Class Schedule */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Day Selector Sidebar */}
          <div className="lg:col-span-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-thin no-scrollbar">
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 shrink-0 ${
                  selectedDay === day
                    ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                    : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{day}</span>
              </button>
            ))}
          </div>

          {/* Timetable Slots list */}
          <div className="lg:col-span-9 space-y-4">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-3 border-b border-[#E3D5BC]/30 dark:border-white/5 flex items-center gap-2">
              Lectures for {selectedDay}
            </h3>

            {TIMETABLE_DATA[selectedDay]?.map((slot, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#4A63C9]/10 text-[#4A63C9] dark:text-[#B5C7E8] font-mono text-[10px] font-bold">
                      {slot.code}
                    </span>
                    <span className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {slot.time}
                    </span>
                  </div>
                  <h4 className="font-semibold text-[14.5px] text-[#1E1B24] dark:text-white">{slot.subject}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#9C7FDB]" /> {slot.faculty}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#7B93E8]" /> {slot.room}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Lab Sessions */}
      {activeTab === 'labs' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-1">
            Weekly Lab Schedules
          </h3>
          <p className="text-[12.5px] text-[#5C5868] dark:text-[#E4E2E4]/70">
            Practical experimentation and coding laboratories scheduled for this semester.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LAB_DATA.map((lab, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-[#9C7FDB]/10 text-[#9C7FDB] font-mono text-[10px] font-bold">
                      {lab.code}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                      {lab.day}
                    </span>
                  </div>
                  <h4 className="font-semibold text-[14.5px] text-[#1E1B24] dark:text-white">{lab.name}</h4>
                  <div className="space-y-1 text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 pt-2 font-mono">
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#5C5868]" /> {lab.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#5C5868]" /> {lab.room}
                    </p>
                    <p className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#5C5868]" /> Inst: {lab.instructor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Faculty Directory */}
      {activeTab === 'faculty' && (
        <div className="space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white pb-1">
            Faculty Directory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FACULTY_DATA.map((fac, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between gap-4 hover:bg-white/60 dark:hover:bg-white/10 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-display"
                      style={{ background: fac.color }}
                    >
                      {fac.name.split(' ').pop()?.[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[14px] text-[#1E1B24] dark:text-white leading-tight">{fac.name}</h4>
                      <span className="text-[11px] text-[#5C5868]/80 dark:text-[#E4E2E4]/60">{fac.role}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11.5px] text-[#5C5868] dark:text-[#E4E2E4]/70 pt-2 border-t border-[#E3D5BC]/30 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${fac.email}`} className="hover:underline font-mono">{fac.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{fac.office}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/60 dark:text-[#E4E2E4]/40">Active Courses</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {fac.courses.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 text-[10px] font-medium text-[#1E1B24] dark:text-[#E4E2E4]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 bg-[#4A63C9]/10 hover:bg-[#4A63C9] text-[#4A63C9] hover:text-white rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Contact Faculty
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Credit Hours Load Chart */}
      <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
        <h3 className="font-display font-bold text-[15px] text-[#1E1B24] dark:text-white mb-4">
          Weekly Academic Credit Hours Distribution
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Advanced Data Structures (CS-301)', hours: 6, color: 'from-[#9C7FDB] to-[#7B93E8]', pct: '75%' },
            { name: 'Discrete Mathematics (CS-302)', hours: 4, color: 'from-[#7B93E8] to-[#4A63C9]', pct: '50%' },
            { name: 'Computational Logic (CS-303)', hours: 4, color: 'from-[#FF9A9E] to-[#FECFEF]', pct: '50%' },
            { name: 'Advanced Algorithms (CS-304)', hours: 4, color: 'from-[#FDA085] to-[#F6D365]', pct: '50%' },
            { name: 'Neural Network Architectures (CS-305)', hours: 6, color: 'from-[#8fd3f4] to-[#a1c4fd]', pct: '75%' }
          ].map((bar, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#5C5868] dark:text-[#E4E2E4]/80">{bar.name}</span>
                <span className="font-bold text-[#1E1B24] dark:text-white">{bar.hours} Hours/week</span>
              </div>
              <div className="h-2 w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                  style={{ width: bar.pct }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
