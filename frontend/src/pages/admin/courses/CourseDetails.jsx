import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '../../../services/api';
import {
    ArrowLeft,
    BookOpen,
    UserCheck,
    GraduationCap,
    Users,
    Pencil,
    Plus,
    Award,
    Building2
} from 'lucide-react';

const CourseDetails = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId);
                setCourse(response);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [courseId]);

    // // Mock Course Data
    // const [course] = useState({
    //     id: courseId,
    //     title: 'Enterprise Java & Spring Boot',
    //     department: 'Backend Engineering',
    //     level: 'Advanced',
    //     modules: 12,
    //     description:
    //         'Comprehensive training in Java enterprise development, Spring Boot, REST APIs, security, testing, and deployment.'
    // });



    // // Mock Instructor
    // const [instructor] = useState({
    //     id: 1,
    //     name: 'Dr. Angela Yu',
    //     email: 'angela@example.com'
    // });

    // // Mock Students
    // const [students] = useState([
    //     {
    //         id: 1,
    //         name: 'John Doe',
    //         email: 'john@example.com'
    //     },
    //     {
    //         id: 2,
    //         name: 'Jane Smith',
    //         email: 'jane@example.com'
    //     },
    //     {
    //         id: 3,
    //         name: 'Michael Brown',
    //         email: 'michael@example.com'
    //     }
    // ]);

    return (
        <div className="space-y-8">

            {/* Back Button */}
            <button
                onClick={() => navigate('/admin/course-management')}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
            >
                <ArrowLeft size={16} />
                Back to Courses
            </button>

            {/* Course Header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Course Details
                        </p>

                        <h1 className="text-3xl font-bold text-slate-800 mt-2">
                            {course.title}
                        </h1>

                        <p className="text-slate-500 mt-3 max-w-3xl">
                            {course.description}
                        </p>
                    </div>

                    <button
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
                    >
                        <Pencil size={16} />
                        Edit Course
                    </button>

                </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Building2 className="text-indigo-600" size={20} />
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-semibold">
                                Department
                            </p>
                            <p className="font-semibold text-slate-800">
                                {course.department}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Award className="text-amber-500" size={20} />
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-semibold">
                                Level
                            </p>
                            <p className="font-semibold text-slate-800">
                                {course.level}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3">
                        <BookOpen className="text-emerald-600" size={20} />
                        <div>
                            <p className="text-xs uppercase text-slate-400 font-semibold">
                                Modules
                            </p>
                            <p className="font-semibold text-slate-800">
                                {course.modules}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Main Management Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Instructor Section */}
                <div className="xl:col-span-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                <UserCheck size={18} />
                                Instructor
                            </h2>

                            <button
                                className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
                            >
                                Change
                            </button>
                        </div>

                        {course.teacherId ? (
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">

                                <h3 className="font-semibold text-slate-800">
                                    {course.teacherName}
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Assigned Instructor
                                </p>

                            </div>
                        ) : (
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">

                                <h3 className="font-semibold text-amber-800">
                                    No Instructor Assigned
                                </h3>

                                <p className="text-sm text-amber-600 mt-1">
                                    Assign an instructor to this course.
                                </p>

                            </div>
                        )}

                    </div>
                </div>

                {/* Students Section */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                <GraduationCap size={18} />
                                Enrolled Students
                            </h2>

                            <button
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
                            >
                                <Plus size={14} />
                                Add Student
                            </button>
                        </div>

                        {course.students?.length > 0 ? (
                             <div className="space-y-3">

                                {course.students.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-100 p-2 rounded-lg">
                                                <Users size={16} />
                                            </div>

                                            <div>
                                                <p className="font-medium text-slate-800">
                                                    {student.name}
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    {student.email}
                                                </p>
                                            </div>
                                        </div>

                                        <button className="text-sm text-red-500 hover:text-red-600 font-medium">
                                            Remove
                                        </button>
                                    </div>
                                ))}

                            </div>
                        ) : (
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-center">
                                <p className="font-medium text-slate-700">
                                    No Students Enrolled
                                </p>

                                <p className="text-sm text-slate-500 mt-1">
                                    Add students to begin tracking attendance and grades.
                                </p>
                            </div>
                        )}

                    </div>
                </div>

            </div>

        </div>
    );
};

export default CourseDetails;