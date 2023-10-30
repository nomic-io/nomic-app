import { useContext } from "react";
import { ConfirmationContext } from "../../contexts/ConfirmationContext";
import { observer } from "mobx-react-lite";
import { classJoin, updateUrlQueryParams } from "@nomic-ui/utils";
import { Button } from "@nomic-ui/components";
import { useRouter } from "next/router";

export const ConfirmationModal = observer(() => {
  const confirmation = useContext(ConfirmationContext);
  const router = useRouter();

  return (
    <div className="bg-modalTooltip mx-8 z-40 py-2 px-6 shadow-xl rounded-lg">
      <div className="grid place-items-center p-4 mt-2">
        <h1 className="text-2xl font-semibold text-textPrimary mb-4">
          Warning
        </h1>
        <div className="mb-8">
          <div className="mb-6 text-textPrimary">
            <div className="mb-3">
              <p>
                Depositing Bitcoin is an experimental feature. Do not deposit
                more Bitcoin than you are comfortable losing.
              </p>
            </div>
            <p>
              This deposit address will be valid for 4 days. Please deposit your
              Bitcoin within the allotted time.
            </p>
          </div>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="h-4 w-4 accent-gradientStart border-textSecondary rounded"
                onChange={(e) => (confirmation.agreed = e.target.checked)}
              />
            </div>
            <div className="ml-3 text-sm">
              <span id="candidates-description">
                I understand and accept the risk of depositing.
              </span>
            </div>
          </div>
        </div>
        <Button
          className={classJoin(
            !confirmation.agreed
              ? "bg-textTertiary"
              : "transform bg-gradientStart hover:-translate-y-0.5",
            "w-full text-md font-semibold rounded-md text-white"
          )}
          onClick={() => {
            if (confirmation.agreed) {
              confirmation.confirmed = true;
              updateUrlQueryParams(router, {
                key: "deposit",
                value: "address",
              });
            }
          }}
        >
          Show Deposit Address
        </Button>
      </div>
    </div>
  );
});
