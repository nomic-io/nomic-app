import { useContext } from "react";
import { NomicContext } from "../../../contexts/NomicContext";
import { displayNom, getUrlQueryParam } from "@nomic-ui/utils";
import { useRouter } from "next/router";
import { StakedValidator } from "../../../models/staked-validator";

export const DelegationCardBody = () => {
  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedValidator = nomic.getValidator(
    selectedValidatorAddress
  ) as StakedValidator;

  return (
    <div>
      {/* <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Staking will lock your funds for 14+ days
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                You will need to undelegate in order for your staked assets to
                be liquid again. This process will take 14 days to complete.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <ul role="list" className="flex flex-col gap-4 py-4">
        <li key="0" className="">
          <div className="flex flex-col gap-1">
            <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
              Current Delegation
            </h3>
            <h1 className="text-lg text-textPrimary font-semibold">
              {!nomic.wallet ||
              !selectedValidator ||
              !selectedValidator.amountStaked
                ? displayNom(0n, true)
                : displayNom(selectedValidator.amountStaked, true)}
            </h1>
          </div>
        </li>
        <li key="1" className="">
          <div className="flex flex-col gap-1 justify-center">
            <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
              Available Balance
            </h3>
            <h1 className="text-lg text-textPrimary font-semibold">
              {displayNom(nomic.nomBalance) + " NOM"}
            </h1>
          </div>
        </li>
      </ul>
    </div>
  );
};
