import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

export default function EnrollmentTrendChart({ data }) {

    return (
        <ResponsiveContainer
            width="100%"
            height={320}
        >
            <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 10
                }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                />

                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                />

                <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="enrollmentCount"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}