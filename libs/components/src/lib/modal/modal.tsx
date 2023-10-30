import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  show: boolean;
  onClose: (() => Promise<void>) | (() => void);
  children: React.ReactNode;
}

export function Modal({ show, onClose, children }: Props) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              style={{
                opacity: "50%",
                backgroundColor: "black",
              }}
              className="fixed inset-0 transition-opacity"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
