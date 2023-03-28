import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const SourcesContext = createContext({
  sources: [],
  selectedSources: [],
});

const SourcesProvider = ({ children }) => {
  const [sources, setSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  
  console.log('uuuuuuuuuuuu');
  console.log(selectedSources);

  const value = { sources, selectedSources, setSelectedSources };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_NEWS_API_BASE_URL}/top-headlines/sources?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      )
      .then((response) => {
        console.log("sources context");
        const sources = response.data.sources.map((source) => {
          const { id, name } = source;
          return { id, name };
        });

        setSources(sources);
      });
  }, []);

  return (
    <SourcesContext.Provider value={value}>{children}</SourcesContext.Provider>
  );
};

export default SourcesProvider;
