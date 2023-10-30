import { Wallet } from "./wallet";
import detectEthereumProvider from "@metamask/detect-provider";
import { IbcChain } from "../ibc-chain";
import init, * as nomic from "nomic-wasm-dev";
import { makeStdTx } from "@cosmjs/amino";
import { fromRpcSig, ecrecover, hashPersonalMessage } from "@ethereumjs/util";
import secp256k1 from "secp256k1";

declare type Nomic = typeof import("nomic-wasm-dev");

export class Metamask implements Wallet {
  address?: string;
  ethAddress?: string;
  connected = false;
  name? = "Metamask";
  logo = "/metamask.svg";
  queryableBalances = ["Nomic"];

  async isPresent() {
    const ethereumProvider = await detectEthereumProvider();

    return ethereumProvider && ethereumProvider.isMetaMask;
  }

  async connect() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    localStorage.setItem("nomic/wallet", "metamask");
    this.ethAddress = accounts[0];
    this.address = (nomic as Nomic).convertEthAddress(accounts[0]);
    this.connected = true;
  }

  async sign(data: string) {
    const hexData = `0x${Buffer.from(data, "utf8").toString("hex")}`;
    const signature = await (window as any).ethereum.request({
      method: "personal_sign",
      params: [hexData, this.ethAddress],
    });

    const signDoc = JSON.parse(data);
    const ecdSig = fromRpcSig(signature);
    const messageHash = hashPersonalMessage(Buffer.from(data));
    const publicKey = ecrecover(messageHash, ecdSig.v, ecdSig.r, ecdSig.s);
    const pubKey = secp256k1.publicKeyConvert(
      Buffer.concat([Buffer.from([4]), publicKey])
    );

    const tx = makeStdTx(signDoc, {
      pub_key: {
        type: "tendermint/PubKeySecp256k1",
        value: Buffer.from(pubKey).toString("base64"),
      },
      signature: Buffer.concat([ecdSig.r, ecdSig.s]).toString("base64"),
    });

    tx.signatures[0]["type"] = "eth";
    await Wallet.broadcast(tx);
  }
}
