'use client';

import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { FileText, Download, Search, Lock, HardDrive } from 'lucide-react';

type DocFilter = 'all' | 'receipts' | 'academics' | 'tickets';

interface DocumentItem {
  id: string;
  name: string;
  category: 'receipts' | 'academics' | 'tickets';
  date: string;
  size: string;
  isLocked: boolean;
  downloadMsg: string;
}

export default function DocumentsPage() {
  const { receipts } = useStudent();
  const [activeCategory, setActiveCategory] = useState<DocFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExamRegistered, setIsExamRegistered] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Load registered state to unlock hall ticket
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsExamRegistered(localStorage.getItem('student_exam_registered') === 'true');
    }
  }, []);

  const getDocuments = (): DocumentItem[] => {
    // 1. Static academic marks cards
    const academicDocs: DocumentItem[] = [
      { id: 'DOC-SEM1', name: 'Semester 1 Official Transcript (Marks Card)', category: 'academics', date: '2024-06-15', size: '1.2 MB', isLocked: false, downloadMsg: 'Downloading Sem 1 marks card...' },
      { id: 'DOC-SEM2', name: 'Semester 2 Official Transcript (Marks Card)', category: 'academics', date: '2024-12-20', size: '1.4 MB', isLocked: false, downloadMsg: 'Downloading Sem 2 marks card...' },
      { id: 'DOC-SEM3', name: 'Semester 3 Official Transcript (Marks Card)', category: 'academics', date: '2025-06-18', size: '1.1 MB', isLocked: false, downloadMsg: 'Downloading Sem 3 marks card...' },
      { id: 'DOC-SEM4', name: 'Semester 4 Official Transcript (Marks Card)', category: 'academics', date: '2025-12-22', size: '1.5 MB', isLocked: false, downloadMsg: 'Downloading Sem 4 marks card...' }
    ];

    // 2. Exam registration hall ticket (locked by default until registered)
    const hallTicketDoc: DocumentItem = {
      id: 'DOC-HT-SEM5',
      name: 'Semester 5 Final Exam Hall Ticket',
      category: 'tickets',
      date: new Date().toISOString().split('T')[0],
      size: '420 KB',
      isLocked: !isExamRegistered,
      downloadMsg: 'Downloading Sem 5 Exam Hall Ticket...'
    };

    // 3. Dynamic payment receipts (read from context receipts list)
    const receiptDocs: DocumentItem[] = receipts.map((rcpt) => ({
      id: rcpt.id,
      name: `Payment Receipt: ${rcpt.examName}`,
      category: 'receipts' as const,
      date: rcpt.dateCompleted,
      size: '180 KB',
      isLocked: false,
      downloadMsg: `Downloading Receipt ${rcpt.id}...`
    }));

    return [hallTicketDoc, ...academicDocs, ...receiptDocs];
  };

  const handleDownload = (doc: DocumentItem) => {
    if (doc.isLocked) return;
    setDownloadingId(doc.id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`${doc.name} has been downloaded successfully.`);
    }, 1500);
  };

  const filteredDocs = getDocuments().filter((doc) => {
    const matchesCategory =
      activeCategory === 'all' || doc.category === activeCategory;

    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-md overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'all', name: 'All Locker Docs' },
            { id: 'academics', name: 'Transcripts' },
            { id: 'receipts', name: 'Receipts' },
            { id: 'tickets', name: 'Hall Tickets' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as DocFilter)}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-[#5C5868] dark:text-[#E4E2E4]/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by ID or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl pl-9 pr-4 py-2 text-[12.5px] text-[#1E1B24] dark:text-white outline-none"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3.5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
              doc.isLocked
                ? 'bg-white/10 dark:bg-white/2 border-[#E3D5BC]/20 dark:border-white/2 opacity-60'
                : 'bg-white/40 dark:bg-white/5 border-white/50 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 text-[#5C5868] dark:text-white shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-white/50 dark:bg-white/10 border border-[#E3D5BC]/30 dark:border-white/5 font-mono text-[9px] font-bold">
                    {doc.id}
                  </span>
                  <span className="text-[11.5px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">
                    Category: {doc.category}
                  </span>
                </div>
                <h4 className="font-semibold text-[13.5px] text-[#1E1B24] dark:text-white mt-1 leading-snug">
                  {doc.name}
                </h4>
                <p className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-1">
                  Issued: {doc.date} · File Size: {doc.size}
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto flex justify-end">
              {doc.isLocked ? (
                <div className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 rounded-xl text-[12px] font-bold flex items-center gap-1.5 cursor-not-allowed">
                  <Lock className="w-3.5 h-3.5" /> Registered Locked
                </div>
              ) : (
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloadingId !== null}
                  className="px-4 py-2 bg-white/60 dark:bg-white/5 hover:bg-white border border-[#E3D5BC]/30 dark:border-white/10 text-[#5C5868] hover:text-[#1E1B24] dark:text-white dark:hover:bg-white/15 transition-all flex items-center gap-1.5 text-[12.5px] font-semibold"
                >
                  {downloadingId === doc.id ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Download
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cloud Drive Storage usage bar chart */}
      <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
        <h3 className="font-display font-bold text-[15px] text-[#1E1B24] dark:text-white mb-4 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-[#9C7FDB]" />
          Locker Drive Storage Capacity
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-[12px] font-mono text-[#5C5868] dark:text-[#E4E2E4]/80">
            <span>Storage Used: **14.2 MB** of 100.0 MB total</span>
            <span className="font-bold text-[#1E1B24] dark:text-white">14.2% filled</span>
          </div>
          <div className="h-2.5 w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#9C7FDB] to-[#7B93E8] rounded-full" style={{ width: '14.2%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
