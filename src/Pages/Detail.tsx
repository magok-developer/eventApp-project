import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Button/Button";
import { color } from "../styles/color";
import { useEffect, useState } from "react";
import { DataType } from "../model/types";
import { deleteData, getDataDetail } from "../api";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<DataType>();

  const getEvent = async () => {
    const response = await getDataDetail(Number(id));

    setData(response);
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (!data) {
    return <div>해당 데이터를 찾을 수 없습니다.</div>;
  }

  const handleClickDelete = async (id: number) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      try {
        await deleteData(id);

        navigate(-1);
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <Container>
      <h2>{data.title}</h2>
      <div className='info-wrap'>
        <p>
          {data.date} {data.time}
        </p>
        <div className='location'>
          <img src='/images/icons/location/location.svg' width={20} />
          {data.location}
        </div>
      </div>
      <div className='content'>{data.content}</div>
      <div className='button-wrap'>
        <Button color='back' onClick={() => navigate(-1)}>
          이전
        </Button>
        <Button color='done' onClick={() => navigate(`/edit/${data.id}`)}>
          수정
        </Button>
        <Button color='delete' onClick={() => handleClickDelete(data.id)}>
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

  .location {
    display: flex;
    align-items: center;
    gap: 4px;
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
