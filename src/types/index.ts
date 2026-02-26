export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  type: 'expense' | 'income';
  description: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

export interface UserState {
  name: string;
  balance: number;
}