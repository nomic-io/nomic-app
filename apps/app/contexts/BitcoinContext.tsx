import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Transaction } from "../models/transaction";

class Bitcoin {
  transactions: Transaction[] = [];
  btcPrice: number | null;
  selectedTransaction: Transaction | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadTransactions(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  async getBitcoinPrice(): Promise<void> {
    await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => response.json())
      .then((data) => {
        this.btcPrice = data?.bpi?.USD?.rate_float
          ? data.bpi.USD.rate_float
          : this.btcPrice;
      });
  }
}

export const BitcoinContext = createContext(new Bitcoin());
