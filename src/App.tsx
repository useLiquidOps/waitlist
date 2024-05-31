import { useConnection } from "@arweave-wallet-kit-beta/react";
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import Avatars from "./Avatars";
import Button from "./Button";
import Input from "./Input";
import Card from "./Card";

export default function App() {
  const { connect, connected } = useConnection();

  return (
    <Wrapper>
      <div>
        <Title>
          Lending on Arweave
        </Title>
        <Subtitle>
          The very first lending protocol built on the ao supercomputer
        </Subtitle>
      </div>
      <Card>
        <JoinContent>
          <SectionTitle>
            Join the waitlist!
          </SectionTitle>
          <Paragraph>
            Subscribe to our newsletter to know when we are ready. Don't worry, we won't spam you and that's guaranteed!
          </Paragraph>
          <Avatars />
          <Small>
            Join Sam Williams, Tate Berenbaum and more...
          </Small>
          <Input />
          <JoinButton onClick={connect}>
            {connected ? "Sign up" : "Connect"}
          </JoinButton>
        </JoinContent>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 4rem;

  @media screen and (max-width: 720px) {
    padding: 0 10vw;
  }
`;

const JoinContent = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 5.5rem;
  text-align: center;
  margin: 0 0 .4rem;
  color: #000;
  font-weight: 700;

  @media screen and (max-width: 720px) {
    font-size: 4rem;
    line-height: 1.1em;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.65rem;
  text-align: center;
  margin: 0;
  color: #B5B5B5;
  font-weight: 500;

  @media screen and (max-width: 720px) {
    font-size: 1.4rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 2.1rem;
  text-align: center;
  margin: 0 0 .6rem;
  color: #000;
  font-weight: 600;
`;

const Paragraph = styled.p`
  text-align: center;
  color: #B5B5B5;
  width: 30vw;
  line-height: 1.45em;
  margin: 0;

  @media screen and (max-width: 720px) {
    width: auto;
  }
`;

const Small = styled(Paragraph)`
  font-size: .75rem;
  margin-bottom: 1.5rem;
`;

const JoinButton = styled(Button)`
  margin: 1.5rem auto 0;
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
