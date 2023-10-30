import { AllValidatorListHeader } from "./AllValidatorListHeader";
import { AllValidatorList } from "./AllValidatorList";
import { useState } from "react";

export const AllValidatorListCard = () => {
  const [showActive, setShowActive] = useState(true);

  return (
    <div className="shadow rounded-lg">
      <AllValidatorListHeader
        showActive={showActive}
        setShowActive={setShowActive}
      />
      <AllValidatorList showActive={showActive} />
    </div>
  );
};
