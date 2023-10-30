import More from "../../public/more.svg";
import Image from "next/image";

export default function OrgaSmall() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-12">
        <div className="bg-surface">
          <div className="mx-6 flex flex-col text-left gap-4 py-24">
            <h2 className="text-transparent text-sm bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
              ORGA
            </h2>
            <span className="text-3xl flex gap-3">
              <h1 className="font-extralight"> {"New blockchain" + " "} </h1>
              <h1 className="font-medium"> stack </h1>
            </span>
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
