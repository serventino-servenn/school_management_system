import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Mail, Shield, Calendar } from "lucide-react";
import { getUserById } from "../../../services/api";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserById(id);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading user details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-sm text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Back Header */}
      <button
        onClick={() => navigate("/admin/users")}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Back to Users
      </button>

      {/* Profile Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          
          <div className="h-14 w-14 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {user.firstName} {user.lastName}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield size={14} />
              {user.role}
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="text-xs text-slate-500 mb-3">Email</div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Mail size={14} />
            {user.email}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="text-xs text-slate-500 mb-3">Role</div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Shield size={14} />
            {user.role}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="text-xs text-slate-500 mb-3">Joined</div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Calendar size={14} />
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <div className="text-xs text-slate-500 mb-3">Status</div>
          <span className="text-sm font-medium text-green-600">
            ACTIVE
          </span>
        </div>

      </div>

      {/* Placeholder Section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">
          Academic Summary
        </h2>

        <p className="text-sm text-slate-400">
          This section will be populated when Attendance, Grades, and Courses modules are ready.
        </p>
      </div>

    </div>
  );
}