import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";

const COURSE_COLORS = [
    "#f97316", // orange
    "#14b8a6", // teal
    "#e11d48", // rose
    "#eab308", // yellow
    "#64748b"  // slate - Other
];

export default function CourseDistributionChart({ data }) {

    const topCourses = data.slice(0, 4);

    const otherCount = data
        .slice(4)
        .reduce(
            (total, course) => total + course.studentCount,
            0
        );

    const chartData = topCourses.map((course) => ({
        name: course.courseTitle,
        value: course.studentCount
    }));

    if (otherCount > 0) {
        chartData.push({
            name: "Other",
            value: otherCount
        });
    }

    return (
        <ResponsiveContainer
            width="100%"
            height={280}
        >
            <PieChart>

                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    stroke="none"
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${entry.name}`}
                            fill={
                                COURSE_COLORS[
                                    index % COURSE_COLORS.length
                                ]
                            }
                        />
                    ))}
                </Pie>

                <Tooltip />

            </PieChart>
        </ResponsiveContainer>
    );
}