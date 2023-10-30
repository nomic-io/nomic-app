import { useContext, useState } from "react";
import { NomicContext } from "../../contexts/NomicContext";
import { observer } from "mobx-react-lite";
import { LoadableButton } from "../LoadableButton";
import { displayBtc } from "@nomic-ui/utils";

export interface Props {
  updateBalances: () => Promise<void>;
}

export const IncomingIbcHeader = observer(({ updateBalances }: Props) => {
  const nomic = useContext(NomicContext);
  const [claimLoading, setClaimLoading] = useState(false);

  return nomic.incomingIbcNbtcBalance > 0 ? (
    <div className="flex justify-between bg-surface px-6 py-6 border-surfaceDark rounded-lg leading-none w-full">
      <div className="flex flex-col justify-center align-middle gap-1">
        <h3 className="uppercase text-transparent text-sm font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          Incoming Ibc Bitcoin Balance
        </h3>
        <p className="text-md font-semibold text-textPrimary truncate">
          {displayBtc(nomic.incomingIbcNbtcBalance)}
        </p>
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col justfiy-center items-center">
          <LoadableButton
            activeText={"Claim Bitcoin"}
            loadingText={"Claiming..."}
            isLoading={claimLoading}
            setIsLoading={setClaimLoading}
            colorClass={"bg-gradientStart"}
            onClick={async () => {
              await nomic.claimIncomingIbc();
              await updateBalances();
            }}
          />
        </div>
      </div>
    </div>
  ) : null;
});
