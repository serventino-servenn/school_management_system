 

 export default function CourseInstructor({ course }) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="text-xl font-semibold">
                Instructor
            </h2>

            <p className="mt-2 text-slate-500">
                {course.teacherId
                    ? course.teacherName
                    : "No instructor assigned"}
            </p>

        </div>
    );
 }