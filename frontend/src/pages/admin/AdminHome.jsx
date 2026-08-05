import React from "react";

import OverviewHeader from "../../components/overview/ OverviewHeader";
import OverviewKPIs from "../../components/overview/ OverviewKPIs";
import SystemHealth from "../../components/overview/SystemHealth";
import RecentActivity from "../../components/overview/RecentActivity";
import QuickActions from "../../components/overview/ QuickActions";

export default function AdminHome() {

    return (
        <div className="min-h-screen bg-slate-50 p-6">

            <div className="mx-auto max-w-7xl space-y-8">

                <OverviewHeader />

                <OverviewKPIs />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    <QuickActions />

                    <SystemHealth />

                </div>

                <RecentActivity />

            </div>

        </div>
    );
}



// import React, { useEffect, useState } from 'react';
// import { Users, BookOpen, CreditCard, Sparkles, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
// import QuickActionCard from '../../components/QuickActionCard';
// import { useNavigate } from 'react-router-dom';
// import { getMetrics,getInsights} from  '../../services/api';
// const AdminHome = () => {
//     const [isAiLoading, setIsAiLoading] = useState(false);
//     const [aiInsight, setAiInsight] = useState(null);
//     const navigate = useNavigate();

//     // Live metrics state management
//     const [metrics, setMetrics] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch live backend metrics on component mount
//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try {
//                 setIsLoading(true);
//                 const response = await getMetrics();
//                 setMetrics(response.data);
//                 // console.log("Fetched dashboard metrics:", response.data);
//             } catch (err) {
//                 console.error("Error fetching admin dashboard metrics:", err);
//                 if (err.response?.status === 403) {
//                     setError("Access denied. Administrator privileges required.");
//                 } else {
//                     setError("Failed to connect to the server. Please try again later.");
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchDashboardData();
//     }, []);

//      // Handle loading and error fallback displays
//     if (isLoading) {
//         return <div className="text-center p-12 text-slate-500 font-medium animate-pulse">Loading dashboard metrics...</div>;
//     }
//     if (error) {
//         return <div className="text-center p-8 text-red-500 bg-red-50 border border-red-100 rounded-2xl m-6">{error}</div>;
//     }

//     const statsConfig = [
//         {
//             label: "Total Students",
//             value: metrics?.totalStudents?.total ?? 0,
//             change: metrics?.totalStudents?.change ?? "No updates",
//             icon: <Users size={22} className="text-blue-600" />,
//             bg: "bg-blue-50",
//             text: "text-emerald-600",
//         },
//         {
//             label: "Total Teachers",
//             value: metrics?.totalTeachers?.total ?? 0,
//             change: metrics?.totalTeachers?.change ?? "No updates",
//             icon: <Users size={22} className="text-emerald-600" />,
//             bg: "bg-emerald-50",
//             text: "text-emerald-600",
//         },
//         {
//             label: "Total Courses",
//             value: metrics?.totalCourses?.total ?? 0,
//             change: metrics?.totalCourses?.change ?? "No updates",
//             icon: <BookOpen size={22} className="text-violet-600" />,
//             bg: "bg-violet-50",
//             text: "text-emerald-600",
//         },
//         {
//             label: "Enrollments",
//             value: metrics?.totalEnrollments?.total ?? 0,
//             change: metrics?.totalEnrollments?.change ?? "No updates",
//             icon: <BookOpen size={22} className="text-amber-600" />,
//             bg: "bg-amber-50",
//             text: "text-emerald-600",
//         }
//     ];

//     // Mock function to simulate the Spring Boot AI backend call
//     const fetchAiInsights = async () => {
//         try {

//             setIsAiLoading(true);

//             const response = await getInsights();
//             setAiInsight(response.data);

//         } catch(error) {
//             console.error(error);
//             setAiInsight(null);
        
//         } finally {
//             setIsAiLoading(false);
//         }
//     };

//     return (
//         <div className="space-y-8">
//             {/* Top Welcome Banner */}
//             <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-2xl text-white shadow-sm relative overflow-hidden">
//                     <div className="relative z-10 max-w-2xl">
//                         <h2 className="text-3xl font-bold mb-2">
//                             Good Morning, Admin.
//                         </h2>

//                         <p className="text-indigo-200 text-sm leading-relaxed">
//                             Here's an overview of today's school activity.
//                         </p>
//                     </div>

//                     <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 pointer-events-none">
//                         <BookOpen size={300} />
//                     </div>
//             </div>

//             {/* Metrics Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {statsConfig.map((stat, idx) => (
//                     <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition">
//                         <div className="space-y-2">
//                             <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
//                             <h3 className="text-3xl font-bold text-slate-800">{stat.value.toLocaleString()}</h3>
//                             <span className={`inline-flex items-center text-xs font-medium ${stat.text}`}>
//                                 <TrendingUp size={14} className="mr-1" /> {stat.change}
//                             </span>
//                         </div>
//                         <div className={`p-4 ${stat.bg} rounded-xl`}>
//                             {stat.icon}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* AI Layer: System Insights Panel */}
//             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//                 <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/50">
//                     <div className="flex items-center gap-3">
//                         <div className="bg-gradient-to-tr from-amber-500 to-orange-500 p-2 rounded-xl text-white shadow-sm shadow-orange-200">
//                             <Sparkles size={20} />
//                         </div>
//                         <div>
//                             <h3 className="text-lg font-bold text-slate-800">AI System Insights</h3>
//                             <p className="text-slate-500 text-xs">Generate instant system health diagnoses using aggregate platform data.</p>
//                         </div>
//                     </div>
//                     <button 
//                         onClick={fetchAiInsights}
//                         disabled={isAiLoading}
//                         className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition disabled:opacity-50"
//                     >
//                         {isAiLoading ? (
//                             <span className="flex items-center gap-2">
//                                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                                 Analyzing...
//                             </span>
//                         ) : (
//                             <>
//                                 <Sparkles size={16} />
//                                 Run Live Diagnosis
//                             </>
//                         )}
//                     </button>
//                 </div>

//                 <div className="p-6">
//                     {!aiInsight && !isAiLoading && (
//                         <div className="text-center py-8 text-slate-400 text-sm">
//                             No report generated yet. Click the button above to run an AI-driven structural analysis.
//                         </div>
//                     )}

//                     {isAiLoading && (
//                         <div className="space-y-4 py-4 animate-pulse">
//                             <div className="h-4 bg-slate-100 rounded w-3/4"></div>
//                             <div className="h-4 bg-slate-100 rounded w-1/2"></div>
//                             <div className="h-20 bg-slate-50 rounded-xl mt-6"></div>
//                         </div>
//                     )}

//                     {aiInsight && !isAiLoading && (
//                         <div className="space-y-6">
//                             <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-xl text-slate-700 text-sm leading-relaxed">
//                                 <strong>Executive Summary:</strong> {aiInsight.summary}
//                             </div>
//                             <div className="space-y-3">
//                                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Action Items</h4>
//                                 {aiInsight.alerts.map((alert) => (
//                                     <div 
//                                         key={alert.id} 
//                                         className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
//                                             alert.type === 'danger' 
//                                                 ? 'bg-red-50/50 border-red-100 text-red-800' 
//                                                 : 'bg-orange-50/50 border-orange-100 text-orange-800'
//                                         }`}
//                                     >
//                                         <AlertTriangle size={18} className="shrink-0 mt-0.5" />
//                                         <span>{alert.message}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Shortcuts Sections */}
//             {/* 🛠️ Strategic System Quick Actions */}
//             <div>
//                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
//                     Quick Management Actions
//                 </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <QuickActionCard
//                         category="Registration"
//                         title="Create User"
//                         description="Register a new student or teacher account."
//                         color="text-indigo-600"
//                         actionText="Go to Users"
//                         onClick={() => navigate('/admin/users')}
//                         />

//                         <QuickActionCard
//                         category="Curriculum"
//                         title="Create Course"
//                         description="Create and manage courses."
//                         color="text-emerald-600"
//                         actionText="Go to Courses"
//                         onClick={() => navigate('/admin/course-management')}
//                         />

//                         <QuickActionCard
//                         category="Insights"
//                         title="Analytics"
//                         description="Monitor platform activity and academic performance."
//                         color="text-amber-600"
//                         actionText="View Analytics"
//                         onClick={() => navigate('/admin/analytics')}
//                         />
//                     </div>
//             </div>

//         </div>
//     );
// }

// export default AdminHome;