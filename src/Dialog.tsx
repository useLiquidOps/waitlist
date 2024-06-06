import { AnimatePresence, Variants, motion } from "framer-motion";
import { X } from "@untitled-ui/icons-react";
import { styled } from "@linaria/react";
import { useState } from "react";
import Spacer from "./Spacer";
import Button from "./Button";
import { Link } from "wouter"

export default function Dialog() {
  const [shown, setShown] = useState(true);

  return (
    <AnimatePresence>
      {shown && (
        <Wrapper
          variants={fadeUp}
          initial="hidden"
          animate="shown"
          exit="hidden"
        >
          <Head>
            <Title>
              We're in Berlin! 🇩🇪
            </Title>
            <Close onClick={() => setShown(false)} />
          </Head>
          <Spacer y={.8} />
          <Text>
            Lorimer and Marton are attending arweave Day in Berlin along with the <a href="https://communitylabs.com" target="_blank" rel="noopener noreferrer">CommunityLabs</a> team. 
            Come and say hey if you see us, we'd love to talk to you about our new project! 
          </Text>
          <Spacer y={1.15} />
          <Link href="/berlin">
            <Button color="255, 255, 255">
              Find us!
            </Button>
          </Link>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

const Wrapper = styled(motion.section)`
  position: fixed;
  bottom: 1.8rem;
  right: 1.8rem;
  padding: 2rem;
  overflow: hidden;
  border-radius: 36px;
  background-color: rgb(var(--theme-color));
  width: 24vw;
  z-index: 1000;

  @media screen and (max-width: 1250px) {
    width: 40vw;
  }

  @media screen and (max-width: 720px) {
    width: calc(100vw - 4rem - 3.6rem);
  }

  *::selection {
    background-color: rgba(255, 255, 255, .2);
    color: #fff;
  }

  a {
    text-decoration: none;
  }

  ${Button} {
    color: #000;
  }
`;

const fadeUpTransition = { type: "spring", duration: 0.37, delayChildren: 0.2, staggerChildren: 0.05 };
const fadeUp: Variants = {
  hidden: { opacity: 0, translateY: 15, transition: fadeUpTransition },
  shown: { opacity: 1, translateY: 0, transition: { ...fadeUpTransition, delay: .7 } }
};

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  color: #fff;
  margin: 0;
  font-weight: 500;
`;

const Close = styled(X)`
  width: 1.3rem;
  height: 1.3rem;
  color: #a5a5a5;
  cursor: pointer;
  transition: all .17s ease;

  &:hover {
    opacity: .8;
  }

  &:active {
    transform: scale(.9);
  }
`;

const Text = styled.p`
  font-size: .97rem;
  font-weight: 500;
  color: #d9d9d9;
  line-height: 1.37em;
  margin: 0;
  text-align: justify;

  a {
    color: inherit;
  }
`;
