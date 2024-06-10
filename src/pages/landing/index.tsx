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
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { usePrice } from "../../utils/price"

export default function Home() {
  const { connect, disconnect } = useConnection();
  const arAddr = useActiveAddress();
  const publicKey = usePublicKey();
  const [email, setEmail] = useState<string | undefined>();
  const strategy = useStrategy();

  const [users, setUsers] = useState<{ address: string; balance: number }[]>(
    [],
  );

  const { open } = useWeb3Modal();
  const { address: ethAddr } = useAccount();
  const { disconnect: disconnectEth } = useDisconnect();
  const { signMessage: signMsgEth, data: signMsgData } = useSignMessage();

  const [arSig, setArSig] = useState<number[] | undefined>();

  const address = useMemo(() => arAddr || ethAddr, [ethAddr, arAddr]);
  const connected = useMemo(() => typeof address === "string", [address]);
  const mode = useMemo(() => {
    if (typeof address !== "string") return undefined;
    return address.length === 42 ? "eth" : "ar";
  }, [address]);

  const arPrice = usePrice("arweave");
  const ethPrice= usePrice("ethereum");

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
  const [error, setError] = useState<string | undefined>();

  async function subscribe() {
    if (error) setError(undefined);
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
          setArSig(
            Array.from(
              // @ts-expect-error
              await window.arweaveWallet.signMessage(data),
            ),
          );
        }
      } else {
        signMsgEth({ message: address });
      }
    } catch (e: any) {
      setError(e?.message || "Unknown error");
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (!mode || !address) return;
        if (mode === "ar" && (!arSig || !publicKey)) return;
        if (mode === "eth" && !signMsgData) return;

        const res = await (
          await fetch(`http://localhost:3001/record-address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              owner: publicKey,
              signature: mode === "ar" ? arSig : signMsgData,
              walletAddress: address,
              network: mode.toUpperCase(),
            }),
          })
        ).json();

        setJoined(res?.success || false);
        if (res?.success) {
          setEmail("");
          setError(undefined);
        } else setError(res.message || "Unknown error");
      } catch (e: any) {
        setError(e?.message || "Unknown error");
      }

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
            Connect your wallet to be added to our waitlist leader board and be
            notified when we launch. Don't worry, we won't spam you!
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
                {(!connected && (
                  <>
                    <Button onClick={() => connect()}>Arweave wallet</Button>
                    <Button onClick={() => open()}>Ethereum wallet</Button>
                  </>
                )) || (
                  <Button onClick={() => subscribe()}>
                    {!loading ? "Sign up" : <Spinner />}
                  </Button>
                )}
              </Buttons>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Spacer y={1} />
                    <ErrorText>
                      Error: {error}{" "}
                      <u
                        onClick={() => {
                          if (mode === "ar") disconnect();
                          else disconnectEth();
                          setError("");
                        }}
                      >
                        Disconnect and try again
                      </u>
                    </ErrorText>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )) || (
            <>
              <Spacer y={1.5} />
              <AnimatedCheck />
              <Spacer y={0.7} />
              <Paragraph>You've joined successfully!</Paragraph>
              <Spacer y={1.5} />
              <Buttons>
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
              </Buttons>
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
                <th>Token Balance</th>
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
                      {(typeof p.balance === "number"
                        ? (p.balance * arPrice) : Object.entries(p.balance).map(([token, balance]) => balance * (token === "eth" ? ethPrice : 1)).reduce((curr, acc) => curr + acc, 0)).toLocaleString(undefined, {
                            style: "currency",
                            currency: "USD",
                            currencyDisplay: "narrowSymbol",
                            maximumFractionDigits: 2,
                          })}
                        {" USD"}
                    </td>
                    <td>
                      {typeof p.balance === "number"
                        ? p.balance.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          }) + " AR"
                        : Object.entries(p.balance)
                            .map(
                              ([token, balance]) =>
                                `${balance.toLocaleString(undefined, {
                                  maximumFractionDigits:
                                    token === "eth" ? 4 : 2,
                                })} ${token.toUpperCase()}`,
                            )
                            .join(", ")}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </Table>
          {users.length === 0 && <Paragraph></Paragraph>}
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

const ErrorText = styled(Paragraph)`
  color: #ff0000;
  background-color: rgba(255, 0, 0, 0.15);
  padding: 0.7rem 1.2rem;
  border-radius: 15px;
  text-align: left;

  u {
    cursor: pointer;
  }
`;
