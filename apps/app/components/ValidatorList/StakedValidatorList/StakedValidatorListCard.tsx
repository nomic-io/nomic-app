import { StakedValidatorList } from "./StakedValidatorList";

export const StakedValidatorListCard = () => {
  return (
    <div className="rounded-lg shadow">
      <div className="flex bg-surface px-6 py-6 rounded-t-lg">
        <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          Staked Validators
        </h3>
      </div>
      <StakedValidatorList />
    </div>
  );
};
