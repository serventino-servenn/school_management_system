import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteUserModal({
    isOpen,
    user,
    loading,
    error,
    onClose,
    onConfirm,
}) {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
                >
                    <X size={20} />
                </button>

                <div className="p-6">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                            <AlertTriangle size={28} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Delete User
                            </h2>

                            <p className="text-sm text-slate-500">
                                Permanent action
                            </p>
                        </div>

                    </div>

                    {/* Warning */}
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                        <p className="text-sm text-slate-700">
                            You are about to permanently delete
                        </p>

                        <p className="mt-2 text-lg font-semibold text-slate-900">
                            {user.firstName} {user.lastName}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            {user.email}
                        </p>

                    </div>

                    <p className="mt-5 text-sm leading-6 text-slate-600">
                        This action <span className="font-semibold text-red-600">
                            cannot be undone.
                        </span>
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        If this user has attendance records, grades, courses, or
                        other historical data, deletion may not be allowed.
                        Consider deactivating the account instead.
                    </p>

                    {error && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                            <p className="text-sm text-red-700">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-8 flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                        >
                            <Trash2 size={18} />

                            {loading ? "Deleting..." : "Delete User"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}