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
      <img src='/images/icons/calendar/calendar.svg' width={14} />
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
  width: 100%;
  height: 30px;
  border: 1.5px solid ${color.deepBlue};
  background-color: ${color.skyBlue};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px 0 10px;
  box-sizing: border-box;

  .react-datepicker-wrapper {
    display: flex;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border: none;
  background: none;

  outline: none;
  font-size: 14px;
  line-height: 20px;
`;
