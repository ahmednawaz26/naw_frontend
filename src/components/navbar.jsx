import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { UserContext } from "../contexts/user.context";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?.id}`} className="hidden md:block">
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="user" className="w-14 h-12 rounded-lg" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
