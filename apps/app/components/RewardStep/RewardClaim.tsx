import { useState, useContext, useEffect } from "react";
import { Button } from "@nomic-ui/components";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { displayNom, classJoin } from "@nomic-ui/utils";
import { RewardDetails, RewardType } from "../../models/reward";
import { LoadableButton } from "../LoadableButton";
import { NomicContext } from "../../contexts/NomicContext";

interface Props {
  onClick: () => void;
  reward: RewardDetails;
  rewardType: RewardType;
}

export const RewardClaim = observer(
  ({ onClick, reward, rewardType }: Props) => {
    const [displayAmount, setDisplayAmount] = useState(0n);
    const [claimLoading, setClaimLoading] = useState(false);
    const nomic = useContext(NomicContext);

    const updateAmount = () => {
      if (!reward) return;

      if (reward.locked > 0) {
        setDisplayAmount(reward.locked);
      } else if (reward.claimable > 0) {
        setDisplayAmount(reward.claimable);
      } else {
        setDisplayAmount(reward.claimed);
      }
    };

    useEffect(() => {
      updateAmount();
    }, [reward]);

    if (!reward) {
      return (
        <div className="flex flex-row-reverse h-full w-full items-center gap-8">
          <h1 className="text-md font-semibold text-textSecondary">
            {" "}
            Connect Wallet to Determine Eligibility
          </h1>
        </div>
      );
    }

    if (reward.amount == 0n) {
      return (
        <div className="flex flex-row-reverse h-full w-full items-center gap-8">
          <h1 className="text-md font-semibold text-textSecondary">
            {`Not Eligible for Reward Portion`}
          </h1>
        </div>
      );
    }

    return (
      <div className="flex flex-row-reverse h-full w-full items-center gap-8">
        <h1 className="text-textSecondary font-medium">
          {displayNom(displayAmount, true)}
        </h1>
        {reward.claimed !== reward.amount ? (
          <LoadableButton
            isLoading={claimLoading}
            loadingText="Claiming..."
            disabled={reward.claimable <= 0}
            onClick={async () => {
              setClaimLoading(true);
              await onClick();
              await nomic.getRewardBalances();
              updateAmount();
              setClaimLoading(false);
            }}
            activeText={
              reward.claimable
                ? `Claim ${rewardType}`
                : "Complete Task to Claim"
            }
            colorClass={
              reward.claimable > 0
                ? "bg-gradientStart transform hover:-translate-y-0.5"
                : "bg-gray-500"
            }
            className={classJoin(
              "text-md font-semibold rounded-md text-textPrimary"
            )}
          />
        ) : (
          <div className="flex flex-row text-textSecondary items-center gap-2">
            <h1 className="font-medium"> Claimed </h1>
            <div className="w-6 h-6">
              <CheckCircleIcon />
            </div>
          </div>
        )}
      </div>
    );
  }
);
