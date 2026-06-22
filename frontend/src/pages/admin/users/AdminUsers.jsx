import React, { use, useEffect, useState } from 'react';
import { 
    Plus, Search, Filter, Edit2, Trash2, ShieldCheck, Mail, Calendar, UserCheck,
    Users
} from 'lucide-react';
import { getUsers } from '../../../services/api';

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5); 
    
    
        const indexOfLastUser = currentPage * rowsPerPage;
        const indexOfFirstUser = indexOfLastUser - rowsPerPage;

        const currentUsers = users.slice(
            indexOfFirstUser,
            indexOfLastUser
        );
    
    const handleToggleStatus = (userId) => {
        // Implement status toggle logic here (e.g., API call to update user status)
        console.log(`Toggling status for user ID: ${userId}`);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const {data} = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Administration
                    </p>

                    <h1 className="text-3xl font-bold text-slate-800 mt-2">
                        User Management
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage students, teachers, and administrators across the platform.
                    </p>
                </div>

                <button
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
                >
                    <Users size={16} />
                    Add User
                </button>

            </div>
            {/* Search & Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

                <div className="flex flex-col md:flex-row gap-4">

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <select
                        className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All Roles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="STUDENT">Student</option>
                    </select>

                </div>

            </div>
            {/* 📊 High-Density SaaS Data Table Container */}
            {/* Users Table */}
             <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                                            User
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                                            Email Address
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                                            Phone Number
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                                            Role
                                        </th>

                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">
                                            Actions
                                        </th>

                                    </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {currentUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >

                                        {/* User Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-700">
                                                    {user.name.charAt(0)}
                                                </div>

                                                <span className="font-medium text-slate-900">
                                                    {user.name}
                                                </span>

                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        {/* <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    user.active
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {user.active ? "Active" : "Inactive"}
                                            </span>
                                        </td> */}

                                        <td className="px-6 py-4 text-center">
                                            <label className="relative inline-flex items-center cursor-pointer">

                                                <input
                                                    type="checkbox"
                                                    checked={user.active}
                                                    onChange={() => handleToggleStatus(user.id)}
                                                    className="sr-only peer"
                                                />

                                                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>

                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>

                                            </label>
                                        </td>
                                        {/* Created */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {user.createdAt}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">

                                                <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-slate-100">
                                                    View
                                                </button>

                                                <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-slate-100">
                                                    Edit
                                                </button>

                                                <button className="px-3 py-1.5 text-sm border border-red-200 text-red-600 hover:bg-red-50 rounded-lg">
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

            </div>
            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

                {/* Left Side */}
                <div className="flex items-center gap-4">

                    <p className="text-sm text-slate-500">
                        Showing 1–5 of 22 users
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">
                            Rows per page
                        </span>

                        <select
                            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>

                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    <button className="px-4 py-2 border rounded-lg">
                        Previous
                    </button>

                    <button className="w-10 h-10 rounded-lg bg-indigo-600 text-white">
                        1
                    </button>

                    <button className="w-10 h-10 rounded-lg border">
                        2
                    </button>

                    <button className="w-10 h-10 rounded-lg border">
                        3
                    </button>

                    <button className="px-4 py-2 border rounded-lg">
                        Next
                    </button>

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

export default AdminUsers;