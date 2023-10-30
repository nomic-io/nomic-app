import { useContext, useEffect, useState } from "react";
import { NomicContext } from "../../contexts/NomicContext";
import { Card } from "@nomic-ui/components";
import { SwapInterface } from "./SwapInterface";
import { IncomingIbcHeader } from "./IncomingIbcHeader";
import { Chains, KujiraChain, NomicChain } from "../../models/ibc-chain";
import { Metamask } from "../../models/wallet/metamask";
import { observer } from "mobx-react-lite";

export const IbcTransfer = observer(() => {
  const nomic = useContext(NomicContext);
  const [sourceChain, setSourceChain] = useState(Chains[0]);
  const [destinationChain, setDestinationChain] = useState(Chains[1]);
  const [chainBalances, setChainBalances] = useState<{
    [chainId: string]: bigint;
  }>({});

  async function updateBalances() {
    setChainBalances({
      [sourceChain.chainId]: await nomic.getChainBalance(sourceChain),
      [destinationChain.chainId]: await nomic.getChainBalance(destinationChain),
    });
  }

  const swapChains = () => {
    const temp = destinationChain;
    setDestinationChain(sourceChain);
    setSourceChain(temp);
  };

  useEffect(() => {
    if (nomic.wallet instanceof Metamask && sourceChain.name !== "Nomic") {
      swapChains();
    }
    updateBalances();
  }, [nomic.nbtcBalance]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="min-w-128 flex flex-col justify-center gap-4">
        <IncomingIbcHeader updateBalances={updateBalances} />
        <Card className="w-full">
          <SwapInterface
            chainBalances={chainBalances}
            sourceChain={sourceChain}
            destinationChain={destinationChain}
            updateBalances={updateBalances}
            swapChains={swapChains}
          />
        </Card>
      </div>
    </div>
  );
});
