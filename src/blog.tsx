import { styled } from "@linaria/react";
import Wrapper from "./Wrapper";
import Spacer from "./Spacer"

export default function Blog() {
  return (
    <Wrapper>
      <div>
        <Title>
          Blog
        </Title>
        <Spacer y={0.4} />
        <Paragraph>
          Read about our latest announcements
        </Paragraph>
      </div>
      <section>
        <Article>
          <Title>
            Introducing Our New Lending Protocol: Blog Announcement
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
            For more information, stay tuned to our channels.
          </Paragraph>
          <Paragraph>
            <i>June 6, 2024</i>
          </Paragraph>
        </Article>
      </section>
    </Wrapper>
  );
}

const Article = styled.article`
  &:not(:last-child) {
    border-bottom: 1px solid #eaecf0;
    padding-bottom: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 1.9rem;
  color: #000;
  margin: 0 0 1rem;
`;

const Paragraph = styled.p`
  color: #B5B5B5;
  text-align: justify;
  margin: 0 0 .65rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
