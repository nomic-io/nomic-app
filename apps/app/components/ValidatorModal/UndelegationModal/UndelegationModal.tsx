import { useState, useContext } from "react";
import { ValidatorCardHeader } from "../ValidatorCardHeader";
import { UndelegationCardBody } from "./UndelegationCardBody";
import { StakingInput } from "../StakingInput";
import { NomicContext } from "../../../contexts/NomicContext";
import { LoadableButton } from "../../LoadableButton";
import { getUrlQueryParam, updateUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";
import { StakedValidator } from "../../../models/staked-validator";

interface Props {
  closeModal: () => void;
}
export const UndelegationModal = ({ closeModal }: Props) => {
  const [undelegationInput, setUndelegationInput] = useState(BigInt(0));
  const [undelegateLoading, setUndelegateLoading] = useState(false);

  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedValidator = nomic.getValidator(
    selectedValidatorAddress
  ) as StakedValidator;

  const undelegate = async (address: string, amount: bigint) => {
    await nomic.undelegate(address, amount);
    setUndelegationInput(BigInt(0));
    closeModal();
  };

  return (
    <div className="flex flex-col gap-3">
      <ValidatorCardHeader />
      <UndelegationCardBody />
      <StakingInput
        ctaText={"Amount to Undelegate"}
        setInput={setUndelegationInput}
        maxAmount={selectedValidator.amountStaked}
        modifier={nomic.modifier}
      />
      <div className="flex flex-row-reverse gap-2 mt-2">
        <LoadableButton
          activeText={"Undelegate"}
          loadingText={"Undelegating..."}
          isLoading={undelegateLoading}
          setIsLoading={setUndelegateLoading}
          colorClass={"bg-gradientStart"}
          onClick={async () => {
            await undelegate(selectedValidator.address, undelegationInput);
          }}
        />
        <LoadableButton
          activeText={"Back"}
          colorClass={"bg-gradientStart"}
          onClick={async () => {
            updateUrlQueryParams(router, {
              key: "modal",
              value: "info",
            });
          }}
        />
      </div>
    </div>
  );
};
