'use client';

import React, { useState } from 'react';
import { UploadCloud, Trash2, FolderPlus, BookOpen, Loader2, CheckCircle2 } from 'lucide-react';

interface MaterialItem {
  id: string;
  name: string;
  course: string;
  type: 'PDF' | 'Code' | 'Document';
  size: string;
  dateAdded: string;
}

export default function CourseMaterialsPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: '1', name: 'CS305_Lecture_3_Backpropagation_Derivations.pdf', course: 'Neural Network Architectures (CS-305)', type: 'PDF', size: '4.2 MB', dateAdded: '2026-06-20' },
    { id: '2', name: 'Backprop_Scratch_Implementation.ipynb', course: 'Neural Network Architectures (CS-305)', type: 'Code', size: '280 KB', dateAdded: '2026-06-22' },
    { id: '3', name: 'CS301_Red_Black_Trees_Guide.pdf', course: 'Advanced Data Structures (CS-301)', type: 'PDF', size: '1.8 MB', dateAdded: '2026-06-15' },
    { id: '4', name: 'CS301_Lab_Manual_Sem_End_Prep.docx', course: 'Advanced Data Structures (CS-301)', type: 'Document', size: '820 KB', dateAdded: '2026-06-18' }
  ]);

  const [selectedCourse, setSelectedCourse] = useState('Neural Network Architectures (CS-305)');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const simulateUpload = (fileName: string) => {
    setIsUploading(true);
    setUploadSuccess(false);

    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      const newFile: MaterialItem = {
        id: String(Date.now()),
        name: fileName,
        course: selectedCourse,
        type: fileName.endsWith('.ipynb') || fileName.endsWith('.py') ? 'Code' : fileName.endsWith('.pdf') ? 'PDF' : 'Document',
        size: '1.2 MB',
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setMaterials((prev) => [newFile, ...prev]);

      setTimeout(() => setUploadSuccess(false), 3000);
    }, 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0].name);
    }
  };

  const handleDelete = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Drag and drop uploader */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-[#9C7FDB]" />
            Upload Materials
          </h3>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Target Class</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full bg-white/50 dark:bg-[#1E1B24]/40 border border-[#E3D5BC]/50 dark:border-white/5 rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B24] dark:text-white outline-none"
            >
              <option value="Neural Network Architectures (CS-305)">Neural Networks (CS-305)</option>
              <option value="Advanced Data Structures (CS-301)">Data Structures (CS-301)</option>
            </select>
          </div>

          {/* Dotted Upload Zone */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative min-h-[220px] ${
              dragActive
                ? 'border-[#4A63C9] bg-[#4A63C9]/5'
                : 'border-[#E3D5BC] hover:border-[#4A63C9] dark:border-white/10 dark:hover:border-white/20'
            }`}
          >
            {isUploading ? (
              <div className="space-y-3">
                <Loader2 className="w-9 h-9 text-[#4A63C9] animate-spin mx-auto" />
                <p className="text-[13px] font-semibold text-[#1E1B24] dark:text-white">Processing syllabus files...</p>
                <span className="text-[10.5px] text-[#5C5868]/70 font-mono">Syncing file metadata</span>
              </div>
            ) : uploadSuccess ? (
              <div className="space-y-2">
                <CheckCircle2 className="w-9 h-9 text-[#2E8B5C] mx-auto" />
                <p className="text-[13px] font-semibold text-[#2E8B5C]">Uploaded successfully!</p>
                <span className="text-[10.5px] text-[#5C5868]/60 font-mono">Added to course repository</span>
              </div>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mb-3" />
                <p className="text-[13px] font-semibold text-[#1E1B24] dark:text-white">
                  Drag & drop course materials here
                </p>
                <p className="text-[11px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1 max-w-[200px]">
                  Supports lecture decks (PDF), raw notebook codes (IPYNB), or syllabus structures.
                </p>
                <label className="mt-4 px-4 py-2 bg-[#E3D5BC]/30 dark:bg-white/5 hover:bg-[#E3D5BC]/50 dark:hover:bg-white/10 rounded-xl text-[11.5px] font-bold text-[#1E1B24] dark:text-white transition-all cursor-pointer">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Right: Existing Syllabus Items */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4A63C9]" />
            Active Syllabus Repository
          </h3>

          <div className="space-y-3 max-h-[460px] overflow-y-auto no-scrollbar">
            {materials.map((item) => {
              let fileBadge = 'bg-[#4A63C9]/10 text-[#4A63C9]';
              if (item.type === 'Code') fileBadge = 'bg-[#9C7FDB]/10 text-[#9C7FDB]';
              if (item.type === 'Document') fileBadge = 'bg-amber-500/10 text-amber-500';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/5 flex justify-between items-center gap-3 text-[12.5px]"
                >
                  <div className="min-w-0 space-y-1">
                    <h4 className="font-semibold text-[#1E1B24] dark:text-white truncate pr-2">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 font-mono truncate">
                      {item.course.split(' ')[0]}
                    </p>
                    <div className="flex items-center gap-2.5 font-mono text-[10.5px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${fileBadge}`}>
                        {item.type}
                      </span>
                      <span>Size: {item.size}</span>
                      <span>Uploaded: {item.dateAdded}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl text-[#C1493D] hover:bg-[#FBE4E1] dark:hover:bg-[#C1493D]/10 shrink-0 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
