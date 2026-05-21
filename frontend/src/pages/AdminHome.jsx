
const AdminHome = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
            <p className="text-slate-600 mb-6">
                From here, you can manage students, courses, and view attendance records. Use the sidebar to navigate through different sections of the admin panel.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Manage Students</h3>
                    <p className="text-slate-500 text-sm">Add, edit, or remove student records and view their academic progress.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Manage Courses</h3>
                    <p className="text-slate-500 text-sm">Create and organize courses, assign teachers, and set prerequisites.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">View Attendance</h3>
                    <p className="text-slate-500 text-sm">Monitor student attendance records and generate reports for analysis.</p>
                </div>
            </div>
        </div>
    );

}

export default AdminHome;