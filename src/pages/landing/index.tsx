import {
  useActiveAddress,
  useStrategy,
  useConnection,
  usePublicKey,
} from "@arweave-wallet-kit-beta/react";
import { Paragraph, SectionTitle, Title } from "../../components/Text";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import AnimatedCheck from "../../components/AnimatedCheck";
import { signMessage } from "@othent/kms";
import { styled } from "@linaria/react";
import Wrapper from "../../components/Wrapper";
import Spinner from "../../components/Spinner";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"

export default function Home() {
  const { connect, disconnect } = useConnection();
  const arAddr = useActiveAddress();
  const publicKey = usePublicKey();
  const [email, setEmail] = useState<string | undefined>();
  const strategy = useStrategy();

  const [users, setUsers] = useState<{ address: string; balance: number }[]>(
    []
  );

  const [arPrice, setArPrice] = useState(0);

  const { open } = useWeb3Modal();
  const { address: ethAddr } = useAccount();
  const { disconnect: disconnectEth } = useDisconnect();
  const { signMessage: signMsgEth, data: signMsgData } = useSignMessage();

  const [arSig, setArSig] = useState<number[] | undefined>();

  const address = useMemo(() => arAddr || ethAddr, [ethAddr, arAddr]);
  const connected = useMemo(() => typeof address === "string", [address]);
  const mode = useMemo(() => {
    if (typeof address !== "string") return undefined;
    return address.length === 42 ? "eth" : "ar";
  }, [address]);

  useEffect(() => {
    (async () => {
      try {
        const res = await (
          await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=arweave&vs_currencies=usd"
          )
        ).json();

        if (!res?.arweave?.usd) {
          throw new Error("");
        }

        localStorage.setItem("ar_price_cache", res.arweave.usd.toString());
        setArPrice(res.arweave.usd);
      } catch {
        const cached = localStorage.getItem("ar_price_cache");

        setArPrice(cached ? parseFloat(cached) : 0);
      }
    })();
  }, []);

  const [stats, setStats] = useState<{ users: number; arTokens: number }>({
    users: 0,
    arTokens: 0,
  });

  const [joined, setJoined] = useState(false);

  useEffect(() => {
    (async () => {
      if (!address) {
        return setJoined(false);
      }

      const res = await (
        await fetch(`https://waitlist-server.lorimer.pro/check-address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: address,
          }),
        })
      ).json();

      setJoined(res?.inWaitlist);
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("https://waitlist-server.lorimer.pro/waitlist-stats")
      ).json();

      if (
        typeof res?.users !== "undefined" &&
        typeof res?.arTokens !== "undefined"
      )
        setStats(res);
    })();
  }, [joined]);

  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("https://waitlist-server.lorimer.pro/get-address-list")
      ).json();

      setUsers(res);
    })();
  }, [joined]);

  const [emailStatus, setEmailStatus] = useState<"error" | undefined>();
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    if (!address) return;
    if (
      !email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
      email != "" &&
      typeof email != "undefined"
    ) {
      return setEmailStatus("error");
    } else if (emailStatus === "error") {
      setEmailStatus(undefined);
    }

    setLoading(true);

    try {
      if (mode === "ar") {
        const data = new TextEncoder().encode(address);

        if (strategy === "othent") {
          setArSig(await signMessage(data, { hashAlgorithm: "SHA-256" }));
        } else {
          setArSig(Array.from(
            // @ts-expect-error
            await window.arweaveWallet.signMessage(data)
          ));
        }
      } else {
        signMsgEth({ message: address })
      }
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (!mode || !address) return;
        if (mode === "ar" && (!arSig || !publicKey)) return;
        if (mode === "eth" && !signMsgData) return;

        const res = await (
          await fetch(`https://waitlist-server.lorimer.pro/record-address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              owner: publicKey,
              signature: mode === "ar" ? arSig : signMsgData,
              walletAddress: address,
              network: mode.toUpperCase()
            }),
          })
        ).json();
  
        setJoined(res?.success || false);
        if (res?.success) setEmail("");
      } catch {}

      setLoading(false);
    })();
  }, [arSig, signMsgData, address, publicKey, mode]);

  return (
    <>
      <Wrapper>
        <div>
          <Title>Operation Liquidity</Title>
          <Spacer y={0.4} />
          <Paragraph>
            Operation Liquidity is the very first lending protocol on arweave
            and the ao computer
          </Paragraph>
        </div>
        <Form>
          <SectionTitle>Join the waitlist!</SectionTitle>
          <Spacer y={0.6} />
          <Paragraph>
            Subscribe to our newsletter to know when we are ready. Don't worry,
            we won't spam you!
          </Paragraph>
          {(!joined && (
            <>
              <Spacer y={1.5} />
              <Input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                status={emailStatus}
              />
              <Spacer y={1.5} />
              <Buttons>
                {(!connected && (
                  <>
                    <Button onClick={() => connect()}>
                      Arweave
                    </Button>
                    <Button onClick={() => open()}>
                      Ethereum
                    </Button>
                  </>
                )) || (
                  <Button onClick={() => subscribe()}>
                    {!loading ? "Sign up" : <Spinner />}
                  </Button>
                )}
              </Buttons>
              {connected && !joined && (
                <>
                  <Spacer y={1} />
                  <Paragraph>
                    You will need to sign your wallet address, so we can verify it.
                  </Paragraph>
                </>
              )}
            </>
          )) || (
            <>
              <Spacer y={1.5} />
              <AnimatedCheck />
              <Spacer y={0.7} />
              <Paragraph>You've joined successfully!</Paragraph>
              <Spacer y={1.5} />
              <Button
                onClick={() => {
                  if (mode === "ar") disconnect();
                  else disconnectEth();
                  setJoined(false);
                  setArSig(undefined);
                }}
              >
                Disconnect
              </Button>
            </>
          )}
        </Form>
        <Spacer y={0.01} />
        <Leaderboard>
          <Stats>
            <Stat>
              <h4>{stats.users.toLocaleString()}</h4>
              <Paragraph>Wait list sign ups</Paragraph>
            </Stat>
            <Stat>
              <h4>
                {(stats.arTokens * arPrice).toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "narrowSymbol",
                  maximumFractionDigits: 2,
                }) + " USD"}
              </h4>
              <Paragraph>User-controlled assets</Paragraph>
            </Stat>
          </Stats>
          <Spacer y={1} />
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Address</th>
                <th>USD Balance</th>
                <th>AR Balance</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {users.map((p, i) => (
                  <motion.tr
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.93 }}
                    key={i}
                  >
                    <td>{i + 1}.</td>
                    <td>{p.address}</td>
                    <td>
                      {(p.balance * arPrice).toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                        currencyDisplay: "narrowSymbol",
                        maximumFractionDigits: 2,
                      }) + " USD"}
                    </td>
                    <td>
                      {p.balance.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                      AR
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </Table>
          {users.length === 0 && (
            <Paragraph></Paragraph>
          )}
          <Spacer y={1} />
        </Leaderboard>
      </Wrapper>
    </>
  );
}

const Form = styled(Card)`
  padding: 2rem;

  @media screen and (max-width: 1250px) {
    width: calc(70% - 2rem * 2);
  }

  @media screen and (max-width: 720px) {
    width: calc(100% - 2rem * 2);
  }
`;

const Leaderboard = styled(Card)`
  @media screen and (max-width: 1250px) {
    width: 70%;
  }

  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid #eaecf0;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.2rem 0;
  gap: 0.4rem;

  &:first-child {
    border-right: 1px solid #eaecf0;
  }

  h4 {
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }
`;

const Table = styled.table`
  margin: 0 2rem;
  width: calc(100% - 4rem);
  border-collapse: collapse;
  overflow-x: auto;

  tr {
    border-bottom: 1px solid #eaecf0;
    transition: all 0.17s ease;

    &:last-child {
      border-bottom: 0;
    }

    td,
    th {
      font-weight: 500;
      font-size: 0.9rem;
      color: #000;
      line-height: 1.45em;
      text-align: left;
      padding: 0.75rem;

      &:nth-child(3),
      &:nth-child(4) {
        text-align: right;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    }

    th {
      font-weight: 400;
      color: #b5b5b5;
      padding-top: 0;
    }

    &:not(:first-child):hover {
      opacity: 0.6 !important;
    }
  }

  thead tr {
    border-bottom: 1px solid #eaecf0 !important;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
