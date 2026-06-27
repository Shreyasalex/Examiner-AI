'use client';

import React, { useState } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { Filter, HelpCircle, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import Image from 'next/image';

export default function ViolationsPage() {
  const { violations, labelViolationSnapshot } = useFaculty();

  const [filterExam, setFilterExam] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(null);

  const selectedSnapshot = violations.find((v) => v.id === selectedSnapshotId);

  const filteredViolations = violations.filter((v) => {
    const matchesExam = filterExam === 'All' || v.exam.includes(filterExam);
    const matchesType = filterType === 'All' || v.type === filterType;
    const matchesStatus = filterStatus === 'All' || v.status === filterStatus;
    return matchesExam && matchesType && matchesStatus;
  });

  const handleLabel = (label: 'Confirm Violation' | 'False Positive' | 'Unclear') => {
    if (!selectedSnapshotId) return;
    labelViolationSnapshot(selectedSnapshotId, label);
    setSelectedSnapshotId(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters row */}
      <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-2 text-[12.5px] font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">
          <Filter className="w-4 h-4 text-[#4A63C9]" />
          <span>Filters</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Exam Filter */}
          <select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            className="bg-white/60 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-2.5 py-1.5 text-[11.5px] text-[#1E1B24] dark:text-[#EDEAF2] outline-none"
          >
            <option value="All">All Exams</option>
            <option value="Data Structures">Data Structures</option>
            <option value="Neural Networks">Neural Networks</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/60 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-2.5 py-1.5 text-[11.5px] text-[#1E1B24] dark:text-[#EDEAF2] outline-none"
          >
            <option value="All">All Violation Types</option>
            <option value="Gaze">Gaze</option>
            <option value="Object Detected">Object Detected</option>
            <option value="Person Count">Person Count</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/60 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-2.5 py-1.5 text-[11.5px] text-[#1E1B24] dark:text-[#EDEAF2] outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Unreviewed">Unreviewed</option>
            <option value="Labelled">Labelled</option>
          </select>
        </div>
      </div>

      {/* Main Grid content */}
      {filteredViolations.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 font-mono py-20 animate-fade-in">
          No violations flagged — clean session.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {filteredViolations.map((v) => {
            let typeColor = 'bg-[#FBE4E1] text-[#C1493D]';
            if (v.type === 'Gaze') typeColor = 'bg-[#FDEFD6] text-[#A8731A]';
            if (v.status === 'Labelled' && v.label === 'False Positive') typeColor = 'bg-[#DFF3E8] text-[#2E8B5C]';

            return (
              <div
                key={v.id}
                onClick={() => setSelectedSnapshotId(v.id)}
                className="group rounded-2xl overflow-hidden border border-white/60 dark:border-white/10 bg-white/55 dark:bg-white/5 shadow-sm hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Simulated Thumbnail */}
                <div className="relative aspect-video bg-black/30 flex items-center justify-center overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.studentName}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-2.5 right-2.5 font-mono font-bold text-[10px] text-white bg-black/60 px-2 py-0.5 rounded">
                    Conf: {v.confidence}%
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${typeColor}`}>
                      {v.type}
                    </span>
                    <span className="text-[10px] text-[#5C5868]/60 font-mono">{v.status}</span>
                  </div>

                  <h4 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-[#EDEAF2] truncate">
                    {v.studentName}
                  </h4>
                  <p className="text-[10.5px] text-[#5C5868]/75 dark:text-[#9591A3]/50 truncate">
                    {v.exam}
                  </p>
                  <p className="text-[9.5px] font-mono text-[#5C5868]/50 mt-1">
                    {v.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Retraining progress section */}
      <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-3 select-none">
        <h4 className="font-semibold text-[13px] text-[#1E1B24] dark:text-[#EDEAF2]">
          Invigilator AI Self-Learning Pipeline
        </h4>
        <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 leading-normal">
          Your labels help Examiner AI&apos;s invigilator get smarter every month.
        </p>

        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[10px] font-mono text-[#5C5868]/70 dark:text-[#9591A3]/50">
            <span>Labels Collected towards Retraining cycle</span>
            <span className="font-bold">184 / 200 labels collected</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#4A63C9]" style={{ width: '92%' }} />
          </div>
        </div>
      </div>

      {/* Detail zoom modal */}
      {selectedSnapshotId && selectedSnapshot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FAF6EE] dark:bg-[#16141C] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/20">
              <h3 className="font-display font-bold text-[17px] text-[#1E1B24] dark:text-[#EDEAF2]">
                Inspect Violation Snapshot
              </h3>
              <button onClick={() => setSelectedSnapshotId(null)} className="text-[#5C5868]/60 hover:text-[#1E1B24]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Snapshot */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/20 border border-[#E3D5BC]/40 dark:border-white/5">
              <Image
                src={selectedSnapshot.image}
                alt={selectedSnapshot.studentName}
                fill
                className="object-contain"
              />
            </div>

            {/* Context Trail */}
            <div className="p-3 bg-white/20 dark:bg-white/5 border border-[#E3D5BC]/20 dark:border-white/5 rounded-xl text-[11.5px] leading-relaxed">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block mb-1">AI Gaze Context Trail</span>
              <p>
                Student gaze shifted off-screen to the lower right region for 4.2 seconds. Sound activity metrics within this window indicate secondary background voices at 12dB.
              </p>
            </div>

            {/* Details */}
            <div className="flex justify-between text-[11.5px] font-mono text-[#5C5868]/85 dark:text-[#9591A3]/80 border-b border-[#E3D5BC]/15 pb-2">
              <p>Student: **{selectedSnapshot.studentName}**</p>
              <p>Confidence: **{selectedSnapshot.confidence}%**</p>
            </div>

            {/* Labelling Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-end">
              <button
                onClick={() => handleLabel('Confirm Violation')}
                className="px-4 py-2.5 rounded-xl bg-[#C1493D] hover:bg-[#a83e34] text-white text-[12px] font-bold transition-all flex items-center justify-center gap-1"
              >
                <ThumbsDown className="w-3.5 h-3.5" /> Confirm Violation
              </button>
              <button
                onClick={() => handleLabel('False Positive')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold transition-all flex items-center justify-center gap-1"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> False Positive
              </button>
              <button
                onClick={() => handleLabel('Unclear')}
                className="px-4 py-2.5 rounded-xl bg-white/70 hover:bg-[#E3D9F7] text-[#5C5868] border border-[#E3D5BC]/40 text-[12px] font-bold transition-all flex items-center justify-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#5C5868]/60" /> Unclear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
