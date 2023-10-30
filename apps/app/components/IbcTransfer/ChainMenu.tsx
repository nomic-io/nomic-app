import { Fragment } from "react";
import { IbcChain, Chains } from "../../models/ibc-chain";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { classJoin } from "@nomic-ui/utils";
import { Menu, Transition } from "@headlessui/react";

export interface ChainMenuProps {
  source?: boolean;
  chain: IbcChain;
}

export const ChainMenu = observer(
  ({ source = true, chain }: ChainMenuProps) => {
    const menuEnabled = (chain && !chain.locked) || !chain;

    return (
      <Menu
        as="div"
        className={classJoin(
          "rounded-lg bg-modalSurface w-4/5",
          menuEnabled ? "hover:bg-modalTooltipLight" : ""
        )}
      >
        <Menu.Button
          disabled={!menuEnabled}
          className={classJoin(
            "flex rounded-lg",
            "flex-row justify-between",
            "items-center w-full px-4 py-2",
            menuEnabled ? "hover:bg-modalTooltipLight" : ""
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <Image src={chain.logo} alt={chain.name} height={36} width={36} />
            <h2 className="text-textPrimary font-medium text-xl leading-none">
              {chain.name}
            </h2>
          </div>
          {menuEnabled ? <ChevronDownIcon className="h-5 w-5" /> : null}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute overflow-auto h-64 align-left mt-2 w-1/2 rounded-md shadow-lg bg-modalTooltip focus:outline-none z-20">
            {Chains.map((chain: IbcChain) => (
              <Menu.Item key={chain.chainId}>
                <button
                  className="rounded-lg w-full py-2 px-4 hover:bg-modalTooltipLight"
                  onClick={() => {
                    return;
                  }}
                >
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={chain.logo}
                      alt={chain.name}
                      height={36}
                      width={36}
                    />
                    <h2 className="text-textPrimary font-medium text-xl leading-none">
                      {chain.name}
                    </h2>
                  </div>
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);
