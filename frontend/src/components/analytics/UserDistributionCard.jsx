import { PieChart } from "lucide-react";

export default function UserDistributionCard() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        User Distribution
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Breakdown of students, teachers, and administrators.
                    </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                    <PieChart
                        size={24}
                        className="text-violet-600"
                    />
                </div>

            </div>

            {/* Placeholder */}
            <div className="mt-6 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">

                <div className="text-center">

                    <PieChart
                        size={40}
                        className="mx-auto text-slate-300"
                    />

                    <h3 className="mt-4 text-lg font-semibold text-slate-700">
                        User Distribution
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        A pie chart will show the percentage of each user role.
                    </p>

                </div>

            </div>

        </section>
    );
}