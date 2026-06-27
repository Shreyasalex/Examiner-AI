'use client';

import React, { useState, useEffect } from 'react';
import { useFaculty } from '../context/FacultyContext';
import { FileCheck2, Plus, Send, X, FileText, Download } from 'lucide-react';

export default function AssignmentsPage() {
  const { assignments, addAssignment, gradeSubmission } = useFaculty();

  // Filter & selections
  const [filterType, setFilterType] = useState<'All' | 'Assignment' | 'Project'>('All');
  const [selectedAsnId, setSelectedAsnId] = useState<string>('ASN-001');

  // Modals / drawers states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'Assignment' | 'Project'>('Assignment');
  const [showGradingDrawer, setShowGradingDrawer] = useState(false);
  const [selectedSub, setSelectedSub] = useState<{ rollNumber: string; name: string } | null>(null);

  // New assignment form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const newCourse = 'CS-305: Neural Network Architectures';
  const [newDueDate, setNewDueDate] = useState('');
  const [newMaxMarks, setNewMaxMarks] = useState(50);

  // Grading form states
  const [gradeMarks, setGradeMarks] = useState<number>(0);
  const [gradeFeedback, setGradeFeedback] = useState('');

  const filteredAsns = assignments.filter((asn) => {
    const type = asn.type || (asn.id.startsWith('PRJ') ? 'Project' : 'Assignment');
    if (filterType === 'All') return true;
    return type === filterType;
  });

  const selectedAsn = assignments.find((a) => a.id === selectedAsnId);

  useEffect(() => {
    const typeFiltered = assignments.filter((asn) => {
      const type = asn.type || (asn.id.startsWith('PRJ') ? 'Project' : 'Assignment');
      if (filterType === 'All') return true;
      return type === filterType;
    });
    if (typeFiltered.length > 0) {
      if (!typeFiltered.some(a => a.id === selectedAsnId)) {
        setSelectedAsnId(typeFiltered[0].id);
      }
    } else {
      setSelectedAsnId('');
    }
  }, [filterType, selectedAsnId, assignments]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDueDate) return;

    addAssignment({
      title: newTitle,
      description: newDesc,
      course: newCourse,
      dueDate: newDueDate,
      maxMarks: Number(newMaxMarks),
      status: 'Active',
      type: createType
    });

    setNewTitle('');
    setNewDesc('');
    setNewDueDate('');
    setShowCreateModal(false);
  };

  const handleOpenGrading = (rollNum: string, name: string) => {
    const sub = selectedAsn?.submissions.find((s) => s.rollNumber === rollNum);
    setSelectedSub({ rollNumber: rollNum, name });
    setGradeMarks(sub?.marks || 0);
    setGradeFeedback(sub?.feedback || '');
    setShowGradingDrawer(true);
  };

  const handleSaveGrade = () => {
    if (!selectedAsn || !selectedSub) return;
    gradeSubmission(selectedAsn.id, selectedSub.rollNumber, Number(gradeMarks), gradeFeedback);
    setShowGradingDrawer(false);
    setSelectedSub(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">CREATE & TRACK</span>
          <h2 className="font-display font-bold text-[22px] text-[#1E1B24] dark:text-[#EDEAF2] mt-0.5">
            Assignments & Projects
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setCreateType('Assignment');
              setShowCreateModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#4A63C9] hover:bg-[#3b51b3] text-white text-[12px] font-semibold transition-all shadow-md flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>New Assignment</span>
          </button>
          <button
            onClick={() => {
              setCreateType('Project');
              setShowCreateModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-white/70 dark:bg-white/5 hover:bg-[#E3D9F7] dark:hover:bg-white/10 border border-[#E3D5BC]/55 dark:border-white/5 text-[#4A63C9] dark:text-[#B5C7E8] text-[12px] font-semibold transition-all flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {assignments.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 font-mono py-20">
          You haven&apos;t created any assignments or projects yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tasks List */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-[15.5px] text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-2">
                <FileCheck2 className="w-4.5 h-4.5 text-[#4A63C9]" />
                Evaluation Tasks
              </h3>
            </div>

            {/* Filter chips */}
            <div className="flex bg-[#E3D5BC]/30 dark:bg-white/5 rounded-xl p-1 border border-[#E3D5BC]/20 text-[11px]">
              {(['All', 'Assignment', 'Project'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-1 px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-200 ${
                    filterType === type
                      ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                      : 'text-[#5C5868]/85 dark:text-[#9591A3]/60 hover:text-[#1E1B24] dark:hover:text-[#EDEAF2]'
                  }`}
                >
                  {type}s
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredAsns.length === 0 ? (
                <div className="p-6 rounded-2xl bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/5 text-center text-[#5C5868]/60 text-[11.5px] py-12">
                  No {filterType.toLowerCase()}s found matching this filter.
                </div>
              ) : (
                filteredAsns.map((asn) => {
                  const isActive = asn.id === selectedAsnId;
                  const type = asn.type || (asn.id.startsWith('PRJ') ? 'Project' : 'Assignment');
                  return (
                    <button
                      key={asn.id}
                      onClick={() => setSelectedAsnId(asn.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-white dark:bg-white/5 border-[#4A63C9] shadow-lg shadow-[#4A63C9]/5'
                          : 'bg-white/20 dark:bg-white/5 border-white/40 dark:border-white/5 hover:bg-white/50'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] leading-tight">
                            {asn.title}
                          </h4>
                          <span className={`inline-block px-1.5 py-0.5 rounded font-mono text-[8px] font-bold ${
                            type === 'Project'
                              ? 'bg-[#F2EBE0]/80 dark:bg-purple-950/40 text-purple-700 dark:text-[#D1B3FF] border border-purple-300/35'
                              : 'bg-[#E1E9FB]/70 dark:bg-blue-950/40 text-[#4A63C9] dark:text-blue-300 border border-blue-300/35'
                          }`}>
                            {type}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                          asn.status === 'Active' ? 'bg-[#E1E9FB] text-[#3B5BC4]' : 'bg-[#E7E9EF] text-[#5C6478]'
                        }`}>
                          {asn.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5C5868]/70 dark:text-[#9591A3]/50 font-mono mt-1.5">
                        {asn.course.split(': ')[0]}
                      </p>
                      <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-[#5C5868]/80 dark:text-[#9591A3]/80">
                        <span>Due: {asn.dueDate}</span>
                        <span className="font-bold text-[#4A63C9] dark:text-[#B5C7E8]">
                          {asn.submittedCount} / {asn.totalCount} Sub
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Submissions Table for Selected Task */}
          {selectedAsn ? (
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white/55 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E3D5BC]/20 dark:border-white/5">
                <div>
                  <h3 className="font-display font-bold text-[15.5px] text-[#1E1B24] dark:text-[#EDEAF2]">
                    Submissions List
                  </h3>
                  <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#9591A3]/60 mt-0.5">
                    {selectedAsn.title}
                  </p>
                </div>

                {/* Bulk actions bar */}
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded-xl bg-white/60 dark:bg-white/10 hover:bg-[#E3D5BC]/40 border border-[#E3D5BC]/40 dark:border-white/5 text-[11.5px] text-[#1E1B24] dark:text-[#EDEAF2] font-semibold flex items-center gap-1 transition-all">
                    <Download className="w-3.5 h-3.5 text-[#5C5868]/60" />
                    <span>Export</span>
                  </button>
                  <button className="px-3 py-2 rounded-xl bg-[#E3D9F7] hover:bg-[#cfc0f2] border border-transparent text-[11.5px] text-[#4A63C9] font-bold flex items-center gap-1 transition-all">
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reminder</span>
                  </button>
                </div>
              </div>

              {/* Submissions list */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto no-scrollbar">
                {selectedAsn.submissions.length === 0 ? (
                  <p className="text-center py-8 text-[12px] text-[#5C5868]/60">No submissions uploaded yet.</p>
                ) : (
                  selectedAsn.submissions.map((sub) => {
                    let pillStyle = 'bg-[#E1E9FB] text-[#3B5BC4]';
                    if (sub.status === 'Late') pillStyle = 'bg-[#FDEFD6] text-[#A8731A]';
                    if (sub.status === 'Missing') pillStyle = 'bg-[#FBE4E1] text-[#C1493D]';

                    return (
                      <div
                        key={sub.rollNumber}
                        className="p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/5 flex items-center justify-between gap-3 text-[12.5px]"
                      >
                        <div>
                          <h4 className="font-semibold text-[#1E1B24] dark:text-[#EDEAF2]">
                            {sub.studentName}
                          </h4>
                          <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#5C5868]/70 dark:text-[#9591A3]/50 mt-1">
                            <span>{sub.rollNumber}</span>
                            <span>·</span>
                            <span>{sub.timestamp}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${pillStyle}`}>
                            {sub.status}
                          </span>
                          {sub.status !== 'Missing' && (
                            <button
                              onClick={() => handleOpenGrading(sub.rollNumber, sub.studentName)}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                sub.graded
                                  ? 'bg-[#DFF3E8] text-[#2E8B5C] hover:bg-[#DFF3E8]/80'
                                  : 'bg-[#4A63C9] text-white hover:bg-[#3b51b3]'
                              }`}
                            >
                              {sub.graded ? `Graded (${sub.marks})` : 'Grade'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleCreateSubmit} className="bg-[#FAF6EE] dark:bg-[#16141C] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E3D5BC]/20">
              <h3 className="font-display font-bold text-[18px] text-[#1E1B24] dark:text-[#EDEAF2]">
                Create New {createType}
              </h3>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-[#5C5868]/60 hover:text-[#1E1B24]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Title</label>
              <input
                type="text"
                placeholder={`e.g. ${createType} 3: Matrix Factors`}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Description</label>
              <textarea
                placeholder="Include description or parameters..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Max Marks</label>
                <input
                  type="number"
                  value={newMaxMarks}
                  onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-[#4A63C9] text-white text-[13px] font-bold rounded-xl hover:bg-[#3b51b3] shadow-md transition-all"
            >
              Publish {createType}
            </button>
          </form>
        </div>
      )}

      {/* Grading Slide-Over Drawer */}
      {showGradingDrawer && selectedSub && selectedAsn && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#FAF6EE] dark:bg-[#16141C] border-l border-[#E3D5BC] dark:border-white/10 p-6 shadow-2xl flex flex-col justify-between h-full animate-slide-left">
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center pb-3 border-b border-[#E3D5BC]/20">
                <div>
                  <h3 className="font-display font-bold text-[17px] text-[#1E1B24] dark:text-[#EDEAF2]">
                    Grade Submission
                  </h3>
                  <p className="text-[11px] text-[#5C5868]/70 dark:text-[#9591A3]/50 font-mono mt-0.5">
                    Student: {selectedSub.name}
                  </p>
                </div>
                <button onClick={() => setShowGradingDrawer(false)} className="text-[#5C5868]/60 hover:text-[#1E1B24]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Inline File Mockup */}
              <div className="p-4 rounded-xl border border-[#E3D5BC]/30 dark:border-white/5 bg-white/35 dark:bg-white/5 space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50 block">Submitted File</span>
                <div className="flex items-center gap-2.5">
                  <FileText className="w-8 h-8 text-[#4A63C9]" />
                  <div>
                    <h5 className="font-semibold text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2]">
                      {selectedAsn.submissions.find(s => s.rollNumber === selectedSub.rollNumber)?.fileUrl}
                    </h5>
                    <p className="text-[9.5px] text-[#5C5868]/60 dark:text-[#9591A3]/50 font-mono mt-0.5">
                      PDF Document · 1.4 MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Marks Secured</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={selectedAsn.maxMarks}
                    value={gradeMarks}
                    onChange={(e) => setGradeMarks(Number(e.target.value))}
                    className="bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[15px] font-bold font-mono text-[#1E1B24] dark:text-[#EDEAF2] w-24 focus:outline-none focus:border-[#4A63C9]"
                  />
                  <span className="text-[13px] font-mono text-[#5C5868]/60">/ {selectedAsn.maxMarks}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Feedback Commentary</label>
                <textarea
                  placeholder="Provide qualitative feedback remarks..."
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  rows={4}
                  className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2.5 text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3D5BC]/20">
              <button
                onClick={handleSaveGrade}
                className="w-full py-3 bg-[#4A63C9] hover:bg-[#3b51b3] text-white text-[13px] font-bold rounded-xl shadow-md transition-all"
              >
                Save Evaluation Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
