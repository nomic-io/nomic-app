import { useContext } from "react";
import { NomicContext } from "../../../contexts/NomicContext";
import { displayNom, getUrlQueryParam } from "@nomic-ui/utils";
import { useRouter } from "next/router";
import { StakedValidator } from "../../../models/staked-validator";

export const UndelegationCardBody = () => {
  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedValidator = nomic.getValidator(
    selectedValidatorAddress
  ) as StakedValidator;

  return (
    <div>
      <ul role="list" className="flex">
        <li key="1" className="py-4">
          <div className="flex flex-col gap-1">
            <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
              Available for Undelegation
            </h3>
            <h1 className="text-lg text-textPrimary font-semibold">
              {displayNom(selectedValidator.amountStaked) + " NOM"}
            </h1>
          </div>
        </li>
      </ul>
    </div>
  );
};
