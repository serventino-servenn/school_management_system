import React, { useState } from 'react';
import {
    Plus,
    Search,
    BookMarked,
    Users,
    Award,
    UserCheck,
    GraduationCap,
    Trash2,
    UserPlus
} from 'lucide-react';



const AdminCourses = () => {
    const [searchTerm, setSearchTerm] = useState('');

     // Course List State
    const [courses, setCourses] = useState([
        { id: 'CRS-101', title: 'Enterprise Java & Spring Boot', dept: 'Backend Engineering', modules: 12, level: 'Advanced' },
        { id: 'CRS-102', title: 'Full-Stack React & Tailwind', dept: 'Frontend Engineering', modules: 8, level: 'Intermediate' },
        { id: 'CRS-103', title: 'Cloud Architecture & DevOps', dept: 'Systems Infrastructure', modules: 10, level: 'Advanced' }
    ]);  // Course List State
    // Assignments State (Tying Instructors and Students to Course IDs)
    const [courseAssignments, setCourseAssignments] = useState([
        { courseId: 'CRS-101', instructor: 'Dr. Angela Yu', students: ['John Doe', 'Jane Smith', 'Michael Brown'] },
        { courseId: 'CRS-102', instructor: 'Sarah Jenkins', students: ['Emily Davis', 'Chris Wilson'] },
        { courseId: 'CRS-103', instructor: 'David Carter', students: ['Sophia Martinez', 'James Walker', 'Olivia Johnson'] }
    ]);

    // Selected Course Tracking
    const [selectedCourseId, setSelectedCourseId] = useState('CRS-101');

    // const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    // Input States for Actions
    const [newStudentName, setNewStudentName] = useState('');
    const [newInstructorName, setNewInstructorName] = useState('');
    
     // Derived states based on selected ID
    const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
    const currentAssignment = courseAssignments.find(a => a.courseId === selectedCourseId);

     // 1. Action: Add New Course
    const handleAddCourse = () => {
        const nextId = `CRS-${101 + courses.length}`;
        const newCourse = {
            id: nextId,
            title: `New Course ${courses.length + 1}`,
            dept: 'General Engineering',
            modules: 6,
            level: 'Beginner'
        };
        
        setCourses([...courses, newCourse]);
        setCourseAssignments([...courseAssignments, {
            courseId: nextId,
            instructor: 'Unassigned',
            students: []
        }]);
        setSelectedCourseId(nextId);
    };

    // const filteredCourses = courses.filter(course =>
    //     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     course.dept.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // const currentAssignment = courseAssignments.find(
    //     assignment => assignment.courseId === selectedCourse?.id
    // );

     // 2. Action: Reassign Teacher
    const handleAssignTeacher = (e) => {
        e.preventDefault();
        if (!newInstructorName.trim()) return;

        setCourseAssignments(courseAssignments.map(assignment => {
            if (assignment.courseId === selectedCourseId) {
                return { ...assignment, instructor: newInstructorName.trim() };
            }
            return assignment;
        }));
        setNewInstructorName('');
    };

    // 3. Action: Enroll Student
    const handleEnrollStudent = (e) => {
        e.preventDefault();
        if (!newStudentName.trim()) return;

        setCourseAssignments(courseAssignments.map(assignment => {
            if (assignment.courseId === selectedCourseId) {
                if (assignment.students.includes(newStudentName.trim())) return assignment;
                return { ...assignment, students: [...assignment.students, newStudentName.trim()] };
            }
            return assignment;
        }));
        setNewStudentName('');
    };

    // Filtering logic
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Helper to count students safely
    const getStudentCount = (courseId) => {
        const assign = courseAssignments.find(a => a.courseId === courseId);
        return assign ? assign.students.length : 0;
    };

    // Helper to find instructor safely
    const getInstructorName = (courseId) => {
        const assign = courseAssignments.find(a => a.courseId === courseId);
        return assign ? assign.instructor : 'Unassigned';
    };
    

    return (
        <div className="space-y-8 p-4 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Course Management
                    </p>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Courses & Assignments
                    </h2>
                </div>

                <button 
                    onClick={handleAddCourse}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition shadow-sm"
                >
                    <Plus size={16} />
                    New Course
                </button>
            </div>
            {/* Search Bar */}
            <div className="relative max-w-md bg-white rounded-xl border border-slate-200 shadow-sm flex items-center">
                <Search className="absolute left-3 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search courses or departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm focus:outline-none placeholder:text-slate-400"
                />
            </div>
            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Course Catalog List */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Section Header */}
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-1">
                        <BookMarked size={14} />
                        Course Catalog ({filteredCourses.length})
                    </h3>

                    {/* Course Grid Cards */}
                    {filteredCourses.map((course) => {
                        // Look up data variations dynamically based on State IDs
                        const assignment = courseAssignments.find(a => a.courseId === course.id);
                        const studentCount = assignment ? assignment.students.length : 0;
                        const instructorName = assignment ? assignment.instructor : 'Unassigned';
                        const isSelected = selectedCourseId === course.id;

                        return (
                            <div
                                key={course.id}
                                onClick={() => setSelectedCourseId(course.id)}
                                className={`cursor-pointer bg-white p-5 rounded-2xl border transition-all duration-200 hover:shadow-md hover:border-slate-300
                                    ${isSelected 
                                        ? 'border-indigo-500 ring-4 ring-indigo-50' 
                                        : 'border-slate-200'
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            
                                        {/* Course Text Details */}
                                        <div className="space-y-1.5">
                                            <span className="inline-flex text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wide">
                                                {course.dept}
                                            </span>
                                
                                            <h4 className="text-base font-bold text-slate-800 leading-snug">
                                                {course.title}
                                            </h4>
                                
                                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                                <span className="text-slate-400 font-normal">Instructor:</span> 
                                                <span className="text-slate-700 font-semibold">{instructorName}</span>
                                            </p>
                                        </div>

                                        {/* Meta Badges */}
                                        <div className="flex sm:flex-col justify-between sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                                                <Award size={14} className="text-slate-400" />
                                                {course.level}
                                            </span>
                                
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50/60 px-2.5 py-1 rounded-lg">
                                                <Users size={14} />
                                                {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
                                            </span>
                                        </div>

                                    </div>
                            </div>
                        );
                    }
                )}

                            {/* Search Empty State Safeguard */}
                            {filteredCourses.length === 0 && (
                                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium">
                                    No courses match your search criteria.
                                </div>
                        )       }
                </div>

            </div> //end of course catalog list
            {/* Course Details Panel */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6 space-y-6">
                
                {selectedCourse ? (
                    <>
                        {/* Panel Header */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                                    {selectedCourse.id}
                                </p>
                                <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                                    {selectedCourse.modules} Modules
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-800 leading-snug">
                                {selectedCourse.title}
                            </h3>
                            
                            <p className="text-sm font-medium text-slate-500 mt-1">
                                {selectedCourse.dept}
                            </p>
                        </div>

                        {/* Instructor Management Card */}
                        <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-3">
                            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
                                <UserCheck size={16} className="text-indigo-600" />
                                Assigned Instructor
                            </div>
                            
                            <p className="text-base font-bold text-slate-800 pl-6">
                                {currentAssignment?.instructor || 'Unassigned'}
                            </p>
                            
                            {/* Instructor Change Form */}
                            <form onSubmit={handleAssignTeacher} className="flex gap-2 pl-6 pt-1">
                                <input
                                    type="text"
                                    placeholder="Reassign teacher name..."
                                    value={newInstructorName}
                                    onChange={(e) => setNewInstructorName(e.target.value)}
                                    className="w-full bg-white border border-slate-200 text-xs px-3 py-2 rounded-lg outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 placeholder:text-slate-400"
                                />
                                <button 
                                    type="submit"
                                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shrink-0 active:scale-95"
                                >
                                    Assign
                                </button>
                            </form>
                        </div>

                        {/* Student Enrollment Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-slate-700 font-bold text-xs uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <GraduationCap size={16} className="text-indigo-600" />
                                    Enrolled Students
                                </div>
                                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                    {currentAssignment?.students.length || 0}
                                </span>
                            </div>

                            {/* Quick Student Enrollment Form */}
                            <form onSubmit={handleEnrollStudent} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter full name to enroll..."
                                    value={newStudentName}
                                    onChange={(e) => setNewStudentName(e.target.value)}
                                    className="w-full bg-white border border-slate-200 text-xs px-3 py-2.5 rounded-xl outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 placeholder:text-slate-400"
                                />
                                <button 
                                    type="submit"
                                    className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2.5 rounded-xl transition shrink-0 active:scale-95"
                                >
                                    <UserPlus size={14} />
                                    Enroll
                                </button>
                            </form>

                            {/* Scrollable Student List View */}
                            <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white shadow-inner">
                                {currentAssignment?.students && currentAssignment.students.length > 0 ? (
                                    currentAssignment.students.map((student, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 group hover:bg-slate-50/70 transition-colors">
                                            <span className="text-sm font-medium text-slate-700">
                                                {student}
                                            </span>
                                            
                                            {/* Action: Unenroll student button */}
                                            <button
                                                type="button"
                                                onClick={() => handleUnenrollStudent(student)}
                                                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition p-1 rounded hover:bg-red-50"
                                                title={`Unenroll ${student}`}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-slate-400 text-center py-8">
                                        No students are enrolled in this course yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 text-slate-400 text-sm font-medium">
                        Select a course from the catalog to manage assignments.
                    </div>
                )}
            </div>
        </div>

       </div>
    )       
};

export default AdminCourses;