import React from 'react';
import { useEffect } from 'react';
import { Shield, ShieldAlert,MoreVertical,Eye,Activity,
   ShieldCheck, Calendar, Mail, User, ShieldCheck as OperationIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function UserTable({ 
  users, loading, onToggleStatus,onEdit, onDelete
}) {
    const navigate = useNavigate();
  
  // Format timestamps neatly to display in the data row
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
      const handleClickOutside = () => setOpenMenuId(null);
      window.addEventListener("click", handleClickOutside);
      return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Extract initials from first and last names for profile layout bubbles
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || '??';
  };



  // Loading State - Matches your course component loading styling perfectly
  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3">
          {/* Subtle spinning accent */}
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Loading user infrastructure records...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            
            {/* Table Column Labels */}
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                <th className="py-4 px-6 flex items-center gap-2 font-semibold"><User size={13} className="text-slate-400" /> Operator Identity</th>
                <th className="py-4 px-6 font-semibold"><Mail size={13} className="inline mr-1 text-slate-400" /> Contact Endpoint</th>
                <th className="py-4 px-6 font-semibold"><Shield size={13} className="inline mr-1 text-slate-400" /> Clearance</th>
                <th className="py-4 px-6 font-semibold"><div className="flex items-center gap-2"><Activity size={13} className="text-slate-400" /><span>Status</span> </div></th>
                <th className="py-4 px-6 text-right font-semibold">Operations</th>
              </tr>
            </thead>

            {/* Table Rows Body Data Frame */}
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {users.length === 0 ? (
                /* Empty State Row */
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">
                    <h3 className="font-bold text-slate-800 text-base">No Operators Found</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Try adjusting your search query parameters or create a new user.
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-slate-50/40 transition-colors duration-200 group"
                  >
                    {/* Column 1: Profile Avatar Bubble and Full Name Fields */}
                    <td className="py-4 px-6 font-medium text-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center text-xs font-bold border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-900 transition-colors duration-200">
                          {getInitials(user.firstName, user.lastName)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 group-hover:text-indigo-900 transition-colors">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                            UID: {user.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: User Email Credential Endpoint */}
                    <td className="py-4 px-6 text-slate-600 font-normal">
                      {user.email}
                    </td>

                    {/* Column 3: Custom Role Pill Badges styled explicitly after your app theme */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role?.toLowerCase() === 'admin'
                          ? 'bg-rose-50 text-rose-700'
                          : user.role?.toLowerCase() === 'teacher'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {user.role?.toLowerCase() === 'admin' && <ShieldAlert size={11} />}
                        {user.role?.toLowerCase() === 'teacher' && <Shield size={11} />}
                        {user.role?.toLowerCase() === 'student' && <ShieldCheck size={11} />}
                        {user.role || 'Student'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                        <div className="flex items-center gap-3">

                            <button
                                onClick={() => onToggleStatus(user)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                                    user.active ? "bg-emerald-500" : "bg-slate-300"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                        user.active ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>

                            <span
                                className={`text-xs font-semibold ${
                                    user.active
                                        ? "text-emerald-600"
                                        : "text-slate-500"
                                }`}
                            >
                                {user.active ? "Active" : "Inactive"}
                            </span>

                        </div>
                    </td>

                    {/* Column 5: Inline Record Operation Control Buttons */}
                    <td className="py-4 px-6 text-right">
                      {/* <button 
                        onClick={() => onToggleStatus(user.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-white hover:bg-indigo-900 hover:text-white border border-slate-100 px-3 py-1.5 rounded-xl transition duration-200 shadow-sm shadow-slate-100/50"
                      >
                        <OperationIcon size={13} />
                        <span>Edit</span>
                      </button> */}
                          <div className="relative flex justify-end">
  
                            <button
                              onClick={(e) =>{
                                e.stopPropagation();
                                setOpenMenuId(openMenuId === user.id ? null : user.id)
                              }}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-white hover:bg-indigo-900 hover:text-white border border-slate-100 px-3 py-1.5 rounded-xl transition shadow-sm"
                            >
                              <MoreVertical size={14} />
                              <span>Manage</span>
                            </button>

                            {openMenuId === user.id && (
                              <div className="absolute right-0 mt-10 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden">
                                
                                <button
                                    onClick={() => navigate(`/admin/users/${user.id}`)}
                                   className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50"
                                >
        
                                   <span>View Profile</span>
                                   <Eye size={13} />
                                </button>
                                <button 
                                  onClick={() => onEdit(user)}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">
                                  Edit User
                                </button>

                                {/* <button
                                  onClick={() => onToggleStatus(user.id)}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                                >
                                  Toggle Status
                                </button> */}

                                <button
                                  onClick={() => {
                                      console.log("Delete clicked", user);
                                      onDelete(user);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Delete
                                </button>

                              </div>
                            )}
                          </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
 );

}
