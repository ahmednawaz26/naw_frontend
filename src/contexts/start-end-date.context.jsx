import { createContext, useState } from "react";

export const StartEndDateContext = createContext({
  startDate: null,
  endDate: null,
});

const StartEndDateProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  console.log('startdate', startDate);

  const value = { startDate, endDate, setStartDate, setEndDate };

  return (
    <StartEndDateContext.Provider value={value}>
      {children}
    </StartEndDateContext.Provider>
  );
};

export default StartEndDateProvider;
