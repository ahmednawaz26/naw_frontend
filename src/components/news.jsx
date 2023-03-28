import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "./feed";
import Navbar from "./navbar";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  );
};

export default News;
