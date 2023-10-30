import { useEffect, useRef } from "react";
import { containContent } from "@nomic-ui/utils";
import Bitcoin from "../../public/bitcoin.svg";
import Cosmos from "../../public/cosmos.svg";
import Image from "next/image";
import ShardsBlurHeavy3 from "../../public/assets/shards/shard-blur-heavy-3.png";
import ShardBlur5 from "../../public/assets/shards/shard-blur-5.png";
import Shard2 from "../../public/assets/shards/shard-2.png";
import Shard10 from "../../public/assets/shards/shard-10.png";

export default function BackedBy() {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    containContent(contentRef, [wrapperRef, shardsRef]);
  };

  useEffect(() => {
    setTimeout(() => handleResize(), 50);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-col w-screen justify-center md:-mt-12 lg:-mt-12 bg-transparent"
    >
      <div
        ref={shardsRef}
        className="absolute grid grid-cols-5 w-full grid-rows-4 bg-transparent"
      >
        <div
          id="shardBlurHeavy3"
          className="md:hidden col-start-1 row-start-1 -z-10"
        >
          <div className="min-w-3/1">
            <Image src={ShardsBlurHeavy3} alt="" />
          </div>
        </div>
        <div id="shardBlur5" className="col-start-5 row-start-1 opacity-70">
          <Image src={ShardBlur5} alt="" />
        </div>
        <div
          id="shard2"
          className="col-start-1 row-start-1 blur-md opacity-80 relative"
        >
          <div className="absolute min-w-2/1 md:-mt-32">
            <Image src={Shard2} alt="" />
          </div>
        </div>
        <div
          id="shard10"
          className="col-start-3 row-start-1 md:row-start-2 opacity-90 blur-md"
        >
          <Image src={Shard10} alt="" />
        </div>
      </div>
      <div
        ref={contentRef}
        className="absolute flex flex-col md:flex-row gap-6 px-6 pt-20 pb-12 md:px-12 lg:px-24 md:pb-24 w-full md:mt-0 items-center bg-transparent"
      >
        <div className="flex flex-col justify-start gap-4">
          <h2 className="text-transparent text-sm bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
            BACKED BY
          </h2>
          <p className="text-textSecondary font-extralight text-sm">
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews.
          </p>
        </div>
        <div className="flex flex-row h-full align-middle w-full items-center justify-center md:justify-end items-center text-textTertiary">
          <div className="flex justify-center md:justify-end items-center w-96 gap-8">
            <div className="w-1/3 h-1/3 opacity-80">
              <Image src={Bitcoin} alt="Bitcoin" />
            </div>
            <div className="w-1/3 h-1/3 opacity-80">
              <Image src={Cosmos} alt="Cosmos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
