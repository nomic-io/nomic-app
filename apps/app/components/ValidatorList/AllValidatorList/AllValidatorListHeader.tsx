import { observer } from "mobx-react-lite";
import { Button } from "@nomic-ui/components";
import { classJoin } from "@nomic-ui/utils";
import { SearchBar } from "../SearchBar";

const tabs = [{ name: "Active" }, { name: "Inactive" }];

interface Props {
  showActive: boolean;
  setShowActive: (bool: boolean) => void;
}

export const AllValidatorListHeader = observer(
  ({ showActive, setShowActive }: Props) => {
    return (
      <div className="bg-surface px-6 py-6 rounded-t-lg">
        <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
          <h3 className="uppercase text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
            All Validators
          </h3>
          <div className="hidden sm:flex space-x-4">
            {tabs.map((tab) => (
              <Button
                key={tab.name}
                onClick={() => {
                  setShowActive(tab.name === "Active");
                }}
                className={classJoin(
                  "font-medium text-sm",
                  "hidden sm:flex space-x-4",
                  (showActive && tab.name === "Active") ||
                    (!showActive && tab.name !== "Active")
                    ? "bg-gradientStart bg-opacity-50 text-textPrimary"
                    : "text-textTertiary hover:text-textSecondary hover:bg-surfaceModal"
                )}
              >
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
