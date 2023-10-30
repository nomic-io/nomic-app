import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BitcoinContext } from "../../contexts/BitcoinContext";
import { NomicContext } from "../../contexts/NomicContext";
import { classJoin, displayUsd } from "@nomic-ui/utils";
import { Card, SkeletonLoader } from "@nomic-ui/components";

type ValueCardProps = {
  className?: string;
};

export const ValueCard = observer(({ className = "" }: ValueCardProps) => {
  const nomic = useContext(NomicContext);
  const bitcoin = useContext(BitcoinContext);

  useEffect(() => {
    async function getData() {
      if (nomic.initialized) {
        await nomic.getValueLocked();
      }
      await bitcoin.getBitcoinPrice();
    }

    getData();
  }, [nomic, nomic.initialized, bitcoin]);

  return (
    <Card className={classJoin("flex flex-col leading-none gap-4", className)}>
      <div className="flex flex-col gap-1 justify-center">
        <h3 className="uppercase text-transparent text-sm font-medium bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          Total Value Locked
        </h3>
        <SkeletonLoader
          height="30px"
          isLoading={nomic.valueLocked === null || bitcoin.btcPrice === null}
          className="mt-2 rounded-md w-2/3"
        >
          <h1 className="text-3xl text-textPrimary font-semibold">
            {displayUsd(
              (Number(nomic.valueLocked) / Number(nomic.nbtcModifier)) *
                bitcoin.btcPrice
            )}
          </h1>
        </SkeletonLoader>
      </div>
    </Card>
  );
});
