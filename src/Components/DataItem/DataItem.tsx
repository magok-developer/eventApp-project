import styled from "styled-components";
import { DataType } from "../../model/types";
import { color } from "../../styles/color";
import { Link } from "react-router-dom";

type Props = {
  data: DataType;
  onDelete(id: number | string): void;
};

const DataItem = ({ data, onDelete }: Props) => {
  const { id, title, date, time } = data;

  return (
    <Container to={`/detail/${id}`}>
      <div className='date_wrap'>
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <h4>{title}</h4>
      <img
        src='images/icons/delete/delete.svg'
        alt='delete'
        className='delete'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(id);
        }}
      />
    </Container>
  );
};

export default DataItem;

const Container = styled(Link)`
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 30px;

  box-sizing: border-box;

  .date_wrap {
    display: flex;
    gap: 6px;

    span {
      font-size: 14px;
    }
  }

  .delete {
    opacity: 0;
    width: 16px;
  }

  &:hover {
    background-color: ${color.skyBlue};

    .delete {
      opacity: 1;
      cursor: pointer;
    }
  }
`;
