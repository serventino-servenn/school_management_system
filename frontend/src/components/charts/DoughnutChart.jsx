import UserDistributionTooltip from "./UserDistributionTooltip";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip
} from "recharts";

const ROLE_COLORS = {
    STUDENT: "#2563eb",
    TEACHER: "#10b981",
    ADMIN: "#8b5cf6"
};

export default function DoughnutChart({ data }) {

    const totalUsers = data.reduce(
        (total, item) => total + item.count,
        0
    );

    const chartData = data.map((item) => ({
        ...item,
        fill: ROLE_COLORS[item.role] || "#94a3b8"
    }));

    return (
        <div className="flex flex-col items-center">

            {/* Chart */}
            <div className="relative h-[250px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="role"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={3}
                            stroke="none"
                        />

                        <Tooltip
                            content={<UserDistributionTooltip />}
                        />

                    </PieChart>
                </ResponsiveContainer>

                {/* Center text */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-2xl font-bold text-slate-900">
                        {totalUsers.toLocaleString()}
                    </span>

                    <span className="text-sm text-slate-500">
                        Total Users
                    </span>

                </div>

            </div>

            {/* Legend */}
            <div className="mt-4 grid w-full grid-cols-3 gap-4">

                {data.map((item) => (

                    <div
                        key={item.role}
                        className="flex flex-col items-center"
                    >

                        <div className="flex items-center gap-2">

                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{
                                    backgroundColor:
                                        ROLE_COLORS[item.role] ||
                                        "#94a3b8"
                                }}
                            />

                            <span className="text-sm text-slate-600">
                                {item.role.charAt(0) +
                                    item.role.slice(1).toLowerCase()}
                            </span>

                        </div>

                        <span className="mt-1 font-semibold text-slate-900">
                            {item.count.toLocaleString()}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}