export default function CourseOverview({ course }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="text-xl font-semibold">
                Course Overview
            </h2>

            <div className="mt-6 space-y-4">

                <div>
                    <p className="text-sm text-slate-500">Course Code</p>
                    <p className="font-medium">{course.courseCode}</p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Title</p>
                    <p className="font-medium">{course.title}</p>
                </div>

                <div>
                    <p className="text-sm text-slate-500">Description</p>
                    <p>{course.description}</p>
                </div>

            </div>

        </div>
    );
}