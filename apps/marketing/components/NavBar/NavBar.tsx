import Socials from "./Socials";
import { Button } from "../Button";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="flex flex-col top-0 bg-background w-screen">
      <div className="flex flex-row justify-between items-center h-24 mx-6 md:mx-12 lg:mx-24">
        <Image src="/logo.svg" alt="logo" height={48} width={128} />
        {/* <div className="flex items-center">
              <PageNav />
            </div> */}
        <div className="flex flex-row w-2/3 justify-end">
          <div className="hidden gap-6 md:flex flex-row items-center">
            <Socials className="gap-3" />
            <a
              href="https://app.nomic.io"
              className="flex flex-col items-center"
            >
              <Button className={"bg-primary"}>
                <h2 className="text-sm text-textPrimary">ENTER THE APP</h2>
              </Button>
            </a>
          </div>
          <div className="hidden flex items-center h-12">
            <button>
              <a>
                <Image src="/icons/menu.svg" alt="" width={30} height={30} />
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-textTertiary h-px w-full opacity-20 blur-lg" />
    </div>
  );
}
