'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface FacultyProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  office: string;
}

export interface ClassSection {
  id: string;
  subject: string;
  semester: string;
  department: string;
  studentCount: number;
  roster: {
    rollNumber: string;
    name: string;
    attendance: number;
    grade: string;
  }[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  maxMarks: number;
  submittedCount: number;
  totalCount: number;
  status: 'Active' | 'Closed';
  type?: 'Assignment' | 'Project';
  submissions: {
    studentName: string;
    rollNumber: string;
    timestamp: string;
    status: 'Submitted' | 'Late' | 'Missing';
    fileUrl?: string;
    marks?: number;
    feedback?: string;
    graded: boolean;
  }[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  course: string;
  type: 'PDF' | 'PPT' | 'DOC';
  size: string;
  uploadDate: string;
  downloadsCount: number;
  indexingStatus: 'Indexing...' | 'Indexed ✓';
}

export interface Exam {
  id: string;
  title: string;
  course: string;
  questionsCount: number;
  marks: number;
  status: 'Scheduled' | 'Live Now' | 'Completed';
  examType?: 'Theory' | 'Coding' | 'Circuit' | 'Chemistry' | 'Mixed';
  scheduleDate?: string;
  duration?: number; // mins
  testCases?: { input: string; output: string }[];
  students: {
    id: string;
    name: string;
    avatar: string;
    status: 'green' | 'amber' | 'red';
    violationsCount: number;
    violationHistory: string[];
  }[];
  violationsFeed: {
    studentName: string;
    type: string;
    timestamp: string;
  }[];
}

export interface ViolationSnapshot {
  id: string;
  studentName: string;
  exam: string;
  timestamp: string;
  confidence: number; // e.g. 94%
  type: 'Gaze' | 'Object Detected' | 'Person Count';
  image: string;
  status: 'Unreviewed' | 'Labelled';
  label?: 'Confirm Violation' | 'False Positive' | 'Unclear';
}

export interface NotificationSettings {
  scriptAlerts: boolean;
  proctorAlerts: boolean;
  meetingReminders: boolean;
}

interface FacultyContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  profile: FacultyProfile;
  updateProfile: (p: Partial<FacultyProfile>) => void;
  avatarIndex: number;
  setAvatarIndex: (i: number) => void;
  semester: 'Sem 1' | 'Sem 3' | 'Sem 5' | 'Sem 7';
  setSemester: (sem: 'Sem 1' | 'Sem 3' | 'Sem 5' | 'Sem 7') => void;
  classes: ClassSection[];
  assignments: Assignment[];
  addAssignment: (assign: Omit<Assignment, 'id' | 'submittedCount' | 'totalCount' | 'submissions'> & { type?: 'Assignment' | 'Project' }) => void;
  gradeSubmission: (assignId: string, rollNumber: string, marks: number, feedback: string) => void;
  materials: StudyMaterial[];
  uploadMaterial: (mat: Omit<StudyMaterial, 'id' | 'uploadDate' | 'downloadsCount' | 'indexingStatus'>) => void;
  deleteMaterial: (id: string) => void;
  editMaterial: (id: string, updates: Partial<StudyMaterial>) => void;
  exams: Exam[];
  deployExam: (examId: string, config: { examType: 'Theory' | 'Coding' | 'Circuit' | 'Chemistry' | 'Mixed'; scheduleDate: string; duration: number; testCases?: { input: string; output: string }[] }) => void;
  updateExamLiveControls: (examId: string, action: 'pause' | 'extend' | 'end') => void;
  evaluationExams: {
    id: string;
    title: string;
    course: string;
    status: 'AI Evaluation Pending' | 'Ready for Review' | 'Published';
    scripts: {
      studentName: string;
      rollNumber: string;
      gpa: string;
      reviewed: boolean;
      questions: {
        id: string;
        text: string;
        type: 'Text' | 'Diagram' | 'Code' | 'Math';
        studentAnswer: string;
        aiSuggestedMarks: number;
        aiFeedback: string;
        finalMarks?: number;
        finalFeedback?: string;
        approved: boolean;
      }[];
    }[];
  }[];
  approveQuestionMarks: (examId: string, rollNumber: string, qId: string, marks: number, feedback: string) => void;
  approveAllQuestions: (examId: string, rollNumber: string) => void;
  publishExamResults: (examId: string) => void;
  violations: ViolationSnapshot[];
  labelViolationSnapshot: (id: string, label: 'Confirm Violation' | 'False Positive' | 'Unclear') => void;
  notificationSettings: NotificationSettings;
  setNotificationSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

export const FACULTY_AVATAR_PRESETS = [
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
  "linear-gradient(135deg, #7B93E8 0%, #4A63C9 100%)",
  "linear-gradient(135deg, #9C7FDB 0%, #7B93E8 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #130CB7 0%, #52E5E7 100%)",
  "linear-gradient(135deg, #F6D365 0%, #FDA085 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
];

export function FacultyProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [avatarIndex, setAvatarIndexState] = useState<number>(2);
  const [semester, setSemesterState] = useState<'Sem 1' | 'Sem 3' | 'Sem 5' | 'Sem 7'>('Sem 5');
  const [profile, setProfileState] = useState<FacultyProfile>({
    name: 'Dr. Priya Nair',
    email: 'p.nair@university.edu',
    role: 'Associate Professor, CSE',
    department: 'Computer Science & Engineering',
    phone: '+1 555-0811',
    office: 'Block C, Cabin 302'
  });

  const [classes, setClasses] = useState<ClassSection[]>([
    {
      id: 'SEC-A-CS305',
      subject: 'CS-305: Neural Network Architectures',
      semester: 'Semester 5',
      department: 'CSE',
      studentCount: 45,
      roster: [
        { rollNumber: 'EX-2026-8893', name: 'Alex Sterling', attendance: 92, grade: 'A' },
        { rollNumber: 'EX-2026-7734', name: 'Clara Mercer', attendance: 96, grade: 'S' },
        { rollNumber: 'EX-2026-1049', name: 'Devon Lee', attendance: 78, grade: 'C' },
        { rollNumber: 'EX-2026-4402', name: 'Elena Rostova', attendance: 88, grade: 'B' },
        { rollNumber: 'EX-2026-1192', name: 'Marcus Aurelius', attendance: 95, grade: 'A' }
      ]
    },
    {
      id: 'SEC-B-CS301',
      subject: 'CS-301: Advanced Data Structures',
      semester: 'Semester 5',
      department: 'CSE',
      studentCount: 42,
      roster: [
        { rollNumber: 'EX-2026-4402', name: 'Elena Rostova', attendance: 88, grade: 'A' },
        { rollNumber: 'EX-2026-1192', name: 'Marcus Aurelius', attendance: 95, grade: 'S' },
        { rollNumber: 'EX-2026-5591', name: 'Siddharth Sen', attendance: 82, grade: 'B' }
      ]
    }
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'ASN-001',
      title: 'Backpropagation Gradient Derivation',
      description: 'Derive partial derivatives for a multilayer perceptron with ReLU and Sigmoid activations.',
      course: 'CS-305: Neural Network Architectures',
      dueDate: '2026-07-02',
      maxMarks: 50,
      submittedCount: 38,
      totalCount: 45,
      status: 'Active',
      type: 'Assignment',
      submissions: [
        { studentName: 'Alex Sterling', rollNumber: 'EX-2026-8893', timestamp: '2026-06-25 10:15 AM', status: 'Submitted', fileUrl: 'alex_derivation.pdf', graded: false },
        { studentName: 'Clara Mercer', rollNumber: 'EX-2026-7734', timestamp: '2026-06-25 09:42 AM', status: 'Submitted', fileUrl: 'clara_derivation.pdf', graded: true, marks: 48, feedback: 'Excellent steps and clean diagrammatic layout.' },
        { studentName: 'Devon Lee', rollNumber: 'EX-2026-1049', timestamp: '2026-06-26 11:05 PM', status: 'Late', fileUrl: 'devon_draft.pdf', graded: false },
        { studentName: 'Marcus Aurelius', rollNumber: 'EX-2026-1192', timestamp: '—', status: 'Missing', graded: false }
      ]
    },
    {
      id: 'PRJ-001',
      title: 'Deep Learning Image Style Transfer',
      description: 'Implement a neural style transfer network using VGG-19 features. Reconstruct style and content targets.',
      course: 'CS-305: Neural Network Architectures',
      dueDate: '2026-07-15',
      maxMarks: 100,
      submittedCount: 15,
      totalCount: 45,
      status: 'Active',
      type: 'Project',
      submissions: [
        { studentName: 'Alex Sterling', rollNumber: 'EX-2026-8893', timestamp: '2026-06-26 04:12 PM', status: 'Submitted', fileUrl: 'alex_style_transfer.zip', graded: false },
        { studentName: 'Clara Mercer', rollNumber: 'EX-2026-7734', timestamp: '2026-06-26 03:30 PM', status: 'Submitted', fileUrl: 'clara_style_transfer.zip', graded: true, marks: 95, feedback: 'Stunning artistic results and excellent parameters convergence curve description.' },
        { studentName: 'Devon Lee', rollNumber: 'EX-2026-1049', timestamp: '—', status: 'Missing', graded: false }
      ]
    }
  ]);

  const [materials, setMaterials] = useState<StudyMaterial[]>([
    { id: 'MAT-001', title: 'Backpropagation Gradients Math Lecture.pdf', course: 'CS-305: Neural Network Architectures', type: 'PDF', size: '4.2 MB', uploadDate: '2026-06-20', downloadsCount: 42, indexingStatus: 'Indexed ✓' },
    { id: 'MAT-002', title: 'Red-Black Trees Rotations & Balance.ppt', course: 'CS-301: Advanced Data Structures', type: 'PPT', size: '1.8 MB', uploadDate: '2026-06-15', downloadsCount: 38, indexingStatus: 'Indexed ✓' }
  ]);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: 'EXM-001',
      title: 'Neural Networks midterm',
      course: 'CS-305: Neural Network Architectures',
      questionsCount: 20,
      marks: 100,
      status: 'Scheduled',
      examType: 'Coding',
      scheduleDate: '2026-07-05 10:00 AM',
      duration: 120,
      testCases: [{ input: '3\n1 2 3', output: '6' }],
      students: [],
      violationsFeed: []
    },
    {
      id: 'EXM-LIVE',
      title: 'Data Structures Pop Quiz',
      course: 'CS-301: Advanced Data Structures',
      questionsCount: 10,
      marks: 50,
      status: 'Live Now',
      examType: 'Theory',
      scheduleDate: 'Live Now',
      duration: 30,
      students: [
        { id: '1', name: 'Alex Sterling', avatar: FACULTY_AVATAR_PRESETS[3], status: 'green', violationsCount: 0, violationHistory: [] },
        { id: '2', name: 'Clara Mercer', avatar: FACULTY_AVATAR_PRESETS[4], status: 'green', violationsCount: 0, violationHistory: [] },
        { id: '3', name: 'Devon Lee', avatar: FACULTY_AVATAR_PRESETS[1], status: 'red', violationsCount: 3, violationHistory: ['Gaze anomaly (10:14 AM)', 'Object detected (10:18 AM)', 'Tab lost focus (10:22 AM)'] },
        { id: '4', name: 'Marcus Aurelius', avatar: FACULTY_AVATAR_PRESETS[6], status: 'amber', violationsCount: 1, violationHistory: ['Person count discrepancy (10:15 AM)'] }
      ],
      violationsFeed: [
        { studentName: 'Devon Lee', type: 'Tab lost focus (Lockout Trigger)', timestamp: '10:22 AM' },
        { studentName: 'Devon Lee', type: 'Secondary Object detected (Phone)', timestamp: '10:18 AM' },
        { studentName: 'Marcus Aurelius', type: 'Secondary Face detected in camera', timestamp: '10:15 AM' },
        { studentName: 'Devon Lee', type: 'Focal gaze deflection off viewport', timestamp: '10:14 AM' }
      ]
    }
  ]);

  const [evaluationExams, setEvaluationExams] = useState<FacultyContextType['evaluationExams']>([
    {
      id: 'EXM-EVAL-1',
      title: 'Midterm Exam: Backpropagation Algorithm',
      course: 'CS-305: Neural Network Architectures',
      status: 'Ready for Review',
      scripts: [
        {
          studentName: 'Alex Sterling',
          rollNumber: 'EX-2026-8893',
          gpa: '84/100',
          reviewed: false,
          questions: [
            {
              id: 'q1',
              text: 'Derive the gradient update equation for output nodes using stochastic gradient descent and squared error.',
              type: 'Math',
              studentAnswer: '\\delta_k = (o_k - t_k) \\cdot o_k(1 - o_k) \\cdot x_{jk} \\quad \\text{Using partial derivatives of error w.r.t weights.}',
              aiSuggestedMarks: 22,
              aiFeedback: 'Derivation is mostly correct. It lacks secondary step labels for chain rule activation derivatives, but final node weights updates are accurate.',
              approved: false
            },
            {
              id: 'q2',
              text: 'Implement a single-layer perceptron in Python utilizing NumPy vectors.',
              type: 'Code',
              studentAnswer: 'def train(X, y):\n    weights = np.zeros(X.shape[1])\n    for _ in range(epochs):\n        for xi, target in zip(X, y):\n            update = eta * (target - predict(xi))\n            weights += update * xi',
              aiSuggestedMarks: 25,
              aiFeedback: 'NumPy vectorized multiplication could be optimized with dot product, but the loop is structurally sound and compiles correctly.',
              approved: false
            }
          ]
        },
        {
          studentName: 'Devon Lee',
          rollNumber: 'EX-2026-1049',
          gpa: '62/100',
          reviewed: false,
          questions: [
            {
              id: 'q1',
              text: 'Derive the gradient update equation for output nodes using stochastic gradient descent and squared error.',
              type: 'Math',
              studentAnswer: 'gradient = delta * learning_rate. (Missing full chain rule partial derivations)',
              aiSuggestedMarks: 12,
              aiFeedback: 'Incomplete derivation steps. The student failed to write out the activation function derivatives or weight variables.',
              approved: false
            },
            {
              id: 'q2',
              text: 'Implement a single-layer perceptron in Python utilizing NumPy vectors.',
              type: 'Code',
              studentAnswer: 'def perceptron():\n    # code goes here\n    pass',
              aiSuggestedMarks: 5,
              aiFeedback: 'Empty stub solution. The code has zero logic implementations.',
              approved: false
            }
          ]
        }
      ]
    }
  ]);

  const [violations, setViolations] = useState<ViolationSnapshot[]>([
    {
      id: 'VIO-001',
      studentName: 'Devon Lee',
      exam: 'Data Structures Pop Quiz',
      timestamp: '2026-06-27 10:22 AM',
      confidence: 94,
      type: 'Object Detected',
      image: '/images/devon_violation.jpg',
      status: 'Unreviewed'
    },
    {
      id: 'VIO-002',
      studentName: 'Marcus Aurelius',
      exam: 'Data Structures Pop Quiz',
      timestamp: '2026-06-27 10:15 AM',
      confidence: 82,
      type: 'Person Count',
      image: '/images/marcus_violation.jpg',
      status: 'Unreviewed'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    scriptAlerts: true,
    proctorAlerts: true,
    meetingReminders: false
  });

  // Local Storage Synchronization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('faculty_theme') as Theme;
      if (storedTheme) setThemeState(storedTheme);

      const storedAvatar = localStorage.getItem('faculty_avatar');
      if (storedAvatar) setAvatarIndexState(Number(storedAvatar));

      const storedSemester = localStorage.getItem('faculty_semester') as 'Sem 1' | 'Sem 3' | 'Sem 5' | 'Sem 7';
      if (storedSemester) setSemesterState(storedSemester);

      const storedProfile = localStorage.getItem('faculty_profile');
      if (storedProfile) setProfileState(JSON.parse(storedProfile));

      const storedClasses = localStorage.getItem('faculty_classes');
      if (storedClasses) setClasses(JSON.parse(storedClasses));

      const storedAssignments = localStorage.getItem('faculty_assignments');
      if (storedAssignments) setAssignments(JSON.parse(storedAssignments));

      const storedMaterials = localStorage.getItem('faculty_materials');
      if (storedMaterials) setMaterials(JSON.parse(storedMaterials));

      const storedExams = localStorage.getItem('faculty_exams');
      if (storedExams) setExams(JSON.parse(storedExams));

      const storedEvaluation = localStorage.getItem('faculty_evaluation');
      if (storedEvaluation) setEvaluationExams(JSON.parse(storedEvaluation));

      const storedViolations = localStorage.getItem('faculty_violations');
      if (storedViolations) setViolations(JSON.parse(storedViolations));

      const storedNotifications = localStorage.getItem('faculty_notifications');
      if (storedNotifications) setNotificationSettings(JSON.parse(storedNotifications));
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('faculty_theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const updateProfile = (newProfile: Partial<FacultyProfile>) => {
    setProfileState((prev) => {
      const updated = { ...prev, ...newProfile };
      localStorage.setItem('faculty_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const setAvatarIndex = (index: number) => {
    setAvatarIndexState(index);
    localStorage.setItem('faculty_avatar', String(index));
  };

  const addAssignment = (assign: Omit<Assignment, 'id' | 'submittedCount' | 'totalCount' | 'submissions'> & { type?: 'Assignment' | 'Project' }) => {
    setAssignments((prev) => {
      const isProject = assign.type === 'Project';
      const idPrefix = isProject ? 'PRJ' : 'ASN';
      const newAssign: Assignment = {
        ...assign,
        id: `${idPrefix}-${Math.floor(100 + Math.random() * 900)}`,
        submittedCount: 0,
        totalCount: 45,
        submissions: []
      };
      const updated = [...prev, newAssign];
      localStorage.setItem('faculty_assignments', JSON.stringify(updated));
      return updated;
    });
  };

  const gradeSubmission = (assignId: string, rollNumber: string, marks: number, feedback: string) => {
    setAssignments((prev) => {
      const updated = prev.map((assign) => {
        if (assign.id !== assignId) return assign;
        const updatedSubs = assign.submissions.map((sub) => {
          if (sub.rollNumber === rollNumber) {
            return { ...sub, marks, feedback, graded: true };
          }
          return sub;
        });
        return {
          ...assign,
          submissions: updatedSubs,
          submittedCount: assign.submittedCount + (assign.submissions.find(s => s.rollNumber === rollNumber)?.graded ? 0 : 1)
        };
      });
      localStorage.setItem('faculty_assignments', JSON.stringify(updated));
      return updated;
    });
  };

  const uploadMaterial = (mat: Omit<StudyMaterial, 'id' | 'uploadDate' | 'downloadsCount' | 'indexingStatus'>) => {
    const newMatId = `MAT-${Math.floor(100 + Math.random() * 900)}`;
    setMaterials((prev) => {
      const newMat: StudyMaterial = {
        ...mat,
        id: newMatId,
        uploadDate: new Date().toISOString().split('T')[0],
        downloadsCount: 0,
        indexingStatus: 'Indexing...'
      };
      const updated = [...prev, newMat];
      localStorage.setItem('faculty_materials', JSON.stringify(updated));
      return updated;
    });

    // Simulate RAG Indexing Completion in background after 5s
    setTimeout(() => {
      setMaterials((prev) => {
        const updated = prev.map((m) =>
          m.id === newMatId ? { ...m, indexingStatus: 'Indexed ✓' as const } : m
        );
        localStorage.setItem('faculty_materials', JSON.stringify(updated));
        return updated;
      });
    }, 5000);
  };

  const deleteMaterial = (id: string) => {
    setMaterials((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem('faculty_materials', JSON.stringify(updated));
      return updated;
    });
  };

  const setSemester = (sem: 'Sem 1' | 'Sem 3' | 'Sem 5' | 'Sem 7') => {
    setSemesterState(sem);
    localStorage.setItem('faculty_semester', sem);
  };

  const editMaterial = (id: string, updates: Partial<StudyMaterial>) => {
    setMaterials((prev) => {
      const updated = prev.map((m) => m.id === id ? { ...m, ...updates } : m);
      localStorage.setItem('faculty_materials', JSON.stringify(updated));
      return updated;
    });
  };

  const deployExam = (examId: string, config: { examType: 'Theory' | 'Coding' | 'Circuit' | 'Chemistry' | 'Mixed'; scheduleDate: string; duration: number; testCases?: { input: string; output: string }[] }) => {
    setExams((prev) => {
      const updated = prev.map((ex) =>
        ex.id === examId ? { ...ex, ...config, status: 'Scheduled' as const } : ex
      );
      localStorage.setItem('faculty_exams', JSON.stringify(updated));
      return updated;
    });
  };

  const updateExamLiveControls = (examId: string, action: 'pause' | 'extend' | 'end') => {
    setExams((prev) => {
      const updated = prev.map((ex) => {
        if (ex.id !== examId) return ex;
        if (action === 'end') {
          return { ...ex, status: 'Completed' as const };
        }
        if (action === 'extend') {
          return { ...ex, duration: (ex.duration || 0) + 10 };
        }
        return ex; // Pause toggles/control can be implemented inline
      });
      localStorage.setItem('faculty_exams', JSON.stringify(updated));
      return updated;
    });
  };

  const approveQuestionMarks = (examId: string, rollNumber: string, qId: string, marks: number, feedback: string) => {
    setEvaluationExams((prev) => {
      const updated = prev.map((evalEx) => {
        if (evalEx.id !== examId) return evalEx;
        const updatedScripts = evalEx.scripts.map((script) => {
          if (script.rollNumber !== rollNumber) return script;
          const updatedQs = script.questions.map((q) =>
            q.id === qId ? { ...q, finalMarks: marks, finalFeedback: feedback, approved: true } : q
          );
          const allApproved = updatedQs.every((q) => q.approved);
          return { ...script, questions: updatedQs, reviewed: allApproved };
        });
        return { ...evalEx, scripts: updatedScripts };
      });
      localStorage.setItem('faculty_evaluation', JSON.stringify(updated));
      return updated;
    });
  };

  const approveAllQuestions = (examId: string, rollNumber: string) => {
    setEvaluationExams((prev) => {
      const updated = prev.map((evalEx) => {
        if (evalEx.id !== examId) return evalEx;
        const updatedScripts = evalEx.scripts.map((script) => {
          if (script.rollNumber !== rollNumber) return script;
          const updatedQs = script.questions.map((q) => ({
            ...q,
            finalMarks: q.finalMarks !== undefined ? q.finalMarks : q.aiSuggestedMarks,
            finalFeedback: q.finalFeedback !== undefined ? q.finalFeedback : q.aiFeedback,
            approved: true
          }));
          return { ...script, questions: updatedQs, reviewed: true };
        });
        return { ...evalEx, scripts: updatedScripts };
      });
      localStorage.setItem('faculty_evaluation', JSON.stringify(updated));
      return updated;
    });
  };

  const publishExamResults = (examId: string) => {
    setEvaluationExams((prev) => {
      const updated = prev.map((evalEx) =>
        evalEx.id === examId ? { ...evalEx, status: 'Published' as const } : evalEx
      );
      localStorage.setItem('faculty_evaluation', JSON.stringify(updated));
      return updated;
    });
  };

  const labelViolationSnapshot = (id: string, label: 'Confirm Violation' | 'False Positive' | 'Unclear') => {
    setViolations((prev) => {
      const updated = prev.map((v) =>
        v.id === id ? { ...v, status: 'Labelled' as const, label } : v
      );
      localStorage.setItem('faculty_violations', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FacultyContext.Provider
      value={{
        theme,
        setTheme,
        profile,
        updateProfile,
        avatarIndex,
        setAvatarIndex,
        semester,
        setSemester,
        classes,
        assignments,
        addAssignment,
        gradeSubmission,
        materials,
        uploadMaterial,
        deleteMaterial,
        editMaterial,
        exams,
        deployExam,
        updateExamLiveControls,
        evaluationExams,
        approveQuestionMarks,
        approveAllQuestions,
        publishExamResults,
        violations,
        labelViolationSnapshot,
        notificationSettings,
        setNotificationSettings
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
}
