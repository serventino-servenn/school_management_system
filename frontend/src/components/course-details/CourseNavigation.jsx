import { Users, UserCog } from "lucide-react";

export default function CourseNavigation({
    activeSection,
    onSectionChange,
    studentCount = 0,
    hasInstructor = false,
}) {
    const navigationItems = [
        {
            id: "students",
            label: "Students",
            icon: Users,
            badge: studentCount,
        },
        {
            id: "instructor",
            label: "Instructor",
            icon: UserCog,
            badge: hasInstructor ? "Assigned" : "Pending",
        },
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center p-2 gap-2">

                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={`flex-1 flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200 ${
                                isActive
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "hover:bg-slate-50 text-slate-700"
                            }`}
                        >
                            <div className="flex items-center gap-3">

                                <div
                                    className={`rounded-lg p-2 ${
                                        isActive
                                            ? "bg-blue-500"
                                            : "bg-slate-100"
                                    }`}
                                >
                                    <Icon
                                        size={18}
                                        className={
                                            isActive
                                                ? "text-white"
                                                : "text-slate-600"
                                        }
                                    />
                                </div>

                                <div className="text-left">

                                    <p className="font-semibold">
                                        {item.label}
                                    </p>

                                    <p
                                        className={`text-xs ${
                                            isActive
                                                ? "text-blue-100"
                                                : "text-slate-500"
                                        }`}
                                    >
                                        {item.id === "students"
                                            ? "Manage enrollments"
                                            : "Manage instructor"}
                                    </p>

                                </div>

                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    isActive
                                        ? "bg-blue-500 text-white"
                                        : "bg-slate-100 text-slate-600"
                                }`}
                            >
                                {item.badge}
                            </span>

                        </button>
                    );
                })}

            </div>

        </div>
    );
}