import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { removeUrlQueryParams } from "@nomic-ui/utils";

export const DetectedModal = () => {
  const [aniDone, setAniDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      removeUrlQueryParams(router, "deposit");
    }, 2000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAniDone(true);
    }, 1700);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid place-items-center text-center mt-8 mb-8">
        <div className="mb-16">
          <Transition
            show={!aniDone}
            leave="ease-out duration-450 sm:duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="mb-16">
              <h1 className="text-2xl font-semibold">Deposit Detected</h1>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
