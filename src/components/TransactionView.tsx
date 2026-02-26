import React, { useState } from 'react';
import { formatETB, formatDate } from '../lib/formatters';
import { TRANSACTIONS, CATEGORIES } from '../lib/mockData';
import { 
  Utensils, 
  ShoppingBag, 
  Bus, 
  Zap, 
  Coffee,
  MoreVertical,
  ChevronRight,
  X,
  Calendar,
  Tag,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction } from '../types';
import { toast } from 'sonner';

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food & dining': return <Utensils />;
    case 'transport': return <Bus />;
    case 'groceries': return <ShoppingBag />;
    case 'entertainment': return <Coffee />;
    default: return <Zap />;
  }
};

const TransactionView = () => {
  const [search, setSearch] = useState('');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const filtered = TRANSACTIONS.filter(t => 
    t.description.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateCategory = (newCat: string) => {
    if (!selectedTx) return;
    setIsUpdating(true);
    // Mock API call delay
    setTimeout(() => {
      toast.success(`Category updated to ${newCat}`);
      setIsUpdating(false);
      setSelectedTx(prev => prev ? { ...prev, category: newCat } : null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <input 
          type="text"
          placeholder="Search transactions..."
          className="w-full bg-[#ECE6F0] rounded-[28px] py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6750A4] transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#49454F]">
          <MoreVertical size={20} className="rotate-90" />
        </div>
      </div>

      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-medium">Transaction History</h3>
        <button className="text-sm font-medium text-[#6750A4]">Filter</button>
      </div>

      <div className="space-y-2">
        {filtered.map((tx) => (
          <div 
            key={tx.id}
            onClick={() => setSelectedTx(tx)}
            className="flex items-center gap-4 p-4 bg-white rounded-[20px] border border-[#CAC4D0]/30 hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100 text-green-700' : 'bg-[#EADDFF] text-[#21005D]'}`}>
              {getCategoryIcon(tx.category)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[#1C1B1F] group-hover:text-[#6750A4] transition-colors">{tx.description}</h4>
              <p className="text-xs text-[#49454F]">{tx.category} \u2022 {formatDate(tx.date)}</p>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-[#1C1B1F]'}`}>
                {tx.amount > 0 ? '+' : ''}{formatETB(tx.amount)}
              </span>
              <ChevronRight size={16} className="text-[#CAC4D0]" />
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTx && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-50 p-6 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-[#CAC4D0] rounded-full mx-auto mb-6 opacity-50" />
              
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedTx.description}</h2>
                  <p className="text-[#49454F]">{formatDate(selectedTx.date)}</p>
                </div>
                <button 
                  onClick={() => setSelectedTx(null)}
                  className="p-2 rounded-full bg-[#F3EDF7] text-[#1D192B]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center mb-8 py-4 bg-[#F3EDF7] rounded-3xl">
                <p className="text-sm text-[#49454F] uppercase tracking-widest mb-1">Amount</p>
                <p className={`text-4xl font-bold ${selectedTx.amount > 0 ? 'text-green-600' : 'text-[#1C1B1F]'}`}>
                  {formatETB(selectedTx.amount)}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EADDFF] flex items-center justify-center text-[#21005D]">
                    <Building2 size={20} />
                  </div>
                  <div className="flex-1 border-b border-[#E7E0EC] pb-2">
                    <p className="text-xs text-[#49454F] uppercase">Institution</p>
                    <p className="font-medium">{selectedTx.institution}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EADDFF] flex items-center justify-center text-[#21005D]">
                    <Tag size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#49454F] uppercase mb-2">Category</p>
                    <select 
                      value={selectedTx.category}
                      onChange={(e) => handleUpdateCategory(e.target.value)}
                      disabled={isUpdating}
                      className="w-full bg-[#F3EDF7] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#6750A4] appearance-none disabled:opacity-50"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedTx(null)}
                className="w-full mt-10 bg-[#6750A4] text-white py-4 rounded-full font-bold shadow-lg shadow-[#6750A4]/20 active:scale-95 transition-all"
              >
                Done
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="rounded-[28px] overflow-hidden mt-6 shadow-sm border border-[#CAC4D0]">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/transaction-details-modal-4c83ce61-1772093891308.webp"
          alt="Visual Transaction Map"
          className="w-full h-40 object-cover"
        />
      </div>
    </div>
  );
};

export default TransactionView;