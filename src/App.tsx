import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { DataType } from "./model/types";
import axios from "axios";
import Edit from "./Pages/Edit";
import Detail from "./Pages/Detail";

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [inputValue, setInputValue] = useState({
    title: "",
    location: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [textareaValue, setTextareaValue] = useState("");
  const navigate = useNavigate();
  const nextId = useRef("0");

  const API_URL = "http://localhost:3001/data";

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(API_URL);
      setData(response.data);

      if (response.data.length === 0) {
        nextId.current = "0";
      } else {
        nextId.current = (
          parseInt(response.data[response.data.length - 1].id) + 1
        ).toString();
      }
    };

    getData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const dateToUse = selectedDate || new Date();

  const year = dateToUse.getFullYear();
  const month = String(dateToUse.getMonth() + 1).padStart(2, "0");
  const day = String(dateToUse.getDate()).padStart(2, "0");
  const hours = String(dateToUse.getHours()).padStart(2, "0");
  const minutes = String(dateToUse.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}.${month}.${day}`;
  const formattedTime = `${hours}:${minutes}`;

  const postData = async () => {
    const item: DataType = {
      id: nextId.current,
      title: inputValue.title,
      date: formattedDate,
      time: formattedTime,
      location: inputValue.location,
      content: textareaValue,
      checked: false,
    };

    try {
      await axios.post(API_URL, item);
      setData(data.concat(item));
      setInputValue({ title: "", location: "" });
      setTextareaValue("");
      setSelectedDate(new Date());
      navigate("/");
      nextId.current = (parseInt(nextId.current) + 1).toString();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const deleteData = async (id: string) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const putData = async (id: string) => {
    const item: DataType = {
      id: id,
      title: inputValue.title,
      date: formattedDate,
      time: formattedTime,
      location: inputValue.location,
      content: textareaValue,
      checked: false,
    };

    const hasChanges =
      item.title !== data.find((d) => d.id === id)?.title ||
      item.date !== data.find((d) => d.id === id)?.date ||
      item.time !== data.find((d) => d.id === id)?.time ||
      item.location !== data.find((d) => d.id === id)?.location ||
      item.content !== data.find((d) => d.id === id)?.content ||
      item.checked !== data.find((d) => d.id === id)?.checked;

    if (!hasChanges) {
      alert("수정 사항이 없습니다.");
      navigate("/");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, item);
      const updatedData = data.map((d) => (d.id === id ? item : d));
      setData(updatedData);
      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className='App'>
      <Background>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                data={data}
                setData={setData}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                onDelete={deleteData}
              />
            }
          />
          <Route
            path='/create'
            element={
              <Create
                onCreate={postData}
                inputValue={inputValue}
                setInputValue={setInputValue}
                textareaValue={textareaValue}
                setTextareaValue={setTextareaValue}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            }
          />
          <Route
            path='/detail/:id'
            element={
              <Detail
                data={data}
                setData={(newData) => {
                  setData(newData);
                  setFilteredData(newData);
                }}
              />
            }
          />
          <Route
            path='/edit/:id'
            element={
              <Edit
                data={data}
                setData={(newData) => {
                  setData(newData);
                  setFilteredData(newData);
                }}
                putData={putData}
                inputValue={inputValue}
                setInputValue={setInputValue}
                textareaValue={textareaValue}
                setTextareaValue={setTextareaValue}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            }
          />
        </Routes>
      </Background>
    </div>
  );
}

export default App;

const Background = styled.div`
  width: 700px;
  height: 90vh;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  box-sizing: border-box;
`;
