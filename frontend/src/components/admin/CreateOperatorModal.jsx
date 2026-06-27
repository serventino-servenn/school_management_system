import React, { useState } from 'react';
import { X, UserPlus, Shield, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function CreateOperatorModal({ isOpen, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Standard',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) return;
    
    onSave({
      ...formData,
      id: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
    });
    
    // Clear state inputs cleanly
    setFormData({ firstName: '', lastName: '', email: '', password: '', role: 'Standard' });
    setShowPassword(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with dynamic frosted glass blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card wrapper with premium slide/scale animation anchoring */}
      <div className="bg-white w-full max-w-md rounded-2xl border border-slate-100 shadow-xl relative z-10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Ribbon using your dominant gradient anchor aesthetic */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <UserPlus size={20} className="text-indigo-200" />
              Provision New Operator
            </h3>
            <p className="text-indigo-200 text-xs mt-1">
              Assign identity credentials and core access permission infrastructure rules.
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Operational Multi-Input Form Configuration */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Row 1: Split Name Field Layout */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User size={12} className="text-slate-400" /> First Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-900/30 focus:bg-white focus:shadow-sm transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Last Name
              </label>
              <input
                type="text"
                required
                placeholder="Morgan"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-900/30 focus:bg-white focus:shadow-sm transition"
              />
            </div>
          </div>

          {/* Row 2: Target Email Credential Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Mail size={12} className="text-slate-400" /> Contact Endpoint Email
            </label>
            <input
              type="email"
              required
              placeholder="operator@domain.school"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-900/30 focus:bg-white focus:shadow-sm transition"
            />
          </div>

          {/* Row 3: Security Credentials Field with Interactive Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Lock size={12} className="text-slate-400" /> Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-4 pr-11 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-900/30 focus:bg-white focus:shadow-sm transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Row 4: Role Clearance Infrastructure Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Shield size={12} className="text-slate-400" /> Clearance Level Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-indigo-900/30 focus:bg-white focus:shadow-sm transition cursor-pointer"
            >
              <option value="Standard">Standard Operator</option>
              <option value="Manager">System Manager</option>
              <option value="Admin">Platform Administrator</option>
            </select>
          </div>

          {/* Action Control Button Ribbon */}
          <div className="flex justify-end items-center gap-3 pt-3 border-t border-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-100 hover:bg-slate-50 rounded-xl transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-900 hover:bg-slate-900 rounded-xl transition duration-200 shadow-sm active:scale-[0.98]"
            >
              Confirm Provision
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
