import React from "react";
import { Link } from "react-router-dom";
import { RiMenuLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import StartEndDate from "./start-end-date";
import Sources from "./sources";
import Categories from "./categories";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center font-bold"
          to="/"
          onClick={handleCloseSidebar}
        >
          NAW
        </Link>
        <div className="flex flex-col gap-5">
          <h3 className="flex mt-2 px-5 text-base 2xl:text-xl items-center font-bold">
            <RiMenuLine className="mr-3" /> Filters
          </h3>
          <StartEndDate />
          <span className="ml-2 mt-4 px-3 text-blue-600">Select Sources or Category</span>
          <Sources />
          <Categories />
        </div>
      </div>
      {user && (
        <Link
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          to={`user-profile/${user.id}`}
          onClick={handleCloseSidebar}
        >
          <img
            className="w-10 h-10 rounded-full"
            alt="user-profile"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          />
          <p>{user.name}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
