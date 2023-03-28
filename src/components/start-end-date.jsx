import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StartEndDateContext } from "../contexts/start-end-date.context";

const StartEndDate = () => {
  const {startDate, endDate, setStartDate, setEndDate} = useContext(StartEndDateContext);
  return (
    <>
      <span className="ml-2 px-3 text-blue-600">Start Date</span>
      <DatePicker
        className="ml-2 px-3"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <span className="ml-2 px-3 text-blue-600">End Date</span>
      <DatePicker
        className="ml-2 px-3"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />
    </>
  );
};

export default StartEndDate;
