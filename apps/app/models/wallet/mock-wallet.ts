import { Wallet } from "./wallet";
import { IbcChain } from "../ibc-chain";

export class MockWallet implements Wallet {
  address?: string;
  connected = false;
  name?: string;
  logo = "/keplr.svg";
  queryableBalances = ["Nomic"]

  async isPresent() {
      return true;
  }

  async connect() {
    this.address = "nomicmock12345667890";
    this.name = "usability tester";
    this.connected = true;
  }

  async sign(data: string) {
      return;
  }
}
