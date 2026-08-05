import React from "react";
import AnalyticsHeader from "../../../components/analytics/AnalyticsHeader";
import AnalyticsKPIs from "../../../components/analytics/AnalyticsKPIs";
import CourseDistributionCard from "../../../components/analytics/CourseDistributionCard";
import UserDistributionCard from "../../../components/analytics/UserDistributionCard";
// import TeacherWorkloadCard from "../../../components/analytics/TeacherWorkloadCard";
import TopCoursesCard from "../../../components/analytics/TopCoursesCard";
import EnrollmentTrendCard from "../../../components/analytics/EnrollmentTrendCard";

export default function Analytics() {
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl space-y-8">

                <AnalyticsHeader />

                <AnalyticsKPIs />

                {/* Analytics */}
                <section className="space-y-6">

                    <EnrollmentTrendCard />

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <CourseDistributionCard />
                        <UserDistributionCard />
                    </div>

                    <TopCoursesCard />

                </section>

            </div>
        </div>
    );
}