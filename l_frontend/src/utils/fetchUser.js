import React from "react";

const fetchUser = () => {
  return localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
};

export default fetchUser;
