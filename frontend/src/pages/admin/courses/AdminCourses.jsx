import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../../../services/api';
import {
    Plus,
    Search,
    BookMarked,
    Award,
    ArrowRight
} from 'lucide-react';

const AdminCourses = () => {
    const navigate = useNavigate();
    

    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const {data} = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // // Mock data (replace with API later)
    // const [courses] = useState([
    //     {
    //         id: 'CRS-101',
    //         title: 'Enterprise Java & Spring Boot',
    //         dept: 'Backend Engineering',
    //         modules: 12,
    //         level: 'Advanced'
    //     },
    //     {
    //         id: 'CRS-102',
    //         title: 'Full-Stack React & Tailwind',
    //         dept: 'Frontend Engineering',
    //         modules: 8,
    //         level: 'Intermediate'
    //     },
    //     {
    //         id: 'CRS-103',
    //         title: 'Cloud Architecture & DevOps',
    //         dept: 'Systems Infrastructure',
    //         modules: 10,
    //         level: 'Advanced'
    //     }
    // ]);

    const filteredCourses = courses.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id?.toString().includes(searchTerm)
    );

    return (
        <div className="space-y-8">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Course Management
                    </p>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Academic Catalog
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Create, organize, and manage courses across the platform.
                    </p>
                </div>

                <button
                    onClick={() => navigate('/admin/course-management/new')}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition"
                >
                    <Plus size={16} />
                    New Course
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md bg-white rounded-xl border border-slate-200 shadow-sm">
                <Search
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-3 text-sm focus:outline-none"
                />
            </div>

            {/* Section Header */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <BookMarked size={14} />
                    Course Catalog
                </h3>
            </div>
            {/* Course Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {loading ? (
                    <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-10 text-center">
                        <p className="text-slate-500">Loading courses...</p>
                    </div>
                ) : filteredCourses.length > 0 ? (

                    filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            onClick={() =>
                                navigate(`/admin/course-management/${course.id}`)
                            }
                            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:border-indigo-200 hover:shadow-md transition"
                        >
                            <div className="flex items-start justify-between gap-4">

                                <div className="space-y-2">

                                    <span className="inline-flex text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase">
                                        {course.department}
                                    </span>

                                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition">
                                        {course.title}
                                    </h4>

                                    <p className="text-xs text-slate-400 font-mono">
                                        {course.courseCode}
                                    </p>

                                </div>

                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
                                    <Award size={14} />
                                    {course.level}
                                </span>

                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">

                                <span className="text-sm text-slate-500">
                                    {course.moduleCount} Modules
                                </span>

                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                                    View Details
                                    <ArrowRight
                                        size={16}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </span>

                            </div>
                        </div>
                    ))

                ) : (

                    <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-10 text-center">
                        <h3 className="font-semibold text-slate-700">
                            No Courses Found
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                            Try adjusting your search criteria or create a new course.
                        </p>
                    </div>

                )}

            </div>
                
        </div>
    );
};

export default AdminCourses;