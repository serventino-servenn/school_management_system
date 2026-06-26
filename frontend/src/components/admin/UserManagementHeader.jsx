import React from 'react';
import { UserPlus } from 'lucide-react'; // Premium Lucide icon for user creation

export default function UserManagementHeader({ totalUsers, setIsModalOpen }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      {/* Left Column: Identity Typography Hierarchy */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          User Management
        </p>

        <div className="flex items-center gap-3 mt-0.5">
          <h2 className="text-2xl font-bold text-slate-800">
            User Directory
          </h2>
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase">
            {totalUsers.toLocaleString()} Total
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-1">
          Provision, audit, and manage your core identity infrastructure.
        </p>
      </div>

      {/* Right Column: Interactive Action Button matching your layout theme */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition shadow-sm active:scale-[0.98] self-start sm:self-auto"
      >
        <UserPlus size={16} />
        Create Operator
      </button>

    </div>
  );
}
