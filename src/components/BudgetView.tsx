import React, { useState } from 'react';
import { formatETB } from '../lib/formatters';
import { BUDGETS, CATEGORIES } from '../lib/mockData';
import { PieChart as LucidePie, MoreVertical, Plus, Calendar, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const BudgetView = () => {
  const [activeBudgets, setActiveBudgets] = useState(BUDGETS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingBudget, setEditingBudget] = useState<{id: string, limit: number, endDate: string} | null>(null);

  const handleUpdateBudget = () => {
    if (!editingBudget) return;
    setActiveBudgets(prev => prev.map(b => 
      b.id === editingBudget.id 
        ? { ...b, limit: editingBudget.limit, endDate: editingBudget.endDate } 
        : b
    ));
    setEditingBudget(null);
    setOpenMenuId(null);
    toast.success('Budget updated successfully');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-medium">Active Budgets</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-12 h-12 rounded-full bg-[#6750A4] flex items-center justify-center text-white shadow-lg active:scale-90 transition-all"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="grid gap-4">
        {activeBudgets.map((budget) => {
          const percent = (budget.spent / budget.limit) * 100;
          const isOver = percent > 90;
          const color = CATEGORIES.find(c => c.name === budget.category)?.color || '#6750A4';

          return (
            <div key={budget.id} className="bg-white p-5 rounded-[28px] border border-[#CAC4D0] shadow-sm space-y-4 relative">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: `${color}20`, color: color }}
                  >
                    <LucidePie size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C1B1F]">{budget.category}</h4>
                    <p className="text-xs text-[#49454F]">Until {budget.endDate}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === budget.id ? null : budget.id)}
                    className="p-2 rounded-full hover:bg-[#F3EDF7] text-[#49454F]"
                  >
                    <MoreVertical size={20} />
                  </button>
                  
                  {/* Context Menu */}
                  <AnimatePresence>
                    {openMenuId === budget.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        className="absolute right-0 top-10 w-48 bg-white border border-[#CAC4D0] rounded-2xl shadow-xl z-20 py-2"
                      >
                        <button 
                          onClick={() => setEditingBudget({ id: budget.id, limit: budget.limit, endDate: budget.endDate })}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F3EDF7] text-sm text-[#1C1B1F]"
                        >
                          <Edit2 size={16} />
                          Modify Budget
                        </button>
                        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 text-sm text-red-600">
                          <Trash2 size={16} />
                          Delete Category
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[#1C1B1F]">{formatETB(budget.spent)} spent</span>
                  <span className="text-[#49454F]">Limit: {formatETB(budget.limit)}</span>
                </div>
                <div className="h-3 w-full bg-[#E7E0EC] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percent, 100)}%` }}
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ 
                      backgroundColor: isOver ? '#B3261E' : color 
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className={`text-[10px] font-bold ${isOver ? 'text-[#B3261E]' : 'text-[#6750A4]'}`}>
                    {isOver ? 'ALMOST EXCEEDED' : 'ON TRACK'}
                  </span>
                  <span className="text-[10px] text-[#49454F]">{Math.round(percent)}%</span>
                </div>
              </div>

              {/* Inline Edit Form when context menu action is selected */}
              <AnimatePresence>
                {editingBudget?.id === budget.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-[#E7E0EC] pt-4 mt-4 space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-[#49454F] font-bold uppercase">New Limit</label>
                        <input 
                          type="number" 
                          value={editingBudget.limit}
                          onChange={(e) => setEditingBudget({...editingBudget, limit: Number(e.target.value)})}
                          className="w-full bg-[#F3EDF7] rounded-xl px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-[#49454F] font-bold uppercase">End Date</label>
                        <input 
                          type="date" 
                          value={editingBudget.endDate}
                          onChange={(e) => setEditingBudget({...editingBudget, endDate: e.target.value})}
                          className="w-full bg-[#F3EDF7] rounded-xl px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleUpdateBudget}
                        className="flex-1 bg-[#6750A4] text-white py-2 rounded-xl text-xs font-bold"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => setEditingBudget(null)}
                        className="flex-1 bg-[#F3EDF7] py-2 rounded-xl text-xs font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="rounded-[28px] overflow-hidden border border-[#CAC4D0] shadow-sm relative h-48 mt-10">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/budget-context-menu-299826f3-1772093891750.webp" 
          alt="Budget Insights"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
          <p className="text-white font-medium text-lg">
            Optimize your spending with smart category management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetView;