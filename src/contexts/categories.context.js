import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CategoriesContext = createContext({
  selectedCategories: [],
});

const CategoriesProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const value = { selectedCategories, setSelectedCategories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
