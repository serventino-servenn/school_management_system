import React, { useState } from 'react';
import { Bell, Sparkles, BookOpen, Clock, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

const SmartAlerts = () => {
  // Mock event tracking alert logs matching your functional app specification
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'ai-warning',
      title: 'Missing Study Material Trackers',
      message: "You haven't checked the new Java Programming notes, and your midterm examination is scheduled in exactly 3 days!",
      courseCode: 'CS-301',
      courseName: 'Java Programming',
      actionLabel: 'Review Java Notes',
      daysLeft: 3,
      read: false,
    },
    {
      id: 2,
      type: 'academic-deadline',
      title: 'Database Assignment Due',
      message: 'Module 4: Normalization Schema submission pipeline closes tonight at 11:59 PM.',
      courseCode: 'CS-304',
      courseName: 'Database Systems',
      actionLabel: 'Open Assignment Drop',
      daysLeft: 0,
      read: false,
    },
    {
      id: 3,
      type: 'financial-reminder',
      title: 'Tuition Balance Installment',
      message: 'Your partial second installment payment allocation threshold is due for billing in 5 days.',
      courseCode: 'FINANCE',
      courseName: 'Financial Administration',
      actionLabel: 'View Account Ledger',
      daysLeft: 5,
      read: true,
    }
  ]);

  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => alert.id === id ? { ...alert, read: true } : alert));
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 🔔 Header Engine Status Notification Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 text-indigo-400 p-3 rounded-xl border border-slate-800 shadow-sm relative">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 w-3 h-3 rounded-full border-2 border-white animate-ping" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Active Smart Feed</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              You have <strong className="text-indigo-600">{unreadCount} unread automated reminders</strong> tailored to your schedule.
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 px-4 py-2 rounded-xl transition duration-150"
          >
            Mark All as Clear
          </button>
        )}
      </div>

      {/* 📋 Chronological Notification Event Stack */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const isAi = alert.type === 'ai-warning';
          
          return (
            <div 
              key={alert.id}
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all duration-200 flex flex-col md:flex-row items-start justify-between gap-4 relative overflow-hidden ${
                alert.read ? 'opacity-65 border-slate-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Highlight bar flag for unread AI notifications */}
              {!alert.read && (
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isAi ? 'bg-indigo-600' : 'bg-amber-500'}`} />
              )}

              <div className="flex gap-4 items-start flex-1 pl-1">
                {/* Dynamic Left Icon Assignment */}
                <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                  isAi 
                    ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                    : 'bg-amber-50 border-amber-100 text-amber-600'
                }`}>
                  {isAi ? <Sparkles size={18} /> : <AlertCircle size={18} />}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">{alert.title}</h4>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {alert.courseCode}
                    </span>
                    
                    {/* Urgency tag pills */}
                    {!alert.read && alert.daysLeft <= 3 && (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-rose-50 border border-rose-100 text-rose-600 px-1.5 py-0.5 rounded animate-pulse">
                        {alert.daysLeft === 0 ? 'Urgent Today' : `${alert.daysLeft} Days Remaining`}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{alert.message}</p>
                  <p className="text-[11px] font-medium text-slate-400">Context Scope: {alert.courseName}</p>
                </div>
              </div>

              {/* Action Buttons Layer */}
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 shrink-0 gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={12} />
                  <span>Time-Trigger Alert</span>
                </div>

                <div className="flex gap-2 w-full md:w-auto justify-end">
                  {!alert.read && (
                    <button
                      onClick={() => markAsRead(alert.id)}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl border border-transparent hover:border-emerald-100 transition"
                      title="Dismiss Alert"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  )}
                  <button className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] px-3.5 py-2 rounded-xl border border-transparent shadow-sm transition">
                    <span>{alert.actionLabel}</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default SmartAlerts;
