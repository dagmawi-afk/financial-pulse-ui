import React from 'react';
import { formatETB } from '../lib/formatters';
import { PieChart as LucidePie, MoreVertical, Plus } from 'lucide-react';

const BUDGETS = [
  { id: '1', category: 'Food & Dining', spent: 4200, limit: 6000, color: '#6750A4' },
  { id: '2', category: 'Transport', spent: 1200, limit: 1500, color: '#B3261E' },
  { id: '3', category: 'Groceries', spent: 3800, limit: 4000, color: '#033D4D' },
  { id: '4', category: 'Entertainment', spent: 850, limit: 2000, color: '#D0BCFF' },
];

const BudgetView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-medium">Active Budgets</h3>
        <button className="w-10 h-10 rounded-full bg-[#EADDFF] flex items-center justify-center text-[#21005D]">
          <Plus size={20} />
        </button>
      </div>

      <div className="grid gap-4">
        {BUDGETS.map((budget) => {
          const percent = (budget.spent / budget.limit) * 100;
          const isOver = percent > 90;

          return (
            <div key={budget.id} className="bg-white p-5 rounded-[28px] border border-[#CAC4D0] shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: `${budget.color}20`, color: budget.color }}
                  >
                    <LucidePie size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1C1B1F]">{budget.category}</h4>
                    <p className="text-xs text-[#49454F]">{formatETB(budget.limit)} limit</p>
                  </div>
                </div>
                <button className="text-[#49454F]">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[#1C1B1F]">{formatETB(budget.spent)} spent</span>
                  <span className={isOver ? 'text-[#B3261E] font-bold' : 'text-[#49454F]'}>
                    {Math.round(percent)}%
                  </span>
                </div>
                {/* Material Progress Bar */}
                <div className="h-2 w-full bg-[#E7E0EC] rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ 
                      width: `${Math.min(percent, 100)}%`, 
                      backgroundColor: isOver ? '#B3261E' : budget.color 
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[28px] overflow-hidden border border-[#CAC4D0] shadow-sm relative h-48">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/budgeting-module-96bea6f3-1772036869475.webp" 
          alt="Budget Summary"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center">
          <p className="text-white font-medium text-lg leading-tight">
            You've saved 15% more this month compared to April.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetView;