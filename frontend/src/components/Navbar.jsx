// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-sm sticky top-0 z-50 w-full">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
        <div className="bg-indigo-600 p-1.5 rounded-lg">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-indigo-900">EduFlow</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 font-medium text-slate-600">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
        
        <div className="h-6 w-[1px] bg-slate-200 mx-2"></div> {/* Divider */}
        
        <Link to="/login" className="hover:text-indigo-600 transition">Login</Link>
        <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-md">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
