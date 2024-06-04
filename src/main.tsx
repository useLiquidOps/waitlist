import BrowserWalletStrategy from "@arweave-wallet-kit-beta/browser-wallet-strategy";
import ArConnectStrategy from "@arweave-wallet-kit-beta/arconnect-strategy";
import { ArweaveWalletKit } from "@arweave-wallet-kit-beta/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        strategies: [new ArConnectStrategy(), new BrowserWalletStrategy()],
        permissions: [
          "ACCESS_ADDRESS",
          "SIGNATURE"
        ],
        ensurePermissions: true
      }}
      theme={{
        displayTheme: "light"
      }}
    >
      <App />
    </ArweaveWalletKit>
  </React.StrictMode>,
);