import { DateRange } from "react-date-range";

const DatePicker = ({value, handleSelect}) => {
  return (
    <DateRange
      rangeColors={["#F43F5E"]}
      date={value.startDate}
      ranges={[value]}
      onChange={handleSelect}
      direction="vertical"
      showDateDisplay={false}
      minDate={value.startDate}
      maxDate={value.endDate}
    />
  );
};

export default DatePicker;
