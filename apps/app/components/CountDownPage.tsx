import { useCountdown } from "../hooks/Countdown";
import Logo from "../public/logo.svg";
import Image from "next/image";

interface Props {
  endDate: number;
}

export const CountDownPage = ({ endDate }: Props) => {
  const [, hours, minutes, seconds] = useCountdown(endDate);

  return (
    <div className="grid place-items-center h-full w-full">
      <div className="flex flex-col gap-12 items-center">
        <div className="flex items-center mr-8 mt-4">
          <Image src={Logo} alt="Nomic" />
        </div>
        <h1 className="text-textPrimary text-9xl font-semibold">
          {(hours < 10 ? "0" + hours : hours.toString()) +
            ":" +
            (minutes < 10 ? "0" + minutes : minutes.toString()) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)}
        </h1>
      </div>
    </div>
  );
};
