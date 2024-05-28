import styled from "styled-components";
import { color } from "../../styles/color";

type BUTTON_STYLE_PROPS = {
  color: "back" | "done" | "delete";
};

type Props = BUTTON_STYLE_PROPS & {
  children: any;
  onClick: (e?: any) => void;
  className?: string;
};

const Button = ({ children, onClick, color, className }: Props) => {
  return (
    <Container onClick={onClick} color={color} className={className}>
      {children}
    </Container>
  );
};

export default Button;

const COLOR_TYPE = {
  ["back"]: {
    background: "#eee",
    color: "black",
  },
  ["done"]: {
    background: color.skyBlue,
    color: color.deepBlue,
  },
  ["delete"]: {
    background: "red",
    color: "white",
  },
};

const Container = styled.div<BUTTON_STYLE_PROPS>`
  ${({ color }) => COLOR_TYPE[color]}
  width: 51px;
  height: 26px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;
