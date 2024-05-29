import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input/Input";
import Calendar from "../Components/Calendar/Calendar";
import Textarea from "../Components/Textarea/Textarea";
import Button from "../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { DataType } from "../model/types";
import { formatDate } from "../util";
import { postData } from "../api";

type Props = {
  id: number;
  refetch: () => void;
};

const Create = ({ id, refetch }: Props) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [inputs, setInputs] = useState({
    title: "",
    location: "",
    content: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(selectedDate);
  };

  const handlePreviousClick = () => {
    navigate(-1);
  };

  const handleClickPost = async () => {
    const formattedDate = formatDate(selectedDate);

    const item: DataType = {
      id: id,
      title: inputs.title,
      date: formattedDate.date,
      time: formattedDate.time,
      location: inputs.location,
      content: inputs.content,
    };

    try {
      await postData(item);
      await refetch();
      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Container>
      <Input
        name='title'
        value={inputs.title}
        onChange={handleChangeInput}
        placeholder='제목을 작성해주세요.'
        style={{ width: "100%", height: "50px" }}
      />
      <div className='wrap'>
        <Calendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          showTimeSelect={true}
          dateFormat='yyyy-MM-dd HH:mm'
          placeholderText='날짜와 시간을 선택해주세요.'
          style={{ width: "250px" }}
          isClearable={false}
        />
        <Input
          name='location'
          value={inputs.location}
          onChange={handleChangeInput}
          placeholder='위치를 작성해주세요.'
          style={{ width: "300px" }}
        />
      </div>
      <Textarea
        value={inputs.content}
        name='content'
        onChange={handleChangeInput}
      />
      <div className='button-wrap'>
        <Button color='back' onClick={handlePreviousClick}>
          이전
        </Button>
        <Button color='done' onClick={handleClickPost}>
          등록
        </Button>
      </div>
    </Container>
  );
};

export default Create;

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
