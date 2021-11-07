import axios from "axios";

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HOST_BASE,
  withCredentials: true,
});

export default axiosInstance;
