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
    <div className="w-full bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
      
      {/* Left side: Context details metrics display matching your text weights */}
      <div className="text-xs font-medium text-slate-500 font-mono tracking-wide">
        Displaying entries <span className="text-indigo-600 font-bold">{startRange}</span>–<span className="text-indigo-600 font-bold">{endRange}</span> of <span className="text-slate-700 font-bold">{totalItems}</span> operators.
      </div>

      {/* Right side: Interactive navigation buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        
        {/* Previous Button Switch */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition w-full sm:w-auto ${
            currentPage === 1
              ? 'bg-slate-50/50 text-slate-300 border-slate-200/60 cursor-not-allowed'
              : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]'
          }`}
        >
          <ChevronLeft size={14} strokeWidth={2.5} />
          <span>Previous</span>
        </button>

        {/* Core page locator context indicator capsule */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-500 whitespace-nowrap">
          Page <span className="text-indigo-600">{currentPage}</span> / {totalPages}
        </div>

        {/* Next Button Switch */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition w-full sm:w-auto ${
            currentPage === totalPages
              ? 'bg-slate-50/50 text-slate-300 border-slate-200/60 cursor-not-allowed'
              : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]'
          }`}
        >
          <span>Next</span>
          <ChevronRight size={14} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
}
