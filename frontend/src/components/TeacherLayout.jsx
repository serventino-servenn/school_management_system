import React from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BookOpen, ClipboardList, GraduationCap, Sparkles, LogOut, Award, FolderOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Adjust path based on your project structure

const TeacherLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  // Menu items matched exactly to Section 2: Teacher Features
  const menuItems = [
    { icon: <ClipboardList size={20} />, label: 'Attendance Register', path: '/teacher/attendance' },
    { icon: <Award size={20} />, label: 'Gradebook Management', path: '/teacher/gradebook' },
    { icon: <Sparkles size={20} />, label: 'AI Lesson Assistant', path: '/teacher/lessons' },
    { icon: <FolderOpen size={20} />, label: 'Resource Portal', path: '/teacher/resources' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 💾 Fixed Dark Sidebar Container */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-40 text-slate-300">
        
        {/* Brand Logo Section */}
        <div className="p-6 flex items-center gap-3 text-white font-bold text-xl border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-900/30">
            <BookOpen size={18} />
          </div>
          <span className="tracking-tight">EduFlow</span>
        </div>

        {/* Faculty Context Role Tag */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-xl border border-slate-800 text-xs font-semibold text-emerald-400">
            <GraduationCap size={14} />
            <span>FACULTY WORKSPACE</span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions Section */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition duration-200 text-sm font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* 🚀 Main Content Workspace Container */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header Bar inside Workspace */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h1>
          
          {/* Teacher Identity Component */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Dr. Angela Yu</p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Senior Instructor</p>
            </div>
            <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-sm shadow-sm">
              AY
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content Workspace Grid */}
        <main className="flex-1 p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
