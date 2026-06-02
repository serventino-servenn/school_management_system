import React, { useState } from 'react';
import { ClipboardList, Search, Save, Calendar, Check, X, CheckCircle } from 'lucide-react';

const TeacherAttendance = () => {
    const [selectedBatch, setSelectedBatch] = useState('Batch A');
    const [searchTerm, setSearchTerm] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Mock Database for Student Roster State
    const [roster, setRoster] = useState([
        { id: "STU-001", name: "Sarah Jenkins", email: "sarah.j@school.com", batch: "Batch A", status: "Present" },
        { id: "STU-002", name: "Alex Rivera", email: "a.rivera@school.com", batch: "Batch B", status: "Present" },
        { id: "STU-003", name: "Marcus Chen", email: "m.chen@school.com", batch: "Batch A", status: "Absent" },
        { id: "STU-004", name: "Emily Watson", email: "emily.w@school.com", batch: "Batch A", status: "Present" },
    ]);

    // Filter roster dynamically by selected batch and student search input
    const filteredRoster = roster.filter(student => 
        student.batch === selectedBatch &&
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Quick attendance status toggle handler
    const toggleStatus = (studentId, currentStatus) => {
        const nextStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
        setRoster(roster.map(student => 
            student.id === studentId ? { ...student, status: nextStatus } : student
        ));
    };

    // Bulk operation action: mark all visible batch students as present
    const markAllPresent = () => {
        const visibleIds = filteredRoster.map(s => s.id);
        setRoster(roster.map(student => 
            visibleIds.includes(student.id) ? { ...student, status: 'Present' } : student
        ));
    };

    const handleSaveRegister = (e) => {
        e.preventDefault();
        setSaveSuccess(true);
        // Dim the success notification banner after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const todayDate = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    return (
        <div className="space-y-6">
            {/* 📁 Workspace Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Academic Records</p>
                    <h2 className="text-2xl font-bold text-slate-800">Digital Attendance Register</h2>
                    <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-1">
                        <Calendar size={14} /> {todayDate}
                    </p>
                </div>
                
                <button 
                    onClick={handleSaveRegister}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition shadow-sm shadow-indigo-600/10 self-start sm:self-auto"
                >
                    <Save size={16} />
                    Commit Daily Log
                </button>
            </div>

            {/* 🎉 Contextual Operation Success Toast Banner */}
            {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <CheckCircle size={18} className="text-emerald-600" />
                    <span className="text-sm font-medium">Daily attendance data package successfully compiled and cached into the tracking system log.</span>
                </div>
            )}

            {/* 🛠️ Cohort Roster Filtering Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Cohort</label>
                    <select 
                        value={selectedBatch} 
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition font-medium text-slate-700"
                    >
                        <option value="Batch A">Batch A (Backend Core)</option>
                        <option value="Batch B">Batch B (Frontend Core)</option>
                    </select>
                </div>

                <div className="sm:col-span-2 flex flex-col justify-end">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 sm:hidden">Filter Name</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Filter roster matching student profile criteria..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 pl-10 pr-4 py-2 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                        />
                    </div>
                </div>
            </div>

            {/* 📊 Attendance Checklist Ledger Grid */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Roster Checklist ({filteredRoster.length} students)
                    </span>
                    <button 
                        onClick={markAllPresent}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold transition"
                    >
                        Mark All as Present
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {filteredRoster.length === 0 ? (
                        <div className="text-center py-12 text-slate-400 text-sm">
                            No student rosters assigned to this cohort sector match requirements.
                        </div>
                    ) : (
                        filteredRoster.map((student) => (
                            <div key={student.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/40 transition">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-bold text-slate-800">{student.name}</h4>
                                    <p className="text-xs text-slate-400 font-mono">{student.id}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Present Interactive Toggle Card Button */}
                                    <button
                                        onClick={() => toggleStatus(student.id, student.status)}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition duration-150 ${
                                            student.status === 'Present'
                                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm shadow-emerald-100'
                                                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                                        }`}
                                    >
                                        <Check size={14} />
                                        Present
                                    </button>

                                    {/* Absent Interactive Toggle Card Button */}
                                    <button
                                        onClick={() => toggleStatus(student.id, student.status)}
                                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition duration-150 ${
                                            student.status === 'Absent'
                                                ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm shadow-rose-100'
                                                : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                                        }`}
                                    >
                                        <X size={14} />
                                        Absent
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherAttendance;
