import { AlertTriangle } from "lucide-react";

export default function StatusConfirmationModal({
    isOpen,
    user,
    loading,
    onClose,
    onCancel,
    onConfirm,
}) {

    // console.log("loading:", loading);
    // console.log("disabled:", loading);
    
    if (!isOpen || !user) return null;

    const isDeactivating = user.active;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200">

                <div className="p-6">

                    <div className="flex items-center gap-3 mb-5">

                        <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                            <AlertTriangle size={22} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                {isDeactivating ? "Deactivate User" : "Activate User"}
                            </h2>

                            <p className="text-sm text-slate-500">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>

                    </div>

                    <p className="text-slate-600">
                        {isDeactivating
                            ? `Are you sure you want to deactivate ${user.name}? This user will no longer be able to sign in.`
                            : `Activate ${user.name} so they can access the system again?`
                        }
                    </p>

                    <div className="flex justify-end gap-3 mt-8">

                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : isDeactivating
                                    ? "Deactivate"
                                    : "Activate"}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}