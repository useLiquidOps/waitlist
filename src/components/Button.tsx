import { styled } from "@linaria/react";

const Button = styled.button<{
  secondary?: boolean;
  reverse?: boolean;
  small?: boolean;
  color?: string;
}>`
  font-family: "Space Grotesk", sans-serif !important;
  font-weight: 400 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(${(props) => props.color || "var(--theme-color)"});
  color: #fff;
  font-size: 0.9rem !important;
  padding: 0.9rem 1.2rem !important;
  gap: 0.5rem !important;
  border-radius: ${(props) => (props.small ? "25px" : "30px")} !important;
  cursor: pointer;
  outline: none;
  border: none;
  text-decoration: none;
  width: max-content;
  user-select: none;
  text-transform: none !important;
  transition: all 0.18s ease-in-out;

  &:hover:not(:active):not(:disabled) {
    transform: translate3d(0px, -1.4px, 0px);
    box-shadow:
      0px 0px 2px rgba(${(props) => props.color || "var(--theme-color)"}, 0.15),
      0px 4px 7px rgba(${(props) => props.color || "var(--theme-color)"}, 0.05),
      0px 12px 40px rgba(${(props) => props.color || "var(--theme-color)"}, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.385em;
    width: 1em;
    height: 1em;
  }
`;

export default Button;
