import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Circle,
    Users,
    UserCog,
    Pencil,
} from "lucide-react";

export default function CourseHeader({
        course,
        onBack,
        // onEdit,
        onAssignInstructor,
        onAddStudents,
        // onEnrollStudents,
}) { 
    const hasInstructor = !! course.teacherId;
    const studentCount = course?.students?.length ?? 0;
    
    // console.log("course:", course);
    // console.log("teacherId:", course.teacherId);
    // console.log("keys:", Object.keys(course));

    return (
        <div className="space-y-6">

            {/* Back */}
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft size={18} />
                Back to Courses
            </button>

            {/* Header */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="p-8">

                    {/* Top */}
                    <div className="flex flex-col lg:flex-row justify-between gap-8">

                        {/* Course Info */}
                        <div className="flex-1">

                            <div className="flex items-center gap-4">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                                    <BookOpen
                                        className="text-blue-600"
                                        size={30}
                                    />
                                </div>

                                <div>

                                    <h1 className="text-3xl font-bold text-slate-900">
                                        {course.title}
                                    </h1>

                                    <p className="mt-1 text-slate-500">
                                        {course.courseCode}
                                    </p>

                                </div>

                            </div>

                            <p className="mt-6 max-w-3xl leading-relaxed text-slate-600">
                                {course.description}
                            </p>

                        </div>

                        {/* Quick Stats */}
                        <div className="w-full lg:w-80 rounded-xl border border-slate-200 bg-slate-50 p-6">

                            <h3 className="font-semibold text-slate-900">
                                Course Summary
                            </h3>

                            <div className="mt-5 space-y-5">

                                {/* Instructor */}
                                <div>
                                    <p className="text-sm text-slate-500">
                                        Instructor
                                    </p>

                                    <p className="font-medium text-slate-900">
                                        {hasInstructor
                                            ? course.teacherName
                                            : "No instructor assigned"}
                                    </p>
                                </div>

                                {/* Students */}
                                <div>

                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Students
                                    </p>

                                    <p className="mt-1 font-medium text-slate-900">
                                        {studentCount} enrolled
                                    </p>

                                </div>

                                {/* Created */}
                                <div>

                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Created
                                    </p>

                                    <p className="mt-1 text-slate-700">
                                        {course.createdAt}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Setup Progress */}
                    <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-6">

                        <h3 className="font-semibold text-slate-900">
                            Course Setup Progress
                        </h3>

                        <p className="mt-1 text-sm text-slate-600">
                            Complete the remaining steps before this course is ready.
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">

                            {/* Step 1 */}
                            <div className="flex items-center gap-3">

                                <CheckCircle2
                                    size={22}
                                    className="text-emerald-500"
                                />

                                <div>
                                    <p className="font-medium">
                                        Course Created
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        Completed
                                    </p>
                                </div>

                            </div>

                            {/* Step 2 */}
                            <div className="flex items-center gap-3">

                                {hasInstructor ? (
                                    <CheckCircle2
                                        size={22}
                                        className="text-emerald-500"
                                    />
                                ) : (
                                    <Circle
                                        size={22}
                                        className="text-slate-400"
                                    />
                                )}

                                <div>

                                    <p className="font-medium">
                                        Assign Instructor
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {hasInstructor
                                            ? "Completed"
                                            : "Pending"}
                                    </p>

                                </div>

                            </div>

                            {/* Step 3 */}
                            <div className="flex items-center gap-3">

                                {studentCount > 0 ? (
                                    <CheckCircle2
                                        size={22}
                                        className="text-emerald-500"
                                    />
                                ) : (
                                    <Circle
                                        size={22}
                                        className="text-slate-400"
                                    />
                                )}

                                <div>

                                    <p className="font-medium">
                                        Enroll Students
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {studentCount > 0
                                            ? "Completed"
                                            : "Pending"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 flex flex-wrap gap-3">

                        <button
                            // onClick={onEdit}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                        >
                            <Pencil size={18} />
                            Edit Course
                        </button>

                        <button
                            onClick={onAssignInstructor}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-slate-700 hover:bg-slate-50"
                        >
                            <UserCog size={18} />
                            {hasInstructor
                                ? "Change Instructor"
                                : "Assign Instructor"}
                        </button>

                        <button
                            onClick={onAddStudents}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-slate-700 hover:bg-slate-50"
                        >
                            <Users size={18} />
                            Enroll Students
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}