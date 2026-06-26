'use client';

import React, { useState } from 'react';
import { Search, Users, AlertTriangle, CheckCircle2, UserCheck, GraduationCap } from 'lucide-react';

interface StudentRoster {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  attendance: number; // percentage
  gpa: number;
  backlogs: number;
  status: 'Excellent' | 'Nominal' | 'At Risk';
}

export default function ClassRegistryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');

  const students: StudentRoster[] = [
    { id: '1', name: 'Alex Sterling', rollNumber: 'EX-2026-8893', course: 'CS-305 (Neural Networks)', attendance: 92, gpa: 3.82, backlogs: 0, status: 'Excellent' },
    { id: '2', name: 'Clara Mercer', rollNumber: 'EX-2026-7734', course: 'CS-305 (Neural Networks)', attendance: 96, gpa: 3.96, backlogs: 0, status: 'Excellent' },
    { id: '3', name: 'Devon Lee', rollNumber: 'EX-2026-1049', course: 'CS-305 (Neural Networks)', attendance: 78, gpa: 3.12, backlogs: 1, status: 'At Risk' },
    { id: '4', name: 'Elena Rostova', rollNumber: 'EX-2026-4402', course: 'CS-301 (Data Structures)', attendance: 88, gpa: 3.54, backlogs: 0, status: 'Nominal' },
    { id: '5', name: 'Marcus Aurelius', rollNumber: 'EX-2026-1192', course: 'CS-301 (Data Structures)', attendance: 95, gpa: 3.78, backlogs: 0, status: 'Excellent' },
    { id: '6', name: 'Siddharth Sen', rollNumber: 'EX-2026-5591', course: 'CS-305L (Neural Networks Lab)', attendance: 82, gpa: 3.40, backlogs: 0, status: 'Nominal' }
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'All' || student.course.includes(courseFilter);
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      {/* Registry Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Total Enrolled</span>
          <div className="mt-2.5 flex items-baseline gap-2">
            <h3 className="font-mono font-bold text-[28px] text-[#1E1B24] dark:text-white leading-none">148</h3>
            <span className="text-[11px] text-[#2E8B5C] font-semibold">+12% this sem</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Avg Attendance</span>
          <div className="mt-2.5 flex items-baseline gap-2">
            <h3 className="font-mono font-bold text-[28px] text-[#4A63C9] leading-none">88.5%</h3>
            <span className="text-[11px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Nominal threshold</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Roster GPA</span>
          <div className="mt-2.5 flex items-baseline gap-2">
            <h3 className="font-mono font-bold text-[28px] text-[#9C7FDB] leading-none">3.61</h3>
            <span className="text-[11px] text-[#2E8B5C] font-semibold">Class Avg</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Students At Risk</span>
          <div className="mt-2.5 flex items-baseline gap-2">
            <h3 className="font-mono font-bold text-[28px] text-[#C1493D] leading-none">3</h3>
            <span className="text-[11px] text-[#C1493D] font-semibold">Urgent attention</span>
          </div>
        </div>
      </div>

      {/* Roster Controls */}
      <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#4A63C9]" />
              Class Registry & Roster
            </h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60">
              Track student attendance metrics, CGPA indexes, and academic risk factors.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Search */}
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#5C5868]/60 dark:text-[#E4E2E4]/50" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl pl-8 pr-3 py-2 text-[12px] text-[#1E1B24] dark:text-white focus:outline-none"
              />
            </div>

            {/* Course Filter */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-3 py-2 text-[12px] text-[#1E1B24] dark:text-white outline-none"
            >
              <option value="All">All Courses</option>
              <option value="CS-305">CS-305 (Neural Networks)</option>
              <option value="CS-301">CS-301 (Data Structures)</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-[#E3D5BC]/30 dark:border-white/5 text-[10.5px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                <th className="py-3 px-2">Student Name</th>
                <th className="py-3 px-2">Roll Number</th>
                <th className="py-3 px-2">Course Name</th>
                <th className="py-3 px-2">Attendance</th>
                <th className="py-3 px-2">CGPA</th>
                <th className="py-3 px-2">Backlogs</th>
                <th className="py-3 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((st) => {
                let statusBadge = 'bg-[#DFF3E8]/50 text-[#2E8B5C]';
                let statusIcon = <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />;

                if (st.status === 'Nominal') {
                  statusBadge = 'bg-[#E7E9EF]/80 text-[#5C6478] dark:bg-zinc-800 dark:text-[#E4E2E4]/80';
                  statusIcon = <UserCheck className="w-3.5 h-3.5 shrink-0" />;
                } else if (st.status === 'At Risk') {
                  statusBadge = 'bg-[#FBE4E1] text-[#C1493D] dark:bg-red-950/40 dark:text-red-300';
                  statusIcon = <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-pulse" />;
                }

                return (
                  <tr
                    key={st.id}
                    className="border-b border-[#E3D5BC]/15 dark:border-white/5 hover:bg-white/20 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-2 font-semibold text-[#1E1B24] dark:text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#9C7FDB]" />
                      {st.name}
                    </td>
                    <td className="py-3 px-2 font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">{st.rollNumber}</td>
                    <td className="py-3 px-2 text-[#5C5868] dark:text-[#E4E2E4]/80">{st.course}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1.5 font-semibold font-mono">
                        <span className={st.attendance < 80 ? 'text-[#C1493D]' : 'text-[#1E1B24] dark:text-white'}>
                          {st.attendance}%
                        </span>
                        <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full ${st.attendance < 80 ? 'bg-[#C1493D]' : 'bg-[#4A63C9]'}`}
                            style={{ width: `${st.attendance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono font-bold">{st.gpa}</td>
                    <td className="py-3 px-2">
                      <span className={`font-mono px-1.5 py-0.5 rounded text-[11px] ${
                        st.backlogs > 0 ? 'bg-[#FBE4E1] text-[#C1493D] font-bold' : 'text-[#5C5868]/60 dark:text-[#E4E2E4]/40'
                      }`}>
                        {st.backlogs}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBadge}`}>
                        {statusIcon}
                        {st.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
