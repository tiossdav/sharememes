import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getUser = async (response) => {
  const decoded = jwtDecode(response.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  await axios.post(`http://localhost:3000/api/auth`, user);
  console.log(decoded);
};
