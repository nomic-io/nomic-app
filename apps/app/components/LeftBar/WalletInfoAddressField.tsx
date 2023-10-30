import { useContext } from "react";
import { useEffect, useState } from "react";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { NomicContext } from "../../contexts/NomicContext";

export const WalletInfoAddressField = () => {
  const [copied, setCopied] = useState(false);
  const nomic = useContext(NomicContext);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(nomic.wallet.address);
  };

  const getTruncation = () => {
    return (
      nomic.wallet.address.slice(0, 12) + "..." + nomic.wallet.address.slice(-5)
    );
  };

  return (
    <div className="bg-surfaceDark border-none rounded-full shadow-inner text-textSecondary hover:text-textTertiary">
      <button
        className="flex flex-row gap-4 text-left w-full justify-between"
        onClick={copyToClipboard}
      >
        <span
          id="address-field"
          className="block border-0 text-sm pl-4 truncate"
        >
          {getTruncation()}
        </span>
        <div className="py-1 pr-4">
          {!copied ? (
            <ClipboardDocumentIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ClipboardDocumentCheckIcon
              className="h-4 w-4 text-green-600"
              aria-hidden="true"
            />
          )}
        </div>
      </button>
    </div>
  );
};
