import React, { useContext, useState } from "react";
import Multiselect from "multiselect-react-dropdown";

import CATEGORIES_OPTIONS from "../categories-options";
import { CategoriesContext } from "../contexts/categories.context";
import { SourcesContext } from "../contexts/sources.context";

const Categories = () => {
  const { selectedCategories, setSelectedCategories } =
    useContext(CategoriesContext);

  const { selectedSources, setSelectedSources } = useContext(SourcesContext);

  const onSelectCategory = (categories) => {
    console.log('honda', categories);
    setSelectedCategories(categories);
    if (selectedSources.length) {
      setSelectedSources([]);
    }
  };

  return (
    <>
      <Multiselect
        className="ml-2 px-3"
        style={{ multiselectContainer: { width: "250px" } }}
        placeholder={"Select Categories"}
        options={CATEGORIES_OPTIONS}
        singleSelect={true}
        selectedValues={selectedCategories}
        onSelect={onSelectCategory}
        onRemove={onSelectCategory}
        displayValue="name"
      />
    </>
  );
};

export default Categories;
