export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'expense' | 'revenue' | 'transfer' | 'withdrawal';
  category: string;
  bankAccount: string;
  tags: string[];
}

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  institution: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface SMSPattern {
  id: string;
  rawText: string;
  parsedData?: Partial<Transaction>;
  status: 'pending' | 'validated';
}