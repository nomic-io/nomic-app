import { useContext, useEffect } from "react";
import { BitcoinContext } from "../../contexts/BitcoinContext";
import { NomicContext } from "../../contexts/NomicContext";
import { observer } from "mobx-react-lite";
import { displayBtc, updateUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";

export const TransactionList = observer(() => {
  const bitcoin = useContext(BitcoinContext);
  const nomic = useContext(NomicContext);
  const router = useRouter();

  useEffect(() => {
    bitcoin.transactions.forEach(async (transaction) => {
      await transaction.getTransactionBlockHeight();
      await transaction.updateConfirmations(nomic.btcBlockHeight);
    });
  }, [nomic.btcBlockHeight, bitcoin.transactions]);

  return (
    <div className="flex flex-col rounded-lg">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden rounded-b-lg">
            <table className="min-w-full divide-y divide-surfaceDark">
              <thead className="bg-surfaceDark">
                <tr className="shadow-inner text-textTertiary">
                  <th
                    scope="col"
                    className="pl-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="pl-2 pr-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-surfaceDark w-full">
                {bitcoin.transactions
                  .slice()
                  .reverse()
                  .map((transaction, i) => (
                    <tr
                      key={i}
                      role="button"
                      className="transform hover:-translate-y-1 hover:shadow-lg hover:bg-surfaceModal text-textPrimary"
                      onClick={() => {
                        bitcoin.selectedTransaction = transaction;
                        updateUrlQueryParams(router, {
                          key: "deposit",
                          value: "summary",
                        });
                      }}
                    >
                      <td className="pl-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{transaction.getType()}</div>
                      </td>
                      <td className="pl-2 pr-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {"≈ " + displayBtc(transaction.resolveAmount())}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-regular">
                          {transaction.date.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-regular">
                          {transaction.getStatus()}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
