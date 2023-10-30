import { classJoin } from "@nomic-ui/utils";
import Image from "next/image";
import Github from "../../public/github.svg";
import Twitter from "../../public/twitter.svg";
import Telegram from "../../public/telegram.svg";
import Discord from "../../public/discord.svg";

const socials = [
  {
    element: Github,
    link: "https://github.com/nomic-io",
  },
  {
    element: Twitter,
    link: "https://twitter.com/nomicbtc",
  },
  {
    element: Telegram,
    link: "https://t.me/nomicbtc",
  },
  {
    element: Discord,
    link: "https://discord.gg/nomic",
  },
];

type socialProps = {
  className?: string;
};

export default function Socials({ className }: socialProps) {
  return (
    <div className={classJoin("flex flex-row items-center", className || "")}>
      {socials.map((social, i) => (
        <a key={i} href={social.link}>
          <button key={i} className="flex flex-col items-center">
            <Image src={social.element} alt="social" />
          </button>
        </a>
      ))}
    </div>
  );
}
