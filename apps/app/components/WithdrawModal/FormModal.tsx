import { useContext, useState } from "react";
import { NomicContext } from "../../contexts/NomicContext";
import { LoadableButton } from "../LoadableButton";
import { Button } from "@nomic-ui/components";
import { displayBtc, removeUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";

export const FormModal = () => {
  const nomic = useContext(NomicContext);
  const router = useRouter();
  const [input, setInput] = useState(BigInt(0));
  const [address, setAddress] = useState("");
  const [displayMax, setDisplayMax] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const setMax = (val: bigint) => {
    const input = document.getElementById("withdraw-input") as HTMLInputElement;
    if (!displayMax) {
      const displayVal = displayBtc(val, false);
      input.value = displayVal;
      setInput(
        BigInt((Number(displayVal) * Number(nomic.nbtcModifier)).toFixed(0))
      );
      setDisplayMax(true);
    } else {
      input.value = "";
      setInput(BigInt(0));
      setDisplayMax(false);
    }
  };

  const withdraw = async (address: string, amount: bigint) => {
    await nomic.withdrawBitcoin(address, amount);
    setInput(BigInt(0));
    removeUrlQueryParams(router, "withdraw");
  };

  return (
    <div className="flex flex-col items-center gap-8 text-textPrimary p-2">
      <h1 className="text-2xl font-semibold"> Withdraw Bitcoin </h1>
      <div className="flex flex-col gap-1 justify-center w-full">
        <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          Bitcoin balance
        </h3>
        <h1 className="text-lg text-textPrimary font-semibold">
          {displayBtc(nomic.nbtcBalance)}
        </h1>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="relative border border-textTertiary rounded-md px-3 py-2 shadow-sm">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-surfaceModal text-xs font-medium text-textSecondary"
          >
            Bitcoin Address
          </label>
          <input
            type="text"
            id="delegation-input"
            autoComplete="off"
            className="bg-surfaceModal block w-full border-0 p-0 text-textPrimary placeholder-textSecondary focus:ring-0 sm:text-sm focus:outline-none"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="relative border border-textTertiary rounded-md px-3 py-2 shadow-sm">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-surfaceModal text-xs font-medium text-textSecondary"
          >
            Withdraw Amount
          </label>
          <div className="flex flex-row">
            <input
              type="number"
              id="withdraw-input"
              autoComplete="off"
              className="bg-surfaceModal block w-full border-0 p-0 text-textPrimary placeholder-textSecondary focus:ring-0 sm:text-sm focus:outline-none"
              onChange={(e) =>
                setInput(
                  BigInt(
                    (
                      Number(e.target.value) * Number(nomic.nbtcModifier)
                    ).toFixed(0)
                  )
                )
              }
            />
            <div className="flex">
              <Button
                className="bg-gradientStart text-textPrimary !py-0.5 !px-2"
                onClick={() =>
                  setMax(
                    nomic.nbtcBalance > BigInt(0)
                      ? nomic.nbtcBalance
                      : BigInt(0)
                  )
                }
              >
                MAX
              </Button>
              <div className="inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-none">
                <div className="text-gray-500 sm:text-md flex flex-row">
                  <h1>BTC</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:flex-row-reverse gap-2 w-full">
        <LoadableButton
          activeText={"Withdraw"}
          loadingText={"Withdrawing..."}
          isLoading={withdrawLoading}
          setIsLoading={setWithdrawLoading}
          colorClass={"bg-gradientStart"}
          onClick={async () => {
            await withdraw(address.trim(), input);
          }}
        />
        <LoadableButton
          activeText={"Cancel"}
          colorClass={"bg-gradientStart"}
          onClick={async () => {
            removeUrlQueryParams(router, "withdraw");
          }}
        />
      </div>
    </div>
  );
};
