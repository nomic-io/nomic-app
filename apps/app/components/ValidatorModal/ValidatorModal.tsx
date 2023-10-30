import { useContext, useEffect, useState } from "react";
import { DelegationModal } from "./DelegationModal/DelegationModal";
import { UndelegationModal } from "./UndelegationModal/UndelegationModal";
import { ValidatorInfoModal } from "./ValidatorInfoModal/ValidatorInfoModal";
import { RedelegationModal } from "./RedelegationModal/RedelegationModal";
import { observer } from "mobx-react-lite";
import { ErrorContext } from "../../contexts/ErrorContext";
import { NomicContext } from "../../contexts/NomicContext";
import { Validator404 } from "./Validator404";
import { Modal } from "@nomic-ui/components";
import { useRouter } from "next/router";
import { getUrlQueryParam, removeUrlQueryParams } from "@nomic-ui/utils";

export const ValidatorModal = observer((): JSX.Element => {
  const error = useContext(ErrorContext);
  const nomic = useContext(NomicContext);
  const router = useRouter();

  const selectedValidatorAddress = getUrlQueryParam(router, "validator");
  const selectedModal = getUrlQueryParam(router, "modal");
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      removeUrlQueryParams(router, "modal", "validator");
    }, 350);
  };

  const modalTypeMap = new Map(
    Object.entries({
      info: <ValidatorInfoModal />,
      delegation: <DelegationModal closeModal={closeModal} />,
      undelegation: <UndelegationModal closeModal={closeModal} />,
      redelegation: <RedelegationModal closeModal={closeModal} />,
    })
  );

  useEffect(() => {
    setShowModal(!!selectedModal && !!selectedValidatorAddress);
  }, [selectedModal, selectedValidatorAddress]);

  return (
    <Modal
      show={showModal}
      onClose={() => {
        if (!error.showError) {
          setShowModal(false);
          setTimeout(() => {
            removeUrlQueryParams(router, "modal", "validator");
          }, 350);
        }
      }}
    >
      <div className="inline-block bg-surfaceModal align-bottom rounded-lg p-8 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle text-textPrimary">
        {selectedValidatorAddress &&
        nomic.getValidator(selectedValidatorAddress) ? (
          selectedModal ? (
            modalTypeMap.get(selectedModal)
          ) : (
            <></>
          )
        ) : (
          <Validator404 address={selectedValidatorAddress} />
        )}
      </div>
    </Modal>
  );
});
