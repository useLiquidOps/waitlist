import { styled } from "@linaria/react";
import { Link } from "wouter";

export default function Nav() {
  return (
    <Wrapper>
      <Link href="/">
        <Icon src="/logo.png" draggable={false} />
      </Link>
      <Menu>
        <Link href="/blog">
          Blog
        </Link>
        <a href="https://x.com/OpLiquidity" target="_blank" rel="noopener noreferer">
          Twitter (now X!)
        </a>
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 4.5rem;
  margin-bottom: 2.6rem;

  a {
    font-size: .95rem;
    font-weight: 500;
    color: #404040;
    text-decoration: none;
    cursor: pointer;
    transition: all .17s ease;

    &:hover {
      opacity: .75;
    }
  }

  @media screen and (max-width: 720px) {
    padding: 1.4rem 10vw;
  }
`;

const Icon = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  object-fit: contain;
  user-select: none;
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  gap: 4rem;
`;
