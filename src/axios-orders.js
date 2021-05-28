import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder009-default-rtdb.firebaseio.com/",
});

export default instance;
