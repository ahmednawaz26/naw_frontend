import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./news-card";
import Spinner from "./spinner";
import { StartEndDateContext } from "../contexts/start-end-date.context";
import { SourcesContext } from "../contexts/sources.context";
import { CategoriesContext } from "../contexts/categories.context";

const Feed = ({ searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const pageSize = 10;

  const { startDate, endDate } = useContext(StartEndDateContext);
  const { selectedSources } = useContext(SourcesContext);
  const { selectedCategories } = useContext(CategoriesContext);

  const onClickPrevBtnHandler = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onClickNextBtnHandler = () => {
    if (pageNumber !== totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    setLoading(true);

    let apiUrl = process.env.REACT_APP_NEWS_API_BASE_URL;
    var query = [];

    const sc = selectedCategories
      .map((selectedCategory) => selectedCategory.id)
      .join(",");

    if (sc === "") {
      apiUrl += "/everything?";
    } else {
      apiUrl += "/top-headlines?";
      query.push(`category=${sc}`);
    }

    const ss = selectedSources
      .map((selectedSource) => selectedSource.id)
      .join(",");

    if (ss !== "") {
      query.push(`sources=${ss}`);
    }

    if (searchTerm) {
      query.push(`q=${searchTerm}`);
    } else {
      if (sc === "" && ss === "") {
        query.push("q=trending");
      }
    }

    if (startDate) {
      const sd = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      query.push(`from=${sd}`);
    }

    if (endDate) {
      const ed = `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
      query.push(`to=${ed}`);
    }

    query.push(`apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);

    query.push(`page=${pageNumber}`);

    query.push(`pageSize=${pageSize}`);

    query = query.join("&");

    console.log(query);

    apiUrl += query;

    axios.get(apiUrl).then((response) => {
      const { totalResults, articles } = response.data;
      setTotalPages(Math.ceil(totalResults / pageSize));
      setArticles(articles);
      setLoading(false);
    });
  }, [
    searchTerm,
    pageNumber,
    startDate,
    endDate,
    selectedSources,
    selectedCategories,
  ]);

  if (loading) return <Spinner message="Fetching news..." />;

  if (!articles?.length) return <h2>No news available</h2>;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {articles &&
          articles.map((article, i) => {
            return <NewsCard key={i} article={article} />;
          })}
      </div>
      <div class="flex flex-row mx-auto mt-6 justify-items-center">
        <button
          type="button"
          name="prev-btn"
          disabled={pageNumber === 1 ? true : false}
          onClick={onClickPrevBtnHandler}
          className={`${
            pageNumber === 1 ? "bg-gray-800" : "bg-blue-800"
          } text-white border-r border-gray-100 py-2 px-3`}
        >
          <div class="flex flex-row align-middle">
            <svg
              class="w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p class="ml-2">Prev</p>
          </div>
        </button>
        <button
          type="button"
          name="next-btn"
          disabled={pageNumber === totalPages ? true : false}
          onClick={onClickNextBtnHandler}
          class={`${
            pageNumber === totalPages ? "bg-gray-800" : "bg-blue-800"
          } text-white py-2 border-l border-gray-200 px-3`}
        >
          <div class="flex flex-row align-middle">
            <span class="mr-2">Next</span>
            <svg
              class="w-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Feed;
