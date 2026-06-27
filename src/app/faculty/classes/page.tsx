'use client';

import React, { useState, useEffect } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { Users, Calendar, Download, Search, GraduationCap, MapPin } from 'lucide-react';

export default function MyClassesPage() {
  const { classes, semester: activeSem, setSemester: setActiveSem } = useFaculty();
  const [activeTab, setActiveTab] = useState<'Roster' | 'Timetable'>('Roster');
  const [selectedClassId, setSelectedClassId] = useState<string>('SEC-A-CS305');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-select first class when changing semester if not in the new filtered list
  useEffect(() => {
    const normalizedSem = activeSem.replace('Sem ', 'Semester ');
    const semClasses = classes.filter(c => c.semester === normalizedSem);
    if (semClasses.length > 0) {
      if (!semClasses.some(c => c.id === selectedClassId)) {
        setSelectedClassId(semClasses[0].id);
      }
    } else {
      setSelectedClassId('');
    }
  }, [activeSem, classes, selectedClassId]);

  // Filter classes by sem
  const normalizedActiveSem = activeSem.replace('Sem ', 'Semester ');
  const semClasses = classes.filter(c => c.semester === normalizedActiveSem);
  const selectedClass = classes.find(c => c.id === selectedClassId);

  // Filter roster by search
  const filteredRoster = selectedClass
    ? selectedClass.roster.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleExportCSV = () => {
    if (!selectedClass) return;
    const headers = 'Roll Number,Name,Attendance %,Running Grade\n';
    const rows = selectedClass.roster
      .map(s => `${s.rollNumber},${s.name},${s.attendance}%,${s.grade}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedClass.id}_roster.csv`;
    a.click();
  };

  const timeSlots = [
    '09:00 AM - 10:30 AM',
    '10:45 AM - 12:15 PM',
    '01:30 PM - 03:00 PM',
    '03:15 PM - 04:45 PM'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Mock weekly teaching slots
  const timetableSlots = [
    { day: 'Monday', slotIdx: 0, subject: 'CS-305: Neural Network Architectures', room: 'LH-301', type: 'lecture' },
    { day: 'Tuesday', slotIdx: 2, subject: 'CS-305L: Neural Networks Lab', room: 'Lab 3 (ACL)', type: 'lab' },
    { day: 'Tuesday', slotIdx: 3, subject: 'CS-305L: Neural Networks Lab', room: 'Lab 3 (ACL)', type: 'lab' },
    { day: 'Wednesday', slotIdx: 0, subject: 'CS-305: Neural Network Architectures', room: 'LH-301', type: 'lecture' },
    { day: 'Thursday', slotIdx: 1, subject: 'CS-301: Advanced Data Structures', room: 'LH-104', type: 'lecture' },
    { day: 'Friday', slotIdx: 2, subject: 'CS-301: Advanced Data Structures', room: 'LH-104', type: 'lecture' }
  ];

  const activeSubjectCodes = semClasses.map(c => c.subject.split(': ')[0]);
  const filteredTimetableSlots = timetableSlots.filter(s =>
    activeSubjectCodes.some(code => s.subject.includes(code))
  );

  return (
    <div className="space-y-6">
      {/* Semester switch chips & Roster/Timetable tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E3D5BC]/20 dark:border-white/5 pb-4">
        {/* Semester / Dept selector chips */}
        <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 border border-[#E3D5BC]/20">
          {(['Sem 1', 'Sem 3', 'Sem 5', 'Sem 7'] as const).map((sem) => (
            <button
              key={sem}
              onClick={() => {
                setActiveSem(sem);
                const normalizedSem = sem.replace('Sem ', 'Semester ');
                const filtered = classes.filter(c => c.semester === normalizedSem);
                if (filtered.length > 0) {
                  setSelectedClassId(filtered[0].id);
                } else {
                  setSelectedClassId('');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-[11.5px] font-semibold transition-all duration-200 ${
                activeSem === sem
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#9591A3]/60 hover:text-[#1E1B24]'
              }`}
            >
              {sem}
            </button>
          ))}
        </div>

        {/* Tab Toggle buttons */}
        <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 border border-[#E3D5BC]/20 shrink-0">
          {(['Roster', 'Timetable'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[#4A63C9] text-white shadow-md shadow-[#4A63C9]/10'
                  : 'text-[#5C5868]/80 dark:text-[#9591A3]/60 hover:text-[#1E1B24] dark:hover:text-[#EDEAF2]'
              }`}
            >
              {tab === 'Roster' ? <Users className="w-3.5 h-3.5 inline mr-1" /> : <Calendar className="w-3.5 h-3.5 inline mr-1" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Roster' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {/* Left 4 Cols: Class cards roster */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Assigned Classes</span>
            {semClasses.length === 0 ? (
              <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 text-[12px] py-12">
                No classes assigned yet for this semester.
              </div>
            ) : (
              semClasses.map((cls) => {
                const isActive = cls.id === selectedClassId;
                return (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassId(cls.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-white dark:bg-white/5 border-[#4A63C9] shadow-lg shadow-[#4A63C9]/5'
                        : 'bg-white/30 dark:bg-white/5 border-white/40 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                  >
                    <h4 className="font-display font-bold text-[14px] text-[#1E1B24] dark:text-[#EDEAF2] leading-tight">
                      {cls.subject}
                    </h4>
                    <p className="text-[10px] text-[#5C5868]/75 dark:text-[#9591A3]/50 font-mono mt-1">
                      {cls.semester} · {cls.department} Dept
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11.5px] text-[#4A63C9] dark:text-[#B5C7E8] font-bold font-mono">
                        {cls.studentCount} Students
                      </span>
                      <Users className="w-4 h-4 text-[#5C5868]/40" />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right 8 Cols: Selected class roster table */}
          {selectedClass ? (
            <div className="lg:col-span-8 p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E3D5BC]/20 dark:border-white/5">
                <div>
                  <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
                    Roster Registry
                  </h3>
                  <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 mt-0.5">
                    {selectedClass.subject.split(': ')[1]}
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-[#5C5868]/60 dark:text-[#9591A3]/50" />
                    <input
                      type="text"
                      placeholder="Search roster..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl pl-8 pr-3 py-2 text-[12px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 hover:bg-[#E3D9F7] border border-[#E3D5BC]/40 dark:border-white/5 text-[11.5px] text-[#4A63C9] font-bold flex items-center gap-1 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Roster table */}
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E3D5BC]/20 dark:border-white/5 text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">
                      <th className="py-2.5 px-2">Student Name</th>
                      <th className="py-2.5 px-2">Roll Number</th>
                      <th className="py-2.5 px-2">Attendance</th>
                      <th className="py-2.5 px-2 text-right">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoster.map((s) => (
                      <tr key={s.rollNumber} className="border-b border-[#E3D5BC]/10 dark:border-white/5 hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3 px-2 font-semibold text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-[#9C7FDB]" />
                          {s.name}
                        </td>
                        <td className="py-3 px-2 font-mono text-[#5C5868]/70 dark:text-[#9591A3]/50">{s.rollNumber}</td>
                        <td className="py-3 px-2 font-mono font-bold">
                          <span className={s.attendance < 80 ? 'text-[#C1493D]' : 'text-emerald-600'}>
                            {s.attendance}%
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right font-mono font-bold text-[#4A63C9] dark:text-[#B5C7E8]">
                          {s.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-8 p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 font-mono py-20 select-none">
              No class selected or assigned for this semester.
            </div>
          )}
        </div>
      ) : (
        /* Timetable Tab */
        <div className="p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4 animate-fade-in">
          <div>
            <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
              Weekly Teaching Timetable
            </h3>
            <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 mt-0.5">
              Weekly lectures and lab sessions schedule grid.
            </p>
          </div>

          {filteredTimetableSlots.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 font-mono py-12 select-none">
              No timetable classes scheduled for this semester.
            </div>
          ) : (
            <div className="overflow-x-auto no-scrollbar">
              <div className="min-w-[800px] border border-[#E3D5BC]/20 dark:border-white/10 rounded-2xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-7 bg-[#F2EBE0] dark:bg-[#1D1A24] text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/80 dark:text-[#9591A3]/80 border-b border-[#E3D5BC]/20 dark:border-white/10">
                  <div className="p-3 border-r border-[#E3D5BC]/20 dark:border-white/10 font-bold">Time Slot</div>
                  {days.map((d) => (
                    <div key={d} className="p-3 text-center border-r border-[#E3D5BC]/20 dark:border-white/10 last:border-0 font-bold">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Grid rows */}
                {timeSlots.map((slot, slotIdx) => (
                  <div key={slot} className="grid grid-cols-7 border-b border-[#E3D5BC]/15 dark:border-white/10 last:border-b-0">
                    {/* Slot time */}
                    <div className="p-3 border-r border-[#E3D5BC]/15 dark:border-white/10 bg-white/20 dark:bg-black/10 flex items-center">
                      <span className="font-mono text-[9.5px] leading-tight text-[#5C5868] dark:text-[#9591A3] font-bold">
                        {slot}
                      </span>
                    </div>

                    {/* Days */}
                    {days.map((day) => {
                      const block = filteredTimetableSlots.find(s => s.day === day && s.slotIdx === slotIdx);
                      if (block) {
                        const isLab = block.type === 'lab';
                        return (
                          <div
                            key={day}
                            className={`p-2.5 border-r border-[#E3D5BC]/15 dark:border-white/10 flex flex-col justify-between last:border-0 ${
                              isLab
                                ? 'bg-gradient-to-br from-[#9C7FDB]/10 to-[#7B93E8]/10 bg-[length:10px_10px] border-l-2 border-[#9C7FDB]'
                                : 'bg-[#4A63C9]/5 border-l-2 border-[#4A63C9]'
                            }`}
                          >
                            <h5 className="font-semibold text-[10.5px] text-[#1E1B24] dark:text-[#EDEAF2] leading-tight line-clamp-2">
                              {block.subject.split(': ')[0]}
                            </h5>
                            <div className="flex items-center justify-between text-[9px] text-[#5C5868]/80 dark:text-[#9591A3]/80 font-mono mt-2 pt-1 border-t border-[#E3D5BC]/10 dark:border-white/5">
                              <span className="flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5 text-[#5C5868]/60" /> {block.room}
                              </span>
                              <span className="capitalize text-[8.5px] font-bold">{block.type}</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={day} className="p-3 border-r border-[#E3D5BC]/15 dark:border-white/10 last:border-0 bg-white/10 dark:bg-transparent" />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
