import React from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const AdminAnalytics = () => {

  // Temporary mock data
  const stats = {
    totalStudents: 250,
    totalTeachers: 18,
    totalCourses: 32,
    totalEnrollments: 540,
    attendanceRate: 89,
    averageGpa: 3.4
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Analytics Dashboard
        </h2>

        <p className="text-slate-500 mt-1">
          School-wide performance overview
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Students"
          value={stats.totalStudents}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Teachers"
          value={stats.totalTeachers}
          icon={<GraduationCap size={22} />}
        />

        <StatCard
          title="Courses"
          value={stats.totalCourses}
          icon={<BookOpen size={22} />}
        />

        <StatCard
          title="Enrollments"
          value={stats.totalEnrollments}
          icon={<TrendingUp size={22} />}
        />

        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          icon={<TrendingUp size={22} />}
        />

        <StatCard
          title="Average GPA"
          value={stats.averageGpa}
          icon={<GraduationCap size={22} />}
        />

      </div>

      {/* Analytics Grid */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Attendance Analytics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <h3 className="font-bold text-lg text-slate-900 mb-4">
            Attendance Overview
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-slate-600">
                Average Attendance
              </span>

              <span className="font-semibold text-green-600">
                89%
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">
                Students Below 70%
              </span>

              <span className="font-semibold text-red-600">
                12
              </span>
            </div>

          </div>

        </div>

        {/* Academic Analytics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

          <h3 className="font-bold text-lg text-slate-900 mb-4">
            Academic Performance
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-slate-600">
                Average GPA
              </span>

              <span className="font-semibold">
                3.4
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">
                Passing Rate
              </span>

              <span className="font-semibold text-green-600">
                92%
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* At Risk Students */}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

        <div className="flex items-center gap-2 mb-4">

          <AlertTriangle
            className="text-amber-500"
            size={22}
          />

          <h3 className="font-bold text-lg text-slate-900">
            At-Risk Students
          </h3>

        </div>

        <div className="space-y-3">

          <RiskRow
            student="John Doe"
            reason="Attendance below 70%"
          />

          <RiskRow
            student="Jane Smith"
            reason="Average grade below 60%"
          />

          <RiskRow
            student="Mike Johnson"
            reason="Low attendance and grades"
          />

        </div>

      </div>

    </div>
  );
};

function StatCard({ title, value, icon }) {

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-slate-900 mt-2">
            {value}
          </h3>
        </div>

        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

function RiskRow({ student, reason }) {

  return (
    <div className="flex justify-between items-center border-b border-slate-100 pb-3">

      <span className="font-medium text-slate-900">
        {student}
      </span>

      <span className="text-sm text-red-500">
        {reason}
      </span>

    </div>
  );
}

export default AdminAnalytics;