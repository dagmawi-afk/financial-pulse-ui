import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  History, 
  PieChart, 
  Settings, 
  Search,
  Bell,
  Plus,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import DashboardView from './components/DashboardView';
import TransactionView from './components/TransactionView';
import BudgetView from './components/BudgetView';
import ProfileView from './components/ProfileView';
import TrainingView from './components/TrainingView';

const App = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'budget' | 'training' | 'profile'>('dashboard');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    if (savedName) setUserName(savedName);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView userName={userName} />;
      case 'transactions': return <TransactionView />;
      case 'budget': return <BudgetView />;
      case 'training': return <TrainingView />;
      case 'profile': return <ProfileView onNameChange={setUserName} />;
      default: return <DashboardView userName={userName} />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Financial Overview';
      case 'transactions': return 'Transaction History';
      case 'budget': return 'My Budgets';
      case 'training': return 'SMS Training';
      case 'profile': return 'Profile Settings';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDF8FD] text-[#1C1B1F] font-sans overflow-hidden">
      <header className="px-4 py-3 flex items-center justify-between bg-[#FDF8FD] z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#EADDFF] flex items-center justify-center text-[#21005D] font-bold">
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <h1 className="text-xl font-medium tracking-tight text-[#1C1B1F]">
            {getTitle()}
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
            <Search size={24} />
          </button>
          <button className="p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors relative">
            <Bell size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#B3261E] rounded-full border-2 border-[#FDF8FD]"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="p-4"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-[#EADDFF] text-[#21005D] rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-20"
      >
        <Plus size={28} />
      </motion.button>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#F3EDF7] border-t border-[#E7E0EC] h-20 px-1 flex items-center justify-around z-30">
        <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={22} />} label="Home" />
        <NavItem active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} icon={<History size={22} />} label="History" />
        <NavItem active={activeTab === 'budget'} onClick={() => setActiveTab('budget')} icon={<PieChart size={22} />} label="Budget" />
        <NavItem active={activeTab === 'training'} onClick={() => setActiveTab('training')} icon={<BookOpen size={22} />} label="Training" />
        <NavItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<Settings size={22} />} label="Settings" />
      </nav>

      <Toaster position="top-center" richColors />
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 gap-1 group py-2">
    <div className={`relative px-4 py-1 rounded-full transition-all duration-300 flex items-center justify-center ${active ? 'bg-[#E8DEF8] text-[#1D192B]' : 'text-[#49454F] group-hover:bg-black/5'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium transition-colors ${active ? 'text-[#1D192B]' : 'text-[#49454F]'}`}>
      {label}
    </span>
  </button>
);

export default App;