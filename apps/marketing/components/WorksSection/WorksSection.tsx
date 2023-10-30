import { useEffect, useRef } from "react";
import { WorksSectionContent } from "./WorksSectionContent";
import { containContent } from "@nomic-ui/utils";
import ShardBlurHeavy1 from "../../public/assets/shards/shard-blur-heavy-1.png";
import ShardBlur5 from "../../public/assets/shards/shard-blur-5.png";
import ShardBlur6 from "../../public/assets/shards/shard-blur-6.png";
import Image from "next/image";

export const WorksSection = () => {
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
  });

  return (
    <div ref={wrapperRef} className="flex justify-center mt-32 relative">
      <div
        ref={shardsRef}
        className="absolute w-full grid grid-cols-5 grid-rows-4"
      >
        <div id="shardBlurHeavy1" className="col-start-4 row-start-1">
          <div className="-mt-48 md:mt-0 opacity-70">
            <Image
              className="min-w-3/1"
              src={ShardBlurHeavy1}
              alt=""
            />
          </div>
        </div>
        <div id="shardBlur5Small" className="col-start-4 row-start-1">
          <div className="-mt-48 md:mt-0">
            <Image
              className="min-w-3/1"
              src={ShardBlurHeavy1}
              alt=""
            />
          </div>
        </div>
        <div id="shardBlur5" className="col-start-2 row-start-4">
          <div className="-ml-32 md:-mt-6">
            <Image src={ShardBlur5} alt="" />
          </div>
        </div>
        <div id="shardBlur6Small" className="md:hidden col-start-1 row-start-1">
          <div className="min-w-3/1">
            <Image src={ShardBlur6} alt="" />
          </div>
        </div>
        <div
          id="shardBlur6"
          className="hidden md:block col-start-1 row-start-1"
        >
          <div className="">
            <Image src={ShardBlur6} alt="" />
          </div>
        </div>
      </div>
      <div ref={contentRef} className="absolute mx-6 md:mx-12 lg:mx-24 z-10">
        <WorksSectionContent />
      </div>
    </div>
  );
};
