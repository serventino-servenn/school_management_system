export default function CourseStudents({ course, onRemoveStudent}) {
    const studentCount = course?.students?.length ?? 0;
    // console.log("onRemoveStudent function in CourseStudents component:", onRemoveStudent);
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="text-xl font-semibold">
                Students
            </h2>

            <div className="mt-4">
                {course?.students?.length > 0 ? (
                    <div className="space-y-3">
                        {course.students.map((student) => (
                            <div
                                key={student.id}
                                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
                            >
                                <div>
                                    <p className="font-medium text-slate-900">
                                        {student.fullName}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {student.email}
                                    </p>
                                </div>
                                    <button
                                        onClick={() => onRemoveStudent(student)}
                                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        Unenroll
                                    </button>
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500">
                        No students enrolled yet.
                    </p>
                )}
            </div>

        </div>
    );
}