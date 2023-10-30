import { useEffect, useRef } from "react";
import Shard0 from "../../public/assets/shards/shard-0.png";
import Shard1 from "../../public/assets/shards/shard-1.png";
import Shard2 from "../../public/assets/shards/shard-2.png";
import Shard3 from "../../public/assets/shards/shard-3.png";
import Shard4 from "../../public/assets/shards/shard-4.png";
import Shard5 from "../../public/assets/shards/shard-5.png";
import Shard6 from "../../public/assets/shards/shard-6.png";
import Shard8 from "../../public/assets/shards/shard-8.png";
import Shard9 from "../../public/assets/shards/shard-9.png";
import Shard10 from "../../public/assets/shards/shard-10.png";
import Shard11 from "../../public/assets/shards/shard-11.png";
import Bitcoin from "../../public/assets/bitcoin.png";
import { containContent } from "@nomic-ui/utils";
import Image from "next/image";

export const HeroSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    containContent(contentRef, [wrapperRef, shardsRef]);
  };

  useEffect(() => {
    setTimeout(() => handleResize(), 50);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="h-screen w-screen flex z-10 justify-center items-center background-background relative mt-24 mb-12"
    >
      <div
        ref={shardsRef}
        className="absolute grid grid-cols-5 grid-rows-4 h-screen w-screen bg-background"
      >
        <div id="shard0" className="col-start-2 row-start-1">
          <div className="-mt-5">
            <Image src={Shard0} alt="" />
          </div>
        </div>
        <div id="shard1" className="hidden md:block col-start-5 row-start-1">
          <div className="-ml-24">
            <Image className="inline-block" src={Shard1} alt="" />
          </div>
        </div>
        <div id="shard2" className="col-start-1 row-start-1">
          <Image src={Shard2} alt="" />
        </div>
        <div id="shard3" className="col-start-5 row-start-1 text-right">
          <Image className="inline-block" id="shard3" src={Shard3} alt="" />
        </div>
        <div id="shard4" className="col-start-2 row-start-2 lg:col-start-1">
          <div className="-ml-12 md:-ml-6 mt-20 lg:ml-24 w-full">
            <Image src={Shard4} alt="" />
          </div>
        </div>
        <div id="shard5" className="col-start-4 row-start-2 xl:col-start-5">
          <div className="mt-20 ml-12 xl:-ml-48 w-full">
            <Image src={Shard5} alt="" />
          </div>
        </div>
        <div id="shard6" className="hidden xl:block col-start-2 row-start-2">
          <div className="-mt-12">
            <Image src={Shard6} alt="" />
          </div>
        </div>
        <div
          id="shard8"
          className="col-start-1 row-start-2 md:row-start-3 lg:row-start-4"
        >
          <Image src={Shard8} alt="" />
        </div>
        <div
          id="shard9"
          className="hidden xl:block col-start-5 row-start-4 align-bottom"
        >
          <div className="mt-24 -ml-24">
            <Image className="inline-block" src={Shard9} alt="" />
          </div>
        </div>
        <div id="shard10" className="hidden xl:block col-start-5 row-start-3">
          <div className="ml-24">
            <Image src={Shard10} alt="" />
          </div>
        </div>
        <div
          id="shard11"
          className="col-start-5 row-start-2 md:row-start-3 lg:row-start-4 text-right"
        >
          <Image className="inline-block" src={Shard11} alt="" />
        </div>
      </div>
      <div
        ref={contentRef}
        className="absolute flex flex-col items-center gap-4 w-screen"
      >
        <div className="flex justify-center z-10 sm:w-5/6 md:w-3/5 lg:w-1/2 xl:w-1/3">
          <Image src={Bitcoin} alt="" />
        </div>
        <div className="w-full flex flex-col text-center items-center gap-4 -mt-24">
          <div className="text-5xl md:text-6xl lg:text-7xl leading-tight">
            <h1>
              <span className="font-thin">Bitcoin. </span>
              <br />
              <span className="font-medium">On Cosmos.</span>
            </h1>
          </div>
          <div className="w-4/5 md:w-2/3 lg:w-1/2 z-10">
            <p className="text-textSecondary font-extralight leading-relaxed md:text-lg">
              The superior way to use Bitcoin in Cosmos DeFi. Use IBC to
              securely and efficiently bridge your BTC to Osmosis and more.
            </p>
          </div>
        </div>
        <a href="https://app.nomic.io" className="w-full flex justify-center">
          <button className="w-2/3 md:w-1/6 flex items-center justify-center py-2 my-1 px-2 text-sm font-regular rounded-md text-white bg-primary z-10">
            ENTER THE APP
          </button>
        </a>
      </div>
    </div>
  );
};
