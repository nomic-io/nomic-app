import { useContext } from "react";
import { ValidatorLogo } from "../ValidatorList/ValidatorLogo";
import { NomicContext } from "../../contexts/NomicContext";
import { displayPercentage, getUrlQueryParam } from "@nomic-ui/utils";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type ValidatorCardHeaderProps = {
  showDescription?: boolean;
};

export const ValidatorCardHeader = ({
  showDescription = true,
}: ValidatorCardHeaderProps) => {
  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedValidator = nomic.getValidator(selectedValidatorAddress);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-12">
          <ValidatorLogo validator={selectedValidator} height={52} width={52} />
        </div>
        <div className="text-left">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center text-textPrimary">
              <h3 className="text-lg leading-none font-medium">
                {selectedValidator.info.moniker}
              </h3>
              <p className="text-xs text-textSecondary">
                {"Commission: " +
                  displayPercentage(selectedValidator.commission)}
              </p>
              <button className="w-4">
                <a
                  href={selectedValidator.info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center"
                  onMouseOver={() => {
                    document.getElementById("tooltip").style.display = "block";
                  }}
                  onMouseLeave={() => {
                    document.getElementById("tooltip").style.display = "none";
                  }}
                >
                  <div className="absolute w-4 h-4">
                    <GlobeAltIcon />
                  </div>
                  <div
                    id="tooltip"
                    className="bg-modalTooltip absolute hidden rounded-lg mb-5 ml-5 px-2 py-1"
                  >
                    {selectedValidator.info.website}
                  </div>
                </a>
              </button>
            </div>
            {showDescription ? (
              <h1 className="text-sm text-textSecondary leading-2 w-96 max-w-sm">
                {selectedValidator.info.details}
              </h1>
            ) : null}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
