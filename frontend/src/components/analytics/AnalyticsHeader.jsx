import { BarChart3, CalendarDays, Download } from "lucide-react";
import { useState } from "react";

export default function AnalyticsHeader() {
    const [timeRange, setTimeRange] = useState("30d");
    return (
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

            {/* Left */}
            <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                    <BarChart3
                        size={28}
                        className="text-blue-600"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Analytics
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Monitor school performance, enrollment trends, teacher
                        workload, and key academic insights.
                    </p>
                </div>

            </div>

            {/* Right (Future Actions) */}
            <div className="flex flex-wrap items-center gap-3">

                {/* Time Range */}
                <div className="relative">

                    <CalendarDays
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-10 text-sm font-medium text-slate-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="3m">Last 3 Months</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="1y">Last Year</option>
                        <option value="all">All Time</option>
                    </select>

                </div>

                {/* Export */}

                <button
                    disabled
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-400 transition"
                >
                    <Download size={16} />
                    Export Report
                </button>

            </div>

        </div>
    );
}