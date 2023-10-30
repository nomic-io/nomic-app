import { DepositCard } from "./DepositCard";
import { WithdrawCard } from "./WithdrawCard";
import { ValueCard } from "./ValueCard";
import { CheckpointCard } from "./CheckpointCard";

export const BitcoinPageHeader = () => {
  return (
    <>
      <div className="xl:hidden flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <DepositCard className={"w-1/2"} />
          <WithdrawCard className={"w-1/2"} />
        </div>
        <div className="flex flex-row gap-3">
          <ValueCard className={"w-1/2"} />
          <CheckpointCard className={"w-1/2"} />
        </div>
        <div className="flex flex-row gap-4"></div>
      </div>
      <div className="hidden xl:flex flex-row h-screen-1/5 gap-3">
        <DepositCard className={"w-1/4"} />
        <WithdrawCard className={"w-1/4"} />
        <ValueCard className={"w-1/4"} />
        <CheckpointCard className={"w-1/4"} />
      </div>
    </>
  );
};
