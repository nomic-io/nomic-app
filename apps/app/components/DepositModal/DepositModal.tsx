import { observer } from "mobx-react-lite";
import { AddressModal } from "./AddressModal";
import { SummaryModal } from "./SummaryModal";
import { DetectedModal } from "./DetectedModal";
import { Modal } from "@nomic-ui/components";
import { useRouter } from "next/router";
import { getUrlQueryParam, removeUrlQueryParams } from "@nomic-ui/utils";

const modalTypeMap = new Map(
  Object.entries({
    address: <AddressModal />,
    detected: <DetectedModal />,
    summary: <SummaryModal />,
  })
);

export const DepositModal = observer(() => {
  const router = useRouter();
  const depositParam = getUrlQueryParam(router, "deposit");

  return (
    <Modal
      show={!!depositParam}
      onClose={() => {
        removeUrlQueryParams(router, "deposit");
        return;
      }}
    >
      <div className="inline-block h-max bg-surfaceModal rounded-lg pt-5 pb-4 text-left shadow-xl transform sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
        {modalTypeMap.get(depositParam)}
      </div>
    </Modal>
  );
});
