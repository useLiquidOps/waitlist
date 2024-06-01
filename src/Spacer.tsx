import { styled } from "@linaria/react";

const Spacer = styled.span<{ x?: number; y?: number }>`
  display: block;
  height: ${({ y }) => (y ? `${y}rem` : "0")};
  width: ${({ x }) => (x ? `${x}rem` : "0")};
`;

export default Spacer;
