import { Card } from "@nomic-ui/components";
import { RewardClaim } from "./RewardClaim";
import { observer } from "mobx-react-lite";
import { RewardDetails, RewardType } from "../../models/reward";

interface Props {
  header: string;
  description: string;
  onClick: () => void;
  reward?: RewardDetails;
  rewardType: RewardType;
}

export const RewardStep = observer(
  ({ header, description, onClick, reward, rewardType }: Props) => {
    return (
      <Card className="flex flex-row justify-between items-center">
        <div className="flex flex-col w-3/4">
          <h1 className="text text-lg text-textPrimary">{header}</h1>
          <h3 className="text text-textSecondary">{description}</h3>
        </div>
        <RewardClaim
          onClick={onClick}
          reward={reward}
          rewardType={rewardType}
        />
      </Card>
    );
  }
);
