import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { DataType } from "./model/types";
import Edit from "./Pages/Edit";
import Detail from "./Pages/Detail";
import { getData } from "./api";

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const nextId = useRef<number>(0);

  const getEvent = async () => {
    const response = await getData();
    if (response.length === 0) {
      nextId.current = 0;
    } else {
      nextId.current = response[response.length - 1].id + 1;
    }
    setData(response);
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className='App'>
      <Background>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                data={data}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                refetch={getEvent}
              />
            }
          />
          <Route
            path='/create'
            element={
              <Create
                id={data?.length === 0 ? 1 : data[data.length - 1].id + 1}
                refetch={getEvent}
              />
            }
          />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/edit/:id' element={<Edit refetch={getEvent} />} />
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
  border-radius: 24px;

  box-sizing: border-box;
`;
