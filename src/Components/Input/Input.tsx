import { color } from "../../styles/color";
import styled from "styled-components";

type Props = {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSearch?: () => void;
  icon?: boolean;
};

const Input = ({
  name,
  value,
  onChange,
  style,
  onKeyDown,
  placeholder,
  onSearch,
  icon,
}: Props) => {
  return (
    <Container>
      <InputStyle
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
        placeholder={placeholder}
      />
      {icon ? (
        <img
          src='images/icons/search/search.svg'
          alt='search'
          className='search'
          onClick={onSearch}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Input;

const Container = styled.div`
  position: relative;

  .search {
    width: 18px;
    position: absolute;
    right: 10px;
    top: 6px;
    cursor: pointer;
  }
`;

const InputStyle = styled.input<any>`
  padding: 8px;
  height: 30px;
  box-sizing: border-box;
  border: 1.5px solid ${color.deepBlue};
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  padding-right: 30px;
`;
