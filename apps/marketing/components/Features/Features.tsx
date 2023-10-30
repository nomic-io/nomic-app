import { useEffect, useRef } from "react";
import FeaturesContent from "./FeaturesContent";
import ShardBlurHeavy1 from "../../public/assets/shards/shard-blur-heavy-1.png";
import ShardBlur3 from "../../public/assets/shards/shard-blur-3.png";
import Image from "next/image";
import { containContent } from "@nomic-ui/utils";

export default function Features() {
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
    <div
      ref={wrapperRef}
      className="w-screen z-1 fadeGradient mt-24 flex justify-start relative"
    >
      <div
        ref={shardsRef}
        className="absolute w-full grid grid-cols-5 grid-rows-4 h-1/3 -mt-24"
      >
        <div
          id="shardBlurHeavy1"
          className="col-start-2 row-start-1 opacity-90 relative"
        >
          <div className="absolute -ml-12 min-w-3/1 md:min-w-2/1 opacity-60">
            <Image src={ShardBlurHeavy1} alt="" />
          </div>
        </div>
        <div
          id="shardBlur3"
          className="col-start-4 row-start-1 opacity-90 relative"
        >
          <div className="absolute -mt-12">
            <Image src={ShardBlur3} alt="" />
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        className="absolute w-full flex justify-center pt-24 pb-12 md:py-0 md:pt-24"
      >
        <FeaturesContent />
      </div>
    </div>
  );
}
