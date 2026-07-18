import React, { useState, useEffect } from 'react';
import {getUsersByRole} from '../../services/api';
import {
    Search,
    UserCheck,
    Mail,
    Circle,
    CheckCircle2
} from "lucide-react";

const AssignInstructorModal = ({ isOpen, onClose, onAssign, assignLoading }) => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
  
    // Fetch teachers list only when the modal is opened
    useEffect(() => {
        if (!isOpen) return;

                const fetchTeachersList = async () => {
            try {
                setLoadingTeachers(true);
                const { data } = await getUsersByRole("TEACHER");
                
                // Notice the ".content" addition here to extract data from Spring's Page structure
                setTeachers(data.content); 
            } catch (error) {
                console.error("Failed to load teachers list", error);
            } finally {
                setLoadingTeachers(false);
            }
        };

        fetchTeachersList();
        setSelectedTeacherId(null); // Reset selection on open
    }, [isOpen]);

    const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // Don't render anything if the modal is hidden
    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">

        {/* Overlay */}
        <div
            className="absolute inset-0"
            onClick={!assignLoading ? onClose : undefined}
        />

        {/* Modal */}
        <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200">

            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-200">

                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Assign Instructor
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Choose a teacher to manage this course.
                    </p>
                </div>

                <button
                    onClick={onClose}
                    disabled={assignLoading}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                    ✕
                </button>

            </div>

            {/* Search (We'll make it functional next) */}
            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                type="text"
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            </div>

            {/* Teacher List */}
            <div className="max-h-[420px] overflow-y-auto p-6 space-y-3">

                {loadingTeachers ? (

                    <p className="text-center text-slate-500">
                        Loading instructors...
                    </p>

                ) : filteredTeachers.length === 0 ? (

                    <div className="py-12 text-center">

                        <p className="text-lg font-semibold text-slate-700">
                            No instructors found
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Create a teacher account before assigning one.
                        </p>

                    </div>

                ) : (

                    filteredTeachers.map((teacher) => (

                        <div
                            key={teacher.id}
                            onClick={() =>
                                !assignLoading &&
                                setSelectedTeacherId(teacher.id)
                            }
                            className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                                selectedTeacherId === teacher.id
                                    ? "border-blue-600 bg-blue-50 shadow-sm"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                            }`}
                        >

                            {/* We'll redesign this card next */}

                            <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        {/* Avatar */}

                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                selectedTeacherId === teacher.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-500"
                            }`}
                        >
                            <UserCheck size={22} />
                        </div>

                        {/* Teacher Details */}

                        <div>

                            <h4 className="font-semibold text-slate-900">
                                {teacher.firstName} {teacher.lastName}
                            </h4>

                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">

                                <Mail size={14} />

                                {teacher.email}

                            </div>

                            <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                Teacher
                            </span>

                        </div>

                </div>

                {/* Selection Indicator */}

                <div>

                    {selectedTeacherId === teacher.id ? (

                        <CheckCircle2
                            size={24}
                            className="text-blue-600"
                        />

                    ) : (

                        <Circle
                            size={22}
                            className="text-slate-300"
                        />

                    )}

                </div>

            </div>

                                    </div>

                                ))

                            )}

                        </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

                <button
                    onClick={onClose}
                    disabled={assignLoading}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
                >
                    Cancel
                </button>

                <button
                    onClick={() => onAssign(selectedTeacherId)}
                    disabled={!selectedTeacherId || assignLoading}
                    className={`rounded-xl px-5 py-2.5 font-semibold text-white transition ${
                        !selectedTeacherId || assignLoading
                            ? "cursor-not-allowed bg-slate-300"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {assignLoading
                        ? "Assigning..."
                        : "Assign Instructor"}
                </button>

            </div>

        </div>

      </div>
    );
};

export default AssignInstructorModal;
