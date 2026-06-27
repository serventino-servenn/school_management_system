
import React, { useState } from 'react';
import { UserPlus, X, User, Mail, Lock, Shield, Eye, EyeOff,ChevronDown} from 'lucide-react';

export default function CreateOperatorModal({ isOpen, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) return;
    
    onSave(formData);
    
    setFormData({ firstName: '', lastName: '', email: '', password: '', role: 'Standard' });
    setShowPassword(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Soft, clean dark overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Redesigned Card Wrapper */}
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200/60 shadow-2xl relative z-10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Bright, Modern Light Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                New Operator
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Set credentials and core access permissions.
              </p>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Clean Form Component */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Split Name Input */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User size={12} className="text-slate-400" /> First Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Last Name
              </label>
              <input
                type="text"
                required
                placeholder="Morgan"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Mail size={12} className="text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="operator@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Lock size={12} className="text-slate-400" /> Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl pl-3.5 pr-11 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Role Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Shield size={12} className="text-slate-400" /> Clearance Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition cursor-pointer appearance-none"
            >
              <option value="Standard">STUDENT</option>
              <option value="Manager">TEACHER</option>
              <option value="Admin">ADMIN</option>
            </select>
            <div className="absolute right-3 top-2.5 text-slate-400 pointer-events-none">
                <ChevronDown size={16} />
             </div>
          </div>

          {/* Action Control Button Strip */}
          <div className="flex justify-end items-center gap-2 pt-4 mt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm shadow-indigo-100 active:scale-[0.98]"
            >
              Create Operator
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
