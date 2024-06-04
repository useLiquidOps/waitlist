import { useActiveAddress, useConnection } from "@arweave-wallet-kit-beta/react";
import { Paragraph, SectionTitle, Title } from "./Text";
import { styled } from "@linaria/react";
import { useState } from "react";
import Wrapper from "./Wrapper";
import Spacer from "./Spacer";
import Dialog from "./Dialog";
import Button from "./Button";
import Input from "./Input";
import Card from "./Card";

export default function Home() {
  const { connect, connected } = useConnection();
  const address = useActiveAddress();
  const [email, setEmail] = useState<string | undefined>();

  async function subscribe() {
    if (!connected) await connect();
    
    // @ts-expect-error
    const signature = await window.arweaveWallet.signMessage(
      new TextEncoder().encode(address)
    );

    // TODO: send data
  }

  return (
    <>
      <Wrapper>
        <div>
          <Title>
            Name
          </Title>
          <Spacer y={0.4} />
          <Paragraph>
            Name is the very first lending protocol on Arweave and the AO computer
          </Paragraph>
        </div>
        <Form>
          <SectionTitle>
            Join the waitlist!
          </SectionTitle>
          <Spacer y={0.6} />
          <Paragraph>
            Subscribe to our newsletter to know when we are ready. Don't worry, we won't spam you and that's guaranteed!
          </Paragraph>
          <Spacer y={1.5} />
          <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Spacer y={1.5} />
          <Button onClick={subscribe}>
            {connected ? "Sign up" : "Connect"}
          </Button>
        </Form>
        <Spacer y={.01} />
        <Leaderboard>
          <Stats>
            <Stat>
              <h4>5,642</h4>
              <Paragraph>
                Users
              </Paragraph>
            </Stat>
            <Stat>
              <h4>$845,326,235 USD</h4>
              <Paragraph>
                Total user wealth
              </Paragraph>
            </Stat>
          </Stats>
          <Spacer y={1} />
          <Table>
            <tr>
              <th></th>
              <th>Address</th>
              <th>USD Balance</th>
              <th>AR Balance</th>
            </tr>
            {new Array(100).fill("").map((_, i) => (
              <tr>
                <td>{i + 1}.</td>
                <td>ljvCPN3X...-6Iho8U</td>
                <td>$1,245,555 USD</td>
                <td>23,565.55 AR</td>
              </tr>
            ))}
          </Table>
          <Spacer y={1} />
        </Leaderboard>
      </Wrapper>
      <Dialog />
    </>
  );
}

const Form = styled(Card)`
  padding: 2rem;

  ${Button} {
    margin: 0 auto;
  }

  @media screen and (max-width: 1250px) {
    width: 70%;
  }

  @media screen and (max-width: 720px) {
    width: 100%;
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
  gap: .4rem;

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

    &:last-child {
      border-bottom: 0;
    }

    td, th {
      font-weight: 500;
      font-size: .9rem;
      color: #000;
      line-height: 1.45em;
      text-align: left;
      padding: .75rem;

      &:nth-child(3), &:nth-child(4) {
        text-align: right;
      }
    }

    th {
      font-weight: 400;
      color: #B5B5B5;
      padding-top: 0;
    }
  }
`;