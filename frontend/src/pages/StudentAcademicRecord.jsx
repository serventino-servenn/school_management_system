import React, { useState } from 'react';
import { Award, CheckCircle, AlertCircle, Calendar, FileText, ChevronRight } from 'lucide-react';

const StudentAcademicRecord = () => {
  // Mock academic data matching your exact application requirements
  const academicSummary = {
    gpa: '3.42',
    gpaScale: '4.00',
    totalCredits: '48',
    attendanceRate: '94.5%',
  };

  const courseGrades = [
    { code: 'CS-301', name: 'Java Programming', grade: 55, credits: 4, status: 'Warning', professor: 'Dr. Angela Yu' },
    { code: 'CS-304', name: 'Database Systems', grade: 88, credits: 4, status: 'Good', professor: 'Prof. Marcus Vance' },
    { code: 'CS-208', name: 'Web Development', grade: 92, credits: 3, status: 'Excellent', professor: 'Sarah Jenkins' },
    { code: 'MAT-210', name: 'Discrete Mathematics', grade: 74, credits: 4, status: 'Good', professor: 'Dr. Robert Chen' },
  ];

  const attendanceLog = [
    { date: 'May 28, 2026', course: 'Java Programming', status: 'Present', type: 'Lecture' },
    { date: 'May 26, 2026', course: 'Database Systems', status: 'Present', type: 'Lab' },
    { date: 'May 25, 2026', course: 'Java Programming', status: 'Absent', type: 'Lecture' },
    { date: 'May 22, 2026', course: 'Discrete Mathematics', status: 'Present', type: 'Lecture' },
    { date: 'May 21, 2026', course: 'Web Development', status: 'Present', type: 'Workshop' },
  ];

  // Helper function to return style parameters based on performance percentages
  const getGradeBadgeStyles = (grade) => {
    if (grade >= 90) return 'bg-emerald-50 border-emerald-100 text-emerald-700';
    if (grade >= 70) return 'bg-indigo-50 border-indigo-100 text-indigo-700';
    return 'bg-rose-50 border-rose-100 text-rose-700 animate-pulse';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 📊 High-Level Metric Cards Layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cumulative GPA Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="bg-indigo-50 p-4 rounded-xl text-indigo-600">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cumulative GPA</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1">{academicSummary.gpa}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Scale: {academicSummary.gpaScale}</p>
          </div>
        </div>

        {/* Attendance Rate Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Attendance</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1">{academicSummary.attendanceRate}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-0.5">Above institutional minimum</p>
          </div>
        </div>

        {/* Total Earned Credits Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="bg-slate-50 p-4 rounded-xl text-slate-600">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Credits</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1">{academicSummary.totalCredits}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Academic Standing: Junior</p>
          </div>
        </div>
      </div>

      {/* 📚 Section: Live Semester Grades Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Current Term Modules</h2>
          <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-3 py-1 rounded-full border border-slate-200">
            Spring Semester 2026
          </span>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {courseGrades.map((course) => (
            <div key={course.code} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition duration-200 flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 tracking-wide uppercase">{course.code}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{course.credits} Credits</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">{course.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">Instructor: {course.professor}</p>
                </div>

                <div className={`border text-sm font-black px-3 py-1.5 rounded-xl ${getGradeBadgeStyles(course.grade)}`}>
                  {course.grade}%
                </div>
              </div>

              {/* Proactive portfolio hook highlighting your chatbot logic */}
              {course.grade < 60 && (
                <div className="flex items-center gap-2 bg-rose-50/50 border border-rose-100 p-3 rounded-xl text-xs text-rose-700">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>Grade below threshold. The <strong>AI Study Buddy</strong> has flagged this course for recovery.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🗓️ Section: Attendance History Audit Log */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Attendance History</h2>
            <p className="text-xs text-slate-400 mt-0.5">Chronological record of verified class sign-ins</p>
          </div>
          <FileText size={18} className="text-slate-400" />
        </div>

        <div className="divide-y divide-slate-100">
          {attendanceLog.map((log, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition">
              <div className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full ${log.status === 'Present' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{log.course}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>{log.date}</span>
                    <span>•</span>
                    <span>{log.type}</span>
                  </p>
                </div>
              </div>
              
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                log.status === 'Present' 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-rose-50 border-rose-100 text-rose-700'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default StudentAcademicRecord;