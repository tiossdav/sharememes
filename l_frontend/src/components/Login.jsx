import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import shareme from "../assets/shareme.mp4";
import logo from "../assets/logo.svg";
import { client } from "../client";
const Login = () => {
  const navigate = useNavigate();
  const CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN;
  console.log(CLIENT_ID);

  const getUser = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);

      localStorage.setItem("user", JSON.stringify(decoded));
      const storedUser = localStorage.getItem("user");

      const { name, picture, sub } = decoded;
      console.log(storedUser, name, picture, sub);

      const user = {
        _id: sub,
        _type: "user",
        userName: name,
        image: picture,
      };

      await client.createIfNotExists(user);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex justify-start items-center flex-col h-screen bg-blackOverlay">
        <div className="relative w-full h-full">
          <video
            src={shareme}
            type="video/mp4"
            autoPlay
            loop
            muted
            controls={false}
            className="w-full h-full object-cover"
          />
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width="120px" alt="logo" className="text-white" />
            </div>
            <div className="shadow-2xl">
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  >
                    <FcGoogle className="mr-2" /> Sign in with Google
                  </button>
                )}
                onSuccess={(response) => getUser(response)}
                onError={() => console.log("Error")}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
