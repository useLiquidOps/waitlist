import { useEffect, useState } from "react"

export function usePrice(symbol: string) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    (async () => {
      const storage = symbol + "_price_cache";

      try {
        const res = await (
          await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`,
          )
        ).json();

        if (!res?.[symbol]?.usd) {
          throw new Error("");
        }

        localStorage.setItem(storage, res[symbol].usd.toString());
        setPrice(res[symbol].usd);
      } catch {
        const cached = localStorage.getItem(storage);

        setPrice(cached ? parseFloat(cached) : 0);
      }
    })();
  }, [symbol]);

  return price;
}
