import { useContext, useEffect } from "react";
import { StakedValidatorListCard } from "../components/ValidatorList/StakedValidatorList/StakedValidatorListCard";
import { AllValidatorListCard } from "../components/ValidatorList/AllValidatorList/AllValidatorListCard";
import { UnbondingValidatorListCard } from "../components/ValidatorList/UnbondingValidatorList/UnbondingValidatorListCard";
import { NomicContext } from "../contexts/NomicContext";
import { ValidatorModal } from "../components/ValidatorModal/ValidatorModal";
import { observer } from "mobx-react-lite";
import { StakingPageHeader } from "../components/StakingPageHeader";
import AnimateHeight from "react-animate-height";

function StakingPageUnobserved() {
  const nomic = useContext(NomicContext);

  useEffect(() => {
    if (nomic.initialized) {
      nomic.updateValidators();
    }
  }, [nomic, nomic.initialized]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_ENV !== "mock") {
      return;
    }

    const interval = setInterval(() => {
      nomic.stakedValidators.forEach((validator) => {
        validator.pendingNomRewards += 100000n;
        nomic.nomRewardBalance += 100000n;
        validator.pendingNbtcRewards += 1000000000n;
        nomic.nbtcRewardBalance += 1000000000n;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <ValidatorModal />
      <AnimateHeight
        duration={500}
        height={!nomic.wallet || !nomic.initialized ? 0 : "auto"}
      >
        <div className="mb-6">
          <StakingPageHeader />
        </div>
      </AnimateHeight>
      <AnimateHeight
        duration={500}
        height={
          !nomic.wallet ||
          !nomic.initialized ||
          !nomic.stakedValidators ||
          nomic.stakedValidators.length <= 0
            ? 0
            : "auto"
        }
      >
        <div className="mb-6">
          <StakedValidatorListCard />
        </div>
      </AnimateHeight>
      <AnimateHeight
        duration={500}
        height={
          !nomic.unbondingValidators ||
          (nomic.unbondingValidators.length > 0 && nomic.wallet)
            ? "auto"
            : 0
        }
      >
        <div className="mb-6">
          <UnbondingValidatorListCard />
        </div>
      </AnimateHeight>
      <div className="mb-6">
        <AllValidatorListCard />
      </div>
    </div>
  );
}

export default observer(StakingPageUnobserved);
