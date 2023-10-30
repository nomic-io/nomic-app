import { StepCard } from "./StepCard";
import DepositBitcoin from "../../public/icons/deposit-bitcoin.svg";
import DefiBitcoin from "../../public/icons/defi-bitcoin.svg";
import RedeemBitcoin from "../../public/icons/redeem-bitcoin.svg";
import Image from "next/image";

export const WorksSectionContent = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center text-center align-middle gap-4">
        <div className="flex justify-center">
          <h2 className="text-left text-transparent text-sm bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop bg-left-bottom">
            THE PROCESS
          </h2>
        </div>
        <h1 className="text-3xl md:text-5xl font-extralight">
          How it
          <span className="font-medium"> Works </span>
        </h1>
        <p className="text-textSecondary font-light w-3/4">
          Nomic makes it easy to use your Bitcoin on any IBC-enabled chain
        </p>
      </div>
      <div className="mt-8 w-full flex flex-col lg:flex-row justify-center align-middle z-10 gap-6">
        <StepCard
          step={"01"}
          icon={<Image src={DepositBitcoin} alt="Deposit Bitcoin" />}
          title="Deposit BTC"
          description="Send BTC to your deposit address. nBTC will show up in your wallet."
          className={"h-full w-full lg:w-1/3"}
        />
        <StepCard
          step={"02"}
          icon={<Image src={DefiBitcoin} alt="Defi Bitcoin" />}
          title="Use nBTC in DeFi Protocols"
          description="Use your nBTC on Osmosis, The Cosmos Hub, and more."
          className={"h-full w-full lg:w-1/3 lg:mt-12"}
        />
        <StepCard
          step={"03"}
          icon={<Image src={RedeemBitcoin} alt="Redeem Bitcoin" />}
          title="Withdraw nBTC for BTC"
          description="Transfer back to your Bitcoin wallet."
          className={"h-full w-full lg:w-1/3 lg:mt-24"}
        />
      </div>
    </div>
  );
};
