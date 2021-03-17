import { useContext } from "react";
import { TransactionsContext } from "../contexts/Transactions";

export function useTransactions() {
  return useContext(TransactionsContext);
}
