import { useState, useContext } from "react";
import { ValidatorCardHeader } from "../ValidatorCardHeader";
import { RedelegationMenu } from "./RedelegationMenu";
import { LoadableButton } from "../../LoadableButton";
import { StakingInput } from "../StakingInput";
import { NomicContext } from "../../../contexts/NomicContext";
import { Validator } from "../../../models/validator";
import {
  displayNom,
  getUrlQueryParam,
  updateUrlQueryParams,
} from "@nomic-ui/utils";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { StakedValidator } from "../../../models/staked-validator";

interface Props {
  closeModal: () => void;
}
export const RedelegationModal = observer(({ closeModal }: Props) => {
  const [redelegationInput, setRedelegationInput] = useState(BigInt(0));
  const [redelegateLoading, setRedelegateLoading] = useState(false);
  const [redelegationSelection, setRedelegationSelection] =
    useState<Validator | null>(null);

  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedValidator = nomic.getValidator(selectedValidatorAddress) as StakedValidator;

  const redelegate = async (
    fromAddress: string,
    toAddress: string,
    amount: bigint
  ) => {
    await nomic.redelegate(fromAddress, toAddress, amount);
    setRedelegationInput(BigInt(0));
    closeModal();
  };

  return (
    <div className="flex flex-col gap-3">
      <ValidatorCardHeader />
      <RedelegationMenu
        redelegationSelection={redelegationSelection}
        setRedelegationSelection={setRedelegationSelection}
      />
      <ul role="list" className="divide-y divide-gray-200">
        <li key="1" className="py-4">
          <h5 className="text-lg font-semibold">Available for Redelegation</h5>
          <p className="text-sm">
            {displayNom(
              selectedValidator ? selectedValidator.amountStaked : BigInt(0)
            ) + " NOM"}
          </p>
        </li>
      </ul>
      {redelegationSelection ? (
        <StakingInput
          ctaText={"Amount to Redelegate"}
          setInput={setRedelegationInput}
          maxAmount={
            selectedValidator ? selectedValidator.amountStaked : BigInt(0)
          }
          modifier={nomic.modifier}
        />
      ) : null}
      <div className="flex flex-row-reverse gap-2 mt-2">
        <LoadableButton
          activeText={"Redelegate"}
          loadingText={"Redelegating..."}
          isLoading={redelegateLoading}
          isActive={!!redelegationSelection}
          setIsLoading={setRedelegateLoading}
          colorClass={"bg-gradientStart"}
          onClick={async () => {
            if (redelegationSelection && selectedValidator) {
              await redelegate(
                selectedValidator.address,
                redelegationSelection.address,
                redelegationInput
              );
            }
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
});
