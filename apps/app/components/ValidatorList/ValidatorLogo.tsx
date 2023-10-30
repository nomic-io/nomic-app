import { observer } from "mobx-react-lite";
import { fetchLogo, Validator } from "../../models/validator";
import Image from "next/image";
import { useEffect } from "react";

type ValidatorLogoProps = {
  validator: Validator;
  height?: number;
  width?: number;
};

export const ValidatorLogo = observer(
  ({ validator, height = 40, width = 40 }: ValidatorLogoProps) => {
    const codePoint = validator?.info.moniker.codePointAt(0);
    const valChar = codePoint ? String.fromCodePoint(codePoint) : "";

    return validator.logo ? (
      <div className="rounded-full flex items-center justify-center relative">
        <Image
          height={40}
          width={40}
          src={validator.logo}
          alt=""
          className="rounded-full"
          style={{
            minWidth: "40px",
          }}
          onError={async () => {
            const storageKey = "nomic/validator/logo/" + validator.address;
            localStorage.removeItem(storageKey);
            let logo = await fetchLogo(validator.info.identity);
            if (!logo) {
              validator.logo = null;
              return;
            }
            logo = logo.replace(/"/g, "");
            validator.logo = logo;
            localStorage.setItem(storageKey, logo);
          }}
        />
      </div>
    ) : (
      <div
        className="rounded-full flex items-center justify-center relative bg-gradient-20 from-gradientStart to-gradientStop"
        style={{
          height: height + "px",
          width: width + "px",
        }}
      >
        <span className="font-medium leading-none text-white">{valChar}</span>
      </div>
    );
  }
);
