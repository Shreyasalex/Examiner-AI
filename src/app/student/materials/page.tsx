'use client';

import React, { useState } from 'react';
import { BookOpen, FileText, Video, Award, Download, Search } from 'lucide-react';

type CategoryFilter = 'all' | 'notes' | 'slides' | 'videos' | 'papers';

interface MaterialItem {
  id: string;
  title: string;
  course: string;
  type: 'notes' | 'slides' | 'video' | 'paper';
  format: string;
  size: string;
  downloadUrl: string;
  author: string;
}

const STUDY_MATERIALS: MaterialItem[] = [
  { id: 'MAT-301', title: 'Lecture Notes: Amortized Analysis & Splay Trees', course: 'Advanced Data Structures', type: 'notes', format: 'PDF', size: '2.4 MB', downloadUrl: '#', author: 'Dr. Evelyn Vance' },
  { id: 'MAT-302', title: 'Slides: Graph Connectivity & Planar Graphs', course: 'Discrete Mathematics', type: 'slides', format: 'PDF', size: '4.8 MB', downloadUrl: '#', author: 'Prof. Marcus Brody' },
  { id: 'MAT-303', title: 'Jupyter Tutorial: Feedforward Networks Backprop', course: 'Neural Network Architectures', type: 'notes', format: 'IPYNB', size: '1.2 MB', downloadUrl: '#', author: 'Dr. Grace Hopper' },
  { id: 'MAT-304', title: 'Video: Dynamic Programming Knapsack Proofs', course: 'Advanced Algorithms', type: 'video', format: 'MP4 (28m)', size: '145 MB', downloadUrl: '#', author: 'Prof. Alan Turing' },
  { id: 'MAT-305', title: 'Sem End Mock Exam Set A & B', course: 'Computational Logic', type: 'paper', format: 'PDF', size: '890 KB', downloadUrl: '#', author: 'Dr. Sarah Jenkins' },
  { id: 'MAT-306', title: 'Lecture Notes: First-Order Predicate Calculi', course: 'Computational Logic', type: 'notes', format: 'PDF', size: '1.8 MB', downloadUrl: '#', author: 'Dr. Sarah Jenkins' },
  { id: 'MAT-307', title: 'Slides: CNNs & Image Kernels Convolution', course: 'Neural Network Architectures', type: 'slides', format: 'PDF', size: '6.2 MB', downloadUrl: '#', author: 'Dr. Grace Hopper' },
  { id: 'MAT-308', title: 'Midterm Past Exams Solutions (2024, 2025)', course: 'Advanced Algorithms', type: 'paper', format: 'PDF', size: '3.1 MB', downloadUrl: '#', author: 'Prof. Alan Turing' }
];

export default function StudyMaterialsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('All Courses');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const courses = ['All Courses', 'Advanced Data Structures', 'Discrete Mathematics', 'Computational Logic', 'Advanced Algorithms', 'Neural Network Architectures'];

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert('Resource downloaded successfully to local storage.');
    }, 1500);
  };

  const filteredMaterials = STUDY_MATERIALS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'notes' && item.type === 'notes') ||
      (activeCategory === 'slides' && item.type === 'slides') ||
      (activeCategory === 'videos' && item.type === 'video') ||
      (activeCategory === 'papers' && item.type === 'paper');

    const matchesCourse = selectedCourse === 'All Courses' || item.course === selectedCourse;

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Course Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-[#5C5868] dark:text-[#E4E2E4]/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lectures, books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl pl-9 pr-4 py-2 text-[12.5px] text-[#1E1B24] dark:text-white outline-none"
          />
        </div>

        {/* Course Dropdown */}
        <div className="w-full md:w-auto shrink-0">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full md:w-auto bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-4 py-2 text-[12.5px] text-[#1E1B24] dark:text-white outline-none"
          >
            {courses.map((c) => (
              <option key={c} value={c} className="dark:bg-[#131315]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-md overflow-x-auto no-scrollbar shrink-0">
        {[
          { id: 'all', name: 'All Resources' },
          { id: 'notes', name: 'Notes' },
          { id: 'slides', name: 'Slides' },
          { id: 'videos', name: 'Videos' },
          { id: 'papers', name: 'Exam Papers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as CategoryFilter)}
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

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 dark:text-[#E4E2E4]/40 font-mono text-[13px]">
            No study materials matched your filters.
          </div>
        ) : (
          filteredMaterials.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between gap-4 hover:bg-white/60 dark:hover:bg-white/10 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-white/50 dark:bg-white/10 border border-[#E3D5BC]/30 dark:border-white/5 font-mono text-[9px] font-bold text-[#5C5868] dark:text-[#E4E2E4]">
                    {item.id}
                  </span>
                  <span className="text-[10px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                    {item.format} · {item.size}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4A63C9]/10 text-[#4A63C9] shrink-0 mt-1">
                    {item.type === 'notes' && <FileText className="w-5 h-5" />}
                    {item.type === 'slides' && <BookOpen className="w-5 h-5" />}
                    {item.type === 'video' && <Video className="w-5 h-5" />}
                    {item.type === 'paper' && <Award className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[14px] text-[#1E1B24] dark:text-white leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60 mt-1 font-mono">
                      Course: {item.course}
                    </p>
                    <p className="text-[11px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-0.5">
                      Provided by: {item.author}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(item.id)}
                disabled={downloadingId !== null}
                className="w-full py-2.5 bg-[#4A63C9]/10 hover:bg-[#4A63C9] text-[#4A63C9] hover:text-white disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-500 rounded-xl text-[12.5px] font-bold transition-all flex items-center justify-center gap-1.5"
              >
                {downloadingId === item.id ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#4A63C9] border-t-transparent rounded-full animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Download Resource
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Materials Usage progress chart */}
      <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5">
        <h3 className="font-display font-bold text-[15px] text-[#1E1B24] dark:text-white mb-4">
          Study Materials Download & Syllabus Mastery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { course: 'Data Structures', pct: '85%', color: 'bg-[#9C7FDB]' },
            { course: 'Discrete Mathematics', pct: '60%', color: 'bg-[#7B93E8]' },
            { course: 'Computational Logic', pct: '45%', color: 'bg-[#FF9A9E]' },
            { course: 'Advanced Algorithms', pct: '70%', color: 'bg-[#FDA085]' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-[#E3D5BC]/20 dark:border-white/5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">{item.course}</span>
              <div className="flex justify-between items-center text-[12.5px] font-mono">
                <span>Completed:</span>
                <span className="font-bold">{item.pct}</span>
              </div>
              <div className="h-1.5 w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
