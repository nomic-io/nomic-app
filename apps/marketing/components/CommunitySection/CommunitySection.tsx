import { useEffect, useRef } from "react";
import { containContent } from "@nomic-ui/utils";
import Socials from "./Socials";
import ShardBlur0 from "../../public/assets/shards/shard-blur-0.png";
import ShardBlurHeavy1 from "../../public/assets/shards/shard-blur-heavy-1.png";
import Image from "next/image";

export default function CommunitySection() {
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
      className="relative bg-earthMobile md:bg-earth bg-cover w-screen z-1 flex flex-row justify-center mt-32 md:mt-24 overflow-y-hidden"
    >
      <div
        ref={shardsRef}
        className="absolute grid grid-cols-5 w-full grid-rows-4 bg-transparent"
      >
        <div id="shardBlur0" className="col-start-1 row-start-1">
          <div className="min-w-2/1">
            <Image src={ShardBlur0} alt="" />
          </div>
        </div>
        <div id="shardBlurHeavy1" className="md:hidden col-start-3 row-start-1">
          <div className="min-w-3/1 md:min-w-2/1 -mt-12 opacity-70">
            <Image src={ShardBlurHeavy1} alt="" />
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        className="absolute flex flex-col gap-8 w-5/6 mt-12 pb-64 md:pb-48"
      >
        <h2 className="text-transparent text-sm bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
          COMMUNITY
        </h2>
        <h1 className="text-3xl md:text-5xl font-extralight">
          Join the
          <span className="font-medium"> Community </span>
        </h1>
        <p className="text-textSecondary font-light">
          Become part of the future of Bitcoin and join the community today
        </p>
        <Socials className={"gap-4"} />
      </div>
    </div>
  );
}
