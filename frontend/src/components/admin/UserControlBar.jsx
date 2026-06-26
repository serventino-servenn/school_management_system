import React from 'react';
import { Search, X } from 'lucide-react'; // Clean Lucide icons

export default function UserControlBar({ 
  searchTerm, 
  setSearchTerm, 
  selectedRole, 
  setSelectedRole 
}) {
  
  // Available filter options matching your user system roles
  const roles = ['All Status', 'Admin', 'Manager', 'Standard'];

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center w-full">
      
      {/* Search Input Container - Matches your Course Management search layout */}
      <div className="relative w-full lg:max-w-md bg-white rounded-xl border border-slate-200 shadow-sm transition-focus group focus-within:border-indigo-400">
        <Search
          className="absolute left-3 top-3.5 text-slate-400 pointer-events-none"
          size={18}
        />

        <input
          type="text"
          placeholder="Search names, credentials, or emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent pl-10 pr-10 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
        />

        {/* Clear Search Action Button */}
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-3.5 p-0.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Right side: Premium Light-Themed Capsule Multi-Selector Toggle */}
      <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 overflow-x-auto w-full lg:w-auto scrollbar-none">
        {roles.map((role) => {
          const isActive = selectedRole === role;
          return (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 whitespace-nowrap ${
                isActive 
                  ? 'bg-white text-indigo-600 shadow-sm font-bold' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              {role}
            </button>
          );
        })}
      </div>

    </div>
  );
}
