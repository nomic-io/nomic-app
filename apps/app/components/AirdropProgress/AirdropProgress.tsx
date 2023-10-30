import { Card } from "@nomic-ui/components";
import { displayPercentage } from "@nomic-ui/utils";
import { observer } from "mobx-react-lite";

interface Props {
  progress: number;
}

export const AirdropProgress = observer(({ progress }: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center gap-8">
      <h1 className="text-textPrimary">Progress</h1>
      <div className="w-full rounded-full bg-modalTooltip shadow-inner h-4">
        <div
          className="bg-primary h-4 rounded-full"
          style={{
            width: displayPercentage(progress),
          }}
        ></div>
      </div>
      <h1 className="text-textPrimary">{displayPercentage(progress)}</h1>
    </Card>
  );
});
