import React, { useState, useRef, useEffect, useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/sidebar";
// import UserProfile from "../components/user-profile";
import News from "../components/news";
import { UserContext } from "../contexts/user.context";
import axiosClient from "../axios.client";
// import { client } from "../client";
// import logo from "../assets/logo.png";
// import Pins from "./Pins";
// import { userQuery } from "../utils/data";
// import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const { user, token, setUser } = useContext(UserContext);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">NAW</Link>
          <Link to={`user-profile/${user?.id}`}>
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="logo" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          {/* <Route path="/user-profile/:userId" element={<UserProfile />} /> */}
          <Route path="/*" element={<News />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
