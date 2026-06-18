import React, { useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { createCourse, getCourseById,updateCourse} from '../../../services/api';
import {
    ArrowLeft,
    Save,
    BookOpen,
    Building2,
    Award,
    Layers
} from 'lucide-react';

const CourseForm = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(courseId);
    
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        courseCode: '',
        title: '',
        description: '',
        teacherId: ''
    });

    useEffect(() => {
        if(!isEditMode) {
            setLoading(false);
            return;
        }
        // if (isEditMode) {
        const fetchCourse = async () => {
            try {
                const course = await getCourseById(courseId);
                setFormData(course.data);
            } catch (error) {
                console.error(error);
            }finally{
                setLoading(false);
            }
        };

        fetchCourse();
        // }
    }, [isEditMode, courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                await updateCourse(courseId, formData);
            } else {
                await createCourse(formData);
            }

            navigate('/admin/course-management');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {loading ? (

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center gap-3 text-slate-500">
                            <span className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></span>
                            Loading course...
                        </div>
                    </div>
                </div>

            ) : (

                <>
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/admin/course-management')}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
                    >
                        <ArrowLeft size={16} />
                        Back to Courses
                    </button>

                    {/* Page Header */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Course Management
                        </p>

                        <h1 className="text-3xl font-bold text-slate-800 mt-2">
                            {isEditMode ? 'Edit Course' : 'Create New Course'}
                        </h1>

                        <p className="text-slate-500 mt-2">
                            {isEditMode
                                ? 'Update course information'
                                : 'Add a new course to the academic catalog.'}
                        </p>
                    </div>

                    {/* Form Card */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8"
                    >

                        {/* Course Code */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <BookOpen size={16} />
                                Course Code
                            </label>

                            <input
                                type="text"
                                name="courseCode"
                                value={formData.courseCode}
                                onChange={handleChange}
                                placeholder="CRS-101"
                                required
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Course Title */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <BookOpen size={16} />
                                Course Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enterprise Java & Spring Boot"
                                required
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                Course Description
                            </label>

                            <textarea
                                rows="5"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the course objectives, technologies covered, and learning outcomes..."
                                required
                                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">

                            <button
                                type="button"
                                onClick={() => navigate('/admin/course-management')}
                                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
                            >
                                <Save size={16} />
                                {isEditMode ? 'Update Course' : 'Create Course'}
                            </button>

                        </div>

                    </form>
                </>

            )}

        </div>
    );
};

export default CourseForm;