import { Transaction } from "../../models/transaction";
import { observer } from "mobx-react-lite";

type ConfirmationGraphProps = {
  transaction: Transaction;
};

const getProgress = (transaction: Transaction) => {
  if (transaction.confirmations < Transaction.numConfirmations) {
    return (transaction.confirmations / Transaction.numConfirmations) * 100;
  }
  return 100;
};

export const ConfirmationGraph = observer(
  ({ transaction }: ConfirmationGraphProps) => {
    return (
      <div>
        <div className="flex justify-between">
          <label className="block text-sm font-medium" />
          <span className="text-xs text-textTertiary mr-1 mb-1">
            {transaction.confirmations < Transaction.numConfirmations
              ? transaction.confirmations +
                " of " +
                (Transaction.numConfirmations > 0
                  ? Transaction.numConfirmations.toString()
                  : 0) +
                " Confirmations"
              : "Confirmed"}
          </span>
        </div>
        <div className="w-full bg-surfaceDark shadow-inner rounded-full h-2.5">
          <div
            className="h-2.5 bg-gradient-20 from-gradientStart to-gradientStop rounded-full mr-1"
            style={{
              width: `${getProgress(transaction)}%`,
            }}
          ></div>
        </div>
      </div>
    );
  }
);
