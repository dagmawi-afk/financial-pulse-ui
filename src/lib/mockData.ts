import { Transaction, BankAccount, Budget, Institution, Category } from '../types';
import { subDays, format } from 'date-fns';

export const INSTITUTIONS: Institution[] = [
  {
    id: 'inst-1',
    name: 'Commercial Bank of Ethiopia',
    code: 'CBE',
    totalBalance: 85400.50,
    accounts: [
      { id: '1', name: 'Main Savings', balance: 65400.50, institution: 'CBE' },
      { id: '2', name: 'Student Account', balance: 20000.00, institution: 'CBE' }
    ]
  },
  {
    id: 'inst-2',
    name: 'Dashen Bank',
    code: 'DASHEN',
    totalBalance: 32100.00,
    accounts: [
      { id: '3', name: 'Checking', balance: 32100.00, institution: 'DASHEN' }
    ]
  },
  {
    id: 'inst-3',
    name: 'Zemen Bank',
    code: 'ZEMEN',
    totalBalance: 7000.00,
    accounts: [
      { id: '4', name: 'Investment', balance: 7000.00, institution: 'ZEMEN' }
    ]
  }
];

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Food & Dining', type: 'expense', color: '#6750A4' },
  { id: 'c2', name: 'Rent', type: 'expense', color: '#B3261E' },
  { id: 'c3', name: 'Transport', type: 'expense', color: '#033D4D' },
  { id: 'c4', name: 'Salary', type: 'revenue', color: '#2E7D32' },
  { id: 'c5', name: 'Freelance', type: 'revenue', color: '#1976D2' },
  { id: 'c6', name: 'Groceries', type: 'expense', color: '#F57C00' },
];

const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const types: Transaction['type'][] = ['expense', 'revenue'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const inst = INSTITUTIONS[Math.floor(Math.random() * INSTITUTIONS.length)];
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const amount = type === 'revenue' ? Math.random() * 50000 : -(Math.random() * 5000);
    
    transactions.push({
      id: `tx-${i}`,
      date: format(subDays(new Date(), Math.floor(Math.random() * 90)), 'yyyy-MM-dd HH:mm:ss'),
      description: `Payment ${i}`,
      amount: Number(amount.toFixed(2)),
      type,
      category: cat.name,
      institution: inst.name,
      bankAccount: inst.accounts[0].name,
      tags: ['Auto-parsed'],
    });
  }
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const TRANSACTIONS = generateTransactions(50);

export const BUDGETS: Budget[] = [
  { id: 'b1', category: 'Food & Dining', limit: 8000, spent: 4500, period: 'monthly', startDate: '2024-05-01', endDate: '2024-05-31' },
  { id: 'b2', category: 'Transport', limit: 2000, spent: 1800, period: 'monthly', startDate: '2024-05-01', endDate: '2024-05-31' },
  { id: 'b3', category: 'Groceries', limit: 5000, spent: 3200, period: 'monthly', startDate: '2024-05-01', endDate: '2024-05-31' },
];