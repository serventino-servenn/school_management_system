import { useEffect, useMemo, useState } from "react";
import { Search, Users, Check } from "lucide-react";
import {getUsersByRole} from '../../services/api';

const AddStudentModal = ({
    isOpen,
    course,
    onClose,
    onEnroll,
    enrollLoading
}) => {

    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const fetchStudents = async () => {
            try {
                setLoadingStudents(true);

                const { data } = await getUsersByRole(
                    "STUDENT",
                    0,
                    100
                );

                setStudents(data.content || []);
            } catch (error) {
                console.error("Failed to load students", error);
            } finally {
                setLoadingStudents(false);
            }
        };

        fetchStudents();

        setSelectedStudents([]);
        setSearchTerm("");

    }, [isOpen]);

    const enrolledStudentIds = useMemo(
        () => new Set(course.students.map(student => student.id)),
        [course.students]
    );

    const filteredStudents = useMemo(() => {

            return students.filter(student => {

                // Hide students already enrolled
                if (enrolledStudentIds.has(student.id)) {
                    return false;
                }

                const fullName =
                    `${student.firstName} ${student.lastName}`.toLowerCase();

                return (
                    fullName.includes(searchTerm.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchTerm.toLowerCase())
                );

            });

    }, [students, searchTerm, enrolledStudentIds]);

    const toggleStudent = (studentId) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId]
        );
    };

    // useEffect(() => {
    //     console.log("Selected students:", selectedStudents);
    // }, [selectedStudents]);   

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <div>

                        <h2 className="text-lg font-semibold text-slate-900">
                            Enroll Students
                        </h2>

                        <p className="text-sm text-slate-500">
                            Select one or more students to enroll.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        disabled={enrollLoading}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        ✕
                    </button>

                </div>

                {/* Search */}

                <div className="border-b p-4">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 outline-none focus:border-blue-500"
                        />

                    </div>

                </div>

                {/* Students */}

                <div className="max-h-96 overflow-y-auto">

                    {loadingStudents ? (

                        <div className="py-10 text-center text-slate-500">
                            Loading students...
                        </div>

                    ) : filteredStudents.length === 0 ? (

                        <div className="py-10 text-center text-slate-500">

                            <Users
                                className="mx-auto mb-3 text-slate-300"
                                size={32}
                            />

                            No students found.

                        </div>

                    ) : (

                        filteredStudents.map(student => {

                            const selected =
                                selectedStudents.includes(student.id);

                            return (

                                <button
                                    key={student.id}
                                    type="button"
                                    onClick={() => toggleStudent(student.id)}
                                    className={`flex w-full items-center justify-between border-b px-5 py-4 transition hover:bg-slate-50 ${
                                        selected
                                            ? "bg-blue-50"
                                            : ""
                                    }`}
                                >

                                    <div>

                                        <p className="font-medium text-slate-900">
                                            {student.firstName} {student.lastName}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            {student.email}
                                        </p>

                                    </div>

                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded border ${
                                            selected
                                                ? "border-blue-600 bg-blue-600 text-white"
                                                : "border-slate-300"
                                        }`}
                                    >
                                        {selected && <Check size={16} />}
                                    </div>

                                </button>

                            );

                        })

                    )}

                </div>

                {/* Footer */}

                <div className="flex items-center justify-between border-t px-6 py-4">

                    <span className="text-sm text-slate-500">

                        {selectedStudents.length} selected

                    </span>

                    <div className="space-x-3">

                        <button
                        
                            onClick={onClose}
                            disabled={enrollLoading}
                            className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            
                            onClick={
                                () => onEnroll(selectedStudents)
                                //print selected students to console for debugging
                               
                            }
                            disabled={
                                selectedStudents.length === 0 ||
                                enrollLoading
                            }
                            className={`rounded-lg px-5 py-2 text-white transition ${
                                selectedStudents.length === 0 ||
                                enrollLoading
                                    ? "cursor-not-allowed bg-slate-300"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {enrollLoading
                                ? "Enrolling..."
                                : "Enroll Students"}
                        </button>
                        

                    </div>

                </div>

            </div>

        </div>

    );
};

export default AddStudentModal;