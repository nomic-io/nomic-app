import { useState } from "react";

type StakingInputProps = {
  ctaText: string;
  maxAmount: bigint;
  setInput: (input: bigint) => void;
  modifier: bigint;
};

export const StakingInput = ({
  ctaText,
  maxAmount,
  setInput,
  modifier,
}: StakingInputProps) => {
  const [displayMax, setDisplayMax] = useState(false);

  const setMax = (val: bigint) => {
    const input = document.getElementById("input") as HTMLInputElement;
    if (!displayMax) {
      const wholeVal = Number(val) / Number(modifier);
      input.value = wholeVal.toString();
      setInput(val);
      setDisplayMax(true);
    } else {
      input.value = "";
      setInput(BigInt(0));
      setDisplayMax(false);
    }
  };

  return (
    <div className="relative border border-textTertiary rounded-md px-3 py-2 shadow-sm">
      <label
        htmlFor="name"
        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-surfaceModal text-xs font-medium text-textSecondary"
      >
        {ctaText}
      </label>
      <input
        type="number"
        id="input"
        autoComplete="off"
        className="bg-surfaceModal block w-full border-0 p-0 text-textPrimary placeholder-textSecondary focus:ring-0 sm:text-sm focus:outline-none"
        onChange={(e) =>
          setInput(
            BigInt(Math.floor(Number(e.target.value) * Number(modifier)))
          )
        }
      />
      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <button
          type="button"
          className="inline-flex justify-center align-text-center rounded-md border border-transparent shadow-sm px-2 bg-gradientStart text-textPrimary focus:outline-none sm:ml-3 sm:w-auto sm:text-sm hover:shadow-lg"
          onClick={() => setMax(maxAmount)}
        >
          MAX
        </button>
        <div className="inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-none">
          <div
            className="text-textPrimary font-md sm:text-md"
            id="price-currency"
          >
            NOM
          </div>
        </div>
      </div>
    </div>
  );
};
