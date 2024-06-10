import BrowserWalletStrategy from "@arweave-wallet-kit-beta/browser-wallet-strategy";
import ArConnectStrategy from "@arweave-wallet-kit-beta/arconnect-strategy";
import OthentStrategy from "@arweave-wallet-kit-beta/othent-strategy";
import { ArweaveWalletKit } from "@arweave-wallet-kit-beta/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import React from "react";
import { WalletConnectWrapper } from "./utils/wallets/walletConnect.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletConnectWrapper>
      <ArweaveWalletKit
        config={{
          strategies: [
            new ArConnectStrategy(),
            new OthentStrategy(),
            new BrowserWalletStrategy(),
          ],
          permissions: ["ACCESS_ADDRESS", "SIGNATURE", "ACCESS_PUBLIC_KEY"],
          ensurePermissions: true,
        }}
        theme={{ displayTheme: "light" }}
      >
        <App />
      </ArweaveWalletKit>
    </WalletConnectWrapper>
  </React.StrictMode>,
);
