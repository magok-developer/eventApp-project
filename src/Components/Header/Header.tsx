import styled from "styled-components";
import { color } from "../../styles/color";
import Calendar from "../Calendar/Calendar";
import Input from "../Input/Input";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

type Props = {
  sortAscending: boolean;
  handleSort: () => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

const Header = ({
  sortAscending,
  handleSort,
  selectedDate,
  onDateChange,
  searchQuery,
  onSearchChange,
  onSearch,
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return (
    <Container>
      <h2 className='title'>Event Web Application</h2>
      <HeaderWrap>
        <div className='wrap'>
          <Calendar
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            showTimeSelect={false}
            placeholderText='날짜 선택'
            style={{ width: "145px" }}
            dateFormat='yyyy-MM-dd'
            isClearable={true}
          />
          <div className='button' onClick={handleSort}>
            {sortAscending ? "최신 순 보기" : "오래된 순 보기"}
            <img src='images/icons/arrow/sort.svg' width={14} />
          </div>
        </div>
        <div className='wrap'>
          <Input
            value={searchQuery}
            onChange={onSearchChange}
            placeholder='검색'
            onSearch={onSearch}
            icon={true}
            onKeyDown={handleKeyDown}
          />

          <Link to={"/create"}>
            <img src='images/icons/add/add.svg' alt='add' className='add' />
          </Link>
        </div>
      </HeaderWrap>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .title {
    color: ${color.deepBlue};
  }
`;

const HeaderWrap = styled.div`
  width: 100%;
  margin: 30px 0;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
  .wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  .button {
    padding: 10px;
    height: 30px;
    box-sizing: border-box;
    border: 1.5px solid ${color.deepBlue};
    background-color: ${color.skyBlue};
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .text {
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: ${color.deepBlue};
    }
  }

  .add {
    cursor: pointer;
  }
`;
