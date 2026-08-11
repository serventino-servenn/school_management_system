
import ChartTooltip from "./ChartTooltip";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";


const COLORS = [
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
    "#bfdbfe"
];

export default function HorizontalBarChart({
    data,
    dataKey,
    nameKey
}) {

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 10,
                    right: 25,
                    left: 45,
                    bottom: 10
                }}
            >

                <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                />

                <XAxis
                    type="number"
                    tick={{ fontSize: 12 }}
                />

                <YAxis
                    type="category"
                    dataKey={nameKey}
                    width={170}
                    tick={{
                        fontSize: 13,
                        fill: "#334155"
                    }}
                />

                <Tooltip
                    content={<ChartTooltip />}
                />

                <Bar
                    dataKey={dataKey}
                    radius={[0, 8, 8, 0]}
                    animationDuration={900}
                >

                    {data.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={
                                COLORS[index % COLORS.length]
                            }
                        />

                    ))}

                </Bar>

            </BarChart>

        </ResponsiveContainer>

    );

}