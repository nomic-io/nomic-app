import { useEffect, useRef, useState } from "react";
import FeaturePoint from "./FeaturePoint";
import Sheild from "../../public/icons/security.svg";
import Card from "../../public/icons/performance.svg";
import Eye from "../../public/icons/specialized.svg";
import HorizontalDots from "./HorizontalDots";
import Image from "next/image";

export default function Timeline() {
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const resizeHandleShort = useRef<NodeJS.Timeout>(null);
  const [horizontalDots, setHorizontalDots] = useState(0);

  const handleResize = () => {
    if (dotsContainerRef.current) {
      const containerWidth = dotsContainerRef.current.offsetWidth;
      setHorizontalDots(Math.floor(containerWidth / 24));
    }
  };

  useEffect(() => {
    setTimeout(() => handleResize(), 5);

    window.addEventListener("resize", () => {
      clearTimeout(resizeHandleShort.current);
      resizeHandleShort.current = setTimeout(handleResize, 15);
    });

    window.addEventListener("scroll", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-20 w-screen">
      <div className="flex flex-col gap-12 w-screen ml-6">
        <div ref={dotsContainerRef}>
          <HorizontalDots
            numDots={horizontalDots}
            className="md:w-1/2 justify-end"
          />
        </div>
        <div className="w-9/10 flex">
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
      <div className="flex flex-col w-full gap-12 ml-6">
        <div>
          <HorizontalDots
            numDots={horizontalDots}
            className="md:w-1/2 justify-end"
          />
        </div>
        <div className="w-9/10 flex">
          <FeaturePoint
            icon={<Image src={Eye} alt="Sheild" />}
            headerLine0={"Built by a"}
            headerLine1={"strong team"}
            bodyText={
              "The Nomic contributors have deep expertise with both Bitcoin and Cosmos, serving as early Cosmos engineers and working with Bitcoin since 2011."
            }
          />
        </div>
      </div>
    </div>
  );
}
