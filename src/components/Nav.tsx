import { styled } from "@linaria/react";
import { Link } from "wouter";

export default function Nav() {
  return (
    <Wrapper>
      <Link href="/">
        <Icon src="/logo.svg" draggable={false} />
      </Link>
      <Menu>
      <a
          href="https://liquidops.io"
        >
          Home
        </a>
        <a
          href="https://liquidops.io/blog"
        >
          Blog
        </a>
        <a
          href="https://x.com/Liquid_Ops"
          target="_blank"
          rel="noopener noreferer"
        >
          X
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
  margin-bottom: 1rem;

  a {
    font-size: 0.95rem;
    font-weight: 500;
    color: #404040;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.17s ease;

    &:hover {
      opacity: 0.75;
    }
  }

  @media screen and (max-width: 720px) {
    padding: 1.4rem 10vw;
  }
`;

const Icon = styled.img`
  height: 32px;
  object-fit: contain;
  user-select: none;
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  gap: 4rem;
`;
