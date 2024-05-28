import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { color } from "../../styles/color";

type Props = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  showTimeSelect: boolean;
  placeholderText: string;
  dateFormat: string;
  style?: React.CSSProperties;
  isClearable: boolean;
};

const isSingleDate = (
  date: Date | Date[] | [Date | null, Date | null] | null
): date is Date | null => {
  return date === null || date instanceof Date;
};

const Calendar = ({
  selectedDate,
  onDateChange,
  showTimeSelect,
  placeholderText,
  dateFormat,
  isClearable,
  style,
}: Props) => {
  const handleChange = (
    date: Date | Date[] | [Date | null, Date | null] | null
  ) => {
    if (isSingleDate(date)) {
      onDateChange(date);
    }
  };

  return (
    <Container style={style}>
      <StyledDatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat={dateFormat}
        isClearable={isClearable}
        placeholderText={placeholderText}
        showTimeSelect={showTimeSelect}
        timeIntervals={15}
      />
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  .react-datepicker-wrapper {
    display: flex;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 30px;
  padding: 10px;
  border: 1.5px solid ${color.deepBlue};
  background-color: ${color.skyBlue};
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  font-size: 16px;
`;
