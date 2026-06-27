'use client';

import React, { useState } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { UploadCloud, Trash2, FolderPlus, Loader2, CheckCircle2, Plus, X, Download } from 'lucide-react';

export default function StudyMaterialsPage() {
  const { materials, uploadMaterial, deleteMaterial } = useFaculty();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('CS-305: Neural Network Architectures');
  const [newType, setNewType] = useState<'PDF' | 'PPT' | 'DOC'>('PDF');
  const [newDesc, setNewDesc] = useState('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    uploadMaterial({
      title: newTitle,
      course: newCourse,
      type: newType,
      size: '2.4 MB'
    });

    setNewTitle('');
    setNewDesc('');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">UPLOAD & MANAGE</span>
          <h2 className="font-display font-bold text-[22px] text-[#1E1B24] dark:text-[#EDEAF2] mt-0.5">
            Study Materials
          </h2>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 rounded-xl bg-[#4A63C9] hover:bg-[#3b51b3] text-white text-[12px] font-semibold transition-all shadow-md flex items-center gap-1 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {materials.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 font-mono py-20 animate-fade-in">
          Upload your first material to get started.
        </div>
      ) : (
        /* Materials Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {materials.map((mat) => {
            const isIndexing = mat.indexingStatus === 'Indexing...';
            let typeColor = 'bg-[#4A63C9]/10 text-[#4A63C9]';
            if (mat.type === 'PPT') typeColor = 'bg-[#9C7FDB]/10 text-[#9C7FDB]';
            if (mat.type === 'DOC') typeColor = 'bg-amber-500/10 text-amber-500';

            return (
              <div
                key={mat.id}
                className="p-5 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between h-[180px] transition-all hover:scale-[1.01]"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${typeColor}`}>
                      {mat.type}
                    </span>

                    {/* RAG Indexing Badge */}
                    {isIndexing ? (
                      <span className="flex items-center gap-1 font-mono text-[9.5px] font-bold text-[#A8731A] bg-[#FDEFD6] px-2 py-0.5 rounded">
                        <Loader2 className="w-3 h-3 animate-spin text-[#A8731A]" />
                        <span>Indexing…</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-mono text-[9.5px] font-bold text-[#2E8B5C] bg-[#DFF3E8] px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-[#2E8B5C]" />
                        <span>Indexed ✓</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-semibold text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] leading-snug line-clamp-2 pr-4">
                    {mat.title}
                  </h4>
                  <p className="text-[10px] text-[#5C5868]/70 dark:text-[#9591A3]/50 font-mono">
                    {mat.course.split(': ')[0]}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#E3D5BC]/15 dark:border-white/5 pt-3 mt-2">
                  <div className="flex items-center gap-3 text-[10.5px] text-[#5C5868]/70 dark:text-[#9591A3]/50 font-mono">
                    <span className="flex items-center gap-0.5">
                      <Download className="w-3 h-3 text-[#5C5868]/60" /> {mat.downloadsCount}
                    </span>
                    <span>Size: {mat.size}</span>
                  </div>

                  <button
                    onClick={() => deleteMaterial(mat.id)}
                    className="p-1.5 rounded-lg text-[#C1493D] hover:bg-[#FBE4E1] dark:hover:bg-[#C1493D]/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleUploadSubmit} className="bg-[#FAF6EE] dark:bg-[#16141C] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/20">
              <h3 className="font-display font-bold text-[18px] text-[#1E1B24] dark:text-[#EDEAF2]">
                Upload Study Material
              </h3>
              <button type="button" onClick={() => setShowUploadModal(false)} className="text-[#5C5868]/60 hover:text-[#1E1B24]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Material Title</label>
              <input
                type="text"
                placeholder="e.g. Backpropagation gradients math slides"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Target Subject</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-2.5 py-2 text-[12px] text-[#1E1B24] dark:text-[#EDEAF2]"
                >
                  <option value="CS-305: Neural Network Architectures">Neural Networks</option>
                  <option value="CS-301: Advanced Data Structures">Data Structures</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Doc Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as 'PDF' | 'PPT' | 'DOC')}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-2.5 py-2 text-[12px] text-[#1E1B24] dark:text-[#EDEAF2]"
                >
                  <option value="PDF">PDF</option>
                  <option value="PPT">PPT</option>
                  <option value="DOC">DOC</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Short Description</label>
              <textarea
                placeholder="Include a summary of the syllabus topics covered..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none resize-none"
              />
            </div>

            {/* Drag Drop simulated area */}
            <div className="border-2 border-dashed border-[#E3D5BC]/80 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#4A63C9] transition-all">
              <UploadCloud className="w-8 h-8 text-[#5C5868]/60 dark:text-[#9591A3]/50 mb-2" />
              <p className="text-[11.5px] text-[#1E1B24] dark:text-[#EDEAF2] font-semibold">Select files or drag here</p>
              <span className="text-[9.5px] text-[#5C5868]/60 dark:text-[#9591A3]/40 mt-0.5">Maximum size limit 25MB</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-[#4A63C9] text-white text-[13px] font-bold rounded-xl hover:bg-[#3b51b3] shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <FolderPlus className="w-4.5 h-4.5" />
              <span>Confirm & Start RAG Indexing</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
