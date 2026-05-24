import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, Building2, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { register } from '../services/api'; // Your Axios service for registration

const Register = () => {
  const navigate = useNavigate();
  
  // 1. Component States
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT',
    department: ''
  });
  const [error, setError] = useState(""); // For backend error messages
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 2. Call your Axios Service
      const response = await register(formData);
      if (response.status === 200) {
        navigate('/dashboard'); 
      }
        
    } catch (err) {
      // 4. Capture the message from your GlobalExceptionHandler
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 py-12 px-4">
      
      {/* Absolute Header for Desktop */}
      <Link to="/" className="absolute top-8 left-8 hidden md:flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-medium">
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <GraduationCap className="text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Create Account</h2>
          <p className="mt-2 text-slate-500 font-medium text-sm">Join the EduFlow platform today</p>
        </div>

        {/* Dynamic Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-semibold animate-in fade-in zoom-in duration-300">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Role Toggle Switch */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-4">
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'STUDENT', department: ''})}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${formData.role === 'STUDENT' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'TEACHER'})}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${formData.role === 'TEACHER' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Teacher
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              name="firstName" 
              value={formData.firstName}
              placeholder="First Name" 
              required 
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm" 
            />
            <input 
              name="lastName" 
              value={formData.lastName}
              placeholder="Last Name" 
              required 
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm" 
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-400 size-5" />
            <input 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              required 
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm" 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-400 size-5" />
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 text-slate-900 focus:ring-indigo-500 outline-none transition text-sm" 
            />
          </div>

          {/* Conditional Teacher Field */}
          {formData.role === 'TEACHER' && (
            <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
              <Building2 className="absolute left-4 top-3.5 text-slate-400 size-5" />
              <input 
                name="department" 
                placeholder="Department Name" 
                required 
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm" 
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
