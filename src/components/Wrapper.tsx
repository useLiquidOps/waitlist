import { styled } from "@linaria/react";

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 3rem;

  @media screen and (max-width: 720px) {
    padding: 0 10vw 3rem;
  }
`;

export default Wrapper;
