import React, { useContext, useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { SourcesContext } from "../contexts/sources.context";
import { CategoriesContext } from "../contexts/categories.context";

const Sources = () => {
  const { sources, selectedSources, setSelectedSources } =
    useContext(SourcesContext);

  const { selectedCategories, setSelectedCategories } =
    useContext(CategoriesContext);

  const onSelectSource = (sources) => {
    setSelectedSources(sources);
    if (selectedCategories.length) {
      setSelectedCategories([]);
    }
  };

  return (
    <>
      <Multiselect
        className="ml-2 px-3"
        style={{ multiselectContainer: { width: "250px" } }}
        placeholder={"Select Sources"}
        options={sources}
        selectedValues={selectedSources}
        onSelect={onSelectSource}
        onRemove={onSelectSource}
        displayValue="name"
      />
    </>
  );
};

export default Sources;
