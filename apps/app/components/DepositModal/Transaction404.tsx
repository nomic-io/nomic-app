import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const Transaction404 = () => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Transaction not Found
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>No recent transaction data found.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
