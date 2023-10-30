import { useContext } from "react";
import { TransactionListHeader } from "./TransactionListHeader";
import { TransactionList } from "./TransactionList";
import { BitcoinContext } from "../../contexts/BitcoinContext";
import { NomicContext } from "../../contexts/NomicContext";
import { observer } from "mobx-react-lite";

export const TransactionListCard = observer(() => {
  const bitcoin = useContext(BitcoinContext);
  const nomic = useContext(NomicContext);

  return bitcoin.transactions.length > 0 && nomic.wallet.connected ? (
    <div className="shadow rounded-lg">
      <TransactionListHeader />
      <TransactionList />
    </div>
  ) : null;
});
