import ShardBlur0 from "../../public/assets/shards/shard-blur-0.png";
import ShardBlur1 from "../../public/assets/shards/shard-blur-1.png";
import ShardBlur2 from "../../public/assets/shards/shard-blur-2.png";
import ShardBlur3 from "../../public/assets/shards/shard-blur-3.png";
import ShardBlur4 from "../../public/assets/shards/shard-blur-4.png";

import { useEffect, useRef } from "react";
import { ValuesContent } from "./ValuesContent";
import { containContent } from "@nomic-ui/utils";
import Image from "next/image";

export const Values = () => {
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
    <div ref={wrapperRef} className="relative flex justify-center">
      <div
        ref={shardsRef}
        className="absolute w-full grid grid-cols-5 grid-rows-4 bg-background"
      >
        {/* <div id="shardBlur0" className="col-start-1 row-start-1">
          <Image src={ShardBlur0} alt="" />
        </div>
        <div id="shardBlur2" className="col-start-4 row-start-1">
          <Image src={ShardBlur2} alt="" />
        </div>
        <div id="shardBlur3" className="col-start-5 row-start-4">
          <Image src={ShardBlur3} alt="" />
        </div> */}
        <div id="shardBlur0" className="col-start-1 row-start-1">
          <Image src={ShardBlur0} alt="" />
        </div>
        <div
          id="shardBlur1Small"
          className="md:hidden col-start-5 row-start-1 text-right opacity-80"
        >
          <div className="flex justify-end w-full">
            <Image className="inline-block min-w-2/1" src={ShardBlur1} alt="" />
          </div>
        </div>
        <div
          id="shardBlur1"
          className="hidden md:block col-start-5 row-start-1 text-right opacity-80"
        >
          <Image className="inline-block" src={ShardBlur1} alt="" />
        </div>
        <div id="shardBlur2" className="col-start-4 row-start-1">
          <Image src={ShardBlur2} alt="" />
        </div>
        <div id="shardBlur3Small" className="md:hidden col-start-4 row-start-3">
          <Image className="min-w-2/1" src={ShardBlur3} alt="" />
        </div>
        <div
          id="shardBlur3"
          className="hidden md:block col-start-5 row-start-4"
        >
          <Image src={ShardBlur3} alt="" />
        </div>
        <div
          id="shardBlur4Small"
          className="md:hidden col-start-1 row-start-3 opacity-70"
        >
          <div className="mt-12">
            <Image
              className="min-w-2/1"
              src={ShardBlur4}
              alt=""
            />
          </div>
        </div>
        <div
          id="shardBlur4"
          className="hidden md:block col-start-2 row-start-4"
        >
          <div className="mt-32">
            <Image src={ShardBlur4} alt="" />
          </div>
        </div>
      </div>
      <div ref={contentRef} className="absolute w-full px-6 md:px-12 lg:px-24">
        <ValuesContent />
      </div>
    </div>
  );
};
