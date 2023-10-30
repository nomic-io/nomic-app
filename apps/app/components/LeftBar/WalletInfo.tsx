import { useContext } from "react";
import { WalletInfoAddressField } from "./WalletInfoAddressField";
import { NomicContext } from "../../contexts/NomicContext";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { observer } from "mobx-react-lite";
import { displayNom, displayBtc, classJoin } from "@nomic-ui/utils";
import { PowerIcon } from "@heroicons/react/24/outline";
import { SkeletonLoader } from "@nomic-ui/components";

export const WalletInfo = observer(() => {
  const nomic = useContext(NomicContext);

  return (
    <div className="flex flex-col gap-6 text-textPrimary">
      {nomic.wallet && nomic.wallet.connected ? (
        <>
          <div className="flex gap-4 items-end justify-between">
            <span className="text-lg font-semibold align-text-top">
              {nomic.wallet.name}
            </span>
            <button
              className={classJoin(
                "rounded-md bg-modalTooltipLightHover flex",
                "items-center justify-center !px-2 py-2",
                "hover:bg-modalTooltipLight"
              )}
              onClick={async () => {
                await nomic.disconnectWallet();
              }}
              onMouseOver={() => {
                document.getElementById("disconnectTooltip").style.display =
                  "block";
              }}
              onMouseLeave={() => {
                document.getElementById("disconnectTooltip").style.display =
                  "none";
              }}
            >
              <PowerIcon width={15} height={15} />
              <div
                id="disconnectTooltip"
                className="absolute text-xs hidden mt-10 px-2 py-1"
              >
                Disconnect
              </div>
            </button>
          </div>
          <WalletInfoAddressField />
          <div className="flex flex-col gap-3">
            <div className="text-align-left min-w-0">
              <div className="flex flex-row text-indigo-400 items-center">
                <span className="text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
                  NOMIC BALANCE
                </span>
              </div>
              <SkeletonLoader
                height="20px"
                isLoading={nomic.nomBalance === null}
                className="mt-2 rounded-md"
              >
                <p className="text-lg font-semibold text-textPrimary truncate">
                  {displayNom(nomic.nomBalance) + " NOM"}
                </p>
              </SkeletonLoader>
            </div>
            <div className="text-align-left flex-1 min-w-0">
              <div className="flex flex-row items-center">
                <span className="text-transparent text-xs font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
                  BITCOIN BALANCE
                </span>
              </div>
              <SkeletonLoader
                height="20px"
                isLoading={nomic.nbtcBalance === null}
                className="mt-2 rounded-md"
              >
                <p className="text-lg font-semibold truncate">
                  {displayBtc(nomic.nbtcBalance)}
                </p>
              </SkeletonLoader>
            </div>
          </div>
        </>
      ) : (
        <ConnectWalletButton />
      )}
    </div>
  );
});
