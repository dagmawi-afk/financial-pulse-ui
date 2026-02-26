import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { formatETB } from '../lib/formatters';
import { INSTITUTIONS, CATEGORIES } from '../lib/mockData';
import { Wallet, Plus, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const DashboardView = ({ userName }: { userName: string }) => {
  const [viewType, setViewType] = useState<'total' | 'institution'>('total');
  const [activeInstIndex, setActiveInstIndex] = useState(0);
  
  const [customCategories, setCustomCategories] = useState(CATEGORIES);
  const [newCatName, setNewCatName] = useState('');
  const [newCatType, setNewCatType] = useState<'expense' | 'revenue'>('expense');
  const [newCatValue, setNewCatValue] = useState('');

  const totalBalance = INSTITUTIONS.reduce((acc, inst) => acc + inst.totalBalance, 0);

  const handleAddCategory = () => {
    if (!newCatName || !newCatValue) {
      toast.error('Please fill all fields');
      return;
    }
    const newCat = {
      id: `custom-${Date.now()}`,
      name: newCatName,
      type: newCatType,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      value: parseFloat(newCatValue)
    };
    setCustomCategories(prev => [...prev, newCat as any]);
    setNewCatName('');
    setNewCatValue('');
    toast.success('Category added to visualization');
  };

  const chartData = useMemo(() => {
    return customCategories
      .filter(c => c.type === 'expense')
      .map(c => ({
        name: c.name,
        value: (c as any).value || Math.floor(Math.random() * 5000) + 500,
        color: c.color
      }));
  }, [customCategories]);

  return (
    <div className="space-y-6">
      <div className="flex bg-[#E7E0EC] p-1 rounded-full w-fit mx-auto shadow-inner">
        <button 
          onClick={() => setViewType('total')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${viewType === 'total' ? 'bg-white text-[#6750A4] shadow-sm' : 'text-[#49454F]'}`}
        >
          Total View
        </button>
        <button 
          onClick={() => setViewType('institution')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${viewType === 'institution' ? 'bg-white text-[#6750A4] shadow-sm' : 'text-[#49454F]'}`}
        >
          Institutions
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewType === 'total' ? (
          <motion.div 
            key="total-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#6750A4] text-white p-6 rounded-[28px] shadow-sm relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-sm opacity-90">Consolidated Balance</p>
                <h2 className="text-3xl font-bold tracking-tight">{formatETB(totalBalance)}</h2>
              </div>
              <div className="bg-white/20 p-2 rounded-xl">
                <Wallet size={24} />
              </div>
            </div>
            <div className="flex gap-4 relative z-10">
              <div className="flex-1 bg-white/10 rounded-2xl p-3">
                <p className="text-[10px] uppercase opacity-80 mb-1">Revenue</p>
                <p className="font-bold text-lg">{formatETB(45000)}</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-2xl p-3">
                <p className="text-[10px] uppercase opacity-80 mb-1">Expense</p>
                <p className="font-bold text-lg">{formatETB(12400)}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="inst-carousel"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Financial Institutions</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveInstIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeInstIndex === 0}
                  className="p-2 rounded-full bg-white border border-[#CAC4D0] disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveInstIndex(prev => Math.min(INSTITUTIONS.length - 1, prev + 1))}
                  disabled={activeInstIndex === INSTITUTIONS.length - 1}
                  className="p-2 rounded-full bg-white border border-[#CAC4D0] disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px]">
               <motion.div 
                 animate={{ x: `-${activeInstIndex * 100}%` }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 className="flex"
               >
                 {INSTITUTIONS.map((inst) => (
                   <div key={inst.id} className="min-w-full p-1">
                     <div className="bg-white border-2 border-[#6750A4] p-6 rounded-[28px] shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-[#F3EDF7] rounded-full flex items-center justify-center text-[#6750A4]">
                            <CreditCard size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{inst.name}</h4>
                            <p className="text-xs text-[#49454F]">{inst.accounts.length} Accounts</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {inst.accounts.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center py-2 border-b border-[#E7E0EC] last:border-0">
                              <span className="text-sm text-[#49454F]">{acc.name}</span>
                              <span className="font-bold">{formatETB(acc.balance)}</span>
                            </div>
                          ))}
                          <div className="pt-2 flex justify-between items-center">
                            <span className="text-sm font-medium">Total</span>
                            <span className="text-xl font-bold text-[#6750A4]">{formatETB(inst.totalBalance)}</span>
                          </div>
                        </div>
                     </div>
                   </div>
                 ))}
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="space-y-4">
        <h3 className="text-lg font-medium px-1">Category Distribution</h3>
        <div className="bg-white p-6 rounded-[28px] border border-[#CAC4D0] shadow-sm">
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => formatETB(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 border-t border-[#E7E0EC] pt-4">
            <p className="text-sm font-medium text-[#49454F]">Add Custom Category</p>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="Category Name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="col-span-2 bg-[#F3EDF7] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6750A4]"
              />
              <select 
                value={newCatType}
                onChange={(e) => setNewCatType(e.target.value as any)}
                className="bg-[#F3EDF7] rounded-xl px-3 py-2 text-sm focus:outline-none"
              >
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
              </select>
              <input 
                type="number" 
                placeholder="Amount (ETB)"
                value={newCatValue}
                onChange={(e) => setNewCatValue(e.target.value)}
                className="bg-[#F3EDF7] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6750A4]"
              />
            </div>
            <button 
              onClick={handleAddCategory}
              className="w-full bg-[#6750A4] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Plus size={18} />
              Create Category
            </button>
          </div>
        </div>
      </section>

      <div className="rounded-[28px] overflow-hidden border border-[#CAC4D0] shadow-sm relative group cursor-pointer">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/dashboard-categories-visualization-308fb979-1772093892033.webp" 
          alt="Dashboard Categories Insight"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <p className="text-white font-medium">Monthly Analysis Visualization</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;