import React from "react";
import styled from "styled-components";
import Input from "../Components/Input/Input";
import Calendar from "../Components/Calendar/Calendar";
import Textarea from "../Components/Textarea/Textarea";
import Button from "../Components/Button/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  onCreate: () => void;
  inputValue: { title: string; location: string };
  setInputValue: React.Dispatch<
    React.SetStateAction<{ title: string; location: string }>
  >;
  textareaValue: string;
  setTextareaValue: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const Create = ({
  onCreate,
  inputValue,
  setInputValue,
  textareaValue,
  setTextareaValue,
  selectedDate,
  setSelectedDate,
}: Props) => {
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handlePreviousClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Input
        name='title'
        value={inputValue.title}
        onChange={handleInputChange}
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
          value={inputValue.location}
          onChange={handleInputChange}
          placeholder='위치를 작성해주세요.'
          style={{ width: "300px" }}
        />
      </div>
      <Textarea value={textareaValue} onChange={handleTextareaChange} />
      <div className='button-wrap'>
        <Button color='back' onClick={handlePreviousClick}>
          이전
        </Button>
        <Button color='done' onClick={onCreate}>
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
