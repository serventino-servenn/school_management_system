import React, { useState } from 'react';
import { CreditCard, Wallet, FileText, ArrowDownLeft, Receipt, CheckCircle, ShieldCheck, ExternalLink } from 'lucide-react';

export default function FinancialPortal() {
  // Financial statement state metrics
  const [tuitionSummary, setTuitionSummary] = useState({
    totalOutstanding: '1,420.00',
    dueDate: 'June 15, 2026',
    semesterCharges: '4,500.00',
    scholarships: '3,000.00',
    paidToDate: '780.00'
  });

  const transactionLedger = [
    { id: 'TXN-9042', date: 'May 14, 2026', type: 'Payment', description: 'Online Installment Authorization (Stripe)', amount: '-350.00', method: 'Visa ending in 4242', status: 'Settled' },
    { id: 'TXN-8819', date: 'May 01, 2026', type: 'Payment', description: 'Online Installment Authorization (Stripe)', amount: '-430.00', method: 'Visa ending in 4242', status: 'Settled' },
    { id: 'SCH-1002', date: 'Jan 15, 2026', type: 'Scholarship', description: 'Academic Excellence Merit Scholarship Allocation', amount: '-3,000.00', method: 'Institutional Internal Credit', status: 'Applied' },
    { id: 'INV-4029', date: 'Jan 10, 2026', type: 'Charge', description: 'Spring 2026 Academic Tuition Assessment Fee', amount: '+4,500.00', method: 'Invoice Bill', status: 'Invoiced' }
  ];

  const handleStripeCheckoutRedirect = () => {
    // Portfolio Demonstration Trigger Link
    alert("System Call: This anchor will dynamically invoke your Spring Boot Controller to securely mint a Stripe Checkout Session token, redirecting the user to Stripe's hosted PCI-compliant payment layout wrapper.");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 💳 Live Account Statement Metric Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total Outstanding Balance Due */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden group lg:col-span-1">
          {/* Subtle design visual anchor background grid */}
          <div className="absolute right-0 bottom-0 text-slate-800 translate-x-4 translate-y-4 font-black text-9xl pointer-events-none group-hover:text-slate-800/80 transition duration-300">
            $
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Remaining Outstanding Balance</span>
              <div className="bg-indigo-600/30 text-indigo-400 p-2 rounded-xl border border-indigo-500/20">
                <Wallet size={16} />
              </div>
            </div>
            <h3 className="text-4xl font-black tracking-tight mt-4 text-white">${tuitionSummary.totalOutstanding}</h3>
            <p className="text-xs text-rose-400 font-semibold mt-2 flex items-center gap-1">
              <span>Payment Deadline: {tuitionSummary.dueDate}</span>
            </p>
          </div>

          <button 
            onClick={handleStripeCheckoutRedirect}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 relative z-10"
          >
            <span>Process Online Payment</span>
            <ExternalLink size={12} />
          </button>
        </div>

        {/* Dynamic Breakdown Ledger Parameters Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Term Base Charges */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gross Base Tuition</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight mt-1">${tuitionSummary.semesterCharges}</h4>
            </div>
            <p className="text-xs text-slate-400 mt-4 border-t border-slate-50 pt-2">Spring 2026 Assessment</p>
          </div>

          {/* Credits / Financial Assistance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Disbursed Scholarships</p>
              <h4 className="text-2xl font-black text-emerald-600 tracking-tight mt-1">-${tuitionSummary.scholarships}</h4>
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-4 border-t border-emerald-50 pt-2 flex items-center gap-1">
              <CheckCircle size={12} />
              <span>Applied Merit Award</span>
            </p>
          </div>

          {/* Satisfied Balances Paid to Date */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Paid to Date Balance</p>
              <h4 className="text-2xl font-black text-indigo-600 tracking-tight mt-1">${tuitionSummary.paidToDate}</h4>
            </div>
            <p className="text-xs text-slate-400 mt-4 border-t border-slate-50 pt-2">Cleared Transactions</p>
          </div>

        </div>
      </div>

      {/* 🛡️ Compliance / Security Portfolio Indicator Tag */}
      <div className="flex items-center gap-3 bg-slate-100 border border-slate-200/60 p-4 rounded-2xl text-xs text-slate-600 max-w-4xl shadow-inner">
        <ShieldCheck size={20} className="text-slate-500 shrink-0" />
        <span>
          <strong>Architecture Design Highlight:</strong> To adhere strictly to <strong>PCI-DSS compliance regulations</strong>, the application database stores transaction reference hashes returned by Webhooks. It avoids persisting full card accounts or sensitive authorization credentials on your core framework server.
        </span>
      </div>

      {/* 📄 Section: Double-Entry Transaction History Log Audit */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Statement Ledger Account Audit</h2>
            <p className="text-xs text-slate-400 mt-0.5">Chronological double-entry adjustments for the active term</p>
          </div>
          <Receipt size={18} className="text-slate-400" />
        </div>

        <div className="divide-y divide-slate-100 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Reference ID</th>
                <th className="px-6 py-3.5">Posting Date</th>
                <th className="px-6 py-3.5">Description Context</th>
                <th className="px-6 py-3.5 text-right">Adjustment Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transactionLedger.map((txn) => {
                const isCharge = txn.type === 'Charge';
                return (
                  <tr key={txn.id} className="hover:bg-slate-50/40 transition">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{txn.id}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">{txn.date}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800 text-xs">{txn.description}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Payment Route: {txn.method}</p>
                    </td>
                    <td className={`px-6 py-4 text-right font-black text-xs whitespace-nowrap ${isCharge ? 'text-slate-900' : 'text-emerald-600'}`}>
                      {txn.amount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
