'use client';

import React, { useState } from 'react';
import { HelpCircle, Search, Mail, FileText, CheckCircle2, Loader2, ArrowRight, Phone } from 'lucide-react';

export default function HelpSupportPage() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketPriority, setTicketPriority] = useState('Medium');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;

    setIsSubmitting(true);
    setTicketSuccess(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSuccess(true);
      setTicketNumber(`ST-SLA-${Math.floor(1000 + Math.random() * 9000)}`);
      setTicketSubject('');
      setTicketDesc('');
    }, 1500);
  };

  const faqs = [
    { q: 'How does face/webcam gaze detection work in the Exam Terminal?', a: 'Continuous calibration tracks your eyes and head posture. If you look away or switch windows for too long, the system registers flags. If flags cross the department threshold, the session automatically locks out.' },
    { q: 'How do I download my exam hall ticket for this semester?', a: 'Go to Payments & Registrations > Exam Registrations. Make sure all subjects are registered and paid (₹500/subject). Once cleared, the hall ticket download button will unlock.' },
    { q: 'What happens if my internet disconnects during a live test?', a: 'The lockdown sandbox saves your answers locally in a cryptographically signed cache. When connection recovers, the terminal automatically attempts to resume and synchronize.' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview header widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center gap-3">
          <Mail className="w-8 h-8 text-[#4A63C9] opacity-40 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Student Support Email</span>
            <p className="font-semibold text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] mt-0.5">student-help@examinerai.com</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center gap-3">
          <Phone className="w-8 h-8 text-[#9C7FDB] opacity-40 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">SLA Help Desk Callout</span>
            <p className="font-semibold text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] mt-0.5">+91 (800) 555-0155</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: FAQ Database Search */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white/45 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#4A63C9]" />
            Frequently Asked Questions
          </h3>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5C5868]/60 dark:text-[#9591A3]/50" />
            <input
              type="text"
              placeholder="Search guides, proctor sandbox rules, or grade receipts..."
              className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl pl-9 pr-4 py-2 text-[12.5px] text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
            />
          </div>

          <div className="space-y-3.5 pt-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1">
                <h5 className="font-semibold text-[13px] text-[#1E1B24] dark:text-[#EDEAF2] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#9C7FDB]" />
                  {faq.q}
                </h5>
                <p className="text-[12px] text-[#5C5868] dark:text-[#9591A3] leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Submit Support Ticket Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/45 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-[#EDEAF2]">
            Submit SLA Support Ticket
          </h3>

          {ticketSuccess && (
            <div className="p-3.5 rounded-xl bg-[#DFF3E8] border border-[#2E8B5C]/20 text-[#2E8B5C] text-[12.5px] font-medium flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#2E8B5C]" />
              <div>
                <p className="font-bold">Ticket created successfully!</p>
                <p className="text-[11px] opacity-90 font-mono mt-0.5">Reference ID: {ticketNumber}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitTicket} className="space-y-3 text-[12.5px]">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Problem Subject</label>
              <input
                type="text"
                placeholder="e.g. Webcam verification failed"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2 text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Priority Level</label>
              <select
                value={ticketPriority}
                onChange={(e) => setTicketPriority(e.target.value)}
                className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-2.5 py-2 text-[#1E1B24] dark:text-[#EDEAF2]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High (Standard SLA)</option>
                <option value="Urgent">Urgent (4h response)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#9591A3]/50">Description</label>
              <textarea
                placeholder="Describe your issue in detail..."
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                rows={4}
                className="w-full bg-white/50 dark:bg-[#1D1A24]/40 border border-[#E3D5BC]/55 dark:border-white/5 rounded-xl px-4 py-2 text-[#1E1B24] dark:text-[#EDEAF2] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#4A63C9] hover:bg-[#3b51b3] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  <span>Submitting request...</span>
                </>
              ) : (
                <>
                  <span>Create Support Ticket</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
