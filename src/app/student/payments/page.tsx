'use client';

import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { CheckCircle2, Download, Loader2, CreditCard, Coins, Calendar, Trophy, Heart } from 'lucide-react';

type Tab = 'fees' | 'events' | 'donations' | 'exams';

interface EventItem {
  id: string;
  name: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Registered';
  category: string;
}

interface Fundraiser {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  category: string;
}

export default function PaymentsPage() {
  const { invoices, payInvoice, profile } = useStudent();
  const [activeTab, setActiveTab] = useState<Tab>('fees');
  
  // Custom states for events and donations
  const [events, setEvents] = useState<EventItem[]>([
    { id: 'EVT-101', name: 'Inter-University AI Hackathon 2026', amount: 25, date: '2026-07-18', status: 'Pending', category: 'Technical' },
    { id: 'EVT-102', name: 'National Sports Fest: Athletics Meet', amount: 15, date: '2026-08-04', status: 'Pending', category: 'Sports' },
    { id: 'EVT-103', name: 'Computational Logic Guest Lecture Series', amount: 10, date: '2026-07-22', status: 'Pending', category: 'Academic' }
  ]);

  const [donations, setDonations] = useState<Fundraiser[]>([
    { id: 'FND-201', title: 'CSE Robotics Club Lab Equipment Upgrade', description: 'Help our robotics club purchase new hardware actuators and sensors.', raised: 2400, goal: 5000, category: 'Hardware' },
    { id: 'FND-202', title: 'Green Campus Solar Panel Installation Fund', description: 'Donations to help transition the computer center to green solar energy.', raised: 7800, goal: 12000, category: 'Sustainability' }
  ]);

  // Exam registration state
  const [examFeePaid, setExamFeePaid] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setExamFeePaid(localStorage.getItem('student_exam_registered') === 'true');
    }
  }, []);

  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);
  const [payingEventId, setPayingEventId] = useState<string | null>(null);
  const [payingDonationId, setPayingDonationId] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(25);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // checkout flows
  const handleOpenInvoicePayment = (id: string) => {
    setPayingInvoiceId(id);
    setPayingEventId(null);
    setPayingDonationId(null);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  const handleOpenEventPayment = (id: string) => {
    setPayingEventId(id);
    setPayingInvoiceId(null);
    setPayingDonationId(null);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  const handleOpenDonationPayment = (id: string) => {
    setPayingDonationId(id);
    setPayingInvoiceId(null);
    setPayingEventId(null);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  const handleOpenExamRegistrationPayment = () => {
    setPayingInvoiceId('EXAM-REG-SEM5');
    setPayingEventId(null);
    setPayingDonationId(null);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);

      if (payingInvoiceId) {
        if (payingInvoiceId === 'EXAM-REG-SEM5') {
          setExamFeePaid(true);
          localStorage.setItem('student_exam_registered', 'true');
          // Add a custom receipt to localStorage receipts list
          const existingReceipts = JSON.parse(localStorage.getItem('student_receipts') || '[]');
          const hashSeed = Math.random().toString(36).substring(2, 10);
          const examReceipt = {
            id: `RCP-REG-${Math.floor(100 + Math.random() * 900)}`,
            examName: 'Semester End Examination Registration Fee',
            dateCompleted: new Date().toISOString().split('T')[0],
            amount: 50,
            hash: `0x${hashSeed}ef9a32`,
            status: 'Graded/Completed/Cleared'
          };
          localStorage.setItem('student_receipts', JSON.stringify([examReceipt, ...existingReceipts]));
        } else {
          payInvoice(payingInvoiceId);
        }
      } else if (payingEventId) {
        setEvents((prev) =>
          prev.map((evt) => (evt.id === payingEventId ? { ...evt, status: 'Registered' } : evt))
        );
        // Add a receipt
        const eventItem = events.find((e) => e.id === payingEventId);
        if (eventItem) {
          const existingReceipts = JSON.parse(localStorage.getItem('student_receipts') || '[]');
          const hashSeed = Math.random().toString(36).substring(2, 10);
          const eventReceipt = {
            id: `RCP-EVT-${Math.floor(100 + Math.random() * 900)}`,
            examName: `Event: ${eventItem.name}`,
            dateCompleted: new Date().toISOString().split('T')[0],
            amount: eventItem.amount,
            hash: `0x${hashSeed}d87a41`,
            status: 'Graded/Completed/Cleared'
          };
          localStorage.setItem('student_receipts', JSON.stringify([eventReceipt, ...existingReceipts]));
        }
      } else if (payingDonationId) {
        setDonations((prev) =>
          prev.map((don) =>
            don.id === payingDonationId
              ? { ...don, raised: don.raised + donationAmount }
              : don
          )
        );
        // Add a receipt
        const donItem = donations.find((d) => d.id === payingDonationId);
        if (donItem) {
          const existingReceipts = JSON.parse(localStorage.getItem('student_receipts') || '[]');
          const hashSeed = Math.random().toString(36).substring(2, 10);
          const donReceipt = {
            id: `RCP-FND-${Math.floor(100 + Math.random() * 900)}`,
            examName: `Donation: ${donItem.title}`,
            dateCompleted: new Date().toISOString().split('T')[0],
            amount: donationAmount,
            hash: `0x${hashSeed}ba29e3`,
            status: 'Graded/Completed/Cleared'
          };
          localStorage.setItem('student_receipts', JSON.stringify([donReceipt, ...existingReceipts]));
        }
      }
    }, 2000);
  };

  const getAmountDue = () => {
    if (payingInvoiceId) {
      if (payingInvoiceId === 'EXAM-REG-SEM5') return 50;
      return invoices.find((i) => i.id === payingInvoiceId)?.amount || 0;
    }
    if (payingEventId) {
      return events.find((e) => e.id === payingEventId)?.amount || 0;
    }
    if (payingDonationId) {
      return donationAmount;
    }
    return 0;
  };

  const getNameDue = () => {
    if (payingInvoiceId) {
      if (payingInvoiceId === 'EXAM-REG-SEM5') return 'Semester 5 Examinations Registration';
      return invoices.find((i) => i.id === payingInvoiceId)?.name || '';
    }
    if (payingEventId) {
      return events.find((e) => e.id === payingEventId)?.name || '';
    }
    if (payingDonationId) {
      return `Donation to ${donations.find((d) => d.id === payingDonationId)?.title}`;
    }
    return '';
  };

  return (
    <div className="space-y-6 relative">
      {/* 1. MOCK PAYMENT MODAL OVERLAY */}
      {(payingInvoiceId || payingEventId || payingDonationId) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FAF6EE] dark:bg-[#131315] border border-[#E3D5BC] dark:border-white/10 rounded-3xl p-6 shadow-2xl text-[#1E1B24] dark:text-white space-y-6">
            {!paymentSuccess ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A63C9]/10 flex items-center justify-center text-[#4A63C9]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[16px]">Secure Checkout</h3>
                    <p className="text-[11px] font-mono text-[#5C5868]/70 dark:text-[#E4E2E4]/50">
                      ID: {payingInvoiceId || payingEventId || payingDonationId}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white/40 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 rounded-xl space-y-2 font-mono text-[13px]">
                  <div className="flex justify-between">
                    <span>Target:</span>
                    <span className="text-right truncate max-w-[200px]">{getNameDue()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#4A63C9] dark:text-[#B5C7E8]">
                    <span>Amount Due:</span>
                    <span>${getAmountDue()}</span>
                  </div>
                </div>

                {payingDonationId && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-[#5C5868]/80 dark:text-white/60">Customize Donation ($)</label>
                    <div className="flex gap-2">
                      {[10, 25, 50, 100].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setDonationAmount(amt)}
                          className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold border transition-all ${
                            donationAmount === amt
                              ? 'bg-[#4A63C9] border-[#4A63C9] text-white'
                              : 'border-[#E3D5BC]/50 bg-white/30 text-[#1E1B24] dark:text-white hover:bg-white/50'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#5C5868]/80 dark:text-white/60">Cardholder Name</label>
                    <input
                      type="text"
                      defaultValue={profile.name}
                      className="w-full bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/40 dark:border-white/5 rounded-xl px-3 py-2 text-[13px] outline-none focus:border-[#4A63C9]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#5C5868]/80 dark:text-white/60">Card Number</label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full bg-white/50 dark:bg-white/5 border border-[#E3D5BC]/40 dark:border-white/5 rounded-xl px-3 py-2 text-[13px] outline-none focus:border-[#4A63C9]"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setPayingInvoiceId(null);
                      setPayingEventId(null);
                      setPayingDonationId(null);
                    }}
                    className="flex-1 py-3 border border-[#E3D5BC] dark:border-white/10 text-[13px] font-semibold rounded-xl hover:bg-white/20 transition-all text-[#5C5868] dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessingPayment}
                    className="flex-1 py-3 bg-[#4A63C9] text-white text-[13px] font-bold rounded-xl hover:bg-[#3d54b3] shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      'Authorize Payment'
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 py-4">
                <CheckCircle2 className="w-12 h-12 text-[#2E8B5C] mx-auto animate-bounce" />
                <h4 className="font-display font-bold text-[18px]">Payment Cleared Successfully</h4>
                <p className="text-[13.5px] text-[#5C5868] dark:text-[#E4E2E4]/80 leading-relaxed">
                  Your transaction has been processed. A downloadable certified PDF receipt has been sent to your **Digital Documents** folder.
                </p>
                <button
                  onClick={() => {
                    setPayingInvoiceId(null);
                    setPayingEventId(null);
                    setPayingDonationId(null);
                  }}
                  className="w-full py-2.5 bg-[#1E1B24] dark:bg-white text-white dark:text-black font-semibold rounded-xl text-[13px]"
                >
                  Close Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. REGULAR INTERFACE */}
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex rounded-xl p-1 bg-[#E3D5BC]/30 dark:bg-white/5 max-w-lg overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'fees', name: 'Tuition & Library' },
            { id: 'events', name: 'Event Registration' },
            { id: 'donations', name: 'College Funds' },
            { id: 'exams', name: 'Exam Registrations' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E1B24] text-[#4A63C9] dark:text-[#B5C7E8] shadow-sm'
                  : 'text-[#5C5868]/80 dark:text-[#E4E2E4]/60 hover:text-[#1E1B24] dark:hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content 1: Fees */}
      {activeTab === 'fees' && (
        <div className="space-y-4">
          {invoices.filter((i) => i.status === 'Pending').length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 text-center text-[#5C5868]/60 dark:text-[#E4E2E4]/40 font-mono text-[13px]">
              No outstanding fees. All clear!
            </div>
          ) : (
            invoices
              .filter((inv) => inv.status === 'Pending')
              .map((inv) => (
                <div
                  key={inv.id}
                  className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#C1493D]/10 dark:bg-[#C1493D]/20 text-[#C1493D] font-mono text-[10px] font-bold">
                        Pending
                      </span>
                      <span className="text-[11.5px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{inv.id}</span>
                    </div>
                    <h4 className="font-semibold text-[14px] text-[#1E1B24] dark:text-white">{inv.name}</h4>
                    <p className="text-[11.5px] text-[#5C5868] dark:text-[#E4E2E4]/70">Due Date: {inv.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-5 sm:self-center shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-mono font-bold text-[18px] text-[#1E1B24] dark:text-white">
                      ${inv.amount}
                    </span>
                    <button
                      onClick={() => handleOpenInvoicePayment(inv.id)}
                      className="px-5 py-2.5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white rounded-xl text-[12.5px] font-bold transition-all shadow-md"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* Tab Content 2: Events */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#4A63C9]/10 text-[#4A63C9] font-mono text-[10px] font-bold">
                    {evt.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{evt.id}</span>
                </div>
                <h4 className="font-semibold text-[14.5px] text-[#1E1B24] dark:text-white">{evt.name}</h4>
                <div className="space-y-1 font-mono text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 pt-1.5">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Date: {evt.date}
                  </p>
                  <p className="flex items-center gap-2 font-bold text-[#1E1B24] dark:text-white">
                    <Coins className="w-3.5 h-3.5" /> Fee: ${evt.amount}
                  </p>
                </div>
              </div>

              {evt.status === 'Registered' ? (
                <div className="w-full py-2 bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] rounded-xl text-[12.5px] font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Registered
                </div>
              ) : (
                <button
                  onClick={() => handleOpenEventPayment(evt.id)}
                  className="w-full py-2.5 bg-[#4A63C9] hover:bg-[#3d54b3] text-white rounded-xl text-[12.5px] font-bold transition-all"
                >
                  Pay & Register
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: Donations */}
      {activeTab === 'donations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donations.map((don) => {
            const progress = Math.min(100, Math.floor((don.raised / don.goal) * 100));
            return (
              <div
                key={don.id}
                className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex flex-col justify-between gap-4 transition-all hover:bg-white/60 dark:hover:bg-white/10"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-mono text-[9px] font-bold">
                      {don.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#5C5868]/60 dark:text-[#E4E2E4]/40">{don.id}</span>
                  </div>
                  <h4 className="font-semibold text-[14.5px] text-[#1E1B24] dark:text-white leading-snug">{don.title}</h4>
                  <p className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-relaxed">{don.description}</p>
                  
                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#5C5868] dark:text-[#E4E2E4]/70">
                      <span>Raised: ${don.raised}</span>
                      <span>Goal: ${don.goal}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E3D5BC]/30 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-[9.5px] font-mono font-semibold text-right text-amber-500">{progress}% funded</p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenDonationPayment(don.id)}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[12.5px] font-bold transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-4 h-4" /> Contribute Funds
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 4: Exams */}
      {activeTab === 'exams' && (
        <div className="p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#9C7FDB]/10 flex items-center justify-center text-[#9C7FDB]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[16px]">Semester End Examination Registration</h3>
              <p className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70">Semester 5 Examinations - Fall Term 2026</p>
            </div>
          </div>

          <div className="p-4 bg-white/40 dark:bg-white/5 border border-[#E3D5BC]/30 dark:border-white/5 rounded-xl space-y-3 font-mono text-[12.5px]">
            <div className="flex justify-between">
              <span>Department:</span>
              <span>B.Tech Computer Science & Engineering</span>
            </div>
            <div className="flex justify-between">
              <span>Registration Status:</span>
              <span className={examFeePaid ? 'text-[#2E8B5C] font-bold' : 'text-[#C1493D] font-bold'}>
                {examFeePaid ? 'REGISTERED & ACTIVE' : 'PENDING FEE PAYMENT'}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#E3D5BC]/30 dark:border-white/5 pt-2 font-bold">
              <span>Exam Registration Fee:</span>
              <span>$50</span>
            </div>
          </div>

          {examFeePaid ? (
            <div className="space-y-3.5">
              <div className="p-4 rounded-xl border border-[#2E8B5C]/20 bg-[#DFF3E8]/80 text-[#2E8B5C] text-[13px] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Success! You have registered for your Semester End Exams. Your Hall Ticket has been generated.</span>
              </div>
              <button
                onClick={() => alert('Hall Ticket pdf generated and saved to Documents Locker.')}
                className="w-full py-3 bg-[#1E1B24] dark:bg-white text-white dark:text-black font-semibold rounded-xl text-[13px] flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download Exam Hall Ticket
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <p className="text-[12px] text-[#5C5868] dark:text-[#E4E2E4]/70 leading-normal">
                Make a payment of **$50** to register for the final examinations. Clearing the registration fee automatically compiles your hall ticket and updates proctor authorizations.
              </p>
              <button
                onClick={handleOpenExamRegistrationPayment}
                className="w-full py-3 bg-[#4A63C9] text-white text-[13px] font-bold rounded-xl hover:bg-[#3d54b3] shadow-md shadow-[#4A63C9]/15"
              >
                Pay exam Fee & Register
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
