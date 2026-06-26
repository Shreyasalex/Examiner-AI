'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, BookOpen, Coffee } from 'lucide-react';

interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  course: string;
  type: 'Lecture' | 'Lab Invigilation' | 'Office Hours' | 'Break';
  location: string;
  coFaculties: string[];
}

export default function TimetablePage() {
  const [activeDay, setActiveDay] = useState<'All' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('All');

  const schedule: TimetableSlot[] = [
    {
      id: '1',
      day: 'Monday',
      time: '09:00 AM - 10:30 AM',
      course: 'Neural Network Architectures (CS-305)',
      type: 'Lecture',
      location: 'LH-301 (Main Auditorium)',
      coFaculties: ['Dr. Andrew Ng', 'Prof. Yann LeCun']
    },
    {
      id: '2',
      day: 'Monday',
      time: '11:00 AM - 12:30 PM',
      course: 'Office Hours & Mentoring',
      type: 'Office Hours',
      location: 'Cabin 402, Block B',
      coFaculties: []
    },
    {
      id: '3',
      day: 'Tuesday',
      time: '02:00 PM - 05:00 PM',
      course: 'Neural Networks Lab (CS-305L)',
      type: 'Lab Invigilation',
      location: 'Advanced Computing Lab (ACL-3)',
      coFaculties: ['Prof. Geoff Hinton', 'Dr. Fei-Fei Li']
    },
    {
      id: '4',
      day: 'Wednesday',
      time: '09:00 AM - 10:30 AM',
      course: 'Neural Network Architectures (CS-305)',
      type: 'Lecture',
      location: 'LH-301 (Main Auditorium)',
      coFaculties: ['Dr. Andrew Ng']
    },
    {
      id: '5',
      day: 'Wednesday',
      time: '11:00 AM - 12:30 PM',
      course: 'Lunch & Faculty Syndicate Board Meeting',
      type: 'Break',
      location: 'Senate Hall',
      coFaculties: ['Dean of Robotics']
    },
    {
      id: '6',
      day: 'Thursday',
      time: '02:00 PM - 03:30 PM',
      course: 'Research Review & Doctoral Colloquium',
      type: 'Office Hours',
      location: 'Seminar Room A',
      coFaculties: ['Dr. Grace Hopper']
    },
    {
      id: '7',
      day: 'Friday',
      time: '10:00 AM - 12:00 PM',
      course: 'Generative AI & LLMs Guest Panel',
      type: 'Lecture',
      location: 'Newton Auditorium',
      coFaculties: ['Dr. Sam Altman', 'Dr. Ilya Sutskever']
    }
  ];

  const filteredSchedule = activeDay === 'All' ? schedule : schedule.filter((s) => s.day === activeDay);

  // Group by day for visual consistency
  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      {/* Overview stats header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Weekly Lectures</span>
            <h3 className="font-mono font-bold text-[24px] text-[#4A63C9] mt-1">3 Classes</h3>
          </div>
          <BookOpen className="w-8 h-8 text-[#4A63C9] opacity-40" />
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Lab Invigilations</span>
            <h3 className="font-mono font-bold text-[24px] text-[#9C7FDB] mt-1">3 Hours</h3>
          </div>
          <Users className="w-8 h-8 text-[#9C7FDB] opacity-40" />
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Office Hours</span>
            <h3 className="font-mono font-bold text-[24px] text-amber-500 mt-1">4 Hours</h3>
          </div>
          <Coffee className="w-8 h-8 text-amber-500 opacity-40" />
        </div>
      </div>

      {/* Main Schedule Container */}
      <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#4A63C9]" />
              Schedule & Invigilations
            </h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60">
              Filter by days of the week to inspect schedules, location tags, and secondary course faculties.
            </p>
          </div>

          {/* Quick Schedule Add (Simulated) */}
          <button className="px-4 py-2 rounded-xl bg-white/60 dark:bg-white/10 hover:bg-[#4A63C9] hover:text-white text-[#1E1B24] dark:text-white border border-[#E3D5BC]/50 dark:border-white/5 text-[12px] font-semibold flex items-center gap-1.5 transition-all">
            <Plus className="w-4 h-4" /> Add Slot
          </button>
        </div>

        {/* Day Selectors */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-[#E3D5BC]/30 dark:border-white/5">
          {(['All', ...days] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
                activeDay === day
                  ? 'bg-[#4A63C9] text-white shadow-sm'
                  : 'bg-[#E3D5BC]/20 hover:bg-[#E3D5BC]/40 dark:bg-white/5 dark:hover:bg-white/10 text-[#5C5868] dark:text-[#E4E2E4]/80'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredSchedule.map((slot) => {
            let badgeColor = 'bg-[#4A63C9]/10 text-[#4A63C9]';
            if (slot.type === 'Lab Invigilation') badgeColor = 'bg-[#9C7FDB]/10 text-[#9C7FDB]';
            if (slot.type === 'Office Hours') badgeColor = 'bg-amber-500/10 text-amber-500';
            if (slot.type === 'Break') badgeColor = 'bg-zinc-500/10 text-zinc-500';

            return (
              <div
                key={slot.id}
                className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:translate-x-1"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-[#E7E9EF] text-[#5C6478] dark:bg-zinc-800 dark:text-[#E4E2E4]/80">
                      {slot.day}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${badgeColor}`}>
                      {slot.type}
                    </span>
                  </div>

                  <h4 className="font-semibold text-[14px] text-[#1E1B24] dark:text-white leading-tight">
                    {slot.course}
                  </h4>

                  <div className="flex items-center gap-4 text-[11.5px] text-[#5C5868]/80 dark:text-[#E4E2E4]/60 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5C5868]/60" /> {slot.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5C5868]/60" /> {slot.location}
                    </span>
                  </div>
                </div>

                {slot.coFaculties.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-white/20 dark:bg-[#1E1B24]/10 border border-[#E3D5BC]/20 dark:border-white/5 min-w-[200px]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50 block mb-1.5">
                      Co-Instructors In Charge
                    </span>
                    <div className="space-y-1">
                      {slot.coFaculties.map((f, i) => (
                        <p key={i} className="text-[11px] font-semibold text-[#1E1B24] dark:text-white flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B5C]" />
                          {f}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
