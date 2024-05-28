import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DataType } from "../model/types";
import Button from "../Components/Button/Button";
import { color } from "../styles/color";
import axios from "axios";

type Props = {
  data: DataType[];
  setData: (data: DataType[]) => void;
};

const Detail = ({ data, setData }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const card = data.find((item) => Number(item.id) === Number(id));

  if (!card) {
    return <div>해당 데이터를 찾을 수 없습니다.</div>;
  }

  const handleClickDelete = async (id: number | string) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/data/${id}`);
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        navigate(-1);
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <Container>
      <h2>{card.title}</h2>
      <div className='info-wrap'>
        <p>
          {card.date} {card.time}
        </p>
        <p>{card.location}</p>
      </div>
      <div className='content'>{card.content}</div>
      <div className='button-wrap'>
        <Button color='back' onClick={() => navigate(-1)}>
          이전
        </Button>
        <Button color='done' onClick={() => navigate(`/edit/${card.id}`)}>
          수정
        </Button>
        <Button color='delete' onClick={() => handleClickDelete(card.id)}>
          삭제
        </Button>
      </div>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  padding: 0 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  gap: 10px;

  .info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;

    border-radius: 6px;
    padding: 10px;

    background-color: ${color.skyBlue};
    border: 1.5px solid ${color.deepBlue};

    box-sizing: border-box;
  }
  .content {
    width: 100%;
    height: 300px;
    border-radius: 6px;
    padding: 10px;

    background-color: ${color.skyBlue};
    border: 1.5px solid ${color.deepBlue};

    box-sizing: border-box;
  }

  .button-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;
