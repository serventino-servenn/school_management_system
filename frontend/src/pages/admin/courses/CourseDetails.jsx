


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CourseHeader from "../../../components/course-details/CourseHeader";
import CourseStudents from "../../../components/course-details/CourseStudents";
import CourseInstructor from "../../../components/course-details/CourseInstructor";
import CourseNavigation from "../../../components/course-details/CourseNavigation";
import AssignInstructorModal from "../../../components/course-details/AssignInstructorModal";
import AddStudentModal from "../../../components/course-details/AddStudentModal";
import UnenrollStudentModal from "../../../components/course-details/UnenrollStudentModal";


// import { getCourseById,assignInstructor} from "../../../services/api";
// import { getCourseById,assignInstructor} from "../../../api/api";
import { getCourseById, assignInstructor,enrollStudents,removeStudent} from "../../../services/api";

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

    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [enrollLoading, setEnrollLoading] = useState(false);

    const [studentCount, setStudentCount] = useState(0);
    const [isLoadingStudents, setIsLoadingStudents] = useState(false);

    const [isUnenrollModalOpen, setIsUnenrollModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);


    const fetchCourse = async () => {
        try {
            setLoading(true);

            const { data } = await getCourseById(courseId);
            // console.log("Fetched course data:", data);
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

   const handleEnrollStudents = async (studentIds) => {
        // console.log("Sending IDs:", studentIds);

        try {
            setEnrollLoading(true);

            await enrollStudents(courseId, studentIds);

            setIsAddStudentModalOpen(false);

            await fetchCourse();

        } catch (error) {
            console.error("Enrollment failed", error);
        } finally {
            setEnrollLoading(false);
        }
    };

    const handleRemoveStudent = (student) => {
        setSelectedStudent(student);
        setIsUnenrollModalOpen(true);
    };

    // const handleRemoveStudent = async (studentId) => {
    //     try {
    //         setIsLoadingStudents(true);
    //           setSelectedStudent(studentId);
    //          setIsUnenrollModalOpen(true);
    //         await removeStudent(courseId, studentId);

    //         await fetchCourse();

    //     } catch (error) {
    //         console.error("Failed to remove student", error);
    //     } finally {
    //         setIsLoadingStudents(false);
    //     }
    // }

    const handleConfirmUnenroll = async () => {
            if (!selectedStudent) return;

            try {
                setEnrollLoading(true);

                await removeStudent(
                    courseId,
                    selectedStudent.id
                );

                setIsUnenrollModalOpen(false);
                setSelectedStudent(null);

                await fetchCourse();

            } catch (error) {
                console.error("Failed to remove student", error);
            } finally {
                setEnrollLoading(false);
            }
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
                    onClick={() => navigate("/admin/course_management")}
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
                onBack={() => navigate("/admin/course-management")}
                // onEdit={handleEdit}
                onAssignInstructor={handleAssignInstructor}
                // onEnrollStudents={handleEnrollStudents}
                 onAddStudents={() => setIsAddStudentModalOpen(true)}
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

            <AddStudentModal
                isOpen={isAddStudentModalOpen}
                course={course}
                onClose={() => setIsAddStudentModalOpen(false)}
                onEnroll={handleEnrollStudents}
                enrollLoading={enrollLoading}
            />
            <UnenrollStudentModal
                isOpen={isUnenrollModalOpen}
                student={selectedStudent}
                course={course}
                loading={enrollLoading}
                onClose={() => {
                    setIsUnenrollModalOpen(false);
                    setSelectedStudent(null);
                }}
                onConfirm={handleConfirmUnenroll}
            />

           {activeSection === "students" && (
                <CourseStudents
                    course={course}
                     onRemoveStudent={handleRemoveStudent} 
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