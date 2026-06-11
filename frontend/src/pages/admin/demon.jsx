const AdminHome = () => {
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiInsight, setAiInsight] = useState(null);
    const navigate = useNavigate();

    // Live metrics state management
    const [metrics, setMetrics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

     // Fetch live backend metrics on component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const response = await getMetrics();
                setMetrics(response.data);
            } catch (err) {
                console.error("Error fetching admin dashboard metrics:", err);
                if (err.response?.status === 403) {
                    setError("Access denied. Administrator privileges required.");
                } else {
                    setError("Failed to connect to the server. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Handle loading and error fallback displays
    if (isLoading) {
        return <div className="text-center p-12 text-slate-500 font-medium animate-pulse">Loading dashboard metrics...</div>;
    }
    if (error) {
        return <div className="text-center p-8 text-red-500 bg-red-50 border border-red-100 rounded-2xl m-6">{error}</div>;
    }

    const statsConfig = [
        {
            label: "Total Students",
            value: metrics?.totalStudents?.total ?? 0,
            change: metrics?.totalStudents?.change ?? "No updates",
            icon: <Users size={22} className="text-blue-600" />,
            bg: "bg-blue-50",
            text: "text-emerald-600",
        },
        {
            label: "Total Teachers",
            value: metrics?.totalTeachers?.total ?? 0,
            change: metrics?.totalTeachers?.change ?? "No updates",
            icon: <Users size={22} className="text-emerald-600" />,
            bg: "bg-emerald-50",
            text: "text-emerald-600",
        },
        {
            label: "Total Courses",
            value: metrics?.totalCourses?.total ?? 0,
            change: metrics?.totalCourses?.change ?? "No updates",
            icon: <BookOpen size={22} className="text-violet-600" />,
            bg: "bg-violet-50",
            text: "text-emerald-600",
        },
        {
            label: "Enrollments",
            value: metrics?.totalEnrollments?.total ?? 0,
            change: metrics?.totalEnrollments?.change ?? "No updates",
            icon: <BookOpen size={22} className="text-amber-600" />,
            bg: "bg-amber-50",
            text: "text-emerald-600",
        }
    ];



    // // Modern SaaS Metrics Data
    //     const stats = [
    //     {
    //         label: "Total Students",
    //         value: "1248",
    //         change: "+12 this week",
    //         icon: <Users size={22} />,
    //     },
    //     {
    //         label: "Total Teachers",
    //         value: "18",
    //         change: "+1 this month",
    //         icon: <Users size={22} />,
    //     },
    //     {
    //         label: "Total Courses",
    //         value: "42",
    //         change: "3 new courses",
    //         icon: <BookOpen size={22} />,
    //     },
    //     {
    //         label: "Enrollments",
    //         value: "540",
    //         change: "+28 this month",
    //         icon: <BookOpen size={22} />,
    //     }
    //     ];
    return (
        <div className="space-y-8">
                {/* Metrics Grid */}
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsConfig.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition">
                        <div className="space-y-2">
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-800">{stat.value.toLocaleString()}</h3>
                            <span className={`inline-flex items-center text-xs font-medium ${stat.text}`}>
                                <TrendingUp size={14} className="mr-1" /> {stat.change}
                            </span>
                        </div>
                        <div className={`p-4 ${stat.bg} rounded-xl`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminHome;