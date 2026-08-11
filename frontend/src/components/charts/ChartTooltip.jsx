export default function ChartTooltip({
    active,
    payload
}) {
    if (!active || !payload?.length) {
        return null;
    }

    const course = payload[0].payload;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg">

            <p className="font-semibold text-slate-900">
                {course.courseTitle}
            </p>

            <p className="mt-1 text-sm text-slate-600">
                Students Enrolled

                <span className="ml-2 font-bold text-blue-600">
                    {course.studentCount}
                </span>
            </p>

        </div>
    );
}