import React, { useState, useEffect } from 'react';
import { User, Shield, Bell, HelpCircle, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const ProfileView = ({ onNameChange }: { onNameChange: (name: string) => void }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    if (savedName) setName(savedName);
  }, []);

  const handleSave = () => {
    localStorage.setItem('user_name', name);
    onNameChange(name);
    toast.success('Settings updated successfully', {
      description: 'Your profile name has been updated.',
      className: 'bg-[#F3EDF7] border-[#6750A4] text-[#1C1B1F]'
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center py-6 gap-3">
        <div className="w-24 h-24 rounded-full bg-[#EADDFF] flex items-center justify-center text-[#21005D] text-3xl font-bold border-4 border-white shadow-sm">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 className="text-xl font-medium">{name || 'New User'}</h2>
        <p className="text-sm text-[#49454F]">Member since May 2024</p>
      </div>

      {/* "SharedPreferences" Simulation Section */}
      <div className="bg-white p-6 rounded-[28px] border border-[#CAC4D0] shadow-sm space-y-6">
        <h3 className="font-medium text-[#1C1B1F]">Personal Information</h3>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#6750A4] ml-1">Your Name (Persistent)</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-[#F3EDF7] rounded-xl px-4 py-3 border-b-2 border-transparent focus:border-[#6750A4] focus:outline-none transition-all placeholder:text-[#49454F]/50"
            />
            <p className="text-[10px] text-[#49454F] ml-1">This name is stored in SharedPreferences (local storage).</p>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-[#6750A4] text-white rounded-full py-3 font-medium shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-2">
        <MenuButton icon={<Shield size={20} />} label="Security & Privacy" />
        <MenuButton icon={<Bell size={20} />} label="Notification Settings" />
        <MenuButton icon={<HelpCircle size={20} />} label="Support Center" />
        <MenuButton icon={<LogOut size={20} />} label="Sign Out" danger />
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, danger = false }: { icon: React.ReactNode, label: string, danger?: boolean }) => (
  <button className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F3EDF7] transition-colors ${danger ? 'text-[#B3261E]' : 'text-[#1C1B1F]'}`}>
    <div className={`p-2 rounded-xl ${danger ? 'bg-red-50' : 'bg-[#EADDFF]/50'}`}>
      {icon}
    </div>
    <span className="flex-1 text-left font-medium">{label}</span>
    <div className="text-[#CAC4D0]">
      <User size={16} />
    </div>
  </button>
);

export default ProfileView;