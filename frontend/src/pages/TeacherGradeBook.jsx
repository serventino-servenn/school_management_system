import React, { useState } from 'react';
import { Award, Save, Search, CheckCircle, Percent, Plus } from 'lucide-react';

const TeacherGradebook = () => {
    const [selectedBatch, setSelectedBatch] = useState('Batch A');
    const [selectedAssessment, setSelectedAssessment] = useState('Midterm Exam');
    const [searchTerm, setSearchTerm] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Mock Database for Student Assessment Grades Matrix
    const [grades, setGrades] = useState([
        { id: "STU-001", name: "Sarah Jenkins", batch: "Batch A", assessment: "Midterm Exam", score: 92 },
        { id: "STU-003", name: "Marcus Chen", batch: "Batch A", assessment: "Midterm Exam", score: 78 },
        { id: "STU-004", name: "Emily Watson", batch: "Batch A", assessment: "Midterm Exam", score: 85 },
        { id: "STU-002", name: "Alex Rivera", batch: "Batch B", assessment: "Midterm Exam", score: 88 },
    ]);

    // Handle instant input cell editing
    const handleGradeChange = (studentId, newScore) => {
        const parsedScore = Math.min(100, Math.max(0, parseInt(newScore) || 0));
        setGrades(grades.map(grade => 
            (grade.id === studentId && grade.assessment === selectedAssessment)
                ? { ...grade, score: parsedScore }
                : grade
        ));
    };

    // Filter rows by matching batch selection and search term filters
    const filteredGrades = grades.filter(item => 
        item.batch === selectedBatch &&
        item.assessment === selectedAssessment &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCommitGrades = (e) => {
        e.preventDefault();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* 📁 Header Controls Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Academic Ledger</p>
                    <h2 className="text-2xl font-bold text-slate-800">Gradebook Management</h2>
                </div>
                
                <button 
                    onClick={handleCommitGrades}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition shadow-sm shadow-indigo-600/10 self-start sm:self-auto"
                >
                    <Save size={16} />
                    Commit Marks Layer
                </button>
            </div>

            {/* 🎉 Context Operation Confirmation Alert Banner */}
            {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <CheckCircle size={18} className="text-emerald-600" />
                    <span className="text-sm font-medium">Student assessment score matrix values securely saved and locked into database records.</span>
                </div>
            )}

            {/* 🛠️ Ledger Filter Selection Grid Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
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

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assessment Track</label>
                    <select 
                        value={selectedAssessment} 
                        onChange={(e) => setSelectedAssessment(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition font-medium text-slate-700"
                    >
                        <option value="Midterm Exam">Midterm Exam</option>
                        <option value="Project Deliverable 1">Project Deliverable 1</option>
                    </select>
                </div>

                <div className="md:col-span-2 flex flex-col justify-end">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 md:hidden">Search Profile</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Filter records matching student profile criteria..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 pl-10 pr-4 py-2 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                        />
                    </div>
                </div>
            </div>

            {/* 📊 High-Density Marks Database Ledger Grid Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">System Identity ID</th>
                                <th className="px-6 py-4">Student Profile Name</th>
                                <th className="px-6 py-4">Target Track</th>
                                <th className="px-6 py-4 w-40">Grade Marks (Max 100)</th>
                                <th className="px-6 py-4 text-right">Performance Standing</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {filteredGrades.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-slate-400 text-sm">
                                        No student grade rosters matching criteria found.
                                    </td>
                                </tr>
                            ) : (
                                filteredGrades.map((record) => (
                                    <tr key={record.id} className="hover:bg-slate-50/40 transition">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500 font-semibold">{record.id}</td>
                                        <td className="px-6 py-4 font-bold text-slate-800">{record.name}</td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">{record.assessment}</td>
                                        <td className="px-6 py-4">
                                            <div className="relative flex items-center max-w-[100px] bg-slate-50 rounded-xl border border-slate-200 focus-within:border-indigo-500 focus-within:bg-white transition px-3 py-1.5">
                                                <input 
                                                    type="number"
                                                    value={record.score}
                                                    onChange={(e) => handleGradeChange(record.id, e.target.value)}
                                                    className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <Percent size={12} className="text-slate-400 shrink-0 ml-1" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                record.score >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                record.score >= 75 ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                                'bg-rose-50 text-rose-700 border border-rose-100'
                                            }`}>
                                                {record.score >= 90 ? 'Excellent Standing' :
                                                 record.score >= 75 ? 'Satisfactory Standing' : 'Needs Review Track'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherGradebook;