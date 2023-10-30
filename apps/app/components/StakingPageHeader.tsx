import { useContext, useState } from "react";
import { NomicContext } from "../contexts/NomicContext";
import { observer } from "mobx-react-lite";
import { LoadableButton } from "./LoadableButton";
import { displayNom, displayBtc, classJoin } from "@nomic-ui/utils";
import { SkeletonLoader } from "@nomic-ui/components";

export const StakingPageHeader = observer(() => {
  const nomic = useContext(NomicContext);
  const [claimLoading, setClaimLoading] = useState(false);

  return (
    <div
      className={classJoin(
        "bg-surface px-6 py-6 border-surfaceDark rounded-lg leading-none",
        "flex gap-6",
        "flex-row justify-between"
      )}
    >
      <div className="flex flex-col justify-center align-middle gap-1">
        <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          Total Staked
        </h3>
        <SkeletonLoader
          height="20px"
          isLoading={nomic.totalStaked === null}
          className="mt-0 rounded-md"
        >
          <p className="text-md font-semibold text-textPrimary truncate">
            {displayNom(nomic.totalStaked) + " NOM"}
          </p>
        </SkeletonLoader>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
        <div className="flex flex-col justify-center gap-1">
          <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
            Nomic Rewards
          </h3>
          <SkeletonLoader
            height="20px"
            isLoading={nomic.nomRewardBalance === null}
            className="mt-0 rounded-md"
          >
            <p className="text-md font-semibold text-textPrimary truncate">
              {displayNom(nomic.nomRewardBalance) + " NOM"}
            </p>
          </SkeletonLoader>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
            Bitcoin Rewards
          </h3>
          <SkeletonLoader
            height="20px"
            isLoading={nomic.nbtcRewardBalance === null}
            className="rounded-md"
          >
            <p className="text-md font-semibold text-textPrimary truncate">
              {displayBtc(nomic.nbtcRewardBalance)}
            </p>
          </SkeletonLoader>
        </div>
        <div className="flex flex-col justfiy-center items-center mt-4">
          <LoadableButton
            activeText={"Claim Rewards"}
            loadingText={"Claiming..."}
            isLoading={claimLoading}
            setIsLoading={setClaimLoading}
            colorClass={"bg-gradientStart"}
            onClick={async () => {
              await nomic.claimStakingRewards();
            }}
          />
        </div>
      </div>
    </div>
  );
});
