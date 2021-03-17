import { ReactNode, useEffect, useState } from "react";
import { Type } from "../components/NewTransactionModal";
import { TransactionsContext } from "../contexts/Transactions";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: ReactNode;
}

export interface TransactionItemProps {
  id: number;
  title: string;
  type: Type;
  category: string;
  amount: number;
  createdAt: string;
}

export type NewTransactionInput = Omit<
  TransactionItemProps,
  "id" | "createdAt"
>;

interface TransactionResponseProps {
  transaction: TransactionItemProps;
}

interface TransactionsResponseProps {
  transactions: TransactionItemProps[];
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionItemProps[]>([]);

  async function createTransaction(transaction: NewTransactionInput) {
    const response = await api.post<TransactionResponseProps>(
      "/transactions",
      transaction
    );
    return setTransactions([...transactions, response.data.transaction]);
  }

  useEffect(() => {
    api
      .get<TransactionsResponseProps>("/transactions")
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
