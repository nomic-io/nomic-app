import { useContext, useEffect, useState } from "react";
import { NomicContext } from "../../../contexts/NomicContext";
import { ValidatorLogo } from "../ValidatorLogo";
import { observer } from "mobx-react-lite";
import { Validator } from "../../../models/validator";
import { displayPercentage, updateUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";
import { SearchFilterContext } from "../../../contexts/SearchFilterContext";
import { SkeletonLoader } from "@nomic-ui/components";

interface Props {
  showActive: boolean;
}

export const AllValidatorList = observer(({ showActive }: Props) => {
  const nomic = useContext(NomicContext);
  const searchFilter = useContext(SearchFilterContext);
  const router = useRouter();
  const [shownValidators, setShownValidators] = useState([]);

  useEffect(() => {
    const validators =
      nomic.validators.length > 0
        ? nomic.validators.filter((validator) => {
            return showActive ? validator.isActive : !validator.isActive;
          })
        : Array.from(Array(20).keys()).map((key) => null);
    setShownValidators(validators);
  }, [nomic, nomic.validators, showActive]);

  return (
    <div className="flex flex-col rounded-lg">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden rounded-b-lg">
            <table className="min-w-full divide-y divide-surfaceDark">
              <thead className="bg-surfaceDark text-textSecondary">
                <tr className="shadow-inner">
                  <th
                    scope="col"
                    className="pl-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="pl-2 pr-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Voting Power
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Commission
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-surfaceDark text-textPrimary">
                {searchFilter
                  .apply(shownValidators)
                  .map((validator: Validator | null, i) => (
                    <tr
                      key={i.toString()}
                      role="button"
                      className="transform hover:-translate-y-1 hover:shadow-lg hover:bg-surfaceModal"
                      onClick={() => {
                        updateUrlQueryParams(
                          router,
                          { key: "validator", value: validator.address },
                          { key: "modal", value: "info" }
                        );
                      }}
                    >
                      <td className="pl-6 py-4">
                        <SkeletonLoader
                          className="rounded-md"
                          height="20px"
                          width="20px"
                          isLoading={validator === null}
                        >
                          <div className="text-sm text-textSecondary">
                            {(i + 1).toString()}
                          </div>
                        </SkeletonLoader>
                      </td>
                      <td className="pl-2 pr-4 py-4 whitespace-nowrap flex">
                        <div className="flex items-center w-full gap-4">
                          <SkeletonLoader
                            className="rounded-full"
                            height="40px"
                            width="40px"
                            isLoading={validator === null}
                          >
                            <ValidatorLogo validator={validator} />
                          </SkeletonLoader>
                          <SkeletonLoader
                            className="w-full rounded-md"
                            height="20px"
                            isLoading={validator === null}
                          >
                            <div className="text-sm font-medium">
                              {validator?.info.moniker.length > 20
                                ? validator?.info.moniker.slice(0, 20) + "..."
                                : validator?.info.moniker}
                            </div>
                          </SkeletonLoader>
                          {validator?.isJailed ? (
                            <span className="ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradientStart text-textPrimary">
                              {" "}
                              Jailed{" "}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SkeletonLoader
                          className="rounded-md"
                          height="20px"
                          width="80px"
                          isLoading={validator === null}
                        >
                          <div className="text-sm font-regular">
                            {Math.floor(
                              Number(validator?.votingPower) / 1000000
                            ).toLocaleString() + " NOM"}
                          </div>
                        </SkeletonLoader>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <SkeletonLoader
                          className="rounded-md"
                          height="20px"
                          isLoading={validator === null}
                        >
                          <div className="text-sm font-regular">
                            {displayPercentage(validator?.commission)}
                          </div>
                        </SkeletonLoader>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
