import { useContext } from "react";
import { ValidatorCardHeader } from "../ValidatorCardHeader";
import { ValidatorInfoCardBody } from "./ValidatorInfoCardBody";
import { DelegateButton } from "./DelegateButton";
import { observer } from "mobx-react-lite";
import { NomicContext } from "../../../contexts/NomicContext";
import { Button } from "@nomic-ui/components";
import { useRouter } from "next/router";
import { getUrlQueryParam, updateUrlQueryParams } from "@nomic-ui/utils";
import { StakedValidator } from "../../../models/staked-validator";

export const ValidatorInfoModal = observer(() => {
  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedValidator = nomic.getValidator(selectedValidatorAddress) as (StakedValidator | undefined);
  const amountStaked = selectedValidator?.amountStaked || 0n;

  return (
    <div className="flex flex-col gap-6">
      <ValidatorCardHeader />
      <div className="flex flex-col gap-8">
        <ValidatorInfoCardBody />
        <div className="flex flex-row-reverse gap-2">
          {nomic.wallet && nomic.wallet.connected ? (
            <>
              <DelegateButton />
              {amountStaked > 0 ? (
                <Button
                  className="inline-flex justify-center font-medium rounded-md bg-gradientStart sm:text-sm hover:shadow-lg transform hover:-translate-y-0.5
                "
                  onClick={() => {
                    updateUrlQueryParams(router, {
                      key: "modal",
                      value: "redelegation",
                    });
                  }}
                >
                  Redelegate
                </Button>
              ) : null}
              {amountStaked > 0 ? (
                <Button
                  className="inline-flex justify-center font-medium rounded-md bg-textTertiary sm:text-sm hover:shadow-lg transform hover:-translate-y-0.5
                "
                  onClick={() => {
                    updateUrlQueryParams(router, {
                      key: "modal",
                      value: "undelegation",
                    });
                  }}
                >
                  Undelegate
                </Button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
});
