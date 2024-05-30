import { styled } from "@linaria/react"

export default function Avatars() {
  return (
    <Wrapper>
      <Avatar src="https://thispersondoesnotexist.com/" draggable={false} />
      <Avatar src="https://thispersondoesnotexist.com/" draggable={false} />
      <Avatar src="https://thispersondoesnotexist.com/" draggable={false} />
      <Avatar src="https://thispersondoesnotexist.com/" draggable={false} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1.6rem auto .4rem;
  width: max-content;
`;

const Avatar = styled.img`
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  object-fit: cover;
  user-select: none;
  border: 2.5px solid #fff;

  &:not(:first-child) {
    margin-left: -1.1rem;
  }
`;
