import { useRef, useEffect } from "react";
import Wave from "../../public/assets/wave.png";
import More from "../../public/more.svg";
import Image from "next/image";
import ShardBlur7 from "../../public/assets/shards/shard-blur-7.png";
import ShardBlurHeavy4 from "../../public/assets/shards/shard-blur-heavy-4.png";
import { containContent } from "@nomic-ui/utils";

export default function OrgaLarge() {
  const waveRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const breakRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    containContent(waveRef, [wrapperRef, contentRef, breakRef, shardsRef]);
  };

  useEffect(() => {
    setTimeout(() => handleResize(), 5);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={wrapperRef} className="flex flex-col">
      <div ref={contentRef} className="relative flow-root">
        <div
          ref={breakRef}
          className="relative float-left w-screen bg-background z-0 imageBreak -mt-24"
        >
          <div
            ref={shardsRef}
            className="absolute grid grid-cols-5 grid-rows-4 w-screen"
          >
            <div
              id="shardBlur7"
              className="col-start-5 row-start-2 opacity-90 text-right"
            >
              <div className="">
                <Image src={ShardBlur7} alt="" />
              </div>
            </div>
            <div id="shardBlurHeavy4" className="col-start-4 row-start-3">
              <div className="min-w-3/1 -ml-24">
                <Image src={ShardBlurHeavy4} alt="" />
              </div>
            </div>
          </div>
          <div ref={waveRef} className="absolute -z-10 mr-12">
            <Image src={Wave} alt="" />
          </div>
        </div>
        <div className="absolute flex justify-center items-center w-1/2 top-0 right-0 shadow-sm rounded-lg bg-surface -mt-24 mr-12">
          <div className="flex flex-col text-left gap-4 m-16">
            <h2 className="text-transparent text-sm bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
              ORGA
            </h2>
            <h1 className="text-3xl font-extralight">
              New Blockchain <span className="font-medium"> stack </span>
            </h1>
            <p className="text-textSecondary font-light">
              Nomic is built on <b>Orga</b>, a custom high-performance
              blockchain application framework. Orga is written in Rust, and
              engineered from the ground up for maximum performance and
              security.
            </p>
            <p className="text-textSecondary font-light">
              {`This boosts Nomic's performance up to 100x higher than other
              Cosmos-based chains, and lets us execute quickly by building
              advanced features using 10x less code.`}
            </p>
            <div className="flex flex-row font-light gap-2 text-lg">
              <span> View Github </span>
              <a href="https://github.com/nomic-io/orga">
                <div className="flex items-center h-full">
                  <Image src={More} alt="" className="inline ml-2" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
