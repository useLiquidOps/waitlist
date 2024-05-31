import { styled } from "@linaria/react"

const Card = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  width: max-content;
  height: max-content;
  background-color: #fff;

  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;

export default Card;
