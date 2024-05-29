import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DataType } from "../model/types";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import Textarea from "../Components/Textarea/Textarea";
import Calendar from "../Components/Calendar/Calendar";
import { useEffect, useState } from "react";
import { formatDate } from "../util";
import { getDataDetail, putData } from "../api";

type Props = {
  refetch: () => void;
};

const Edit = ({ refetch }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [inputs, setInputs] = useState({
    title: "",
    location: "",
    content: "",
  });
  const [data, setData] = useState<DataType>();

  const navigate = useNavigate();

  const getEvent = async () => {
    const response = await getDataDetail(Number(id));

    setData(response);
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    if (data) {
      setInputs({
        title: data.title,
        location: data.location,
        content: data.content,
      });
    }
  }, [data]);

  const handleClickEdit = async (id: number) => {
    const formattedDate = formatDate(selectedDate);

    const item: DataType = {
      id: id,
      title: inputs.title,
      date: formattedDate.date,
      time: formattedDate.time,
      location: inputs.location,
      content: inputs.content,
    };

    await putData(id, item);
    await refetch();

    navigate("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePreviousClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Input
        name='title'
        value={inputs.title}
        onChange={handleInputChange}
        placeholder='제목을 작성해주세요.'
        style={{ width: "100%", height: "50px" }}
      />
      <div className='wrap'>
        <Calendar
          selectedDate={selectedDate}
          onDateChange={(e) => handleDateChange(e ? e : new Date())}
          showTimeSelect={true}
          dateFormat='yyyy-MM-dd HH:mm'
          placeholderText='날짜와 시간을 선택해주세요.'
          style={{ width: "250px" }}
          isClearable={false}
        />
        <Input
          name='location'
          value={inputs.location}
          onChange={handleInputChange}
          placeholder='위치를 작성해주세요.'
          style={{ width: "300px" }}
        />
      </div>
      <Textarea
        value={inputs.content}
        name='content'
        onChange={handleInputChange}
      />
      <div className='button-wrap'>
        <Button color='back' onClick={handlePreviousClick}>
          이전
        </Button>
        <Button color='done' onClick={() => handleClickEdit(Number(id))}>
          등록
        </Button>
      </div>
    </Container>
  );
};

export default Edit;

const Container = styled.div`
  padding: 0 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  .wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .button-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
`;
