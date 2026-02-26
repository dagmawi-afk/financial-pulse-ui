import { Transaction, BankAccount, Budget, SMSPattern } from '../types';
import { subDays, format } from 'date-fns';

export const BANK_ACCOUNTS: BankAccount[] = [
  { id: '1', name: 'Main Checking', balance: 5240.50, institution: 'Chase' },
  { id: '2', name: 'Savings', balance: 12850.20, institution: 'Ally' },
  { id: '3', name: 'Business Account', balance: 3420.00, institution: 'Mercury' },
];

export const CATEGORIES = [
  'Food & Dining', 'Housing', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Salary', 'Investment'
];

const generateTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const types: Transaction['type'][] = ['expense', 'revenue', 'transfer', 'withdrawal'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = type === 'revenue' ? Math.random() * 5000 : -(Math.random() * 500);
    transactions.push({
      id: `tx-${i}`,
      date: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
      description: `Transaction ${i}`,
      amount: Number(amount.toFixed(2)),
      type,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      bankAccount: BANK_ACCOUNTS[Math.floor(Math.random() * BANK_ACCOUNTS.length)].name,
      tags: ['Auto-parsed', 'Verified'],
    });
  }
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const TRANSACTIONS = generateTransactions(2000);

export const BUDGETS: Budget[] = [
  { id: 'b1', category: 'Food & Dining', limit: 800, spent: 650, period: 'monthly' },
  { id: 'b2', category: 'Entertainment', limit: 200, spent: 210, period: 'monthly' },
  { id: 'b3', category: 'Transportation', limit: 300, spent: 120, period: 'monthly' },
];

export const SMS_PATTERNS: SMSPattern[] = [
  { id: 'p1', rawText: 'Alert: Your card ending in 1234 was used for $45.20 at STARBUCKS on 05/20/23.', status: 'pending' },
  { id: 'p2', rawText: 'Mercury: Transfer of $1,200.00 from Main Checking received.', status: 'pending' },
  { id: 'p3', rawText: 'Chase: Withdrawal of $100.00 from ATM 5521.', status: 'pending' },
];