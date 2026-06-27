import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginationFooter({
  totalItems,
  rowsPerPage,
  currentPage,
  setCurrentPage,
}) {
  // Compute total pages needed based on filtered item volume
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;

  // Layout calculations for current displayed items bounds
  const startRange = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRange = Math.min(currentPage * rowsPerPage, totalItems);

  // Navigation handlers preventing array index bounds overflow
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
  <div className="w-full bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
    
    {/* Left side: Context details metrics display matching your dashboard text weights */}
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Displaying entries <span className="text-indigo-900 font-bold">{startRange}</span>–<span className="text-indigo-900 font-bold">{endRange}</span> of <span className="text-slate-800 font-bold">{totalItems}</span> operators
    </div>

    {/* Right side: Interactive navigation buttons */}
    {/* Optimized Pagination Layout Component */}
    <div className="flex items-center gap-1.5">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-indigo-900 hover:text-white transition shadow-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 font-mono">
        {currentPage} / {totalPages}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-indigo-900 hover:text-white transition shadow-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600"
      >
        <ChevronRight size={16} />
      </button>
    </div>

  </div>
);

}
