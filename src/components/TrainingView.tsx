import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Edit, MousePointer2, Tag, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../lib/mockData';

const TrainingView = () => {
  const [smsText, setSmsText] = useState('');
  const [parsedItems, setParsedItems] = useState<any[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{word: string, index: number} | null>(null);

  const handleManualParse = () => {
    if (!smsText.trim()) return;
    setIsParsing(true);
    
    // Simulate AI parsing results
    setTimeout(() => {
      const words = smsText.split(' ');
      const mockParsed = [
        { id: 1, label: 'Amount', value: '450.00', color: 'bg-green-100 text-green-700' },
        { id: 2, label: 'Merchant', value: 'Tomoca', color: 'bg-blue-100 text-blue-700' },
        { id: 3, label: 'Date', value: '12/05/2024', color: 'bg-orange-100 text-orange-700' }
      ];
      setParsedItems(mockParsed);
      setIsParsing(false);
      toast.success('Initial parsing complete! Please verify.');
    }, 1200);
  };

  const handleVerify = () => {
    toast.success('New pattern learned! Future SMS from this bank will be auto-parsed.');
    setSmsText('');
    setParsedItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#6750A4]/10 p-5 rounded-[28px] flex items-start gap-4">
        <div className="bg-white p-2 rounded-xl shadow-sm text-[#6750A4]">
          <AlertCircle />
        </div>
        <div>
          <h4 className="font-bold text-[#1C1B1F]">AI SMS Trainer</h4>
          <p className="text-sm text-[#49454F]">Help Dala learn your bank's SMS format by highlighting key data points.</p>
        </div>
      </div>

      {/* Step 1: Input SMS */}
      <div className="bg-white border border-[#CAC4D0] rounded-[28px] p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-[#6750A4] text-white flex items-center justify-center text-[10px] font-bold">1</div>
          <h5 className="font-medium">Paste raw SMS message</h5>
        </div>
        <textarea 
          value={smsText}
          onChange={(e) => setSmsText(e.target.value)}
          placeholder="Example: Your account 1234 was debited for ETB 500 at Shoa Supermarket..."
          className="w-full bg-[#F3EDF7] rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#6750A4] resize-none min-h-[100px]"
        />
        <button 
          onClick={handleManualParse}
          disabled={isParsing || !smsText.trim()}
          className="w-full bg-[#6750A4] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isParsing ? 'Processing...' : 'Analyze Pattern'}
        </button>
      </div>

      {/* Step 2: Verification */}
      <AnimatePresence>
        {parsedItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#CAC4D0] rounded-[28px] p-6 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#6750A4] text-white flex items-center justify-center text-[10px] font-bold">2</div>
              <h5 className="font-medium">Verify and classify data points</h5>
            </div>

            <div className="space-y-4">
              {parsedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#F3EDF7]/50 border border-[#E7E0EC]">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#49454F]">{item.label}</span>
                    <p className="font-bold text-[#1C1B1F]">{item.value}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-white text-[#6750A4]"><Edit size={16} /></button>
                    <button className="p-2 rounded-full bg-[#6750A4] text-white"><Check size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-100 space-y-3">
              <div className="flex items-center gap-2 text-yellow-800 text-xs font-bold">
                <Tag size={14} /> ASSIGN FINAL CATEGORY
              </div>
              <select className="w-full bg-white rounded-xl px-4 py-2 text-sm focus:outline-none border border-yellow-200">
                {CATEGORIES.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
            </div>

            <button 
              onClick={handleVerify}
              className="w-full bg-[#2E7D32] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <CheckCircle2 size={20} />
              Save Pattern
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-[28px] overflow-hidden border border-[#CAC4D0] shadow-sm relative h-40">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d96fef-1e7f-4614-b2d8-5f31236ead96/sms-parser-training-interface-74b98961-1772093893539.webp" 
          alt="AI Training Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
           <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold uppercase">
             <MousePointer2 size={14} /> Interactive Mode Active
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingView;