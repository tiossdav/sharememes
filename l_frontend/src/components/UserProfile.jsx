import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import banner from "../assets/banner.jpg";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-w rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4  text-black font-bold p-w rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN;

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading profile" />;
  }

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                src={banner}
                alt="banner"
                className="w-full h-70 2xl:h-100 shadow-lg object-cover"
              />
              <img
                src={user?.image}
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                alt="user-pic"
              />
              <h1 className="font-bold text-3xl text-center mt-3">
                {user?.userName}
              </h1>
              <div className="absolute top-0 right-3 z-1 p-2">
                {userId === user?._id && (
                  <button
                    type="button"
                    onClick={() => {
                      googleLogout();
                      logOut();
                    }}
                    className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
              </div>
            </div>
            <div className="text-center mb-7">
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("created");
                }}
                className={`${
                  activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Created
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("saved");
                }}
                className={`${
                  activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Saved
              </button>
            </div>

            {pins?.length ? (
              <div className="px-2">
                <MasonryLayout pins={pins} user={user} />
              </div>
            ) : (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                No Pins Found!
              </div>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default UserProfile;
