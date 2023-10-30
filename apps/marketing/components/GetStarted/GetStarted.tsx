import { useEffect, useRef } from "react";
import { containContent } from "@nomic-ui/utils";
import { Button } from "../Button";
import ShardBlurHeavy6 from "../../public/assets/shards/shard-blur-heavy-6.png";
import ShardBlurHeavy7 from "../../public/assets/shards/shard-blur-heavy-7.png";
import ShardBlur7 from "../../public/assets/shards/shard-blur-7.png";
import Image from "next/image";

export default function GetStarted() {
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
      className="w-screen flex justify-center items-center relative"
    >
      <div
        ref={shardsRef}
        className="w-full absolute grid grid-cols-5 grid-rows-4"
      >
        <div id="shardBlur7" className="col-start-5 row-start-1 text-right">
          <div className="mt-48 md:mt-0 blur-lg md:blur-none">
            <Image src={ShardBlur7} alt="" />
          </div>
        </div>
        <div
          id="shardBlurHeavy6"
          className="col-start-1 row-start-2 md:row-start-1"
        >
          <div className="-mt-4 min-w-3/1 md:min-w-full">
            <Image src={ShardBlurHeavy6} alt="" />
          </div>
        </div>
        <div id="shardBlurHeavy7" className="col-start-3 row-start-1">
          <div className="-mt-48 min-w-2/1 ">
            <Image src={ShardBlurHeavy7} alt="" />
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        className="absolute flex items-center justify-center items-center px-6 md:px-12 lg:px-24 w-full mt-44 md:mt-0"
      >
        <div className="w-full flex flex-col md:flex-row md:justify-between rounded-lg bg-surface justify-center items-center gap-6 p-8">
          <div className="flex flex-col gap-4 md:justify-start justify-center items-center md:items-start">
            <h1 className="text-2xl font-extralight">
              Get started
              <span className="font-medium"> right now! </span>
            </h1>
          </div>
          <div className="w-full md:w-auto">
            <a href="https://app.nomic.io">
              <Button className={"bg-primary w-full"}>
                <h2 className="text-sm text-textPrimary">ENTER THE APP</h2>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
