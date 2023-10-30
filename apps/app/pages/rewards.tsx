import { useContext, useEffect, useState } from "react";
import { RewardStep } from "../components/RewardStep/RewardStep";
import { NomicContext } from "../contexts/NomicContext";
import { observer } from "mobx-react-lite";
import { LoadableButton } from "../components/LoadableButton";
import { Card } from "@nomic-ui/components";
import { Metamask } from "../models/wallet/metamask";
import { EvmosAirdropState } from "../models/evmos-airdrop-state";
import { RewardType } from "../models/reward";

const RewardPageUnobserved = () => {
  const nomic = useContext(NomicContext);
  const [connectLoading, setConnectLoading] = useState(false);
  const [claimAttempted, setClaimAttempted] = useState(
    EvmosAirdropState.NOATTEMPT
  );

  const updateClaimAttempted = () => {
    if (nomic.wallet?.address) {
      const claimAttemptedString = localStorage.getItem(
        "nomic/evmosAirdropClaimAttempted/" + nomic.wallet.address
      );
      setClaimAttempted(
        claimAttemptedString
          ? (claimAttemptedString as EvmosAirdropState)
          : EvmosAirdropState.NOATTEMPT
      );
    }
  };

  useEffect(() => {
    updateClaimAttempted();
  }, [nomic.wallet?.address]);

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <RewardStep
        header="Airdrop I"
        description="Hold ATOM before Nomic Stakenet I"
        onClick={async () => {
          await nomic.claimAirdrop1();
        }}
        reward={nomic.airdropBalances?.airdrop1}
        rewardType={RewardType.AIRDROP}
      />
      <RewardStep
        header="Airdrop II"
        description="Hold ATOM, OSMO, JUNO, EVMOS, or KUJI before September 27, 2022 (Only validators outside the top 20 are counted, maximum of 10k tokens per network, per account)"
        onClick={async () => {
          await nomic.claimAirdrop2();
        }}
        reward={nomic.airdropBalances?.airdrop2}
        rewardType={RewardType.AIRDROP}
      />
      {/* <RewardStep
        header="Incentivised Testnet Participation"
        description="Participate in the Nomic Incentivied Testnet tasks before August X, 2023"
        onClick={async () => {
          await nomic.claimTestnetParticipationIncentives();
        }}
        reward={nomic.incentiveBalances?.testnetParticipation}
        rewardType={RewardType.INCENTIVE}
      /> */}
      {!nomic.wallet || nomic.wallet instanceof Metamask ? null : (
        <Card className="flex flex-row justify-between items-center">
          <div className="flex flex-col w-2/5">
            <h1 className="text text-lg text-textPrimary">Evmos Rewards</h1>
            <h3 className="text text-textSecondary">
              To claim the Evmos portion of the rewards, connect your Evmos
              account
            </h3>
          </div>
          {claimAttempted === EvmosAirdropState.NOATTEMPT ? (
            <LoadableButton
              activeText={"Connect Evmos"}
              loadingText={"Connecting..."}
              colorClass={"bg-primary"}
              isLoading={connectLoading}
              setIsLoading={setConnectLoading}
              onClick={async () => {
                await nomic.joinRewardAccounts();
                updateClaimAttempted();
              }}
            />
          ) : (
            <h1 className="text-md font-semibold text-textSecondary">
              {claimAttempted === EvmosAirdropState.INELIGIBLE
                ? "Not Eligible for Reward Portion"
                : "Reward Portion Successfully Transferred"}
            </h1>
          )}
        </Card>
      )}
    </div>
  );
};

export default observer(RewardPageUnobserved);
