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

export interface DraftExam {
  id: string;
  title: string;
  course: string;
  questionsCount: number;
  duration: number; // minutes
  status: 'Draft' | 'Published' | 'Archived';
  lockdownLevel: 'Standard' | 'Strict' | 'None';
}

export interface StudentSubmission {
  id: string;
  studentName: string;
  rollNumber: string;
  course: string;
  examName: string;
  submittedDate: string;
  score: string;
  status: 'Pending Review' | 'Approved';
  aiScore: number; // out of 100
  proctorFlags: number; // count of flag anomalies
  logs: { time: string; event: string; status: 'nominal' | 'warning' | 'alert' }[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface FacultyContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  profile: FacultyProfile;
  updateProfile: (p: Partial<FacultyProfile>) => void;
  avatarIndex: number;
  setAvatarIndex: (i: number) => void;
  draftExams: DraftExam[];
  addDraftExam: (exam: Omit<DraftExam, 'id'>) => void;
  submissions: StudentSubmission[];
  approveSubmission: (id: string, updatedScore: string) => void;
  chatHistory: ChatMessage[];
  sendChatMessage: (text: string) => void;
  notificationSettings: {
    scriptAlerts: boolean;
    proctorAlerts: boolean;
    meetingReminders: boolean;
  };
  setNotificationSettings: React.Dispatch<React.SetStateAction<{
    scriptAlerts: boolean;
    proctorAlerts: boolean;
    meetingReminders: boolean;
  }>>;
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
  const [avatarIndex, setAvatarIndexState] = useState<number>(0);
  const [profile, setProfileState] = useState<FacultyProfile>({
    name: 'Dr. Grace Hopper',
    email: 'g.hopper@university.edu',
    role: 'Professor, Neural Systems',
    department: 'AI & Robotics Engineering',
    phone: '+1 555-0242',
    office: 'Block B, Office 402'
  });

  const [draftExams, setDraftExams] = useState<DraftExam[]>([
    { id: 'EXM-DF-001', title: 'Neural Networks & Deep Learning Mid-Term', course: 'Neural Network Architectures (CS-305)', questionsCount: 25, duration: 90, status: 'Draft', lockdownLevel: 'Strict' },
    { id: 'EXM-DF-002', title: 'Generative Models & GANs Quiz', course: 'Neural Network Architectures (CS-305)', questionsCount: 10, duration: 30, status: 'Published', lockdownLevel: 'Standard' }
  ]);

  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: 'SUB-991',
      studentName: 'Alex Sterling',
      rollNumber: 'EX-2026-8893',
      course: 'Neural Network Architectures (CS-305)',
      examName: 'Midterm Exam: Backpropagation Algorithm',
      submittedDate: '2026-06-25',
      score: 'Pending Review',
      status: 'Pending Review',
      aiScore: 84,
      proctorFlags: 2,
      logs: [
        { time: '14:02:15', event: 'Webcam feed established.', status: 'nominal' },
        { time: '14:15:32', event: 'Student eyes drifted from viewport (Gaze anomaly).', status: 'warning' },
        { time: '14:32:04', event: 'System detected background voice conversation.', status: 'alert' },
        { time: '14:55:10', event: 'Exam Sandbox closed & uploaded successfully.', status: 'nominal' }
      ]
    },
    {
      id: 'SUB-992',
      studentName: 'Clara Mercer',
      rollNumber: 'EX-2026-7734',
      course: 'Neural Network Architectures (CS-305)',
      examName: 'Midterm Exam: Backpropagation Algorithm',
      submittedDate: '2026-06-25',
      score: '96/100',
      status: 'Approved',
      aiScore: 96,
      proctorFlags: 0,
      logs: [
        { time: '14:03:00', event: 'Webcam feed established.', status: 'nominal' },
        { time: '14:48:22', event: 'Exam Sandbox closed & uploaded successfully.', status: 'nominal' }
      ]
    },
    {
      id: 'SUB-993',
      studentName: 'Devon Lee',
      rollNumber: 'EX-2026-1049',
      course: 'Neural Network Architectures (CS-305)',
      examName: 'Midterm Exam: Backpropagation Algorithm',
      submittedDate: '2026-06-25',
      score: 'Pending Review',
      status: 'Pending Review',
      aiScore: 68,
      proctorFlags: 5,
      logs: [
        { time: '14:05:10', event: 'Webcam feed established.', status: 'nominal' },
        { time: '14:12:02', event: 'Browser lost focus (tab-out alert).', status: 'alert' },
        { time: '14:24:50', event: 'Secondary face detected in proctor camera.', status: 'alert' },
        { time: '14:40:02', event: 'Repeated gaze deviations off-screen.', status: 'warning' },
        { time: '14:52:11', event: 'Session auto-submitted by lockdown proctor.', status: 'alert' }
      ]
    }
  ]);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Good morning Dr. Hopper! I am your AI Grading Assistant. You have 2 student submissions pending review. Let me know if you want me to pre-grade their code or summarize proctor anomaly timelines.', time: '09:00 AM' }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    scriptAlerts: true,
    proctorAlerts: true,
    meetingReminders: false
  });

  // Load from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('faculty_theme') as Theme;
      if (storedTheme) setThemeState(storedTheme);

      const storedAvatar = localStorage.getItem('faculty_avatar');
      if (storedAvatar) setAvatarIndexState(Number(storedAvatar));

      const storedProfile = localStorage.getItem('faculty_profile');
      if (storedProfile) setProfileState(JSON.parse(storedProfile));

      const storedExams = localStorage.getItem('faculty_exams');
      if (storedExams) setDraftExams(JSON.parse(storedExams));

      const storedSubmissions = localStorage.getItem('faculty_submissions');
      if (storedSubmissions) setSubmissions(JSON.parse(storedSubmissions));

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

  const addDraftExam = (exam: Omit<DraftExam, 'id'>) => {
    setDraftExams((prev) => {
      const newExam: DraftExam = {
        ...exam,
        id: `EXM-DF-${Math.floor(100 + Math.random() * 900)}`
      };
      const updated = [...prev, newExam];
      localStorage.setItem('faculty_exams', JSON.stringify(updated));
      return updated;
    });
  };

  const approveSubmission = (id: string, updatedScore: string) => {
    setSubmissions((prev) => {
      const updated = prev.map((sub) =>
        sub.id === id ? { ...sub, score: updatedScore, status: 'Approved' as const } : sub
      );
      localStorage.setItem('faculty_submissions', JSON.stringify(updated));
      return updated;
    });
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { sender: 'user', text, time: timeStr };

    setChatHistory((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = "I can analyze those parameters. What else do you need to verify in student scripts?";
      const lower = text.toLowerCase();
      if (lower.includes('alex') || lower.includes('sterling')) {
        replyText = "Alex Sterling scored 84/100 by the AI evaluator. Proctoring flags are low (2 warning flags: 1 gaze deviation, 1 secondary voice detection). Looks like a clear pass with slight environmental noise.";
      } else if (lower.includes('devon') || lower.includes('lee')) {
        replyText = "Devon Lee has 5 proctoring flags, including a browser tab focus loss and a secondary face detected. AI grading scored them 68/100. I recommend looking over the webcam snapshot timeline under Grading Review.";
      } else if (lower.includes('exam') || lower.includes('create')) {
        replyText = "To author a new exam, navigate to the Exam Creator and use the AI Question Generator by typing your syllabus topics.";
      }

      setChatHistory((prev) => [...prev, { sender: 'ai', text: replyText, time: timeStr }]);
    }, 1200);
  };

  useEffect(() => {
    localStorage.setItem('faculty_notifications', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  return (
    <FacultyContext.Provider
      value={{
        theme,
        setTheme,
        profile,
        updateProfile,
        avatarIndex,
        setAvatarIndex,
        draftExams,
        addDraftExam,
        submissions,
        approveSubmission,
        chatHistory,
        sendChatMessage,
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
