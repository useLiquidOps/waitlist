import { styled } from "@linaria/react";
import * as MainText from "./Text";
import Wrapper from "./Wrapper";
import Spacer from "./Spacer"

export default function Blog() {
  return (
    <Wrapper>
      <div>
        <MainText.Title>
          Blog
        </MainText.Title>
        <Spacer y={0.4} />
        <MainText.Paragraph>
          Read about our latest announcements
        </MainText.Paragraph>
      </div>
      <Article>
        <Title>
          Introducing Operation Liquidity: Blog Announcement
        </Title>
        <Paragraph>
          We're excited to announce our decentralized lending and borrowing protocol specifically native to the Arweave ecosystem. This platform allows users to utilize their digital assets as collateral without having to sell them, providing a smooth and user-friendly experience.
        </Paragraph>
        <Paragraph>
          Our platform offers a seamless process where users can deposit assets into a token pool and earn competitive interest rates. The dynamic protocol supports various currencies, providing the flexibility to meet diverse financial needs. Need liquidity? Borrow against your collateral with just a few clicks, as our protocol adjusts interest rates based on supply and demand.
        </Paragraph>
        <Paragraph>
          Whether you want to earn interest or require immediate liquidity, our protocol has you covered. The user-friendly interface ensures a secure and efficient experience, simplifying asset management.
        </Paragraph>
        <Paragraph>
          Get ready for the testnet launch in the coming weeks. Stay updated by visiting our website and following us on social media. Join us in reshaping the way you manage your digital assets!
        </Paragraph>
        <Paragraph>
          For more information, stay tuned to our channels and join our waitlist at operationliquidity.xyz
        </Paragraph>
        <Paragraph>
          <i>June 7, 2024</i>
        </Paragraph>
      </Article>
    </Wrapper>
  );
}

const Article = styled.article`
  width: 70%;

  &:not(:last-child) {
    border-bottom: 1px solid #eaecf0;
    padding-bottom: 2rem;
  }

  @media screen and (max-width: 1250px) {
    width: 80%;
  }

  @media screen and (max-width: 720px) {
    width: 95%;
  }
`;

const Title = styled.h2`
  font-size: 1.9rem;
  color: rgb(var(--theme-color));
  margin: 0 0 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.07rem;
  color: #a4a3a3;
  text-align: justify;
  margin: 0 0 .7rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
