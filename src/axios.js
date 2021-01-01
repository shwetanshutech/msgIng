import axios from "axios";

const instance = axios.create({
  baseURL: "https://msging-backend.herokuapp.com/",
});

export default instance;
