import { useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import { AddressField } from "../AddressField";
import { NomicContext } from "../../contexts/NomicContext";

export const AddressAnimation = () => {
  const nomic = useContext(NomicContext);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <div className="bg-white shadow-inner p-4 rounded-lg mr-4 ml-4 z-10">
          {nomic.depositAddress ? (
            <QRCodeSVG value={nomic.depositAddress.address} />
          ) : (
            <h1>Loading Address...</h1>
          )}
        </div>
        <div className="w-3/4 mb-1 mr-1 ml-1">
          {nomic.depositAddress ? (
            <AddressField address={nomic.depositAddress.address} />
          ) : (
            <h1>Loading Address...</h1>
          )}
        </div>
      </div>
    </>
  );
};
