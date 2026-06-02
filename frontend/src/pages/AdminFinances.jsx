import React, { useState } from 'react';
import { CreditCard, DollarSign, CheckCircle2, AlertCircle, Search, FileText, Send, ArrowUpRight } from 'lucide-react';

const AdminFinance = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Database for Invoices and Fee Tracking
    const [invoices, setInvoices] = useState([
        { id: "INV-8821", student: "Sarah Jenkins", batch: "Batch A", amount: 1500, status: "Paid", date: "May 12, 2026" },
        { id: "INV-8822", student: "Alex Rivera", batch: "Batch B", amount: 1500, status: "Pending", date: "May 18, 2026" },
        { id: "INV-8823", student: "Marcus Chen", batch: "Batch A", amount: 1500, status: "Overdue", date: "April 01, 2026" },
        { id: "INV-8824", student: "Emily Watson", batch: "Batch C", amount: 1200, status: "Paid", date: "May 20, 2026" },
    ]);

    const filteredInvoices = invoices.filter(inv =>
        inv.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* 📁 Header Row */}
            <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Financial Operations</p>
                <h2 className="text-2xl font-bold text-slate-800">Fee & Financial Tracking</h2>
            </div>

            {/* 📊 Financial Health Overview Mini-Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Projected Revenue</p>
                        <h3 className="text-2xl font-bold text-slate-800">$5,700</h3>
                    </div>
                    <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
                        <DollarSign size={20} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Collected Fees</p>
                        <h3 className="text-2xl font-bold text-emerald-600">$2,700</h3>
                    </div>
                    <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <CheckCircle2 size={20} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Outstanding Balances</p>
                        <h3 className="text-2xl font-bold text-rose-600">$3,000</h3>
                    </div>
                    <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl">
                        <AlertCircle size={20} />
                    </div>
                </div>
            </div>

            {/* 🔍 Search and Filters */}
            <div className="relative max-w-md bg-white rounded-xl border border-slate-200/60 shadow-sm">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search invoices by student name or invoice ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-2 text-sm focus:outline-none"
                />
            </div>

            {/* 📑 Invoice Registry Ledger */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Invoice ID</th>
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Cohort Batch</th>
                                <th className="px-6 py-4">Billing Date</th>
                                <th className="px-6 py-4">Amount Due</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {filteredInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-slate-50/50 transition">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 font-semibold">{inv.id}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">{inv.student}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{inv.batch}</td>
                                    <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">${inv.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                            inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                            inv.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                            'bg-rose-50 text-rose-700 border border-rose-100'
                                        }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition title='View Invoice'">
                                                <FileText size={16} />
                                            </button>
                                            {inv.status !== 'Paid' && (
                                                <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-slate-400 hover:text-indigo-600 transition" title="Send Reminder">
                                                    <Send size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminFinance;
