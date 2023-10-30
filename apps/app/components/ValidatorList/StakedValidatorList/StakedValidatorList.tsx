import { useContext } from "react";
import { NomicContext } from "../../../contexts/NomicContext";
import { ValidatorLogo } from "../ValidatorLogo";
import { observer } from "mobx-react-lite";
import { displayBtc, displayNom, updateUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";

export const StakedValidatorList = observer(() => {
  const router = useRouter();

  const nomic = useContext(NomicContext);
  return (
    <div className="flex flex-col rounded-lg">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden rounded-b-lg">
            <table className="min-w-full divide-y divide-surfaceDark">
              <thead className="bg-surfaceDark">
                <tr className="shadow-inner text-textTertiary">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Amount Staked
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Pending Rewards
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-surfaceDark w-full">
                {nomic.stakedValidators
                  .filter((validator) => validator.amountStaked > 1)
                  .sort((a, b) => (a.amountStaked < b.amountStaked ? 1 : -1))
                  .map((validator) => (
                    <tr
                      role="button"
                      key={validator.address}
                      className="transform hover:-translate-y-1 hover:shadow-lg hover:bg-surfaceModal"
                      onClick={() => {
                        updateUrlQueryParams(
                          router,
                          { key: "validator", value: validator.address },
                          { key: "modal", value: "info" }
                        );
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center w-full gap-4">
                          <ValidatorLogo validator={validator} />
                          <div className="text-sm font-medium">
                            {validator?.info.moniker.length > 20
                              ? validator?.info.moniker.slice(0, 20) + "..."
                              : validator?.info.moniker}
                          </div>
                          {validator?.isJailed ? (
                            <span className="ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradientStart text-textPrimary">
                              {" "}
                              Jailed{" "}
                            </span>
                          ) : null}
                          {!validator?.isActive ? (
                            <span className="items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradientStart text-textPrimary">
                              {" "}
                              Inactive{" "}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-regular text-textPrimary text-left">
                          {displayNom(validator.amountStaked) + " NOM"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <div className="text-sm font-regular text-textPrimary">
                            {displayNom(validator.pendingNomRewards) + " NOM"}
                          </div>
                          <div className="text-sm font-regular text-textPrimary">
                            {displayBtc(validator.pendingNbtcRewards)}
                          </div>
                        </div>
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
