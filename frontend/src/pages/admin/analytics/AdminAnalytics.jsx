import React from "react";
import { useState, useEffect } from "react";
import AnalyticsHeader from "../../../components/analytics/AnalyticsHeader";
import AnalyticsKPIs from "../../../components/analytics/AnalyticsKPIs";
import CourseDistributionCard from "../../../components/analytics/CourseDistributionCard";
import UserDistributionCard from "../../../components/analytics/UserDistributionCard";
// import TeacherWorkloadCard from "../../../components/analytics/TeacherWorkloadCard";
import TopCoursesCard from "../../../components/analytics/TopCoursesCard";
import EnrollmentTrendCard from "../../../components/analytics/EnrollmentTrendCard";
import { getDashboardStats,getTopCourses,getUserDistribution,getCourseDistribution, getEnrollmentTrends} from "../../../services/api";

export default function AdminAnalytics() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);   
    const [topCourses, setTopCourses] = useState([]);
    const [userDistribution, setUserDistribution] = useState([]);
    const [courseDistribution, setCourseDistribution] = useState([]);
    const [enrollementTrend,setEnrollmentTrend] = useState([])


    const fetchEnrollmentTrend = async() =>{
        try {
            const {data} = await getEnrollmentTrends();
            setEnrollmentTrend(data);
        } catch (error) {
           console.error(
              "Failed to fetch enrollment trend",error
           ) 
        }
    };

     const fetchDashboardStats = async () => {
        try {
            setLoading(true);

            const { data } = await getDashboardStats();

            setStats(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const fetchTopCourses = async () => {
        try {

            const { data } = await getTopCourses();

            setTopCourses(data);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserDistribution = async () => {
        try {

            const { data } = await getUserDistribution();

            setUserDistribution(data);

        } catch (error) {

            console.error(
                "Failed to fetch user distribution",
                error
            );

        }
    };

    const fetchCourseDistribution = async () => {
        try {

            const { data } = await getCourseDistribution();

            setCourseDistribution(data);

        } catch (error) {

            console.error(
                "Failed to fetch course distribution",
                error
            );

        }
    };

     useEffect(() => {
        fetchDashboardStats();
        fetchTopCourses();
        fetchUserDistribution();
        fetchCourseDistribution();
        fetchEnrollmentTrend();
    }, []);



    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl space-y-8">

                <AnalyticsHeader />

                <AnalyticsKPIs stats={stats} />

                {/* Analytics */}
                <section className="space-y-8">

                    <EnrollmentTrendCard data ={enrollementTrend} />

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

                        <CourseDistributionCard data={courseDistribution}/>

                        <UserDistributionCard  data={userDistribution}/>

                    </div>

                    <TopCoursesCard courses={topCourses} />

                </section>

            </div>
        </div>
    );
}