import { useEffect, useState } from "react";

export const assets = {
  arweave: "ar",
  ethereum: "eth",
  "matic-network": "matic",
  binancecoin: "bnb",
  "avalanche-2": "avax",
  optimism: "op",
  tether: "usdt",
  "usd-coin": "usdc",
  "dai": "dai",
  "weth": "weth",
  "wrapped-bitcoin": "wbtc",
  "havven": "snx"
};

export function usePrice() {
  const [price, setPrice] = useState<{ [id: string]: { usd: number } }>({});

  useEffect(() => {
    (async () => {
      const storage = "price_cache";

      try {
        const res = await (
          await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${Object.keys(assets).join(",")}&vs_currencies=usd`,
          )
        ).json();

        console.log(res)

        localStorage.setItem(storage, JSON.stringify(res));
        setPrice(res);
      } catch {
        const cached = localStorage.getItem(storage);

        setPrice(cached ? JSON.parse(cached) : {});
      }
    })();
  }, []);

  return price;
}
