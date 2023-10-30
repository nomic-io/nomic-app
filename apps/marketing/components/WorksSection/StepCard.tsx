import { classJoin } from "@nomic-ui/utils";
import { Card } from "@nomic-ui/components";

type StepCardProps = {
  step: string;
  icon: JSX.Element;
  title: string;
  description: string;
  className?: string;
};

export const StepCard = ({
  step,
  icon,
  title,
  description,
  className = "",
}: StepCardProps) => {
  return (
    <Card className={classJoin("flex flex-col items-center p-6", className)}>
      <div className="flow-root w-full">
        <div className="float-left">{icon}</div>
        <div className="float-right">
          <h1 className="font-bold text-7xl textOutline text-surface opacity-20">
            {step}
          </h1>
        </div>
      </div>
      <div className="text-left space-y-4 w-full">
        <h1 className="text-2xl"> {title} </h1>
        <p className="text-textTertiary font-light"> {description} </p>
      </div>
    </Card>
  );
};
