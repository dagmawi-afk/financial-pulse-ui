import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatETB } from '../lib/formatters';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';

const data = [
  { name: 'Mon', value: 4500, type: 'Income' },
  { name: 'Tue', value: 2800, type: 'Expense' },
  { name: 'Wed', value: 3900, type: 'Income' },
  { name: 'Thu', value: 5000, type: 'Income' },
  { name: 'Fri', value: 4200, type: 'Expense' },
  { name: 'Sat', value: 1500, type: 'Expense' },
  { name: 'Sun', value: 3000, type: 'Income' },
];

const DashboardView = ({ userName }: { userName: string }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-[#6750A4] text-white p-6 rounded-[28px] shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm opacity-90">Welcome back,</p>
            <h2 className="text-2xl font-bold">{userName || 'User'}</h2>
          </div>
          <div className="bg-white/20 p-2 rounded-xl">
            <Wallet size={24} />
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider opacity-80 font-medium">Total Balance</p>
          <p className="text-4xl font-bold tracking-tight">{formatETB(124500.50)}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <div className="flex-1 bg-white/10 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-green-400/20 p-2 rounded-lg text-green-300">
              <ArrowUpRight size={18} />
            </div>
            <div>
              <p className="text-[10px] opacity-80 uppercase">Income</p>
              <p className="font-semibold text-sm">{formatETB(4500)}</p>
            </div>
          </div>
          <div className="flex-1 bg-white/10 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-red-400/20 p-2 rounded-lg text-red-300">
              <ArrowDownLeft size={18} />
            </div>
            <div>
              <p className="text-[10px] opacity-80 uppercase">Expenses</p>
              <p className="font-semibold text-sm">{formatETB(1200)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium px-1">Expense Trend</h3>
        <div className="bg-white p-4 rounded-[28px] border border-[#CAC4D0] h-64 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E0EC" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#49454F' }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#F3EDF7' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [formatETB(Number(value || 0)), '']}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.type === 'Income' ? '#B3261E' : '#6750A4'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Generated Image Simulation */}
      <div className="rounded-[28px] overflow-hidden border border-[#CAC4D0] shadow-sm relative group cursor-pointer">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/dashboard-overview-3aa8d549-1772036869975.webp" 
          alt="Dashboard Insights"
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <p className="text-white font-medium">View AI Insights</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;