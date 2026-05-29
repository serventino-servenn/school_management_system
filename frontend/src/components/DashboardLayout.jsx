import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, 
  ClipboardList, LogOut, Settings 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  // Define sidebar links
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Users size={20} />, label: 'Students', path: '/admin/students' },
    { icon: <BookOpen size={20} />, label: 'Courses', path: '/admin/courses' },
    { icon: <ClipboardList size={20} />, label: 'Attendance', path: '/admin/attendance' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3 text-indigo-600 font-bold text-xl">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <BookOpen size={20} />
          </div>
          EduFlow
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                location.pathname === item.path 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">Admin User</p>
              <p className="text-xs text-slate-500 uppercase">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-full border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              AD
            </div>
          </div>
        </header>

        {/* This is where your nested pages will render! */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
