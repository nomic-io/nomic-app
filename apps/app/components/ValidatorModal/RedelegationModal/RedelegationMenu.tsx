import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Validator } from "../../../models/validator";
import { NomicContext } from "../../../contexts/NomicContext";
import { ValidatorLogo } from "../../ValidatorList/ValidatorLogo";
import { observer } from "mobx-react-lite";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type RedelegationMenuProps = {
  redelegationSelection: Validator | null;
  setRedelegationSelection: (val: Validator | null) => void;
};

export const RedelegationMenu = observer(
  ({
    redelegationSelection,
    setRedelegationSelection,
  }: RedelegationMenuProps) => {
    const nomic = useContext(NomicContext);

    return (
      <Menu
        as="div"
        className="w-full relative inline-block text-left align-text-middle z-10"
      >
        <div>
          {redelegationSelection ? (
            <Menu.Button className="h-15 inline-flex justify-center align-middle w-full rounded-md border border-textTertiary shadow-sm px-4 py-2 bg-surfaceModal text-sm font-medium text-textPrimary hover:bg-modalTooltip focus:outline-none">
              <div className="flex items-center text-center">
                <ValidatorLogo validator={redelegationSelection} />
                <div className="ml-4">
                  <div className="text-sm font-medium text-textPrimary">
                    {redelegationSelection.info.moniker.length > 20
                      ? redelegationSelection.info.moniker.slice(0, 20) + "..."
                      : redelegationSelection.info.moniker}
                  </div>
                </div>
              </div>
              <ChevronDownIcon
                className="-mr-1 mt-2.5 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          ) : (
            <Menu.Button className="h-12 inline-flex justify-center align-middle w-full rounded-md border border-textTertiary shadow-sm px-4 py-2 bg-surfaceModal text-sm font-medium text-textPrimary hover:bg-modalTooltip focus:outline-none">
              <div className="mt-1">Select a Validator</div>
              <ChevronDownIcon
                className="-mr-1 mt-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          )}
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute overflow-auto origin-top-right h-64 align-left right-0 mt-2 w-full rounded-md shadow-lg bg-surfaceModal focus:outline-none">
            <div className="py-1">
              {nomic.validators
                .filter((validator: Validator) => {
                  return !validator.isJailed && validator.isActive;
                })
                .map((validator: Validator) => (
                  <Menu.Item key={validator.address}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active
                            ? "w-full bg-modalTooltip text-textPrimary"
                            : "w-full text-textPrimary",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => setRedelegationSelection(validator)}
                      >
                        {validator.info.moniker}
                      </button>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);
