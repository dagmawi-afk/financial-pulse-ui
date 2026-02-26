export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'expense' | 'revenue' | 'transfer' | 'withdrawal';
  category: string;
  bankAccount: string;
  institution: string;
  tags: string[];
}

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  institution: string;
  icon?: string;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  totalBalance: number;
  accounts: BankAccount[];
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'revenue';
  color: string;
}

export interface SMSPattern {
  id: string;
  rawText: string;
  parsedData?: Partial<Transaction>;
  status: 'pending' | 'validated';
}