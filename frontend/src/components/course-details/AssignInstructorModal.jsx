import React, { useState, useEffect } from 'react';
import { getAllTeachers} from '../../services/api';

const AssignInstructorModal = ({ isOpen, onClose, onAssign, assignLoading }) => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
  
    // Fetch teachers list only when the modal is opened
    useEffect(() => {
        if (!isOpen) return;

                const fetchTeachersList = async () => {
            try {
                setLoadingTeachers(true);
                const { data } = await getAllTeachers(); 
                
                // Notice the ".content" addition here to extract data from Spring's Page structure
                setTeachers(data.content || []); 
            } catch (error) {
                console.error("Failed to load teachers list", error);
            } finally {
                setLoadingTeachers(false);
            }
        };

        fetchTeachersList();
        setSelectedTeacherId(null); // Reset selection on open
    }, [isOpen]);

    // Don't render anything if the modal is hidden
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl space-y-4">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-bold text-gray-900">Select Instructor</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={assignLoading}
                    >
                        ✕
                    </button>
                </div>

                {/* Teachers List Container */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    {loadingTeachers ? (
                        <p className="text-sm text-gray-500 text-center py-4">Loading instructors...</p>
                    ) : teachers.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">No instructors found.</p>
                    ) : (
                        teachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                onClick={() => !assignLoading && setSelectedTeacherId(teacher.id)}
                                className={`p-3 rounded-lg border cursor-pointer transition-colors duration-200 flex justify-between items-center ${
                                    selectedTeacherId === teacher.id
                                        ? "border-blue-600 bg-blue-50 text-blue-900 font-medium"
                                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                }`}
                            >
                                <span>{teacher.name}</span>
                                {selectedTeacherId === teacher.id && (
                                    <span className="text-blue-600 text-sm font-semibold">✓ Selected</span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end space-x-3 pt-2 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        disabled={assignLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onAssign(selectedTeacherId)}
                        // Becomes active only when a teacher is selected
                        disabled={!selectedTeacherId || assignLoading}
                        className={`px-4 py-2 rounded-md text-white transition-all ${
                            !selectedTeacherId || assignLoading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 shadow-md"
                        }`}
                    >
                        {assignLoading ? "Assigning..." : "Add"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AssignInstructorModal;
