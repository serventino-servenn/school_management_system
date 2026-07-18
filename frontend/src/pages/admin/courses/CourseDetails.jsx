


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CourseHeader from "../../../components/course-details/CourseHeader";
import CourseStudents from "../../../components/course-details/CourseStudents";
import CourseInstructor from "../../../components/course-details/CourseInstructor";
// import CourseOverview from "../../../components/course-details/CourseOverview";
// import CourseSettings from "../../../components/course-details/CourseSettings";
import CourseNavigation from "../../../components/course-details/CourseNavigation";
import AssignInstructorModal from "../../../components/course-details/AssignInstructorModal";


import { getCourseById,assignInstructor} from "../../../services/api";

export default function CourseDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("students");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [assignLoading, setAssignLoading] = useState(false);

    const fetchCourse = async () => {
        try {
            setLoading(true);

            const { data } = await getCourseById(courseId);
            console.log("Fetched course data:", data);
            setCourse(data);

        } catch (error) {
            console.error("Failed to fetch course", error);
        } finally {
            setLoading(false);
        }
    };

    

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    const handleEdit = () => {
        console.log("Edit course");
    };

    const handleConfirmAssign = async (teacherId) => {
        try {
            setAssignLoading(true);

            await assignInstructor(courseId, teacherId);

            await fetchCourse();

            setIsModalOpen(false);

        } catch (error) {
            console.error(error);
        } finally {
            setAssignLoading(false);
        }
    };

    const handleAssignInstructor = () => {
        setIsModalOpen(true);
    }

    

    const handleEnrollStudents = () => {
        console.log("Enroll students");
    };

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <p className="text-slate-500">Loading course...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
                <h2 className="text-xl font-semibold text-red-600">
                    Course Not Found
                </h2>

                <p className="mt-2 text-slate-600">
                    The requested course could not be found.
                </p>

                <button
                    onClick={() => navigate("/admin/courses")}
                    className="mt-6 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <CourseHeader
                course={course}
                // studentCount={course.studentCount ?? 0}
                onBack={() => navigate("/admin/courses")}
                // onEdit={handleEdit}
                onAssignInstructor={handleAssignInstructor}
                // onEnrollStudents={handleEnrollStudents}
            />

            {/* <CourseNavigation
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                studentCount={course.studentCount ?? 0}
                hasInstructor={!!course.teacher}
            /> */}
            <CourseNavigation
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                // studentCount={studentCount}
                course={course}
            />

            <AssignInstructorModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAssign={handleConfirmAssign}
                assignLoading={assignLoading}
            />

           {activeSection === "students" && (
                <CourseStudents
                    course={course}
                />
            )}

            {activeSection === "instructor" && (
                <CourseInstructor
                    course={course}
                />
            )}

        </div>
    );
}