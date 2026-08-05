import { BookOpen } from "lucide-react";

export default function CourseDistributionCard() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Students per Course
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Compare enrollment across all courses.
                    </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                    <BookOpen
                        size={24}
                        className="text-amber-600"
                    />
                </div>

            </div>

            {/* Placeholder */}
            <div className="mt-6 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">

                <div className="text-center">

                    <BookOpen
                        size={40}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-lg font-semibold text-slate-700">
                        Course Distribution
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        A bar chart will display student enrollment by course.
                    </p>

                </div>

            </div>

        </section>
    );
}