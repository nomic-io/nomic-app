import { useContext, useEffect } from "react";
import { NomicContext } from "../contexts/NomicContext";
import { BitcoinPageHeader } from "../components/BitcoinPageHeader/BitcoinPageHeader";
import { DepositModal } from "../components/DepositModal/DepositModal";
import { WithdrawModal } from "../components/WithdrawModal/WithdrawModal";
import { TransactionListCard } from "../components/TransactionList/TransactionListCard";

export default function BitcoinPage() {
  const nomic = useContext(NomicContext);

  return (
    <div className="flex flex-col gap-6">
      <DepositModal />
      <WithdrawModal />
      <BitcoinPageHeader />
      <TransactionListCard />
    </div>
  );
}
