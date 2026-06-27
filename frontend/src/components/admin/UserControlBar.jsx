
import React from 'react';
import { Search, X } from 'lucide-react';

export default function UserControlBar({ 
  searchTerm, 
  setSearchTerm, 
  selectedRole, 
  setSelectedRole, 
  roles 
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center w-full">
      
      {/* Search Input Container - Fine-tuned focus styling to match dashboard cards */}
      <div className="relative w-full lg:max-w-md bg-white rounded-xl border border-slate-100 shadow-sm transition duration-200 group focus-within:border-indigo-900/30 focus-within:shadow-md focus-within:shadow-indigo-900/[0.02]">
        <Search
          className="absolute left-3 top-3.5 text-slate-400 pointer-events-none group-focus-within:text-indigo-900/60 transition-colors"
          size={18}
        />

        <input
          type="text"
          placeholder="Search operators by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent pl-10 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />

        {/* Clear Search Action Button - Pops into view cleanly when typing */}
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-3.5 p-0.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition"
            title="Clear search query"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Right side: Light-Themed Capsule Multi-Selector Toggle (Already working) */}
      <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100 overflow-x-auto w-full lg:w-auto scrollbar-none">
        {roles.map((role) => {
          const isActive = selectedRole === role;
          return (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                isActive 
                  ? 'bg-indigo-900 text-white shadow-sm font-bold' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white'
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

