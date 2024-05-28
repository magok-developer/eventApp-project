import { useState, ChangeEvent } from "react";
import { DataType } from "../model/types";
import Header from "../Components/Header/Header";
import styled from "styled-components";
import { color } from "../styles/color";
import DataList from "../Components/DataList/DataList";

type Props = {
  data: DataType[];
  setData: (data: DataType[]) => void;
  filteredData: DataType[];
  setFilteredData: (data: DataType[]) => void;
  onDelete: (id: string) => void;
};

const Home = ({
  data,
  setData,
  filteredData,
  setFilteredData,
  onDelete,
}: Props) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [search, setSearch] = useState("");

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortAscending ? dateB - dateA : dateA - dateB;
    });
    setFilteredData(sortedData);
    setSortAscending(!sortAscending);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const filteredData = data.filter(
        (item) => new Date(item.date).toDateString() === date.toDateString()
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const query = search.toLowerCase();
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredData(filteredData);
  };

  return (
    <>
      <div className='wrap'>
        <Header
          sortAscending={sortAscending}
          handleSort={handleSort}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          searchQuery={search}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />
        {filteredData.length === 0 ? (
          <NoneData>데이터가 없습니다.</NoneData>
        ) : (
          <DataList data={filteredData} onDelete={onDelete} />
        )}

        <div style={{ display: "flex", alignItems: "end", flex: 1 }}>
          {/* 임시 스타일 */}
          페이지네이션
        </div>
      </div>
    </>
  );
};

export default Home;

const NoneData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 423.99px;

  background-color: ${color.skyBlue};
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;
