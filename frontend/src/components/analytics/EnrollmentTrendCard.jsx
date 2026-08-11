import { TrendingUp } from "lucide-react";


import EnrollmentTrendChart from "../charts/EnrollmentTrendChart";
export default function EnrollmentTrendCard({ data }) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div>
                <h3 className="text-lg font-semibold text-slate-900">
                    Enrollment Trend
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Student enrollment over the last 6 months.
                </p>
            </div>

            <div className="mt-6">
                <EnrollmentTrendChart data={data} />
            </div>

        </div>
    );
}