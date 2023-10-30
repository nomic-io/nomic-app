import Nomic from "../public/logo-small.svg";
import { config } from "../config";
import Kuji from "../public/kuji.svg";

export interface ChainInfo {
  name: string;
  logo: string;
  chainId: string;
  rpcEndpoint: string;
}

export interface IbcInfo {
  source: {
    channelId: string;
    port: string;
    nBtcIbcDenom: string;
  };
  destination: {
    channelId: string;
    port: string;
  };
  locked: boolean;
}

export type IbcChain = ChainInfo & IbcInfo;

export const NomicChain: IbcChain = {
  name: "Nomic",
  logo: Nomic,
  chainId: config.chainId,
  rpcEndpoint: config.rpcUrl,
  source: {
    channelId: "channel-0",
    port: "transfer",
    nBtcIbcDenom: "usat",
  },
  destination: {
    channelId: "channel-0",
    port: "transfer",
  },
  locked: true,
};

export const EvmosChain: ChainInfo = {
  name: "Evmos",
  logo: "",
  chainId: "evmos_9001-2",
  rpcEndpoint: "https://tendermint.bd.evmos.org:26657"
}

export const KujiraChain: IbcChain = {
  name: "Kujira Testnet",
  logo: Kuji,
  chainId: "harpoon-4",
  rpcEndpoint: "https://rpc.harpoon.kujira.setten.io",
  source: {
    channelId: "channel-37",
    port: "transfer",
    nBtcIbcDenom:
      "ibc/DCDCAF4399A0804D177740C634E305B2CB3A0137789A26EDC3E4B18FC4F2D176",
  },
  destination: {
    channelId: "channel-0",
    port: "transfer",
  },
  locked: true,
};

// export const NotmicChain: IbcChain = {
//   name: "Notmic",
//   logo: Kuji,
//   chainId: "notmic",
//   rpcEndpoint: "http://10.16.57.192:26667",
//   source: {
//     channelId: "channel-12",
//     port: "transfer",
//     nBtcIbcDenom:
//       "ibc/1AF82BF7015E1D8173948325DDA6C6B4ACDA8C6C7B791DC8C65477BB5D9396D2",
//   },
//   destination: {
//     channelId: "channel-1",
//     port: "transfer",
//   },
//   locked: true,
// }

export const Chains: IbcChain[] = [
  NomicChain,
  // NotmicChain,
  KujiraChain
];
