import {
  HomeIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  GiftIcon,
} from "@heroicons/react/24/solid";
import { WalletInfo } from "./WalletInfo";
import { classJoin } from "@nomic-ui/utils";
import Logo from "../../public/logo-large.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const navigation = [
  {
    name: "Staking",
    icon: HomeIcon,
    path: "staking",
  },
  {
    name: "Bitcoin",
    icon: BanknotesIcon,
    path: "/bitcoin",
  },
  // {
  //   name: "IBC",
  //   icon: ArrowsRightLeftIcon,
  //   path: "ibc",
  // },
  {
    name: "Rewards",
    icon: GiftIcon,
    path: "/rewards",
  },
];

export const LeftBar = () => {
  const router = useRouter();
  return (
    <div className="fixed p-6 h-screen">
      <div className="w-64 flex flex-col gap-10 bg-surface rounded-lg p-6 min-h-full">
        <div className="flex items-center justify-center w-full min-w-max">
          <Image src={Logo} alt="Nomic" width={128} />
        </div>
        <WalletInfo />
        <div className="h-full flex flex-col gap-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <Link href={item.path} key={item.name}>
              <button
                className={classJoin(
                  "flex flex-row gap-2 items-center py-4",
                  "text-md font-medium rounded-md",
                  (item.path === "/" && item.path === router.asPath) ||
                    (item.path !== "/" && router.asPath.includes(item.path))
                    ? "text-textPrimary"
                    : "text-textSecondary hover:text-textTertiary"
                )}
              >
                <item.icon height={26} width={26} aria-hidden="true" />
                <span className="">{item.name}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
