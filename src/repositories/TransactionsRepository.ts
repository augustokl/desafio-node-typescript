import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, cur): number => {
      if (cur.type === 'income') {
        return acc + cur.value;
      }
      return acc;
    }, 0);
    const outcome = this.transactions.reduce((acc, cur): number => {
      if (cur.type === 'outcome') {
        return acc + cur.value;
      }
      return acc;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, type, value });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
