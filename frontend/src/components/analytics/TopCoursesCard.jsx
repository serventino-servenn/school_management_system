
import { useEffect,useState } from "react";
import { BarChart3 } from "lucide-react";
import VerticalBarChart from "../charts/VerticalBarChart";


export default function TopCoursesCard({ courses }) {

    const chartData = courses.map((course) => {
        const words = course.courseTitle.trim().split(/\s+/);

        const shortTitle =
            words.length >= 2
                ? `${words[0][0]}${words[1][0]}`.toUpperCase()
                : course.courseTitle.slice(0, 2).toUpperCase();

        return {
            ...course,
            shortTitle
        };
    });
    
    return (

        <div className="mt-8">

            <VerticalBarChart
                data={chartData}
                dataKey="studentCount"
                nameKey="shortTitle"
            />

        </div>

        
        // <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        //     {/* Header */}
        //     <div className="flex items-center justify-between">

        //         <div>
        //             <h2 className="text-xl font-semibold text-slate-900">
        //                 Top Performing Courses
        //             </h2>

        //             <p className="mt-1 text-sm text-slate-500">
        //                 Courses ranked by student enrollment.
        //             </p>
        //         </div>

        //         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
        //             <BarChart3
        //                 size={24}
        //                 className="text-blue-600"
        //             />
        //         </div>

        //     </div>


        //     {/* Chart Placeholder */}
        //     <div className="mt-8 flex h-96 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">

        //         <div className="text-center">

        //             <BarChart3
        //                 size={42}
        //                 className="mx-auto text-slate-300"
        //             />

        //             <h3 className="mt-4 text-lg font-semibold text-slate-700">
        //                 Top Courses Chart
        //             </h3>

        //             <p className="mt-2 text-sm text-slate-500">
        //                 A horizontal bar chart will display the most enrolled courses.
        //             </p>

        //         </div>

        //     </div>

        // </section>
    );
}