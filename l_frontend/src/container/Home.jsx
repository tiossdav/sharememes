import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import Pins from "./Pins";
import { Sidebar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.svg";
import { userQuery } from "../utils/data";
import fetchUser from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = userQuery(userInfo?.sub);

        await client.fetch(query).then((data) => {
          setUser(data[0]);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userInfo?.sub]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial  ">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`/user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-full bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <IoCloseCircle
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
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

// 100112062761266420826
