import { UserMinus, X } from "lucide-react";

export default function UnenrollStudentModal({
    isOpen,
    student,
    course,
    loading,
    onClose,
    onConfirm,
}) {
    if (!isOpen || !student) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                            <UserMinus
                                size={22}
                                className="text-red-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Unenroll Student
                            </h2>

                            <p className="text-sm text-slate-500">
                                Remove a student from this course.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-5 px-6 py-6">

                    <p className="text-sm leading-6 text-slate-600">
                        Are you sure you want to remove
                        <span className="font-semibold text-slate-900">
                            {" "}
                            {student.fullName}
                        </span>{" "}
                        from
                        <span className="font-semibold text-slate-900">
                            {" "}
                            {course.title}
                        </span>
                        ?
                    </p>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm text-amber-800">
                            The student's account will remain active.
                            Only their enrollment in this course will be removed.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                        <p className="font-medium text-slate-900">
                            {student.fullName}
                        </p>

                        <p className="text-sm text-slate-500">
                            {student.email}
                        </p>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Removing..."
                            : "Unenroll Student"}
                    </button>

                </div>

            </div>
        </div>
    );
}