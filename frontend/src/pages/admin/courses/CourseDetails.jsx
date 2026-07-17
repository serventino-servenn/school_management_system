// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//     ArrowLeft,
//     BookOpen,
//     UserCheck,
//     GraduationCap,
//     Users,
//     Pencil,
//     Plus,
//     Award,
//     Building2,
//     Trash2
// } from 'lucide-react';

// import { getCourseById,deleteCourse } from '../../../services/api';
// import CourseTabs from '../../../components/course-details/CourseTaps';

// const CourseDetails = () => {
//     const navigate = useNavigate();
//     const { courseId } = useParams();

//     const [course, setCourse] = useState(null);
//     const [isLoading, setLoading] = useState(true);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [activeTab, setActiveTab] = useState("students");
//     const [isDeleting, setIsDeleting] = useState(false);
//     // const [loading, setLoading] = useState(true);

//     // useEffect(() => {
//     //     const fetchCourse = async () => {
//     //         console.log('Fetching course details for ID:', courseId);
//     //         try {
//     //              setLoading(true);
//     //             const response = await getCourseById(courseId);
//     //             setCourse(response.data);
                
//     //         } catch (error) {
//     //             console.error('Error fetching course:', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchCourse();
//     // }, [courseId]);

//     const fetchCourse = async () => {
//         try {
//             setLoading(true);

//             const { data } = await getCourseById(id);

//             setCourse(data);

//         } catch (error) {
//             console.error("Failed to fetch course", error);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     useEffect(() => {
//         fetchCourse();
//     }, [id]);



//     const handleDelete = async () => {
//             try {
//                 setIsDeleting(true);
//                 await deleteCourse(course.id);
//                 navigate('/admin/course-management');
//             } catch (error) {
//                 console.error('Error deleting course:', error);
//             } finally {
//                 setIsDeleting(false);
//             }
//     };  

//      return (
//             <div className="space-y-8">

//                 {/* Back Button */}
//                 <button
//                     onClick={() => navigate('/admin/course-management')}
//                     className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
//                 >
//                     <ArrowLeft size={16} />
//                     Back to Courses
//                 </button>

//                 {isLoading ? (
//                     /* 🔄 Loading State */
//                     <div className="flex items-center justify-center h-64">
//                         <div className="text-slate-500 text-sm flex items-center gap-2">
//                             <span className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></span>
//                             Loading course details...
//                         </div>
//                     </div>
//                 ) : (
//                     /* 📘 Main Content */
//                     <>
//                         {/* Course Header */}
//                         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//                             <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

//                                 <div>
//                                     <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//                                         Course Details
//                                     </p>

//                                     <h1 className="text-3xl font-bold text-slate-800 mt-2">
//                                         {course.title}
//                                     </h1>

//                                     <p className="text-slate-500 mt-3 max-w-3xl">
//                                         {course.description}
//                                     </p>
//                                 </div>
//                                 <div className="flex gap-3">
//                                     <button
//                                         onClick={() => navigate(`/admin/course-management/${course.id}/edit`)}
//                                         className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
//                                     >
//                                         <Pencil size={16} />
//                                         Edit Course
//                                     </button>
//                                     <button
//                                         onClick={() => setShowDeleteModal(true)}
//                                         className="inline-flex items-center gap-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium transition"
//                                     >
//                                         <Trash2 size={16} />
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Course Stats */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//                             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
//                                 <div className="flex items-center gap-3">
//                                     <Building2 className="text-indigo-600" size={20} />
//                                     <div>
//                                         <p className="text-xs uppercase text-slate-400 font-semibold">
//                                             Department
//                                         </p>
//                                         <p className="font-semibold text-slate-800">
//                                             {course.department}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
//                                 <div className="flex items-center gap-3">
//                                     <Award className="text-amber-500" size={20} />
//                                     <div>
//                                         <p className="text-xs uppercase text-slate-400 font-semibold">
//                                             Level
//                                         </p>
//                                         <p className="font-semibold text-slate-800">
//                                             {course.level}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
//                                 <div className="flex items-center gap-3">
//                                     <BookOpen className="text-emerald-600" size={20} />
//                                     <div>
//                                         <p className="text-xs uppercase text-slate-400 font-semibold">
//                                             Modules
//                                         </p>
//                                         <p className="font-semibold text-slate-800">
//                                             {course.modules}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>

//                         {/* Main Management Area */}
//                         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

//                             {/* Instructor Section */}
//                             <div className="xl:col-span-1">
//                                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

//                                     <div className="flex items-center justify-between mb-5">
//                                         <h2 className="font-bold text-slate-800 flex items-center gap-2">
//                                             <UserCheck size={18} />
//                                             Instructor
//                                         </h2>

//                                         <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
//                                             Change
//                                         </button>
//                                     </div>

//                                     {course.teacherId ? (
//                                         <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
//                                             <h3 className="font-semibold text-slate-800">
//                                                 {course.teacherName}
//                                             </h3>

//                                             <p className="text-sm text-slate-500 mt-1">
//                                                 Assigned Instructor
//                                             </p>
//                                         </div>
//                                     ) : (
//                                         <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
//                                             <h3 className="font-semibold text-amber-800">
//                                                 No Instructor Assigned
//                                             </h3>

//                                             <p className="text-sm text-amber-600 mt-1">
//                                                 Assign an instructor to this course.
//                                             </p>
//                                         </div>
//                                     )}

//                                 </div>
//                             </div>

//                             {/* Students Section */}
//                             <div className="xl:col-span-2">
//                                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

//                                     <div className="flex items-center justify-between mb-5">
//                                         <h2 className="font-bold text-slate-800 flex items-center gap-2">
//                                             <GraduationCap size={18} />
//                                             Enrolled Students
//                                         </h2>

//                                         <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium">
//                                             <Plus size={14} />
//                                             Add Student
//                                         </button>
//                                     </div>

//                                     {course.students?.length > 0 ? (
//                                         <div className="space-y-3">
//                                             {course.students.map((student) => (
//                                                 <div
//                                                     key={student.id}
//                                                     className="flex items-center justify-between border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition"
//                                                 >
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="bg-slate-100 p-2 rounded-lg">
//                                                             <Users size={16} />
//                                                         </div>

//                                                         <div>
//                                                             <p className="font-medium text-slate-800">
//                                                                 {student.name}
//                                                             </p>

//                                                             <p className="text-sm text-slate-500">
//                                                                 {student.email}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     <button className="text-sm text-red-500 hover:text-red-600 font-medium">
//                                                         Remove
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-center">
//                                             <p className="font-medium text-slate-700">
//                                                 No Students Enrolled
//                                             </p>

//                                             <p className="text-sm text-slate-500 mt-1">
//                                                 Add students to begin tracking attendance and grades.
//                                             </p>
//                                         </div>
//                                     )}

//                                 </div>
//                             </div>

//                         </div>
//                     </>
//                 )}

//                 {/* modal for delete confirmation */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//                         <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
//                             <h3 className="font-bold text-slate-800 mb-2">Delete Course</h3>
//                             <p className="text-slate-500 mt-3">
//                                 Are you sure you want to delete this course
//                                 <span className="font-semibold text-slate-800">
//                                     {' '}{course.title}
//                                 </span>
//                                 ?
//                             </p>
//                             <p className="text-sm text-red-500 mt-2">
//                                 This action cannot be undone.
//                             </p>
//                             <div className="flex justify-end gap-3 mt-8">
//                                 <button
//                                     onClick={() => setShowDeleteModal(false)}
//                                     className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleDelete}
//                                     disabled={isDeleting}
//                                     className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
//                                 >
//                                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//     );
// };

// export default CourseDetails;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CourseHeader from "../../../components/course-details/CourseHeader";
import CourseTabs from "../../../components/course-details/CourseTabs";
import CourseStudents from "../../../components/course-details/CourseStudents";
import CourseInstructor from "../../../components/course-details/CourseInstructor";
import CourseOverview from "../../../components/course-details/CourseOverview";
import CourseSettings from "../../../components/course-details/CourseSettings";


import { getCourseById } from "../../../services/api";

export default function CourseDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("students");

    const fetchCourse = async () => {
        try {
            setLoading(true);

            const { data } = await getCourseById(courseId);
            // console.log("Fetched course data:", id);
            setCourse(data);

        } catch (error) {
            console.error("Failed to fetch course", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    const handleEdit = () => {
        console.log("Edit course");
    };

    const handleAssignInstructor = () => {
        console.log("Assign instructor");
    };

    const handleEnrollStudents = () => {
        console.log("Enroll students");
    };

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <p className="text-slate-500">Loading course...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
                <h2 className="text-xl font-semibold text-red-600">
                    Course Not Found
                </h2>

                <p className="mt-2 text-slate-600">
                    The requested course could not be found.
                </p>

                <button
                    onClick={() => navigate("/admin/courses")}
                    className="mt-6 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <CourseHeader
                course={course}
                studentCount={course.studentCount ?? 0}
                onBack={() => navigate("/admin/courses")}
                onEdit={handleEdit}
                onAssignInstructor={handleAssignInstructor}
                onEnrollStudents={handleEnrollStudents}
            />

            <CourseTabs
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {activeTab === "students" && (
                <CourseStudents
                    course={course}
                    onEnrollStudents={handleEnrollStudents}
                />
            )}

            {activeTab === "instructor" && (
                <CourseInstructor
                    course={course}
                    onAssignInstructor={handleAssignInstructor}
                />
            )}

            {activeTab === "overview" && (
                <CourseOverview
                    course={course}
                />
            )}

            {activeTab === "settings" && (
                <CourseSettings
                    course={course}
                />
            )}

        </div>
    );
}