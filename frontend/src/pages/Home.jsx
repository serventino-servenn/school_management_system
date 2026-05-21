
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-5 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
          Manage Your Campus <br /> 
          <span className="text-indigo-600 underline decoration-indigo-200">Without the Chaos</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          The all-in-one Student Management System designed for modern universities. 
          Secure, role-based access for students, teachers, and admins.
        </p>
        {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-800 transition">
            Register Now <ArrowRight size={20} />
          </Link>
          <Link to="/login" className="flex items-center justify-center bg-white border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
            Admin Demo
          </Link>
        </div> */}
      </header>

      {/* Role Selection Grid */}
      <section className="container mx-auto px-6 py-5">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Student Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition group">
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <BookOpen className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Student Portal</h3>
            <p className="text-slate-500 mb-6">Enroll in courses, view your major requirements, and track academic progress.</p>
            <Link to="/register?role=student" className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
              Join as Student <ArrowRight size={16} />
            </Link>
          </div>

          {/* Teacher Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition group">
            <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <Users className="text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Faculty Portal</h3>
            <p className="text-slate-500 mb-6">Manage your department, oversee class rosters, and support student success.</p>
            <Link to="/login" className="text-emerald-600 font-bold flex items-center gap-1 hover:underline">
              Faculty Access <ArrowRight size={16} />
            </Link>
          </div>

          {/* Admin Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition group">
            <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
              <ShieldCheck className="text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Admin Center</h3>
            <p className="text-slate-500 mb-6">Full system oversight: manage teachers, students, and institutional data.</p>
            <Link to="/login" className="text-indigo-600 font-bold flex items-center gap-1 hover:underline">
              Enter Admin Mode <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Footer */}
      
    </div>
  );
};

export default Home;