import { TrendingUp } from "lucide-react";

export default function EnrollmentTrendCard() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                        Enrollment Trend
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Student enrollment growth over time.
                    </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <TrendingUp
                        size={24}
                        className="text-emerald-600"
                    />
                </div>

            </div>

            {/* Chart Placeholder */}
            <div className="mt-8 flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">

                <div className="text-center">

                    <TrendingUp
                        size={42}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-lg font-semibold text-slate-700">
                        Enrollment Trend Chart
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Monthly enrollment data will appear here.
                    </p>

                </div>

            </div>

        </section>
    );
}