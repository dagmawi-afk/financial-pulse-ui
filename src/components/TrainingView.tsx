import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const TrainingView = () => {
  const [messages, setMessages] = useState([
    { id: '1', role: 'system', text: 'Paste an SMS from your bank to train the AI parser.' },
    { id: '2', role: 'user', text: 'Birr 450.00 spent at Tomoca Coffee on 12/05/2024. Your balance is Birr 12,450.00' }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      const systemMsg = { 
        id: (Date.now()+1).toString(), 
        role: 'ai', 
        text: 'Parsing detected: Expense of 450 ETB for "Tomoca Coffee". Categorized as "Food & Dining". Is this correct?' 
      };
      setMessages(prev => [...prev, systemMsg]);
      toast.info('AI Parsed new pattern');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="bg-[#6750A4]/10 p-4 rounded-2xl flex items-center gap-3">
        <AlertCircle className="text-[#6750A4]" />
        <p className="text-sm text-[#49454F]">Training improves detection of local bank SMS formats like CBE, Zemen, and Dashen.</p>
      </div>

      <div className="flex-1 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-[20px] shadow-sm ${
              m.role === 'user' 
                ? 'bg-[#EADDFF] text-[#21005D] rounded-tr-none' 
                : m.role === 'ai' 
                  ? 'bg-white border border-[#CAC4D0] text-[#1C1B1F] rounded-tl-none'
                  : 'bg-[#F3EDF7] text-[#49454F] text-xs italic text-center mx-auto'
            }`}>
              {m.text}
              {m.role === 'ai' && (
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 bg-[#6750A4] text-white py-2 rounded-full text-xs font-medium">Yes, Correct</button>
                  <button className="flex-1 border border-[#CAC4D0] py-2 rounded-full text-xs font-medium">No, Edit</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field Simulation */}
      <div className="sticky bottom-4 bg-white border border-[#CAC4D0] rounded-[28px] p-2 flex items-center gap-2 shadow-sm">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste SMS here..."
          className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none resize-none"
          rows={1}
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 rounded-full bg-[#6750A4] text-white flex items-center justify-center hover:bg-[#4F378B] transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default TrainingView;