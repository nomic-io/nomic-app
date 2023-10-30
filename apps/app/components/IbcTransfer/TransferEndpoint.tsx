import { useContext } from "react";
import { NomicContext } from "../../contexts/NomicContext";
import { classJoin, displayBtc } from "@nomic-ui/utils";
import { ChainMenu } from "./ChainMenu";
import { observer } from "mobx-react-lite";
import { IbcChain } from "../../models/ibc-chain";
import { Metamask } from "../../models/wallet/metamask";

export interface TransferEndpointProps {
  className?: string;
  source?: boolean;
  chain: IbcChain;
  balance: bigint;
  displayBalance?: boolean;
}

export const TransferEndpoint = observer(
  ({
    className = "",
    source = true,
    chain,
    balance,
  }: TransferEndpointProps) => {
    const nomic = useContext(NomicContext);
    const displayBalance = nomic.wallet?.queryableBalances.includes(chain.name);

    return (
      <div
        className={classJoin(
          "bg-surfaceModal rounded-lg",
          "h-full w-full p-3",
          className
        )}
      >
        <div className="flex flex-col gap-4 pb-3">
          <div className="flex justify-between">
            <h3 className="w-full uppercase text-textTertiary text-sm font-medium">
              {source ? "Source Chain" : "Destination Chain"}
            </h3>
            {!displayBalance ? null : (
              <h3 className="w-full uppercase text-textTertiary text-sm font-medium text-right">
                Available Balance
              </h3>
            )}
          </div>
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-col w-2/3">
              <ChainMenu source={source} chain={chain} />
            </div>
            <div className="text-right w-1/3 text-xl font-medium">
              {!displayBalance ? null : typeof balance != "bigint" ? (
                <>
                  <div className="italic text-sm text-left text-textSecondary font-regular">
                    {" "}
                    Add {chain.chainId} to Keplr{" "}
                  </div>
                </>
              ) : (
                <>
                  <span> {displayBtc(balance, false)} </span>
                  <span className="text-textSecondary text-lg"> BTC </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
