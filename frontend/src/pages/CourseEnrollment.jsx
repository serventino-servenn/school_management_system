import React, { useState } from 'react';
import { BookOpen, Search, User, Clock, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const CourseEnrollment = () => {
    // Student enrollment limits configuration
    const CREDIT_LIMIT = 15;
    
    // Track currently selected/registered course IDs locally
    const [enrolledIds, setEnrolledIds] = useState([101]); // Mocking Database Systems as already registered
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const availableModules = [
        { id: 101, code: 'CS-304', name: 'Database Systems', credits: 4, schedule: 'Mon/Wed 10:00 AM', instructor: 'Prof. Vance', capacity: 40, enrolled: 40, category: 'Core' },
        { id: 102, code: 'CS-412', name: 'Advanced Java Architecture', credits: 4, schedule: 'Tue/Thu 1:00 PM', instructor: 'Dr. Angela Yu', capacity: 30, enrolled: 18, category: 'Core', prerequisite: 'CS-301 (Java Programming)' },
        { id: 103, code: 'CS-205', name: 'UI/UX Design Engineering', credits: 3, schedule: 'Wed 4:00 PM', instructor: 'Sarah Jenkins', capacity: 25, enrolled: 24, category: 'Elective' },
        { id: 104, code: 'MAT-302', name: 'Linear Algebra & Graphics', credits: 4, schedule: 'Mon/Wed 2:00 PM', instructor: 'Dr. Robert Chen', capacity: 35, enrolled: 31, category: 'Math' },
        { id: 105, code: 'CS-499', name: 'Cloud Native Microservices', credits: 4, schedule: 'Fri 9:00 AM', instructor: 'Alex Newman', capacity: 20, enrolled: 11, category: 'Elective', prerequisite: 'CS-304' },
    ];
        // Calculate current loaded parameters dynamically 
    const currentCredits = availableModules
        .filter(course => enrolledIds.includes(course.id))
        .reduce((sum, course) => sum + course.credits, 0);

    const handleEnroll = (course) => {
        // Portfolio Logic Checks
        if (currentCredits + course.credits > CREDIT_LIMIT) {
        alert(`Enrollment failed: Adding this module exceeds your max semester threshold of ${CREDIT_LIMIT} credits.`);
        return;
        }
        setEnrolledIds([...enrolledIds, course.id]);
    };

    const handleDrop = (courseId) => {
        setEnrolledIds(enrolledIds.filter(id => id !== courseId));
    };
     // Filter pipeline execution
    const filteredCourses = availableModules.filter(course => {
        const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeCategory === 'All' || course.category === activeCategory;
        return matchesSearch && matchesTab;
    });
      return (
            <div className="space-y-8 animate-fadeIn">
            
            {/* ⚠️ Dynamic Credit Threshold Verification Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Registration Status Tracker</h3>
                <p className="text-xs text-slate-400 mt-0.5">Maximum credit ceiling allocation per term: <strong>{CREDIT_LIMIT} Credits</strong></p>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex-1 md:w-48 bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div 
                    className={`h-full transition-all duration-500 ${currentCredits >= 12 ? 'bg-indigo-600' : 'bg-amber-500'}`}
                    style={{ width: `${(currentCredits / CREDIT_LIMIT) * 100}%` }}
                    />
                </div>
                <span className="text-sm font-black text-slate-800 shrink-0">
                    {currentCredits} / {CREDIT_LIMIT} CR
                </span>
                </div>
            </div>

            {/* 🔍 Search and Filtering Controls Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search code or module title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 text-slate-800 placeholder-slate-400 transition shadow-sm"
                />
                </div>

                <div className="flex bg-slate-200/60 p-1 rounded-xl border border-slate-200 gap-1 w-full sm:w-auto">
                {['All', 'Core', 'Elective', 'Math'].map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs font-bold rounded-lg transition ${
                        activeCategory === tab 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                    >
                    {tab}
                    </button>
                ))}
                </div>
            </div>

            {/* 📋 Modules Processing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => {
                const isRegistered = enrolledIds.includes(course.id);
                const isFull = course.enrolled >= course.capacity;

                return (
                    <div 
                    key={course.id} 
                    className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6 transition relative overflow-hidden ${
                        isRegistered ? 'border-indigo-200 ring-1 ring-indigo-50' : 'border-slate-200'
                    }`}
                    >
                    {/* Course Title Information Elements */}
                    <div>
                        <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md border border-slate-200">
                            {course.code}
                            </span>
                            <span className="text-xs font-semibold text-slate-400">{course.credits} Credits</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            course.category === 'Core' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-amber-50 border-amber-100 text-amber-700'
                        }`}>
                            {course.category}
                        </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 tracking-tight mt-3">{course.name}</h4>
                        
                        {/* Meta Matrix */}
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 border-t border-b border-slate-100 py-3 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                            <User size={14} className="text-slate-400" />
                            <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-slate-400" />
                            <span className="truncate">{course.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                                className={`h-full ${isFull ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                            />
                            </div>
                            <span className="shrink-0 font-medium">
                            {course.enrolled}/{course.capacity} seats
                            </span>
                        </div>
                        </div>

                        {/* Prerequisite Warnings */}
                        {course.prerequisite && !isRegistered && (
                        <div className="mt-3 flex items-center gap-2 text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                            <ShieldCheck size={14} className="text-indigo-500 shrink-0" />
                            <span>Requires prerequisite clearance: <strong className="text-slate-700">{course.prerequisite}</strong></span>
                        </div>
                        )}
                    </div>

                    {/* Action Buttons Layer */}
                    <div>
                        {isRegistered ? (
                        <div className="flex gap-2">
                            <div className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-100">
                            <CheckCircle2 size={14} />
                            Enrolled Successfully
                            </div>
                            <button
                            onClick={() => handleDrop(course.id)}
                            className="text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-3 py-2.5 rounded-xl border border-transparent hover:border-rose-100 transition"
                            >
                            Drop
                            </button>
                        </div>
                        ) : (
                        <button
                            onClick={() => handleEnroll(course)}
                            disabled={isFull}
                            className={`w-full text-xs font-bold py-2.5 rounded-xl transition shadow-sm ${
                            isFull 
                                ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-600/10'
                            }`}
                        >
                            {isFull ? 'Module Maximum Capacity Reached' : 'Register for Module'}
                        </button>
                        )}
                    </div>

                    </div>
                );
                })}
            </div>

            </div>
        );

}

export default CourseEnrollment;
