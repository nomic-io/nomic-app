import { Key } from "@keplr-wallet/types";
import { Wallet } from "./wallet";
import { config } from "../../config";
import { ChainInfo, IbcChain, NomicChain } from "../ibc-chain";
import { SigningStargateClient } from "@cosmjs/stargate";
import { makeStdTx } from "@cosmjs/amino";

export class Keplr implements Wallet {
  address?: string;
  connected = false;
  name?: string;
  logo = "/keplr.svg";
  queryableBalances = ["Nomic", "Evmos", "Kujira Testnet", "Notmic"];

  key?: Key;

  async isPresent() {
    return !window.keplr;
  }

  async connect() {
    await this.suggestChain();
    await window.keplr.enable(config.chainId);
    localStorage.setItem("nomic/wallet", "keplr");
    const key = await window.keplr.getKey(config.chainId);
    this.address = key.bech32Address;
    this.name = key.name;
    this.connected = true;
  }

  async sign(data: string) {
    const signer = window.keplr.getOfflineSigner(config.chainId);
    const signDoc = JSON.parse(data);

    const res = await signer.signAmino(this.address, signDoc);
    const tx = makeStdTx(signDoc, res.signature);

    const resOut = await Wallet.broadcast(tx);
    if (resOut.checkTx.code !== 0) {
      throw new Error(resOut.checkTx.log);
    }

    if (resOut.deliverTx?.code !== 0) {
      throw new Error(resOut.deliverTx?.log);
    }
  }

  async provideSigner(chain: ChainInfo) {
    const offlineSigner = await window.keplr.getOfflineSigner(
      NomicChain.chainId
    );
    try {
      const cosmJs = await SigningStargateClient.connectWithSigner(
        chain.rpcEndpoint,
        offlineSigner
      );
      return cosmJs;
    } catch (e) {
      console.error(e);
    }
  }

  async suggestChain() {
    // await window.keplr.experimentalSuggestChain({
    //   chainId: "notmic",
    //   chainName: "Notmic",
    //   rpc: "http://10.16.57.192:26667",
    //   rest: "http://10.16.57.192:1317",
    //   bip44: {
    //     coinType: 118,
    //   },
    //   bech32Config: {
    //     bech32PrefixAccAddr: "cosmos",
    //     bech32PrefixAccPub: "cosmos" + "pub",
    //     bech32PrefixValAddr: "cosmos" + "valoper",
    //     bech32PrefixValPub: "cosmos" + "valoperpub",
    //     bech32PrefixConsAddr: "cosmos" + "valcons",
    //     bech32PrefixConsPub: "cosmos" + "valconspub",
    //   },
    //   currencies: [
    //     {
    //       coinDenom: "STAKE",
    //       coinMinimalDenom: "stake",
    //       coinDecimals: 6,
    //     },
    //   ],
    //   feeCurrencies: [
    //     {
    //       coinDenom: "STAKE",
    //       coinMinimalDenom: "stake",
    //       coinDecimals: 6,
    //       gasPriceStep: {
    //         low: 0,
    //         average: 0,
    //         high: 0,
    //       },
    //     },
    //   ],
    //   stakeCurrency: {
    //     coinDenom: "STAKE",
    //     coinMinimalDenom: "stake",
    //     coinDecimals: 6,
    //   },
    //   coinType: 119,
    //   walletUrlForStaking: config.stakingUrl,
    //   features: ["stargate"],
    // });

    await window.keplr.experimentalSuggestChain({
      chainId: config.chainId,
      chainName: config.chainName,
      rpc: config.rpcUrl,
      rest: config.restUrl,
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: "nomic",
        bech32PrefixAccPub: "nomic" + "pub",
        bech32PrefixValAddr: "nomic" + "valoper",
        bech32PrefixValPub: "nomic" + "valoperpub",
        bech32PrefixConsAddr: "nomic" + "valcons",
        bech32PrefixConsPub: "nomic" + "valconspub",
      },
      currencies: [
        {
          coinDenom: "NOM",
          coinMinimalDenom: "unom",
          coinDecimals: 6,
        },
        {
          coinDenom: "nBTC",
          coinMinimalDenom: "uSAT",
          coinDecimals: 14,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "NOM",
          coinMinimalDenom: "unom",
          coinDecimals: 6,
          gasPriceStep: {
            low: 0,
            average: 0,
            high: 0,
          },
        },
      ],
      stakeCurrency: {
        coinDenom: "NOM",
        coinMinimalDenom: "unom",
        coinDecimals: 6,
      },
      coinType: 119,
      walletUrlForStaking: config.stakingUrl,
      features: ["stargate"],
    });
  }
}
