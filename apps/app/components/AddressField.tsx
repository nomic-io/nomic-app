import { useEffect, useState } from "react";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

type AddressFieldProps = {
  address: string;
};

export const AddressField = ({ address }: AddressFieldProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(address);
  };

  const getTruncation = () => {
    if (!address) {
      return "";
    }
    return address.slice(0, 18) + "..." + address.slice(-4);
  };

  return (
    <button
      className="w-full relative z-0 border bg-surface text-left border-none rounded-md shadow-inner rounded-full"
      onClick={copyToClipboard}
    >
      <span
        id="address-field"
        className="block border-0 text-textPrimary sm:text-sm pl-5 truncate"
      >
        {getTruncation()}
      </span>
      <div className="absolute inset-y-0 right-0 flex py-0.5 pr-4">
        {!copied ? (
          <ClipboardDocumentIcon
            className="h-4 w-4 text-textPrimary"
            aria-hidden="true"
          />
        ) : (
          <ClipboardDocumentCheckIcon
            className="h-4 w-4 text-green-600"
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
};
