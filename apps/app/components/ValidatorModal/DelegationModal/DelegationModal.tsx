import { useState, useContext } from "react";
import { ValidatorCardHeader } from "../ValidatorCardHeader";
import { DelegationCardBody } from "./DelegationCardBody";
import { StakingInput } from "../StakingInput";
import { NomicContext } from "../../../contexts/NomicContext";
import { LoadableButton } from "../../LoadableButton";
import { getUrlQueryParam, updateUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";

interface Props {
  closeModal: () => void;
}

export const DelegationModal = ({ closeModal }: Props) => {
  const [delegationInput, setDelegationInput] = useState(BigInt(0));
  const [delegateLoading, setDelegateLoading] = useState(false);

  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValAddress = getUrlQueryParam(router, "validator");

  const delegate = async (address: string, amount: bigint) => {
    try {
      await nomic.delegate(address, amount);
    } catch (e) {
      console.error(e);
    }
    setDelegationInput(BigInt(0));
    closeModal();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="sm:flex sm:items-start">
        <div className="w-full">
          <ValidatorCardHeader />
          <div className="">
            <DelegationCardBody />
          </div>
        </div>
      </div>
      <div className="pt-2">
        <StakingInput
          ctaText={"Amount to Delegate"}
          setInput={setDelegationInput}
          maxAmount={
            nomic.nomBalance > 1 ? nomic.nomBalance - BigInt(1) : BigInt(0)
          }
          modifier={nomic.modifier}
        />
      </div>
      <div className="flex flex-row-reverse gap-2 mt-2">
        <LoadableButton
          activeText={"Delegate"}
          loadingText={"Delegating..."}
          isLoading={delegateLoading}
          setIsLoading={setDelegateLoading}
          colorClass={"bg-gradientStart"}
          onClick={async () => {
            if (selectedValAddress) {
              await delegate(selectedValAddress, delegationInput);
            }
          }}
        />
        <LoadableButton
          activeText={"Back"}
          colorClass={"bg-gradientStart"}
          onClick={async () => {
            updateUrlQueryParams(router, { key: "modal", value: "info" });
          }}
        />
      </div>
    </div>
  );
};
