import { styled } from "@linaria/react"

export default function Nav() {
  return (
    <Wrapper>
      <Icon src="/vite.svg" draggable={false} />
      <Menu>
        <Link>
          Blog
        </Link>
        <Link>
          Twitter
        </Link>
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

const Link = styled.a`
  font-size: .95rem;
  font-weight: 500;
  color: #404040;
  text-decoration: none;
  cursor: pointer;
  transition: all .17s ease;

  &:hover {
    opacity: .75;
  }
`;
