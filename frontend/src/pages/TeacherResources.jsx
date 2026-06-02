import React, { useState } from 'react';
import { FolderOpen, FileText, UploadCloud, Trash2, Search, CheckCircle, Clock } from 'lucide-react';

const TeacherResources = () => {
       const [selectedBatch, setSelectedBatch] = useState('Batch A');
        const [searchTerm, setSearchTerm] = useState('');
        const [isUploading, setIsUploading] = useState(false);
        const [uploadSuccess, setUploadSuccess] = useState(false);


        // Mock Database for Resource File Registry
    const [resources, setResources] = useState([
        { id: "RES-401", title: "Java Collections Deep Dive.pdf", batch: "Batch A", type: "PDF Document", size: "2.4 MB", date: "May 28, 2026" },
        { id: "RES-402", title: "Spring Boot Microservices Architecture.pptx", batch: "Batch A", type: "Presentation", size: "14.1 MB", date: "May 30, 2026" },
        { id: "RES-403", title: "Tailwind CSS Component Sheet.pdf", batch: "Batch B", type: "PDF Document", size: "1.1 MB", date: "May 25, 2026" },
    ]);

    // Filter file directory matrix by selected cohort batch and file title matching criteria
    const filteredResources = resources.filter(file => 
        file.batch === selectedBatch &&
        file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Simulate real file chunk uploading behavior
    const handleUploadSimulate = (e) => {
        e.preventDefault();
        setIsUploading(true);

        setTimeout(() => {
            setIsGenerating(false);
            setIsUploading(false);
            setUploadSuccess(true);
            
            // Append a mock uploaded resource record payload to state
            const newFile = {
                id: `RES-${Math.floor(100 + Math.random() * 900)}`,
                title: "Advanced JPA Mapping Strategies.pdf",
                batch: selectedBatch,
                type: "PDF Document",
                size: "4.2 MB",
                date: "Today"
            };
            setResources([newFile, ...resources]);
            
            setTimeout(() => setUploadSuccess(false), 3000);
        }, 1800);
    };

    const handleDeleteFile = (id) => {
        setResources(resources.filter(file => file.id !== id));
    };


        return (
        <div className="space-y-6">
            {/* 📁 Title Header Context */}
            <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Courseware Storage</p>
                <h2 className="text-2xl font-bold text-slate-800">Resource Portal</h2>
            </div>

            {/* 🎉 Operation Notifications Toast Feedback Layer */}
            {uploadSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <CheckCircle size={18} className="text-emerald-600" />
                    <span className="text-sm font-medium">Academic asset uploaded successfully and distributed across the target cohort pipeline.</span>
                </div>
            )}

            {/* 🗂️ Split Grid Layout: Dropzone (Left) & File Registry (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                
                {/* File Upload Dropzone Form Panel Component (Left 2-Columns) */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <UploadCloud size={14} /> Repository Ingestion
                    </h3>
                    
                    <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Destination Target</label>
                            <select 
                                value={selectedBatch} 
                                onChange={(e) => setSelectedBatch(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition font-medium text-slate-700"
                            >
                                <option value="Batch A">Batch A (Backend Core)</option>
                                <option value="Batch B">Batch B (Frontend Core)</option>
                            </select>
                        </div>

                        {/* Interactive Drag/Drop Zone Shell UI */}
                        <button 
                            onClick={handleUploadSimulate}
                            disabled={isUploading}
                            className="w-full border-2 border-dashed border-slate-200 hover:border-indigo-400 disabled:border-slate-200 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition group relative overflow-hidden"
                        >
                            {isUploading && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px] flex flex-col items-center justify-center space-y-2">
                                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-xs font-semibold text-indigo-600 font-mono">Streaming file chunk matrix...</span>
                                </div>
                            )}
                            <UploadCloud size={32} className="text-slate-400 group-hover:text-indigo-500 transition mb-2" />
                            <p className="text-xs font-bold text-slate-700">Simulate Syllabus Upload</p>
                            <p className="text-[10px] text-slate-400 mt-1">Accepts raw PDF, PPTX, or Markdown specs up to 25MB.</p>
                        </button>
                    </div>
                </div>

                {/* Distributed Repository File Ledger Terminal Panel (Right 3-Columns) */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <FolderOpen size={14} /> Active Academic Asset Ledger
                        </h3>
                        
                        {/* Inline Ledger Filtering Search Field Element */}
                        <div className="relative max-w-xs w-full bg-white rounded-xl border border-slate-200/60 shadow-sm">
                            <Search className="absolute left-2.5 top-2 text-slate-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Search repository..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent pl-8 pr-3 py-1.5 text-xs focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* File Directory Registry Grid Rows */}
                    <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm divide-y divide-slate-100 overflow-hidden">
                        {filteredResources.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 text-xs">
                                No courseware files have been staged for this batch repository yet.
                            </div>
                        ) : (
                            filteredResources.map((file) => (
                                <div key={file.id} className="p-4 flex items-center justify-between hover:bg-slate-50/40 transition group">
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition shrink-0">
                                            <FileText size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-slate-800 truncate pr-2 group-hover:text-indigo-600 transition">{file.title}</h4>
                                            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mt-0.5">
                                                <span>{file.type}</span>
                                                <span>•</span>
                                                <span>{file.size}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Clock size={11} /> {file.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleDeleteFile(file.id)}
                                        className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition shrink-0"
                                        title="Purge Document Resource"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );

}

export default TeacherResources;