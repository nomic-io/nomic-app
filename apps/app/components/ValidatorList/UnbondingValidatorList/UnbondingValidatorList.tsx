import { useContext } from "react";
import { NomicContext } from "../../../contexts/NomicContext";
import { ValidatorLogo } from "../ValidatorLogo";
import { observer } from "mobx-react-lite";
import { displayNom, updateUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";

const unbondingHours = 14 * 24;

const getRemaining = (start: bigint) => {
  const now = new Date();
  const unbondEndSec = Number(start) + (unbondingHours + 1) * 60 * 60;
  const unbondEnd = new Date(unbondEndSec * 1000);

  let delta = (unbondEnd.getTime() - now.getTime()) / 1000;

  let days = Math.floor(delta / 86400);
  delta -= days * 86400;
  if (days < 0) {
    days = 0;
  }

  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  if (hours < 0) {
    hours = 0;
  }

  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  if (minutes < 0) {
    minutes = 0;
  }

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    unbondEnd: unbondEnd,
  };
};

const timeString = (start: bigint) => {
  const remaining = getRemaining(start);
  let timeString = "";
  if (remaining.days > 0) {
    timeString += remaining.days + " Day";
    if (remaining.days != 1) {
      timeString += "s ";
    } else {
      timeString += " ";
    }
  } else if (remaining.hours > 0) {
    timeString += remaining.hours + " Hour";
    if (remaining.hours != 1) {
      timeString += "s ";
    } else {
      timeString += " ";
    }
  } else if (remaining.minutes > 0) {
    timeString += remaining.minutes + " Minute";
    if (remaining.minutes != 1) {
      timeString += "s ";
    } else {
      timeString += " ";
    }
  }
  return timeString;
};

const getProgress = (start: bigint): number => {
  const remaining = getRemaining(start);
  const minutesLeft =
    remaining.days * 24 * 60 + remaining.hours * 60 + remaining.minutes;
  const progress = 100 - (minutesLeft / (unbondingHours * 60)) * 100;

  if (progress > 100) {
    return 100;
  }
  if (progress < 3) {
    return 3;
  }
  return progress;
};

const isMature = (start: bigint) => {
  const now = BigInt(Math.round(new Date().getTime() / 1000));
  const periodEnd = BigInt(start) + BigInt(60 * 60 * unbondingHours);

  return now > periodEnd;
};

export const UnbondingValidatorList = observer(() => {
  const nomic = useContext(NomicContext);
  const router = useRouter();

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
                    Amount Undelegating
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Unbonding Period Remaining
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface divide-y divide-surfaceDark w-full">
                {nomic.unbondingValidators.map((validator) =>
                  validator.unbondInfo
                    .filter((unbonding) => {
                      return !isMature(unbonding.startSeconds);
                    })
                    .map((unbonding) => (
                      <tr
                        key={validator.address + unbonding.startSeconds}
                        onClick={() => {
                          updateUrlQueryParams(
                            router,
                            { key: "validator", value: validator.address },
                            { key: "modal", value: "info" }
                          );
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center text-center">
                            <ValidatorLogo validator={validator} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-textPrimary">
                                {validator.info.moniker.length > 20
                                  ? validator.info.moniker.slice(0, 20) + "..."
                                  : validator.info.moniker}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-regular text-textPrimary text-left">
                            {displayNom(unbonding.amount) + " NOM"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-xs font-regular text-textPrimary">
                              {timeString(BigInt(unbonding.startSeconds))}
                            </div>
                            <div className="w-full rounded-full bg-surfaceDark shadow-inner h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{
                                  width:
                                    getProgress(
                                      BigInt(unbonding.startSeconds)
                                    ).toString() + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
