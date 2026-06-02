import { ArrowRight } from 'lucide-react';
const QuickActionCard = ({ title, category, description, color, onClick, actionText }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[160px]"
    >
      <div>
        <div className={`text-xs font-semibold mb-2 uppercase tracking-wider ${color}`}>
          {category}
        </div>

        <h4 className="text-base font-bold text-slate-800 mb-1">
          {title}
        </h4>

        <p className="text-slate-500 text-xs leading-relaxed">
          {description}
        </p>
      </div>

      <div className={`inline-flex items-center text-xs font-bold gap-1 mt-3 ${color}`}>
        {actionText}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default QuickActionCard;