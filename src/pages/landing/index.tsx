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
import { assets, usePrice } from "../../utils/price";

export default function Home() {
  const { connect, disconnect } = useConnection();
  const arAddr = useActiveAddress();
  const publicKey = usePublicKey();
  const [email, setEmail] = useState<string | undefined>();
  const strategy = useStrategy();

  const [tableLoading, setTableLoading] = useState(true);

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

  const prices = usePrice();

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


  interface EvmBalance {
    blockchain: string;
    tokenSymbol: string;
    contractAddress: null | string;
    balance: string;
    thumbnail: string;
  }

  const [rawUsers, setRawUsers] = useState<{
    address: string;
    balance: number;
    evmBalances?: EvmBalance[];
  }[]>();

  const users = useMemo(() => {
    if (!rawUsers) return [];
    const formatBal = (bal: number) => bal.toLocaleString(undefined, { maximumFractionDigits: 2 });

    return rawUsers
      .map(({ address, balance, evmBalances }) => {
        const supportedBalances: EvmBalance[] | undefined = evmBalances?.filter(({ tokenSymbol }) => Object.values(assets).includes(tokenSymbol.toLowerCase()));

        return {
          address,
          usdBalance: supportedBalances && address.startsWith("0x") ? supportedBalances
            .map(({ balance, tokenSymbol }) => parseFloat(balance) * prices[Object.keys(assets).find(
                // @ts-expect-error
                (key) => assets[key] === tokenSymbol.toLowerCase()) 
              || ""]?.usd || 0)
            .reduce((prev, curr) => prev + curr, 0)
            : (typeof balance === "number" ? balance : 0) * prices.arweave?.usd,
          balance: supportedBalances && address.startsWith("0x") ? supportedBalances
            .reduce((prev, curr) => {
              const i = prev.findIndex((v) => v.tokenSymbol.toLowerCase() === curr.tokenSymbol.toLowerCase());

              if (i >= 0) prev[i].balance = (parseFloat(prev[i].balance) + parseFloat(curr.balance)).toString();
              else prev.push(curr);

              return prev;
            }, [] as EvmBalance[])
            .sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance))
            .slice(0, 2)
            .map(({ balance, tokenSymbol }) => formatBal(parseFloat(balance)) + " " + tokenSymbol.toUpperCase())
            .join(", ")
            : (formatBal(typeof balance === "number" ? balance : 0) + " AR")
        }
      })
      .sort((a, b) => b.usdBalance - a.usdBalance);
  }, [prices, rawUsers]);

  useEffect(() => {
    const fetchData = async () => {
      setTableLoading(true);

      try {
        const res = await (
          await fetch("https://waitlist-server.lorimer.pro/get-address-list")
        ).json();

        setRawUsers(res.userList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setTableLoading(false);
    };

    fetchData();
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
          await fetch(`https://waitlist-server.lorimer.pro/record-address`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              owner: publicKey,
              signature: mode === "ar" ? arSig : true,
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
          <Title>LiquidOps Waitlist</Title>
          <Spacer y={0.4} />
          <Paragraph>
            LiquidOps is the very first lending protocol on arweave
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
                    <Button onClick={() => connect()}>ArConnect</Button>
                    <Button onClick={() => open()}>Wallet Connect</Button>
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
        <Leaderboard>
          <Stats>
            <Stat>
              <h4>{users.length.toLocaleString()}</h4>
              <Paragraph>Wait list sign ups</Paragraph>
            </Stat>
            <Stat>
              <h4>
                {users.reduce((prev, curr) => prev + (curr.usdBalance || 0), 0).toLocaleString(undefined, {
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
                <th>Top 50 Addresses</th>
                <th>USD Balance</th>
                <th>Token Balance</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {tableLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", padding: "2rem 0" }}
                    >
                      <Spinner />
                    </td>
                  </tr>
                ) : (
                  users.slice(0, 50).map((p, i) => (
                    <motion.tr
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.93 }}
                      key={i}
                    >
                      <td>{i + 1}.</td>
                      <td>{p.address}</td>
                      <td>
                        {p.usdBalance.toLocaleString(undefined, {
                          style: "currency",
                          currency: "USD",
                          currencyDisplay: "narrowSymbol",
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        {p.balance}
                      </td>
                    </motion.tr>
                  ))
                )}
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
    overflow-x: auto;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid #eaecf0;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
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

  @media screen and (max-width: 1000px) {
    &:first-child {
      border-bottom: 1px solid #eaecf0;
      border-right: none;
    }
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

  @media screen and (max-width: 720px) {
    flex-wrap: wrap;
  }
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
