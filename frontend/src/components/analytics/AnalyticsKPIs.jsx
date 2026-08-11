import {
    GraduationCap,
    Users,
    BookOpen,
    UserCheck,
    TrendingUp,
    TrendingDown,
} from "lucide-react";


export default function AnalyticsKPIs({stats}) {
    const kpis = [
        {
            title: "Students",
            value: stats?.totalStudents?.total ?? 0,
            change: stats?.totalStudents?.change,
            positive: true,
            icon: GraduationCap,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Teachers",
            value: stats?.totalTeachers?.total ?? 0,
            change: stats?.totalTeachers?.change,
            positive: true,
            icon: Users,
            color: "bg-emerald-100 text-emerald-600",
        },
        {
            title: "Courses",
            value: stats?.totalCourses?.total ?? 0,
            change: stats?.totalCourses?.change,
            positive: true,
            icon: BookOpen,
            color: "bg-amber-100 text-amber-600",
        },
        {
            title: "Enrollments",
            value: stats?.totalEnrollments?.total ?? 0,
            change: stats?.totalEnrollments?.change,
            positive: true,
            icon: UserCheck,
            color: "bg-violet-100 text-violet-600",
        },
   ];

    return (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {kpis.map((kpi) => {
                const Icon = kpi.icon;

                return (
                    <div
                        key={kpi.title}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    {kpi.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                    {kpi.value}
                                </h2>

                                <div className="mt-4 flex items-center gap-2">

                                    {kpi.positive ? (
                                        <TrendingUp
                                            size={16}
                                            className="text-emerald-600"
                                        />
                                    ) : (
                                        <TrendingDown
                                            size={16}
                                            className="text-red-500"
                                        />
                                    )}

                                    <span
                                        className={`text-sm font-semibold ${
                                            kpi.positive
                                                ? "text-emerald-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {kpi.change ?? "--"}
                                    </span>

                                    <span className="text-sm text-slate-400">
                                        {kpi.change ? "vs last month" : "Current total"}
                                    </span>

                                </div>
                            </div>

                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${kpi.color}`}
                            >
                                <Icon size={28} />
                            </div>

                        </div>
                    </div>
                );
            })}

        </section>
    );
}