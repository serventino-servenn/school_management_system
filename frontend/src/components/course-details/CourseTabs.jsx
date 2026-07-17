import { BookOpen, Users, UserCog, Settings } from "lucide-react";

const tabs = [
    {
        id: "students",
        label: "Students",
        icon: Users,
    },
    {
        id: "instructor",
        label: "Instructor",
        icon: UserCog,
    },
    {
        id: "overview",
        label: "Overview",
        icon: BookOpen,
    },
    {
        id: "settings",
        label: "Settings",
        icon: Settings,
    },
];

export default function CourseTabs({ activeTab, onChange }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-wrap gap-2 p-2">

                {tabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all
                                ${
                                    activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow"
                                        : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    );
                })}

            </div>

        </div>
    );
}