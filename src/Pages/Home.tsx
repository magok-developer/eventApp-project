import { useState, ChangeEvent } from "react";
import { DataType } from "../model/types";
import Header from "../Components/Header/Header";
import styled from "styled-components";
import { color } from "../styles/color";
import DataList from "../Components/DataList/DataList";
import Pagination from "../Components/Pagination/Pagination";
import { deleteData } from "../api";

type Props = {
  data: DataType[];
  filteredData: DataType[];
  setFilteredData: (data: DataType[]) => void;
  refetch: () => void;
};

const Home = ({ data, filteredData, setFilteredData, refetch }: Props) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);

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

  const handleClickDelete = async (id: number) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      try {
        await deleteData(id);
        refetch();
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const perPage = 5;
  const currentData = filteredData.slice(
    (pagination - 1) * perPage,
    pagination * perPage
  );
  const totalPages = Math.ceil(filteredData.length / perPage);

  return (
    <Container>
      <div className='wrapper'>
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
          <DataList data={currentData} onDelete={handleClickDelete} />
        )}

        {filteredData.length === 0 ? (
          <></>
        ) : (
          <div className='pagination-wrap'>
            <Pagination
              currentPage={pagination}
              totalPages={totalPages}
              onPageChange={(e) => setPagination(e)}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 100%;
  .wrapper {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .pagination-wrap {
    position: sticky;
    bottom: 100px;
  }
`;

const NoneData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  background-color: ${color.skyBlue};
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 30px 30px 30px;
  font-weight: bold;
`;
