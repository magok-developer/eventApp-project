import styled from "styled-components";
import { color } from "../../styles/color";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <Container>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='previous'
      >
        <img src='images/icons/arrow/arrow_down.svg' />
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='next'
      >
        <img src='images/icons/arrow/arrow_down.svg' />
      </button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .pagination-button {
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #f0f0f0;
    border-radius: 3px;
    &:hover {
      background-color: ${color.skyBlue};
      color: black;
    }
  }

  .pagination-button.active {
    background-color: ${color.deepBlue};
    color: #fff;
  }

  .pagination-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  .previous,
  .next {
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
  }

  .previous {
    transform: rotate(90deg);
  }

  .next {
    transform: rotate(-90deg);
  }
`;
