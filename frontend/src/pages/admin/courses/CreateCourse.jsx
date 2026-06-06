import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    BookOpen,
    Building2,
    Award,
    Layers
} from 'lucide-react';

const CreateCourse = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        department: '',
        level: 'Beginner',
        modules: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Creating course:', formData);

        // TODO:
        // POST /api/courses

        navigate('/admin/course-management');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">

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
                    Create New Course
                </h1>

                <p className="text-slate-500 mt-2">
                    Add a new course to the academic catalog.
                </p>
            </div>

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8"
            >

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

                {/* Department + Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <Building2 size={16} />
                            Department
                        </label>

                        {/* <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Backend Engineering"
                            required
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        /> */}
                        <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                        >
                            <option value="">Select Department</option>
                            <option value="Backend Engineering">Backend Engineering</option>
                            <option value="Frontend Engineering">Frontend Engineering</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="Cloud & DevOps">Cloud & DevOps</option>
                            <option value="Data Science">Data Science</option>
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <Award size={16} />
                            Level
                        </label>

                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                </div>

                {/* Modules */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                        <Layers size={16} />
                        Number of Modules
                    </label>

                    <input
                        type="number"
                        min="1"
                        name="modules"
                        value={formData.modules}
                        onChange={handleChange}
                        placeholder="12"
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
                        Create Course
                    </button>

                </div>

            </form>

        </div>
    );
};

export default CreateCourse;