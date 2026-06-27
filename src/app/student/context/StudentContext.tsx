'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface Profile {
  name: string;
  email: string;
  department: string;
  semester: string;
  rollNumber: string;
  phone: string;
}

export interface Invoice {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Cleared' | 'Failed/Active Backlog' | 'Refunded';
}

export interface Receipt {
  id: string;
  examName: string;
  dateCompleted: string;
  amount: number;
  hash: string;
  status: 'Graded/Completed/Cleared' | 'Pending';
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface StudentContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  profile: Profile;
  updateProfile: (p: Partial<Profile>) => void;
  avatarIndex: number;
  setAvatarIndex: (i: number) => void;
  isFaceEnrolled: boolean;
  enrollFace: () => Promise<void>;
  resetFaceEnrollment: () => void;
  invoices: Invoice[];
  payInvoice: (id: string) => void;
  receipts: Receipt[];
  chatHistory: ChatMessage[];
  sendChatMessage: (text: string) => void;
  notificationSettings: {
    emailAlerts: boolean;
    examReminders: boolean;
    resultPublish: boolean;
    paymentsDue: boolean;
  };
  setNotificationSettings: React.Dispatch<React.SetStateAction<{
    emailAlerts: boolean;
    examReminders: boolean;
    resultPublish: boolean;
    paymentsDue: boolean;
  }>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const AVATAR_PRESETS = [
  // Presets of modern colorful geometric SVG patterns
  "linear-gradient(135deg, #9C7FDB 0%, #7B93E8 100%)",
  "linear-gradient(135deg, #7B93E8 0%, #4A63C9 100%)",
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
  "linear-gradient(135deg, #F6D365 0%, #FDA085 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #fd1d1d 0%, #fcb045 100%)",
  "linear-gradient(135deg, #130CB7 0%, #52E5E7 100%)"
];

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [avatarIndex, setAvatarIndexState] = useState<number>(0);
  const [isFaceEnrolled, setIsFaceEnrolledState] = useState<boolean>(true);
  const [profile, setProfileState] = useState<Profile>({
    name: 'Alex Sterling',
    email: 'alex.sterling@university.edu',
    department: 'B.Tech CSE',
    semester: 'Semester 5',
    rollNumber: 'EX-2026-8893',
    phone: '+1 555-0199'
  });

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'INV-001', name: 'Semester 5 Tuition Fee', amount: 65000, dueDate: '2026-07-10', status: 'Pending' },
    { id: 'INV-002', name: 'Academic Library Overdue Fine', amount: 350, dueDate: '2026-06-30', status: 'Pending' },
    { id: 'INV-003', name: 'Hostel Lodging Charges', amount: 12000, dueDate: '2026-07-15', status: 'Pending' }
  ]);

  const [receipts, setReceipts] = useState<Receipt[]>([
    { id: 'RCP-883', examName: 'Discrete Mathematics Final', dateCompleted: '2026-06-12', amount: 1500, hash: '0x8892f392ea129dd94328ff9a', status: 'Graded/Completed/Cleared' },
    { id: 'RCP-774', examName: 'Advanced Data Structures Mid', dateCompleted: '2026-05-18', amount: 1500, hash: '0xab73d8e9ffc398ee827d091a', status: 'Graded/Completed/Cleared' },
    { id: 'RCP-512', examName: 'Computational Logic Quiz 2', dateCompleted: '2026-05-02', amount: 1000, hash: '0x49fec928a38ee9273c8d7912', status: 'Graded/Completed/Cleared' }
  ]);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Hi Alex! I am your Examiner AI Copilot. How can I help you study or prepare for your upcoming exams today?', time: '09:00 AM' }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    examReminders: true,
    resultPublish: true,
    paymentsDue: false
  });

  // Load from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('student_theme') as Theme;
      if (storedTheme) setThemeState(storedTheme);
      
      const storedAvatar = localStorage.getItem('student_avatar');
      if (storedAvatar) setAvatarIndexState(Number(storedAvatar));

      const storedFace = localStorage.getItem('student_face_enrolled');
      if (storedFace !== null) setIsFaceEnrolledState(storedFace === 'true');

      const storedProfile = localStorage.getItem('student_profile');
      if (storedProfile) setProfileState(JSON.parse(storedProfile));

      const storedInvoices = localStorage.getItem('student_invoices');
      if (storedInvoices) setInvoices(JSON.parse(storedInvoices));

      const storedReceipts = localStorage.getItem('student_receipts');
      if (storedReceipts) setReceipts(JSON.parse(storedReceipts));

      const storedNotifications = localStorage.getItem('student_notifications');
      if (storedNotifications) setNotificationSettings(JSON.parse(storedNotifications));
    }
  }, []);

  // Sync theme to DOM
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('student_theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme check
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const updateProfile = (newProfile: Partial<Profile>) => {
    setProfileState((prev) => {
      const updated = { ...prev, ...newProfile };
      localStorage.setItem('student_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const setAvatarIndex = (index: number) => {
    setAvatarIndexState(index);
    localStorage.setItem('student_avatar', String(index));
  };

  const enrollFace = async () => {
    // Simulating camera analysis
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsFaceEnrolledState(true);
        localStorage.setItem('student_face_enrolled', 'true');
        resolve();
      }, 3000);
    });
  };

  const resetFaceEnrollment = () => {
    setIsFaceEnrolledState(false);
    localStorage.setItem('student_face_enrolled', 'false');
  };

  const payInvoice = (id: string) => {
    setInvoices((prev) => {
      const updated = prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'Cleared' as const } : inv
      );
      localStorage.setItem('student_invoices', JSON.stringify(updated));

      // Append to receipts if successfully paid
      const paid = prev.find((inv) => inv.id === id);
      if (paid) {
        const hashSeed = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
        const newReceipt: Receipt = {
          id: `RCP-${Math.floor(100 + Math.random() * 900)}`,
          examName: `${paid.name} Receipt`,
          dateCompleted: new Date().toISOString().split('T')[0],
          amount: paid.amount,
          hash: `0x${hashSeed}`,
          status: 'Graded/Completed/Cleared'
        };
        setReceipts((prevReceipts) => {
          const updatedReceipts = [newReceipt, ...prevReceipts];
          localStorage.setItem('student_receipts', JSON.stringify(updatedReceipts));
          return updatedReceipts;
        });
      }

      return updated;
    });
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { sender: 'user', text, time: timeStr };

    setChatHistory((prev) => [...prev, userMsg]);

    // Simulating context-aware copilot replies
    setTimeout(() => {
      let replyText = "I've logged that. What else can I assist you with in your studies?";
      const lower = text.toLowerCase();
      if (lower.includes('exam') || lower.includes('algorithm')) {
        replyText = "Your upcoming Algorithms exam will focus heavily on dynamic programming and graph structures. I suggest practicing standard shortest-path drills.";
      } else if (lower.includes('grade') || lower.includes('cgpa')) {
        replyText = "With your current scores in Assignments, you're tracking towards an A grade in Neural Networks. Focus on backpropagation formulas to secure it!";
      } else if (lower.includes('face') || lower.includes('webcam')) {
        replyText = "If the proctor system webcam cannot detect your face, verify that your environment is well-lit and that your hardware enrollment is active in Settings.";
      } else if (lower.includes('fee') || lower.includes('pay')) {
        replyText = "You have outstanding library or tuition invoices in your Financial Vault. Make sure to complete payments before the examination period starts.";
      }

      setChatHistory((prev) => [...prev, { sender: 'ai', text: replyText, time: timeStr }]);
    }, 1200);
  };

  useEffect(() => {
    localStorage.setItem('student_notifications', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  return (
    <StudentContext.Provider
      value={{
        theme,
        setTheme,
        profile,
        updateProfile,
        avatarIndex,
        setAvatarIndex,
        isFaceEnrolled,
        enrollFace,
        resetFaceEnrollment,
        invoices,
        payInvoice,
        receipts,
        chatHistory,
        sendChatMessage,
        notificationSettings,
        setNotificationSettings
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
