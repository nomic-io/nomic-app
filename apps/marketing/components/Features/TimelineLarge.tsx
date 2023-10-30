import { useEffect, useRef, useState } from "react";
import FeaturePoint from "./FeaturePoint";
import Sheild from "../../public/icons/security.svg";
import Card from "../../public/icons/performance.svg";
import Eye from "../../public/icons/specialized.svg";
import HorizontalDots from "./HorizontalDots";
import VerticalDots from "./VerticalDots";
import Image from "next/image";

export default function TimelineLarge() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const verticalRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const dotContainerRef = useRef<HTMLDivElement>(null);
  const [horizontalDots, setHorizontalDots] = useState(0);
  const [verticalDots, setVerticalDots] = useState(0);

  const handleResize = () => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      setVerticalDots(Math.floor(contentHeight / 24));
      if (timelineRef.current) {
        timelineRef.current.style.height = `${contentHeight}px`;
      }
      if (teamRef.current) {
        teamRef.current.style.marginTop = `0px`;
        const teamOffset = teamRef.current.offsetTop;
        if (teamOffset % 24 != 0) {
          teamRef.current.style.marginTop = `${24 - (teamOffset % 24)}px`;
        }
      }
      if (moreRef.current) {
        moreRef.current.style.marginTop = `0px`;
        const teamOffset = moreRef.current.offsetTop;
        if (teamOffset % 24 != 0) {
          moreRef.current.style.marginTop = `${24 - (teamOffset % 24)}px`;
        }
      }
      if (dotContainerRef.current) {
        const containerWidth = dotContainerRef.current.offsetWidth;
        setHorizontalDots(Math.floor(containerWidth / 24));
      }
    }
  };

  useEffect(() => {
    setTimeout(() => handleResize(), 5);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={timelineRef} className="flex justify-center w-full">
      <div ref={verticalRef} className="flex justify-center absolute w-full">
        <VerticalDots numDots={verticalDots} />
      </div>
      <div ref={contentRef} className="absolute w-full">
        <div className="flex flex-col w-full mb-48 gap-24">
          <div className="flex flex-row mx-6 md:mx-12 lg:mx-24">
            <div className="w-1/2">
              <div ref={dotContainerRef} className="mr-5">
                <HorizontalDots
                  numDots={horizontalDots}
                  className={"justify-end"}
                />
              </div>
              <div className="pr-24 mt-12">
                <FeaturePoint
                  icon={<Image src={Sheild} alt="Sheild" />}
                  headerLine0={"The most"}
                  headerLine1={"secure bridge"}
                  bodyText={
                    "Our mechanism has been carefully designed to be secure in ways where other bridges fall short. Nomic's Bitcoin reserve makes use of Taproot and Schnorr signatures as well as innovative security features to make nBTC the safest Bitcoin bridge asset."
                  }
                />
              </div>
            </div>
            <div className="w-1/2" />
          </div>
          <div ref={teamRef} className="flex flex-row mx-6 md:mx-12 lg:mx-24">
            <div className="w-1/2" />
            <div className="w-1/2">
              <div className="ml-5">
                <HorizontalDots numDots={horizontalDots} />
              </div>
              <div className="pl-24 mt-12">
                <FeaturePoint
                  icon={<Image src={Eye} alt="Eye" />}
                  headerLine0={"Built by a"}
                  headerLine1={"strong team"}
                  bodyText={
                    "The Nomic contributors have deep expertise with both Bitcoin and Cosmos, serving as early Cosmos engineers and working with Bitcoin since 2011."
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
