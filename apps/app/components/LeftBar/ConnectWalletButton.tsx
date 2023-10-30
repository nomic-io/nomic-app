import { useContext } from "react";
import { NomicContext } from "../../contexts/NomicContext";
import { observer } from "mobx-react-lite";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { Keplr } from "../../models/wallet/keplr";
import { Metamask } from "../../models/wallet/metamask";
import { MockWallet } from "../../models/wallet/mock-wallet";

const env = process.env.NEXT_PUBLIC_APP_ENV;

const wallets = [
  {
    name: "Keplr",
    logo: "/keplr.svg",
    walletType: Keplr,
  },
  {
    name: "Metamask",
    logo: "/metamask.svg",
    walletType: Metamask,
  },
];

export const ConnectWalletButton = observer(() => {
  const nomic = useContext(NomicContext);

  return (
    <Menu as="div" className="relative inline-block z-50 w-full">
      <Menu.Button
        style={{ borderRadius: "7px" }}
        className="bg-primary relative inline-flex items-center justify-center py-2 px-3 text-textPrimary text-sm gap-4 h-12 w-full"
      >
        <h1>Connect Wallet</h1>
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
        <Menu.Items className="absolute left-0 mt-2 origin-top-right rounded-md bg-modalTooltip p-6">
          <div className="flex flex-col gap-2 px-1 py-1 w-full">
            {wallets.map((wallet) => {
              return (
                <Menu.Item key={wallet.name}>
                  <button
                    className="flex items-center gap-4 px-3 py-2 w-full text-textPrimary font-semibold hover:bg-modalTooltipLight rounded-md"
                    onClick={async () => {
                      const nomicWallet =
                        env === "mock"
                          ? new MockWallet()
                          : new wallet.walletType();
                      await nomicWallet.connect();
                      nomic.wallet = nomicWallet;
                      await nomic.build();
                    }}
                  >
                    <div className="h-8 w-8">
                      <Image
                        src={wallet.logo}
                        alt={`${wallet.name} logo`}
                        height={32}
                        width={32}
                      />
                    </div>
                    <h1 className="mr-1">{wallet.name}</h1>
                  </button>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
