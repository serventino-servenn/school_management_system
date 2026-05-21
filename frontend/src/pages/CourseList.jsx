const CourseList = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Course Management</h2>
            <p className="text-slate-600 mb-6">
                Here you can view and manage all courses offered at the university. Create new courses, assign teachers, and set prerequisites to ensure a smooth academic experience for students.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Course List</h3>
                    <p className="text-slate-500 text-sm">Browse through all available courses, view details, and manage course information.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition"> 
                    <h3 className="text-xl font-semibold mb-2">Create New Course</h3>
                    <p className="text-slate-500 text-sm">Add new courses to the curriculum, set course codes, and define prerequisites.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Assign Teachers</h3>
                    <p className="text-slate-500 text-sm">Assign teachers to courses and manage their teaching schedules.</p>
                </div>
            </div>
        </div>
    );

}

export default CourseList;