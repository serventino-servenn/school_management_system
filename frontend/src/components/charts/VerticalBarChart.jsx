
import ChartTooltip from "./ChartTooltip";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";


const BAR_COLORS = [
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#bfdbfe"
];

export default function VerticalBarChart({
    data,
    dataKey,
    nameKey
}) {
    return (
        <ResponsiveContainer
            width="100%"
            height={260}
        >
            <BarChart
                data={data}
                margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 35
                }}
            >
                <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                />

                <XAxis
                    dataKey="shortTitle"
                    tick={{
                        fontSize: 12,
                        fill: "#475569"
                    }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                />

                <YAxis
                    type="number"
                    tick={{
                        fontSize: 12,
                        fill: "#64748b"
                    }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                />

                <Tooltip
                    content={<ChartTooltip />}
                    cursor={{
                        fill: "#f8fafc"
                    }}
                />

                <Bar
                    dataKey={dataKey}
                    radius={[8, 8, 0, 0]}
                    animationDuration={800}
                    fill="#3b82f6"
                />

            </BarChart>
        </ResponsiveContainer>
    );
}