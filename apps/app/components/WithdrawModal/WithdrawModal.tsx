import { observer } from "mobx-react-lite";
import { FormModal } from "./FormModal";
import { Modal } from "@nomic-ui/components";
import { getUrlQueryParam, removeUrlQueryParams } from "@nomic-ui/utils";
import { useRouter } from "next/router";

export const WithdrawModal = observer(() => {
  const router = useRouter();
  const withdrawParam = getUrlQueryParam(router, "withdraw");
  return (
    <Modal
      show={!!withdrawParam}
      onClose={() => {
        removeUrlQueryParams(router, "withdraw");
      }}
    >
      <div className="inline-block h-max bg-surfaceModal rounded-lg pt-5 pb-4 text-left shadow-xl transform sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
        <FormModal />
      </div>
    </Modal>
  );
});
