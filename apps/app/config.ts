class Config {
  chainId: string;
  chainName: string;
  stakingUrl: string;
  rpcUrl: string;
  restUrl: string;
  relayerUrl: string;

  constructor() {
    const env = process.env.NEXT_PUBLIC_APP_ENV;

    if (env === "internal") {
      this.chainId = "nomic-testnet-4d";
      this.chainName = "Nom Internal Testnet 4d";
      this.stakingUrl = "http://localhost:4200";
      this.rpcUrl = "localhost:26657";
      this.restUrl = "http://10.16.57.178:8443";
      this.relayerUrl = "https://testnet-relayer.nomic.io:8443";
    } else if (env === "testnet") {
      this.chainId = "nomic-testnet-4d";
      this.chainName = "Nomic Testnet 4d";
      this.stakingUrl = "https://testnet.nomic.io";
      this.rpcUrl = "https://testnet-rpc.nomic.io:2096";
      this.restUrl = "https://testnet-api.nomic.io:8443";
      this.relayerUrl = "https://testnet-relayer.nomic.io:8443";
    } else {
      this.chainId = "nomic-stakenet-3";
      this.chainName = "Nomic Stakenet 3";
      this.stakingUrl = "https://app.nomic.io";
      this.rpcUrl = "http://138.197.71.46:26657/";
      this.restUrl = "https://app.nomic.io:8443";
      this.relayerUrl = "https://relayer.nomic.io:8443";
    }
  }
}

export const config = new Config();
