import Bitcoin from "../../public/bitcoin.svg";
import Cosmos from "../../public/cosmos.svg";
import Image from "next/image";

export const InfoBar = () => {
  return (
    <div className="z-10 bg-surface">
      <div className="mx-6 md:mx-12 lg:mx-24 flex flex-col sm:flex-row md:justify-between items-center gap-4 md:gap-0 my-12 text-xl">
        <div className="w-full md:w-96 flex divide-x divide-textTertiary items-center">
          <div className="flex w-full justify-center sm:justify-start">
            <div className="flex flex-row gap-2 items-center">
              <h2 className="font-semibold text-5xl"> 👀 </h2>
              <div className="flex flex-col font-light text-textSecondary text-xs">
                <h3> INTERCHAIN </h3>
                <h3> UPGRADE </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-full w-4/5 md:w-80 justify-center align-middle items-center gap-8 text-textTertiary opacity-80">
          <Image src={Bitcoin} alt="bitcoin" />
          <Image src={Cosmos} alt="cosmos" />
        </div>
      </div>
    </div>
  );
};
