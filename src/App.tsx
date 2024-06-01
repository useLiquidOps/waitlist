import { useConnection } from "@arweave-wallet-kit-beta/react";
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import Button from "./Button";
import Input from "./Input";
import Card from "./Card";
import Nav from "./Nav"
import Spacer from "./Spacer"

export default function App() {
  const { connect, connected } = useConnection();

  return (
    <>
      <Nav />
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
        <Card>
          <JoinContent>
            <SectionTitle>
              Join the waitlist!
            </SectionTitle>
            <Spacer y={0.6} />
            <Paragraph>
              Subscribe to our newsletter to know when we are ready. Don't worry, we won't spam you and that's guaranteed!
            </Paragraph>
            <Spacer y={1.5} />
            <Input />
            <Spacer y={1.5} />
            <Button onClick={connect}>
              {connected ? "Sign up" : "Connect"}
            </Button>
          </JoinContent>
        </Card>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;

  @media screen and (max-width: 720px) {
    padding: 0 10vw;
  }
`;

const JoinContent = styled.div`
  padding: 2rem;

  ${Button} {
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: 3.4rem;
  text-align: center;
  margin: 0;
  color: #000;
  font-weight: 700;
`;

const SectionTitle = styled.h3`
  font-size: 2.1rem;
  text-align: center;
  margin: 0;
  color: #000;
  font-weight: 600;
`;

const Paragraph = styled.p`
  text-align: center;
  color: #B5B5B5;
  width: 30vw;
  line-height: 1.45em;
  margin: 0 auto;

  @media screen and (max-width: 1250px) {
    width: 70%;
  }

  @media screen and (max-width: 720px) {
    width: auto;
  }
`;

export const globals = css`
  :global() {
    html {
      box-sizing: border-box;
      --theme-color: 0, 10, 255;
    }

    body {
      margin: 0;
      font-family: 'Eudoxus Sans', system-ui, sans-serif;
      font-weight: 500;
      overflow-x: hidden;
      background-color: #F5F5F5;
    }

    input, select, textarea {
      font-family: 'Eudoxus Sans', system-ui, sans-serif !important;
    }

    a {
      -webkit-tap-highlight-color: transparent;
    }

    ::selection {
      background-color: rgba(var(--theme-color), .3);
      color: rgb(var(--theme-color));
    }
  }
`;
