import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "http://localhost:5000/api/auth",
    headers: {
      "Content-type": "application/json",
    },
  });
};
