import Bridge from "../../public/bridge.svg";
import More from "../../public/more.svg";
import Image from "next/image";

export const ValuesContent = () => {
  return (
    <div className="flex flex-col md:flex-row mt-12 md:mt-24 justfiy-center items-center">
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <div className="md:w-5/6">
          <Image src={Bridge} alt="bridge" />
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="flex flex-col text-left gap-4">
          <h2 className="text-transparent text-sm bg-clip-text bg-gradient-20 from-gradientStart to-gradientStop">
            THE BRIDGE
          </h2>
          <h1 className="text-3xl md:text-5xl font-extralight">
            What is
            <span className="font-medium"> Nomic? </span>
          </h1>
          <div className="text-textSecondary font-extralight text-lg">
            <p>
              <b>Nomic</b> is a layer-1 blockchain which offers a decentralized,
              non-custodial Bitcoin bridge.
            </p>
            <p>
              <b>nBTC</b> is a token that represents 1:1 ownership of Bitcoin in
              an IBC-compatible token.
            </p>
            <p>
              <b>NOM</b> is a token used for securing the network which can be
              staked to earn Bitcoin rewards.
            </p>
          </div>
          <div className="flex flex-row font-light gap-2 text-lg items-center">
            <span> View Design Document </span>
            <a href="https://gist.github.com/mappum/da11e37f4e90891642a52621594d03f6">
              <div className="flex items-center h-full">
                <Image className="" src={More} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
