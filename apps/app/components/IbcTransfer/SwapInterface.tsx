import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@nomic-ui/components";
import { LoadableButton } from "../LoadableButton";
import { TransferEndpoint } from "./TransferEndpoint";
import { useContext, useEffect, useState } from "react";
import { NomicContext } from "../../contexts/NomicContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { IbcChain } from "../../models/ibc-chain";
import { displayBtc } from "@nomic-ui/utils";
import { config } from "../../config";
import { Metamask } from "../../models/wallet/metamask";
import { Keplr } from "../../models/wallet/keplr";
import Image from "next/image";
import { observer } from "mobx-react-lite";

export interface Props {
  chainBalances: { [chainId: string]: bigint };
  sourceChain: IbcChain;
  destinationChain: IbcChain;
  updateBalances: () => Promise<void>;
  swapChains: () => void;
}

export const SwapInterface = observer(
  ({
    chainBalances,
    sourceChain,
    destinationChain,
    updateBalances,
    swapChains,
  }: Props) => {
    const nomic = useContext(NomicContext);
    const error = useContext(ErrorContext);
    const [inputValue, setInputValue] = useState("");
    const [transferAmount, setTransferAmount] = useState(0n);
    const [transferLoading, setTransferLoading] = useState(false);
    const [destinationAddress, setDestinationAddress] = useState("");

    useEffect(() => {
      if (document.getElementById("ibc_input") as HTMLInputElement) {
        setInputValue(
          (document.getElementById("ibc_input") as HTMLInputElement).value
        );
      }
    }, []);

    useEffect(() => {
      async function getBalances() {
        if (!nomic.initialized || !nomic.wallet) return;
        await updateBalances();
      }
      getBalances();
    }, []);

    const clearTransferState = () => {
      const transferInput = document.getElementById(
        "ibc_input"
      ) as HTMLInputElement;
      transferInput.value = "";
      setTransferAmount(0n);
      setDestinationAddress("");
    };

    const transferBitcoinOut = async () => {
      try {
        await nomic.ibcTransferOut(
          transferAmount,
          "usat",
          destinationAddress,
          destinationChain.destination.channelId,
          destinationChain.destination.port
        );
      } catch (e) {
        //need to check if osmosis tries to add the chain
        error.setErrorMessage(e.message);
        error.setShowError(true);
      }
      clearTransferState();
      await updateBalances();
    };

    const transferBitcoinIn = async () => {
      try {
        await nomic.ibcTransferIn(
          transferAmount,
          destinationAddress,
          sourceChain
        );
        setTransferAmount(0n);
      } catch (e) {
        error.setErrorMessage(e.message);
        error.setShowError(true);
      }
      clearTransferState();
      await updateBalances();
    };

    const setMax = () => {
      const transferInput = document.getElementById(
        "ibc_input"
      ) as HTMLInputElement;
      const amount = chainBalances[sourceChain.chainId];
      setTransferAmount(amount);
      setInputValue(displayBtc(amount, false));
      transferInput.value = displayBtc(amount, false);
    };

    const autoFill = async () => {
      const addressInput = document.getElementById(
        "address_input"
      ) as HTMLInputElement;
      const key = await window.keplr.getKey(destinationChain.chainId);
      setDestinationAddress(key.bech32Address);
      addressInput.value = key.bech32Address;
    };

    return (
      <div className="flex flex-col w-full justify-center items-center gap-4 relative text-textPrimary z-10">
        <h3 className="w-full uppercase text-transparent text-md font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          Ibc Transfer
        </h3>
        <TransferEndpoint
          chain={sourceChain}
          balance={chainBalances[sourceChain.chainId]}
        />
        {nomic.wallet instanceof Metamask ? (
          <div className="p-0.5" />
        ) : (
          <button
            className="rounded-lg bg-surface p-1 -mt-10 h-full z-10"
            onClick={() => {
              const addressInput = document.getElementById(
                "address_input"
              ) as HTMLInputElement;
              addressInput.value = "";
              setDestinationAddress("");
              swapChains();
            }}
          >
            <div className="rounded-md bg-surfaceModal hover:bg-modalTooltip flex items-center justify-content p-2">
              <ArrowsUpDownIcon className="h-5 w-5" />
            </div>
          </button>
        )}
        <TransferEndpoint
          className="-mt-8"
          source={false}
          chain={destinationChain}
          balance={chainBalances[destinationChain.chainId]}
        />
        <div className="w-full relative border border-textTertiary rounded-md px-3 py-2 shadow-sm mt-3">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-surface text-xs font-medium text-textSecondary"
          >
            Amount to Transfer
          </label>
          <input
            type="number"
            id="ibc_input"
            placeholder="0.0"
            autoComplete="off"
            className="bg-surface block w-full border-0 p-0 text-textPrimary placeholder-textSecondary focus:ring-0 focus:outline-none"
            onChange={(e) => {
              setInputValue(e.target.value);
              setTransferAmount(
                BigInt(Math.floor(Number(e.target.value) * 1e14))
              );
            }}
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <Button
              className="inline-flex justify-center align-text-center rounded-md border border-transparent shadow-sm !px-2 !py-0 bg-gradientStart text-textPrimary focus:outline-none"
              onClick={() => {
                setMax();
              }}
            >
              MAX
            </Button>
            <div className="inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-none">
              <div
                className="text-textPrimary font-md sm:text-md"
                id="price-currency"
              >
                BTC
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <div className="w-full relative border border-textTertiary rounded-md px-3 py-2 shadow-sm mt-3">
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-surface text-xs font-medium text-textSecondary"
            >
              Destination Address
            </label>
            <input
              type="string"
              id="address_input"
              autoComplete="off"
              className="bg-surface block w-full border-0 p-0 text-textPrimary placeholder-textSecondary focus:ring-0 focus:outline-none"
              onChange={(e) => {
                setDestinationAddress(e.target.value);
              }}
            />
          </div>
          {!(nomic.wallet instanceof Keplr) ? null : (
            <button
              className="bg-opacity-25 bg-gradientStart px-3 py-2 mt-3 rounded-md w-1/5"
              onClick={async () => {
                await autoFill();
              }}
            >
              <div className="flex flex-row items-center justify-center gap-2">
                Fill
                <Image
                  src="/keplr.svg"
                  alt={`keplr logo`}
                  height={24}
                  width={24}
                />
              </div>
            </button>
          )}
        </div>
        <LoadableButton
          className={"w-full mt-4"}
          activeText={"Transfer"}
          loadingText={"Transferring..."}
          isLoading={transferLoading}
          setIsLoading={setTransferLoading}
          colorClass={"bg-gradientStart"}
          inactiveColorClass={"bg-textTertiary"}
          isActive={
            !!inputValue && Number(inputValue) > 0 && !!destinationAddress
          }
          onClick={async () => {
            if (sourceChain.chainId == config.chainId) {
              await transferBitcoinOut();
            } else {
              await transferBitcoinIn();
            }
          }}
        />
      </div>
    );
  }
);
