import { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { BitcoinContext } from "../../contexts/BitcoinContext";
import { ConfirmationContext } from "../../contexts/ConfirmationContext";
import { Transaction } from "../../models/transaction";
import { ConfirmationModal } from "./ConfirmationModal";
import { Transition } from "@headlessui/react";
import { AddressAnimation } from "./AddressAnimation";
import { NomicContext } from "../../contexts/NomicContext";
import {
  displayBtc,
  displayPercentage,
  removeUrlQueryParams,
} from "@nomic-ui/utils";
import { useRouter } from "next/router";

interface SocketMessage {
  addr: string;
  value: number;
}

export const AddressModal = observer(() => {
  const bitcoinContext = useContext(BitcoinContext);
  const confirmationContext = useContext(ConfirmationContext);
  const nomic = useContext(NomicContext);
  const router = useRouter();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddress, setShowAddress] = useState(true);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function getAddress() {
      if (nomic.depositAddress) {
        return;
      }

      await nomic.generateAddress();
    }

    getAddress();
  }, [nomic.wallet?.address, nomic.depositAddress]);

  useEffect(() => {
    socket.current = new WebSocket("wss://ws.blockchain.info/inv");
    socket.current.onopen = () => {
      socket.current?.send(
        JSON.stringify({
          op: "unconfirmed_sub",
        })
      );
    };
    socket.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.x) {
        const hash = message.x.hash;
        message.x.out.forEach(async (tx: SocketMessage) => {
          if (tx.addr === nomic.depositAddress?.address) {
            socket.current?.send(
              JSON.stringify({
                op: "unconfirmed_unsub",
              })
            );

            const txn = await Transaction.deposit(
              BigInt(tx.value * 1e6),
              nomic.depositAddress,
              hash
            );

            bitcoinContext.addTransaction(txn);

            const transactions = JSON.parse(
              localStorage[
                "nomic/bitcoin/transactions/" + nomic.wallet.address
              ] || "[]"
            );

            transactions.push(txn.toJSON());
            localStorage.setItem(
              "nomic/bitcoin/transactions/" + nomic.wallet.address,
              JSON.stringify(transactions)
            );

            setShowAddress(false);

            setTimeout(() => {
              removeUrlQueryParams(router, "deposit");
            }, 250);

            socket.current?.close();
          }
        });
      }
    };

    const currSocket = socket.current;
    return () => {
      currSocket.close();
    };
  });

  useEffect(() => {
    setShowConfirmation(!confirmationContext.confirmed);
  }, [confirmationContext.confirmed]);

  return (
    <>
      <div className="grid place-items-center text-textPrimary">
        <Transition.Root
          className="absolute z-40 w-full"
          as="div"
          show={showConfirmation}
          enter="transform transition ease-in-out duration-10 sm:duration-700"
          enterFrom="translate-y-2"
          enterTo="translate-y-0"
          leave="transform transition ease-in-out duration-450 sm:duration-700"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <Transition.Child
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ConfirmationModal />
          </Transition.Child>
        </Transition.Root>
        <Transition
          className="w-full"
          show={showAddress}
          leave="ease-out duration-450 sm:duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col justify-center items-center w-full text-center gap-6">
            <h1 className="text-2xl font-semibold">Bitcoin Deposit Address</h1>
            <AddressAnimation />
            <div className="w-full text-center text-sm text-red-400 font-bold">
              <h3>
                This address is valid for 4 days. Deposits sent after this time
                will be lost.
              </h3>
            </div>
            <div className="px-4 pb-4 text-sm text-textSecondary font-bold w-full">
              <div className="flow-root">
                <h2 className="float-left"> Bitcoin Transaction Fee: </h2>
                <h3 className="float-right">
                  {displayBtc(Transaction.btcDepositFee)}
                </h3>
              </div>
              <div className="flow-root">
                <h2 className="float-left"> Nomic Bridge Fee: </h2>
                <h3 className="float-right">
                  {displayPercentage(Transaction.nomicBridgeFee)}
                </h3>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
});
