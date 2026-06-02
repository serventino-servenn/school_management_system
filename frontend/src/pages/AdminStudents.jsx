import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, ShieldCheck, Mail, Calendar, UserCheck } from 'lucide-react';

const AdminStudents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Mock Student Database State
    const [students, setStudents] = useState([
        { id: "STU-001", name: "Sarah Jenkins", email: "sarah.j@school.com", batch: "Batch A", status: "Active", enrolled: "Sept 2025" },
        { id: "STU-002", name: "Alex Rivera", email: "a.rivera@school.com", batch: "Batch B", status: "Active", enrolled: "Oct 2025" },
        { id: "STU-003", name: "Marcus Chen", email: "m.chen@school.com", batch: "Batch A", status: "Suspended", enrolled: "Sept 2025" },
        { id: "STU-004", name: "Emily Watson", email: "emily.w@school.com", batch: "Batch C", status: "Active", enrolled: "Jan 2026" },
    ]);

    // Form State for onboarding new student
    const [newStudent, setNewStudent] = useState({ name: '', email: '', batch: 'Batch A' });

    const handleCreateStudent = (e) => {
        e.preventDefault();
        const studentId = `STU-00${students.length + 1}`;
        const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        const createdUser = {
            id: studentId,
            name: newStudent.name,
            email: newStudent.email,
            batch: newStudent.batch,
            status: "Active",
            enrolled: formattedDate
        };

        setStudents([...students, createdUser]);
        setNewStudent({ name: '', email: '', batch: 'Batch A' });
        setIsModalOpen(false); // Close operational modal
    };

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* 📁 Header Row with Context Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">System Directory</p>
                    <h2 className="text-2xl font-bold text-slate-800">Student Profiles</h2>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition shadow-sm shadow-indigo-600/10 self-start sm:self-auto"
                >
                    <Plus size={16} />
                    Onboard New Student
                </button>
            </div>
            {/* 🔍 Search and Filtering Utility Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search students by name or record ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 pl-10 pr-4 py-2 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                </div>
                <button className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 transition">
                    <Filter size={16} />
                    Filter Batches
                </button>
            </div>
            {/* 📊 High-Density SaaS Data Table Container */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4">Student ID</th>
                                <th className="px-6 py-4">Full Name</th>
                                <th className="px-6 py-4">Cohort Batch</th>
                                <th className="px-6 py-4">Enrollment Date</th>
                                <th className="px-6 py-4">System Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-12 text-slate-400">
                                        No student records found matching the criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition">
                                        {/* Student ID Column */}
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500">
                                            {student.id}
                                        </td>
                                        
                                        {/* Full Name & Email Column */}
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{student.name}</div>
                                            <div className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                                                <Mail size={12} /> {student.email}
                                            </div>
                                        </td>
                                        
                                        {/* Cohort Column */}
                                        <td className="px-6 py-4 font-medium text-slate-600">
                                            {student.batch}
                                        </td>
                                        
                                        {/* Enrollment Date Column */}
                                        <td className="px-6 py-4 text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-slate-400" />
                                                {student.enrolled}
                                            </div>
                                        </td>
                                        
                                        {/* System Status Pill Column */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                student.status === 'Active' 
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                                    : 'bg-red-50 text-red-700 border border-red-100'
                                            }`}>
                                                <UserCheck size={12} />
                                                {student.status}
                                            </span>
                                        </td>
                                        
                                        {/* Action Operations Column */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* 🛠️ Modern Pop-up Modal Form */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl border border-slate-100 w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    
                    {/* Modal Header */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
                        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                            <ShieldCheck size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-800">Onboard New Profile</h3>
                            <p className="text-xs text-slate-400">Instantiate a secure system credential register.</p>
                        </div>
                    </div>

                    {/* Modal Form Content */}
                    <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
                        
                        {/* Form Field: Name */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Legal Name</label>
                            <input 
                                type="text" 
                                required
                                placeholder="Jane Doe"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition bg-slate-50/50 focus:bg-white"
                            />
                        </div>

                        {/* Form Field: Email */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Academic Email Route</label>
                            <input 
                                type="email" 
                                required
                                placeholder="j.doe@school.com"
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition bg-slate-50/50 focus:bg-white"
                            />
                        </div>

                        {/* Form Field: Dropdown Selection */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Cohort Target Batch</label>
                            <select 
                                value={newStudent.batch}
                                onChange={(e) => setNewStudent({...newStudent, batch: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition bg-slate-50/50 focus:bg-white"
                            >
                                <option value="Batch A">Batch A (Backend Core)</option>
                                <option value="Batch B">Batch B (Frontend Core)</option>
                                <option value="Batch C">Batch C (Fullstack Advanced)</option>
                            </select>
                        </div>

                        {/* Form Footer Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                            <button 
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-sm rounded-xl transition"
                            >
                                Discard
                            </button>
                            <button 
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition shadow-sm"
                            >
                                Register Account
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        )}
        </div>     
    )

}     

export default AdminStudents;