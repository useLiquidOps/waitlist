import { styled } from "@linaria/react";

export const Title = styled.h1`
  font-size: 3.4rem;
  text-align: center;
  margin: 0;
  color: #000;
  font-weight: 700;
`;

export const SectionTitle = styled.h3`
  font-size: 2.1rem;
  text-align: center;
  margin: 0;
  color: #000;
  font-weight: 600;
`;

export const Paragraph = styled.p`
  text-align: center;
  color: #B5B5B5;
  width: 30vw;
  line-height: 1.45em;
  margin: 0 auto;

  a {
    text-decoration: none;
    color: rgb(var(--theme-color));
  }

  @media screen and (max-width: 1250px) {
    width: 70%;
  }

  @media screen and (max-width: 720px) {
    width: auto;
  }
`;