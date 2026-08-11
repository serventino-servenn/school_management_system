import { BookOpen } from "lucide-react";
import { useEffect } from "react";
import CourseDistributionChart from "../charts/CourseDistributionChart";
 import { getCourseDistribution } from "../../services/api";

export default function CourseDistributionCard({ data }) {

    console.log("Course Distribution Data:", data);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div>
                <h3 className="text-lg font-semibold text-slate-900">
                    Course Distribution
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    How student enrollment is distributed across courses.
                </p>
            </div>

            <div className="mt-4">
                <CourseDistributionChart data={data} />
            </div>

        </div>
    );
}