import axios from "axios";
export const hizliAuth = axios.create({
  baseURL: "http://212.16.73.147:1530/auth",
});
