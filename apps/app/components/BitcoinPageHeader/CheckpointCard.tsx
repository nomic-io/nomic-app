import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NomicContext } from "../../contexts/NomicContext";
import { LinkIcon } from "@heroicons/react/24/outline";
import { classJoin } from "@nomic-ui/utils";
import { Card, SkeletonLoader } from "@nomic-ui/components";

type CheckpointCardProps = {
  className?: string;
};

export const CheckpointCard = observer(
  ({ className = "" }: CheckpointCardProps) => {
    const nomic = useContext(NomicContext);

    useEffect(() => {
      async function getBtcInfo() {
        if (nomic.initialized) {
          await Promise.all([
            nomic.getBtcBlockHeight(),
            nomic.getLatestCheckpointHash(),
          ]);
        }
      }
      getBtcInfo();
    }, [nomic, nomic.initialized]);

    return (
      <Card
        className={classJoin(
          "flex flex-col justify-between leading-none gap-4",
          className
        )}
      >
        <div className="flex flex-col gap-1 justify-center">
          <h3 className="uppercase text-transparent text-sm font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
            Bitcoin Block Height
          </h3>
          <SkeletonLoader
            height="30px"
            isLoading={nomic.btcBlockHeight === null}
            className="mt-2 rounded-md w-2/3"
          >
            <h1 className="text-3xl text-textPrimary font-semibold">
              {nomic.btcBlockHeight
                ? nomic.btcBlockHeight.toLocaleString()
                : null}
            </h1>
          </SkeletonLoader>
        </div>
        <SkeletonLoader
          height="16px"
          width="128px"
          isLoading={nomic.latestCheckpointHash === null}
          className="mt-2 rounded-md w-2/3"
        >
          <h1 className="mt-2 text-xl text-gray-900">
            <a
              // TODO: Make this configurable from config
              href={`https://blockchain.com/btc-testnet/tx/${nomic.latestCheckpointHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-row align-middle gap-1 text-textSecondary hover:text-textTertiary text-sm">
                <p> Latest Checkpoint </p>
                <LinkIcon className="h-4 w-4" />
              </div>
            </a>
          </h1>
        </SkeletonLoader>
      </Card>
    );
  }
);
