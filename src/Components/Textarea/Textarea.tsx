import styled from "styled-components";
import { color } from "../../styles/color";

type Props = {
  value: string;
  style?: React.CSSProperties;
  onChange: (e: any) => void;
  name: string;
};

const Textarea = ({ value, style, onChange, name }: Props) => {
  return (
    <TextareaStyle
      value={value}
      name={name}
      style={style}
      onChange={onChange}
    />
  );
};

export default Textarea;

const TextareaStyle = styled.textarea`
  width: 100%;
  height: 300px;
  border-radius: 6px;
  padding: 10px;

  background-color: ${color.skyBlue};
  border: 1.5px solid ${color.deepBlue};
  outline: none;

  box-sizing: border-box;

  resize: none;
`;
