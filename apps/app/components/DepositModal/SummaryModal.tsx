import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ConfirmationContext } from "../../contexts/ConfirmationContext";
import { BitcoinContext } from "../../contexts/BitcoinContext";
import { Transaction } from "../../models/transaction";
import { ConfirmationGraph } from "./ConfirmationGraph";
import { displayBtc, removeUrlQueryParams } from "@nomic-ui/utils";
import { Transaction404 } from "./Transaction404";
import { Button } from "@nomic-ui/components";
import { useRouter } from "next/router";

export const SummaryModal = observer(() => {
  const bitcoin = useContext(BitcoinContext);
  const confirmation = useContext(ConfirmationContext);
  const router = useRouter();

  return (
    <>
      {bitcoin.selectedTransaction ? (
        <div className="flex flex-col justify-center gap-8">
          <div className="w-full text-center text-textPrimary text-2xl flex flex-col gap-6">
            <h1 className="font-semibold"> Deposit Pending </h1>
            <div className="w-full flex flex-col gap-2">
              <h2>
                {"≈ " + displayBtc(bitcoin.selectedTransaction.resolveAmount())}
              </h2>
              <h3 className="italic text-sm text-textSecondary gap-2">
                *Funds will become available after{" "}
                {Transaction.numConfirmations} confirmations
              </h3>
            </div>
          </div>
          <ConfirmationGraph transaction={bitcoin.selectedTransaction} />
          <div className="flex flex-col text-sm text-textPrimary">
            <div className="flow-root mb-2">
              <h2 className="float-left"> Deposit Amount: </h2>
              <h3 className="float-right">
                {displayBtc(bitcoin.selectedTransaction.amount)}
              </h3>
            </div>
            <div className="flow-root mb-2">
              <h2 className="float-left"> Bitcoin Transaction Fee: </h2>
              <h3 className="float-right">
                {displayBtc(Transaction.btcDepositFee)}
              </h3>
            </div>
            <div className="flow-root">
              <h2 className="float-left"> Nomic Bridge Fee: </h2>
              <h3 className="float-right">
                {displayBtc(bitcoin.selectedTransaction.resolveFeeAmount())}
              </h3>
            </div>
          </div>
          <Button
            className="w-full text-md font-semibold rounded-md text-white bg-gradientStart"
            onClick={() => {
              confirmation.confirmed = false;
              removeUrlQueryParams(router, "deposit");
            }}
          >
            Close
          </Button>
        </div>
      ) : (
        <Transaction404 />
      )}
    </>
  );
});
