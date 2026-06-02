import React, { useState } from 'react';
import {
    Plus,
    Search,
    BookMarked,
    Users,
    Award,
    UserCheck,
    GraduationCap
} from 'lucide-react';

const AdminCourses = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [courses] = useState([
        {
            id: 'CRS-101',
            title: 'Enterprise Java & Spring Boot',
            dept: 'Backend Engineering',
            modules: 12,
            level: 'Advanced'
        },
        {
            id: 'CRS-102',
            title: 'Full-Stack React & Tailwind',
            dept: 'Frontend Engineering',
            modules: 8,
            level: 'Intermediate'
        },
        {
            id: 'CRS-103',
            title: 'Cloud Architecture & DevOps',
            dept: 'Systems Infrastructure',
            modules: 10,
            level: 'Advanced'
        }
    ]);

    const [courseAssignments] = useState([
        {
            courseId: 'CRS-101',
            instructor: 'Dr. Angela Yu',
            students: [
                'John Doe',
                'Jane Smith',
                'Michael Brown'
            ]
        },
        {
            courseId: 'CRS-102',
            instructor: 'Sarah Jenkins',
            students: [
                'Emily Davis',
                'Chris Wilson'
            ]
        },
        {
            courseId: 'CRS-103',
            instructor: 'David Carter',
            students: [
                'Sophia Martinez',
                'James Walker',
                'Olivia Johnson'
            ]
        }
    ]);

    const [selectedCourse, setSelectedCourse] = useState(courses[0]);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentAssignment = courseAssignments.find(
        assignment => assignment.courseId === selectedCourse?.id
    );

    return (
        <div className="space-y-8">

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

                <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition">
                    <Plus size={16} />
                    New Course
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md bg-white rounded-xl border border-slate-200 shadow-sm">
                <Search
                    className="absolute left-3 top-2.5 text-slate-400"
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-2 text-sm focus:outline-none"
                />
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Course Catalog */}
                <div className="lg:col-span-3 space-y-4">

                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <BookMarked size={14} />
                        Course Catalog
                    </h3>

                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => setSelectedCourse(course)}
                            className={`cursor-pointer bg-white p-5 rounded-2xl border transition shadow-sm
                                ${
                                    selectedCourse?.id === course.id
                                        ? 'border-indigo-300 ring-2 ring-indigo-100'
                                        : 'border-slate-200 hover:border-indigo-200'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <span className="inline-flex text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase">
                                        {course.dept}
                                    </span>

                                    <h4 className="text-base font-bold text-slate-800 mt-2">
                                        {course.title}
                                    </h4>

                                    <p className="text-xs text-slate-400 font-mono mt-1">
                                        {course.id}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
                                        <Award size={14} />
                                        {course.level}
                                    </span>

                                    <p className="text-xs text-slate-400 mt-2">
                                        {course.modules} Modules
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Course Details */}
                <div className="lg:col-span-2">

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6">

                        {selectedCourse ? (
                            <>
                                <div className="mb-6">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Selected Course
                                    </p>

                                    <h3 className="text-xl font-bold text-slate-800 mt-1">
                                        {selectedCourse.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {selectedCourse.dept}
                                    </p>
                                </div>

                                {/* Instructor */}
                                <div className="border rounded-xl p-4 mb-4">

                                    <div className="flex items-center gap-2 mb-3">
                                        <UserCheck
                                            size={16}
                                            className="text-indigo-600"
                                        />

                                        <h4 className="font-semibold text-slate-800">
                                            Assigned Instructor
                                        </h4>
                                    </div>

                                    <p className="text-sm text-slate-700">
                                        {currentAssignment?.instructor ||
                                            'No instructor assigned'}
                                    </p>

                                    <button className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                        Assign Instructor
                                    </button>

                                </div>

                                {/* Students */}
                                <div className="border rounded-xl p-4">

                                    <div className="flex items-center gap-2 mb-3">
                                        <GraduationCap
                                            size={16}
                                            className="text-emerald-600"
                                        />

                                        <h4 className="font-semibold text-slate-800">
                                            Enrolled Students
                                        </h4>
                                    </div>

                                    <div className="space-y-2 mb-4">

                                        {currentAssignment?.students?.length ? (
                                            currentAssignment.students.map(
                                                (student, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 text-sm text-slate-700"
                                                    >
                                                        <Users
                                                            size={14}
                                                            className="text-slate-400"
                                                        />

                                                        {student}
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p className="text-sm text-slate-400">
                                                No students enrolled.
                                            </p>
                                        )}

                                    </div>

                                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                        Add Student
                                    </button>

                                </div>
                            </>
                        ) : (
                            <div className="text-center py-10">
                                <h3 className="font-semibold text-slate-700">
                                    No Course Selected
                                </h3>

                                <p className="text-sm text-slate-500 mt-2">
                                    Select a course to manage instructors and students.
                                </p>
                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminCourses;