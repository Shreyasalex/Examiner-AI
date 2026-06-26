'use client';

import React from 'react';
import { Coins, TrendingUp, ArrowDownRight, ArrowUpRight, Plus, PieChart, FileText } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  item: string;
  category: 'Research Grants' | 'Lab Purchases' | 'Exam Revenue' | 'Student Events';
  amount: string;
  type: 'credit' | 'debit';
  status: 'Approved' | 'Pending Approval';
}

export default function DepartmentVaultPage() {
  const transactions: Transaction[] = [
    { id: '1', date: '2026-06-25', item: 'AI Proctoring Sandbox Student Licensing Fee', category: 'Exam Revenue', amount: '+$14,200', type: 'credit', status: 'Approved' },
    { id: '2', date: '2026-06-22', item: 'NVIDIA H100 GPU Cluster Shared Cloud Rent', category: 'Lab Purchases', amount: '-$6,800', type: 'debit', status: 'Approved' },
    { id: '3', date: '2026-06-18', item: 'NSF Neural Systems Research Grant Disbursal', category: 'Research Grants', amount: '+$45,000', type: 'credit', status: 'Approved' },
    { id: '4', date: '2026-06-14', item: 'Annual Hackathon & Robotics Event Funding', category: 'Student Events', amount: '-$4,500', type: 'debit', status: 'Approved' },
    { id: '5', date: '2026-06-10', item: 'AWS SageMaker Endpoint Credits Refill', category: 'Lab Purchases', amount: '-$2,500', type: 'debit', status: 'Pending Approval' }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Available Budget</span>
            <h3 className="font-mono font-bold text-[24px] text-[#2E8B5C] mt-1">$72,400</h3>
            <span className="text-[10px] text-[#2E8B5C] font-semibold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +15.4% vs last Q
            </span>
          </div>
          <Coins className="w-8 h-8 text-[#2E8B5C] opacity-40" />
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Research Allocations</span>
            <h3 className="font-mono font-bold text-[24px] text-[#4A63C9] mt-1">$45,000</h3>
            <span className="text-[10px] text-[#5C5868]/60 dark:text-[#E4E2E4]/40 flex items-center gap-0.5 mt-1">
              Active NSF neural grant
            </span>
          </div>
          <TrendingUp className="w-8 h-8 text-[#4A63C9] opacity-40" />
        </div>

        <div className="p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C5868]/70 dark:text-[#E4E2E4]/50">Student Event Reserves</span>
            <h3 className="font-mono font-bold text-[24px] text-[#9C7FDB] mt-1">$9,700</h3>
            <span className="text-[10px] text-[#C1493D] font-semibold flex items-center gap-0.5 mt-1">
              <ArrowDownRight className="w-3.5 h-3.5" /> -$4,500 hackathon debits
            </span>
          </div>
          <PieChart className="w-8 h-8 text-[#9C7FDB] opacity-40" />
        </div>
      </div>

      {/* Main Vault Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Transaction logs */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#9C7FDB]" />
                Budget Ledger & Transaction Logs
              </h3>
              <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60">
                Departmental funds disbursals, research grant allocations, and licensing fees receipts.
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-white/60 dark:bg-white/10 hover:bg-[#4A63C9] hover:text-white text-[#1E1B24] dark:text-white border border-[#E3D5BC]/50 dark:border-white/5 text-[12px] font-semibold flex items-center gap-1.5 transition-all shrink-0">
              <Plus className="w-4 h-4" /> Request Disbursal
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((t) => {
              const isCredit = t.type === 'credit';
              const amtColor = isCredit ? 'text-[#2E8B5C]' : 'text-[#C1493D]';
              const indicatorBg = isCredit ? 'bg-[#DFF3E8]/40 dark:bg-[#DFF3E8]/5' : 'bg-[#FBE4E1]/40 dark:bg-[#C1493D]/10';

              return (
                <div
                  key={t.id}
                  className="p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px]"
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${indicatorBg}`}>
                      {isCredit ? (
                        <ArrowUpRight className={`w-4 h-4 ${amtColor}`} />
                      ) : (
                        <ArrowDownRight className={`w-4 h-4 ${amtColor}`} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[#1E1B24] dark:text-white truncate">
                        {t.item}
                      </h4>
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#5C5868]/70 dark:text-[#E4E2E4]/50 mt-1">
                        <span>{t.date}</span>
                        <span>·</span>
                        <span>{t.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 justify-between">
                    <span className={`font-mono font-bold text-[14px] ${amtColor}`}>
                      {t.amount}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                      t.status === 'Approved'
                        ? 'bg-[#DFF3E8] text-[#2E8B5C]'
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Funding Allocations Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white/35 dark:bg-white/5 border border-white/40 dark:border-white/5 space-y-4">
          <h3 className="font-display font-bold text-[16px] text-[#1E1B24] dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4A63C9]" />
            Category Allocation
          </h3>
          <p className="text-[11.5px] text-[#5C5868]/70 dark:text-[#E4E2E4]/60">
            Current quarter percentage distribution of budget disbursements.
          </p>

          <div className="space-y-4 pt-2">
            {/* Category progress bars */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#5C5868] dark:text-[#E4E2E4]/80">Research Grants</span>
                <span className="font-bold text-[#4A63C9]">62%</span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#4A63C9]" style={{ width: '62%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#5C5868] dark:text-[#E4E2E4]/80">Lab Infrastructure</span>
                <span className="font-bold text-[#9C7FDB]">20%</span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#9C7FDB]" style={{ width: '20%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#5C5868] dark:text-[#E4E2E4]/80">Exam Operations</span>
                <span className="font-bold text-[#2E8B5C]">12%</span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#2E8B5C]" style={{ width: '12%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#5C5868] dark:text-[#E4E2E4]/80">Student Events</span>
                <span className="font-bold text-amber-500">6%</span>
              </div>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
