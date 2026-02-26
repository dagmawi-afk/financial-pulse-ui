import React, { useState } from 'react';
import { formatETB, formatDate } from '../lib/formatters';
import { 
  Utensils, 
  ShoppingBag, 
  Bus, 
  Zap, 
  Coffee,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

const MOCK_TRANSACTIONS = [
  { id: '1', title: 'Habesha Restaurant', category: 'Food', amount: -850, date: '2024-05-15T12:00:00', icon: <Utensils /> },
  { id: '2', title: 'Salary Deposit', category: 'Income', amount: 45000, date: '2024-05-14T09:00:00', icon: <Zap className="text-green-600" /> },
  { id: '3', title: 'Anbessa Bus', category: 'Transport', amount: -25, date: '2024-05-14T08:30:00', icon: <Bus /> },
  { id: '4', title: 'Edna Mall Cinema', category: 'Entertainment', amount: -400, date: '2024-05-13T19:00:00', icon: <Coffee /> },
  { id: '5', title: 'Shoa Supermarket', category: 'Groceries', amount: -2150.50, date: '2024-05-13T14:20:00', icon: <ShoppingBag /> },
  { id: '6', title: 'Rent Payment', category: 'Housing', amount: -12000, date: '2024-05-12T10:00:00', icon: <Zap /> },
  { id: '7', title: 'Tomoca Coffee', category: 'Food', amount: -120, date: '2024-05-12T09:00:00', icon: <Coffee /> },
  { id: '8', title: 'Zemen Bank Transfer', category: 'Transfer', amount: 2500, date: '2024-05-11T16:45:00', icon: <Zap className="text-green-600" /> },
];

const TransactionView = () => {
  const [search, setSearch] = useState('');

  const filtered = MOCK_TRANSACTIONS.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Simulation */}
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

      {/* List Header */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-medium">Recent Activity</h3>
        <button className="text-sm font-medium text-[#6750A4]">Filter</button>
      </div>

      {/* "RecyclerView" Simulation */}
      <div className="space-y-2">
        {filtered.map((tx) => (
          <div 
            key={tx.id}
            className="flex items-center gap-4 p-4 bg-white rounded-[16px] border border-[#CAC4D0]/30 hover:bg-[#F3EDF7] transition-colors cursor-pointer group active:scale-[0.98]"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100 text-green-700' : 'bg-[#EADDFF] text-[#21005D]'}`}>
              {tx.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[#1C1B1F] group-hover:text-[#6750A4] transition-colors">{tx.title}</h4>
              <p className="text-xs text-[#49454F]">{tx.category} • {formatDate(tx.date)}</p>
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

      <div className="rounded-[28px] overflow-hidden mt-6 shadow-sm border border-[#CAC4D0]">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/transaction-history-6810ce8e-1772036869595.webp"
          alt="Visual Transaction Map"
          className="w-full h-32 object-cover"
        />
      </div>
    </div>
  );
};

export default TransactionView;