import React, { useState } from "react";
import { Users, BookOpen, Plus, Check } from "lucide-react";

const AdminEnrollments = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrollments, setEnrollments] = useState([]);

  // Mock data for now (replace with API later)
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  const courses = [
    { id: 1, title: "React Basics" },
    { id: 2, title: "Java Fundamentals" },
  ];

  const handleEnroll = () => {
    if (!selectedUser || !selectedCourse) return;

    const newEnrollment = {
      id: Date.now(),
      user: users.find(u => u.id === parseInt(selectedUser)),
      course: courses.find(c => c.id === parseInt(selectedCourse)),
    };

    setEnrollments([...enrollments, newEnrollment]);

    setSelectedUser("");
    setSelectedCourse("");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-slate-800">
        Student Enrollments
      </h2>

      {/* Enrollment Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid md:grid-cols-2 gap-4">

          {/* User Select */}
          <div>
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
              <Users size={14} /> Select User
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="">Choose user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Course Select */}
          <div>
            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
              <BookOpen size={14} /> Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm"
            >
              <option value="">Choose course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleEnroll}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          <Plus size={16} />
          Enroll Student
        </button>
      </div>

      {/* Enrollment List */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Current Enrollments
        </h3>

        {enrollments.length === 0 ? (
          <p className="text-sm text-slate-400">
            No enrollments yet.
          </p>
        ) : (
          <div className="space-y-2">
            {enrollments.map(enrollment => (
              <div
                key={enrollment.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="text-sm">
                  <span className="font-semibold">
                    {enrollment.user.name}
                  </span>
                  {" → "}
                  <span className="text-slate-600">
                    {enrollment.course.title}
                  </span>
                </div>

                <Check size={16} className="text-green-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnrollments;