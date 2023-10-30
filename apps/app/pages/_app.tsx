import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { useContext, useEffect } from "react";
import { NomicContext } from "../contexts/NomicContext";
import { AppLayout } from "../layouts/AppLayout";
import { configure } from "mobx";
import { BitcoinContext } from "../contexts/BitcoinContext";
configure({
  useProxies: "never",
  enforceActions: "never",
});

function CustomApp({ Component, pageProps }: AppProps) {
  const nomic = useContext(NomicContext);
  const bitcoin = useContext(BitcoinContext);

  useEffect(() => {
    async function init() {
      await nomic.init();
      const wallet = nomic.getCurrentWallet();
      if (wallet && !wallet.connected) {
        await wallet.connect();
        nomic.wallet = wallet;
        await nomic.build();
      }
      await bitcoin.getBitcoinPrice();
    }
    init();
  }, []);

  return (
    <>
      <Head>
        <title>Nomic Bitcoin Bridge</title>
      </Head>
      <div suppressHydrationWarning className="h-screen">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </div>
    </>
  );
}

export default CustomApp;
