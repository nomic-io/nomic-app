import { useContext } from "react";
import { NomicContext } from "../../../contexts/NomicContext";
import { displayNom, getUrlQueryParam } from "@nomic-ui/utils";
import { useRouter } from "next/router";
import { StakedValidator } from "../../../models/staked-validator";

export const ValidatorInfoCardBody = () => {
  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedValidator = nomic.getValidator(selectedValidatorAddress) as (StakedValidator | undefined);
  const amountStaked = selectedValidator?.amountStaked || 0n;

  return (
    <div>
      <ul role="list" className="flex flex-col gap-8">
        <li key="1" className="">
          <div className="flex flex-col gap-1 justify-center">
            <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
              Current Delegation
            </h3>
            <h1 className="text-lg leading-none text-textPrimary font-semibold">
              {!nomic.wallet
                ? displayNom(0n) + " NOM"
                : displayNom(amountStaked) + " NOM"}
            </h1>
          </div>
        </li>
      </ul>
    </div>
  );
};
