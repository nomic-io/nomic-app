import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const TestnetIndicator = () => {
  return (
    <div className="bg-red-400 rounded-md mb-3">
      <div className="p-2">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon
              className="h-6 w-6 text-gray-900"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              This is the Nomic Testnet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
